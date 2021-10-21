<template>
<view>
	<view class="business_card" v-if="nlogInShow">
		<view class="head_portrait">
			<view class="head_portraitimg_box">
			<image
				class="head_portraitimg"
				:src="cardData.avatar"
				mode="scaleToFill"
			/>
			<image
			    v-if="cardData.sex===1"
				class="sex_icon"
				:src="nan"
				mode="scaleToFill"
			/>
			<image
			    v-else-if="cardData.sex===2"
				class="sex_icon"
				:src="woman"
				mode="scaleToFill"
			/>
			<image
			    v-else
				class="sex_icon"
				:src="qi"
				mode="scaleToFill"
			/>
			</view>
		</view>	
		<view class="nick_namebox">
			<view class="nick_name">       
				{{cardData.nickname}}
				<view class="name_certified" v-if="cardData.status===2">已实名</view>
			</view>
		</view>
		<view class="personalFile" @click="handleTravelTo">
			<view class="personal_list">
				<view class="personal_title">擅长</view>
				<view class="personal_content">
				    <view
					  v-for="(item,index) in cardData.theme"
				      :key="index"
					>
                      <text>{{item.value}}</text>
					  <view v-if="cardData.theme.length-1 !== index" class="divider_line"></view>
					</view>
				</view>
			</view>
			<view class="personal_list">
				<view class="personal_title">风格</view>
				<view class="personal_content">
				    <view  
				      v-for="(item,index) in cardData.style"
				      :key="index">
                       <text>{{item.value}}</text>
					  <view v-if="cardData.style.length-1 !== index" class="divider_line"></view>
					</view> 
				</view>
			</view>
			<view class="personal_list">
				<view class="personal_title">地区</view>
				<view class="personal_content">
					<text>{{cardData.district[0].name}}</text>
					<view class="divider_line"></view>
					<text>{{cardData.district[1].name}}</text>
				</view>
			</view>
			<view class="personal_list">
				<view class="personal_title">微信</view>
				<view class="personal_content">
					<text>{{cardData.wechat_number}}</text>
				</view>
			</view>
			<image
				class="travel_to"
				src="@/static/home/travelTo.png"
				mode="scaleToFill"
			/>
		</view>
	</view>
	<view class="nloggedin" v-if="!nlogInShow">
		<view class="head_portrait">
			<view class="head_portraitimg_box">
			<image
				class="head_portraitimg"
				src="@/static/home2/defaultAvatar.png"
				mode="scaleToFill"
			/>
			</view>
		</view>	
		<view class="nick_namebox">
			<view class="nick_name">       
				配音师/公司名片工具
			</view>
		</view>
		<view class="personalFile">
			<view class="item_list_box">
               <view class="item_list">
					<image
						class="item_icon"
						src="@/static/home2/mian.png"
						mode="scaleToFill"
					/>
					<view class="item_title">免费使用</view>
				</view>
				<view class="item_list">
					<image
						class="item_icon"
						src="@/static/home2/tuiguang.png"
						mode="scaleToFill"
					/>
					<view class="item_title">推广高效</view>
				</view>
				<view class="item_list">
					<image
						class="item_icon"
						src="@/static/home2/huoke.png"
						mode="scaleToFill"
					/>
					<view class="item_title">获客倍增</view>
				</view>
				<view class="item_list">
					<image
						class="item_icon"
						src="@/static/home2/jiedan.png"
						mode="scaleToFill"
					/>
					<view class="item_title">接单倍增</view>
				</view>
			</view>
			<view class="checkcard_box" @click="handleBelowColumn">
				<text class="checkcard_text">查看效果示例</text>
				<image
				    class="checkcardicon"
					src="@/static/home/jumparror.png"
					mode="scaleToFill"
				/>
			</view>
			<view class="createCard">
				<view class="createCard_btn" @click="handleCreatecard">立即创建我的名片</view>
			</view>
		</view>
	</view>
</view>	
</template>

<script>
import nan from '@/static/teacherlist/manicon.png'
import woman from '@/static/teacherlist/woman.png'
import qi from '@/static/teacherlist/qi.png'
import { mapState, mapActions } from "vuex";
	export default {
		props: {
			cardData: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		name:"business_card",
		data() {
			return {
				nlogInShow: false,
				nan: nan,
				woman: woman,
				qi: qi
			};
		},
		watch: {
			cardData: {
				handler(val) {
				  this.whetherToLogin()
				},
				deep: true
			}
		},
		created() {
		},
		computed: {
		  ...mapState("user", ["token", "userInfo"]),
		},
		methods: {
			whetherToLogin() {
			  if(this.cardData.status===0) {
                this.nlogInShow = false
			  }else {
				this.nlogInShow = true  
			  }	
			//   console.log('等于多少',this.cardData)
			},
			// 跳转名片详情页
			handleTravelTo() {
			console.log('跳转到配音师名片页面')
			//   uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist' })	
			uni.navigateTo({ url: '/subpkg/pages/carddetails/carddetails?id='+ this.token})
			},
			handleCreatecard() {
			  uni.navigateTo({ url: '/subpkg/pages/createcard/createcard?type=1' })	
			},
			handleBelowColumn(item) {
			  console.log('跳转到配音师名片页面')
			  //   uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist' })	
			  uni.navigateTo({ url: '/subpkg/pages/samplepage/samplepage?id=1' })
			},
		}
	}
</script>
<style>
</style>
<style lang="scss" scoped>
.business_card {
	position: relative;   
	margin-top: -193.841rpx;
	width: 695.652rpx;
	height: 480.072rpx;
	background: #FFFFFF;
	border-radius: 30rpx;
	box-shadow: 0px 3.623rpx 36.232rpx 0px rgba(0, 0, 0, 0.07);
	.head_portrait {
		position: relative;
		height: 85.145rpx;
		.head_portraitimg_box {
			position: absolute;
			top: -110.507rpx;
			left: 50%;
			transform: translate(-50%,0);
			width: 195.652rpx;
			height: 195.652rpx;
			border-radius: 97.826rpx;
			.head_portraitimg {
				width: 195.652rpx;
				height: 195.652rpx;
				border-radius: 97.826rpx;
				box-shadow: 0px 3.623rpx 30.797rpx 0px rgba(0, 0, 0, 0.17);
				border: 4.623rpx solid rgba(255, 255, 255, 1);
			}
			.sex_icon {
				position: absolute;
				bottom: 0;
				right: 28.986rpx;
				width: 32.609rpx;
				height: 32.609rpx;
			}

		}
	}
	.nick_namebox {
		margin-top: 32.609rpx;
		text-align: center;
		.nick_name{
			position: relative;
			display: inline-block;
			height: 50.725rpx;
			font-size: 36.232rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 50.725rpx;
		}
		.name_certified {
			margin-left: 9.058rpx;
			position: absolute;
			right:-80.841rpx;
			top: 10rpx;
			width: 68.841rpx;
			height: 34.42rpx;
			background: #FFFFFF;
			text-align: center;
			border-radius: 7.246rpx;
			border: 1.812rpx solid #CECECE;
			font-size: 18.116rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 29.609rpx;

		}
	}
	.personalFile {
		position: relative;
		padding: 11.681rpx 30.797rpx;
		margin-top: 25.362rpx;
		margin-left: 27.174rpx;
		width: 641.304rpx;
		height: 259.058rpx;
		background: #FCFBFC;
		border-radius: 14.493rpx;
		.travel_to {
			position: absolute;
			top: 50%;
			right: 36.232rpx;
			width: 36.232rpx;
			height: 36.232rpx;
			transform: translate(0%,-50%);
		}
		.personal_list {
			display: flex;
			margin-top: 18.116rpx;
			.personal_title {
				width: 105.072rpx;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 36.232rpx;

			}
			.personal_content {
				width: 507.246rpx;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				display: flex;
				color: #000000;
				line-height: 36.232rpx;
				.divider_line {
					display: inline-block;
					margin: 0 10px;
					width: 2.717rpx;
					height: 25.362rpx;
					line-height: 36.232rpx;
					background-color: #E7E6E7;
				}
			}
		}
	}
	}
	.nloggedin {
		position: relative;   
		margin-top: -193.841rpx;
		width: 695.652rpx;
		height: 580.072rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		box-shadow: 0px 3.623rpx 36.232rpx 0px rgba(0, 0, 0, 0.07);
	.head_portrait {
		position: relative;
		height: 85.145rpx;
		.head_portraitimg_box {
			position: absolute;
			top: -110.507rpx;
			left: 50%;
			transform: translate(-50%,0);
			width: 195.652rpx;
			height: 195.652rpx;
			border-radius: 97.826rpx;
			.head_portraitimg {
				width: 195.652rpx;
				height: 195.652rpx;
				border-radius: 97.826rpx;
				box-shadow: 0px 3.623rpx 30.797rpx 0px rgba(0, 0, 0, 0.17);
				border: 3.623rpx solid rgba(255, 255, 255, 0.18);
			}
			.sex_icon {
				position: absolute;
				bottom: 0;
				right: 28.986rpx;
				width: 32.609rpx;
				height: 32.609rpx;
			}

		}
	}
	.nick_namebox {
		margin-top: 32.609rpx;
		text-align: center;
		.nick_name{
			position: relative;
			display: inline-block;
			height: 50.725rpx;
			font-size: 36.232rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 50.725rpx;
		}
		.name_certified {
			margin-left: 9.058rpx;
			position: absolute;
			right:-72.841rpx;
			top: 8rpx;
			width: 68.841rpx;
			height: 36.232rpx;
			background: #FFFFFF;
			text-align: center;
			border-radius: 7.246rpx;
			border: 1.812rpx solid #CECECE;
			font-size: 18.116rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 36.232rpx;

		}
	}
	.personalFile {
		position: relative;
		padding: 11.681rpx 30.797rpx;
		margin-top: 25.362rpx;
		margin-left: 27.174rpx;
		width: 641.304rpx;
		height: 259.058rpx;
		background: #FFFFFF;
		border-radius: 14.493rpx;
		.item_list_box {
		  display: flex;
		  justify-content: space-between;
          .item_list {
			  text-align: center;
             .item_icon {
				 width: 68.841rpx;
				 height: 68.841rpx;
			 }
			 .item_title {
				margin-top: 16.304rpx;
				width: 56px;
				height: 20px;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 20px;
			 }
		  }
		}
		.checkcard_box {
			margin-top: 47.101rpx;
			text-align: center;
		   .checkcard_text {
			  font-size: 25.362rpx;
			  font-family: PingFangSC-Regular, PingFang SC;
			  font-weight: 400;
			  color: #999999;
		   }
		   .checkcardicon {
			   margin-left: 9.058rpx;
			   width: 9.058rpx;
			   height: 18.116rpx;
		   }
		}
		.createCard {
			margin-top: 27.174rpx;
			text-align: center;
			width: 100%;
		  .createCard_btn {
			   display: inline-block;
			    width: 579.71rpx;
				height: 90.58rpx;
				background: #1274FF;
				box-shadow: 0px 14.493rpx 18.116rpx 0px rgba(18, 70, 255, 0.18);
				border-radius: 50.725rpx;
				font-size: 32.609rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 90.58rpx;
		  }	
		}
	}
	}
</style>
