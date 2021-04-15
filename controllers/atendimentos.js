const Atendimento = require('../models/atendimento')


module.exports = app => {

    app.get('/atendimentos', (req, res) => {

        Atendimento.lista(res);
        
    });

    app.get('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id)
        
        Atendimento.buscaPorId(id, res)
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res);

        //res.send(`Rota Atendimentos Post | adicionado o atendidomento do Cliente ${atendimento.cliente} `);
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.alteraPorId(id, valores, res);
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.deletaPorId(id, res);
    })
}