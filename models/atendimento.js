const moment = require('moment');
const connect = require('../infra/connectMySQL');
const AtendimentoValidacao = require('./validacao/atendimento');

class AtendimentoModel {
    adiciona(atendimentoEnviado, res) {

        const validacoes = AtendimentoValidacao.validaTodos(atendimentoEnviado)

        const erros = validacoes[2].filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros){
            res.status(400).json({...atendimentoEnviado, erros})
        }else{

            const data = validacoes[0]
            const dataCriada = validacoes[1]
            const atendimentoDatado = {...atendimentoEnviado, data, dataCriada};

            const sql = 'INSERT INTO atendimentos SET ?'

            connect.query(sql, atendimentoDatado, (erro, resultados) =>{
                if (erro) {
                    res.status(400).json(erro);
                }else{
                    res.status(201).json({ "id":resultados.insertId.toString(), ...atendimentoDatado });
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

module.exports = new AtendimentoModel;