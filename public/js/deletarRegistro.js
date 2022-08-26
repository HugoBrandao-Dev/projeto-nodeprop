function deletarRegistro(event, form) {
  event.preventDefault()
  if (confirm(`Deletar registro de ID: ${ form.iptId.value }?`))
    form.submit()
}