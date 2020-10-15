import request from '@/utils/request'

export function createCourse(data) {
  return request({
    url: '/test/addSubjectDesignByTeacher',
    method: 'put',
    data
  })
}
