const Post = require("./Post")

class Author{
  constructor(name){
    this.name = name
    this.posts = []
  }
  writePost(tittle, body){
    const post = new Post(tittle, body, this) // this = é o objeto inteiro, então inserimos um o Author inteiro e suas propriedades
    this.posts.push(post)
    return post
  }
}

module.exports = Author