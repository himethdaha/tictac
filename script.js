const newGameBtn = document.querySelector(".new-game");
const endGameBtn = document.querySelector(".end-game");
const container = document.querySelector(".container");
const p1Score = document.querySelector(".player-1-score");
let p1ScoreCounter = 0;
const p1Mark = document.createElement("p");
p1Mark.className = "p1Mark";
p1Mark.textContent = "X";
const p2Score = document.querySelector(".player-2-score");
let p2ScoreCounter = 0;
const p2Mark = document.createElement("span");
p2Mark.className = "p2Mark";
p2Mark.innerText = "O";
const cells = document.querySelectorAll(".cell");
const cellsArray = Array.from(cells);
const gameStatus = document.querySelector(".status");
const cell_1 = document.querySelector(".cell-1");
const cell_2 = document.querySelector(".cell-2");
const cell_3 = document.querySelector(".cell-3");
const cell_4 = document.querySelector(".cell-4");
const cell_5 = document.querySelector(".cell-5");
const cell_6 = document.querySelector(".cell-6");
const cell_7 = document.querySelector(".cell-7");
const cell_8 = document.querySelector(".cell-8");
const cell_9 = document.querySelector(".cell-9");
let turn;
let totalGames = 0;
const p1WonStatement = "Player 1 Won this Round!";
const p2WontStatement = "Player 2 Won this Round!";
const drawStatement = `It's a draw!`;
const winningArray = [
  [cell_1, cell_2, cell_3],
  [cell_4, cell_5, cell_6],
  [cell_7, cell_8, cell_9],
  [cell_1, cell_4, cell_7],
  [cell_2, cell_5, cell_8],
  [cell_3, cell_6, cell_9],
  [cell_1, cell_5, cell_9],
  [cell_3, cell_5, cell_7],
];

//NewGame Event Listener
newGameBtn.addEventListener("click", () => {
  newGameBtn.style.opacity = 0.9;
  newGameBtn.disabled = true;

  endGameBtn.style.opacity = 0.9;
  endGameBtn.disabled = true;

  turn = 1;
  //New Round
  newRound();
  //Populate each cell with listeners
  addListeners();
  totalGames += 1;
});

//If end game is clicked, announce the winner and after 3 seconds reload the page
endGameBtn.addEventListener("click", () => {
  if (p1ScoreCounter > p2ScoreCounter) {
    gameStatus.textContent = `PLAYER 1 WON ${p1ScoreCounter} OUT OF ${totalGames}`;
    gameStatus.style.color = "green";
    gameStatus.style.fontSize = "35px";
  }
  if (p2ScoreCounter > p1ScoreCounter) {
    gameStatus.textContent = `PLAYER 2 WON ${p2ScoreCounter} OUT OF ${totalGames}`;
    gameStatus.style.color = "green";
    gameStatus.style.fontSize = "35px";
  }
  if (p1ScoreCounter === p2ScoreCounter) {
    gameStatus.textContent = `SCORE IS A TIE`;
    gameStatus.style.color = "black";
    gameStatus.style.fontSize = "35px";
  }
  setTimeout(() => {
    location.reload();
  }, 2000);
});

//Function to swap turns
const swapTurns = (event) => {
  //Change status
  gameStatus.innerHTML = `Player ${turn} made a move`;
  const cell = event.target;
  //If p1Turn === 1, set cell innerHtml to x
  if (turn === 1) {
    //Mark the cell and make it unavailable
    cell.classList.add("p1Mark");
    cell.innerText = "X";
    disableCell(cell);
    //Change the turn
    turn = 2;
  } else {
    //Change status
    gameStatus.innerHTML = `player ${turn} made a move`;
    //Mark the cell and make it unavailable
    cell.classList.add("p2Mark");
    cell.innerText = "O";
    disableCell(cell);
    //Change the turn
    turn = 1;
  }
  //Check for winner after each turn
  checkWinner();
  //Check for a tie
  checkTie();
  // if (
  //   (result === true && gameStatus.textContent !== p1WonStatement) ||
  //   gameStatus.textContent !== p2WontStatement
  // ) {
  //   gameStatus.textContent = drawStatement;
  //   gameStatus.style.color = "black";
  // }
  //Update scores
  p1Score.textContent = p1ScoreCounter;
  p2Score.textContent = p2ScoreCounter;

  //Disable all cells
  if (
    gameStatus.textContent === p1WonStatement ||
    gameStatus.textContent === p2WontStatement ||
    gameStatus.textContent === drawStatement
  ) {
    //Disable all cells
    //this is why the game isn't working
    removeListeners();
    //Bring back the new game and end game buttons
    newGameBtn.style.opacity = 1;
    newGameBtn.disabled = false;

    endGameBtn.style.opacity = 1;
    endGameBtn.disabled = false;
  }
};

//Function to make a cell disabled
function disableCell(cell) {
  cell.removeEventListener("click", swapTurns);
}

//Function to check winner
const checkWinner = () => {
  //Go through entire array
  winningArray.forEach((array) => {
    if (
      array[0].innerText === "X" &&
      array[1].innerText === "X" &&
      array[2].innerText === "X"
    ) {
      p1ScoreCounter += 1;
      gameStatus.textContent = p1WonStatement;
      gameStatus.style.color = "green";
    }
    if (
      array[0].innerText === "O" &&
      array[1].innerText === "O" &&
      array[2].innerText === "O"
    ) {
      p2ScoreCounter += 1;
      gameStatus.textContent = p2WontStatement;
      gameStatus.style.color = "green";
    }
  });
};

//Function to check a tie
const checkTie = () => {
  return cellsArray.every(
    (cell) => cell.classList[2] == "p1Mark" || cell.classList[2] == "p2Mark"
  );
};

//Once a game is done and the winner is identified, call this function if the players select new game again. Basically this sets the game for another round
const newRound = () => {
  //Reset the status and
  gameStatus.textContent = "";
  gameStatus.style.color = "black";
  //Clear the board
  cells.forEach((cell) => {
    cell.innerText = "";
    if (cell.classList.contains("p1Mark")) {
      cell.classList.remove("p1Mark");
    }
    if (cell.classList.contains("p2Mark")) {
      cell.classList.remove("p2Mark");
    }
  });
};

const addListeners = () => {
  //If a cell is clicked, call an event listner with swapTurns function
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", swapTurns);
  }
};

const removeListeners = () => {
  //Once a winner is decided remove all click event listeners from the entire container
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", swapTurns);
  }
};
