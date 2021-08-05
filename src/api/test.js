import request from '@/utils/request';

export default({
  test() {
    return request({
      url: '/test',
      method: 'get'
    })
  },
  postTest() {
    return request({
      url: '/test1',
      method: 'post',
      data: {
        'name': '瓦大喜'
      }
    })
  }
});
