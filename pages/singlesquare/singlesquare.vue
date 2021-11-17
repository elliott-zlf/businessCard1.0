<template>
	<view class="container">
		<u-navbar :is-back="false" title="接单广场" title-size="36.232rpx" :border-bottom="true" title-color="#000000"></u-navbar>
		<view class="content">
			<!-- 入库二维码 -->
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
					src="@/static/home/ruku.png"
					mode="scaleToFill"
					/>
				</view>	
				<view class="erweima_box">
				 截图扫码进群，选中后通知试音
				</view>
				</view>
			</view>
		</view>
		<view class="pys_popup" v-if="notputShow">
			<view class="popup_conent">
				<image
					class="closeicon"
					src="@/static/home/close.png"
					mode="scaleToFill"
					@click="handlecloseerweima"
				/>
				<view>
				<view style="height:17.971rpx"></view>	
				<view class="check_WeChat_test">
					申请入库
				</view>
				<view class="check_WeChat_tips">创建名片后即可免费加入中国配音师库</view>
				<view class="share_btn_box">
						<button
							class="cancelSharebtn"
							hover-class="button-hover"
							@click="handlecloseerweima"
						>
						取消	 
						</button>
						<button
							class="sharebtn"
							@click="handlechangehome"
						>
						去创建/上传
						</button>
				</view>
				</view>
			</view>
		</view>
			<u-tabs class="dd" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
			<view class="notice">
              <u-notice-bar mode="vertical"  :autoplay="true" :duration="3000" bg-color="#FFA53D" color="#FFFFFF" font-size="25.362rpx" :list="listtext"></u-notice-bar>
			</view>
			<scroll-view
			  class="order_list_view"
			  scroll-y
			  @refresherrefresh="handlere()"
			  :refresher-enabled="true"
			  :scroll-top="scrollInto"
			  @scroll="tabScoll"
			  @scrolltolower="reachBottom"
			  :refresher-triggered="triggered"
			>
				<view v-for="(item,index) in orderList" :key="index" class="order_list" @click="handleChangeOrderdetails(item)">
                    <view class="order_title_box">
						<view class="orderimg_box">
                          <image
						      class="headPortrait"
							  :src="item.avatar"
							  mode="scaleToFill"
							  @click.stop="handleVisitorsJump(item)"
						  />
						</view>
						<view class="nickname_box">
						  <view class="vio_name">
                             <view class="nickname u-line-1">
							   {{item.nickname}}
							</view>
							<image
							    v-if="item.type===1"
							    class="zhaoshiyin"
								src="@/static/home2/zhaoshiyin.png"
								mode="scaleToFill"
							/>
						  </view>
						   <view class="creation_date">{{item.create_time}}</view>
						</view>
						<view class="budget_box">
                            <text v-if="item.total != ''" class="price">￥{{item.total}}</text>
							<text v-if="item.total == ''" class="price">￥私聊</text>
						</view>
					</view>
					<view class="order-content">
                      <view class="order-label_item">
						  <view class="order_label">标题</view>
						  <view class="order_text u-line-1">{{item.title}}</view>
					  </view>
					   <view class="order-label_item">
						  <view class="order_label">描述</view>
						  <view class="order_text u-line-1">{{item.content}}</view>
					  </view>
					</view>
					<view class="bottom_line"></view>
					<view class="voice_box">
						<view class="delivery_number" v-if="item.cate===0">
							<text class="num" v-if="item.type===1">{{item.teacher_count}}人已试音</text>
							<text class="num" v-if="item.type!==1">{{item.teacher_count}}人已报名</text>
						</view>
						<view class="delivery_number" v-if="item.cate===1">
							<text class="num" v-if="item.type===1">我已试音</text>
							<text class="num" v-if="item.type!==1">我已报名</text>
						</view>
						<view class="countdown">
                            <text v-if="item.status===0" class="countdown_num">进行中</text>
							<!-- <u-count-down v-if="item.status===0" class="countdown_num" :timestamp="item.end_time" font-size = '25.362' separator-size="25.362" separator-color="#FFA006" separator="zh" color='#FFA006'></u-count-down> -->
							<text v-if="item.status===1" class="end_text">已结束</text>
						</view>
					</view>
				</view>
				<view v-if="has_next===false" class="defaltext">没有更多了</view>
				<u-loadmore v-if="has_next===true" style="margin-top: 30px;" status="loading" bgColor="#f2f2f2"></u-loadmore>
				<view v-if="defaultshow" class="page_box">
					<view class="defaltPage">
						<view class="defaltext">暂无匹配数据</view>
					</view>
				</view>
				<view style="height:350rpx"></view>
			</scroll-view>
		</view>
		 <cardball title="发布需求" @handleChange="handleguwen">
			 <image
		      slot="icon"
			  src="@/static/home2/guwen.png"
			  mode="scaleToFill"
		    />
         </cardball>
	</view>
</template>

<script>
import { orderList,delivery } from '@/api/myneeds.js'
import { mapState, mapActions } from "vuex";
	export default {
		data() {
			return {
				list: [{
					name: '全部需求'
				}, {
					name: '我发布的'
				}, {
					name: '我参与的'
				}],
				listtext: [
					'免费找试音、找搭档、找方言、找工作、转让设备等',
					'免费匹配，自主对接，不收取任何佣金',
					'拒绝低价单和虚假需求，投诉举报后，永久封号'
				],
				current: 0,
				orderPar: {
				  status: 0,
				  page: 1,
				  size: 10
				},
				scrollInto: 0,
                scrollTop: 0,
				has_next: '',
				defaultshow: false,
				orderList: [],
				rukuShow: false,
				triggered:false,
				notputShow: false
			}
		},
		computed: {
		  ...mapState("user", ["token", "userInfo","profileStatus"]),
		},
		 onShareAppMessage(res) {
			if (res.from === "button") {
			// 来自页面内分享按钮
			console.log(res.target);
			}
			return {
			imageUrl: "",
			complete: function (res) {
				console.log("分享成功", res);
			},
			};
		},
		onLoad(options) {
		   console.log('跳转回来刷新页面', options)	
		   this.getUnionid()	
		},
		methods: {
			...mapActions("user", ["login"]),
			getUnionid() {
				uni.login({
					provider: "weixin",
					success: async (result) => {
					await this.login(result.code);
					this.getOrderList()
					},
					fail: (error) => {
					  console.log("登录失败", error);
					},
				});
			},
			handlere() {
			  this.triggered = true
			  this.getOrderList()
			  this._freshing = true
			},
			getOrderList() {
			    this.orderPar.page=1
                orderList(this.orderPar).then((res)=>{
                console.log('订单详情',res)
				this.orderList = res.data
				this.scrollInto = this.scrollTop;
				this._freshing = false
				this.triggered = false
				if (this.orderList.length === 0) {
					this.has_next = "";
					this.defaultshow = true;
				} else {
					this.has_next = res.has_next;
					this.defaultshow = false;
				}
				setTimeout(() => {
					this.scrollInto = 0;
				}, 0);
			  })
			},
			handlebuSinessCard(id) {
				delivery({id:id}).then((res)=>{
					console.log('投递名片',res)
				    uni.showToast({
					  title: '报名成功，请先进群，选中后再试音',
					  icon: 'none'
			        }) 
					this.getOrderList()
				}).catch((err)=>{
					console.log('失败信息',err)
					 uni.showToast({
					  title: err.errmsg,
					  icon: 'none',
					  duration: 3000
			        }) 
				})
			},
			// 关闭弹窗事件
			handlecloseerweima() {
			  this.notputShow = false
			},
			handleguwen() {
				console.log('加载中',this.profileStatus)
				if (this.profileStatus!==0) {
					uni.setStorageSync('avatarUrl', '')
					uni.setStorageSync('nickName', '')
					uni.navigateTo({ url: '/subpkg/pages/neworder/neworder' })
				} else {
					uni.showLoading({
					title: "加载中",
					});
					uni.getUserProfile({
						desc: "登录后可发布需求",
						success: async (obj) => {
						uni.showToast({
							title: "授权成功",
							icon: "default",
							mask: true,
						});
						console.log('获取到的头像和昵称', obj)
						uni.setStorageSync('avatarUrl', obj.userInfo.avatarUrl)
						uni.setStorageSync('nickName', obj.userInfo.nickName)
						uni.navigateTo({ url: '/subpkg/pages/neworder/neworder' })
						},
						fail: () => {
						uni.showToast({
							title: "授权已取消",
							icon: "default",
							mask: true,
						});
						},
						complete: () => {
						// 隐藏loading
						uni.hideLoading();
						},
					}); 
				}
			    // uni.navigateTo({ url: '/subpkg/pages/neworder/neworder' })
			},
			async reachBottom() {
				if (this.has_next) {
					this.orderPar.page = this.orderPar.page + 1;
					const res = await orderList(this.orderPar);
					console.log("res新数据", res);
					this.triggered = false;
					this.has_next = res.has_next;
					res.data.map((item) => {
					this.orderList.push(item);
					});
					if (this.orderList.length === 0) {
					  this.defaultshow = true;
					  this.has_next = "";
					} else {
					  this.defaultshow = false;
					}
				} else {
				}
			},
			tabScoll(e) {
			  this.scrollTop = e.detail.scrollTop;
			},
			change(index) {
				this.current = index;
				this.orderPar.status = index
				this.getOrderList()
			},
			// 跳转配音师名片
			handleVisitorsJump(orderItem) {
				console.log('配音师列表',orderItem)
				uni.setStorageSync('current', '')
				uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist?id='+orderItem.teacher_id })
			},
			handleChangeOrderdetails(item) {
				if (item.type === 1) {
				   uni.navigateTo({ url: '/subpkg/pages/dubbingdetails/dubbingdetails?id='+item.id })
				} else {
				   uni.navigateTo({ url: '/subpkg/pages/orderdetails/orderdetails?id='+item.id })
				}
			},

		}
	}
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
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
  height: 100%;
  background: #F2F2F2;
  display: flex;
  flex-direction: column;
  .order_list_view {
	width: 100%;  
	height: 100%;
	.order_list {
		margin-top: 28.986rpx;
		margin-left: 27.174rpx;
		width: 695.652rpx;
		height: 369.565rpx;
		background: #FFFFFF;
		border-radius: 14.493rpx;
		.order_title_box {
			display: flex;
			align-items: center;
			padding:36.232rpx 34.42rpx 9rpx 34.42rpx;
			.orderimg_box {
				display: flex;
				align-items: center;
				.headPortrait {
					width: 72.464rpx;
					height: 72.464rpx;
					border-radius: 36.232rpx;
				}
			}
			.nickname_box {
			   width: 326.087rpx;
			   margin-left: 12.681rpx;
				.vio_name {
					display: flex;
			        align-content: center;
					.zhaoshiyin {
					  width: 72.464rpx;
					  height: 39.855rpx;
				    }
				    .nickname {
						max-width: 200.072rpx;
						height: 36.232rpx;
						font-size: 25.362rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 600;
						color: #000000;
						line-height: 36.232rpx;
					}
			   }
				.creation_date {
					height: 36.232rpx;
					font-size: 25.362rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 36.232rpx;
				}
			}
			.budget_box {
				text-align: right;
				width: 271.739rpx;
				// display: flex;
				// align-items: center;
               .title {
					height: 30.797rpx;
					font-size: 25.362rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 30.797rpx;
			   }
			   .price {
					height: 54.348rpx;
					font-size: 27.174rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 54.348rpx;
			   }
			}
		}
		.bottom_line {
          border-bottom: #F6F7FA solid 1px;	
		  margin: 32.609rpx 0;
		}
		.order-content {
		  padding:0rpx 34.42rpx;
		  .order-label_item {
			  margin-top: 27.174rpx;
			  display: flex;
			  align-items: center;
			  .order_label {
				width: 72.464rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			  }
			  .order_text {
				width: 550rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
			  }
			  .order_text_tag {
				width: 550rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				display: flex; 
                .tags {
					padding: 0 14.493rpx;
					margin-right: 14.493rpx;
					height: 43.478rpx;
					background: #F2F2F2;
					border-radius: 3.623rpx;
					font-size: 25.362rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 43.478rpx;
			    }
			  }
		  }
		}
		.delivery_btn_box {
		  margin-top: 48.913rpx;
		  margin-left: 57.971rpx;	
		  .delivery_btn {
			text-align: center;  
			width: 579.71rpx;
			height: 90.58rpx;
			background: #1274FF;
			box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
			border-radius: 30px;
			font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 90.58rpx;
		  }
		  .end_btn {
			text-align: center;  
			width: 579.71rpx;
			height: 90.58rpx;
			background: #EEEEEE;
			border-radius: 30px;
			font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #999999;
			line-height: 90.58rpx;
		  }
		}
		.voice_box {
			margin-top: 30.797rpx;
			display: flex;
			align-items: center;
			justify-content: space-between ;
			padding: 0 36.232rpx;
			.delivery_number {
			  display: flex;
			  align-items: center;
			  .num {
				height: 30.797rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #CCCCCC;
				line-height: 30.797rpx;
			  }
			}
			.countdown_num {
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFA006;
				line-height: 36.232rpx;
			}
			.end_text {
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #CCCCCC;
				line-height: 36.232rpx;
			}

		}
	}
 }
}
.defaltext {
	margin-top: 30rpx;
	text-align: center;
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #717171;
	line-height: 16px;
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
		margin-left: 36.232rpx;
		width: 213.768rpx;
		height: 79.71rpx;
		background:#1274FF;
		border-radius: 39.855rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 79.71rpx;
	}
	.sharebtn::after {
	  border: none !important;
	}
    }
</style>
