import { useState, useEffect, useRef } from 'react';

import NQueens from '../../lib/n-queens';
import type { Solution } from '../../lib/n-queens';

interface Props {
  n: number;
  setSolution: React.Dispatch<React.SetStateAction<Solution>>;
}

const SolutionGenerator = ({ n, setSolution }: Props) => {
  const [done, setDone] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  const generatorRef = useRef<Generator<Solution>>(
    null as unknown as Generator<Solution>
  );

  useEffect(() => {
    setDone(false);
    setCount(0);

    generatorRef.current = NQueens.generateSolutions(n);
  }, [n]);

  const handleClick = () => {
    const solution = generatorRef.current.next();

    if (solution.done === true) {
      setDone(true);
    } else {
      setCount((count) => count + 1);
      setSolution(solution.value);
    }
  };

  const handleReset = () => {
    generatorRef.current = NQueens.generateSolutions(n);
    setDone(false);
    setCount(0);
    setSolution([]);
  };

  return (
    <>
      {!done ? (
        <button type="button" className="btn btn-success" onClick={handleClick}>
          Find next solution
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
        >
          Found all solutions ({count} total). Click to reset.
        </button>
      )}
    </>
  );
};

export default SolutionGenerator;
