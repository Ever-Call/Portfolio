function useLightTheme(){
  console.log(document.body.style)
  document.body.style.color = "#212529"// estes dois tipos de manipular o estilo com javascript vão se atrapalhar, pois quando adicioanamos o style com o document, vai atrapalhar o toggle
  document.body.style.backgroundColor = "#f1f5f9"// quando manipulos o estilo com o document e o body significa que estamos fazendo um codigo in-line no html
}

function useDarkTheme(){
  document.body.style.color = "#f1f5f9"
  document.body.style.backgroundColor = "#212529"
}

function switchTheme(){
  document.body.classList.toggle("is-light")// estes dois tipos de manipular o estilo com javascript vão se atrapalhar, pois quando adicioanamos o style com o document, vai atrapalhar o toggle
  document.body.classList.toggle("is-dark")// IMPORTANTE: Adiciona a classe is-dark ao body caso ela não exista e remove-a caso exista
  // document.body.classList.remove("")... IMPORTANTE: o meto classlist.remove vai remover a classe de um elemento html
}

document.getElementById("lightBtn").addEventListener("click",useLightTheme)
document.getElementById("darkBtn").addEventListener("click",useDarkTheme)
document.getElementById("switchBtn").addEventListener("click",switchTheme)