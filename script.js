"use strict";

// todas as combinações de vitória possíveis: // all victory combinations possible:
const combinacoes = [
  [0,1,2], [3,4,5], [6,7,8], // linhas // lines
  [0,3,6], [1,4,7], [2,5,8], // colunas // columns
  [0,4,8], [2,4,6]           // diagonais // diagonals
];

let jogador = "x";
let gameEnd = false;

class Celula {
  constructor(name, state, index) {
    this._name = name;
    this._state = state;
    this._index = index;
  }
  get name() {
    return this._name;
  }
  get state() {
    return this._state;
  }
  get index() {
    return this._index
  }
  set state(newState) {
    this._state = newState;
  }
}

// criando uma HTMLCollection com todas as células // creating a HTMLCollection with all the cells
const cellCollection = document.getElementsByClassName("celula");
const celulas = [];

// criação dos objetos celulas: // creation of celulas objects:
for (let i = 0; i < cellCollection.length; i++) {
  const id = "c" + (i + 1);
  cellCollection[i].id = id

  const celulaObj = new Celula(id, null, i);
  // colocando os objetos em uma array: // pushing the objects into an array:
  celulas.push(celulaObj);
  
  // criando um EventListener para cada célula (detecta o clique nas células):
  // creating an EventListener for each cell (detects the click on the cells):
  cellCollection[i].addEventListener("click", () => verificacaoDeCelula(celulaObj));
}

// função que verifica o estado da célula e a muda de acordo com ele, também alterando o jogador:
// function that verifies the state of the cell and changes it, also altering the player:
function verificacaoDeCelula(celula) {
  // retorna se o jogo já tiver acabado // returns if the game's already finished
  if (gameEnd) return;

  if (celula.state == null) {
    switch (jogador) {
      case "x":
        celula.state = "x";
        jogador = "o";
        break;
      case "o":
        celula.state = "o";
        jogador = "x";
        break;
      default:
        console.log(`Erro ao definir estado da célula ${celula.name}.`)
    }
    document.getElementById(celula.name).textContent = celula.state;
    console.log(`Estado da célula ${celula.name}: ${celula.state}`);

    checarVitoria();
  }
}

// checa se alguém ganhou, ou houve empate // checks if someone won, or if it's a tie
function checarVitoria() {
  const xArray = [];
  const oArray = [];
  const victory = document.getElementById("victory");
  let nullCells = 9;
  let noWinner = true;

  for (const cell of celulas) {
    switch (cell.state) {
      case "x":
        xArray.push(cell.index);
        nullCells--;
        break;
      case "o":
        oArray.push(cell.index);
        nullCells--;
        break;
      default:
        continue;
    }
  }

  // checa se os valores da array menor (combinacoes) estão na array possivelmente vencedora (x ou o)
  // checks if the values of the smaller array (combinacoes) are in the possible winning array (x or o)
  function contemTodos(arrMaior, arrMenor) {
    return arrMenor.every(val => arrMaior.includes(val));
  }

  for (const combinacao of combinacoes) {
    if (contemTodos(xArray, combinacao)) {
      victory.textContent = `x wins!`;
      noWinner = false;
      gameEnd = true;
      return;
    }
    if (contemTodos(oArray, combinacao)) {
      victory.textContent = `o wins!`;
      noWinner = false;
      gameEnd = true;
      return;
    }
  }

  if (nullCells == 0 && noWinner) {
    victory.textContent = "tie!"
    gameEnd = true;
    return;
  }
}