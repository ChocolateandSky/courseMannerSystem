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