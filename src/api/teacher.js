import request from '@/utils/request'

export function updateTeacherIfo(data) {
  return request({
    url: '/test/updateTeacherInfoServlet',
    method: 'put',
    data
  })
}
