"use strict";
// tamanho do grid // size of the grid
const gridSize = 9;
// todas as combinações de vitória possíveis: // all victory combinations possible:
const combinacoes = [
  [0,1,2], [3,4,5], [6,7,8], // linhas    // lines
  [0,3,6], [1,4,7], [2,5,8], // colunas   // columns
  [0,4,8], [2,4,6]           // diagonais // diagonals
];
// criando uma HTMLCollection com todas as células // creating a HTMLCollection with all the cells
const cellCollection = document.getElementsByClassName("celula");
const celulas = [];
// sets que contam as jogadas de cada jogador // sets counting the players moves
const jogadasX = new Set();
const jogadasO = new Set();
// consegue o elemento que irá mostrar mensagens de vitória ou empate
// gets the element that will show victory or tie messages
const victory = document.getElementById("victory");

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
    celula.state = jogador;
    
    document.getElementById(celula.name).textContent = jogador;
    console.log(`Estado da célula ${celula.name}: ${celula.state}`);

    switch (jogador) {
      case "x":
        jogadasX.add(celula.index);
        console.log(`jogadasX size: ${jogadasX.size}`)
        break;
      default:
        jogadasO.add(celula.index);
        console.log(`jogadasO size: ${jogadasO.size}`)
    }
    checarVitoria();

    jogador = jogador === "x" ? "o" : "x";
  }  
}

// checa se alguém ganhou, ou houve empate // checks if someone won, or if it's a tie
function checarVitoria() {
  // checa se os valores da array menor (combinacao of combinacoes) estão no set possivelmente vencedor (jogadasX ou jogadasO)
  // checks if the values of the smaller array (combinacoo of combinacoes) are in the possible winning set (jogadasX or jogadasO)
  function contemTodos(setMaior, arrMenor) {
    return arrMenor.every(val => setMaior.has(val));
  }

  for (const combinacao of combinacoes) {
    if (contemTodos(jogadasX, combinacao)) {
      victory.textContent = "x wins!";
      console.log("Winner: o");
      gameEnd = true;
      return;
    }
    if (contemTodos(jogadasO, combinacao)) {
      victory.textContent = "o wins!";
      console.log("Winner: o");
      gameEnd = true;
      return;
    }
  }
  if (jogadasX.size + jogadasO.size === gridSize) {
    victory.textContent = "tie!"
    console.log("No winner: it's a tie.")
    gameEnd = true;
    return;
  }
}