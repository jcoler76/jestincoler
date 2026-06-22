"use client";

import { useEffect, useState } from "react";
import { createGame, step, turn, type Dir, type SnakeState } from "./engine";

const COLS = 24;
const ROWS = 14;
const TICK_MS = 110;

const KEY_DIR: Record<string, Dir> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

function draw(state: SnakeState): string {
  const cell = new Map<string, "head" | "body">();
  state.snake.forEach((p, i) => cell.set(`${p.x},${p.y}`, i === 0 ? "head" : "body"));
  const rows: string[] = [];
  for (let y = 0; y < state.rows; y++) {
    let line = "";
    for (let x = 0; x < state.cols; x++) {
      const k = `${x},${y}`;
      if (cell.get(k) === "head") line += "●";
      else if (cell.get(k) === "body") line += "■";
      else if (state.food.x === x && state.food.y === y) line += "◆";
      else line += "·";
    }
    rows.push(line);
  }
  return rows.join("\n");
}

export default function SnakeGame({ onExit }: { onExit: () => void }) {
  const [state, setState] = useState<SnakeState>(() => createGame(COLS, ROWS));

  useEffect(() => {
    if (state.over) return;
    const id = window.setInterval(() => setState((s) => step(s)), TICK_MS);
    return () => window.clearInterval(id);
  }, [state.over]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === "q") {
        onExit();
        return;
      }
      if (key === "r") {
        setState(createGame(COLS, ROWS));
        return;
      }
      const dir = KEY_DIR[key];
      if (dir) {
        e.preventDefault();
        setState((s) => turn(s, dir));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 font-mono text-[#56d364]">
      <div className="text-[12px] text-[#8b949e]">
        score <span className="text-[#56d364]">{state.score}</span> · arrows/wasd · r restart · q quit
      </div>
      <pre aria-label="snake board" className="text-[13px] leading-[1.05] tracking-[0.18em]">
        {draw(state)}
      </pre>
      {state.over && (
        <div className="text-[13px] text-[#ff7b72]">
          game over — score {state.score} · r to play again · q to quit
        </div>
      )}
    </div>
  );
}
