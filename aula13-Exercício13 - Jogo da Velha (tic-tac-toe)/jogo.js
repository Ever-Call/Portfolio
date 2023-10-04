const boardReagions = document.querySelectorAll('#gameBoard span')
let vBoard = []
let turnPlayer = ''
// let teste = [['1','2','3'],['1','2','3']]
// console.table(teste)
function updateTittle() {
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame() {
  vBoard = [['','',''], ['','',''], ['','','']]
  turnPlayer = 'player1'
  document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
  updateTittle()
  boardReagions.forEach(function (element){
    element.classList.remove('win')
    element.innerText = ''
    element.classList.add('cursor-pointer')
    element.addEventListener('click', handleBoardClick)
  })
}

// Verifica se existem três regiões iguais em sequência e devolve as regiões
function getWinRegions (){
  const winRegions = []
  // se vBoard[0][0] existe E vBoard[0][0] for igual a vBoard[0][1] E vBoard[0][0] for igual a vBoard[0][2]
  if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2]){
    winRegions.push("0.0", "0.1", "0.2")    
  }
  if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2]){
    winRegions.push("1.0", "1.1", "1.2")    
  }
  if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2]){
    winRegions.push("2.0", "2.1", "2.2")    
  }
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0]){
    winRegions.push("0.0", "1.0", "2.0")    
  }
  if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1]){
    winRegions.push("0.1", "1.1", "2.1")    
  }
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2]){
    winRegions.push("0.2", "1.2", "2.2")    
  }
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2]){
    winRegions.push("0.0", "1.1", "2.2")    
  }
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0]){
    winRegions.push("0.2", "1.1", "2.0")    
  }
  return winRegions
}

function disableRegion(element) {
  element.classList.remove('cursor-pointer')
  element.removeEventListener('click', handleBoardClick)
}

function handleWin(regions){
  regions.forEach(function (region) {
    document.querySelector('[data-region="' + region + '"]').classList.add('win')
  })
  const playerName = document.getElementById(turnPlayer).value
  document.querySelector('h2').innerText = playerName + ' venceu!'
}

function handleBoardClick(ev) {
  const span = ev.currentTarget
  const region = span.dataset.region // N.N
  const rowColumnPair = region.split('.') // ["N", "N"]
  const row = rowColumnPair[0]
  const column = rowColumnPair[1]
  if (turnPlayer === 'player1'){
    span.innerText = 'X'
    vBoard[row][column] = 'X'
  } else {
    span.innerText = 'O'
    vBoard[row][column] = 'O'
  }
  console.clear()
  console.table(vBoard)
  // console.log(rowColumnPair)
  // console.log(row)
  // console.log(column)
  // console.log(vBoard)
  disableRegion(span)
  const winRegions = getWinRegions()
  if (winRegions.length > 0){
    handleWin(winRegions)
  } else if (vBoard.flat().includes('')) { // o metodo flat() vai fazer com que uma array fique unidimensional 
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
    updateTittle()
  } else {
    document.querySelector('h2').innerHTML = 'Empate'
  }
}

document.getElementById('start').addEventListener('click', initializeGame)