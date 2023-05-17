<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  }
};
</script>

<style>
@import "@/common/third-party/zcm-main.css";
@font-face{
	font-family: iconfont;
	src: url('https://heart-field-1312908194.cos.ap-shanghai.myqcloud.com/icon/iconfont.ttf') format('truetype');
} 
@font-face{
	font-family:AlibabaPuHuiTi-2-55-Regular;
	src: url('https://heart-field-1312908194.cos.ap-shanghai.myqcloud.com/font/AlibabaPuHuiTi-2-55-Regular.ttf') format('truetype');
}
page,body{
	font-family: AlibabaPuHuiTi-2-55-Regular;
}
</style>
