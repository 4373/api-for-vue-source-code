var Promise = require('./Promise')

var promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(435)
  }, 3000)
})
promise.then(res => {
  console.log('res is ' + res)
})

