import request from '@/utils/request'

export function createCourse(data) {
  return request({
    url: '/api/addSubjectDesignByTeacher',
    headers: { 'Content-Type': 'application/json' },
    method: 'put',
    data
  })
}

export function getTeacherInfo(id) {
  return request({
    url: '/api/getTeacherInfoByMajor',
    method: 'get',
    params: {
      major: id
    }
  })
}

export function getCoursesInfo(id) {
  return request({
    url: '/api/getPracticumInfoServlet',
    method: 'get',
    params: {
      teacherId: id
    }
  })
}

export function getStuChosenCourseInfo(id) {
  return request({
    url: '/api/getSelectedPracticumInfoByStudentServlet',
    method: 'get',
    params: {
      stuId: id
    }
  })
}

export function getStuNotChosenCourseInfo(id) {
  return request({
    url: '/api/getUnselectedPracticumInfoByStudentServlet',
    method: 'get',
    params: {
      stuId: id
    }
  })
}

export function studentAddCourse(data) {
  return request({
    url: '/api/selectPracticumByStudentServlet',
    headers: { 'Content-Type': 'text/plain' },
    method: 'put',
    data
  })
}

export function studentExitCourse(data) {
  return request({
    url: '/api/dropOutOfPractcumServlet',
    method: 'post',
    params: {
      stuId: data.stuId,
      practId: data.practId
    }
  })
}

export function changeCourseInfo(data) {
  return request({
    url: '/api/changePracticumByAdmin',
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
    url: '/api/deletePracticumServlet',
    method: 'post',
    params: { practId: id }
  })
}

export function checkIsClassLeader(stuId, practId) {
  return request({
    url: '/api/judgeLeaderServlet',
    method: 'get',
    params: { stuId, practId }
  })
}

export function removeTeam(id) {
  return request({
    url: '/api/removeGroupServlet',
    method: 'post',
    params: { groupId: id }
  })
}

export function removeLeaderTeam(stuId, practId) {
  return request({
    url: '/api/removeGroupByStuIdAndPractIdServlet',
    method: 'post',
    params: { stuId, practId }
  })
}

export function getColleges() {
  return request({
    url: '/api/getCollegeInfoServlet',
    method: 'get'
  })
}

export function getMajor(collegeId) {
  return request({
    url: '/api/getMajorInfoServlet',
    method: 'get',
    params: { collegeId }
  })
}

export function putRegisterForm(data) {
  return request({
    url: '/api/registerStudentUserServlet',
    method: 'put',
    data
  })
}
