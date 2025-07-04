import { memo } from 'react';
import clsx from 'clsx';

interface CellProps {
  dark?: boolean;
  occupied?: boolean;
}

const Cell = memo(({ dark, occupied }: CellProps) => {
  return (
    <div
      className={clsx(
        'w-8',
        'h-8',
        'text-center',
        dark ? 'bg-black' : 'bg-white',
        occupied &&
          (dark
            ? "bg-[url('/img/queen-white.svg')]"
            : "bg-[url('/img/queen-black.svg')]")
      )}
    ></div>
  );
});

interface BoardProps {
  n: number;
  pieces?: number[][];
}

const Board = ({ n, pieces }: BoardProps) => {
  const cells = Array.from(Array(n), () => Array(n));
  const piecesSet = new Set(pieces?.map(([i, j]) => `${i},${j}`));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      cells[i][j] = (
        <Cell
          key={i + ',' + j}
          dark={(i + j) % 2 === 0}
          occupied={piecesSet.has(`${i},${j}`)}
        />
      );
    }
  }

  if (n <= 0) {
    return;
  }

  return (
    <div className="m-8 inline-flex flex-col border-2 border-black">
      {cells.map((row, i) => (
        <div key={i} className="flex flex-row">
          {row}
        </div>
      ))}
    </div>
  );
};

export default Board;
