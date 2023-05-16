import request from '@/common/request.js'


export function login(data) {
	return request({
		url: '/visitor/auth/login',
		method: 'POST',
		data
	})
}

export function getConsultants(data) {
	return request({
		url: '/consultants',
		method: 'GET',
		data
	})
}
