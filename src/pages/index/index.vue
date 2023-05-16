<template>
	<view>
		<!-- 顶部图片和搜索栏 -->
		<view
			style="background-image: url(https://heart-field-1312908194.cos.ap-shanghai.myqcloud.com/img/index/index-background.png);"
			class="d-flex j-center top-image">
			<view class="d-flex j-center w-100" style="margin-top: 13vh;">
				<view class="font-weight consultant">心灵绿野</view>
				<view class="d-flex border a-center j-sb search">
					<view class="d-flex a-center">
						<input ref="getValue" v-model="searchValue" class="ml-2" maxlength="20" placeholder="点击搜索咨询师"
							type="text" />
						<image class="search-icon mr-1" mode="widthFix"
							src="https://heart-field-1312908194.cos.ap-shanghai.myqcloud.com/img/index/search.png"
							@tap="onClickSearch()">
						</image>
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部选项卡 -->
		<view class="mx-4 top-options my-2">
			<view class="d-flex a-center j-sb">
				<!-- 用户满意度 -->
				<view class="d-flex a-center j-center">
					<view class="font-weight" style="font-size:27rpx;">用户满意度</view>
					<view>
						<image src="https://heart-field-1312908194.cos.ap-shanghai.myqcloud.com/img/index/down-sort.png"
							mode="widthFix" class="sortIcon"></image>
					</view>
				</view>
				<!-- 帮助用户数 -->
				<view class="d-flex a-center j-center">
					<view class="font-weight" style="font-size: 27rpx;">帮助用户数</view>
					<view>
						<image src="https://heart-field-1312908194.cos.ap-shanghai.myqcloud.com/img/index/down-sort.png"
							mode="widthFix" class="sortIcon"></image>
					</view>
				</view>
				<!-- 是否空闲 -->
				<view class="d-flex a-center j-center">
					<view class="font-weight mr-1" style="font-size: 27rpx;">是否空闲</view>
					<view>
						<checkbox :checked="isChecked" @click="avaliableChecked" class="checkbox"></checkbox>
					</view>
				</view>
			</view>
		</view>
		<view class="consultantList">
			<zero-waterfall :list="dataList">

			</zero-waterfall>
		</view>
		<uni-load-more bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='loadMore'></uni-load-more>
		<tab-bar activeIndex="0"></tab-bar>
	</view>
</template>

<script>
	import zeroWaterfall from "@/uni_modules/zero-waterfall/components/zero-waterfall/zero-waterfall.vue";
	import uniLoadMore from "@/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue";
	import tabBar from "@/components/tab-bar/tab-bar.vue";
	import {
		getConsultants
	} from "@/common/api.js"
	export default {
		components: {
			zeroWaterfall,
			uniLoadMore,
			tabBar
		},
		data() {
			return {
				arr: [],
				loading: false,
				dataList: [],
				loadStatus: 'more',
				page: 1,
				pageSize: 5,
			}
		},
		created() {
			this.dataList = this.arr.slice(0, 5)
		},
		onPullDownRefresh(){
			uni.reLaunch({
				url:'/pages/index/index'
			})
		},
		onLoad() {
			getConsultants({
				page: 1,
				pageSize: 10,
				sortType: 0,
				sort: 0
			}).then((res) => {
				for (let i = 0; i < res.data.data.length; i++) {
					this.arr.push(res.data.data[i])
				}
			});
			this.loadMore()
		},
		onReachBottom() {
			if (this.dataList.length >= this.arr.length) {
				this.loadingStatus = 'noMore'
			} else {
				this.loadStatus = 'more';
				setTimeout(() => {
					this.loadMore();
					this.loadStatus = 'loadmore';
				}, 1000)
			}
		},
		methods: {
			// 模拟数据加载
			loadMore() {
				this.loadStatus = 'loading';
				this.page++
				this.dataList = this.dataList.concat(this.arr.slice(this.dataList.length, this.page * this.pageSize))
			},

		}
	}
</script>

<style>
	body,page{
		background-color: #EDEDED;
	}
	.top-image {
		height: 24vh;
	}

	.top-options {}

	.consultantList {
		margin-bottom: 100rpx;
	}

	.checkbox {}

	.sortIcon {
		width: 7vw;
		height: 7vw;
	}

	.indexBackground {
		width: 100%;
		height: 30vh;
		z-index: -1;
	}

	.contents {
		background-color: #EFEFEF;
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		position: absolute;
		top: 24vh;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.consultant {
		width: 30vw;
		font-size: 6vw;
	}

	.search {
		border-radius: 30rpx;
		width: 55vw;
		height: 8.5vw;
		border-width: 3.6rpx;
	}
	.search-icon {
		width: 70rpx;
		height: 70rpx;
	}
</style>
