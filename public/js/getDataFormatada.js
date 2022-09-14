// Esta função formata uma data vinda do banco de dados (yyyy-mm-dd).
function getDataFormatada(data) {
  let dataArray = data.split('-')
  return `${ dataArray[2] }/${ dataArray[1] }/${ dataArray[0] }`
}

module.exports = getDataFormatada