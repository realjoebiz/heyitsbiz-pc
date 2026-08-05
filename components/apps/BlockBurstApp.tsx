'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  COLS,
  ROWS,
  clickCell,
  getGroup,
  isValidClick,
  newGame,
  type BlockColor,
  type GameState,
} from '@/lib/block-burst';
import { playSound } from '@/lib/sounds';

const COLOR_CLASS: Record<BlockColor, string> = {
  red: 'bb-red',
  green: 'bb-green',
  blue: 'bb-blue',
  yellow: 'bb-yellow',
};

export function BlockBurstApp() {
  const [game, setGame] = useState<GameState>(() => newGame());
  const [hover, setHover] = useState<{ row: number; col: number } | null>(null);

  const hoverKeys = useMemo(() => {
    if (!hover || game.status !== 'playing' || !isValidClick(game.grid, hover.row, hover.col)) {
      return new Set<string>();
    }
    return new Set(getGroup(game.grid, hover.row, hover.col).map(({ row, col }) => `${row},${col}`));
  }, [hover, game]);

  const onCellClick = useCallback(
    (row: number, col: number) => {
      if (!isValidClick(game.grid, row, col)) {
        playSound('error');
        return;
      }
      playSound('click');
      setGame((g) => clickCell(g, row, col));
    },
    [game.grid]
  );

  const restart = () => {
    playSound('click');
    setGame(newGame());
    setHover(null);
  };

  return (
    <div className="block-burst flex h-full flex-col bg-[#1a1a2e] text-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#404060] px-2 py-1.5 text-xs">
        <span>
          Score: <strong>{game.score}</strong> · Moves: {game.moves}
        </span>
        <span className="text-[#a0a0c0]">
          {COLS}×{ROWS} · tap groups of 2+
        </span>
        <button type="button" className="win-btn px-2 py-0.5 text-xs" onClick={restart}>
          New game
        </button>
      </div>

      {game.status === 'won' ? (
        <p className="bg-[#2e7d32] px-2 py-1 text-center text-xs font-bold">Grid cleared — you win!</p>
      ) : null}
      {game.status === 'stuck' ? (
        <p className="bg-[#c62828] px-2 py-1 text-center text-xs font-bold">
          No valid moves left — game over
        </p>
      ) : null}

      <div className="min-h-0 flex-1 overflow-auto p-2">
        <div
          className="block-burst-grid mx-auto"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
          role="grid"
          aria-label="Color block puzzle"
        >
          {game.grid.map((row, r) =>
            row.map((cell, c) => {
              const key = `${r},${c}`;
              const valid = cell !== null && isValidClick(game.grid, r, c);
              const inHover = hoverKeys.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  role="gridcell"
                  disabled={!cell || game.status !== 'playing'}
                  className={[
                    'block-burst-cell',
                    cell ? COLOR_CLASS[cell] : 'bb-empty',
                    valid ? 'bb-valid' : cell ? 'bb-invalid' : '',
                    inHover ? 'bb-hover' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => onCellClick(r, c)}
                  onMouseEnter={() => setHover({ row: r, col: c })}
                  onMouseLeave={() => setHover(null)}
                  aria-label={cell ? `${cell} block` : 'empty'}
                />
              );
            })
          )}
        </div>
      </div>

      {game.status !== 'playing' ? (
        <div className="border-t border-[#404060] p-2 text-center">
          <button type="button" className="win-btn px-4 py-1 text-sm" onClick={restart}>
            Play again
          </button>
        </div>
      ) : null}
    </div>
  );
}
