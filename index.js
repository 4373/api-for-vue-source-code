const http = require('http')

const {getList, addItem, updateItem, deleteItem, getItem} = require('./CRUD')
const {sendStaticFile} = require('./staticFile')

http.createServer(function (req, res) {
  if(req.method === 'GET') {
    sendStaticFile(req, res)
  }
}).listen(8888)

getItem('/data/vue.json', '0b8e0bcd2e99d47538ae3f8b85e7f593').then(res => {
  console.log(res)
})