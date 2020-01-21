const { usuarios, proximoId } = require('../../data/db')


function indiceUsuario(filtro) {
    console.log('usuarios', usuarios)
    if(!filtro) return -1
    const {id , email} = filtro
    if(id) {
        return usuarios.findIndex(usuario => usuario.id === id)
    } else if (email) {
        console.log('usuarios', usuarios.findIndex(usuario => usuario.email === email))
        return usuarios.findIndex(usuario => usuario.email === email)
    }
    return -1
}

module.exports = {
    //{nome , email , idade}
    novoUsuario(_, {dados}) {
        const emailExistente = usuarios.some(usuario => usuario.email === dados.email)

        if(emailExistente) {
            throw new Error('Email cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...dados,
            perfil_id:1,
            status:'ATIVO'
        }
        usuarios.push(novo)
        return novo
    },
    excluirUsuario(_, { filtro }) {
        const usuarioIndex = indiceUsuario(filtro)
        console.log('usuario index excluir', usuarioIndex)
        if (usuarioIndex < 0) return null
        const excluidos = usuarios.splice(usuarioIndex, 1)
        console.log('excluidos', excluidos)
        return excluidos ? excluidos[0] : null
    },
    alterarUsuario(_, { filtro , dados }) {
        const usuarioIndex = indiceUsuario(filtro)
        if(usuarioIndex < 0) return null
        const usuario = {
            ...usuarios[usuarioIndex],
            ...dados
        }

        usuarios.splice(usuarioIndex, 1 , usuario) // Nessa condição estou removendo um elemento do array e adicionando outro 
    }
}