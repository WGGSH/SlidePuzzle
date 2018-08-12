var Input = function () {
  var mousePressCount; // 入力が押され続けたフレーム数
  var mouseReleaseCount; // 入力が離され続けたフレーム数
  var isMouseClicked; // クリック(タップ)した瞬間を評価
  var isMouseReleased; // クリック(タップ)から離された瞬間を評価

  this.setup = function () {
    this.mousePressCount = 0;
    this.mouseReleaseCount = 0;
    this.isMouseClicked = false;
    this.isMouseReleased = false;
  }

  this.update = function () {
    if (mouseIsPressed) {
      this.mousePressCount++;
      this.mouseReleaseCount = 0;
    } else {
      this.mousePressCount = 0;
      this.mouseReleaseCount++;
    }

    if (this.mousePressCount === 1) {
      this.isMouseClicked = true;
    } else {
      this.isMouseClicked = false;
    }

    if (this.mouseReleaseCount === 1) {
      this.isMouseReleased = true;
    } else {
      this.isMouseReleased = false;
    }
  }
}
