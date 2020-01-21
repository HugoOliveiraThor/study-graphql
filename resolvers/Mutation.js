const { usuarios, proximoId } = require('../data/db')

module.exports = {
    //{nome , email , idade}
    novoUsuario(_, args) {
        const emailExistente = usuarios.some(usuario => usuario.email === args.email)

        if(emailExistente) {
            throw new Error('Email cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...args,
            perfil_id:1,
            status:'ATIVO'
        }
        usuarios.push(novo)
        return novo
    },
    excluirUsuario(_, {id}) {
        const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id)
        if (usuarioIndex < 0) return null
        const excluidos = usuarios.splice(usuarioIndex, 1)
        return excluidos ? excluidos[0] : null
    },
    alterarUsuario(_, args) {
        const usuarioIndex = usuarios.findIndex(usuario => usuario.id === args.id)
        if(usuarioIndex < 0) return null
        const usuario = {
            ...usuarios[usuarioIndex],
            ...args
        }
    }
}