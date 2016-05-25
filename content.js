/* global Image */
(() => {
  const Kaleidos = require('kaleidos')
  const body = document.body
  const svgPath = 'M387.128,170.748L306,251.915l-81.128-81.167l-54.124,54.124L251.915,306l-81.128,81.128l54.085,54.086L306,360.086l81.128,81.128l54.086-54.086L360.086,306l81.128-81.128L387.128,170.748z M522.38,89.62c-119.493-119.493-313.267-119.493-432.76,0c-119.493,119.493-119.493,313.267,0,432.76c119.493,119.493,313.267,119.493,432.76,0C641.873,402.888,641.873,209.113,522.38,89.62z M468.295,468.295c-89.62,89.619-234.932,89.619-324.551,0c-89.62-89.62-89.62-234.932,0-324.551c89.62-89.62,234.931-89.62,324.551,0C557.914,233.363,557.914,378.637,468.295,468.295z'
  const svgStyle = 'padding:4px 0 0 4px;transform:scale(0.8);-webkit-filter:drop-shadow(0 0 3px black);fill:white;'
  const svg = `<svg style="${svgStyle}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 612 612"><path d="${svgPath}"></path></svg>`
  const ref = {}
  const options = {
    offsetX: 0,
    offsetY: 0,
    offsetRotation: 0,
    slices: Math.round(Math.random() * 20) + 4,
    ease: 0.1
  }

  var tx = options.offsetX
  var ty = options.offsetY
  var tr = options.offsetRotation

  const style = (el, obj) => {
    Object.keys(obj).map((k, v) => {
      el.style[k] = obj[k]
    })
  }

  const setupInstructions = () => {
    const instructions = 'press "k" to kaleidoscope!'
    const hoverDiv = document.createElement('div')

    hoverDiv.textContent = instructions

    style(hoverDiv, {
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
    })

    ref.hoverDiv = hoverDiv

    body.appendChild(hoverDiv)
  }

  const openKaleidos = (src) => {
    const image = new Image()
    const width = body.clientWidth / 1.4

    const kaleidos = new Kaleidos({
      src: image,
      slices: options.slices,
      radius: width,
      offsetRotation: options.offsetRotation,
      offsetX: options.offsetX,
      offsetY: options.offsetY,
      ease: options.ease
    })

    ref.kaleidos = kaleidos

    image.addEventListener('load', (event) => {
      const overlay = document.createElement('div')

      kaleidos.init()

      style(overlay, {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        background: 'black',
        width: '100%',
        height: '100%',
        cursor: `url('data:image/svg+xml;utf8,${svg}') 4 4, auto`
      })

      style(kaleidos.domElement, {
        position: 'absolute',
        top: '50%',
        left: '50%'
      })

      overlay.appendChild(kaleidos.domElement)
      body.appendChild(overlay)

      ref.overlay = overlay

      overlay.addEventListener('click', hideOverlay)
    })

    image.src = src
  }

  const hideOverlay = () => {
    body.removeChild(ref.overlay)
    ref.overlay = undefined
  }

  const updateInstructions = (event) => {
    const offset = 10
    style(ref.hoverDiv, {
      top: `${event.pageY - (offset * 2)}px`,
      left: `${event.pageX + offset}px`
    })
  }

  const updateKaleidos = (event) => {
    var dx = event.pageX / window.innerWidth
    var dy = event.pageY / window.innerHeight
    var hx = dx - 0.5
    var hy = dy - 0.5
    tx = hx * ref.kaleidos.radius * -2
    ty = hy * ref.kaleidos.radius * 2
    var delta = tr - ref.kaleidos.offsetRotation
    var theta = Math.atan2(Math.sin(delta), Math.cos(delta))
    ref.kaleidos.offsetX += (tx - ref.kaleidos.offsetX) * options.ease
    ref.kaleidos.offsetY += (ty - ref.kaleidos.offsetY) * options.ease
    ref.kaleidos.offsetRotation += (theta - ref.kaleidos.offsetRotation) * options.ease
    ref.kaleidos.draw()
  }

  body.addEventListener('mousemove', (event) => {
    if (event.target.tagName === 'IMG') {
      ref.image = event.target.src
      style(ref.hoverDiv, {
        display: 'block'
      })
    } else {
      ref.image = undefined
      style(ref.hoverDiv, {
        display: 'none'
      })
    }

    if (ref.kaleidos) {
      updateKaleidos(event)
    }

    updateInstructions(event)
  })

  body.addEventListener('keydown', (event) => {
    if (event.keyCode === 75 && ref.image && !ref.overlay) {
      event.preventDefault()
      openKaleidos(ref.image)
    }

    if (event.keyCode === 27 && ref.overlay) hideOverlay()
  })

  setupInstructions()
})()
