<template>
	<view class="content" :style="{background: 'url('+backgroundURL+')'}">
		<text class="title">{{titleText}}</text>
		<view class="info">
			<view class="info1">{{infoTexts[0]}}</view>
			<view class="info2">{{infoTexts[1]}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backgroundURL: '/static/img/login/background.png',
				titleText: '心灵绿野',
				infoTexts: ['随心倾述', '自在畅聊']
			}
		},
		methods: {
		}
	}
</script>

<style>
	@import '@/static/font/ZKKL.css';
	@import '@/static/font/YSBT.css';
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
		height: 100vw;
	}
	.info1 {
		padding-right: 30vw;
	}
	.info2 {
		padding-left: 30vw;
	}
</style>
