var Puzzle = function () {
  var originalImage;
  var slicedImage;
  var testImage;
  var imageSize;

  var field;
  var canvasHeight;
  var fieldScale;
  var divNum;

  var clearFlag;

  this.randomMove = function(num){
    for (var i = 0; i < num; i++) {
      // 空のマスを探す
      var blankPos;
      for (var y = 0; y < this.divNum; y++) {
        for (var x = 0; x < this.divNum; x++) {
          if (this.field[y][x] == this.divNum * this.divNum - 1) {
            blankPos = [y, x];
          }
        }
      }

      // 空のマスから移動可能なマスのリストを作る
      var vecList = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      var tpos = [];
      for (var j = 0; j < 4; j++) {
        if (blankPos[0] + vecList[j][0] >= 0 && blankPos[0] + vecList[j][0] < this.divNum &&
          blankPos[1] + vecList[j][1] >= 0 && blankPos[1] + vecList[j][1] < this.divNum) {
          // tpos.push([vecList[j][0], vecList[j][1]]);
          tpos.push(new Array(2));
          tpos[tpos.length - 1][0] = blankPos[0] + vecList[j][0];
          tpos[tpos.length - 1][1] = blankPos[1] + vecList[j][1];
        }
      }
      var rand = Math.floor(Math.random() * tpos.length);
      // console.log(tpos[rand][0],tpos[rand][1]);
      var buf = this.field[tpos[rand][0]][tpos[rand][1]];
      this.field[tpos[rand][0]][tpos[rand][1]] = this.field[blankPos[0]][blankPos[1]];
      this.field[blankPos[0]][blankPos[1]] = buf;


    }


  }

  this.clearCheck = function () {
    for (var y = 0; y < this.divNum; y++){
      for (var x = 0; x < this.divNum; x++){
        if (this.field[y][x] != y * this.divNum + x) {
          return false;
        }
      }
    }
    return true;
  }

  this.setup = function () {
    this.originalImage = game.resource.puzzleImage;
    this.divNum = 3;
    this.clearFlag = false;
    this.slicedImage = new Array(this.divNum);
    for (var i = 0; i < this.divNum; i++) {
      this.slicedImage[i] = new Array(this.divNum);
    }

    for (var y = 0; y < this.divNum; y++) {
      for (var x = 0; x < this.divNum; x++) {
        this.slicedImage[y][x] = this.originalImage.get(this.originalImage.width / this.divNum * x, this.originalImage.height / this.divNum * y, this.originalImage.width / this.divNum, this.originalImage.height / this.divNum);
      }
    }

    this.imageSize = this.originalImage.width / this.divNum;

    this.field = new Array(this.divNum);
    for (var i = 0; i < this.divNum; i++){
      this.field[i] = new Array(this.divNum);
    }
    for (var y = 0; y < this.divNum; y++){
      for (var x = 0; x < this.divNum; x++){
        this.field[y][x] = y * this.divNum + x;
        // console.log(this.field[y][x]);
      }
    }
    // console.log(this.field);

    this.canvasHeight = windowHeight - 100;

    if (windowWidth > this.canvasHeight) {
      this.fieldScale = this.canvasHeight;
    } else {
      this.fieldScale = windowWidth;
    }
    this.imageSize = this.fieldScale / this.divNum;

    // this.randomMove(this.divNum*this.divNum*this.divNum);
    this.randomMove(this.divNum*this.divNum*this.divNum);
  }

  this.update = function () {
    if (this.clearFlag == true) {
      alert("Game Clear!!");
      game.currentScene = 0;
    }

    var x, y;
    if (game.input.isMouseClicked) {
      // console.log("clicked");
      if (windowWidth < this.canvasHeight) {
        // 縦長画面
        x = Math.floor(mouseX / this.fieldScale * this.divNum);
        y = Math.floor((mouseY - (this.canvasHeight - windowWidth) / 2) / this.fieldScale * this.divNum);
        // console.log(x, y);
      } else {
        // 横長画面
        x = Math.floor((mouseX - (windowWidth - this.canvasHeight) / 2) / this.fieldScale * this.divNum);
        y = Math.floor(mouseY / this.fieldScale * this.divNum);
        // console.log(x, y);
      }
    } else {
      return;
    }

    // 入力値の正誤判定
    if (x < 0 || x >= this.divNum || y < 0 || y >= this.divNum) {
      return;
    }

      // クリックしたマスの上下左右に空のマスがあるか調べる
    var tx, ty, moveFlag = false;
    // 上
    tx = x, ty = y - 1;
    var tpos = [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
    var tposIndex;
    for (var i = 0; i < 4; i++){
      if (tpos[i][0] >= 0 && tpos[i][0] < this.divNum && tpos[i][1] >= 0 && tpos[i][1] < this.divNum &&
        this.field[tpos[i][0]][tpos[i][1]] == this.divNum * this.divNum - 1) {
        moveFlag = true;
        tposIndex = i;
      }
    }

    if (moveFlag == false) {
      return;
    }

    var buf = this.field[tpos[tposIndex][0]][tpos[tposIndex][1]];
    this.field[tpos[tposIndex][0]][tpos[tposIndex][1]] = this.field[y][x];
    this.field[y][x] = buf;

    // 移動完了,クリアしたか確認
    if(this.clearCheck()==true){
      // alert("Game Clear!!");
      this.clearFlag = true;
    }

    /*if (ty >= 0 && this.field[ty][tx] == this.divNum * this.divNum - 1) {
      console.log("Move");
      moveFlag = true;
    }
    // 下
    tx = x, ty = y + 1;
    if (ty < this.divNum && this.field[ty][tx] == this.divNum * this.divNum - 1) {
      console.log("Move");
      moveFlag = true;
    }
    // 左
    tx = -1, ty = y;
    if (tx >= 0 && this.field[ty][tx] == this.divNum * this.divNum - 1) {
      console.log("Move");
      moveFlag = true;
    }
    // 右
    tx = x + 1, ty = y;
    if (tx < this.divNum && this.field[ty][tx] == this.divNum * this.divNum - 1) {
      console.log("Move");
      moveFlag = true;
    }*/

    // this.draw();
  }

  this.draw = function () {
    fill(0, 0, 255);
    push();
    // 画面サイズに合わせて絵が画面真ん中に来るようにキャンバスの大きさを変更する
    if (windowWidth < this.canvasHeight) {
      translate(0, (this.canvasHeight - windowWidth) / 2);
      // scale(windowWidth / (this.imageSize * this.divNum));
    } else {
      translate((windowWidth - this.canvasHeight) / 2, 0);
      // scale(this.canvasHeight / (this.imageSize * this.divNum));
    }
    // ellipse(mouseX, mouseY, 60, 60);
    for (var y = 0; y < this.divNum; y++) {
      for (var x = 0; x < this.divNum; x++) {
        if (this.field[y][x] != this.divNum * this.divNum - 1){
          image(this.slicedImage[Math.floor(this.field[y][x] / this.divNum)][this.field[y][x] % this.divNum],
            this.imageSize * x, this.imageSize * y, this.imageSize, this.imageSize);
        }
        noFill();
        stroke(255, 255, 255);
        strokeWeight(2);
        rect(this.imageSize * x, this.imageSize * y, this.fieldScale / this.divNum, this.fieldScale / this.divNum);
      }
    }

    pop();
  }
}
