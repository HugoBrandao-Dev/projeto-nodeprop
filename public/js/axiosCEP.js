let iptLocalizacao = document.getElementsByName('iptLocalizacao')[0]
let iptEndereco = document.getElementsByName('iptEndereco')[0]
let iptUF = document.getElementsByName('iptUF')[0]

iptCEP.onkeyup = function() {
    if (this.value.length === 9) {
      axios.get(`https://viacep.com.br/ws/${ aplicarMaskCEP.unmaskedValue }/json/`)
        .then(response => {
          if (response.data.erro == 'true') {
            iptLocalizacao.value = ''
            iptEndereco.value = ''
          } else {
            iptLocalizacao.value = `${ response.data.localidade }` || ''
            iptEndereco.value = `Bairro: ${ response.data.bairro }, ${ response.data.logradouro }.` || ''
            
            let optionsUF = [...iptUF]
            optionsUF.forEach(option => {
              if (option.textContent == response.data.uf) {
                option.selected = true
              } else {
                option.selected = false
              }
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }