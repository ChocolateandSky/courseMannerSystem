import request from '@/utils/request'

export function getStudentsUsers() {
  return request({
    url: '/api/getStudentInfoInUserServlet',
    method: 'get'
  })
}

export function resetPassword(id) {
  return request({
    url: '/api/resetPasswordByIdServlet',
    method: 'post',
    params: { id: id }
  })
}

export function getTeacherUsers() {
  return request({
    url: '/api/getTeacherInfoInUserServlet',
    method: 'get'
  })
}

export function addTeacherUserServlet(data) {
  return request({
    url: '/api/addTeacherUserServlet',
    method: 'put',
    data
  })
}

export function getAllGroupFile() {
  return request({
    url: '/api/getAllGroup_FileInfoServlet',
    method: 'get'
  })
}

export function getMajorInfoServlet(collegeId) { // 查询所有专业
  return request({
    url: '/api/getMajorInfoServlet',
    method: 'get',
    params: { collegeId }
  })
}

export function getCollegeInfoServlet() { // 查询所有学院
  return request({
    url: '/api/getCollegeInfoServlet',
    method: 'get'
  })
}

export function deleteUserByIdServlet(data) { // 删除某个学院
  return request({
    url: '/api/deleteUserByIdServlet',
    method: 'post',
    params: {
      id: data.id,
      roles: data.roles
    }
  })
}

export function addCollegeInfoServlet(data) { // 查询学院
  return request({
    url: '/api/addCollegeInfoServlet',
    method: 'put',
    data: { college: data.college }
  })
}

export function addMajorInfoServlet(data) { // 添加专业
  return request({
    url: '/api/addMajorInfoServlet',
    method: 'put',
    data
  })
}

export function delMajorInfoServlet(id) { // 删除专业
  return request({
    url: '/api/removeMajorInfoServlet',
    method: 'post',
    params: { id }
  })
}

export function delCollegeInfoServlet(id) { // 删除学院
  return request({
    url: '/api/removeCollegeInfoServlet',
    method: 'post',
    params: { id }
  })
}
