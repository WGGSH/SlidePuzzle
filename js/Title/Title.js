var Title = function () {
  var buttonCustom;
  var button3x3;
  var button4x4;
  var button5x5;
  var button2;
  var slider;
  var customNum;

  // カスタム用ボタンを押したときの処理
  this.customButtonFunc = function () {
    game.nextScene = 2;
    // console.log(game.sceneList[0].slider.value());
    game.sceneList[1].setDivNum(game.sceneList[0].slider.value());
    
    removeElements();
  }

  // スタートボタンを押したときの処理
  this.startButtonFunc = function (num) {
    game.nextScene = 2;
    game.sceneList[1].setDivNum(num);

    removeElements();
  }

  this.button3x3Clicked = function () {
    game.sceneList[0].startButtonFunc(3);
  }

  this.button4x4Clicked = function () {
    game.sceneList[0].startButtonFunc(4);
  }

  this.button5x5Clicked = function () {
    game.sceneList[0].startButtonFunc(5);
  }

  this.buttonCutomClicked = function () {
    game.sceneList[0].startButtonFunc(game.sceneList[0].customNum);
  }

  this.setup = function () {
    // UIの初期化
    var fontSize = (windowHeight / 40) + 'px';
    var buttonWidth = (Math.floor(windowWidth / 6)) + 'px';
    this.button3x3 = createButton('3x3');
    this.button3x3.style('font-size', fontSize);
    this.button3x3.style('width', buttonWidth);
    this.button3x3.position(widthScale(0.3)-this.button3x3.width/2, heightScale(0.65));
    this.button3x3.mouseClicked(this.button3x3Clicked);

    this.button4x4 = createButton('4x4');
    this.button4x4.style('font-size', fontSize);
    this.button4x4.style('width', buttonWidth);
    this.button4x4.position(widthScale(0.5)-this.button4x4.width/2, heightScale(0.65));
    this.button4x4.mouseClicked(this.button4x4Clicked);

    this.button5x5 = createButton('5x5');
    this.button5x5.style('font-size', fontSize);
    this.button5x5.style('width', buttonWidth);
    this.button5x5.position(widthScale(0.7)-this.button5x5.width/2, heightScale(0.65));
    this.button5x5.mouseClicked(this.button5x5Clicked);
    
    this.slider = createSlider(6, 25, 6, 1);
    this.slider.position(widthScale(0.25), heightScale(0.8));
    var width = widthScale(0.5) + 'px';
    this.slider.style('width', width);

    var customButtonWidth = (Math.floor(windowWidth / 3)) + 'px';
    this.buttonCustom = createButton('Custom');
    this.buttonCustom.style('font-size', fontSize);
    this.buttonCustom.style('width',customButtonWidth);
    this.buttonCustom.position(widthScale(0.5)-this.buttonCustom.width/2, heightScale(0.85));
    this.buttonCustom.mouseClicked(this.buttonCutomClicked);

  }

  this.update = function () {
    // スライダーの値を取得
    this.customNum = this.slider.value();
    
    // ボタンの状態を更新
    // this.buttonCustom.update();
    // this.buttonCustom.text = this.customNum + 'x' + this.customNum;

    // this.button3x3.update();
    // this.button4x4.update();
    // this.button5x5.update();
  }

  this.draw = function () {
    fill(0, 128, 255);
    noStroke();
    rect(0, 0, windowWidth, windowHeight);

    // 画像を描画
    if (windowWidth < windowHeight) {
      image(game.resource.titleImage, windowWidth / 4, 0, windowWidth * 2 / 4, windowWidth * 2 / 4);
      textSize(Math.floor(windowWidth / 9));
      stroke(255, 255, 255);
      fill(255, 255, 255);
      text('Slide Puzzle', windowWidth / 2 - textWidth('Slide Puzzle') / 2, windowWidth / 2+textAscent()*1.5);
    } else {
      image(game.resource.titleImage, windowWidth / 2 - windowHeight / 4, 0, windowHeight / 2, windowHeight / 2);
      textSize(Math.floor(windowHeight / 15));
      stroke(255, 255, 255);
      fill(255, 255, 255);
      text('Slide Puzzle', windowWidth / 2 - textWidth('Slide Puzzle') / 2, windowHeight / 2 + textAscent() * 1.5);
    }

    textSize(windowHeight / 20);
    stroke(0);
    fill(0);
    var sliderText = this.slider.value() + 'x' + this.slider.value();
    var offsetX = textWidth(sliderText)/2;
    text(sliderText, widthScale(0.5) - offsetX, heightScale(0.8));

    // ボタンを描画
    // this.buttonCustom.draw();
    // this.button3x3.draw();
    // this.button4x4.draw();
    // this.button5x5.draw();

    // console.log(this.slider.value());
  }
}
