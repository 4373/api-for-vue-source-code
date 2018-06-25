const fs = require('fs')
const join = require('path').join
const md5 = require('md5')

const getList = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(join(__dirname, path), (err, data) => {
      if (err) resolve([])
      try {
        const d = JSON.parse(data.toString())
        if (Array.isArray(d)) {
          resolve(d)
        } else {
          reject('this list is not Array')
        }
      } catch (e) {
        reject('this list can not stringigy')
      }
    })
  })
}

const addItem = (path, item) => {
  return new Promise((resolve) => {
    getList(path).then(res => {
      const isExit = res.find(it => {
        return it.name === item.name && it.path === item.path
      }) !== undefined
      if (isExit) {
        resolve('该项已存在！')
      } else {
        item.id = md5(`${item.path}/${item.name}`)
        item.time = new Date().toLocaleString()
        res.push(item)
        fs.writeFile(join(__dirname, path), JSON.stringify(res), err => {
          if (err) resolve('写入错误！')
          else resolve('写入成功！')
        })
      }
    }).catch(e => {
      resolve('获取列表失败')
    })
  })
}

const updateItem = (path, item) => {
  return new Promise((resolve) => {
    getList(path).then(res => {
      const id = md5(`${item.path}/${item.name}`)
      const isExit = res.some(it => it.id === id && item.id !== id)
      if (isExit) {
        resolve('已存在同名方法和路径！')
      } else {
        let i = res.findIndex(it => it.id === item.id)
        if(i === -1) resolve('未更新，该项不存在')
        else {
          const w = Object.assign(res[i], item, {time: new Date().toLocaleString()})
          res.splice(i, 1, w)
          fs.writeFile(join(__dirname, path), JSON.stringify(res), err => {
            if (err) resolve('更新失败！')
            resolve('更新成功！')
          })
        }
      }
    }).catch(e => {
      resolve('获取列表失败')
    })
  })
}

const deleteItem = (path, id) => {
  return new Promise((resolve) => {
    getList(path).then(res => {
      let arr = res.filter(it => it.id != id)
      fs.writeFile(join(__dirname, path), JSON.stringify(arr), err => {
        if (err) resolve('删除失败！')
        resolve('删除成功！')
      })
    })
  }).catch(e => {
    resolve('获取列表失败')
  })
}

const getItem = (path, id) => {
  return new Promise((resolve, reject) => {
    fs.readFile(join(__dirname, path), (err, data) => {
      if (err) resolve('没有数据')
      try {
        const arr = JSON.parse(data.toString())
        if (Array.isArray(arr)) {
          const obj = arr.find(it => it.id == id)
          if(obj !== undefined) resolve(obj)
          else resolve('没有找到数据')
        } else {
          resolve('this list is not Array')
        }
      } catch (e) {
        resolve('this list can not stringigy')
      }
    })
  })
}

module.exports = {
  getList, addItem, updateItem, deleteItem, getItem
}