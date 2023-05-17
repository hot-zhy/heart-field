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
				<view class="d-flex a-center j-sb search">
					<view class="d-flex a-center">
						<input ref="getValue" v-model="searchValue" class="ml-2" maxlength="20" placeholder="点击搜索咨询师" style="font-size: 4vw;font-family: ALIPH;"
							type="search" @confirm="onKeyBoardSearch" />
						<image class="search-icon mr-1" mode="widthFix" :src="searchIcon" @tap="onClickSearch()">
						</image>
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部选项卡 -->
		<view class="top-options">
			<view class="d-flex a-center j-sb pt-2 pb-2 pr-2 pl-2">
				<!-- 用户满意度 -->
				<view class="d-flex a-center j-center ml-3" @click="visitorsHappyCount">
					<view :class="sortType===0?'main-font':'normal-font'">用户满意度</view>
					<image :src="happyCountImage" mode="widthFix" class="sortIcon"></image>
				</view>
				<!-- 帮助用户数 -->
				<view class="d-flex a-center j-center" @click="helpVisitorsCount">
					<view :class="sortType===1?'main-font':'normal-font'">帮助用户数</view>
					<view>
						<image :src="helpCountImage" mode="widthFix" class="sortIcon"></image>
					</view>
				</view>
				<!-- 是否空闲 -->
				<view class="d-flex a-center j-center" @click="isAvailable">
					<view :class="sortType===2?'main-font':'normal-font'" class="mr-1">是否空闲</view>
					<view class="mr-2">
						<checkbox :checked="count.isChecked" @click="avaliableChecked" class="checkbox" style="transform: scale(0.7)"></checkbox>
					</view>
				</view>
			</view>
		</view>
		<template v-if="!isRefreshing">
			<view class="consultantList">
				<zero-waterfall :list="dataList"></zero-waterfall>
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
				count: {
					isChecked: false,
					happyClickCount: 0,
					helpClickCount: 0
				},
				isRefreshing: false,
				searchValue: ""
			}
		},
		onPullDownRefresh() {
			this.refresh();
		},
		onLoad() {
			this.page = 0
			uni.showLoading({
				'title': '正在加载中'
			})
			this.getOneNewPageConsultants()
			setTimeout(() => {
				uni.hideLoading()
			}, 1600);
		},
		onReachBottom() {
			this.getOneNewPageConsultants()
		},
		
		methods: {
			// 搜索咨询师
			onClickSearch() {
				console.log(this.searchValue)
				this.page = 0
				this.refresh()
				this.getOneNewPageConsultants()
			},
			// 键盘搜索回车
			onKeyBoardSearch(){
				this.onClickSearch()
			},
			// 刷新列表数据
			refresh() {
				uni.showLoading({
					'title': '正在加载中'
				})
				setTimeout(() => {
					uni.stopPullDownRefresh();
					uni.hideLoading()
					this.isRefreshing = false;
				}, 1000);
				this.isRefreshing = true;
			},
			// 获取新一页咨询师列表
			getOneNewPageConsultants() {
				getConsultants({
					page: this.page++,
					pageSize: 5,
					sortType: this.sortType,
					sort: this.sort,
					searchValue: this.searchValue
				}).then((res) => {
					this.dataList = this.dataList.concat(res.data.data)
				});
			},
			visitorsHappyCount() {
				this.count.happyClickCount++
				this.updateSort(0)
			},
			helpVisitorsCount() {
				this.count.helpClickCount++
				this.updateSort(1)
			},
			isAvailable() {
				this.count.isChecked = !this.count.isChecked
				this.updateSort(2)
			},
			updateSort(type) {
				this.sortType = type
				const {
					happyClickCount,
					helpClickCount,
					isChecked
				} = this.count
				if (type === 0) {
					this.happyCountImage = happyClickCount % 2 === 0 ? Icons.DownSort : Icons.UpSort
					this.sort = happyClickCount % 2 === 0 ? 0 : 1
					console.log('用户满意度' + this.sort)
				} else if (type === 1) {
					this.helpCountImage = helpClickCount % 2 === 0 ? Icons.DownSort : Icons.UpSort
					this.sort = helpClickCount % 2 === 0 ? 0 : 1
					console.log('帮助用户数' + this.sort)
				} else {
					this.sort = isChecked === false ? 0 : 1
					console.log('是否空闲' + this.sort);
				}
				this.page=0
				// 更新数据
				this.getOneNewPageConsultants()
				this.refresh()
			}
		}
	}
</script>

<style>
	body,
	page {
		background-color: #EDEDED;
	}

	.main-font {
		font-weight: 700;
		font-size: 30rpx;
		color: #2d2725;
	}

	.normal-font {
		font-weight: 600;
		font-size: 30rpx;
		color: #464646;
	}

	.top-image {
		height: 24vh;
	}

	.top-options {
		background-color: #EDEDED;
		border-radius: 40rpx;
		margin-top: -20rpx;
		padding-top: 10rpx;
		width: 100%;
		margin-bottom: 10rpx;
	}

	.consultantList {
		margin-bottom: 200rpx;
		color: #2d2725;
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
		color: #443c39;
		font-weight: 700;
	}

	.search {
		border: 10rpx solid;
		border-radius: 20rpx;
		width: 55vw;
		height: 8.5vw;
		border-width: 3.6rpx;
		border-color: darkslategrey;
	}

	.search-icon {
		width: 8vw;
		height: 8vw;
	}
	
	. {
		color: #444444;
	}
</style>
