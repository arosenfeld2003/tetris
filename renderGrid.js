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
}

