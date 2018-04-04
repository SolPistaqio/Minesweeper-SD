class Board {

}




const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
const board = [];
for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
  let boardRow = [];
  for (let ColumnIndex = 0; ColumnIndex < numberOfColumns; ColumnIndex++){
    boardRow.push(' ');
  }
  board.push(boardRow);
}
return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
};
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1],];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighborOffsets.forEach(function(offset) {
    const neighborRowIndex = rowIndex + offset[0];
  const neighborColumnIndex = columnIndex + offset[1];
  if (neighborRowIndex >= 0
    && neighborRowIndex < numberOfRows
    && neighborColumnIndex >= 0
    && neighborColumnIndex < numberOfColumns){
if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
  numberOfBombs++;
}
}});
  return numberOfBombs;
};
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if(playerBoard[rowIndex][columnIndex] != ' '){
return 'This tile has already been flipped!';
} else if (bombBoard[rowIndex][columnIndex] === 'B'){
  playerBoard[rowIndex][columnIndex] = 'B';
} else {
  playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
}
};
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};
let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,3);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard,1,1);
console.log('Updated Player Board: ');
printBoard(playerBoard);
