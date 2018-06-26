import axios from 'axios'
import qs from 'qs'

const service = axios.create({
  baseURL: 'http://localhost:8888'
})

service.interceptors.request.use(function (config) {
  config.data = qs.stringify(config.data)
  return config
}, function (err) {
  return Promise.reject(err)
})

service.interceptors.response.use(function (res) {
  const {data} = res
  return data
})

export default service