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
    game.nextScene = 1;
    // console.log(game.sceneList[0].slider.value());
    game.sceneList[1].setDivNum(game.sceneList[0].slider.value());
    
    removeElements();
  }

  // スタートボタンを押したときの処理
  this.startButtonFunc = function (num) {
    game.nextScene = 1;
    game.sceneList[1].setDivNum(num);

    removeElements();
  }

  this.setup = function () {
    // UIの初期化
    this.button3x3 = new Button(widthScale(0.1), heightScale(0.4), widthScale(0.2), heightScale(0.05), "3x3", this.startButtonFunc, 3);
    this.button3x3.setup();

    this.button4x4 = new Button(widthScale(0.4), heightScale(0.4), widthScale(0.2), heightScale(0.05), "4x4", this.startButtonFunc, 4);
    this.button4x4.setup();

    this.button5x5 = new Button(widthScale(0.7), heightScale(0.4), widthScale(0.2), heightScale(0.05), "5x5", this.startButtonFunc, 5);
    this.button5x5.setup();
    
    this.slider = createSlider(6, 25, 6, 1);
    this.slider.position(widthScale(0.25), heightScale(0.6));
    var width = widthScale(0.5) + 'px';
    this.slider.style('width', width);

    this.buttonCustom = new Button(widthScale(0.3), heightScale(0.5), widthScale(0.4), heightScale(0.05), "", this.customButtonFunc);
    this.buttonCustom.setup();

  }

  this.update = function () {
    // スライダーの値を取得
    this.customNum = this.slider.value();
    
    // ボタンの状態を更新
    this.buttonCustom.update();
    this.buttonCustom.text = this.customNum + 'x' + this.customNum;

    this.button3x3.update();
    this.button4x4.update();
    this.button5x5.update();
  }

  this.draw = function () {
    fill(0, 128, 255);
    rect(0, 0, windowWidth, windowHeight);

    stroke(255);
    fill(255);
    var sliderText = this.slider.value() + 'x' + this.slider.value();
    var offsetX = textWidth(sliderText)/2;
    // text(sliderText, widthScale(0.5) - offsetX, heightScale(0.5));

    // ボタンを描画
    this.buttonCustom.draw();
    this.button3x3.draw();
    this.button4x4.draw();
    this.button5x5.draw();

    // console.log(this.slider.value());
  }
}

function myInputEvent() {
  console.log('ButtonClicked');

}
