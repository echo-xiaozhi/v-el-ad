import request from '@/utils/request'

export default {
  getList(query, current = 1, size = 20) {
    return request({
      url: `/article/label/search`,
      method: 'post',
      data: {...query, current, size}
    })
  },

  add(data) {
    return request({
      url: `/article/category`,
      method: 'post',
      data
    })
  },

  getById(id) {
    return request({
      url: `/article/lable/${id}`,
      method: 'get'
    })
  },

  update(data) {
    return request({
      url: `/article/category`,
      method: 'put',
      data
    })
  },

  delete(id) {
    return request({
      url: `/article/category/${id}`,
      method: 'delete'
    })
  }
}
