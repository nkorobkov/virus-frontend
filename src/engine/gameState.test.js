// Ported from the Python engine's test suite (virus-game repo,
// test/game/testGameState.py) to verify the JS port generates identical
// moves. Expected values (incl. hand-checked move counts) come from there.
import { describe, it, expect } from "vitest";
import { GameState, BLUE, RED } from "./gameState";

// Cell state shorthands matching the Python tests
const EE = 0;
const BA = 1;
const BB = 2;
const RA = -1;
const RB = -2;

function comb(n, k) {
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return result;
}

// No duplicate cells inside a move, no duplicate moves in the list
function movesSanityCheck(moves) {
  const moveSet = new Set();
  for (const move of moves) {
    if (new Set(move).size !== 3) {
      return false;
    }
    moveSet.add([...move].sort((a, b) => a - b).join(","));
  }
  return moveSet.size === moves.length;
}

describe("single moves mask", () => {
  function mask(sizeH, sizeW, field, toMove) {
    const game = new GameState(sizeH, sizeW, field, toMove);
    return game.getAllSingleMovesMask()[0];
  }

  it("marks cells next to an active cell", () => {
    expect(
      mask(3, 3, [BA, EE, EE, EE, EE, EE, EE, EE, RA], BLUE)
    ).toEqual([false, true, false, true, true, false, false, false, false]);
  });

  it("extends reach through an own base", () => {
    expect(
      mask(3, 3, [BA, BB, EE, EE, EE, EE, EE, EE, RA], BLUE)
    ).toEqual([false, false, true, true, true, true, false, false, false]);
  });

  it("ignores a base that is not connected to an active cell", () => {
    expect(
      mask(3, 3, [BA, EE, EE, EE, EE, BB, EE, EE, EE], BLUE)
    ).toEqual([false, true, false, true, true, false, false, false, false]);
  });

  it("chains reach through connected bases", () => {
    expect(
      mask(3, 3, [BA, BB, EE, EE, EE, BB, EE, EE, RA], BLUE)
    ).toEqual([false, false, true, true, true, false, false, true, true]);
  });

  it("allows stepping on enemy active cells but not bases", () => {
    expect(
      mask(3, 3, [BA, BB, EE, RA, BA, EE, RB, EE, EE], BLUE)
    ).toEqual([false, false, true, true, false, true, false, true, true]);
  });

  it("handles blue surrounded by red", () => {
    expect(
      mask(3, 3, [BA, BA, RA, BA, EE, RB, BA, EE, RA], BLUE)
    ).toEqual([false, false, true, false, true, false, false, true, false]);
  });

  it("handles a complex red position", () => {
    const field = [
      BA, BA, RA, BA, RB,
      BA, EE, RB, EE, EE,
      BA, EE, RA, EE, BB,
      BB, EE, EE, EE, RA,
      BB, EE, EE, RA, RA,
    ];
    expect(mask(5, 5, field, RED)).toEqual([
      false, true, false, true, false,
      false, true, false, true, false,
      false, true, false, true, false,
      false, true, true, true, false,
      false, false, true, false, false,
    ]);
  });

  it("handles a complex blue position", () => {
    const field = [
      BA, BA, RA, BA, RB,
      BA, EE, RB, EE, EE,
      BA, EE, RA, EE, BB,
      BB, EE, EE, EE, RA,
      BB, EE, EE, RA, RA,
    ];
    expect(mask(5, 5, field, BLUE)).toEqual([
      false, false, true, false, false,
      false, true, false, true, true,
      false, true, false, false, false,
      false, true, false, false, false,
      false, true, false, false, false,
    ]);
  });
});

describe("full move generation", () => {
  function allMoves(sizeH, sizeW, field, toMove = BLUE) {
    return new GameState(sizeH, sizeW, field, toMove).getAllMoves();
  }

  it("counts moves for an active cell in the center", () => {
    const moves = allMoves(3, 3, [EE, EE, EE, EE, BA, EE, EE, EE, RA]);
    expect(moves.length).toBe(comb(8, 3));
    expect(movesSanityCheck(moves)).toBe(true);
  });

  it("counts moves for an active cell in the corner", () => {
    const moves = allMoves(3, 3, [BA, EE, EE, EE, EE, EE, EE, EE, RA]);
    expect(moves.length).toBe(31);
    expect(movesSanityCheck(moves)).toBe(true);
  });

  it("counts moves with an own base in the center", () => {
    const moves = allMoves(3, 3, [BA, EE, EE, EE, BB, EE, EE, EE, RA]);
    expect(moves.length).toBe(comb(7, 3));
    expect(movesSanityCheck(moves)).toBe(true);
  });

  it("counts moves with an enemy base in the center", () => {
    const moves = allMoves(3, 3, [BA, EE, EE, EE, RB, EE, EE, EE, RA]);
    expect(moves.length).toBe(10);
    expect(movesSanityCheck(moves)).toBe(true);
  });

  it("finds no moves when walled off", () => {
    const moves = allMoves(3, 3, [BA, EE, RB, RB, RB, RB, EE, EE, RA]);
    expect(moves.length).toBe(0);
  });

  it("connects through a base reached by the first step", () => {
    const moves = allMoves(1, 6, [BA, EE, BB, BB, EE, EE]);
    expect(moves.length).toBe(1);
    expect(movesSanityCheck(moves)).toBe(true);
  });

  it("connects through a base reached by the second step", () => {
    const moves = allMoves(1, 6, [BA, EE, EE, BB, BB, EE]);
    expect(moves.length).toBe(1);
    expect(movesSanityCheck(moves)).toBe(true);
  });

  it("counts moves through layered bases", () => {
    const field = [
      BA, BB, EE, BB, EE, BB, EE,
      BB, BB, EE, BB, EE, BB, EE,
      EE, EE, EE, BB, EE, BB, EE,
      BB, BB, BB, BB, EE, BB, EE,
      EE, EE, EE, EE, EE, BB, EE,
      BB, BB, BB, BB, BB, BB, EE,
      EE, EE, EE, EE, EE, EE, EE,
    ];
    const moves = allMoves(7, 7, field);
    expect(moves.length).toBe(10 + 90 + 180 + 5 * 9 * 13);
    expect(movesSanityCheck(moves)).toBe(true);
  });

  it("counts moves in a big layered-base position", () => {
    const row = (state) => new Array(7).fill(state);
    const field = [
      [BA, RB, RB, RB, RB, RB, RB],
      [EE, RB, EE, EE, EE, EE, EE],
      row(BB), row(BB), row(BB), row(BB), row(BB),
      row(EE),
      row(BB), row(BB), row(BB), row(BB), row(BB),
      row(EE),
    ].flat();
    const moves = allMoves(14, 7, field);
    expect(moves.length).toBe(comb(19, 2) - comb(12, 2) + comb(5, 2));
    expect(movesSanityCheck(moves)).toBe(true);
  });

  it("counts the maximum possible moves", () => {
    const field = [
      EE, EE, BB, EE, EE, EE, EE,
      EE, BB, EE, EE, EE, BB, EE,
      EE, EE, BB, EE, BB, EE, BB,
      EE, EE, EE, BA, EE, EE, EE,
      BB, EE, BB, EE, BB, EE, EE,
      EE, BB, EE, EE, EE, BB, EE,
      EE, EE, BB, EE, EE, EE, EE,
    ];
    const moves = allMoves(7, 7, field);
    expect(moves.length).toBe(comb(36, 3));
    expect(movesSanityCheck(moves)).toBe(true);
  });

  it("counts moves inside and outside a circle of bases", () => {
    const field = [
      EE, EE, EE, EE, EE, EE, EE,
      EE, BB, BB, BB, BB, BB, EE,
      EE, BB, EE, EE, EE, BB, EE,
      EE, BB, EE, BA, EE, BB, EE,
      EE, BB, EE, EE, EE, BB, EE,
      EE, BB, BB, BB, BB, BB, EE,
      EE, EE, EE, EE, EE, EE, EE,
    ];
    const moves = allMoves(7, 7, field);
    expect(moves.length).toBe(comb(32, 3) - comb(24, 3));
    expect(movesSanityCheck(moves)).toBe(true);
  });

  it("counts moves in a dense base cluster (small)", () => {
    const field = [
      BB, EE, BB, EE,
      BB, BB, BB, BB,
      EE, BB, EE, EE,
      EE, EE, EE, BA,
    ];
    const moves = allMoves(4, 4, field);
    expect(moves.length).toBe(comb(8, 3) - comb(5, 3));
    expect(movesSanityCheck(moves)).toBe(true);
  });

  it("counts moves in a dense base cluster (large)", () => {
    const field = [
      BB, EE, BB, EE, EE, BB, EE,
      BB, BB, BB, BB, BB, BB, BB,
      EE, BB, EE, EE, EE, EE, BB,
      EE, EE, EE, BA, EE, EE, BB,
      BB, BB, EE, EE, EE, BB, BB,
      BB, BB, BB, BB, BB, BB, BB,
      EE, BB, EE, BB, EE, EE, BB,
    ];
    const moves = allMoves(7, 7, field);
    expect(moves.length).toBe(comb(21, 3) - comb(13, 3));
    expect(movesSanityCheck(moves)).toBe(true);
  });
});

describe("making moves", () => {
  it("applies a move and updates masks and side to move", () => {
    const game = new GameState(3, 3, [EE, RA, EE, EE, BA, EE, EE, EE, RA], BLUE);
    game.makeMove([0, 1, 2]);

    expect(game.field).toEqual([BA, BB, BA, EE, BA, EE, EE, EE, RA]);
    expect(game.toMove).toBe(RED);
    expect(game.movableMasks[RED]).toEqual([
      true, false, true, true, true, true, true, true, false,
    ]);
    expect(game.movableMasks[BLUE]).toEqual([
      false, false, false, true, false, true, true, true, true,
    ]);
  });

  it("rejects a step on an own active cell", () => {
    const game = new GameState(3, 3, [EE, BA, EE, EE, BA, EE, EE, EE, RA], BLUE);
    expect(() => game.makeMove([0, 1, 2])).toThrow();
  });

  it("rejects a step on an enemy base", () => {
    const game = new GameState(3, 3, [EE, RA, RB, EE, BA, EE, EE, EE, RA], BLUE);
    expect(() => game.makeMove([0, 1, 2])).toThrow();
  });

  it("rejects a step on an own base", () => {
    const game = new GameState(3, 3, [EE, EE, BB, EE, BA, EE, EE, EE, RA], BLUE);
    expect(() => game.makeMove([0, 1, 2])).toThrow();
  });

  it("makeMoveGetUndo + unmakeMove restores the exact state", () => {
    const field = [EE, RA, EE, EE, BA, EE, EE, EE, RA];
    const game = new GameState(3, 3, field, BLUE);
    const expectedMasks = {
      [BLUE]: [...game.movableMasks[BLUE]],
      [RED]: [...game.movableMasks[RED]],
    };

    const undo = game.makeMoveGetUndo([0, 1, 2]);
    expect(game.field).toEqual([BA, BB, BA, EE, BA, EE, EE, EE, RA]);
    expect(game.toMove).toBe(RED);

    game.unmakeMove(undo);
    expect(game.field).toEqual(field);
    expect(game.toMove).toBe(BLUE);
    expect(game.movableMasks[BLUE]).toEqual(expectedMasks[BLUE]);
    expect(game.movableMasks[RED]).toEqual(expectedMasks[RED]);
  });

  it("make/unmake round-trips through a generated move sequence", () => {
    const field = new Array(25).fill(EE);
    field[0] = BA;
    field[24] = RA;
    const game = new GameState(5, 5, field, BLUE);

    const snapshots = [];
    const undos = [];
    for (let ply = 0; ply < 4; ply++) {
      snapshots.push({ field: [...game.field], toMove: game.toMove });
      const moves = game.getAllMoves();
      expect(moves.length).toBeGreaterThan(0);
      undos.push(game.makeMoveGetUndo(moves[ply % moves.length]));
    }
    while (undos.length > 0) {
      game.unmakeMove(undos.pop());
      const snap = snapshots.pop();
      expect(game.field).toEqual(snap.field);
      expect(game.toMove).toBe(snap.toMove);
    }
  });
});
