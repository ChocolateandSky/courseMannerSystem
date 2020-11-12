import request from '@/utils/request'

export function createCourse(data) {
  return request({
    url: '/test/addSubjectDesignByTeacher',
    headers: { 'Content-Type': 'application/json' },
    method: 'put',
    data
  })
}

export function getTeacherInfo(id) {
  return request({
    url: '/test/getTeacherInfoByMajor',
    method: 'get',
    params: {
      major: id
    }
  })
}

export function getCoursesInfo(id) {
  return request({
    url: '/test/getPracticumInfoServlet',
    method: 'get',
    params: {
      teacherId: id
    }
  })
}

export function getStuChosenCourseInfo(id) {
  return request({
    url: '/test/getSelectedPracticumInfoByStudentServlet',
    method: 'get',
    params: {
      stuId: id
    }
  })
}

export function getStuNotChosenCourseInfo(id) {
  return request({
    url: '/test/getUnselectedPracticumInfoByStudentServlet',
    method: 'get',
    params: {
      stuId: id
    }
  })
}

export function studentAddCourse(data) {
  return request({
    url: '/test/selectPracticumByStudentServlet',
    headers: { 'Content-Type': 'text/plain' },
    method: 'put',
    data
  })
}

export function studentExitCourse(data) {
  return request({
    url: '/test/dropOutOfPractcumServlet',
    method: 'post',
    params: {
      stuId: data.stuId,
      practId: data.practId
    }
  })
}

export function changeCourseInfo(data) {
  return request({
    url: '/test/changePracticumByAdmin',
    method: 'post',
    params: {
      practName: data.practName,
      practId: data.practId,
      stuAmountMax: data.stuAmountMax,
      beginTime: data.beginTime,
      endTime: data.endTime,
      introduction: data.introduction
    }
  })
}

export function deleteCourse(id) {
  return request({
    url: 'test/deletePracticumServlet',
    method: 'post',
    params: { practId: id }
  })
}

export function checkIsClassLeader(stuId, practId) {
  return request({
    url: '/test/judgeLeaderServlet',
    method: 'get',
    params: { stuId, practId }
  })
}

export function removeTeam(id) {
  return request({
    url: '/test/removeGroupServlet',
    method: 'post',
    params: { groupId: id }
  })
}

export function removeLeaderTeam(stuId, practId) {
  return request({
    url: '/test/removeGroupByStuIdAndPractIdServlet',
    method: 'post',
    params: { stuId, practId }
  })
}
