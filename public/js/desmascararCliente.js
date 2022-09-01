function desmascarar(event, form) {
  event.preventDefault()
  iptCelular.value = aplicarMaskCelular.unmaskedValue
  iptTelefone.value = aplicarMaskTelefone.unmaskedValue
  form.submit()
}