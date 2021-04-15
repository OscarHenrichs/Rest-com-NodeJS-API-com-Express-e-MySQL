const moment = require('moment');
const connect = require('../infra/connectMySQL');

class Atendimento {
    adiciona(atendimento, res) {

        const dataCreate = moment().format('YYYY-MM-DD hh:mm:ss') 
        const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD hh:mm:ss')


        const validaData = moment(data).isSameOrAfter(dataCreate);
        const validaCliente = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: validaData,
                mensagem: 'Data deve ser maior ou igual a atual!'
            },
            {
                nome: 'cliente',
                valido: validaCliente,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres!'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros){
            res.status(400).json(erros)
        }else{

            const atendimentoDatado = {...atendimento, dataCreate, data};

            const sql = 'INSERT INTO atendimentos SET ?'

            connect.query(sql, atendimentoDatado, (erro, resultados) =>{
                if (erro) {
                    res.status(400).json(erro);
                }else{
                    res.status(201).json(atendimentoDatado);
                }
            })

        }
        
    }
    
    lista(res) {
        const sql = "SELECT * FROM atendimentos"

        connect.query(sql, (erro, resultados) =>{
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`

        connect.query(sql, (erro, resultados) =>{
            const atendimento = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json(atendimento);
            }
        })
    }
    
    alteraPorId(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD-MM-YYYY').format('YYYY-MM-DD hh:mm:ss')
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id=?'

        connect.query(sql, [valores, id], (erro, resultados) =>{
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json({...valores, id});
            }
        })
    }

    deletaPorId(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id=?'

        connect.query(sql, id, (erro, resultados) =>{
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json({"removido": "true", id});
            }
        })
    }

}

module.exports = new Atendimento;