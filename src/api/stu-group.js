import request from '@/utils/request'

export function getStuChosenGroupInfo(data) {
  return request({
    url: '/api/getSelectedGroupInfoInPractcumByStudentServlet',
    method: 'get',
    params: {
      stuId: data.stuId,
      practId: data.practId
    }
  })
}

export function getStuNotChosenGroupInfo(data) {
  return request({
    url: '/api/getUnselectedGroupInfoInPractcumByStudentServlet',
    method: 'get',
    params: {
      stuId: data.stuId,
      practId: data.practId
    }
  })
}

export function getTeachersInfo(id) {
  return request({
    url: '/api/getTeacherInfoBypractIdServlet',
    method: 'get',
    params: { practId: id }
  })
}

export function createNewStuGroup(data) {
  return request({
    url: '/api/addGroupByStudentServlet',
    header: { 'Content-Type': 'application/json' },
    method: 'put',
    data
  })
}

export function stuEnterGroup(data) {
  return request({
    url: '/api/selectGroupByStudentServlet',
    headers: { 'Content-Type': 'text/plain' },
    method: 'put',
    data
  })
}

export function stuExitGroup(data) {
  return request({
    url: '/api/dropOupOfGroupServlet',
    method: 'post',
    params: {
      stuId: data.stuId,
      groupId: data.groupId
    }
  })
}
