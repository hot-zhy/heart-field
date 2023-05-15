<template>
  <view>
		<view :style="{background: 'url('+Pictures.IndexBackground+')'}"
		style="height: 30vh;">
		</view>
		<view class="contents"></view>
	  <TabBar activeIndex="0"></TabBar>
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue"
import TabBar from "@/components/tab-bar/tab-bar.vue"
import {Pictures} from "@/utils/url"
</script>

<style lang="scss" scoped>
	.indexBackground{
		width: 100%;
		height: 30vh;
		z-index: -1;
	}
	.contents{
		background-color: #EFEFEF;
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		position: absolute;
		top: 24vh;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
