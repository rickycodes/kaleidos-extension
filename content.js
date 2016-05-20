/* global Image */
(() => {
  const Kaleidos = require('kaleidos')

  const applyStyle = (el, obj) => {
    Object.keys(obj).map((k, v) => {
      el.style[k] = obj[k]
    })
  }

  const openKaleidos = (src) => {
    const image = new Image()
    const clientWidth = document.body.clientWidth

    const kaleidos = new Kaleidos({
      src: image,
      slices: Math.round(Math.random() * 20) + 4,
      radius: clientWidth,
      offsetX: Math.random() * 800,
      offsetY: Math.random() * 800
    })

    image.addEventListener('load', (event) => {
      const overlay = document.createElement('div')

      kaleidos.init()

      const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: 'black',
        width: '100%',
        height: '100%'
      }

      const kaleidosStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%'
      }

      applyStyle(overlay, overlayStyle)
      applyStyle(kaleidos.domElement, kaleidosStyle)

      overlay.appendChild(kaleidos.domElement)
      document.body.appendChild(overlay)

      overlay.addEventListener('click', (event) => document.body.removeChild(overlay))
    })

    image.src = src
  }

  document.body.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
      event.preventDefault()
      openKaleidos(event.target.src)
    }
  })
})()
