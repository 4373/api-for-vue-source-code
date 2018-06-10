var fs = require('fs')
var path = require('path')
var http = require('http')
var parse = require('url').parse
var join = require('path').join

var root = __dirname

http.createServer(function(req,res) {
  sendStaticFile(req, res)
}).listen(8888)

function sendStaticFile(req, res) {
  var url = parse(req.url)
  var path = join(root, url.pathname)
  fs.stat(path, function(err, stat) {
    if(err) {
      if('ENOENT' === err.code) {
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
      stream.on('error', function(err) {
        res.statusCode = 500
        res.end('Internal Server Error')
      })
    }
  })
}



function loadOrInitList(file, cb) {
  fs.exists(file, function(exists) {
    var list = []
    if(exists) {
      fs.readFile(file, 'utf-8', function(err, data) {
        if(err) throw err
        var data = data.toString()
        list = JSON.parse(data || '[]')
        cb(list)
      })
    } else {
      cb([])
    }
  })
}

function getList(file) {
  loadOrInitList(file, function(list) {
    list.forEach(item => {
      console.log(item)
    })
  })
}

function writeList(file, list) {
  fs.writeFile(file, JSON.stringify(list), 'utf-8', function(err) {
    if(err) throw err
    return 
  })
}

function addItem(file, item) {
  getList(file, function(list) {
    console.log(item)
  })
}