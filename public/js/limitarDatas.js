function getDay() {
  let day = new Date().getDate()
  if (day < 10) {
    return `0${ day }`
  }
  return day
}

function getMonth() {
  let month = new Date().getMonth()
  if (++month < 10) {
    return `0${ month }`
  }
  return month
}

function getYear() {
  return new Date().getFullYear()
}

function getMaxDate() {
  let year = getYear()
  let month = getMonth()
  let day = getDay()
  return `${ year }-${ month }-${ day }`
}

function getMinDate() {
  return `1662-01-01`
}

let iptsDate = document.querySelectorAll("input[type='date']")

let allDates = [...iptsDate]

allDates.forEach(ipt => {
  ipt.setAttribute('max', getMaxDate())
  ipt.setAttribute('min', getMinDate())
})