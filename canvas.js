function rStr(N) {
  return Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);
}

class Player {
  constructor(id, color) {
    if (id === null) this.id = rStr(8);
    else this.id = id;
    this.color = color;
  }
  setPosition({x, y}) {
    this.x = x;
    this.y = y;
  }
  getPosition() {
    return {
      x: this.x,
      y: this.y
    }
  }
  getColor() { return this.color; }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.divisions = 20;
    this.unit = 1/this.divisions;
    this.rcanvas = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.players = []; // array of players
    // create player 1
    const myPlayer = new Player(null, 'rgb(255,0,0)');
    myPlayer.setPosition({x : 1, y: 1});
    this.registerPlayer(myPlayer);
    this.onResize(); // resize canvas
  }
  toRealX(x) {
    return Math.floor(x*this.rcanvas.width + this.rcanvas.x);
  }
  toRealY(y) {
    return Math.floor(y*this.rcanvas.height + this.rcanvas.y);
  }
  toRealW(w) {
    return Math.floor(w*this.rcanvas.width);
  }
  toRealH(h) {
    return Math.floor(h*this.rcanvas.height);
  }
  rect(x, y, w, h) {
    return this.ctx.rect(this.toRealX(x), this.toRealY(y), this.toRealW(w), this.toRealH(h));
  }
  moveTo(x, y) {
    return this.ctx.moveTo(this.toRealX(x), this.toRealY(y));
  }
  lineTo(x, y) {
    return this.ctx.lineTo(this.toRealX(x), this.toRealY(y));
  }
  drawCanvas() {
    const padding = 20;
    const innerPad = 10;
    // background
    this.ctx.fillStyle = 'rgb(100,100,100)';
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
    // inner canvas
    const minSize = Math.min(window.innerWidth, window.innerHeight) - padding;
    const startX = Math.round((window.innerWidth - minSize) / 2);
    const startY = Math.round((window.innerHeight - minSize) / 2);

    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgb(255,255,255)';
    this.ctx.rect(startX, startY, minSize, minSize);
    this.rect(0, 0, 1, 1);
    this.ctx.fill();

    // save real canvas size
    this.rcanvas.x = startX + innerPad;
    this.rcanvas.y = startY + innerPad;
    this.rcanvas.width = minSize - 2*innerPad;
    this.rcanvas.height = minSize - 2*innerPad;
  }
  drawBoard() {
    this.ctx.beginPath();
    const frac = this.divisions;
    // outer rectangle
    this.rect(0,0,1,1);
    // inner rectangle
    for(let i = 1; i < frac; i += 1) {
      this.moveTo(i/frac, 0);
      this.lineTo(i/frac, 1);
      this.moveTo(0, i/frac);
      this.lineTo(1, i/frac);
    }
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'rgb(0,0,0)';
    this.ctx.stroke();
  }
  drawPlayers() {
    this.players.forEach((p) => {
      const pos = p.getPosition(); // 0 <= pos.x, pos.y < divisions
      const color = p.getColor();
      // draw a player
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.rect(pos.x*this.unit, pos.y*this.unit, this.unit, this.unit);
      this.ctx.fill();
    });
  }
  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.drawCanvas();
    this.drawBoard();
    this.drawPlayers();
  }
  registerPlayer(p) { // p is a Player
    this.players.push(p);
  }
  onKeyDown(event) {
    const keyPressed = String.fromCharCode(event.keyCode);
  	console.log('Pressed', keyPressed, event.keyCode);
  }
}

window.onload = function() {
    const canvas = document.getElementById('canvas');
    const game = new Game(canvas);
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', game.onResize.bind(game), false);
    document.addEventListener('keydown', game.onKeyDown.bind(game), false);
    function drawStuff() {
      // do your drawing stuff here
    }
};
