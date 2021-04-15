class UsuarioValidacao {
    validaNome(nome) {
        return nome.length >= 5 & nome.length <= 50;
    } 

    validaLogin(login) { 
        return login.length >= 5 & login.length <= 20;
    }
        
    validaPassword(password) {
        return password.length >= 5 & password.length <= 20;
    } 

    gerarPasswordHash(password) {
        
    }

    validaTodos(usuarioEnviado) {

        const validaNome = this.validaNome(usuarioEnviado.nome);
        const validaLogin = this.validaLogin(usuarioEnviado.login);
        const validaPassword = this.validaPassword(usuarioEnviado.password);
        
        return [
            {
                nome: 'nome',
                valido: validaNome,
                mensagem: 'Nome deve ter pelo menos cinco caracteres e não passar de 50'
            },
            {
                nome: 'login',
                valido: validaLogin,
                mensagem: 'Login deve ter pelo menos cinco caracteres e não passar de 20!'
            },
            {
                nome: 'password',
                valido: validaPassword,
                mensagem: 'Password deve ter pelo menos cinco caracteres e não passar de 20!'
            }
        ]
    }
}


module.exports = new UsuarioValidacao;