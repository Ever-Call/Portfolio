let vBoard= [['','',''],['','',''],['','','']]
const players = {}
let turnPlayer = ''
const boardReagions = document.querySelectorAll('#gameBoard span')
// const boardReagionsActive = document.querySelectorAll('#active')

function initializeGame(){
  const player1 = document.getElementById('player1').value
  const player2 = document.getElementById('player2').value
  const entries = document.getElementById('entries')
  const gameBoard = document.getElementById('gameBoard')
  
  boardReagions.forEach(function(elements){
    // elements.classList.remove('win')
    // elements.innerText = ''
    elements.addEventListener('click', clickEvent)
  })

  updateEntries(player1, player2)
  console.log(players)
  turnPlayer = players.player1.name

  // aqui vamos fazer desaparecer a primeira e fazer aparecer a segunda tela
  entries.style.display = 'none'  
  gameBoard.style.display = 'grid'

  
}

function clickEvent(ev){
  const span = ev.currentTarget
  span.id = 'desactive'
  const region = span.dataset.region // N.N
  const rowColumnPair = region.split('.') // ['N','N']
  const row = rowColumnPair[0]
  const column = rowColumnPair[1]

  if(turnPlayer === players.player1.name){
    span.innerText = 'X'

    vBoard[row][column] = 'X'
  }else if(turnPlayer === players.player2.name){
    span.innerText = 'O'

    vBoard[row][column] = 'O'
  }

  console.log(
  `linha: ${row}
  coluna: ${column}
  vez de: ${turnPlayer}`)
  console.table(vBoard)

  span.removeEventListener('click',clickEvent)
  span.classList.remove('cursor-pointer')

  const winRegions = getWinRegions()
  console.log(winRegions)
  if (winRegions.length>0) {
    console.log(`vitoria de ${turnPlayer}`)
    boardReagions.forEach(function(elements){
      elements.removeEventListener('click', clickEvent)
      elements.classList.remove('cursor-pointer')
    })
  } else if(vBoard.flat().includes('')) { // usamos o flat só para facilitar o metodo includes trabalhar. o metodo flat() não modifica a array original
    turnPlayer = turnPlayer === players.player1.name ? players.player2.name : players.player1.name
  }else{
    console.log('empate')
  }
}

function updateEntries(player1, player2){
  players.player1 = {name: player1, item:'X'}
  players.player2 = {name: player2, item:'O'}
  
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
