const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
// canvas for 'next' piece
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
// canvas for 'hold' piecce
const canvasHold = document.getElementById('hold');
const ctxHold = canvasHold.getContext('2d');

let accountValues = {
  score: 0,
  level: 0,
  lines: 0
};

function updateAccount(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
}

let account = new Proxy(accountValues, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  }
});

moves = {
  [KEY.LEFT]:   (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]:  (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]:   (p) => ({ ...p, y: p.y + 1 }),
  [KEY.SPACE]:  (p) => ({ ...p, y: p.y + 1 }),
  [KEY.UP]:     (p) => board.rotate(p, ROTATION.RIGHT),
  [KEY.Q]:      (p) => board.rotate(p, ROTATION.LEFT),
  [KEY.C]:      (p) => board.swap()
};

let board = new Board(ctx, ctxNext, ctxHold);

initSidePanel(ctxNext);
initSidePanel(ctxHold);

function initSidePanel(ctx) {
  // Calculate size of canvas from constants.
  ctx.canvas.width = 4 * BLOCK_SIZE;
  ctx.canvas.height = 4 * BLOCK_SIZE;
  ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
}

function addEventListener() {
  document.removeEventListener('keydown', handleKeyPress);
  document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
  if (event.keyCode === KEY.P) {
    pause();
  }
  if (event.keyCode === KEY.ESC) {
    gameOver();
  } else if (moves[event.keyCode]) {
    event.preventDefault();
    // Get new state
    let p = moves[event.keyCode](board.piece);
    if (event.keyCode === KEY.SPACE) {
      // Hard drop
      while (board.valid(p)) {
        account.score += POINTS.HARD_DROP;
        board.piece.move(p);
        p = moves[KEY.DOWN](board.piece);
      }
      board.piece.hardDrop();
    } else if (board.valid(p)) {
      board.piece.move(p);
      if (event.keyCode === KEY.DOWN) {
        account.score += POINTS.SOFT_DROP;
      }
    }
  }
}

function resetGame() {
  account.score = 0;
  account.lines = 0;
  account.level = 0;
  board.reset();
  time = { start: performance.now(), elapsed: 0, level: LEVEL[account.level] };
}

let requestId = null;
let time = null;

function play() {
  addEventListener();
  resetGame();

  // If we have an old game running then cancel it
  if (requestId) {
    cancelAnimationFrame(requestId);
  }

  animate();
}

function animate(now = 0) {
  time.elapsed = now - time.start;
  if (time.elapsed > time.level) {
    time.start = now;
    if (!board.drop()) {
      gameOver();
      return;
    }
  }

  // Clear board before drawing new state.
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  board.draw();
  requestId = requestAnimationFrame(animate);
}

function gameOver() {
  cancelAnimationFrame(requestId);
  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText('GAME OVER', 1.8, 4);
}

function pause() {
  if (!requestId) {
    animate();
    return;
  }

  cancelAnimationFrame(requestId);
  requestId = null;

  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText('PAUSED', 3, 4);
}