var Game = function () {
  var input; // クリック(タップ)の入力状態
  var resource; // 画像データなどの保持クラス
  var currentScene; // 現在のシーン
  // var preScene; // 1フレーム前のシーン
  var nextScene; // 次のフレームで呼び出すシーン
  var sceneList; // シーンリスト

  this.setup = function () {
    // 入力状態,リソースの初期化
    this.resource = new Resource();
    this.input = new Input();

    // シーン状態の初期化
    // this.preScene = 0;
    this.currentScene = 0;
    this.nextScene = 0;

    // シーンリストの作成
    this.sceneList = new Array(3);
    this.sceneList[0] = new Title();
    this.sceneList[1] = new Puzzle();
    this.sceneList[2] = new ImageSelect();

    // 初めに読み込まれるシーンを初期化
    this.sceneList[this.currentScene].setup();
  }

  this.update = function () {
    // シーン遷移が行われる場合,次のシーンを初期化する
    if (this.nextScene != this.currentScene) {
      removeElements();
      this.sceneList[this.nextScene].setup();
      this.currentScene = this.nextScene;
    }
    // 入力状態の取得
    this.input.update();

    // 画面をリセット
    background(0);

    // シーン番号を記憶
    this.nextScene = this.currentScene;

    // 実行中のシーンを更新
    this.sceneList[this.currentScene].update();
    this.sceneList[this.currentScene].draw();

  }
}
