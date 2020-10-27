import request from '@/utils/request'

export function getGroupDetailByTeacher(data) {
  return request({
    url: '/test/getGroupInfoServlet',
    method: 'get',
    params: { teacherId: data }
  })
}

export function getGroupDetailByGroupId(data) {
  return request({
    url: '/test/getGroupMemberServlet',
    method: 'get',
    params: { groupId: data.groupId }
  })
}

// export function getGroupList(data) {
//   return request({
//     url: '/test/getGroupInfoBypractIdServlet',
//     method: 'get',
//     params: { practId: data.practId }
//   })
// }

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
