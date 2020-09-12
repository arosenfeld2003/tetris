// 10 x 40 playfield ==> each cell 20px square ==> total canvas: 200px x 800px
// We are 'hiding' the top 20 rows, so the board will apear 10 x 20

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.getEmptyBoard();
  }
  
  // Get matrix filled with zeros.
  getEmptyBoard() {
    return Array.from(
      // Create a 2D array (ROWS x COLS)
      // {length: ROWS} is an iteratble array-like object
      // mapFn creates the new array for each column
      {length: ROWS}, () => Array(COLS).fill(0)
    );
  }

  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return value === 0 || (this.isInsideWalls(x, y) && this.notOccupied(x, y));
      });
    });
  }

  isInsideWalls(x, y) {
    return x >= 0 && x < COLS && y <= ROWS;
  }

  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  rotate(piece, direction) {
    // Clone with JSON for immutability.
    let p = JSON.parse(JSON.stringify(piece));
    if (!piece.hardDropped) {
      // Transpose matrix
      for (let y = 0; y < p.shape.length; ++y) {
        for (let x = 0; x < y; ++x) {
          [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
        }
      }
      // Reverse the order of the columns.
      if (direction === ROTATION.RIGHT) {
        p.shape.forEach((row) => row.reverse());
      } else if (direction === ROTATION.LEFT) {
        p.shape.reverse();
      }
    }

    return p;
  }
}

