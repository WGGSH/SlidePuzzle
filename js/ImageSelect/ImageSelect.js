var ImageSelect = function () {
  var currentImage;
  var currentIndex;
  var select;

  var selectChanged = function () {
    var item = game.sceneList[2].select.value();
    console.log(item);
  }

  this.setup = function () {
    this.currentIndex = 0;
    this.currentImage = game.resource.puzzleImage[this.currentIndex];
    game.sceneList[1].originalImageIndex = this.currentIndex;

    this.select = createSelect();
    var fontSize = Math.floor(windowHeight / 40) + 'px';
    var width;
    if (windowWidth > windowHeight) {
      width = Math.floor(windowHeight*0.8) + 'px';
    } else {
      width = Math.floor(windowWidth) + 'px';
    }
    this.select.option('0:プロ生ちゃん01');
    this.select.option('1:プロ生ちゃん02');
    this.select.option('2:プロ生ちゃん03');

    this.select.style('font-size', fontSize);
    this.select.style('width', width);
    this.select.position(widthScale(0.5) - this.select.width / 2, heightScale(0.80));

    this.select.changed(function () {
      // console.log(game.sceneList[2].select.value()[0]);
      game.sceneList[2].currentIndex = game.sceneList[2].select.value()[0];
      game.sceneList[1].originalImageIndex = game.sceneList[2].currentIndex;
      game.sceneList[2].currentImage = game.resource.puzzleImage[game.sceneList[2].currentIndex];
    });

    var startButton = createButton('Start');
    startButton.style('font-size', fontSize);
    startButton.style('width', width);
    startButton.position(widthScale(0.5) - startButton.width / 2, heightScale(0.9));
    startButton.mouseClicked(function () {
      game.nextScene = 1;
    });
  }

  this.update = function () {
    
    // if (game.input.isMouseClicked) {
    //   game.nextScene = 1;
    // }
  }

  this.draw = function () {
    background(0, 128, 255);
    if (windowWidth > windowHeight * 0.7) {
      image(this.currentImage, windowWidth/2-windowHeight*0.35, 0, windowHeight*0.7, windowHeight*0.7);
    } else {
      image(this.currentImage, 0, 0, windowWidth, windowWidth);
    }
  }
}
