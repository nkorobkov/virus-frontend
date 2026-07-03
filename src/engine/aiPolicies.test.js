import { describe, it, expect } from "vitest";
import { GameState, BLUE, RED } from "./gameState";
import { findBestMove, activeCountEvaluate } from "./fastMiniMax";
import { getAiMove } from "./aiPolicies";
import { isStepValid, getNextState, isValidMoveExists } from "../utils/gameEngine";

const EE = 0;
const BA = 1;
const RA = -1;

function initialState(sizeH, sizeW) {
  const field = new Array(sizeH * sizeW).fill(EE);
  field[0] = BA;
  field[field.length - 1] = RA;
  return field;
}

describe("activeCountEvaluate", () => {
  it("is positive when blue has more material", () => {
    const game = new GameState(3, 3, [BA, BA, 2, EE, EE, EE, EE, EE, RA], BLUE);
    expect(activeCountEvaluate(game)).toBeGreaterThan(0);
  });

  it("is zero on a balanced board", () => {
    const game = new GameState(3, 3, initialState(3, 3), BLUE);
    expect(activeCountEvaluate(game)).toBe(0);
  });
});

describe("findBestMove", () => {
  it("returns a legal move", () => {
    const game = new GameState(5, 5, initialState(5, 5), BLUE);
    const legal = new Set(game.getAllMoves().map((m) => m.join(",")));
    const move = findBestMove(game, { maxDepth: 2 });
    expect(legal.has(move.join(","))).toBe(true);
  });

  it("finds the immediately winning capture", () => {
    // Red's only cell is capturable: any blue move taking it leaves red with
    // no legal moves, which a depth-2 search must prefer.
    const game = new GameState(3, 3, [BA, EE, EE, EE, RA, EE, EE, EE, EE], BLUE);
    const move = findBestMove(game, { maxDepth: 2 });
    expect(move).toContain(4);
  });

  it("returns null when there are no legal moves", () => {
    const game = new GameState(3, 3, [BA, EE, -2, -2, -2, -2, EE, EE, RA], BLUE);
    expect(findBestMove(game, { maxDepth: 2 })).toBeNull();
  });

  it("search does not corrupt the input state", () => {
    const field = initialState(5, 5);
    const game = new GameState(5, 5, field, BLUE);
    findBestMove(game, { maxDepth: 3, timeLimitMs: 200, beamWidth: 10 });
    expect(game.field).toEqual(field);
    expect(game.toMove).toBe(BLUE);
  });
});

describe("getAiMove", () => {
  const state = { field: initialState(8, 8), sizeH: 8, sizeW: 8, toMove: BLUE };

  it.each(["easy", "medium", "hard"])("returns a 3-step [h, w] move (%s)", (aiType) => {
    const move = getAiMove(state, aiType, { timeLimitMs: 200, maxDepth: 2 });
    expect(move).toHaveLength(3);
    for (const [h, w] of move) {
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThan(8);
      expect(w).toBeGreaterThanOrEqual(0);
      expect(w).toBeLessThan(8);
    }
  });
});

// The UI validates steps with its own rule implementation (utils/gameEngine).
// Play games where both sides use engine moves and make sure every engine
// step passes the UI's validation, and both sides agree on when moves exist.
describe("engine vs UI rules consistency", () => {
  it("engine moves are always accepted by the UI validator", () => {
    const sizeH = 6;
    const sizeW = 6;
    let uiState = {
      field: initialState(sizeH, sizeW),
      sizeH,
      sizeW,
      toMove: BLUE,
    };
    // The UI's first move is shorter (stepsLeft starts at 2); play it manually
    // so both engines proceed with full 3-step moves afterwards.
    for (const [h, w] of [[0, 1], [1, 1]]) {
      expect(isStepValid(uiState, h, w)).toBe(true);
      const field = uiState.field.slice();
      field[h * sizeW + w] = getNextState(field[h * sizeW + w], uiState.toMove);
      uiState = { ...uiState, field };
    }
    uiState.toMove = RED;

    for (let ply = 0; ply < 20; ply++) {
      const game = new GameState(sizeH, sizeW, uiState.field, uiState.toMove);
      const moves = game.getAllMoves();
      expect(moves.length > 0).toBe(isValidMoveExists(uiState));
      if (moves.length === 0) break;

      const move = moves[(ply * 7919) % moves.length];
      for (const index of move) {
        const h = game.indexToH(index);
        const w = game.indexToW(index);
        expect(isStepValid(uiState, h, w)).toBe(true);
        const field = uiState.field.slice();
        field[index] = getNextState(field[index], uiState.toMove);
        uiState = { ...uiState, field };
      }
      uiState.toMove = -uiState.toMove;
    }
  });
});
