const parse = require('url').parse
const join = require('path').join
const fs = require('fs')

module.exports.sendStaticFile =function(req, res) {
  var url = parse(req.url)
  var path = join(__dirname, url.pathname)
  fs.stat(path, function (err, stat) {
    if (err) {
      if ('ENOENT' === err.code) {
        res.statusCode = 404
        res.end('Not Found')
      } else {
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    } else {
      res.setHeader('Content-Length', stat.size)
      var stream = fs.createReadStream(path)
      stream.pipe(res)
      stream.on('error', function (err) {
        res.statusCode = 500
        res.end('Internal Server Error')
      })
    }
  })
}