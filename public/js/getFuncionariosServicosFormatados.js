function getFuncionariosServicosFormatados(array) {
  let novoArray = []

  array.map(registro1 => {
    let jaPresente = novoArray.filter(registro2 => registro2['id'] == registro1['id']).length
    if (jaPresente) {
      novoArray.map(raw => {
        if (raw['id'] == registro1['id']) {
          raw.responsaveis.push(registro1.nome)
        }
      })
    } else {
      novoArray.push({
        id: registro1.id,
        servico: registro1.servico,
        responsaveis: [registro1.nome]
      })
    }
  })

  return novoArray
}

module.exports = getFuncionariosServicosFormatados