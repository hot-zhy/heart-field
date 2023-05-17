<template>
	<view>
		<!-- 顶部图片和搜索栏 -->
		<view
			style="background-image: url(https://heart-field-1312908194.cos.ap-shanghai.myqcloud.com/img/index/index-background.png);"
			class="d-flex j-center top-image">
			<view class="d-flex j-center w-100 a-center" style="margin-top: 5vh;">
				<view class="d-flex a-center j-center">
					<view class="font-weight consultant">心灵绿野</view>
					<view class="d-flex a-center j-center mr-2">
						<image :src="plantIcon" mode="widthFix" style="width: 60rpx;height: 60rpx;"></image>
					</view>
				</view>
				<view class="d-flex border a-center j-sb search">
					<view class="d-flex a-center">
						<input ref="getValue" v-model="searchValue" class="ml-2" maxlength="20" placeholder="点击搜索咨询师"
							type="text" />
						<image class="search-icon mr-1" mode="widthFix" :src="searchIcon" @tap="onClickSearch()">
						</image>
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部选项卡 -->
		<view class="top-options">
			<view class="d-flex a-center j-sb pt-2 pb-1">
				<!-- 用户满意度 -->
				<view class="d-flex a-center j-center ml-3" @click="visitorsHappyCount">
					<view style="font-size:27rpx;" :class="sortType===0?'main-color':''">用户满意度</view>
					<view>
						<image :src="happyCountImage" mode="widthFix" class="sortIcon"></image>
					</view>
				</view>
				<!-- 帮助用户数 -->
				<view class="d-flex a-center j-center" @click="helpVisitorsCount">
					<view :class="sortType===1?'main-color':''" style="font-size: 27rpx;">帮助用户数</view>
					<view>
						<image :src="helpCountImage" mode="widthFix" class="sortIcon"></image>
					</view>
				</view>
				<!-- 是否空闲 -->
				<view class="d-flex a-center j-center" @click="isAvailable">
					<view :class="sortType===2?'main-color':''" class="mr-1" style="font-size: 27rpx;">是否空闲</view>
					<view class="mr-2">
						<checkbox :checked="isChecked" @click="avaliableChecked" class="checkbox"></checkbox>
					</view>
				</view>
			</view>
		</view>
		<template v-if="!isRefreshing">
			<view class="consultantList">
				<zero-waterfall :list="dataList">
			
				</zero-waterfall>
				<uni-load-more bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='getOneNewPageConsultants'>
				</uni-load-more>
			</view>
		</template>
	</view>
	<tab-bar activeIndex="0"></tab-bar>
</template>

<script>
	import zeroWaterfall from "@/uni_modules/zero-waterfall/components/zero-waterfall/zero-waterfall.vue";
	import tabBar from "@/components/tab-bar/tab-bar.vue";
	import uniLoadMore from "@/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue";
	import {
		getConsultants
	} from "@/common/api.js";
	import {
		Icons,
		Pictures
	} from "@/common/url.js";
	export default {
		components: {
			zeroWaterfall,
			tabBar,
			uniLoadMore
		},
		data() {
			return {
				arr: [],
				loading: false,
				dataList: [],
				loadStatus: 'more',
				page: 1,
				pageSize: 5,
				sortType: 0,
				sort: 0,
				happyCountImage: Icons.DownSort,
				helpCountImage: Icons.DownSort,
				searchIcon: Icons.Search,
				plantIcon: Icons.GreenPlant,
				happyClickCount: 0,
				helpClickCount: 0,
				isRefreshing: false
			}
		},
		onPullDownRefresh() {
			this.refresh();
		},
		onShow() {
			this.refresh();
		},
		onLoad() {
			this.page = 0
			this.getOneNewPageConsultants()
			console.log(this.dataList);
		},
		onReachBottom() {
			this.getOneNewPageConsultants()
		},
		methods: {
			refresh() {
				setTimeout(()=>{
					uni.stopPullDownRefresh();
					this.isRefreshing = false;
				},1);
				this.isRefreshing = true;
			},
			getOneNewPageConsultants() {
				getConsultants({
					page: this.page++,
					pageSize: 10,
					sortType: 0,
					sort: 0
				}).then((res) => {
					this.dataList = this.dataList.concat(res.data.data)
				});
			},
			visitorsHappyCount() {
				this.sortType = 0
				this.happyClickCount++
				this.happyCountImage = this.happyClickCount % 2 === 0 ? Icons.DownSort : Icons.UpSort
			},
			helpVisitorsCount() {
				this.sortType = 1
				this.helpClickCount++
				this.helpCountImage = this.helpClickCount % 2 === 0 ? Icons.DownSort : Icons.UpSort
			},
			isAvailable() {
				this.sortType = 2
			}
		}
	}
</script>

<style>
	body,
	page {
		background-color: #EDEDED;
	}

	.main-color {
		font-weight: 700;
		font-size: 31rpx;
	}

	.top-image {
		height: 24vh;
	}

	.top-options {
		background-color: #EDEDED;
		border-radius: 40rpx;
		margin-top: -20rpx;
		width: 100%;
	}

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
