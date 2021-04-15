const { text } = require("body-parser")

class Tabelas {
    init(connect) {
        this.connect = connect
        //console.log('Tables called')
        this.criarAtendimentos();
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

}

module.exports = new Tabelas;