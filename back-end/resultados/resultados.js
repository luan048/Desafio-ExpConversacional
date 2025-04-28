const {google} = require('googleapis')

async function getLastResults() {
    const sheets = google.sheets({ version: 'v4', auth: 'AIzaSyCGkRZO0nRHIp8fi69j7q8TmZXXJgKSs_M' })
    const spreadsheetId = '15i824h38HiA36sXEPAcEDwE7THRlzz4egFz7geKex64'

    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'ResultadosCS'
        })

        const rows = res.data.values
        if(rows && rows.length) {
            console.log('Resultado dos últimos jogos:');
            rows.map((row) => {
                console.log(`Resultado ${row[1]} do dia ${row[0]}`)
            })
            return rows
        }
        else {
            console.log('Nenhum dado encontrado.')
            return null
        }
    }
    catch(err) {
        console.error('Erro ao acessar planilha Google Sheets API: ', err);
        return null
    }
}

module.exports = {getLastResults}