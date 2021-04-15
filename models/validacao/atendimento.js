const moment = require('moment');
class AtendimentoValidacao {
    
    validaData(data, dataCriada) { return moment(data).isSameOrAfter(dataCriada)}

    validaCliente(cliente) { return cliente.length >= 5 }

    validaTodos(atendimentoEnviado) {

        const dataCriada = moment().format('YYYY-MM-DD hh:mm:ss') 
        const data = moment(atendimentoEnviado.data, 'DD-MM-YYYY').format('YYYY-MM-DD hh:mm:ss')

        return  [   
                    data,
                    dataCriada,
                    [
                        {
                            nome: 'data',
                            valido: this.validaData(data, dataCriada),
                            mensagem: 'Data deve ser maior ou igual a atual!'
                        },
                        {
                            nome: 'cliente',
                            valido: this.validaCliente(atendimentoEnviado),
                            mensagem: 'Cliente deve ter pelo menos cinco caracteres!'
                        }
                    ]
                ]
                
    }
}


module.exports = new AtendimentoValidacao;