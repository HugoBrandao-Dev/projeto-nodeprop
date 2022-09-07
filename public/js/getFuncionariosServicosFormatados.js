function getFuncionariosServicosFormatados(array, identificadorServico = 'id') {
  let novoArray = []

  array.map(registro1 => {
    let jaPresente = novoArray.filter(registro2 => registro2[identificadorServico] == registro1[identificadorServico]).length
    if (jaPresente) {
      novoArray.map(raw => {
        if (raw[identificadorServico] == registro1[identificadorServico]) {
          raw.responsaveis.push({ id: registro1.funcionario_id, nome: registro1.nome })
        }
      })
    } else {
      novoArray.push({
        id: registro1.id,
        servico: registro1.servico,
        responsaveis: [{ id: registro1.funcionario_id, nome: registro1.nome }]
      })
    }
  })

  return novoArray
}

module.exports = getFuncionariosServicosFormatados