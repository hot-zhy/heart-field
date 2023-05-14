<template>
	<view>
		1243245325
		<button @click="test">hhh</button>
	</view>
</template>

<script>
	import { getConsultants } from "@/common/api.js"
	export default {
		data() {
			return {
				consultantsData: []
			}
		},
		methods: {
			
		},
		onLoad() {
			getConsultants().then((res)=>{
				console.log(res)
			})
		}
	}
</script>

<style lang="scss" scoped></style>
