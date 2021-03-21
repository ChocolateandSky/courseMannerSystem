import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/loginServlet',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/getUserInfoServletByToken',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/api/loginOutServlet',
    method: 'post',
    params: { token }
  })
}

export function updatePassword(data) {
  return request({
    url: '/api/changePasswordServlet',
    method: 'post',
    params: {
      id: data.id,
      newPassword: data.newPassword,
      password: data.password
    }
  })
}

export function sendMail(data) {
  return request({
    url: '/api/mailForEveryStudentServlet',
    method: 'post',
    params: {
      id: data.id,
      notice: data.notice
    }
  })
}
export function updateTeacherIfo(data) {
  return request({
    url: '/api/updateTeacherInfoServlet',
    method: 'put',
    data
  })
}

export function updateStudentIfo(data) {
  return request({
    url: '/api/updateStudentInfoServlet',
    method: 'put',
    data
  })
}

export function getTeacherList() {
  return request({
    url: '/api/getALLInstructorInfoServlet',
    method: 'get'
  })
}

export function getAllPracticum() {
  return request({
    url: '/api/getAllPracticumInfoServlet',
    method: 'get'
  })
}

export function getAllStudentList(teacherId, roles) {
  return request({
    url: '/api/getStudent_PracticumInfoServlet',
    method: 'get',
    params: {
      teacherId,
      roles
    }
  })
}

export function sendMailToGroup(data) {
  return request({
    url: '/api/mailForGroupMemberServlet',
    method: 'post',
    data
  })
}

export function getNotice(userId) {
  return request({
    url: '/api/getNoticeServlet',
    method: 'get',
    params: {
      userId
    }
  })
}

export function sendNotice(data) {
  return request({
    url: '/api/SendNoticeWhenuploadFileServlet',
    method: 'post',
    data
  })
}

export function readNotice(data) {
  return request({
    url: '/api/readNoticeServlet',
    method: 'post',
    data
  })
}
