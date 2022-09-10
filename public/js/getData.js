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

function getData() {
  return `${ getYear() }-${ getMonth() }-${ getDay() }`
}

module.exports = getData