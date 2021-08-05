import request from '@/utils/request'

export default ({
  getSearch(query, current = 1, size = 20) {
    return request({
      url: '/article/category/search',
      method: 'post',
      data: {
        ...query, // es6新语法 ... 向query对象中追加属性 最后生成的object：{name: xx, status: xx, current: xx, size: xx}
        current,
        size
      }
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
      url: `/article/category/${id}`, // 此处反引号的意思是 可以在URL后面进行组合, 注意，需要 ${}
      method: 'get'
    })
  },

  update(data) {
    return request({
      url: `article/category`,
      method: 'put',
      data
    })
  },

  delete(id) {
    return request({
      url: `/article/category/${id}`,
      method: 'delete'
    })
  },

  getList() {
    return request({
      url: 'article/category/list',
      method: 'get'
    })
  },

  getCategoryLabel() {
    return request({
      url: '/article/category/label/list',
      method: 'get'
    })
  }
})
