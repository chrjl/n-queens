# N Queens Visualizer

The n queens problem is the problem of placing n chess queens on an n x n board such that no two queens threaten each other, i.e. no two queens share a row, column, or diagonal. This app uses a backtracking depth-first search algorithm to find and yield solutions, one at a time.

## Development

Solutions are yielded from a generator function (`lib/n-queens.ts`). Mocha is set up for use with TypeScript and ESM for testing.

```
npm run test
npm exec mocha -- --loader=ts-node/esm tests/*.spec.ts
```

Run Vite development server (default port `5173`):

```
npm run dev
```

Build and preview (default out dir `dist/`, default port `4173`):

```
npm run build
npm run preview
```

# Components

Front-end stack: React, Tailwind CSS, Daisy UI

## Solver

Solutions are iterated through on user input by the `SolutionGenerator` component, which sets the currently displayed solution to a state variable `current`.

Solutions can be verified by clicking on a queen to highlight its row, column, and diagonals.

## Visualizer

`Board` component composed of `Cell` components residing in nested flexbox `<div>`s. The size (dimension) of the `Board` is controlled by a state variable: `n`.

Display of `Cell`s is controlled by the following state variables, which determine whether the cell has a queen displayed or is highlighted as a cell that can be attacked by the selected queen:

- `current`: the currently displayed solution
- `selected`: indices of currently user-selected cell
