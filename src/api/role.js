import request from '@/utils/request'

export default {
  getMenuIds(id) {
    return request({
      url: `/system/role/${id}/menu/ids`,
      method: 'get'
    })
  },

  edit(id, data) {
    return request({
      url: `/system/role/${id}/menu/save`,
      method: 'post',
      data
    })
  }
}
