## kaleidos chrome extention

[![Greenkeeper badge](https://badges.greenkeeper.io/rickycodes/kaleidos-extension.svg)](https://greenkeeper.io/)

turn images into kaleidescope using [kaleidos](https://github.com/rickycodes/kaleidos)

![instructions](https://cloud.githubusercontent.com/assets/675259/15556614/b97dfd06-229c-11e6-8859-9d2c4209a456.gif)

## install

clone the repo...  
`npm i && npm run build`  
this will build `content.min.js` using webpack  
install the extension in chrome: <a href='chrome://extensions/'>chrome://extensions/</a>  
click 'Load unpacked extension...' and select the project folder

## usage

mouseover any `IMG` and you _should_ see some instructional text: `'press "k" to kaleidoscope!'`  
press "k"  
this will open an interactive kaleidoscope in an overlay  
move your mouse around to update kaleidoscope  
click to close or press `ESC`  
repeat.
