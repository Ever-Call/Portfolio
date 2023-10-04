export default function(ev){
  const button = ev.currentTarget
  const result = document.getElementById('inputResult')
  if(button.innerText === 'Copy'){
    button.innerText = 'Copied'
    button.classList.add('success') // nesta parte o visual studio não ajuda mais a digitar os codigos... interessante e sus..
    navigator.clipboard.writeText(result.value)
  }else{
    button.innerText = 'Copy'
    button.classList.remove('success')
  }
}