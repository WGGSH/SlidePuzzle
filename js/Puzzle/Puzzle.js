var Puzzle = function () {
  var originalImageIndex; // 使用する画像番号
  var originalImage; // 元画像
  var slicedImage; // 分割画像
  var imageSize; // 画像の一辺の長さ

  var field; // 各パネルの値
  var canvasHeight; // 画面全体のうち,ゲームに使用する領域の高さ
  var fieldScale; // ゲームに使用する領域の一辺の長さ
  var divNum; // パズルの分割数

  var showNumberFlag; // 数字を表示するかのフラグ
  var showOriginalImageFlag; // 元画像を表示するかのフラグ
  var clearFlag; // クリアフラグ

  var buttonShowNumber;

  this.setDivNum = function (num) {
    // this.divNum = num;
    this.divNum = Math.floor(num);
  }

  // ランダムに1回移動する関数
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
          tpos.push(new Array(2));
          tpos[tpos.length - 1][0] = blankPos[0] + vecList[j][0];
          tpos[tpos.length - 1][1] = blankPos[1] + vecList[j][1];
        }
      }
      var rand = Math.floor(Math.random() * tpos.length);
      var buf = this.field[tpos[rand][0]][tpos[rand][1]];
      this.field[tpos[rand][0]][tpos[rand][1]] = this.field[blankPos[0]][blankPos[1]];
      this.field[blankPos[0]][blankPos[1]] = buf;
    }


  }

  // パズルが完成したか確認する関数
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
    this.originalImage = game.resource.puzzleImage[this.originalImageIndex];
    // this.divNum = 5;
    console.log(this.divNum);
    this.clearFlag = false;
    this.showNumberFlag = false;
    this.showOriginalImageFlag = false;

    // パズル用の分割画像を作成
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

    // ゲームフィールドの初期化
    this.field = new Array(this.divNum);
    for (var i = 0; i < this.divNum; i++){
      this.field[i] = new Array(this.divNum);
    }
    for (var y = 0; y < this.divNum; y++){
      for (var x = 0; x < this.divNum; x++){
        this.field[y][x] = y * this.divNum + x;
      }
    }

    // ゲームに使用するキャンバスサイズの設定
    // 画面全体のうち,下を少し空け,残りの領域が縦長か横長かでわける
    this.canvasHeight = windowHeight - 100;

    if (windowWidth > this.canvasHeight) {
      this.fieldScale = this.canvasHeight;
    } else {
      this.fieldScale = windowWidth;
    }
    this.imageSize = this.fieldScale / this.divNum;

    // 盤面のシャッフル
    // 分割数^4回ランダムに移動する
    // 移動回数は要検討
    this.randomMove(this.divNum * this.divNum * this.divNum * this.divNum);
    
    // UIの登録
    var buttonNumber = createButton("数字を表示");
    var fontSize = Math.floor(windowHeight / 35) + 'px';
    var width = Math.floor(windowWidth / 2.5) + 'px';
    buttonNumber.style('font-size', fontSize);
    buttonNumber.style('width', width);
    buttonNumber.position(widthScale(0.25)-buttonNumber.width/2, heightScale(1.0) - 80);
    buttonNumber.mouseClicked(function () {
      game.sceneList[1].showNumberFlag = !game.sceneList[1].showNumberFlag;
    });

    var buttonOriginalImage = createButton("元画像を表示");
    buttonOriginalImage.style('font-size', fontSize);
    buttonOriginalImage.style('width', width);
    buttonOriginalImage.position(widthScale(0.75) - buttonOriginalImage.width/2, heightScale(1.0) - 80);
    buttonOriginalImage.mouseClicked(function () {
      game.sceneList[1].showOriginalImageFlag = !game.sceneList[1].showOriginalImageFlag;
    });
  }

  this.update = function () {
    // UIの更新
    // this.buttonShowNumber.update();


    if (this.clearFlag == true) {
      alert("完成!!");
      // game.currentScene = 0;
      // game.nextScene = 0;
      removeElements();
      this.showOriginalImageFlag = true;
      this.clearFlag = false;

      var titleButton = createButton('タイトルに戻る');
      titleButton.style('font-size', '40px');
      titleButton.style('width', '400px');
      titleButton.position(widthScale(0.5) - titleButton.width / 2, heightScale(1.0) - 80);
      titleButton.mouseClicked(function () {
        game.nextScene = 0;
      });
    }

    if(this.showOriginalImageFlag){
      return;
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

  }

  this.draw = function () {
    background(0, 128, 255);
    // this.buttonShowNumber.draw();

    if (this.showOriginalImageFlag) {
      if (windowWidth < this.canvasHeight) {
        translate(0, (this.canvasHeight - windowWidth) / 2);
        // scale(windowWidth / (this.imageSize * this.divNum));
        image(this.originalImage, 0, 0, this.imageSize * this.divNum, this.imageSize * this.divNum);
      } else {
        translate((windowWidth - this.canvasHeight) / 2, 0);
        // scale(this.canvasHeight / (this.imageSize * this.divNum));
        image(this.originalImage, 0, 0, this.canvasHeight, this.canvasHeight);
      }

      
      return;
    }

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
        
        // 画像の表示
        if (this.field[y][x] != this.divNum * this.divNum - 1){
          image(this.slicedImage[Math.floor(this.field[y][x] / this.divNum)][this.field[y][x] % this.divNum],
            this.imageSize * x, this.imageSize * y, this.imageSize, this.imageSize);
        } else {
          // 空きマスの描画
          fill(128,128,128);
          stroke(0);
          rect(this.imageSize * x, this.imageSize * y, this.imageSize, this.imageSize);
        }

        // 数字の表示
        if (this.showNumberFlag == true) {
          textSize(this.imageSize / 2);
          blendMode(ADD);
          stroke(255, 64);
          strokeWeight(5);
          fill(255, 64);
          var offsetX = -textWidth(this.field[y][x] + "") / 2;
          var offsetY = textAscent() * 1.5;
          text(this.field[y][x] + 1, this.imageSize * (x + 0.5) + offsetX, this.imageSize * y + offsetY);
          blendMode(BLEND);
        }

        // 枠の表示
        noFill();
        stroke(255, 255, 255);
        strokeWeight(this.imageSize/40);
        rect(this.imageSize * x, this.imageSize * y, this.fieldScale / this.divNum, this.fieldScale / this.divNum);
      }
    }

    pop();
  }
}
