import assert from 'node:assert';

import NQueens from '../lib/n-queens';
import Board from '../lib/board';

const solutions = [
  [[]],
  [[0]],
  [],
  [],
  [
    [1, 3, 0, 2],
    [2, 0, 3, 1],
  ],
  [
    [0, 2, 4, 1, 3],
    [0, 3, 1, 4, 2],
    [1, 3, 0, 2, 4],
    [1, 4, 2, 0, 3],
    [2, 0, 3, 1, 4],
    [2, 4, 1, 3, 0],
    [3, 0, 2, 4, 1],
    [3, 1, 4, 2, 0],
    [4, 1, 3, 0, 2],
    [4, 2, 0, 3, 1],
  ],
  [
    [1, 3, 5, 0, 2, 4],
    [4, 2, 0, 5, 3, 1],
    [3, 0, 4, 1, 5, 2],
    [2, 5, 1, 4, 0, 3],
  ],
];

const counts = [1, 1, 0, 0, 2, 10, 4, 40, 92, 352, 724, 2680, 14200];

describe('N Queens solutions for n <= 6', function () {
  for (let i = 1; i <= 6; i++) {
    let count = 0;

    it(`should find all solutions for i = ${i}`, function () {
      const calculated = NQueens.generateSolutions(i);
      const actual = new Set(
        solutions[i].map((solution) => solution.join(','))
      );

      for (const test of calculated) {
        const board = new Board(
          i,
          test.map((val, row) => [row, val])
        );

        assert(actual.has(test.join(',')));
        assert(board.isGood());

        count++;
      }

      assert.equal(count, solutions[i].length);
    });
  }
});

describe('N-Queens solution counts', function () {
  for (let i = 7; i <= 12; i++) {
    let count = 0;

    it(`should find the right solution count for i = ${i}`, function () {
      const calculated = NQueens.generateSolutions(i);

      while (calculated.next().done == false) {
        count++;
      }

      assert.equal(count, counts[i]);
    });
  }
});
