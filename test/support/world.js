const { setWorldConstructor } = require('cucumber')

function world ({ attach }) {
  this.attach = attach
}

setWorldConstructor(world)
