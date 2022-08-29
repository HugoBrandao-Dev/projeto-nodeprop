const allRadios = document.querySelectorAll('input[type=radio]')
const allSections = document.querySelectorAll('section')
const allLabels = document.querySelectorAll('label.iptOpcao')

function getRadioChecked() {
  return [...allRadios].filter(radio => radio.checked)[0].value
}

function setSectionDisplay(mostrar = undefined) {
  allSections.forEach(section => {
    if (mostrar) {
      if (section.id == mostrar) {
        section.style.display = 'block'
      } else {
        section.style.display = 'none'
      }
    } else {
      section.style.display = 'none'
    }
  })
}

function applyLabelStyle(opcao) {
  allLabels.forEach(label => {
    let classes = label.className.split(' ')
    if (classes.indexOf(`lbl-${ opcao }`) != -1) {
      label.style.color = '#ce2e3c'
      label.style.backgroundColor = '#fff'
    } else {
      label.style.color = '#fff'
      label.style.backgroundColor = '#ce2e3c'
    }
  })
}

function applyEvent() {
  let mostrar = getRadioChecked()
  setSectionDisplay(mostrar)
  allRadios.forEach(radio => {
    radio.onchange = function() {
      allSections.forEach(section => {
        if (this.value == section.id) {
          section.style.display = 'block'
        } else {
          section.style.display = 'none'
        }
      })
      applyLabelStyle(this.value)
    }
  })
}

applyEvent()