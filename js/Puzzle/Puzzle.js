var Puzzle = function () {
  var originalImage;
  var slicedImage;
  var testImage;
  var imageSize;

  var field;
  var canvasHeight;

  this.setup = function () {
    this.originalImage = game.resource.puzzleImage;

    this.slicedImage = new Array(4);
    for (var i = 0; i < 4; i++) {
      this.slicedImage[i] = new Array(4);
    }
    this.testImage = this.originalImage.get(0, 0, 50, 50);
    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 4; x++) {
        this.slicedImage[y][x] = this.originalImage.get(this.originalImage.width / 4 * x, this.originalImage.height / 4 * y, this.originalImage.width / 4, this.originalImage.height / 4);
        
      }
    }

    this.imageSize = this.originalImage.width / 4;

    this.field = new Array(4);
    for (var i = 0; i < 4; i++){
      this.field[i] = new Array(4);
    }
    for (var y = 0; y < 4; y++){
      for (var x = 0; x < 4; x++){
        this.field[y][x] = y * 4 + x;
      }
    }
    // console.log(this.field);

    this.canvasHeight = windowHeight - 100;
  }

  this.update = function () {
    fill(0, 0, 255);
    push();
    // 画面サイズに合わせて絵が画面真ん中に来るようにキャンバスの大きさを変更する
    if (windowWidth < this.canvasHeight) {
      translate(0, (this.canvasHeight - windowWidth) / 2);
      scale(windowWidth / (this.imageSize * 4));
    } else {
      translate((windowWidth - this.canvasHeight) / 2, 0);
      scale(this.canvasHeight / (this.imageSize * 4));
    }
    // ellipse(mouseX, mouseY, 60, 60);
    for (var y = 0; y < 4; y++){
      for (var x = 0; x < 4; x++){
        if (this.field[y][x] != 15) {
          image(this.slicedImage[Math.floor(this.field[y][x] / 4)][this.field[y][x] % 4], this.imageSize * x,
            this.imageSize * y);
        }
        noFill();
        stroke(255, 255, 255);
        strokeWeight(2);
        rect(this.imageSize * x, this.imageSize * y, this.imageSize, this.imageSize);
      }
    }

    pop();
  }
}
