const { google } = require('googleapis');

async function getCalendarData() {
    const sheets = google.sheets({ version: 'v4', auth: 'AIzaSyCGkRZO0nRHIp8fi69j7q8TmZXXJgKSs_M' })

    const spreadsheetId = '15i824h38HiA36sXEPAcEDwE7THRlzz4egFz7geKex64'

    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Calendário!A1:C10',
        })

        const rows = res.data.values
        if (rows.length) {
            console.log('Calendário de jogos:')
            rows.map((row) => {
                console.log(`${row[0]}: ${row[1]}`)
            })
            return rows
        } 
        else {
            console.log('Nenhum dado encontrado.')
            return null
        }
    } 
    catch (err) {
        console.error('Erro ao acessar o Google Sheets API:', err)
        return null
    }
}

module.exports = { getCalendarData };
