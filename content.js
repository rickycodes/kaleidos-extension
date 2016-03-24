const Kaleidos = require('kaleidos')

function openKaleidos (event) {
  event.preventDefault()
  var image = new Image()
  image.src = this.dataset.img

  var kaleidos = new Kaleidos({
    src: image,
    slices: Math.round(Math.random() * 20) + 4
  })

  image.addEventListener('load', function (event) {
    kaleidos.init()

    kaleidos.domElement.style.position = 'absolute'
    kaleidos.domElement.style.left = '50%'
    kaleidos.domElement.style.top = '50%'

    window.open('about:blank', image.src).document.body.appendChild(kaleidos.domElement)
  })
}

function inlineStyles (stylesObj) {
  return Object.keys(stylesObj).map(function (k) {
    return k + ':' + stylesObj[k] + ';'
  }).join('')
}

function initialize () {
  var images = document.getElementsByTagName('img')

  for(var i = 0; i < images.length; i++) {
    var img = images[i]

    var link = document.createElement('a')
    var linkStyles = {
      'border-radius': '2px',
      'padding': '8px 10px 6px',
      'margin': '6px',
      'z-index': '9999',
      'background': '#e3e3e3',
      'color': 'white',
      'text-align': 'right',
      'text-decoration': 'none',
      'font-size': '10px',
      'display': 'block',
      'position': 'absolute',
      'bottom': 0,
      'right': 0
    }
    link.textContent = '🌀'
    link.setAttribute('href', '#')
    link.setAttribute('data-img', img.src)
    link.setAttribute('style', inlineStyles(linkStyles))
    link.setAttribute('title', 'create kaleidescope')
    link.addEventListener('click', openKaleidos)

    var wrap = document.createElement('div')
    var wrapStyles = {
      'position': 'relative',
      'height': img.height + 'px'
    }
    wrap.setAttribute('class', 'kaleidos-wrap')
    wrap.setAttribute('style', inlineStyles(wrapStyles))

    img.parentNode.style.paddingBottom = '0px'
    img.parentNode.insertBefore(wrap, img)

    wrap.appendChild(img)
    wrap.appendChild(link)
  }
}

initialize()
