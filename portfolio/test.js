let vBoard= [['','',''],['','',''],['','','']]
const players = {}
let turnPlayer = ''
const h2 = document.getElementById('status')
const boardReagions = document.querySelectorAll('#gameBoard span')

function initializeGame(){
  const player1 = document.getElementById('player1').value
  const player2 = document.getElementById('player2').value
  const entries = document.getElementById('entries')
  const gameBoard = document.getElementById('gameBoard')

  boardReagions.forEach(function(elements){
    elements.addEventListener('click', clickEvent)
  })

  updateEntries(player1, player2)

  // aqui vamos fazer desaparecer a primeira e fazer aparecer a segunda tela
  entries.style.display = 'none'  
  gameBoard.style.display = 'grid'
}

function updateEntries(player1, player2){
  players.player1 = {name: player1, item:'X'}
  players.player2 = {name: player2, item:'O'}
  turnPlayer = players.player1.name
  h2.innerText = 'Vez de: '+turnPlayer
}

function clickEvent(ev){
  const span = ev.currentTarget
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

  console.table(vBoard)

  span.removeEventListener('click',clickEvent)
  span.classList.remove('cursor-pointer')

  // verificação da partida
  let winRegions = getWinRegions()
  if (winRegions.length>0) {
    h2.innerText = 'Vitoria de: '+ turnPlayer
    boardReagions.forEach(function(elements){
      elements.removeEventListener('click', clickEvent)
      elements.classList.remove('cursor-pointer')
    })
    winRegions = []
    restart()
  } else if(vBoard.flat().includes('')) { // usamos o flat só para facilitar o metodo includes trabalhar. o metodo flat() não modifica a array original
    turnPlayer = turnPlayer === players.player1.name ? players.player2.name : players.player1.name
    h2.innerText = 'Vez de: ' + turnPlayer
  }else{
    h2.innerText = 'Empate'
    winRegions= []
    restart()
    
  }
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

function restart(){
  vBoard= [['','',''],['','',''],['','','']]
  const div = document.getElementById('container')
  const button = document.createElement('button')
  button.id = 'restart'
  button.innerText = 'Novo Jogo'
  div.append(button)

  button.addEventListener('click', function(){
    boardReagions.forEach(function(elements){
      elements.innerText = ''
      elements.classList.add('cursor-pointer')
      elements.addEventListener('click', clickEvent)
    })
    turnPlayer = players.player1.name
    h2.innerText = 'Vez de: ' + turnPlayer
    div.removeChild(button)
  })
}
