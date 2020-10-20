import request from '@/utils/request'

export function getGroupDetailByTeacher(data) {
  return request({
    url: '/test/getGroupInfoServlet',
    method: 'get',
    params: { teacherId: data }
  })
}
