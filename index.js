require('dotenv').config();
const customExpress = require('./config/customExpress.js');
const connectMySQL = require('./infra/connectMySQL')
const colors = require('colors');


connectMySQL.connect(erro => {
    if(erro) {
        console.log(erro)
    }else{
        console.log(`DB conectado com sucesso, port:`.blue +` 3306`.blue.bold);
    }
})


const app = customExpress();
app.listen(process.env.SERVER_PORT, () => console.log('Servidor rodando na porta:'.green+`${process.env.SERVER_PORT}`.green.bold));