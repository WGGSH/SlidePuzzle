var Button = function (_x, _y, _width, _height, _text, _func) {
  this.x = _x;
  this.y = _y;
  this.width = _width;
  this.height = _height;
  this.text = _text;
  this.func = _func;

  var clickFlag;

  this.setup = function () {
    this.clickFlag = false;
  }


  this.update = function () {
    fill(255);
    rect(this.x, this.y, this.width, this.height);

    if (game.input.isMouseClicked) {
      // クリック箇所がボタンの範囲内に有るかチェック
      if (mouseX >= this.x && mouseX < this.x + this.width &&
        mouseY >= this.y && mouseY < this.y + this.height) {
        this.clickFlag = true;
      }
    }
    if (game.input.isMouseReleased) {
      // クリック箇所が範囲内にあるか調べる
      if (mouseX >= this.x && mouseX < this.x + this.width &&
        mouseY >= this.y && mouseY < this.y + this.height) {
        if (this.clickFlag == true) {
          // ボタンがクリックされたと認識
          this.func();
        }
      } else {
        this.clickFlag = false;
      }
    }
  }
}
