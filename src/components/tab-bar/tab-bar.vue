<template>
	<view class="tabbar">
		<view class="tabbar-body">
			<view class="tabbar-item">
				<!-- 首页 -->
				<view class="tabbar-item-body" @click="switchClick(tabBarList[0],0)">
					<view class="tabbar-item-icon">
						<image :src="activeIndex == 0 ? tabBarList[0].selectedIconPath : tabBarList[0].iconPath"
							style="width: 8vw; height: 8vw;"></image>
					</view>
					<view :class="[activeIndex == 0 ? 'active' : '', 'tab-bar-text']">首页</view>
				</view>
				<!-- 咨询页 -->
				<view class="tabbar-item-body" @click="switchClick(tabBarList[1],1)">
					<view class="tabbar-item-icon">
						<image :src="activeIndex == 1 ? tabBarList[1].selectedIconPath : tabBarList[1].iconPath"
							style="width:25vw; height: 14vw;"></image>
					</view>
				</view>
				<!-- 我的 -->
				<view class="tabbar-item-body" @click="switchClick(tabBarList[2],2)">
					<view class="tabbar-item-icon">
						<image :src="activeIndex == 2 ? tabBarList[2].selectedIconPath : tabBarList[2].iconPath"
							style="width: 8vw; height: 8vw;"></image>
					</view>
					<view :class="[activeIndex == 2 ? 'active' : '', 'tab-bar-text']">我的</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['activeIndex'],
		data() {
			return {
				isFirstClick:true,
				tabBarList: [{
						iconPath: "/static/tab-bar/index.png",
						selectedIconPath: "/static/tab-bar/index_selected.png",
						pagePath: "/pages/index/index",
						text: "首页"
					},
					{
						iconPath: "/static/tab-bar/consult_selected.png",
						selectedIconPath: "/static/tab-bar/consult.png",
						pagePath: "/pages/consult/consult",
					},
					{
						iconPath: "/static/tab-bar/my.png",
						selectedIconPath: "/static/tab-bar/my_selected.png",
						pagePath: "/pages/my/my",
						text: "我的"
					}
				]
			}
		},
		watch: {
			visible: function(d) {
				// todo anything
			}
		},
		methods: {
			switchClick(data, index) {
				if (index == this.activeIndex) {
					this.isFirstClick=false
					if(this.activeIndex==0){
						console.log('点击');
						
						uni.reLaunch({
							url:'/pages/index/index'
						})
					}
					return
				}
				uni.switchTab({
					url: data.pagePath
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar {
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
	}

	.tabbar-body {
		height: 120rpx;
		display: flex;
		background: linear-gradient(to right, #ffffff, #edffeb);
		position: fixed;
		bottom: 0rpx;
		width:100%;
		left: 0rpx;
		z-index: 1001;
		padding-top: 8rpx;
		box-shadow: 0px 0px 30rpx 9rpx rgba(13, 6, 0, 0.1);

		.tabbar-item {
			flex: 1;
			padding-left: 15vw;
			padding-right: 15vw;
			display: flex;
			text-align: center;
			align-items: center;
			justify-content: space-between;

			.tabbar-item-body {}

			.tabbar-item-icon {
				display: flex;
				justify-content: center;
			}

			.tab-bar-text {
				color: #999999;
				font-size: 28rpx;
				margin-top: 9rpx;
			}

			.active {
				color: #0dc919;
			}


		}
	}
</style>
