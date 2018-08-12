var Title = function () {
  var button;
  var slider;

  // スタートボタンを押したときの処理
  this.startButtonFunc = function () {
    game.nextScene = 1;
    // console.log(this.slider.value());
    // game.sceneList[1].setDivNum(this.slider.value());
    
    // var inp = createInput();
    // inp.position(0, 0);
    // inp.input(myInputEvent);
    // inp.size(100, 100);
    // inp.style('font-size', '19px');
    // myInputEvent();
  }

  this.setup = function () {
    // ボタンの初期化
    this.button = new Button(widthScale(0.3), heightScale(0.7), widthScale(0.4), heightScale(0.1), "start", this.startButtonFunc);
    this.button.setup();

    // this.button = createButton('3x3');
    // this.button.position(widthScale(0.2), heightScale(0.7));
    // this.button.style('font-size', '30px');
    
    this.slider = createSlider(3, 15, 4, 1);
    this.slider.position(widthScale(0.25), heightScale(0.5));
    var width = widthScale(0.5) + 'px';
    this.slider.style('width', width);
    // this.button.mousePressed();
  }

  this.update = function () {
    // ボタンの状態を更新
    this.button.update();
  }

  this.draw = function () {
    fill(0, 128, 255);
    rect(0, 0, windowWidth, windowHeight);

    stroke(255);
    fill(255);
    var sliderText = this.slider.value() + 'x' + this.slider.value();
    var offsetX = textWidth(sliderText)/2;
    text(sliderText, widthScale(0.5) - offsetX, heightScale(0.5));

    // ボタンを描画
    this.button.draw();

    // console.log(this.slider.value());
  }
}

function myInputEvent() {
  console.log('you are typing: ', this.value());

}
