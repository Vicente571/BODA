// ═══════════════════════════════════════════════════════
//  BODA MICHELLE Y JAIR — Google Apps Script
//  Pega este codigo en tu Apps Script y despliega como
//  App Web con acceso para "Cualquier persona"
// ═══════════════════════════════════════════════════════

const SHEETS = {
  asistentes: 'asistentes',
  canciones:  'canciones',
  fotos:      'fotos',
}

function doGet(e)  { return handleRequest(e) }
function doPost(e) { return handleRequest(e) }

function handleRequest(e) {
  const ss     = SpreadsheetApp.getActiveSpreadsheet()
  const action = e.parameter.action
  try {
    let data = null
    if (e.parameter.data)  data = JSON.parse(decodeURIComponent(e.parameter.data))
    else if (e.postData)   data = JSON.parse(e.postData.contents)

    let result
    if      (action === 'getAsistentes') result = getSheet(ss, SHEETS.asistentes)
    else if (action === 'getCanciones')  result = getSheet(ss, SHEETS.canciones)
    else if (action === 'getFotos')      result = getSheet(ss, SHEETS.fotos)
    else if (action === 'addAsistente')  result = addRow(ss, SHEETS.asistentes, data, ['id','nombre','familia_id','timestamp'])
    else if (action === 'addCancion')    result = addRow(ss, SHEETS.canciones,  data, ['id','cancion','artista','timestamp'])
    else if (action === 'addFoto')       result = addRow(ss, SHEETS.fotos,      data, ['id','url','timestamp'])
    else result = { error: 'Accion no reconocida' }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON)
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function getSheet(ss, name) {
  const sheet = ss.getSheetByName(name)
  if (!sheet) return []
  const rows = sheet.getDataRange().getValues()
  if (rows.length <= 1) return []
  const headers = rows[0]
  return rows.slice(1).map(row => {
    const obj = {}
    headers.forEach((h, i) => { obj[h] = row[i] === null || row[i] === undefined ? '' : String(row[i]) })
    return obj
  })
}

function addRow(ss, name, data, headers) {
  let sheet = ss.getSheetByName(name)
  if (!sheet) {
    sheet = ss.insertSheet(name)
    sheet.appendRow(headers)
  }
  const h = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
  const row = h.map(key => data[key] !== undefined ? String(data[key]) : '')
  sheet.appendRow(row)
  return { ok: true }
}
