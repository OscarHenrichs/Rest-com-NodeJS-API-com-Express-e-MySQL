require('dotenv').config();
const customExpress = require('./config/customExpress.js');
const connectMySQL = require('./infra/connectMySQL')
const colors = require('colors');
const Tables = require('./infra/tables');


connectMySQL.connect(erro => {
    if(erro) {
        console.log(erro)
    }else{

        Tables.init(connectMySQL);
        
        const app = customExpress();
        app.listen(process.env.SERVER_PORT, () => console.log('Servidor rodando na porta: '.green+`${process.env.SERVER_PORT}`.green.bold));
        console.log(`DB conectado com sucesso, port: `.blue +`${process.env.DB_PORT}`.blue.bold);
    }
})


