const Author = require("./Author");

const jhon = new Author("Jhon Doe")

const post = jhon.writePost("Título do post", "Texto do post aqui lorem bom dia") // criando post

post.addComment("Ever Call", "Boa! comentou, parabéns!") // criando comentario
post.addComment("Ever 2", "Segundo comentario mas de outra pessoa??") // criando comentario

console.log(jhon)
console.log(post)

// aquele circular*1 aparece porque quando se mostra a classe Author, e vemos que no metodo writePost colocamos como parametro o proprio Author e isso vai gerar um loop 
// se chama dependencia circular