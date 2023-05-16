const SEVERURL ='https://mock.apifox.cn/m1/2680723-0-default'; //请求地址  
const WITHEURL = ['/visitor/auth/login', ]; // 无须TOKEN登录的白名单


function service(options = {}) {
	console.log('请求' + options.url + '中...') 
	let urlIsNoToken = WITHEURL.indexOf(options.url) !== -1
	let user = uni.getStorageSync('user'); // 存储的USER信息——token，id，info
	 
	options.url = `${SEVERURL}${options.url}`;
	options.header = {'Content-Type': 'application/json'};
	
	if (!urlIsNoToken) {   
		if (!user && !user.token) { 
			return new Promise((resolved, rejected) => {
				uni.reLaunch({url: '/pages/login/login'}).then((res)=>{
					uni.showToast({title: '未登录，请登录后访问', icon: 'none'})
					rejected({'err_msg': '用户信息不存在，跳转到登录页面'})
				})
			})
		}
		options.header.Authorization = `Bearer ${user.token}`;
	}
	
	return new Promise((resolved, rejected) => {
		options.fail = (err) => { 
			rejected(err); 
		}
		options.success = (res) => {
			if (res.statusCode == 200) {
				resolved(res); 
			}
			else { rejected(res) } 
		}
		uni.request(options);
	});
	
}
export default service ;
 