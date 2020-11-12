import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/test/loginServlet',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/test/getUserInfoServletByToken',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/test/loginOutServlet',
    method: 'post',
    params: { token }
  })
}

export function updatePassword(data) {
  return request({
    url: '/test/changePasswordServlet',
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
    url: '/test/mailForEveryStudentServlet',
    method: 'post',
    params: {
      id: data.id,
      notice: data.notice
    }
  })
}
export function updateTeacherIfo(data) {
  return request({
    url: '/test/updateTeacherInfoServlet',
    method: 'put',
    data
  })
}

export function updateStudentIfo(data) {
  return request({
    url: '/test/updateStudentInfoServlet',
    method: 'put',
    data
  })
}

export function getTeacherList() {
  return request({
    url: '/test/getALLInstructorInfoServlet',
    method: 'get'
  })
}

export function getAllPracticum() {
  return request({
    url: '/test/getAllPracticumInfoServlet',
    method: 'get'
  })
}

export function getAllStudentList(teacherId, roles) {
  return request({
    url: '/test/getStudent_PracticumInfoServlet',
    method: 'get',
    params: {
      teacherId,
      roles
    }
  })
}

export function sendMailToGroup(data) {
  return request({
    url: '/test/mailForGroupMemberServlet',
    method: 'post',
    data
  })
}

export function getNotice(userId) {
  return request({
    url: '/test/getNoticeServlet',
    method: 'get',
    params: {
      userId
    }
  })
}

export function sendNotice(data) {
  return request({
    url: '/test/SendNoticeWhenuploadFileServlet',
    method: 'post',
    data
  })
}

export function readNotice(data) {
  return request({
    url: '/test/readNoticeServlet',
    method: 'post',
    data
  })
}
