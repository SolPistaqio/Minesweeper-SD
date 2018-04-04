class Game {
constructor(numberOfRows, numberOfColumns, numberOfBombs){
  this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
}
playMove (rowIndex, columnIndex){
  this._board.flipTile(rowIndex, columnIndex);
  if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
    console.log('Game is over')
    this._board.print(this._board);
  } else if (this._board.hasSafeTiles() === false){
    console.log('Congratulations! You won the game')
  } else {
    console.log('Current Board:');
    this._board.print(this._board);
  }
}
};

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    get playerBoard() {
      return this._playerBoard
    }
    flipTile (rowIndex, columnIndex) {
      if(this._playerBoard[rowIndex][columnIndex] != ' '){
    return 'This tile has already been flipped!';
  } else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    this._numberOfTiles--;}
    }
    getNumberOfNeighborBombs (rowIndex, columnIndex) {
      const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1],];
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;
      neighborOffsets.forEach(function(offset) {
        const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0
        && neighborRowIndex < numberOfRows
        && neighborColumnIndex >= 0
        && neighborColumnIndex < numberOfColumns){
    if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
      numberOfBombs++;
    }
    }});
      return numberOfBombs;
    }
hasSafeTiles (){
  return this._numberOfTiles != this.numberOfBombs;
}
print (board) {
  console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
}
generatePlayerBoard (numberOfRows, numberOfColumns){
const board = [];
for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
  let boardRow = [];
  for (let ColumnIndex = 0; ColumnIndex < numberOfColumns; ColumnIndex++){
    boardRow.push(' ');
  }
  board.push(boardRow);
}
return board;
}
 generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
  const bombBoard = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    let boardRow = [];
    for (let ColumnIndex = 0; ColumnIndex < numberOfColumns; ColumnIndex++){
      boardRow.push(null);
    }
    bombBoard.push(boardRow);
  };
  let bombsPlaced = 0;
  while (bombsPlaced != numberOfBombs){
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if(bombBoard[randomRowIndex][randomColumnIndex] != 'B'){
    bombBoard[randomRowIndex][randomColumnIndex] = 'B';
    bombsPlaced++;}
}
return bombBoard;
}
};

const g = new Game(3,3,3);
g.playMove(0,0);
