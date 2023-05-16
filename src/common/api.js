import request from '@/common/request.js'


export function login(data) {
	return request({
		url: '/auth/visitor/login',
		method: 'POST',
		data
	})
}

export function getConsultants(data) {
	return request({
		url: '/consultants',
		method: 'GET',
		data,
		success(res) {
		  if (res.statusCode !== 200) {
		    reject(res);
		  }
		  const data = res.data
		  resolve(data);
		}
	})
}
