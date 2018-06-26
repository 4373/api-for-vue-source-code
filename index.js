const http = require('http')
const qs = require('qs')

const {getList, addItem, updateItem, deleteItem, getItem} = require('./CRUD')
const {sendStaticFile} = require('./staticFile')

http.createServer(function (req, res) {
  if(req.method === 'GET') {
    sendStaticFile(req, res)
  } else {
    let body = ''
    req.on('data', chunk => {
      body += chunk
    })
    req.on('end', () => {
      body = qs.parse(body)
      
      const type = body.type ? body.type : 'vue'
      const path = `/data/${type}.json`
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8', 'Access-Control-Allow-Origin': '*'})
      switch (req.url) {
        case '/add': 
          addItem(path, body.data).then(d => {
            res.end(d)
          })
          break
        case '/list': 
          getList(path).then(d => {
            res.end(JSON.stringify(d))
          })
          break
        case '/detail': 
          getItem(path, body.data).then(d => {
            res.end(JSON.stringify(d))
          })
          break
        case '/update':
          updateItem(path, body.data).then(d => {
            res.end(d)
          })
          break
        case '/delete': 
          deleteItem(path, body.data).then(d => {
            res.end(d)
          })
          break
        default: 
          res.end('unknow request')
      }

    })
  }
}).listen(8888)