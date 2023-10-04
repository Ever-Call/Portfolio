function validateEmail(email){
  if(!email.match(/\w{2,}@[A-Za-z]{2,}\.[A-Za-z]{2,}/)){
    const err = new Error('email inválido.') // aqui criamos um texto para a propriedade err.message
    err.input = 'email' // criamos uma propriedade para Error
    throw err
    // se usasemos 'throw new Error()' aqui estariamos criando e lançando um error padrão, mas podemos fazer modificações adicionando propriedades no error como lá em cima
  }
}

function validatePassword(password){
  if(
    password.length < 8 ||
    !password.match(/[a-z]/) ||
    !password.match(/[A-Z]/) ||
    !password.match(/\d/) ||
    !password.match(/[^a-zA-z0-9\s]/) // ^ dentro de uma [] significa negação, anulação, inverte das regras colocadas
  ){
    const err = new Error('Senha inválida.')
    err.input = 'password'
    throw err
  }
}

function resetFormStyles(obj){
  Object.entries(obj).forEach(([key, value]) => { // Oject.entries retorna strings da propriedade e o conteudo da propriedade, o valor né, exemplo: [['property', 'value']]. forEach apenas itera, e a gente desestrutura a array do Object.entries e itera cada uma delas e cada iteração fazemos as seguintes argumentos em baixo:
    value.classList.remove('success', 'error') // value é codigo de html referenciada então é possível mudar o html aqui sem mudar o objeto userInputs :D
    document.querySelector(`#${key}-error`).textContent = ''
  })
}

const userInputs = {
  name: document.querySelector('#name'),
  email: document.querySelector('#email'),
  password: document.querySelector('#password')  
}

const form = document.querySelector('form')

form.addEventListener('submit', (ev) => {
  ev.preventDefault()
  resetFormStyles(userInputs)
  
  try {
    userInputs.name.classList.add('success')
    validateEmail(userInputs.email.value) // aqui vai soltar um error, aquele que declaramos na função validateEmail() isso quer dizer que o err.input vai se enviado tbm para o 'catch'
    userInputs.email.classList.add('success')
    validatePassword(userInputs.password.value)
    userInputs.password.classList.add('success')
  } catch (err) {
    userInputs[err.input].classList.add('error') // é possivel selecionar um propriedade de um objeto usando '[]'
    document.querySelector(`#${err.input}-error`).textContent = err.message
  }
})