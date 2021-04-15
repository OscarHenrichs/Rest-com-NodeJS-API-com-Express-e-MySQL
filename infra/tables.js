const { text } = require("body-parser")

class Tabelas {
    init(connect) {
        this.connect = connect
        //console.log('Tables called')
        this.criarAtendimentos();
        this.criarUsers();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCreate datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';
        // console.log(sql);
        this.connect.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            }
        })
    }

    criarUsers() {
        const sql = 'CREATE TABLE IF NOT EXISTS Usuarios (id_usuario int NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, login varchar(20) NOT NULL, password varchar(20) NOT NULL, PRIMARY KEY(id_usuario))';
        // console.log(sql);
        this.connect.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            }
        })
    }

}

module.exports = new Tabelas;