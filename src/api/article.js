import request from '@/utils/request'

export default {
  getList(query, current = 1, size = 20) {
    return request({
      url: '/article/article/search',
      method: 'post',
      data: {...query, current, size}
    })
  },

  getById(id) {
    return request({
      url: `/article/article/${id}`,
      method: 'get'
    })
  },

  Audit(data) {
    return request({
      url: `/article/category`,
      method: 'put',
      data
    })
  }
}
