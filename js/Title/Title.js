var Title = function () {
  var button;

  this.startButtonFunc = function () {
    game.currentScene = 1;
  }
  
  this.setup = function () {
    this.button = new Button(widthScale(0.3), heightScale(0.7), widthScale(0.4), heightScale(0.1), "start", this.startButtonFunc);
  }

  this.update = function () {
    this.button.update();
    
  }

  this.draw = function () {
    fill(0, 128, 255);
    rect(0, 0, windowWidth, windowHeight);

    // image(game.resource.titleImage, 0, 0);
    this.button.draw();
  }
}
