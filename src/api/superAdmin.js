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

export function getMajorInfoServlet(collegeId) { // 查询所有专业
  return request({
    url: '/test/getMajorInfoServlet',
    method: 'get',
    params: { collegeId }
  })
}

export function getCollegeInfoServlet() { // 查询所有学院
  return request({
    url: '/test/getCollegeInfoServlet',
    method: 'get'
  })
}

export function deleteUserByIdServlet(data) { // 查询所有学院
  return request({
    url: '/test/deleteUserByIdServlet',
    method: 'post',
    params: {
      id: data.id,
      roles: data.roles
    }
  })
}

export function addCollegeInfoServlet(data) { // 查询学院
  return request({
    url: '/test/addCollegeInfoServlet',
    method: 'put',
    data: { college: data.college }
  })
}

export function addMajorInfoServlet(data) { // 添加专业
  return request({
    url: '/test/addMajorInfoServlet',
    method: 'put',
    data
  })
}

