const express = require('express');
const app = express();
const { getCalendarData } = require('./calendario/calendario')
const {getLastResults} = require('./resultados/resultados')
const cors = require('cors')

app.use(cors())

app.get('/api/get-calendar', async (req, res) => {
    const data = await getCalendarData()
    if (data) {
        res.json(data)
    } 
    else {
        res.status(404).json({ message: 'Calendário não encontrado' })
    }
})

app.get('/api/get-results', async(req, res) => {
    const data = await getLastResults()
    if(data) {
        res.json(data)
    }
    else {
        res.status(404).json({message: 'Resultados não encontrados'})
    }
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
