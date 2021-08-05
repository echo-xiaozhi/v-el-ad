import request from '@/utils/request'

export default {
  getList(query, current = 1, size = 20) {
    return request({
      url: `/article/advent/search`,
      method: 'post',
      data: {...query, current, size}
    })
  },

  add(data) {
    return request({
      url: `/article/category`, // 此处反引号的意思是 可以在URL后面进行组合
      method: 'post',
      data
    })
  },

  update(data) {
    return request({
      url: `article/category`,
      method: 'put',
      data
    })
  },

  getById(id) {
    return request({
      url: `/article/advent/${id}`, // 此处反引号的意思是 可以在URL后面进行组合, 注意，需要 ${}
      method: 'get'
    })
  },

  delete(id) {
    return request({
      url: `/article/category/${id}`,
      method: 'delete'
    })
  },
}
