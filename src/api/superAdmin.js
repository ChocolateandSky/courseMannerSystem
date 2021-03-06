import request from '@/utils/request'

export function getStudentsUsers() {
  return request({
    url: '/test/getStudentInfoInUserServlet',
    method: 'get'
  })
}

export function resetPassword(id) {
  return request({
    url: '/test/resetPasswordByIdServlet',
    method: 'post',
    params: { id: id }
  })
}

export function getTeacherUsers() {
  return request({
    url: '/test/getTeacherInfoInUserServlet',
    method: 'get'
  })
}

export function addTeacherUserServlet(data) {
  return request({
    url: '/test/addTeacherUserServlet',
    method: 'put',
    data
  })
}

export function getAllGroupFile() {
  return request({
    url: '/test/getAllGroup_FileInfoServlet',
    method: 'get'
  })
}
