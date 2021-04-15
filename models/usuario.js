const moment = require('moment');
const connect = require('../infra/connectMySQL');
const UsuarioValidacao = require('./validacao/usuario');

class UsuarioModel {
    adiciona(usuarioEnviado, res) {

        const validacoes = UsuarioValidacao.validaTodos(usuarioEnviado)

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros){
            res.status(400).json(erros)
        }else{

            

            const sql = 'INSERT INTO Usuarios SET ?'

            connect.query(sql, usuarioEnviado, (erro, resultados) =>{
                if (erro) {
                    res.status(400).json(erro);
                }else{
                    res.status(201).json({ "id":resultados.insertId.toString(), ...usuarioEnviado});
                }
            })

        }
        
    }
    
    lista(res) {
        const sql = "SELECT * FROM Usuarios"

        connect.query(sql, (erro, resultados) =>{
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        })
    }

    // buscaPorId(id, res) {
    //     const sql = `SELECT * FROM atendimentos WHERE id=${id}`

    //     connect.query(sql, (erro, resultados) =>{
    //         const atendimento = resultados[0];
    //         if (erro) {
    //             res.status(400).json(erro);
    //         }else{
    //             res.status(200).json(atendimento);
    //         }
    //     })
    // }
    
    // alteraPorId(id, valores, res) {
    //     if(valores.data) {
    //         valores.data = moment(valores.data, 'DD-MM-YYYY').format('YYYY-MM-DD hh:mm:ss')
    //     }

    //     const sql = 'UPDATE atendimentos SET ? WHERE id=?'

    //     connect.query(sql, [valores, id], (erro, resultados) =>{
    //         if (erro) {
    //             res.status(400).json(erro);
    //         }else{
    //             res.status(200).json({...valores, id});
    //         }
    //     })
    // }

    // deletaPorId(id, res) {
    //     const sql = 'DELETE FROM atendimentos WHERE id=?'

    //     connect.query(sql, id, (erro, resultados) =>{
    //         if (erro) {
    //             res.status(400).json(erro);
    //         }else{
    //             res.status(200).json({"removido": "true", id});
    //         }
    //     })
    // }

}

module.exports = new UsuarioModel;

