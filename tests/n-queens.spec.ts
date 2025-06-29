import assert from 'node:assert';

import NQueens from '../lib/n-queens';
import Board from '../lib/board';

describe('N Queens solutions', function () {
  const answers = [1, 1, 0, 0, 2, 10, 4, 40, 92, 352, 724, 2680, 14200];

  for (let i = 1; i <= 12; i++) {
    it(`n = ${i} (${answers[i]} solutions)`, function () {
      const instance = new NQueens(i);
      instance.solve();

      instance.solutions.forEach((solution) => {
        const board = new Board(i, solution);
        assert(board.isGood());
      });

      assert.equal(instance.solutions.length, answers[i]);
    });
  }
});
