let allBtnExpandir = document.querySelectorAll('button.btn-expandir-acoes')
  allBtnExpandir.forEach(elemento => {
    elemento.onclick = function() {

      // A classe base, para saber qual submenu expandir, está na última posição do array de classes vindo do botão de expansão de cada um dos registros.
      let tamanhoArrayClasses = this.className.split(' ').length
      let classe = this.className.split(' ')[tamanhoArrayClasses - 1]

      // Número base, para saber qual submenu expandir.
      let numero = classe.split('-')[1]

      // Pega a ul correspondente ao botão de expansão que o usuário clicou.
      let ulCorrespondente = document.querySelector(`ul.acoes-${ numero }`)

      if (ulCorrespondente.style.display != 'block') {
        ulCorrespondente.style.display = 'block'
      } else {
        ulCorrespondente.style.display = 'none'
      }
    }
  })