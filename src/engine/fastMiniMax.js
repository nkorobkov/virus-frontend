// JS port of FastMiniMaxPolicy from the virus-game repository:
// negamax + alpha-beta, make/unmake, material move ordering, transposition
// table, iterative deepening with an optional time budget, and optional beam
// selectivity (top-K ordered moves per node) to buy depth against the ~3000
// branching factor.

const INF = 1e9;
const LOSS = -1e6; // side-to-move value of a position with no legal moves

// Transposition table bound flags
const EXACT = 0;
const LOWER = 1;
const UPPER = 2;

const TIME_UP = Symbol("time up");

// Blue-perspective board value, port of ActiveCountEvaluator: net cell
// material, normalized. Bases count double, which rewards captures.
export function activeCountEvaluate(gameState) {
  let sum = 0;
  for (const cell of gameState.field) {
    sum += cell;
  }
  return sum / (2 * gameState.field.length);
}

function stateKey(gameState) {
  // field values are in [-2, 2]; toMove is ±1
  let key = gameState.toMove === 1 ? "b" : "r";
  for (const cell of gameState.field) {
    key += String.fromCharCode(cell + 2);
  }
  return key;
}

function sameMove(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

class Search {
  constructor(gameState, { maxDepth, deadline, beamWidth, evaluate, useTt }) {
    this.state = gameState;
    this.maxDepth = maxDepth;
    this.deadline = deadline;
    this.beamWidth = beamWidth;
    this.evaluate = evaluate;
    this.tt = useTt ? new Map() : null;
  }

  run() {
    const rootMoves = this.state.getAllMoves();
    if (rootMoves.length === 0) {
      return null;
    }
    let bestMove = rootMoves[0];

    // Iterative deepening: each iteration seeds move ordering (via the
    // transposition table) for the next, and gives anytime behaviour.
    for (let depth = 1; depth <= this.maxDepth; depth++) {
      let result;
      try {
        result = this.negamax(this.state, depth, -INF, INF);
      } catch (err) {
        if (err === TIME_UP) break;
        throw err;
      }
      if (result.move !== null) {
        bestMove = result.move;
      }
      if (this.deadline !== null && Date.now() >= this.deadline) break;
    }
    return bestMove;
  }

  negamax(state, depth, alpha, beta) {
    if (this.deadline !== null && Date.now() >= this.deadline) {
      throw TIME_UP;
    }

    const alphaOrig = alpha;
    let key = null;
    let ttMove = null;
    if (this.tt !== null) {
      key = stateKey(state);
      const entry = this.tt.get(key);
      if (entry !== undefined) {
        ttMove = entry.move;
        if (entry.depth >= depth) {
          if (entry.flag === EXACT) {
            return { value: entry.value, move: entry.move };
          } else if (entry.flag === LOWER && entry.value > alpha) {
            alpha = entry.value;
          } else if (entry.flag === UPPER && entry.value < beta) {
            beta = entry.value;
          }
          if (alpha >= beta) {
            return { value: entry.value, move: entry.move };
          }
        }
      }
    }

    if (depth === 0) {
      // evaluator is blue-perspective; flip to side-to-move perspective.
      return { value: state.toMove * this.evaluate(state), move: null };
    }

    const moves = state.getAllMoves();
    if (moves.length === 0) {
      // Side to move has no legal moves -> they lose.
      return { value: LOSS, move: null };
    }

    const ordered = this.orderMoves(state, moves, ttMove);

    let bestValue = -INF;
    let bestMove = null;
    for (const move of ordered) {
      const undo = state.makeMoveGetUndo(move);
      let child;
      try {
        child = this.negamax(state, depth - 1, -beta, -alpha);
      } finally {
        // Always unwind, even when TIME_UP aborts mid-recursion, so the
        // caller's state is never left half-mutated.
        state.unmakeMove(undo);
      }
      const value = -child.value;

      if (value > bestValue) {
        bestValue = value;
        bestMove = move;
      }
      if (value > alpha) {
        alpha = value;
      }
      if (alpha >= beta) {
        break; // beta cutoff
      }
    }

    if (this.tt !== null) {
      let flag;
      if (bestValue <= alphaOrig) {
        flag = UPPER;
      } else if (bestValue >= beta) {
        flag = LOWER;
      } else {
        flag = EXACT;
      }
      this.tt.set(key, { value: bestValue, depth, flag, move: bestMove });
    }

    return { value: bestValue, move: bestMove };
  }

  // Best-first ordering with an O(1) evaluator-independent score: each step
  // lands on an empty cell (+1) or captures an enemy active cell (+3). The
  // transposition-table move (a real refutation/PV move) goes first. With a
  // beam width set, only the top-K moves are kept.
  orderMoves(state, moves, ttMove) {
    const field = state.field;
    const scored = moves.map((move) => {
      let score = 0;
      for (const index of move) {
        score += field[index] === 0 ? 1 : 3;
      }
      return { score, move };
    });
    scored.sort((a, b) => b.score - a.score);
    let ordered = scored.map((s) => s.move);

    if (ttMove !== null && moves.some((m) => sameMove(m, ttMove))) {
      ordered = [ttMove, ...ordered.filter((m) => !sameMove(m, ttMove))];
    }

    if (this.beamWidth !== null) {
      ordered = ordered.slice(0, Math.max(1, this.beamWidth));
    }

    return ordered;
  }
}

// Returns the best move (array of 3 cell indices) for the side to move, or
// null when there are no legal moves.
export function findBestMove(
  gameState,
  { maxDepth = 64, timeLimitMs = null, beamWidth = null, evaluate = activeCountEvaluate, useTt = true } = {}
) {
  const search = new Search(gameState, {
    maxDepth,
    deadline: timeLimitMs === null ? null : Date.now() + timeLimitMs,
    beamWidth,
    evaluate,
    useTt,
  });
  return search.run();
}
