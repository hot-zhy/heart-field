<template>
  <view class="relative content" :style="'height:'+ screenHeight +'px !important;'"> 
	<image class="pic_background" mode="aspectFill" src="https://heart-field-1312908194.cos.ap-shanghai.myqcloud.com/img/my/background.png">
	</image>
	<view class="content"></view>
	<tab-bar activeIndex="2"></tab-bar>
	</view>
</template>

<script>
	import tabBar from "@/components/tab-bar/tab-bar.vue";
	export default{
		components:{
			tabBar
		},
		data(){
			return{
				screenHeight:1
			}
		},
		onLoad(){
			this.screenHeight=uni.getSystemInfoSync().windowHeight
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.relative {
		width: 100%;
		min-height: 100%;
		position: relative;
	}
	
	.pic_background {
		height: 100%;
		width: 100%;
		position: absolute;
	}
	
	.container {
		height: 100%;
		width: 100%;
		flex-direction: column;
		position: absolute;
	}
</style>
