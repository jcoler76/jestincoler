export type Dir = "up" | "down" | "left" | "right";
export interface Point {
  x: number;
  y: number;
}
export interface SnakeState {
  cols: number;
  rows: number;
  snake: Point[]; // head first
  dir: Dir;
  food: Point;
  score: number;
  over: boolean;
}

const DELTA: Record<Dir, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPPOSITE: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };

function placeFood(cols: number, rows: number, snake: Point[], rand: () => number): Point {
  const taken = new Set(snake.map((p) => `${p.x},${p.y}`));
  const free: Point[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!taken.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  if (free.length === 0) return snake[0];
  return free[Math.floor(rand() * free.length)];
}

export function createGame(cols: number, rows: number, rand: () => number = Math.random): SnakeState {
  const cx = Math.floor(cols / 2);
  const cy = Math.floor(rows / 2);
  const snake: Point[] = [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy },
  ];
  return { cols, rows, snake, dir: "right", food: placeFood(cols, rows, snake, rand), score: 0, over: false };
}

export function turn(state: SnakeState, dir: Dir): SnakeState {
  if (state.over || dir === OPPOSITE[state.dir]) return state;
  return { ...state, dir };
}

export function step(state: SnakeState, rand: () => number = Math.random): SnakeState {
  if (state.over) return state;
  const d = DELTA[state.dir];
  const head = state.snake[0];
  const next: Point = { x: head.x + d.x, y: head.y + d.y };

  if (next.x < 0 || next.x >= state.cols || next.y < 0 || next.y >= state.rows) {
    return { ...state, over: true };
  }
  const ate = next.x === state.food.x && next.y === state.food.y;
  const body = ate ? state.snake : state.snake.slice(0, -1);
  if (body.some((p) => p.x === next.x && p.y === next.y)) {
    return { ...state, over: true };
  }
  const snake = [next, ...body];
  if (ate) {
    return { ...state, snake, score: state.score + 1, food: placeFood(state.cols, state.rows, snake, rand) };
  }
  return { ...state, snake };
}
