import assert from 'assert';
import Board from '../src/board';

describe('Add pieces to n=2 board and test whether the board is valid', function () {
  const board = new Board(2);

  it('Adding first piece should be valid', function () {
    board.add([0, 0]);
    console.log(board.stringify());

    assert(board.isGood());
  });

  it('Adding second piece should be invalid', function () {
    board.add([1, 1]);
    console.log(board.stringify());

    assert(!board.isGood());
  });
});

describe('Add pieces to n=4 board and test whether the board is valid', function () {
  const board = new Board(4);

  it('Adding first piece should be valid', function () {
    board.add([0, 1]);
    console.log(board.stringify());

    assert(board.isGood());
  });

  it('Adding valid piece', function () {
    board.add([1, 3]);
    console.log(board.stringify());

    assert(board.isGood());
  });

  it('Adding valid piece', function () {
    board.add([2, 0]);
    console.log(board.stringify());

    assert(board.isGood());
  });

  it('Adding invalid piece', function () {
    board.add([3, 1]);
    console.log(board.stringify());

    assert(!board.isGood());
  });
});
