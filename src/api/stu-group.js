import request from '@/utils/request'

export function getStuChosenGroupInfo(data) {
  return request({
    url: '/test/getSelectedGroupInfoInPractcumByStudentServlet',
    method: 'get',
    params: {
      stuId: data.stuId,
      practId: data.practId
    }
  })
}

export function getStuNotChosenGroupInfo(data) {
  return request({
    url: '/test/getUnselectedGroupInfoInPractcumByStudentServlet',
    method: 'get',
    params: {
      stuId: data.stuId,
      practId: data.practId
    }
  })
}

export function getTeachersInfo(id) {
  return request({
    url: '/test/getTeacherInfoBypractIdServlet',
    method: 'get',
    params: { practId: id }
  })
}

export function createNewStuGroup(data) {
  return request({
    url: '/test/addGroupByStudentServlet',
    header: { 'Content-Type': 'application/json' },
    method: 'put',
    data
  })
}

export function stuEnterGroup(data) {
  return request({
    url: '/test/selectGroupByStudentServlet',
    headers: { 'Content-Type': 'text/plain' },
    method: 'put',
    data
  })
}

export function stuExitGroup(data) {
  return request({
    url: '/test/dropOupOfGroupServlet',
    method: 'post',
    params: {
      stuId: data.stuId,
      groupId: data.groupId
    }
  })
}
