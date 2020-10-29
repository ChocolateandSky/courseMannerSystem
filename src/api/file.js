import request from '@/utils/request'

export function exportScheduleWord(data) {
  return request({
    url: '/test/exportWordServlet',
    method: 'get',
    params: {
      title: data.title,
      collegeName: data.collegeName,
      practName: data.practName,
      practNum: data.practNum,
      major: data.major,
      stuAmountMax: data.stuAmountMax,
      time: data.time,
      period: data.period,
      teacherName: data.teacherName,
      address: data.address,
      subject1: data.subject1,
      details1: data.details1,
      subject2: data.subject2,
      details2: data.details2,
      subject3: data.subject3,
      details3: data.details3,
      subject4: data.subject4,
      details4: data.details4,
      subject5: data.subject5,
      details5: data.details5,
      subject6: data.subject6,
      details6: data.details6,
      preparer: data.preparer,
      director: data.director,
      date: data.date
    }
  })
}
