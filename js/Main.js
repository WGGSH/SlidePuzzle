//Main.js

var game;

function setup() {
  // キャンバスの作成
  createCanvas(windowWidth, windowHeight);

  // ゲームクラスの初期化
  game = new Game();
  game.setup();

} 

// メインループ
function draw() {
  game.update();
}
