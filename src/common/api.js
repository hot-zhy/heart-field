import request from '@/common/request.js'


export function login(data) {
  return request({url: '/auth/wx/login', method: 'POST', data})
}

export function getConsultants(data) {
  return request({url: '/consultants', method: 'GET', data})
}