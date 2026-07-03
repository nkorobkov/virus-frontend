import { GameState } from "./gameState";
import { findBestMove } from "./fastMiniMax";

// Per-difficulty engine settings. "medium" mirrors the old server engine
// (minimax depth 2 over the active-count evaluator); "hard" is the tuned
// FastMiniMax preset from the virus-game repo: time-budgeted iterative
// deepening with a flat top-30 beam, where time (not depth) is the limiter.
const DIFFICULTIES = {
  easy: { random: true },
  medium: { maxDepth: 2, timeLimitMs: 2500 },
  hard: { maxDepth: 64, timeLimitMs: 3000, beamWidth: 30 },
};

// Picks a move for the side to move in the given serialized game state
// ({field, sizeH, sizeW, toMove} — same shape Game.jsx keeps in its state).
// Returns the move as [[h, w], [h, w], [h, w]], or null if there is no legal
// move. `overrides` lets tests shrink the time budget.
export function getAiMove({ field, sizeH, sizeW, toMove }, aiType, overrides = {}) {
  const settings = { ...(DIFFICULTIES[aiType] ?? DIFFICULTIES.medium), ...overrides };
  const game = new GameState(sizeH, sizeW, field, toMove);

  let move;
  if (settings.random) {
    const moves = game.getAllMoves();
    move = moves.length > 0 ? moves[Math.floor(Math.random() * moves.length)] : null;
  } else {
    move = findBestMove(game, settings);
  }

  if (move === null) {
    return null;
  }
  return move.map((index) => [game.indexToH(index), game.indexToW(index)]);
}
