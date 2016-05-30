/* global Image */
(() => {
  const Kaleidos = require('kaleidos')
  const styles = require('./styles')
  const body = document.body
  const ref = {}
  const ease = 0.1

  const style = (el, obj) => {
    Object.keys(obj).map((k, v) => {
      el.style[k] = obj[k]
    })
  }

  const setupInstructions = () => {
    const instructions = 'press "k" to kaleidoscope!'
    const hoverDiv = document.createElement('div')

    hoverDiv.textContent = instructions
    style(hoverDiv, styles.instructions)
    ref.hoverDiv = hoverDiv
    body.appendChild(hoverDiv)
  }

  const openKaleidos = (src) => {
    const image = new Image()
    const width = body.clientWidth / 1.4

    const kaleidos = new Kaleidos({
      src: image,
      slices: Math.round(Math.random() * 20) + 4,
      radius: width
    })

    ref.kaleidos = kaleidos

    image.addEventListener('load', (event) => {
      const overlay = document.createElement('div')

      kaleidos.init()

      style(overlay, styles.overlay)
      style(kaleidos.domElement, styles.kaleidos)
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
    ref.kaleidos.offsetX += (event.pageX - ref.kaleidos.offsetX) * ease
    ref.kaleidos.offsetY += (event.pageY - ref.kaleidos.offsetY) * ease
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

    if (ref.kaleidos) updateKaleidos(event)

    updateInstructions(event)
  })

  body.addEventListener('keydown', (event) => {
    if (event.keyCode === 75 && ref.image && !ref.overlay) {
      event.preventDefault()
      openKaleidos(ref.image)
    }

    if (event.keyCode === 27 && ref.overlay) {
      event.preventDefault()
      hideOverlay()
    }
  })

  setupInstructions()
})()
