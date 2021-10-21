<template>
    <view class="container">
		 <u-navbar
			:is-back="true"
			title="我的名片"
			title-size="36.232rpx"
			title-color="#FFFFFF"
			:border-bottom="false"
			:background="background"
			back-icon-color="#FFFFFF"
			@custom-back="handleGoBack"
		></u-navbar>
		<view class="container_box">
           <view class="banner">
		  <!-- <view class="intro">
			    <view class="navplaceholder"></view>
				<view class="navbar">
                    <view class="goBack" @click="handleGoBack">
					  <u-icon v-if="shareSow" name="arrow-left"></u-icon>
					</view>	
					<view class="greet">我的名片</view>
				</view>
		  </view>	 -->
          <image
		      class="banner_bcimg"
			  src="@/static/home/homebc.png"
			  mode="scaleToFill"
		  />
			</view>
			<view class="content">
			<view class="business_card">
				<view class="head_portrait">
				<view class="head_portraitimg_box">
					<image
						class="head_portraitimg"
						:src="dataList.avatar"
						mode="scaleToFill"
					/>
					<image
						v-if="dataList.sex===1"
						class="sex_icon"
						src="@/static/teacherlist/manicon.png"
						mode="scaleToFill"
					/>
					<image
						v-else-if="dataList.sex===2"
						class="sex_icon"
						src="@/static/teacherlist/woman.png"
						mode="scaleToFill"
					/>
					<image
						v-else-if="dataList.sex===3"
						class="sex_icon"
						src="@/static/teacherlist/qi.png"
						mode="scaleToFill"
					/>
				</view>
				<view v-if="shareSow" class="editor_icon_box" @click="handleJumpCreatCard(1)">
						<image
							class="editor_icon"
							src="@/static/carddetails/editor_icon1.png"
							mode="scaleToFill"
						/>
						<text class="editor_text">修改</text>
					</view>
				</view>	
				<view class="nick_namebox">
					<view class="nick_name">       
					{{dataList.nickname || ''}}
					<view v-if="dataList.status===2" class="name_certified">已实名</view>
					</view>
				</view>
				<view class="personalFile">
					<view class="personal_list">
						<view class="personal_title">擅长</view>
						<view class="personal_content">
							<view
							v-for="(item,index) in dataList.theme"
							:key="index"
							>
							<text>{{item.value}}</text>
							<view v-if="dataList.theme.length-1 !== index" class="divider_line"></view>
							</view>
						</view>
					</view>
					<view class="personal_list">
						<view class="personal_title">风格</view>
						<view class="personal_content">
							<view
							v-for="(item,index) in dataList.style"
							:key="index"
							>
							<text>{{item.value}}</text>
							<view v-if="dataList.style.length-1 !== index" class="divider_line"></view>
							</view>
						</view>
					</view>
					<view class="personal_list">
						<view class="personal_title">地区</view>
						<view class="personal_content">
							<text>{{dataList.district[0].name|| ''}}</text>
							<view class="divider_line"></view>
							<text>{{dataList.district[1].name|| ''}}</text>
						</view>
					</view>
					<view class="personal_list">
						<view class="personal_title">微信</view>
						<view class="personal_content">
							<text>{{dataList.wechat_number || ''}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="business_data">
				<view class="business_data_title">
					<view class="title_data">简介信息</view>
					<view class="editorbox" @click="handleJumpCreatCard(1)" >
						<image
							class="editor_icon"
							src="@/static/carddetails/editor_icon1.png"
							mode="scaleToFill"
						/>
						<text class="editor_text">修改</text>
					</view>
				</view>
				<view class="data_content_introduction">
				<view class="introduction_text">
					<view class="introduction_text_an" :class="moreShow ? 'u-line-1' : ''">{{dataList.intro}}</view>
					<view class="handlean_box" @click="handleTakeBack">
						<image
							class="handlean"
							src="@/static/carddetails/an.png"
							mode="scaleToFill"
						/>
					</view>
				</view>
				<view class="tages_list_box">
					<view class="tages_list" v-for="(item,index) in itemList" :key="index" @click="handleClick(index,item)">
						<view class="animate-wrap" v-if="giveIndex===index">
							<view class="aa" :class="{'bb':item.index}" v-for="(item,index) in viewList" :key="index">
								<image style="width: 30upx;height: 30upx;" mode="widthFix" :src="item.src" :animation="item.animationData"></image>
							</view>
						</view>
						<image
							class="tages_list_img"
							src="@/static/home/dianzhanActive.png"
							mode="scaleToFill"
						/>
						<text class="tages_list_conten">{{item.name}}</text>
						<text class="tages_list_num">{{item.count}}</text>
					</view>
				</view>
				</view>
			</view>
			<view class="business_data">
				<view class="business_data_title">
					<view class="title_data">配音作品</view>
					<view class="editorbox" v-if="!addbtnShow">
						<view class="edititem" @click="handleModifyChange">
						<image
								class="editor_icon"
								src="@/static/carddetails/editor_icon1.png"
								mode="scaleToFill"
							/>
							<text class="editor_text">修改</text>
						</view>
						<view class="additem" @click="handleJumpCreatCard(2)">
							<image
								class="editor_icon"
								src="@/static/carddetails/addiconj.png"
								mode="scaleToFill"
							/>
							<text class="editor_text">新增</text>
						</view>
					</view>
				</view>
				<view class="data_content">
				<view v-if="!addbtnShow" class="list_worksbox">
					<view class="u-tabs-box">
						<my-tabs
							activeColor="#000000"
							bold
							ref="tabs"
							bg-color="#FFFFFF" 
							inactive-color="#999999" 
							:bar-style="barStyle" 
							name="title"
							:modifyShow='modifyShow'
							:is-scroll="true"
							:list="tabsItem" 
							:current="current" 
							@change="change" 
							font-size='28.362'
						>
						</my-tabs>
					</view>
					<scroll-view scroll-y style="height:100%; width: 100%;" :refresher-triggered="triggered">
						<view class="works_item_list_box" v-if="tabsList[current].works.length!==0">
							<view class="works_item_list" v-for="(item,index) in tabsList[current].works" :key="index">
								<view class="list_item_paly" @click="playTheMusic(item)">
								<image
									class="paly_icon"
									:src="item.playStatus ? playActive : play"
									mode="scaleToFill"
								/>
								<text class="works_title u-line-1">{{item.title}}</text>
								</view>
								<view class="download_box" @click="downloadcopy(item.url,'下载链接已复制到剪贴板')">
									<image
										class="download_icon"
										src="@/static/carddetails/download.png"
										mode="scaleToFill"
									/>
								</view>
							</view>
						</view>
						<view v-if="tabsList[current].works.length===0" class="page-box">
							<view class="defaltPage">
								<!-- <image
									class="defaltPageimg"
									src="@/static/ui/defaultPage/d1.png"
									mode="scaleToFill"
								/> -->
								<view class="defaltext">暂无作品</view>
							</view>
						</view>
					</scroll-view>
				</view>	
				<view v-if="addbtnShow" class="add_work" @click="handleJumpCreatCard(2)">
					<view class="add_icon_box">
						<image
							class="add_icon"
							src="@/static/carddetails/addiconbtn.png"
							mode="scaleToFill"
						/>
					</view>
					<view class="add_text">添加作品</view>
				</view>
				</view>
			</view>
			</view>
			<view style="height:90px"></view>
			<view class="footer_prompt">
			<view class="footer_dianzhan_icon">
				<button  class="invitationBtn sharebtn" open-type="share">
				<!-- <image
					class="give_like_icon"
					src="@/static/carddetails/zhuanfa.png"
					mode="scaleToFill"
				/> -->
				<text class="give_like_text">发名片</text>
				</button>
			</view>
			</view>
			<view v-if="audioShow" class="home_musicSrc_box disappear">
				<musicAudio 
				ref="musicAudio"
				:url="dataPlay.url"
				:autoplay="true"
				:portrait="dataList.avatar"
				:music_title="dataPlay.title"
				@handleChangePlay="handleChangePlay"  
				@musicClose="musicClose"
				></musicAudio>
			</view>
		</view>
	</view>
</template>

<script>
import play from '@/static/home/play.png'
import playActive from '@/static/home/playActive.png'
import { mapState, mapActions } from "vuex";
import uniCopy from '@/utils/uni-copy.js'
import musicAudio from '@/components/audio/audioplay.vue'
import myTabs from "@/components/my-tabs/my-tabs"
import { profileDetail,followFabulous,followFabuloulist } from "@/api/carddetails.js"
import man from "@/static/teacherlist/manicon.png"
import female from '@/static/teacherlist/woman.png'
import qi from '@/static/teacherlist/woman.png'
import dianzhan from '@/static/home/dianzhanActive.png'
export default {
	components: {
		myTabs,
		musicAudio
	},
	data() {
		return {
			titleList: [
				'宣传片',
				'专题片',
				'有声小说'
			],
			viewList: [],
			pageDate : new Date(),	//全局时间用于函数节流
			man: man,
			female: female,
			shareSow: true,
			qi: qi,
			moreShow: true,
			addbtnShow: false,
			currentIndex: 0,
			triggered: false,
			defaultshow: true,
			play: play,
			giveIndex: null,
			playActive: playActive,
			woekslist: [
				
			],
			background: {
				backgroundColor: '#21283B',
			},
			woekslist1: [
				{
                  name: '品牌广告',
				  id: 1
				},
				{
				  name: '专题片',
				  id: 2
				},
				{
				  name: '促销广告',
				  id: 3
				},
				{
				  name: '纪录片',
				  id: 4
				},
				{
				  name: '影视广告',
				  id: 5
				},
				{
				  name: '影视广告',
				  id: 6
				}
			],
			barStyle: {
				backgroundColor: '#1274FF',
			},
			dataList: [],
			tabsList: [],
			tabsItem: [],
			audioList: [],
			current: 0,
			modifyShow: false,
			cardId: '',
			audioShow:false,
			dataPlay: {
                  url: ''
			},
			itemList: [
			]
		};
	},
	onLoad(options) {
		this.cardId = options.id
		uni.showLoading({
			title: '加载中'
		});
		this.getUnionid()
	},
	onShow() {
	//   console.log('show1111')
	  this.getUnionid()
	  this.shareSow = true
	},
	computed: {
      ...mapState("user", ["token", "userInfo"]),
    },
	onHide() {
	//   this.musicClose()	
	},
	onShareAppMessage(res) {
		this.shareSow = false
		if (res.from === 'button') {// 来自页面内分享按钮
		    console.log(res.target)
		}
		return {
			title: '这是我的声音名片，点击在线试听样音，欢迎合作～',
			path: '/subpkg/pages/touristsceate/touristsceate?id='+this.cardId,
			imageUrl: '',
			complete: function(res) {
				console.log('分享成功', res)
			},
		}
	},
	onBackPress(event) {
		console.log('手机真机返回')
	},
	methods: {
		...mapActions("user", ["login"]),
		getUnionid() {
			uni.login({
				provider: "weixin",
				success: async (result) => {
				  await this.login(result.code);
				  this.woekslist = this.woekslist1
				  this.handleProfileDetail()
				  this.followFabuloulistData()
				},
				fail: (error) => {
				console.log("登录失败", error);
				},
			});
		},
		handleProfileDetail() {
          profileDetail({id:this.cardId}).then((res)=>{
			  console.log('名片数据',res)
              this.dataList = res.data.data
			  uni.hideLoading();
			  const itemworks = res.data.list
			  itemworks.map((item)=>{
				  item.works.map((items)=>{
					  items.playStatus = false
				  })
			  })
			  this.tabsItem = this.$u.deepClone(itemworks)
			  this.tabsList = itemworks
			  if (this.tabsList.length===0) {
				  this.addbtnShow = true
			  } else {
				  this.addbtnShow = false
			  }
		  })
		},
		followFabuloulistData() {
          followFabuloulist().then((res)=>{
               this.itemList = res.data
		  })
		},
		handleGoBack() {
			uni.switchTab({
  			  url: '/pages/index/index'
			});
		},
		handleModifyChange() {
          this.modifyShow = !this.modifyShow
		},
		// 查看更多
		handleTakeBack() {
          this.moreShow = !this.moreShow
		},
		// 跳转到创建详情页面
		handleJumpCreatCard(type) {
			uni.navigateTo({ url: '/subpkg/pages/editbasic/editbasic?type='+type+'&id='+this.cardId })	
		},
        // tab栏切换
		change(index) {
			this.current = index;
		},
        // 音乐播放按钮
		playTheMusic(orderItem) {
		  this.audioShow = true
		  if(this.dataPlay.url === orderItem.url) {
			  this.tabsList.map((item)=>{
				  item.works.map((items)=>{
					if(this.dataPlay===items){
                        orderItem.playStatus = !orderItem.playStatus
					  }else {
						items.playStatus = false
					  }
				  })
			  })
		  }else {
			 this.tabsList.map((item)=>{
				  item.works.map((items)=>{
					  items.playStatus = false
				  })
			  })
			  orderItem.playStatus = true
			  this.dataPlay = orderItem
		  }
		  setTimeout(()=>{
			this.$refs.musicAudio.preStartPlay()
		  },0)
		},
		handleChangePlay(status) {
			 this.tabsList.map((item)=>{
				  item.works.map((items)=>{
					   if(this.dataPlay===items){
							items.playStatus = status
						}else {
							items.playStatus = false
						}
				  })
			  })
		},
		downloadcopy(groupNum,title) {
			uniCopy({
				content:groupNum,
				success:(res)=>{
					uni.showToast({
						title: title,
						icon: 'none'
					})
				},
				error:(e)=>{
				}
			})
		},
		musicClose() {
          this.tabsList.map((item)=>{
				  item.works.map((items)=>{
					  items.playStatus = false
				  })
			  })
		  this.audioShow = false	
		  this.dataPlay =  {
                  url: ''
			}
		},
		random (){
			let r = Math.floor(Math.random() * 256),
				g = Math.floor(Math.random() * 256),
				b = Math.floor(Math.random() * 256);
			return `rgb(${r},${g},${b})`
		},
	    // 点赞动画
		handleClick (index,listItem) {
			    console.log('点击了第几个', index,listItem)
				const par = {
					id: this.cardId,
					type: index
				}
					followFabulous(par).then((res)=>{
						console.log('点赞成功',res)
						this.giveIndex = index
					let that = this
					let arr = ['-','']
					let arrImg = [dianzhan]
					let randomImg = Math.floor(Math.random() * arrImg.length)
					let arrPush = {
						src : arrImg[randomImg],	//用于随机图标
						back : this.random(),		//可删除
						index : index,				//可删除
						time : 5000,				//动画时间
						animationData: {},			//每个盒子独立动画不可全局
						x :  Math.ceil(Math.random() * 50 ),	//方向间距
						q :  Math.floor(Math.random() * arr.length ),		//用于随机方向
						lastIndex : 1,		//用于删除数组
						timer : null,		//定时器
						lastTime : 100		//删除的倒计时
					}
					//函数节流限制用户频繁快速点击
					if(new Date() - this.pageDate < 300) return			//如果点击的时间小于初始时间300
					this.pageDate = new Date();		//同步全局时间
					//------------
					this.viewList.push(arrPush)
					
					//核心动画
					this.viewList.forEach((i,o,v)=>{
						var animate = uni.createAnimation({
								duration: i.time,
								timingFunction: 'ease-out'
							})
						that.animation = animate
						let time = arr[i.q] + i.x		//随机的方向和间距
						setTimeout(()=>{
							that.animation.translateY(-100).step()
							that.animation.opacity(0).step()
							that.animation.translateX(Number(time)).step()
							i.animationData = that.animation.export()
							//函数防抖
							clearInterval(i.timer)
							i.timer = setInterval(()=>{
								i.lastIndex--				//每个图标的倒计时到0删除
								if(i.lastIndex < 0) {
									v.splice(i,1)
									clearInterval(i.timer)
								}
							},i.lastTime)
						},100)
					})
					this.followFabuloulistData()
				}).catch((err)=>{
                     uni.showToast({
						title: err.errmsg,
						icon: 'none',
						duration: 2000
					})
				})
			}
	}
};
</script>
<style lang="scss">
/* #ifdef MP-WEIXIN */
page {
	height: 100%;
	overflow: hidden;
	width: 100%;
}
/* #endif */
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
/* #endif */
</style>
<style lang="scss" scoped>
.container {
	position: relative;
	height: 100%;
	overflow-y: auto;
	.container_box {
		position: relative;
		height: 100%;
		top: -144.928rpx;
		overflow-y: auto;
	}
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
			position: fixed;
			width: 100%;
			top: 0px;
			left: 0px;
			color: #FFFFFF;
			background: #21283B;
			.navplaceholder {
				height: var(--status-bar-height);
			}
			.navbar {
				height: 44px;
				display: flex;
				align-items: center;
				justify-content: center;
			    flex-direction: column;
			}
			.goBack {
				width: 20%;
				text-align: left;
				position: absolute;
				left: 18.116rpx;
				font-size: 32.609rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
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
					border: 5.623rpx solid RGBA(242, 242, 242, 1.00);
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
			    padding: 20rpx 0px 0px 0px;
			    margin-top: 25.362rpx;
			    width: 695.652rpx;
				min-height: 259.058rpx;
				background: #FFFFFF;
				box-shadow: 0px 3.623rpx 36.232rpx 0px rgba(0, 0, 0, 0.07);
				border-radius: 21.739rpx;
				.add_work {
					padding-top: 57.971rpx;
					.add_icon_box {
					   text-align: center;
                      .add_icon {
						  width: 83.333rpx;
						  height: 83.333rpx;
					  }
					}
					.add_text {
						text-align: center;
						height: 36.232rpx;
						font-size: 25.362rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #666666;
						line-height: 36.232rpx;
					}
				}
				.works_item_list_box {
					.works_item_list {
						display: flex;
						width: 100%;
						height: 119.565rpx;
						border-top: 1px solid #F4F4F4;
					}
					.list_item_paly {
						width: 619.565rpx;
						height: 100%;
						display: flex;
						align-items: center;
						.paly_icon {
							width: 97.826rpx;
							height:97.826rpx;
							border-radius: 48.913rpx;
							margin-left: 14.493rpx;
						}
						.works_title {
							margin-left: 25.362rpx;
							width: 498rpx;
							font-size: 28.986rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #666666;
						}
					}
					.download_box {
						display: flex;
						align-items: center;
						width: 70rpx;
						.download_icon {
							width: 30.797rpx;
							height: 28.986rpx;
						}
					}
				}
		   }
		   .data_content_introduction {
			   margin-top: 18.116rpx;
			   padding: 28.986rpx;
			   width: 695.652rpx;
			   min-height: 195.652rpx;
			   background: #FFFFFF;
			   box-shadow: 0px 3.623rpx 36.232rpx 0px rgba(0, 0, 0, 0.07);
			   border-radius: 21.739rpx;
               .introduction_text {
				  width: 641.377rpx;
				  font-size: 25.362rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #000000;
				  position: relative;
				  line-height: 43.478rpx;
				  display: flex;
				  .introduction_text_an {
                    width: 600.377rpx;
					min-height: 43.478rpx;
					font-size: 25.362rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
				  }
				  .handlean_box {
						width: 70rpx;
						height: 40rpx;
					}
				  .handlean {
					position: absolute;  
					top: 18.058rpx;
					right: 0;  
					width: 19.928rpx;
					height: 10.493rpx;
			      }
			   }
			   .tages_list_box {
				   margin-top: 28.986rpx;
				   display: flex;
				   .tages_list {
					  position: relative; 
					  display: flex; 
					  align-items: center;
					  padding:0 18.116rpx;
					  height: 30px;
					  margin-right: 18.116rpx;
					  background: #FFFFFF;
					  border-radius: 7.246rpx;
					  border: 1.812rpx solid #FFA53D;
					  .tages_list_img {
					  width: 21.739rpx;
					  height: 21.739rpx;
				      }
					  .tages_list_conten {
						margin-left: 5.435rpx;  
						font-size: 21.739rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFA53D;
					  }
					  .tages_list_num {
						margin-left: 5.435rpx;  
						font-size: 21.739rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFA53D;
					  }
				   }
				   
			   }
		   }
	   }
	}
	.home_musicSrc_box {
		position: fixed;
		bottom: 36.232rpx;
	}
	.footer_prompt {
		padding: 0px 36.232rpx;
		position: fixed;
        bottom: 36.232rpx;
		width: 750rpx;
		justify-content: center;
		height: 97.826rpx;
		display: flex;
        .footer_dianzhan_icon {
			display: flex;
			align-items: center;
			width: 543.478rpx;
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
}
.editor_icon_box {
	position: absolute;
	top: 32.609rpx;
	right: 32.609rpx;
	display: flex;
    justify-content: center;
	align-items: center;
	.editor_icon {
      width: 25.362rpx;
	  height: 25.362rpx;
	}
	.editor_text {
		margin-left: 9.058rpx;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
	}
}
.editorbox {
	display: flex;
	align-items: center;
	margin-right: 32.609rpx;
	.editor_icon {
      width: 25.362rpx;
	  height: 25.362rpx;
	}
	.editor_text {
		margin-left: 9.058rpx;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
	}
	.additem {
		margin-left: 57.971rpx;
		display: flex;
		align-items: center;
	}
	.edititem {
	  display: flex;
	  align-items: center;
	}
}
.animate-wrap{
		display: inline-block;
		margin-right: 10px;
		position: absolute;
		top: -20rpx;
		left: 0rpx;
		width: 100upx;
	}
	.logo{
		display: inline-block;
		position: absolute;
		left: 0;
		width: 70upx;
		height: 70upx;
	}
	.aa{
		position: absolute;
		font-size: 30upx;
		color: white;
		text-align: center;
		line-height: 50upx;
		width: 80upx;
		transform: translateY(0);

	}
	.defaltPage {
		margin-top: 30.217rpx;
		width: 100%;
		text-align: center;
		.defaltext {
			display: inline-block;
			height: 36.232rpx;
			font-size: 25.362rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 36.232rpx;
		}

	}
</style>
