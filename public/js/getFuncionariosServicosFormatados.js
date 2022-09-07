function getFuncionariosServicosFormatados(array, identificadorServico = 'id') {
  let novoArray = []

  array.map(registro1 => {
    let jaPresente = novoArray.filter(registro2 => registro2['id'] == registro1[identificadorServico]).length
    if (jaPresente) {
      novoArray.map(raw => {
        if (raw['id'] == registro1[identificadorServico]) {
          raw.responsaveis.push({ id: registro1.funcionarioId, nome: registro1.nome })
        }
      })
    } else {
      let objeto = {
        id: registro1[identificadorServico],
        servico: registro1.servico,
        responsaveis: [{ id: registro1.funcionarioId, nome: registro1.nome }]
      }
      if (registro1.informacoes) {
        objeto.informacoes = registro1.informacoes
      }
      novoArray.push(objeto)
    }
  })

  return novoArray
}

module.exports = getFuncionariosServicosFormatados