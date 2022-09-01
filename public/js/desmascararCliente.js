function desmascarar(event, form) {
  event.preventDefault()
  iptCelular.value = aplicarMaskCelular.unmaskedValue
  iptTelefone.value = aplicarMaskTelefone.unmaskedValue
  iptCEP.value = aplicarMaskCEP.unmaskedValue
  form.submit()
}