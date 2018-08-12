var Resource = function () {
  // タイトル画面画像
  this.titleImage = loadImage('Resource/title.png');

  // パズル画像
  this.puzzleImage = new Array();
  /*this.puzzleImage.push(loadImage('Resource/Pronama_00.png'));
  this.puzzleImage.push(loadImage('Resource/Pronama_01.png'));
  this.puzzleImage.push(loadImage('Resource/Pronama_02.png'));*/
  for (var i = 0; i < 3; i++){
    this.puzzleImage.push(loadImage('Resource/Pronama_0' + i + '.png'));
  }
}
