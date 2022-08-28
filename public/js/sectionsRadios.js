const allRadios = document.querySelectorAll('input[type=radio]')
const allSections = document.querySelectorAll('section')

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
    }
  })
}

applyEvent()