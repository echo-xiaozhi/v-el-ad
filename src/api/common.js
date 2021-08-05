import request from '@/utils/request'

export default {
  uploadImg(data) {
    return request({
      url: '/article/file/upload',
      method: 'post',
      data
    })
  },

  deleteImg(path) {
    return request({
      url: '/article/file/delete',
      method: 'delete',
      params: {'filePath': path}
    })
  }
}
