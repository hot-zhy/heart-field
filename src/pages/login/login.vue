<template>
	<view class="content" :style="{background: 'url('+backgroundURL+')'}">
		登录页面
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backgroundURL: '/static/yz-static/background.png'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.content {
	height: 100vh;
}
</style>
