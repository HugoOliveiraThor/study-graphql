const {ApolloServer, gql} = require('apollo-server')

const usuarios = [{
    id:1,
    nome:'Hugo Oliveira',
    email: 'hugo@gmail.com',
    idade: 29    
},{
    id:2,
    nome:'João Carlos',
    email: 'joao@gmail.com',
    idade: 29
},
  {
    id:3,
    nome:'Martinho Oliveira',
    email: 'martinho@gmail.com',
    idade: 29
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

const typeDefs = gql`
    scalar Date

    type Usuario {
        id: Int
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto {
        nome: String!,
        preco: Float!,
        desconto:Float,
        precoComDesconto:Float
    }

    type Perfil {
        id: Int
        nome: String
    }


    # Pontos de entrada da sua API! #
    type Query {
        ola: String
        horaAtual: Date,
        usuarioLogado: Usuario,
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: Int): Usuario
        perfis: [Perfil]
        perfil(id: Int): Perfil
    }

`


const resolvers = {

    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Produto: {
        precoComDesconto(produto) {
            if(produto.desconto) {
                return produto.preco * (1 - produto.desconto)
            } else {
                return produto.preco
            }

        }
    },
    Query: {
        ola() {
            return 'Bom dia'
        },
        horaAtual() {
            return new Date()
        },
        usuarioLogado() {
            return {
                id:1,
                nome:'Ana da web',
                email:'ana@gmail.com',
                idade:23,
                salario_real:123456.7,
                vip:true
            }
        },
        produtoEmDestaque() {
            return {
                nome:'Sandalias Havainas',
                preco:1234.35,
                desconto:0.15,
            }
        },
        numerosMegaSena() {
            // return [4, 8, 13, 27, 33, 54]
            const crescente = (a,b) => a - b
            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort(crescente)
        },
        usuarios() {
            return usuarios
        },
        usuario(_, args) { // Always the first parameter of is the object returned from type
            const selecionados = usuarios.filter(usuario => usuario.id === args.id)
            return selecionados ? selecionados[0] : null
        },
        perfis() {
            return perfis
        },
        perfil(_,{id}) {
            const selecionados = perfis.filter(perfil => perfil.id === id)
            return selecionados ? selecionados[0] : null
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Executando em uma ${url}`)
})