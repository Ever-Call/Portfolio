export default function calculate(){
  const result = document.getElementById('inputResult')
  result.classList.add('error')
  result.value = "ERROR"
  const inputResult = eval(input.value)
  result.classList.remove('error')
  result.value = inputResult
}