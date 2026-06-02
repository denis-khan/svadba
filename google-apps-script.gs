const SHEET_ID = '10VJCdK6vPIK4OEWwEMsh0DWaZPnYBHlOgE4-WtL19IU';
const SHEET_NAME = 'Ответы';

function doPost(e) {
  const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  const sheet = getSheet_();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Дата отправки',
      'Имя и фамилия',
      'Присутствие',
      'Напитки',
      'Другое',
      'Любимая песня'
    ]);
  }

  sheet.appendRow([
    new Date(),
    payload.name || '',
    payload.attendance || '',
    Array.isArray(payload.drinks) ? payload.drinks.join(', ') : (payload.drinks || ''),
    payload.otherDrink || '',
    payload.song || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}
