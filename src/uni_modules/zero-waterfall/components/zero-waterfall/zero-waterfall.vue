<template>
	<view class="container">
		<view class="waterfall_left">
			<view class="waterfall_item" v-for="(item,index) in listLeft" :key="index">
				<!-- 咨询师状态 -->
				<view class="mt-1">
					<view class="state-available d-flex a-center j-end" v-if="item.consultState===0">
						<view class="red mr-1"></view>
						<view class="text-center mr-2" style="font-size: 27rpx;">空闲</view>
					</view>
					<view class="state-not-available d-flex a-center j-end" v-if="item.consultState===1">
						<view class="green mr-1"></view>
						<view class="text-center mr-2" style="font-size: 27rpx;">忙碌</view>
					</view>
				</view>
				<view class="item_img d-flex a-center j-center">
					<view class="img_size">
						<zero-lazy-load :image="item.consultantAvatar" :imgMode='imgMode' @load='considerPush'
							@error='considerPush' borderRadius="1000">
						</zero-lazy-load>
					</view>
				</view>
				<view class="item_info">
					<view class="consultantName">{{item.consultantName}}</view>
					<view class="d-flex w-100">
						<view class="accumulate text-center w-100" style="color: #464646;font-size: 28rpx;">累计助人 <text style="color: #3EBC24;">{{item.helpCount}}</text></view>
					</view>
					<view class="w-100 d-flex j-center">
						<!-- 平均评级 -->
						<uni-rate :readonly="true" :value="item.averageRank"></uni-rate>
					</view>
					<view class="briefIntroduction">{{item.briefIntroduction}}</view> 
					<view class="d-flex mx-1 flex-wrap py-1 tags">
						<view class="text-center tag" v-for="(itemtag,index) in item.expertiseTag.slice(0,2)">
							{{itemtag.tagName}}
						</view>
					</view>
					<!--  #ifdef  MP-WEIXIN -->
					<slot name="slot{{item.id}}" />
					<!--  #endif -->

					<!-- #ifndef  MP-WEIXIN -->
					<slot v-bind="item" />
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="waterfall_right">
			<view class="waterfall_item" v-for="(item,index) in listRight" :key="index">
				<!-- 咨询师状态 -->
				<view class="mt-1">
					<view class="state-available d-flex a-center j-end" v-if="item.consultState===0">
						<view class="red mr-1"></view>
						<view class="text-center mr-2" style="font-size: 27rpx;">空闲</view>
					</view>
					<view class="state-not-available d-flex a-center j-end" v-if="item.consultState===1">
						<view class="green mr-1"></view>
						<view class="text-center mr-2" style="font-size: 27rpx;">忙碌</view>
					</view>
				</view>
				<view class="item_img d-flex a-center j-center">
					<view class="img_size">
						<zero-lazy-load :image="item.consultantAvatar" :imgMode='imgMode' @load='considerPush'
							@error='considerPush' borderRadius="1000">
						</zero-lazy-load>
					</view>
				</view>
				<view class="item_info">
					<view class="consultantName">{{item.consultantName}}</view>
					<view class="d-flex w-100">
						<view class="accumulate text-center w-100" style="color: #464646;font-size: 28rpx;">累计助人 <text style="color: #3EBC24;">{{item.helpCount}}</text></view>
					</view>
					<view class="w-100 d-flex j-center">
						<!-- 平均评级 -->
						<uni-rate :readonly="true" :value="item.averageRank"></uni-rate>
					</view>
					<view class="briefIntroduction">{{item.briefIntroduction}}</view>
					<view class="d-flex mx-1 flex-wrap py-1 tags">
						<view class="text-center tag" v-for="(itemtag,index) in item.expertiseTag.slice(0,2)">
							{{itemtag.tagName}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>
<script>
	import zeroLazyLoad from "@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue";
	import uniRate from "@/uni_modules/uni-rate/components/uni-rate/uni-rate.vue";
	export default {
		components: {
			zeroLazyLoad,
			uniRate
		},
		name: "zero-waterfall",
		props: {
			// 需要在使用页面 onPageScroll 传进来
			list: {
				type: Array,
				required: true,
				default: []
			},
			// 图片裁剪模式
			imgMode: {
				type: String,
				default: 'widthFix'
			},
		},
		data() {
			return {
				listLeft: [],
				listRight: [],
				newList: [],
			}
		},
		watch: {
			list(newValue, oldValue) {
				this.newList = newValue.slice(oldValue.length);
				this.considerPush()
			},
		},
		mounted() {
			this.init()
		},

		methods: {
			// 触发重新排列
			init() {
				this.newList = [...this.list];
				this.listLeft = [];
				this.listRight = [];
				if (this.newList.length != 0) {
					this.listLeft.push(this.newList.shift()); //触发排列
					// this.listRight.push(this.newList[1]); //触发排列
				}

			},
			// 清空数据列表
			clear() {
				this.listLeft = [];
				this.listRight = [];
				// 同时清除父组件列表中的数据
				this.$emit('clear', []);
				this.newList = [];
			},

			// 计算排列
			considerPush() {
				if (this.newList.length == 0) return; //没有数据了
				let leftH = 0,
					rightH = 0; //左右高度
				var query = uni.createSelectorQuery().in(this);

				query.selectAll('.waterfall_left').boundingClientRect()
				query.selectAll('.waterfall_right').boundingClientRect()
				query.exec(res => {
					// console.log('结果',res)
					leftH = res[0].length != 0 ? res[0][0].height : 0; //防止查询不到做个处理
					rightH = res[1].length != 0 ? res[1][0].height : 0;
					// console.log('结果',leftH,rightH)
					if (leftH == rightH || leftH < rightH) {
						// 相等 || 左边小  
						this.listLeft.push(this.newList.shift());
					} else {
						// 右边小
						this.listRight.push(this.newList.shift());
					}
				});

			},

		}

	}
</script>
<style lang="scss" scoped>
	.red {
		width: 20rpx;
		height: 20rpx;
		background-color: #3EBC24;
		border-radius: 100%;
	}

	.green {
		width: 20rpx;
		height: 20rpx;
		background-color: red;
		border-radius: 100%;
	}

	.state-available {
		color: #3EBC24;
	}

	.state-not-available {
		color: red;
	}
	
	.tags {
		display: flex;
		justify-content: center;
	}

	.tag {
		font-size: 23rpx;
		color: #65BE77;
		background-color: #F0FAF2;
		border: solid #65BE77;
		border-radius: 10rpx;
		border-width: 0.1em;
		margin-top: 10rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		max-width: 150rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		/*定义块元素的宽度*/
		white-space: nowrap;
		/*内容超宽后禁止换行显示*/
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/*文字超出部分以省略号显示*/
	}

	.briefIntroduction {
		padding-right: 20rpx;
		padding-left: 20rpx;
		font-size: 27rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		margin-top: 10rpx;
		color: #777A7F;
		text-align: center;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.accumulate {
		font-size: 28rpx;
		margin-left: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.consultantName {
		text-align: center;
		font-weight: 600;
		font-size: 35rpx;
	}

	.img_size {
		width: 20vw;
		height: 20vw;
	}

	.container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: flex-start;
	}

	.waterfall_left,
	.waterfall_right {
		width: 46%;
	}

	.waterfall_item {
		width: 100%;
		margin: 10rpx 0 40rpx 0;
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;

		.item_img {
			width: 100%;

			image {
				width: 100%;
				overflow: hidden;
			}
		}

		.item_info {
			padding: 10rpx 0;

			.item_info_title {
				color: #333333;
				font-size: 32rpx;
				padding: 10rpx 0;
			}

			.item_info_note {
				color: #666666;
				font-size: 28rpx;
			}
		}

	}
</style>
