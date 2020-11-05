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
