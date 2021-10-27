<template>
<view>
	<!-- <u-navbar :is-back="false" title="接单群" title-size="36.232rpx" title-color="#000000"></u-navbar>
	<view class="teacherlist_box">
		<view class="pys_popup" v-if="sharePopShow">
          <view class="popup_conent">
			  <image
			      class="closeicon"
				  src="@/static/home/close.png"
				  mode="scaleToFill"
				  @click="handleCanceShare"
			  />
              <view>
			  <view style="height:17.971rpx"></view>	
              <view class="check_WeChat_test">
					申请加入
				</view>
				<view class="check_WeChat_tips">分享小程序后,即可获取入群方式</view>
				<view class="share_btn_box">
					<button
						class="cancelSharebtn"
						hover-class="button-hover"
						open-type="share"
					>
					分享好友	 
					</button>
					<button
						class="sharebtn"
						open-type="share"
						hover-class="button-hover"
					>
					分享到群 
					</button>
				</view>
			</view>
		  </view>
		</view>
		<view class="pys_popup" v-if="erweimaShow">
          <view class="popup_conent">
			  <image
			      class="closeicon"
				  src="@/static/home/close.png"
				  mode="scaleToFill"
				  @click="handlecloseerweima"
			  />
			 <view class="erweimabox">
			   <view class="erweima_iconbox">
				<image
			       class="erweima_icon"
				   src="@/static/home/jiedan.png"
				   mode="scaleToFill"
			     />
			   </view>	
			   <view class="erweima_box">
				  添加工作人员微信，资料认证后拉你进群
			   </view>
			</view>
		  </view>
		</view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs
                  activeColor="#000000"
				  bold
				  ref="tabs"
				  bg-color="#FFFFFF" 
				  inactive-color="#666666" 
				  :bar-style="barStyle" 
				  name="title" 
				  :is-scroll="false"
				  :list="list" 
				  :current="current" 
				  @change="change" 
				  font-size='28.362'
				></u-tabs>
			</view>
			<view class="notice">
              <u-notice-bar mode="vertical"  :autoplay="false" bg-color="#FFA53D" color="#FFFFFF" :list="listtext"></u-notice-bar>
			</view>
				<scroll-view scroll-y style="height:100%; width: 100%;" @scrolltolower="reachBottom" :refresher-triggered="triggered">
					<view class="page-box" v-if="defaultshow">
						<view class="teacherOrder" v-for="(orderItem, index) in dataList" :key="index">
							<view class="list_item_box">
								<view class="item_logo_box">
									<image
									class="item_logo"
									:src="orderItem.head_img"
									mode="scaleToFill"
									/>
								</view>
								<view class="item_name">
									{{orderItem.title}}
								</view>
								<view class="item_btn">
									<view v-if="orderItem.type===0" class="apply_group" @click="handleApplyGroup(orderItem.id)">申请加入</view>
									<view v-else class="reg_group" @click="handleCheckWeb">加微拉群</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="!defaultshow" class="page-box">
						<view class="defaltPage">
							<view class="defaltext">暂无匹配数据</view>
						</view>
					</view>
					<view style="height:220px"></view>
				</scroll-view>
		</view>
	</view> -->
</view>
</template>

<script>
export default {
	data() {
		return {}
	}
}
// import { logingroup } from '@/api/message'
// import { profileShare } from "@/api/index.js"
// import play from '@/static/home/play.png'
// import playActive from '@/static/home/palyActive.gif'
// import submitForm from '@/components/submitform/submitform.vue'
// import musicAudio from '@/components/audio/audioplay.vue'
// import { mapState, mapActions } from "vuex";
// import sharetubiao from '@/static/home/sharetubiao.png'
// export default {
// 	components: {
// 		submitForm,
// 		musicAudio
// 	},
// 	data() {
// 		return {
// 			listtext: [
// 					'仅限中介和配音师加群，已有5200申请加入~',
// 				],
// 			list: [
// 				{
//                   name: '发单接单',
// 				  id: 0
// 				},
// 				{
// 				  name: '学习交流',
// 				  id: 1
// 			}],	
// 			dataList: [],
// 			play: play,
// 			sharePopShow: false,
// 			playActive: playActive,
// 			swiperCurrent: 0,
// 			tabsHeight: 0,
// 			playStatus: false,
// 			erweimaShow: false,
// 			dx: 0,
// 			groupId: '',
// 			webSrc: 'https://wj.qq.com/s2/9032862/464d/',
// 			countdown:[],
// 			convertminutes: '',
//             defaultshow: true,
// 			screeningShow: false,
// 			triggered: false,
// 			current: 0,
// 			shareShow: true,
// 			dataPlay: {
// 			},
// 			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
// 		};
// 	},
// 	onLoad(options) {
// 		this.getUnionid()
// 		// this.getOrderList(0);
// 	},
// 	computed: {
//       ...mapState("user", ["token", "userInfo"]),
//     },
// 	onHide() {
// 	},
// 	onShareAppMessage(res) {
// 		this.sharePopShow = false
// 		if (res.from === 'button') {// 来自页面内分享按钮
// 		    console.log(res.target)
// 		}
// 		var str = {
// 			type: 2,
// 			group_id: this.groupId, 
// 		}
// 		profileShare(str).then((res)=>{
// 		  this.getOrderList(this.current)
// 		}).catch((err)=>{
//           console.log(err)
// 		})
// 		return {
// 			title: '接单群',
// 			imageUrl: '',
// 			complete: function(res) {
// 				console.log('分享成功', res)
// 			},
// 		}
// 	},
// 	filters: {
//       convertMinutes(time) {
// 			var time1 = Date.now();
// 			var date = new Date(time);
// 			var time2 = date.getTime();
// 			var resttime = 600-(time1-time2)/1000

// 			if (resttime) {
// 				this.countdown.push(resttime)
// 				return parseInt(resttime / 60)
// 			}else {
// 				this.countdown.push(0)
// 				return 0
// 			}

// 		},
// 	},
// 	methods: {
// 		...mapActions("user", ["login"]),
// 		getUnionid() {
// 			uni.login({
// 				provider: "weixin",
// 				success: async (result) => {
// 				  await this.login(result.code);
// 				  this.handleList()
// 				// this.getAllteacher()
// 				},
// 				fail: (error) => {
// 				console.log("登录失败", error);
// 				},
// 			});
// 		},
// 		async handleList() {
// 		  this.getOrderList(0)
// 		},
// 		// 邀请配音
// 		handleApplyGroup(id) {
// 			this.groupId = id
// 			this.sharePopShow = true
// 			// this.$refs.submitform.hadleUpdate()
// 		},
// 		reachBottom() {
// 		},
// 		// 页面数据
// 		async getOrderList(idx) {
// 			// const res = await getDemandList({
// 			// 	state: this.list[idx].id
// 			// })
// 			const res = await logingroup({type: this.list[idx].id})
// 			console.log('配音师列表数据', res.data)
// 			this.triggered = false
// 			this.dataList = res.data
// 		},
// 		handleCanceShare() {
// 			this.sharePopShow = false
// 			uni.showShareMenu({
// 			  title: '配音师资源',
// 		  })
// 		},
// 		// 跳转到问卷调查
// 		handleCheckWeb() {
//           this.erweimaShow = true
// 		//   uni.navigateTo({ url: '/pages/webview/webview?src='+ this.webSrc })
// 		},
// 		handlecloseerweima() {
// 			this.erweimaShow = false
// 		},
// 		// tab栏切换
// 		change(index) {
// 			this.current = index;
// 			this.getOrderList(index);
// 		},
// 		// 取消选择，收回弹窗
// 		handletagCancel(){
// 		  this.screeningShow = false
// 		},
// 		transition({ detail: { dx } }) {
// 			this.$refs.tabs.setDx(dx);
// 		},
// 		animationfinish({ detail: { current } }) {
// 			this.$refs.tabs.setFinishCurrent(current);
// 			this.getOrderList(current);
// 		}
// 	}
// };
</script>
<style>
page {
	min-height: 100%;
	width: 100%;
	overflow: hidden;
}
.u-tab-item {
	width: 50%;
}
.u-mask {
	position: absolute !important;
}
.u-drawer {
	position: absolute !important;
}
</style>
<style lang="scss" scoped>
.erweimabox {
	position: relative;
	.close_iconbox{
	    position: absolute;
		background: #000000;
		right: 0rpx;
		width: 50rpx;
		height: 50rpx;
		top: 0rpx;
		border-radius: 50%;
      .close_icon {
		width: 50rpx;
		height: 50rpx;
	  }
	}
	.erweima_iconbox {
		text-align: center;
	}
	.erweima_icon {
		width: 491.014rpx;
		height: 491.014rpx;
		
	}
	.erweima_box {
		width: 100%;
		height: 36.232rpx;
		text-align: center;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 36.232rpx;

	}
}
.notice {
   width: 750rpx;
   height: 72.464rpx;
}
.teacherlist_box {
	position: relative;
	.home_musicSrc_box {
		position: absolute;
		bottom: 90.58rpx;
	}
}
.u-tabs-box {
	position: relative;
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
	background: #F2F2F2;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
.teacherOrder {
  width: 695.652rpx;
  margin-left: 27.174rpx;
  .list_item_box {
	margin-top: 28.986rpx;  
	width: 695.652rpx;
	height: 159.42rpx;
	background: #FFFFFF;
	border-radius: 14.493rpx;
    display: flex;
	align-items: center;
	.item_logo_box {
		width: 90.58rpx;
		height: 90.58rpx;
		margin-left: 25.362rpx;
		margin-right: 25.362rpx;
		border-radius: 14.493rpx;
		.item_logo {
		  width: 90.58rpx;
		  height: 90.58rpx;
		}
	}
	.item_name {
		width: 407.609rpx;
		height: 79.71rpx;
		line-height: 79.71rpx;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
	.item_btn {
	   margin-right: 25.362rpx;	
      .apply_group {
		text-align: center;  
		width: 126.812rpx;
		height: 54.348rpx;
		background: #1274FF;
		box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
		border-radius: 32.609rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 54.348rpx;
	  }
	  .reg_group {
		text-align: center;  
		width: 126.812rpx;
		height: 54.348rpx;
		background: #F3F4F9;
		border-radius: 32.609rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 54.348rpx;
	  }
	}
  }

}
.check_WeChat_test {
    text-align: center;
	height: 39.855rpx;
	font-size: 28.986rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #000000;
	line-height: 39.855rpx;
}
.check_WeChat_tips {
	margin-top: 28.986rpx;
	margin-bottom: 36.232rpx;
	height: 36.232rpx;
	text-align: center;
	font-size: 25.362rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #000000;
	line-height: 36.232rpx;
}
.share_btn_box {
	display: flex;
	.cancelSharebtn {
		width: 213.768rpx;
		height: 79.71rpx;
		background: #FFFFFF;
		border-radius: 39.855rpx;
		border: 1.812rpx solid #DEDEDE;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #999999;
	}
	.cancelSharebtn::after {
	  border: none !important;
	}
	.sharebtn {
		width: 213.768rpx;
		height: 79.71rpx;
		text-align: center;
		background: #1274FF;
		box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
		border-radius: 39.855rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	.sharebtn::after {
	  border: none !important;
	}
}
.pys_popup {
    position: fixed;
    height: 100%;
    width: 100%;
    background:rgba(0,0,0,0.5);
    z-index: 999999;
	.popup_conent {
		position: absolute;
		padding: 36.232rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		min-width: 579.71rpx;
		min-height: 326.087rpx;
		background: #FFFFFF;
		border-radius: 28.986rpx;
		.closeicon {
			position: absolute;
			width: 50.725rpx;
			height: 50.725rpx;
			top: -66.232rpx;
			right: 0;
		}
	}
}
</style>
