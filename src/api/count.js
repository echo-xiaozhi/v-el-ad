import request from '@/utils/request'

export default {
  getMain(type) {
    return request({
      url: '/portal/count/getMain',
      method: 'post',
      data: {type: type}
    })
  },

  getIndex() {
    return request({
      url: '/portal/count/index',
      method: 'get'
    })
  }
}
