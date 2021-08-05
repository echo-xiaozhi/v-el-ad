import request from '@/utils/request'

export default {
  getList(query) {
    return request({
      url: '/system/menu/search',
      method: 'post',
      data: query
    })
  },

  add(data) {
    return request({
      url: `/article/category`, // 此处反引号的意思是 可以在URL后面进行组合
      method: 'post',
      data
    })
  },

  getById(id) {
    return request({
      url: `/system/menu/${id}`,
      method: 'get'
    })
  },

  delete(id) {
    return request({
      url: `/article/category/${id}`,
      method: 'delete'
    })
  }

}
