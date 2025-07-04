import { memo, useState, useEffect } from 'react';
import clsx from 'clsx';

interface CellProps {
  row?: number;
  col?: number;
  dark?: boolean;
  occupied?: boolean;
  selected?: boolean;
  orthogonal?: boolean;
  diagonal?: boolean;
}

const Cell = memo(
  ({ row, col, dark, occupied, selected, orthogonal, diagonal }: CellProps) => {
    return (
      <div
        className={clsx('w-8', 'h-8', 'text-center', {
          'hover:cursor-pointer': occupied,
          "bg-[url('/img/queen-black.svg')]": occupied && !selected && !dark,
          "bg-[url('/img/queen-white.svg')]": occupied && !selected && dark,
          "bg-[url('/img/queen-black-solid.svg')]": selected && !dark,
          "bg-[url('/img/queen-white-solid.svg')]": selected && dark,
          'bg-yellow-300': orthogonal && !occupied,
          'bg-orange-300': diagonal && !occupied,
          'bg-red-600': occupied && (orthogonal || diagonal),
          'border-3 border-white': !occupied && (orthogonal || diagonal),
          'bg-black': dark && !(orthogonal || diagonal),
          'bg-white': !dark && !(orthogonal || diagonal),
        })}
        data-occupied={occupied}
        data-row={row}
        data-col={col}
      ></div>
    );
  }
);

interface BoardProps {
  n: number;
  pieces?: number[][];
}

const Board = ({ n, pieces }: BoardProps) => {
  const [selected, setSelected] = useState<[number, number]>();

  useEffect(() => {
    setSelected(undefined);
  }, [n, pieces]);

  if (n <= 0) {
    return;
  }

  const isOrthogonal = (i: number, j: number): boolean => {
    if (!selected || (i === selected[0] && j === selected[1])) {
      return false;
    }

    if (i === selected[0] || j === selected[1]) {
      return true;
    }

    return false;
  };

  const isDiagonal = (i: number, j: number): boolean => {
    if (!selected || (i === selected[0] && j === selected[1])) {
      return false;
    }

    if (
      i + j === selected[0] + selected[1] ||
      i - j === selected[0] - selected[1]
    ) {
      return true;
    }

    return false;
  };

  const cells = Array.from(Array(n), () => Array(n));
  const piecesSet = new Set(pieces?.map(([i, j]) => `${i},${j}`));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      cells[i][j] = (
        <Cell
          key={i + ',' + j}
          row={i}
          col={j}
          dark={(i + j) % 2 === 0}
          selected={selected && i === selected[0] && j === selected[1]}
          occupied={piecesSet.has(`${i},${j}`)}
          orthogonal={isOrthogonal(i, j)}
          diagonal={isDiagonal(i, j)}
        />
      );
    }
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement;

    if (target.dataset.occupied === 'false') {
      return;
    }

    if (target.dataset.row && target.dataset.col) {
      if (
        selected &&
        +target.dataset.row === selected[0] &&
        +target.dataset.col === selected[1]
      ) {
        setSelected(undefined);
      } else {
        setSelected([
          parseInt(target.dataset.row),
          parseInt(target.dataset.col),
        ]);
      }
    }
  }

  function handleKeydown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      setSelected(undefined);
    }
  }

  return (
    <div
      className="m-8 inline-flex flex-col border-2 border-black"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeydown}
    >
      {cells.map((row, i) => (
        <div key={i} className="flex flex-row">
          {row}
        </div>
      ))}
    </div>
  );
};

export default Board;
