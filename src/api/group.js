import request from '@/utils/request'

export function getGroupDetailByTeacher(data) {
  return request({
    url: '/api/getGroupInfoServlet',
    method: 'get',
    params: { teacherId: data }
  })
}

export function getMemberList(id) {
  return request({
    url: '/api/getGroupMemberServlet',
    method: 'get',
    params: { groupId: id }
  })
}

export function getStudnetList(data) {
  return request({
    url: '/api/getStudent_PracticumInfoServlet',
    method: 'get',
    params: { practId: data.practId }
  })
}

export function getGroupList(id) {
  return request({
    url: '/api/getGroupInfoByteacherIdServlet',
    method: 'get',
    params: { teacherId: id }
  })
}

export function getGroupDetail(id) {
  return request({
    url: '/api/getGroupInfoBygroupIdServlet',
    method: 'get',
    params: { groupId: id }
  })
}

export function setStudentWork(data) {
  return request({
    url: '/api/setStudentWorkInGroupServlet',
    method: 'post',
    data
  })
}

export function setPhase(data) {
  return request({
    url: '/api/setPhaseInGroupServlet',
    method: 'post',
    params: {
      groupId: data.groupId,
      phase: data.phase
    }
  })
}

export function getGroupBystudentId(stuId) {
  return request({
    url: '/api/getGroupInfoByStudentIdServlet',
    method: 'get',
    params: {
      stuId
    }
  })
}

export function getHomeListInStudent(stuId) {
  return request({
    url: '/api/getGroupInfoInSelectPractcumBystudentServlet',
    method: 'get',
    params: {
      stuId
    }
  })
}

export function deleteGroup(groupId) {
  return request({
    url: '/api/removeGroupServlet',
    method: 'post',
    params: {
      groupId
    }
  })
}

export function updateGroupName(data) {
  return request({
    url: '/api/changeGroupNameServlet',
    method: 'post',
    data
  })
}

export function updateFileHide(data) {
  return request({
    url: '/api/updateFileHideInGroupServlet',
    method: 'put',
    params: {
      id: data.id,
      fileHide: data.fileHide
    }
  })
}

export function sendNoticeForOneGroup(data) { // 发公告给某一个小组
  return request({
    url: '/api/sendNoticeForOneGroup',
    method: 'post',
    data
  })
}
