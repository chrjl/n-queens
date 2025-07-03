/** Column index where a queen resides, for each row */
export type Solution = number[];

export default class NQueens {
  n: number;

  constructor(n: number) {
    this.n = n;
  }

  static *generateSolutions(n: number): Generator<Solution> {
    /** Columns of placed queens. current[i] refers to a queen placed in the i-th row */
    const current: number[] = [];

    /**
     * Attributes of the board occupied by existing queens.
     * - col: column
     * - diag: x-intercept of NW-SE diagonal (-(n - 1) <= diag <= n - 1)
     * - antiDiag: x-intercept of NE-SW diagonal (0 <= diag <= 2 * n - 2)
     */
    const occupied: {
      cols: Set<number>;
      diags: Set<number>;
      antiDiags: Set<number>;
    } = {
      cols: new Set(),
      diags: new Set(),
      antiDiags: new Set(),
    };

    yield* insert();
    return [];

    /** Whether a queen can be placed at (row, col) without clashing the existing pieces */
    function isGoodPosition(row: number, col: number): boolean {
      return !(
        occupied.cols.has(col) ||
        occupied.diags.has(col - row) ||
        occupied.antiDiags.has(row + col)
      );
    }

    /** Backtracking */
    function* insert(): Generator<Solution> {
      if (current.length === n) {
        yield [...current];
        return;
      }

      const row = current.length - 1;

      for (let col = 0; col < n; col++) {
        if (isGoodPosition(row, col)) {
          current.push(col);
          occupied.cols.add(col);
          occupied.diags.add(col - row);
          occupied.antiDiags.add(row + col);

          yield* insert();

          current.pop();
          occupied.cols.delete(col);
          occupied.diags.delete(col - row);
          occupied.antiDiags.delete(row + col);
        }
      }
    }
  }
}
