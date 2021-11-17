<template>
    <view class="container">
		<u-navbar
			:is-back="false"
			title="首页"
			title-size="36.232rpx"
			title-color="#FFFFFF"
			:border-bottom="false"
			:background="background"
			back-icon-color="#FFFFFF"
		></u-navbar>
		<guide v-if="guideShow"></guide>
		<view class="banner">
		  <!-- <view class="intro">
				<view class="greet">首页</view>
		  </view>	 -->
          <image
		      class="banner_bcimg"
			  src="@/static/home/homebc.png"
			  mode="scaleToFill"
		  />
		</view>
		<view class="content">
          <business-card v-show="loadshow" :cardData="profileList"></business-card>
		  <view class="footer_prompt_fenxiang" v-if="profileList.status!==0">
			<view class="footer_dianzhan_icon">
				<button class="invitationBtn sharebtn" id="xiang" open-type="share">
				<!-- <image
					class="give_like_icon"
					src="@/static/carddetails/zhuanfa.png"
					mode="scaleToFill"
				/> -->
				<text class="give_like_text">发名片</text>
				</button>
			</view>
		  </view>
		  <view class="business_data">
            <view class="business_data_title">
				<view class="title_data">我的名片数据</view>
				<!-- <view>查看</view> -->
			</view>
			<view class="data_content">
				<view class="seen_my" @click="handleCardDataDetails(0)">
                  <view class="seen_num">
					  {{profileList.passive[0] || 0}}
                      <view class="seen_badge" v-if="profileList.new[0]">{{profileList.new[0]}}</view>
				  </view>
				  <view class="seen_my_tile_box">
					  <image
					      class="seen_icon"
						  src="@/static/home/kanguo.png"
						  mode="scaleToFill"
					  />
					  <text class="seen_text">看过我的</text>
				  </view>
				</view>
				<view class="seen_my" @click="handleCardDataDetails(1)">
                  <view class="seen_num">
					   {{profileList.passive[1] || 0}}
					 <view class="seen_badge" v-if="profileList.new[1]">{{profileList.new[1]}}</view>
				  </view>
				  <view class="seen_my_tile_box">
					  <image
					      class="seen_icon"
						  src="@/static/home/dianzhan.png"
						  mode="scaleToFill"
					  />
					  <text class="seen_text">点赞我的</text>
				  </view>
				</view>
				<view class="seen_my" @click="handleCardDataDetails(2)">
                  <view class="seen_num">
					   {{profileList.passive[2] || 0}}
					   <view class="seen_badge" v-if="profileList.new[2]">{{profileList.new[2]}}</view>
				  </view>
				  <view class="seen_my_tile_box">
					  <image
					      class="seen_icon"
						  src="@/static/home/guanzhu.png"
						  mode="scaleToFill"
					  />
					  <text class="seen_text">关注我的</text>
				  </view>
				</view>
			</view>
		  </view>
		  <view class="business_data">
            <view class="business_data_title">
				<view class="title_data">我的访问数据</view>
				<!-- <view>查看</view> -->
			</view>
			<view class="data_content">
				<view class="seen_my" @click="handleChangeiVisit(0)">
                  <view class="seen_num">
					  {{profileList.active[0] || 0}}
				  </view>
				  <view class="seen_my_tile_box">
					  <image
					      class="seen_icon"
						  src="@/static/home/kanguo.png"
						  mode="scaleToFill"
					  />
					  <text class="seen_text">我看过的</text>
				  </view>
				</view>
				<view class="seen_my" @click="handleChangeiVisit(1)">
                  <view class="seen_num">
					  {{profileList.active[1] || 0}}
				  </view>
				  <view class="seen_my_tile_box">
					  <image
					      class="seen_icon"
						  src="@/static/home/dianzhan.png"
						  mode="scaleToFill"
					  />
					  <text class="seen_text">我点赞的</text>
				  </view>
				</view>
				<view class="seen_my" @click="handleChangeiVisit(2)">
                  <view class="seen_num">
					  {{profileList.active[2] || 0}}
				  </view>
				  <view class="seen_my_tile_box">
					  <image
					      class="seen_icon"
						  src="@/static/home/guanzhu.png"
						  mode="scaleToFill"
					  />
					  <text class="seen_text">我关注的</text>
				  </view>
				</view>
			</view>
		  </view>
		  <view style="height:100rpx"></view>
		</view>
		<view class="footer_prompt">
		   <button  class="invitationBtn" id="shou" open-type="share">	
				<view class="footer_dianzhan_icon">
					<image
						class="give_like_icon"
						src="@/static/home/dianzhanActive.png"
						mode="scaleToFill"
					/>
					<text class="give_like_text">推荐名片给好友</text>
				</view>
				<view class="travel_to_box">
					<text class="travel_to_text">5000+配音师/公司在用的智能名片</text>
					<image
						class="travel_to_img"
						src="@/static/home/arrorRight.png"
						mode="scaleToFill"
					/>
				</view>
		   </button>
		</view>
		<dropball></dropball>
	</view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { businessProfile } from '@/api/index'
import dropball from '@/components/dropball/dropball.vue'
import businessCard from '@/components/business_card/business_card.vue'
import sharetubiao from '@/static/home/sharetubiao.png'
import guide from '@/components/guide/guide.vue'
export default {
	components: {
		dropball,
		businessCard,
		guide
	},
	data() {
		return {
			titleList: [
				'宣传片',
				'专题片',
				'有声小说'
			],
			guideShow: false,
			background: {
				backgroundColor: '#21283B',
			},
			loadshow:false,
			profileList: {}
		};
	},
	onLoad(options) {
		uni.showLoading({
			title: '加载中'
		});
	},
	onShow(){
		this.getUnionid()
		this.guideShow = uni.getStorageSync('SHOW_TOP')
		console.log('走了没',this.guideShow)
	},
	computed: {
      ...mapState("user", ["token", "userInfo"]),
    },
	onHide() {
	//   this.musicClose()	
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {// 来自页面内分享按钮
		    console.log(res)
			if (res.target.id=='xiang') {
				return {
				title: '这是我的声音名片，点击在线试听样音，欢迎合作～',
				path: '/subpkg/pages/touristsceate/touristsceate?id='+this.token,
				imageUrl: '',
				complete: function(res) {
					console.log('分享成功', res)
				}
		       }
			} else {
				return {
					title: '配音师/公司名片工具，免费使用',
					imageUrl: sharetubiao,
					desc: '配音师/公司名片工具，免费使用',
					complete: function(res) {
						console.log('分享成功', res)
					}
		        }
			}
		}else {
           return {
				title: '配音师/公司名片工具，免费使用',
				imageUrl: sharetubiao,
				desc: '配音师/公司名片工具，免费使用',
				complete: function(res) {
					console.log('分享成功', res)
				}
		   }
		}
	},
	methods: {
		...mapActions("user", ["login"]),
		getUnionid() {
			uni.login({
				provider: "weixin",
				success: async (result) => {
				  await this.login(result.code);
				  this.businessProfile()
				},
				fail: (error) => {
				console.log("登录失败", error);
				},
			});
		},
		async businessProfile() {
			const dubbingrRes = await businessProfile({id:this.token})
			uni.hideLoading();
			this.loadshow = true
			console.log('配音师数据', dubbingrRes.data)
			this.profileList = dubbingrRes.data
			uni.setStorageSync('status', this.profileList.status)
		},
        // 音乐播放按钮
		playTheMusic(orderItem) {
		  this.audioShow = true
		  if(this.dataPlay.works[0].url === orderItem.works[0].url) {
			  this.dataList.map((item)=>{
				  if(this.dataPlay===item){
                     orderItem.playStatus = !orderItem.playStatus
				  }else {
                    item.playStatus = false
				  }
		      })
		  }else {
             this.dataList.map((item)=>{
			   item.playStatus = false
		     })
			  orderItem.playStatus = true
			  this.dataPlay = orderItem
		  }
		  setTimeout(()=>{
			this.$refs.musicAudio.preStartPlay()
		  },0)
		},
		handleChangePlay(status) {
            this.dataList.map((item)=>{
				  if(this.dataPlay===item){
                     item.playStatus = status
				  }else {
                     item.playStatus = false
				  }
		    })

		},
		handleChangeiVisit(index) {
			// uni.setStorageSync('SHOW_TOP', true)
			uni.navigateTo({ url: '/subpkg/pages/visit/visit?type='+index })	
		},
		handleCardDataDetails(index) {
            uni.navigateTo({ url: '/subpkg/pages/business/business?type='+index })
		},
		musicClose() {
          this.dataList.map((item)=>{
                item.playStatus = false
		    })
		  this.audioShow = false	
		  this.dataPlay =  {
				works: [{
                  url: ''
				}	
				]
			}
		},
	}
};
</script>
<style lang="scss">
page{
	min-height: 100%;
	// overflow: hidden;
	width: 100%;
}
.textarea-placeholder {
  font-size: 25.362rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 36.232rpx;
}
/* #ifdef MP-WEIXIN */
scroll-view ::v-deep ::-webkit-scrollbar {
   width: 0;
   height: 0;
   color: transparent
}
.u-mask {
	position: absolute !important;
}
.u-drawer {
	position: absolute !important;
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
/* #endif */
</style>
<style lang="scss" scoped>
.container {
	position: relative;
	top: -126.812rpx;
	.banner {
		position: relative;
		width: 750rpx;
		height: 503.623rpx;
		text-align: center;
		.banner_bcimg {
		  width: 750rpx;
		  height: 503.623rpx;
		}
		.intro {
			position: absolute;
			width: 100%;
			height: 54.348rpx;
			justify-content: center;
			top: calc(50rpx + var(--status-bar-height));
			left: 0rpx;
			color: #FFFFFF;
			display: flex;
			flex-direction: column;
			
			.greet {
				font-size: 32.609rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
	    }
	}
	.content {
		padding: 0 27.174rpx;
       .business_data {
		   margin-top: 36.232rpx;
		   .business_data_title {
			   display: flex;
			   justify-content:  space-between;
			   .title_data {
				    width: 173.913rpx;
					height: 39.855rpx;
					font-size: 28.986rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 39.855rpx;

			   }
		   }
		   .data_content {
			    margin-top: 18.116rpx;
			    width: 695.652rpx;
				height: 173.913rpx;
				background: #FFFFFF;
				box-shadow: 0px 3.623rpx 36.232rpx 0px rgba(0, 0, 0, 0.07);
				border-radius: 21.739rpx;
				display: flex;
				.seen_my {
				  width: 33.333%;
				  text-align: center;	
                  .seen_num {
					    position: relative;
					    margin-top: 41.667rpx;
						height: 54.348rpx;
						font-size: 39.855rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 54.348rpx;
						.seen_badge {
							display: inline-block;
							position: relative;
							top: -20px;
							width: 36.232rpx;
							height: 36.232rpx;
							text-align: center;
							line-height: 36.232rpx;
							border-radius: 18.116rpx;
							font-size: 21.739rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							background: #FF445A;
						}
				  }
				  .seen_my_tile_box {
					  display: flex;
					  margin-top: 9.058rpx;
					  align-items: center;
					  justify-content:center;
					  .seen_icon {
						  width: 23.551rpx;
						  height: 19.928rpx;
						  
					  }
					  .seen_text{
						margin-left: 5.623rpx;  
						height: 30.797rpx;
						font-size: 21.739rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 30.797rpx;
					  }
				  }
				}
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
}
.footer_prompt_fenxiang {
	    margin-top: 30rpx;
		// padding: 0px 36.232rpx;
		// position: fixed;
        // bottom: 36.232rpx;
		// width: 750rpx;
		justify-content: center;
		height: 97.826rpx;
		display: flex;
        .footer_dianzhan_icon {
			display: flex;
			align-items: center;
			width: 700rpx;
			height: 90.58rpx;
			background: #1274FF;
			box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
			border-radius: 54.348rpx;
			.invitationBtn {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				background: #1274FF;
				justify-content: center;
				border-radius: 54.348rpx;
			}
			.give_like_icon {
				width: 39.855rpx;
				height: 39.855rpx;
			}
			.give_like_text {
                width: 112px;
				height: 20px;
				font-size: 32.609rpx;
				margin-left: 7.246rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 20px;
			}
		}
		.travel_to_box {
			display: flex;
			align-items: center;
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
</style>
