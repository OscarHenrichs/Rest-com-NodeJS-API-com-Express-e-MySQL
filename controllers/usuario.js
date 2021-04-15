const UsuarioModel = require('../models/usuario')


module.exports = app => {

    app.get('/usuario', (req, res) => {

        UsuarioModel.lista(res);
        
    });

    // app.get('/users/:id', (req, res) => {

    //     const id = parseInt(req.params.id)
        
    //     users.buscaPorId(id, res)
    // });

    app.post('/usuario', (req, res) => {
        const usuarioEnviado= req.body

        UsuarioModel.adiciona(usuarioEnviado, res);

    })

    // app.patch('/users/:id', (req, res) => {
    //     const id = parseInt(req.params.id);
    //     const valores = req.body;

    //     users.alteraPorId(id, valores, res);
    // })

    // app.delete('/users/:id', (req, res) => {
    //     const id = parseInt(req.params.id);

    //     users.deletaPorId(id, res);
    // })
}