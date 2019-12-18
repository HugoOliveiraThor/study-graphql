const { usuarios, perfis } = require('../data/db')

module.exports = {
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
    perfil(_, { id }) {
        const selecionados = perfis.filter(perfil => perfil.id === id)
        return selecionados ? selecionados[0] : null
    }
}