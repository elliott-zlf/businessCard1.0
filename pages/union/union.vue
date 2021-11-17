<template>
	<view class="container">
	  <u-navbar :is-back="false" title="联盟" title-size="36.232rpx" title-color="#000000"></u-navbar>
	  <view class="content">
		   <!-- 入群二维码 -->
		<view class="pys_popup" v-if="rukuShow">
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
					src="@/static/home/lianmeng.png"
					mode="scaleToFill"
					/>
				</view>	
				<view class="erweima_box">
				  截图添加客服，加入配音师联盟
				</view>
				</view>
			</view>
		</view> 
		  <view class="bc_img"> 
            <image
			    class="lianmeng_bc"
				src="https://pyj2021.oss-cn-shanghai.aliyuncs.com/pycard/bc.png"
				mode="scaleToFill"
			/>
			<text class="bc_titel">配音师联盟</text> 
		  </view>
		  <view class="ntroduce">
			  <view class="ntroduce_item">
				  <view class="master_icon_box">
					  <image
					      class="master_icon"
						  src="@/static/lianmeng/daka.png"
						  mode="scaleToFill"
					  />
				  </view>
				  <view class="master_text_box"> 
					  <view class="title">大咖分享</view>
					  <view class="content_text">群内有从业10年以上的配音大咖、 配音导演，分享经验，答疑解惑</view>
				  </view>
			  </view>
			  <view class="ntroduce_item">
				  <view class="master_icon_box">
					  <image
					      class="master_icon"
						  style="width: 50.725rpx;height: 48.913rpx;"
						  src="@/static/lianmeng/quanyi.png"
						  mode="scaleToFill"
					  />
				  </view>
				  <view class="master_text_box"> 
					  <view class="title">维护权益</view>
					  <view class="content_text">尊重自己的价值，维护自己的权益， 共同拒绝市场上的不合理行为</view>
				  </view>
			  </view>
			  <view class="ntroduce_item">
				  <view class="master_icon_box">
					  <image
					      class="master_icon"
						  style="width: 47.101rpx;height: 41.667rpx;"
						  src="@/static/lianmeng/tonghang.png"
						  mode="scaleToFill"
					  />
				  </view>
				  <view class="master_text_box"> 
					  <view class="title">同行交流</view>
					  <view class="content_text">结交全国各地同行，互换资源， 拓展行业人脉</view>
				  </view>
			  </view>
			  <view class="ntroduce_item">
				  <view class="master_icon_box">
					  <image
					      class="master_icon"
						  style="width: 39.855rpx;height: 41.667rpx;"
						  src="@/static/lianmeng/yenei.png"
						  mode="scaleToFill"
					  />
				  </view>
				  <view class="master_text_box"> 
					  <view class="title">业内资讯</view>
					  <view class="content_text">第一时间在群内共享业内最新资讯， 帮助了解行业进展，走在行业前沿</view>
				  </view>
			  </view>
			  <view class="join_btn" @click="handleruqun">立即加入</view>
		  </view>
	  </view>
	  <view class="footer_prompt">
		   <button  class="invitationBtn" id="shou" open-type="share">	
				<view class="footer_dianzhan_icon">
					<image
						class="give_like_icon"
						src="@/static/home/dianzhanActive.png"
						mode="scaleToFill"
					/>
					<text class="give_like_text">推荐联盟给好友</text>
				</view>
				<view class="travel_to_box">
					<text class="travel_to_text"></text>
					<image
						class="travel_to_img"
						src="@/static/home/arrorRight.png"
						mode="scaleToFill"
					/>
				</view>
		   </button>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  rukuShow: false,
			};
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '联盟',
				imageUrl: '',
				complete: function(res) {
					console.log('分享成功', res)
				},
			}
		},
		methods:{
			handleruqun() {
			   this.rukuShow = true
			},
			handlecloseerweima() {
				this.rukuShow = false
			},
		}
	}
</script>

<style lang="scss">
page {
  height: 100%;
}
.container {
  height: 100%;	
  background: #F2F2F2;
}
.invitationBtn {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	 background:rgba(0,0,0,0);
	/* justify-content: space-between; */
	border: none;
	padding: 0 !important;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
}
.invitationBtn::after {
  border: none !important;
}
</style>
<style lang="scss" scoped>
.content {
  .bc_img {
	  position: relative;
	  text-align: center;
	  width: 750rpx;
	  height: 326.087rpx;
	  .bc_titel {
		  position: absolute;  
		  font-size: 72.464rpx;
		  color: #FFFFFF;
		  font-family: PingFangSC-Medium, PingFang SC;
		  left: 50%; top: 97.826rpx; 
          transform: translate(-50%, -0%);
	  }
	  .lianmeng_bc {
		position: absolute;  
		top: 0px;
		left: 0px;
		width: 750rpx;
	    height: 326.087rpx;  
	  }
    }	
	.ntroduce {
	  position: relative;	
	  margin-top: -70.652rpx;	
	  margin-left: 27.174rpx;	
	  width: 695.652rpx;
	  height: 965.58rpx;
	  background: #FFFFFF;
	  border-radius: 16px;
	  .ntroduce_item {
		 display: flex;
		 padding: 65.217rpx 65.217rpx 0 65.217rpx; 
		.master_icon_box {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 108.696rpx;
			height: 108.696rpx;
			border-radius: 54.348rpx;
			background: #FFFFFF;
			box-shadow: 0px 8px 17px 0px rgba(34, 155, 255, 0.22);
			.master_icon {
				width: 36.232rpx;
				height: 50.725rpx;
			}
		}
		.master_text_box {
			margin-left: 43.478rpx;
			width: 382.246rpx;
			.title {
				height: 45.29rpx;
				font-size: 32.609rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 45.29rpx;
			}
			.content_text {
				margin-top: 12.681rpx;
				height: 72.464rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 36.232rpx;
			}
		}
	  } 
	  .join_btn  {
		margin-left: 57.971rpx;  
		margin-top: 52.536rpx;
		width: 579.71rpx;
		height: 90.58rpx;
		text-align: center;
		line-height: 90.58rpx;
		background: #1274FF;
		box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
		border-radius: 54.348rpx;
		font-size: 32.609rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	  }
	}
}
.footer_prompt {
		padding: 0px 30.232rpx;
		position: fixed;
        bottom: 0;
		width: 750rpx;
		height: 79.71rpx;
		background: #000000;
		display: flex;
		opacity: 0.66;
        .footer_dianzhan_icon {
			width: 344.203rpx;
			height: 100%;
			display: flex;
			align-items: center;
			.give_like_icon {
				width: 32.609rpx;
				height: 32.609rpx;
			}
			.give_like_text {
                width: 202.899rpx;
				height: 36.232rpx;
				font-size: 25.362rpx;
				margin-left: 7.246rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFB70A;
				line-height: 36.232rpx;
			}
		}
		.travel_to_box {
			display: flex;
			align-items: center;
			padding-right: 5.116rpx;
			.travel_to_text {
				width: 394.928rpx;
				height: 36.232rpx;
				font-size: 25.362rpx;
				text-align: right;
				margin-right: 9.058rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 36.232rpx;
			}
			.travel_to_img {
				width: 13.428rpx;
				height: 17.935rpx;
			}
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
			top: 40%;
			left: 50%;
			transform: translate(-50%,-50%);
			min-width: 500.71rpx;
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
	// 入库
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
		}
		.erweima_icon {
			width: 491.014rpx;
			height: 491.014rpx;
			
		}
		.erweima_box {
			width: 471.014rpx;
			height: 36.232rpx;
			text-align: center;
			font-size: 25.362rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 36.232rpx;
		}
	}
</style>
