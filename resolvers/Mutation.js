const { usuarios, proximoId } = require('../data/db')

module.exports = {
    novoUsuario(_, {nome , email , idade}) {
        const novo = {
            id: 1,
            nome, 
            email,
            idade,
            perfil_id:1,
            status:'ATIVO'
        }
        usuarios.push(novo)
        return novo
    }
}