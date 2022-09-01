// Mascara para o telefone
let iptTelefone = document.getElementsByName('iptTelefone')[0]
let telefoneMask = {
  mask: '(00) 00000-0000'
}
let aplicarMaskTelefone = IMask(iptTelefone, telefoneMask)

// Mascara para o telefone
let iptCelular = document.getElementsByName('iptCelular')[0]
let celularMask = {
  mask: '(00) 00000-0000'
}
let aplicarMaskCelular = IMask(iptCelular, celularMask)

// Mascara para CEP
let iptCEP = document.getElementsByName('iptCEP')[0]
let cepMask = {
  mask: '00000-000'
}
let aplicarMaskCEP = IMask(iptCEP, cepMask)