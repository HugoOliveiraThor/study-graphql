const usuarios = [{
    id:1,
    nome:'Hugo Oliveira',
    email: 'hugo@gmail.com',
    idade: 29,
    perfil_id: 1    
},{
    id:2,
    nome:'João Carlos',
    email: 'joao@gmail.com',
    idade: 29,
    perfil_id: 2
},
  {
    id:3,
    nome:'Martinho Oliveira',
    email: 'martinho@gmail.com',
    idade: 29,
    perfil_id: 1
  }
]

const perfis = [
    {
    id: 1,
    nome: 'Comum'
    },
    {
    id: 2,
    nome: 'Administrador'
    }
]

module.exports = {usuarios , perfis}