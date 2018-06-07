var fs = require('fs')
var path = require('path')
var http = require('http')

http.createServer(function(req,res) {
  
})

var file = path.join(process.cwd(), '/apilist.json')

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