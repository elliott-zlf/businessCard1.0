<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.home_musicSrc_box {
		width: 675.725rpx;
		height: 108.696rpx;
		margin-left: 38.043rpx;
		background: #000000;
		border-radius: 7.246rpx;
		opacity: 0.8;

	}
	.uni-sample-toast {
		width: 650.86rpx !important;
	}
</style>
<style lang="scss">
	@import "uview-ui/index.scss";
	.invitationBtn::after {
	padding: 0 !important;	
	border: none !important;
	}
</style>
