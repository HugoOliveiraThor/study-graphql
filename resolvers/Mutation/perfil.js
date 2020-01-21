const { perfis, proximoId } = require('../../data/db')


function indicePerfil(filtro) {
    console.log('usuarios', usuarios)
    if(!filtro) return -1
    const {id} = filtro
    if(id) {
        return usuarios.findIndex(usuario => usuario.id === id)
    }
    return -1
}

module.exports = {
    //{nome , email , idade}
    novoPerfil(_, {dados}) {
        const novo = {
            id: proximoId(),
            ...dados,
            perfil_id:1,
            status:'ATIVO'
        }
        usuarios.push(novo)
        return novo
    },
    excluirPerfil(_, { filtro }) {
        const usuarioIndex = indicePerfil(filtro)
        console.log('usuario index excluir', usuarioIndex)
        if (usuarioIndex < 0) return null
        const excluidos = perfis.splice(usuarioIndex, 1)
        console.log('excluidos', excluidos)
        return excluidos ? excluidos[0] : null
    },
    alterarPerfil(_, { filtro , dados }) {
        const usuarioIndex = indiceUsuario(filtro)
        if(usuarioIndex < 0) return null
        const usuario = {
            ...perfis[usuarioIndex],
            ...dados
        }

        usuarios.splice(usuarioIndex, 1 , usuario) // Nessa condição estou removendo um elemento do array e adicionando outro 
    }
}