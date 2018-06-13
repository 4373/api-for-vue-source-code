function isFunction(fn) {
  return typeof fn === 'function'
}


function Promise(fn) {
  this.state = 'pending'
  this.queen = []
  this.value = undefined

  function resolve(res) {
    this.value = res
    this.state = 'resolve'
    return this
  }
  function reject(rej) {
    this.value = rej
    this.state = 'reject'
  }

  if(isFunction(fn)) {
    fn(resolve.bind(this), reject.bind(this))
  } else {
    throw 'should be a function'
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  if(isFunction(onFulfilled)) {
    console.log(this)
    onFulfilled(this.value)
  } else {
    throw '`then` function`s params must be a function'
  }
}

module.exports = Promise



