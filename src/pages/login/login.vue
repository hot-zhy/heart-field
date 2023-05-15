<template>
	<view class="content" :style="{background: 'url('+backgroundURL+')'}">
		<text class="title">{{titleText}}</text>
		<view class="info">
			<view class="info1">{{infoTexts[0]}}</view>
			<view class="info2">{{infoTexts[1]}}</view>
		</view>
		<button class="wx-login" @click="doLogin">
			<text class="wx-icon">&#xf0106;</text>
			<text>{{wxLoginText}}</text>
		</button>
		<view class="agree-privacy">
			<radio class="agree-radio" :value="agreeRedio" @click.native.prevent="agreeRedio=true"></radio>
			<text class="hint">{{agreeText[0]}}</text>
			<text class="link" @click="gotoAgreementPage('user')">{{userServiceText}}</text>
		 	<text class="hint">{{agreeText[1]}}</text>
			<text class="link" @click="gotoAgreementPage('privacy')">{{privacyText}}</text>
		</view>
	</view>
</template>

<script>
	import { login } from '@/common/api.js'
	import urlPrefix from '@/common/const.js'
	export default {
		data() {
			return {
				backgroundURL: urlPrefix + '/img/login/background.png',
				titleText: '心灵绿野',
				infoTexts: ['随心倾述', '自在畅聊'],
				wxLoginText: '微信登录',
				agreeText: ['我同意', '和'],
				userServiceText: '《用户服务协议》',
				privacyText: '《隐私条款》',
				
				agreeRedio: false,
				url: 'https://heart-field-1312908194.cos.ap-shanghai.myqcloud.com',
				code: ''
			}
		},
		methods: {
			gotoAgreementPage(type) {
				uni.navigateTo({
					url: '/pages/agreement/agreement?type=' + type
				})
			},
			doLogin() {
				if (this.agreeRedio) {
					uni.getUserProfile({
						desc: '用户信息展示',
						success: (info) => {
							uni.showLoading()
							console.log(info)
							console.log(this.code)
							login({
								'code': this.code,
								'encryptedData': info.encryptedData,
								'iv': info.iv
							}).then((res)=>{
								uni.hideLoading()
								console.log(res)
								uni.setStorage({
									key: 'user',
									data: {
										'token': res.data.accessToken,
										'id': res.data.userId,
										'info': res.data.userInfo
									},
								}).then(()=>{
									uni.reLaunch({ url: '/pages/index/index' })
								})
							})
						},
						fail: (err) => {
							uni.showToast({title: '微信登录授权失败', icon: 'none'})
						}
					})
				}
				else {
					uni.showToast({title: '请勾选同意协议后再登录', icon: 'none'})
				}	
			}
		},
		onLoad() {
			uni.login({
				provider: 'weixin',
				success: (loginRes) => {
					this.code = loginRes.code
				}
			})
		}
	}
</script>

<style>
	@font-face{
	    font-family: ZKKL;
	    src: url('https://heart-field-1312908194.cos.ap-shanghai.myqcloud.com/font/ZKKL.ttf') format('truetype');
	} 
	@font-face{
	    font-family: YSBT;
	    src: url('https://heart-field-1312908194.cos.ap-shanghai.myqcloud.com/font/YSBT.ttf') format('truetype');
	} 
	.content {
		height: 100vh; 
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.title {
		font-family: YSBT;
		color: #5F6A58;
		margin-top: 32vh;
		font-size: 13vw;
	}
	.info {
		font-family: ZKKL;
		color: #5F6A58;
		margin-top: 4vh;
		font-size: 7vw;
	}
	.info1 {
		padding-right: 30vw;
	}
	.info2 {
		padding-left: 27vw;
	}
	.wx-login {
		margin-top: 25vh;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: YSBT;
		font-size: 6vw;
		background-color: #6FBA4D;
		color: white;
		border: 0vw;
		border-radius: 3vw;
		height: 15vw;
		width: 70vw;
	}
	.wx-icon {
		font-family: iconfont;
		font-size: 10vw;
		padding-right: 5vw;
	}
	.agree-privacy {
		display: flex;
		align-items: center;
		font-family: ZKKL;
		padding-top: 5vh;
	}
	.hint {
		color: #5F6A58;
		font-size: 4vw;
	}
	.link {
		color: #11679B;
		font-size: 4vw;
	}
	.agree-radio {
		transform: scale(0.7);
	}
</style>
