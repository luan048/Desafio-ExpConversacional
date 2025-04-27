const express = require('express');
const app = express();
const { getCalendarData } = require('./calendario/calendario.js');

app.get('/api/get-calendar', async (req, res) => {
    const data = await getCalendarData()
    if (data) {
        res.json(data)
    } 
    else {
        res.status(404).json({ message: 'Calendário não encontrado' })
    }
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
});
