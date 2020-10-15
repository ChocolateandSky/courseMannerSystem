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

export function updatePassword() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function sendMail(data) {
  return request({
    url: '/test/mailForEveryStudentServlet',
    method: 'post',
    data
  })
}

