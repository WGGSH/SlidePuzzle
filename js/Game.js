var Game = function () {
  var input;
  var resource;
  var preScene;
  var currentScene;
  var scene;

  this.setup = function () {
    this.resource = new Resource();
    this.input = new Input();
    this.preScene = 0;
    this.currentScene = 0;

    this.scene = new Array(2);
    this.scene[0] = new Title();
    this.scene[1] = new Puzzle();

    for (var i = 0; i < 2; i++){
      // this.scene[i].setup();
    }
    this.scene[this.currentScene].setup();
  }

  this.update = function () {
    background(0);
    this.input.update();
    this.scene[this.currentScene].update();
    this.scene[this.currentScene].draw();

    // シーン遷移が行われる
    if (this.preScene != this.currentScene) {
      this.scene[this.currentScene].setup();
    }

    this.preScene = this.currentScene;
  }
}
