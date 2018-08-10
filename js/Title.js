var Title = function () {
  var button;

  
  this.setup = function () {
    this.button = new Button(100, 100, 300, 300, "start", function () {
      console.log("Clicked");
    });
  }

  this.update = function () {
    fill(255, 0, 0);

    this.button.update();
  }
}
