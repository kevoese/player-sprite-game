export class Board {
  constructor(square, spriteNum) {
    this.square = (square < 30 && square) || 30;
    this.spriteNum = (spriteNum < ((square * square/2) ) && spriteNum) || 30;
    this.board = [];
    this.randomSet = new Set();
    this.player = '';
  }

  isComplete() {
    return this.randomSet.size < 1;
  }

  addPlayer() {
    let player;
    let row = Math.floor(this.square / 2);
    let column = Math.floor(this.square / 2);
    player = `${row}-${column}`;
    while (this.randomSet.has(player)) {
      Math.floor(Math.random() * 1) === 1 ? row-- : column--;
      player = `${row}-${column}`;
    }
    this.player = player;
    this.board[row][column] = 'play';
  }

  addSprites() {
    while (this.randomSet.size < this.spriteNum) {
      let row = Math.floor(Math.random() * this.square);
      let column = Math.floor(Math.random() * this.square);
      let position = `${row}-${column}`;
      this.randomSet.add(position);
    }
    this.randomSet.forEach(e => {
      const pos = e.split('-');
      const row = Number(pos[0]);
      const column = Number(pos[1]);
      this.board[row][column] = 'spri';
    });
  }

  create() {
    this.board = [];
    for (let row = 0; row < this.square; row++) {
      this.board.push([]);
      for (let column = 0; column < this.square; column++) {
        this.board[row][column] = null;
      }
    }
    return this.board;
  }
  generate() {
    if (this.board.length < 1) this.create();
    this.addSprites();
    this.addPlayer();
    return this.board;
  }

  getPos(str) {
    const pos = str.split('-');
    return {
      row: Number(pos[0]),
      column: Number(pos[1]),
    };
  }

  getShortestSprite() {
    const { row: playerRow, column: playerColumn } = this.getPos(this.player);
    let min = this.square * 2;
    let spritePos;

    this.randomSet.forEach(sprite => {
      const { row, column } = this.getPos(sprite);

      const current =
        Math.abs(row - playerRow) + Math.abs(column - playerColumn);
      if (current < min) {
        min = current;
        spritePos = sprite;
      }
    });
    return spritePos;
  }

  movePlayer() {
    if (this.randomSet.size < 1) {
      return this.board;
    }
    const shortestSprite = this.getShortestSprite();
    const { row: aimRow, column: aimColumn } = this.getPos(shortestSprite);
    let { row: oldRow, column: oldColumn } = this.getPos(this.player);
    const rowDiff = aimRow - oldRow;
    const columnDiff = aimColumn - oldColumn;
    if (rowDiff !== 0) {
      this.player = `${rowDiff > 0 ? oldRow + 1 : oldRow - 1}-${oldColumn}`;
    } else if (columnDiff !== 0) {
      this.player = `${oldRow}-${
        columnDiff > 0 ? oldColumn + 1 : oldColumn - 1
      }`;
    } else {
      return this.board;
    }

    this.board[oldRow][oldColumn] = null;
    const { row, column } = this.getPos(this.player);
    this.board[row][column] = 'play';
    if (this.randomSet.has(this.player)) this.randomSet.delete(this.player);
    return this.board;
  }
}

export class Delay {
  constructor(time) {
    this.time = time;
    this.timeout = null;
    this.close = null;
  }

  getPromise() {
    return new Promise((resolve, reject) => {
      this.close = reject;
      this.timeout = setTimeout(() => {
        resolve();
      }, this.time);
    });
  }
  cancel() {
    this.timeout && clearTimeout(this.timeout);
    this.close && this.close('unmounted');
    return { isCanceled: true };
  }
}
