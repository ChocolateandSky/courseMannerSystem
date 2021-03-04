import request from '@/utils/request'

export function getStudentsUsers() {
  return request({
    url: '/test/getStudentInfoInUserServlet',
    method: 'get'
  })
}
