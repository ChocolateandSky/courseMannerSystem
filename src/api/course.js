import request from '@/utils/request'

export function createCourse(data) {
  return request({
    url: '/test/addSubjectDesignByTeacher',
    headers: { 'Content-Type': 'text/plain' },
    method: 'put',
    data
  })
}
