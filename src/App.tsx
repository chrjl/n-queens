import { useState, useEffect } from 'react';
import clsx from 'clsx';

import Board from './components/Board';
import SolutionGenerator from './components/SolutionGenerator';
import Dialog from './components/Dialog';
import info from './assets/info.svg';

import type { Solution } from '../lib/n-queens';

interface NValueSetterProps {
  n: number;
  setN: React.Dispatch<React.SetStateAction<number>>;
}

const NValueSetter = ({ n, setN }: NValueSetterProps) => {
  const [input, setInput] = useState<string>('1');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setN(+input);
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInput(String(n));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <form
      className="join inline-block text-center"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <label
        className={clsx(
          'input',
          'w-32',
          n == +input ? 'input-default' : 'input-error'
        )}
      >
        <span className="label">N = </span>
        <input
          type="number"
          step="1"
          min="1"
          autoComplete="off"
          value={input}
          onChange={handleChangeInput}
        />
      </label>

      <button
        type="submit"
        disabled={n === +input}
        className="btn btn-error join-item"
      >
        Update
      </button>

      <button
        type="reset"
        disabled={n === +input}
        className="btn btn-outline btn-error join-item"
      >
        Reset
      </button>
    </form>
  );
};

const App = () => {
  const [n, setN] = useState<number>(1);
  const [current, setCurrent] = useState<Solution>([]);

  useEffect(() => {
    setCurrent([]);
  }, [n]);

  const openModal = (element?: HTMLElement | null) => {
    if (!(element instanceof HTMLDialogElement)) {
      return;
    }

    element.showModal();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-center items-center gap-x-8">
        <NValueSetter n={n} setN={setN} />

        <button
          className="group btn btn-circle btn-xs btn-info btn-outline border-2 border-black dark:border-white hover:border-0"
          onClick={() => openModal(document.getElementById('info'))}
        >
          <img className="h-1/2 dark:invert group-hover:invert group-hover:dark:invert-0" src={info} />
        </button>
      </div>

      <div className="flex flex-row justify-center">
        <SolutionGenerator n={n} setSolution={setCurrent} />
      </div>

      <div className="w-full h-fit min-h-24 bg-white flex justify-center-safe overflow-auto">
        <Board n={n} pieces={current.map((col, row) => [row, col])} />
      </div>

      <Dialog id="info">
        <p className="py-4">
          Verify the validity of a displayed solution by clicking on a queen to
          highlight its row, column, and diagonals.
        </p>
      </Dialog>
    </div>
  );
};

export default App;
