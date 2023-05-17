<template>
  <view style="background-color: #A7E5B1;">
		<button @tap="chat">聊天</button>
	  <tab-bar activeIndex="1"></tab-bar>
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
				
			}
		},
		methods:{
			chat(){
				uni.navigateTo({
					url:'/pages/TUIKit/TUIPages/TUIConversation/index'
				})
			}
		}
	}
</script>

<style>
page{
	background-color: #A7E5B1
}
</style>
