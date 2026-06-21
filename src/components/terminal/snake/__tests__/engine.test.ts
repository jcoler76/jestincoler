import { describe, it, expect } from "vitest";
import { createGame, step, turn, type SnakeState } from "../engine";

describe("snake engine", () => {
  it("createGame: 3-cell snake heading right, food off the snake, not over", () => {
    const g = createGame(10, 10, () => 0);
    expect(g.snake).toHaveLength(3);
    expect(g.dir).toBe("right");
    expect(g.over).toBe(false);
    expect(g.score).toBe(0);
    const onSnake = g.snake.some((p) => p.x === g.food.x && p.y === g.food.y);
    expect(onSnake).toBe(false);
  });

  it("turn ignores a 180° reversal but accepts a perpendicular turn", () => {
    const g = createGame(10, 10, () => 0);
    expect(turn(g, "left").dir).toBe("right");
    expect(turn(g, "up").dir).toBe("up");
  });

  it("step moves the head one cell in the current direction", () => {
    const g = createGame(10, 10, () => 0);
    const head = g.snake[0];
    const next = step(g, () => 0);
    expect(next.snake[0]).toEqual({ x: head.x + 1, y: head.y });
    expect(next.snake).toHaveLength(3);
  });

  it("step onto food grows the snake, increments score, and replaces the food", () => {
    const base = createGame(10, 10, () => 0);
    const state: SnakeState = { ...base, snake: [{ x: 2, y: 2 }, { x: 1, y: 2 }, { x: 0, y: 2 }], dir: "right", food: { x: 3, y: 2 } };
    const next = step(state, () => 0);
    expect(next.snake[0]).toEqual({ x: 3, y: 2 });
    expect(next.snake).toHaveLength(4);
    expect(next.score).toBe(1);
    expect(next.food).not.toEqual({ x: 3, y: 2 });
  });

  it("step into a wall ends the game", () => {
    const base = createGame(10, 10, () => 0);
    const state: SnakeState = { ...base, snake: [{ x: 9, y: 5 }, { x: 8, y: 5 }, { x: 7, y: 5 }], dir: "right" };
    expect(step(state, () => 0).over).toBe(true);
  });

  it("step into its own body ends the game", () => {
    const base = createGame(10, 10, () => 0);
    const state: SnakeState = {
      ...base,
      snake: [{ x: 2, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }],
      dir: "right",
    };
    expect(step(state, () => 0).over).toBe(true);
  });
});
