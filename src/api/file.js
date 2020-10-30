// eslint-disable-next-line no-unused-vars
import request from '@/utils/request'
import axios from 'axios'
export function exportScheduleWord(data, fileName) {
  axios.get('/test/exportWordServlet', {
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
  }).then(resp => {
    const blob = new Blob([resp.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8' }) // 创建一个类文件对象：Blob对象表示一个不可变的、原始数据的类文件对象
    doDownload(blob, fileName)
  })
}

function doDownload(blob, fileName) {
  const url = window.URL.createObjectURL(blob)// URL.createObjectURL(object)表示生成一个File对象或Blob对象
  console.log(url)
  const dom = document.createElement('a')// 设置一个隐藏的a标签，href为输出流，设置download
  dom.style.display = 'none'
  dom.href = url
  dom.setAttribute('download', fileName)// 指示浏览器下载url,而不是导航到它；因此将提示用户将其保存为本地文件
  document.body.appendChild(dom)
  dom.click()
  document.body.removeChild(dom)
}

