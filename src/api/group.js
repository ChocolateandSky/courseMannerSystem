import request from '@/utils/request'

export function getGroupDetailByTeacher(data) {
  return request({
    url: '/test/getGroupInfoServlet',
    method: 'get',
    params: { teacherId: data }
  })
}

export function getMemberList(id) {
  return request({
    url: '/test/getGroupMemberServlet',
    method: 'get',
    params: { groupId: id }
  })
}

export function getStudnetList(data) {
  return request({
    url: '/test/getStudent_PracticumInfoServlet',
    method: 'get',
    params: { practId: data.practId }
  })
}

export function getGroupList(id) {
  return request({
    url: '/test/getGroupInfoByteacherIdServlet',
    method: 'get',
    params: { teacherId: id }
  })
}

export function getGroupDetail(id) {
  return request({
    url: '/test/getGroupInfoBygroupIdServlet',
    method: 'get',
    params: { groupId: id }
  })
}

export function setStudentWork(data) {
  return request({
    url: '/test/setStudentWorkInGroupServlet',
    method: 'post',
    data
  })
}

