// JS port of the game engine from the virus-game repository (game/GameState.py).
// Board is a flat array of length sizeH*sizeW. Cell encoding is shared with the
// rest of the frontend: 0 empty, 1 blue active, 2 blue base, -1 red active,
// -2 red base. Teams are BLUE=1, RED=-1; a full move is 3 single steps.
// Positions are plain cell indices (h * sizeW + w).

export const BLUE = 1;
export const RED = -1;

export function isTransitionPossible(cellState, team) {
  if (cellState === 0) {
    return true;
  }
  return cellState === -team;
}

// Only valid when the transition is possible: empty -> active, enemy active -> base.
export function afterTransition(cellState, team) {
  if (cellState === 0) {
    return team;
  }
  return team * 2;
}

function buildNeighbours(sizeH, sizeW) {
  const neighbours = new Array(sizeH * sizeW);
  for (let h = 0; h < sizeH; h++) {
    for (let w = 0; w < sizeW; w++) {
      const result = [];
      for (let dh = -1; dh <= 1; dh++) {
        for (let dw = -1; dw <= 1; dw++) {
          if (dh === 0 && dw === 0) continue;
          const nh = h + dh;
          const nw = w + dw;
          if (nh >= 0 && nh < sizeH && nw >= 0 && nw < sizeW) {
            result.push(nh * sizeW + nw);
          }
        }
      }
      neighbours[h * sizeW + w] = result;
    }
  }
  return neighbours;
}

class GameState {
  constructor(sizeH, sizeW, field, toMove) {
    if (field.length !== sizeH * sizeW) {
      throw new Error("field size does not match dimensions");
    }
    this.sizeH = sizeH;
    this.sizeW = sizeW;
    this.field = Array.from(field);
    this.toMove = toMove;
    this.neighbours = buildNeighbours(sizeH, sizeW);
    this.movableMasks = {
      [BLUE]: this.field.map((cell) => isTransitionPossible(cell, BLUE)),
      [RED]: this.field.map((cell) => isTransitionPossible(cell, RED)),
    };
  }

  indexToH(index) {
    return Math.floor(index / this.sizeW);
  }

  indexToW(index) {
    return index % this.sizeW;
  }

  // Mask of cells the side to move can step into right now (reachable from an
  // active cell, possibly through chains of own bases), plus the set of base
  // cells that are already known to be active/connected.
  getAllSingleMovesMask() {
    const baseState = this.toMove * 2;
    const activeState = this.toMove;
    const size = this.field.length;

    const reachable = new Array(size).fill(false);
    const queue = [];
    for (let i = 0; i < size; i++) {
      if (this.field[i] === activeState) {
        queue.push(i);
      }
    }

    const activeBasesSeen = new Set();
    for (let head = 0; head < queue.length; head++) {
      const p = queue[head];
      for (const cellI of this.neighbours[p]) {
        reachable[cellI] = true;
        if (this.field[cellI] === baseState && !activeBasesSeen.has(cellI)) {
          activeBasesSeen.add(cellI);
          queue.push(cellI);
        }
      }
    }

    const movable = this.movableMasks[this.toMove];
    const mask = reachable.map((r, i) => r && movable[i]);
    return [mask, activeBasesSeen];
  }

  // All cells that become steppable from `pos` and are not already in `seen`
  // (the single-moves mask). Own bases adjacent to `pos` chain reachability
  // further; bases in `activeBasesAlreadySeen` are known-connected and skipped.
  getAllUnseenMovesFromPos(pos, seen, activeBasesAlreadySeen = null) {
    const baseState = this.toMove * 2;
    const movable = this.movableMasks[this.toMove];
    const activeBasesSeen = new Set(activeBasesAlreadySeen ?? []);
    const seenThisRun = new Set();
    const result = [];

    for (const index of this.neighbours[pos]) {
      if (!seen[index] && movable[index] && !seenThisRun.has(index)) {
        seenThisRun.add(index);
        result.push(index);
      } else if (this.field[index] === baseState && !activeBasesSeen.has(index)) {
        const basesToCheck = [index];
        for (let head = 0; head < basesToCheck.length; head++) {
          const checkingIndex = basesToCheck[head];
          activeBasesSeen.add(checkingIndex);
          for (const neighbourIndex of this.neighbours[checkingIndex]) {
            const neighbourState = this.field[neighbourIndex];
            if (neighbourState === baseState && !activeBasesSeen.has(neighbourIndex)) {
              activeBasesSeen.add(neighbourIndex);
              basesToCheck.push(neighbourIndex);
            } else if (
              movable[neighbourIndex] &&
              !seenThisRun.has(neighbourIndex) &&
              !seen[neighbourIndex]
            ) {
              seenThisRun.add(neighbourIndex);
              result.push(neighbourIndex);
            }
          }
        }
      }
    }
    return result;
  }

  // All legal 3-step moves, as arrays of 3 cell indices. Direct port of
  // GameState.get_all_moves: combines chains (single->double->third), one
  // single with two of its doubles, two singles with a shared double, and
  // plain triples of singles. The four families are disjoint by construction.
  getAllMoves() {
    const [singleMovesMask, activeBasesSeen] = this.getAllSingleMovesMask();

    const singlePositions = [];
    for (let i = 0; i < singleMovesMask.length; i++) {
      if (singleMovesMask[i]) {
        singlePositions.push(i);
      }
    }

    const doubleMoves = [];
    const secondToFirsts = new Map();
    const firstToSeconds = new Map();
    for (const first of singlePositions) {
      for (const second of this.getAllUnseenMovesFromPos(first, singleMovesMask, activeBasesSeen)) {
        doubleMoves.push([first, second]);
        if (!secondToFirsts.has(second)) secondToFirsts.set(second, new Set());
        secondToFirsts.get(second).add(first);
        if (!firstToSeconds.has(first)) firstToSeconds.set(first, []);
        firstToSeconds.get(first).push(second);
      }
    }

    const moves = [];

    // single -> double -> third chains
    for (const [first, second] of doubleMoves) {
      const noThird = new Set(
        this.getAllUnseenMovesFromPos(first, singleMovesMask, activeBasesSeen)
      );
      for (const third of this.getAllUnseenMovesFromPos(second, singleMovesMask)) {
        if (!noThird.has(third)) {
          moves.push([first, second, third]);
        }
      }
    }

    // one single + two cells reachable from it
    for (const [first, seconds] of firstToSeconds) {
      for (let i = 0; i < seconds.length; i++) {
        for (let j = i + 1; j < seconds.length; j++) {
          moves.push([first, seconds[i], seconds[j]]);
        }
      }
    }

    // two singles + one cell reachable from (at least one of) them
    for (const [second, firstsSet] of secondToFirsts) {
      const firsts = [...firstsSet];
      for (let i = 0; i < firsts.length; i++) {
        for (let j = i + 1; j < firsts.length; j++) {
          moves.push([firsts[i], firsts[j], second]);
        }
      }
      for (const first of firsts) {
        for (const single of singlePositions) {
          if (!firstsSet.has(single)) {
            moves.push([first, single, second]);
          }
        }
      }
    }

    // three plain singles
    const n = singlePositions.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        for (let k = j + 1; k < n; k++) {
          moves.push([singlePositions[i], singlePositions[j], singlePositions[k]]);
        }
      }
    }

    return moves;
  }

  updateMovableMasks(move) {
    for (const index of move) {
      this.movableMasks[BLUE][index] = isTransitionPossible(this.field[index], BLUE);
      this.movableMasks[RED][index] = isTransitionPossible(this.field[index], RED);
    }
  }

  // Applies a move with per-step validity checks (mask only, like the Python
  // make_move). Use makeMoveGetUndo on the search path instead.
  makeMove(move) {
    for (const index of move) {
      if (!this.movableMasks[this.toMove][index]) {
        throw new Error(
          `transition on ${index} in state ${this.field[index]} is not possible for ${this.toMove}`
        );
      }
      this.field[index] = afterTransition(this.field[index], this.toMove);
    }
    this.toMove = -this.toMove;
    this.updateMovableMasks(move);
  }

  // Fast in-place apply that trusts the move (it comes from getAllMoves) and
  // returns an undo token for unmakeMove. A mask entry depends only on the
  // cell's own state, so restoring the 3 touched cells fully reverts the move.
  makeMoveGetUndo(move) {
    const undo = [];
    const toMove = this.toMove;
    for (const index of move) {
      const oldState = this.field[index];
      undo.push([index, oldState]);
      this.field[index] = afterTransition(oldState, toMove);
    }
    this.toMove = -toMove;
    this.updateMovableMasks(move);
    return undo;
  }

  unmakeMove(undo) {
    this.toMove = -this.toMove;
    for (const [index, oldState] of undo) {
      this.field[index] = oldState;
      this.movableMasks[BLUE][index] = isTransitionPossible(oldState, BLUE);
      this.movableMasks[RED][index] = isTransitionPossible(oldState, RED);
    }
  }
}

export { GameState };
