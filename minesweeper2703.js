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
  while (bombsPlaced != numberOfBombs) {
    bombBoard[Math.floor(Math.random() * numberOfRows)] [Math.floor(Math.random() * numberOfColumns)] = 'B';
    bombsPlaced++;
  }
return bombBoard;
};

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};
let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
