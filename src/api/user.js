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
      newPassword: data.newPassword
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
