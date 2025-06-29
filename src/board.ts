export default class Board {
  n: number;
  pieces: Set<string>;

  constructor(n: number, pieces?: [number, number][]) {
    this.n = n;
    this.pieces = new Set();

    if (pieces) {
      for (const piece of pieces) {
        this.pieces.add(this.hash(...piece));
      }
    }
  }

  /** Create a string, acting as a tuple, out of two integers */
  hash(row: number, col: number) {
    return `${Math.floor(row)};${Math.floor(col)}`;
  }

  unhash(hash: string) {
    return hash.split(';').map((val) => +val);
  }

  /** Return a string representation of the board and pieces on it. */
  stringify() {
    let result = '\n';
    const border = '+' + '---+'.repeat(this.n);

    result += border;

    for (let i = 0; i < this.n; i++) {
      let row = '\n|';

      for (let j = 0; j < this.n; j++) {
        row += this.pieces.has(this.hash(i, j)) ? ' x |' : '   |';
      }

      result += row;
      result += '\n' + border;
    }

    return result;
  }

  /** Add a piece to the board. */
  add(pos: [number, number]) {
    if (pos[0] >= this.n || pos[1] >= this.n) {
      return;
    }

    this.pieces.add(this.hash(pos[0], pos[1]));
  }

  /** Check if the board is a valid combination of queens that don't clash. */
  isGood() {
    const occupied = {
      rows: new Set(),
      cols: new Set(),
      diags: new Set(),
      antiDiags: new Set(),
    };

    for (const piece of this.pieces) {
      const [row, col] = this.unhash(piece);

      if (occupied.rows.has(row)) {
        return false;
      } else {
        occupied.rows.add(row);
      }

      if (occupied.cols.has(col)) {
        return false;
      } else {
        occupied.cols.add(col);
      }

      if (occupied.diags.has(col - row)) {
        return false;
      } else {
        occupied.diags.add(col - row);
      }

      if (occupied.antiDiags.has(row + col)) {
        return false;
      } else {
        occupied.antiDiags.add(row + col);
      }
    }

    return true;
  }
}
