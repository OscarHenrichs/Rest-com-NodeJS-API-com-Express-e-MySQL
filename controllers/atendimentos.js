module.exports = app => {

    app.get('/atendimentos', (req, res) => res.send('Rota Atendimentos Get'));

    app.post('/atendimentos', (req, res) => res.send('Rota Atendimentos Post'))
}