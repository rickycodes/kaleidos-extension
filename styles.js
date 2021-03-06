/* styles and things that dictate appearance */
const svgPath = 'M387.128,170.748L306,251.915l-81.128-81.167l-54.124,54.124L251.915,306l-81.128,81.128l54.085,54.086L306,360.086l81.128,81.128l54.086-54.086L360.086,306l81.128-81.128L387.128,170.748z M522.38,89.62c-119.493-119.493-313.267-119.493-432.76,0c-119.493,119.493-119.493,313.267,0,432.76c119.493,119.493,313.267,119.493,432.76,0C641.873,402.888,641.873,209.113,522.38,89.62z M468.295,468.295c-89.62,89.619-234.932,89.619-324.551,0c-89.62-89.62-89.62-234.932,0-324.551c89.62-89.62,234.931-89.62,324.551,0C557.914,233.363,557.914,378.637,468.295,468.295z'
const svgStyle = 'padding:4px 0 0 4px;transform:scale(0.8);-webkit-filter:drop-shadow(0 0 3px black);fill:white;'
const svg = `<svg style="${svgStyle}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 612 612"><path d="${svgPath}"></path></svg>`

exports.overlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 99999,
  background: 'black',
  width: '100%',
  height: '100%',
  cursor: `url('data:image/svg+xml;utf8,${svg}') 4 4, auto`
}

exports.kaleidos = {
  position: 'absolute',
  top: '50%',
  left: '50%'
}

exports.instructions = {
  boxShadow: '0 0 3px black',
  background: 'white',
  padding: '6px 14px',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 99999,
  color: 'black',
  fontSize: '14px',
  display: 'none'
}
