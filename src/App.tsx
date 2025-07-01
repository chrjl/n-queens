import { useState } from 'react';
import clsx from 'clsx';

import Board from './components/Board';

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

  return (
    <div className="flex flex-col gap-8">
      <NValueSetter n={n} setN={setN} />
      <div className="w-full h-fit min-h-24 bg-white flex justify-center-safe overflow-auto">
        <Board n={n} />
      </div>
    </div>
  );
};

export default App;
