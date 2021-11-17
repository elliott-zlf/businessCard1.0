<template>
	<view class="container">
	  <u-navbar :is-back="true" title="接单广场" title-size="36.232rpx" :border-bottom="true" title-color="#000000"></u-navbar>
	  <view class="content">
		  <view class="prompt">
			  发布需求
			  <image
			      class="shuangkuo"
				  src="@/static/home2/shuangkuohao.png"
				  mode="scaleToFill"
			  />
			  免费匹配
			  <image
			      class="shuangkuo"
				  src="@/static/home2/shuangkuohao.png"
				  mode="scaleToFill"
			  />
			  自主对接
		  </view>
		  <view class="from_itme_box">
			<view class="from_item">
				<view class="from_item_list">
					<view class="item_title"><text class="mandatory">*</text>需求类型</view>
					<view class="from_item_list_box" @click="handleClickshowPop">
						<view class="item_input_item">
							<view v-if="form.type === ''" class="item_input_item notchoose">选择</view>
							<view v-else class="item_input_item valuechoose">{{typeTitle}}</view>
						</view>
						<image
							class="item_right_icon"
							src="@/static/home/xiangyou.png"
							mode="scaleToFill"
						/>
					</view>
				</view>
				<view class="from_item_list">
					<view class="item_title"><text class="mandatory">*</text>需求标题</view>
					<view class="item_input_item input_text">
						<input
							v-model="form.title"
							class="note_text item_input_item"
							type="text"
							placeholder="请用一句话概括"
							placeholder-class="textarea-placeholder"
						/>
					</view>
				</view>
				<view class="from_item_list_Introduction">
					<view class="item_title"><text class="mandatory">*</text>需求描述</view>
					<view class="item_input_item">
						<view class="home_textarea_box">
							<view class="textarea_box">
								<textarea
									class="textareainput"
									v-model="form.content"
									:disable-default-padding="true"
									:placeholder="mandatory"
									maxlength="200"
									placeholder-class="textarea-placeholder1"
								/>
							</view>
						</view>
					</view>
				</view>
				<view class="from_item_list" v-if="fileShow">
					<view class="item_title">上传文稿</view>
					<view class="from_item_list_box"  @tap="onUpload('word_url')">
						<view class="item_input_item">
							<view v-if="form.word_url === ''" class="item_input_item notchoose">从手机微信聊天文件中上传</view>
							<view v-else class="item_input_item valuechoose u-line-1">{{wordName}}</view>
						</view>
						<image
							class="item_right_icon"
							src="@/static/home/xiangyou.png"
							mode="scaleToFill"
						/>
					</view>
				</view>
				<view class="from_item_list" v-if="fileShow">
					<view class="item_title" >上传参考样音</view>
					<view class="from_item_list_box"  @tap="onUpload('work_url')">
						<view class="item_input_item">
							<view v-if="form.work_url === ''" class="item_input_item notchoose">从手机微信聊天文件中上传</view>
							<view v-else class="item_input_item valuechoose u-line-1">{{workName}}</view>
						</view>
						<image
							class="item_right_icon"
							src="@/static/home/xiangyou.png"
							mode="scaleToFill"
						/>
					</view>
				</view>
				<view class="from_item_list">
					<view class="item_title">需求预算</view>
					<view class="item_input_item input_text">
						<input
							v-model="form.total"
							class="note_text item_input_item"
							type="text"
							placeholder="请输入整数或区间或不填"
							placeholder-class="textarea-placeholder"
						/>
					</view>
					<view style="margin-left:5px">元</view>
				</view>
				<view class="from_item_list">
					<view class="item_title"><text class="mandatory">*</text>截止日期</view>
					<view class="from_item_list_box" @click="handleTimeshowPop">
						<view class="item_input_item">
							<view v-if="form.end_time === ''" class="item_input_item notchoose">请选择时间</view>
							<view v-else class="item_input_item valuechoose">{{end_timeText}}</view>
						</view>
						<image
							class="item_right_icon"
							src="@/static/home/xiangyou.png"
							mode="scaleToFill"
						/>
					</view>
				</view>
			</view>
		  </view>	
		  <view class="release_btn_box">
			  <view class="release_btn" v-if="profileStatus != 0" @click="handleReleaseRequirements">立即发布</view>
              <button v-if="profileStatus == 0" class="invitationBtn release_btn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">立即发布</button>
		  </view>
	  </view>
	  <u-popup v-model="popup_show" mode="bottom" border-radius="14">
		  <view class="radio_buttons">
			<view class="picker_view_box">
            <picker-view :indicator-style="indicatorStyle" :value="categoryvalue" @change="categoryChange" class="picker-view">
				<picker-view-column>
					<view class="item" v-for="(item,index) in typeList" :key="index">{{item.name}}</view>
				</picker-view-column>
           </picker-view>
		   </view>
		   <view class="btn_box">
               <view class="cancel_btn" @click="handleShutDown">取消</view>
			   <view class="confirm_btn" @click="handleConfirmClicke">确定</view>
		   </view>
		</view>
	  </u-popup>
	  <u-popup v-model="time_show" mode="bottom" border-radius="14">
		  <view class="radio_buttons">
			<view class="picker_view_box">
            <picker-view :indicator-style="indicatorStyle" :value="categoryvalue" @change="categoryTimeChange" class="picker-view">
				<picker-view-column>
					<view class="item" v-for="(item,index) in timeList" :key="index">{{item.name}}</view>
				</picker-view-column>
           </picker-view>
		   </view>
		   <view class="btn_box">
               <view class="cancel_btn" @click="handleShutDown">取消</view>
			   <view class="confirm_btn" @click="handleContimefirmClicke">确定</view>
		   </view>
		</view>
	  </u-popup>
	  <l-file ref="lFile" :logo="logo" @up-success="onSuccess"></l-file>
	  <!-- <u-picker mode="time" v-model="time_show" :params="params" @cancel="handletimecancel" @confirm="handletimeconfirm"></u-picker> -->
	</view>
</template>

<script>
import { ordertype, orderAdd, getphone } from '@/api/myneeds.js'
import { mapState, mapActions } from "vuex";
	export default {
		data() {
			return {
			  form: {
					type: '',
					title: '',
					content: '',
					end_time: '',
					work_url:'',
					word_url: '',
					nickname: '',
					avatar: '',
					mobile: '',
					total: '',
				},
				wordName: '',
				workName: '',
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				timeList: [
					{
						value: 1,
						name: '1小时'
					},
					{
						value: 2,
						name: '2小时'
					},
					{
						value: 3,
						name: '6小时'
					},
					{
						value: 4,
						name: '12小时'
					},
					{
						value: 5,
						name: '24小时'
					},
					{
						value: 6,
						name: '48小时'
					},
					{
						value: 7,
						name: '7天'
					},
				],
				placeholder:'',
				time_show: false,
				fileShow: true,
				typeList: [],
				styleItem: {},
				timeItem: {},
				categoryvalue: [0],
				typeTitle: {},
				end_timeText: '',
				mandatory:'请尽量详细描述您的需求，让大家更好的理解~',
				indicatorStyle: `height: 50px;`,
				popup_show:false,
				sessionkey: '',
				releaseShow: true
			};
		},
		computed: {
		  ...mapState("user", ["token", "userInfo","profileStatus"]),
		},
		onLoad() {
		  this.getUnionid()
		},
		onShow() {
		},
		methods: {
			...mapActions("user", ["login"]),
			getUnionid() {
				uni.login({
					provider: "weixin",
					success: async (result) => {
					  await this.login(result.code);
					  this.get0rdertype()
					},
					fail: (error) => {
					  console.log("登录失败", error);
					},
				});
			},
			// 请求需求类型数据
			get0rdertype() {
			  ordertype().then((res)=>{
				  console.log('需求类型',res)
				  this.typeList = res.data
			  })
			},
			onGetPhoneNumber(e){  
				console.log('微信小程序id', e, this.phonebb,this.phoneNumber)
				if(e.detail.errMsg=="getPhoneNumber:fail user deny"){       //用户决绝授权  
					uni.showToast({
						title: "请先授权手机号，否则无法邀请试音哦",
						icon: 'none',
						mask: true,
						duration: 2000
					});
				}else{     
					//允许授权
					var  sessionkeys = uni.getStorageSync('sessionkey');
					console.log('手机号请求数据', sessionkeys)
					// let pc = new WXBizDataCrypt('wx61103192dd39156f',sessionkey);      //wxXXXXXXX为你的小程序APPID 
					var data = {
						iv: e.detail.iv,
						sessionKey: sessionkeys,
						encryptedData: e.detail.encryptedData 
					}
					getphone(data).then((res)=>{
                      console.log('手机号请求数据', res.data)
					  this.form.mobile = res.data
					  this.handleReleaseRequirements()
					}).catch((err)=>{
                       console.log('手机号请求数据', err)
					})
					// let data = pc.decryptData(e.detail.encryptedData , e.detail.iv);
                    // console.log('手机号请求数据', e)
					// uni.setStorage({
					// 	key: 'phoneNum',
					// 	data: data.phoneNumber,
					// });
				}  
			},
			handleTimeshowPop() {
				this.time_show = true
			},
			// handletimecancel() {
			// 	this.time_show = false
			// },
			handletimeconfirm(val) {
			    let seleTime = new Date(val.year+'-'+val.month+'-'+val.day)
				let nowtime = new Date()
				let time1 =Date.parse(seleTime)
				let time2 = Date.parse(nowtime)
                let tian = nowtime.getUTCDate() 
				let daynum  =  time1-time2
				console.log(seleTime,nowtime,'选着的时间见', time1-time2, tian)
				if (daynum > 0) {
					let daystr = daynum / (1000*3600*24);
					console.log('------------', daystr)
					if (daystr < 7) {
						this.form.end_time = val.year+'-'+val.month+'-'+val.day
					} else {
						uni.showToast({
							title: "请选择从当天到未来7天",
							icon: 'none',
							mask: true,
							duration: 3000
						});
					}
				} else {
					if (tian === parseInt(val.day) && Math.abs(daynum) < 86400000) {
						this.form.end_time = val.year+'-'+val.month+'-'+val.day
					} else {
						uni.showToast({
							title: "日前不能小于当前日期",
							icon: 'none',
							mask: true,
							duration: 3000
					   });
					}
				}
			},
			handleClickshowPop() {
              this.popup_show = true
			},
			handleShutDown() {
			  this.popup_show = false
			   this.time_show = false
			},
			handleReleaseRequirements() {
			 if(this.releaseShow) {
                this.releaseShow = false
                let avatarUrl =  uni.getStorageSync('avatarUrl')
				let nickName = uni.getStorageSync('nickName')
				if (avatarUrl != '') {
					this.form.avatar = avatarUrl
					this.form.nickname = nickName
				} 
				orderAdd(this.form).then(res=>{
					this.releaseShow = true
					uni.switchTab({ 
						url: '/pages/singlesquare/singlesquare',
						 success: function (res) {
							var page = getCurrentPages().pop();  
							if (page == undefined || page == null) return;  
							page.onLoad();  
							console.log("addAttentionService.add: " + res)
						}
					})
				}).catch(err=>{
					this.releaseShow = true
					uni.showToast({
							title: err.errmsg,
							icon: 'none',
							mask: true,
							duration: 2000
						});
				})
			 }	
			},
			categoryChange: function (e) {
			  const val = e.detail.value
			  this.styleItem = this.typeList[val]
			  console.log(val,this.styleItem)
            },
			handleConfirmClicke() {
			//   console.log('选择成功的数据', this.styleItem)
			if (JSON.stringify(this.styleItem)=='{}') {
				this.typeTitle = this.typeList[0].name
				this.form.type = this.typeList[0].id
				this.mandatory = '1、描述您的试音要求， 例如风格、 性别、 语速等； 2、输入20-200字的试音文本，或直接点击下方上传文稿'
			  }else {
                this.typeTitle = this.styleItem.name
				this.form.type = this.styleItem.id
				if (this.styleItem.id === 1) {
				  this.fileShow = true
				  this.mandatory = '1、描述您的试音要求， 例如风格、 性别、 语速等； 2、输入20-200字的试音文本，或直接点击下方上传文稿'
				  console.log(this.mandatory)
				} else {
					this.mandatory = '请尽量详细描述您的需求，让大家更好的理解~'
				  this.fileShow = false
				}
			  } 
			  this.popup_show = false
			},
			categoryTimeChange: function (e) {
			  const val = e.detail.value
			  this.timeItem = this.timeList[val]
			  console.log(val,this.timeItem)
            },
			handleContimefirmClicke() {
			//   console.log('选择成功的数据', this.styleItem)
			if (JSON.stringify(this.timeItem)=='{}') {
				this.end_timeText = this.timeList[0].name
				this.form.end_time = this.timeList[0].value
			  }else {
                this.end_timeText = this.timeItem.name
				this.form.end_time = this.timeItem.value
			  } 
			  this.time_show = false
			},
			/* 上传 */
			onUpload(item) { 
				/**
				 * currentWebview: 当前webview
				 * url：上传接口地址
				 * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
				 * header: 上传接口请求头
				 */
				
				console.log('判断小程序运行环境', uni.getSystemInfoSync().platform)
				// 运行环境
				let platform =  uni.getSystemInfoSync().platform
				if (platform == 'android' || platform == 'ios' || platform == 'devtools') {
					this.forUploading = item
					this.$refs.lFile.upload({
						// #ifdef APP-PLUS
						// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
						currentWebview: this.$mp.page.$getAppWebview(),
						// #endif
						url: "https://www.peiyinstreet.com/business/chat/upload", //替换为你的
						name: 'file',
						header: {  //根据你接口需求自定义
						userToken: this.token || ''	
						},
						formData: {
						orderId: 1000,
						}
						// body参数直接写key,value,如：
						// formData: 'value1',
						// key2: 'value2',
					});
				}else {
                   uni.showToast({
						title: "微信小程序仅支持从手机端上传",
						icon: 'none',
						mask: true,
						duration: 3000
					});
				}
			},
			onSuccess(res) {
				if (this.forUploading==='word_url') {
					console.log('上传的事文稿', res)
					this.form.word_url = res.data.data
					this.wordName = res.fileName
				} else {
					console.log('上传的事文稿', res)
					this.form.work_url = res.data.data
					this.workName = res.fileName
				}
				uni.showToast({
					title: '文件上传成功',
					icon: 'none'
				})
			},
		}
	}
</script>
<style lang="scss">
page {
	min-height: 100%;
	// overflow: hidden;
	width: 100%;
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
.textarea-placeholder {
    font-size: 28.986rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #999999;
}
.textarea-placeholder1 {

	font-size: 28.986rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #999999;

}
.textareainput {
  .u-input__textarea {
    // padding: 0px !important;
    height: 115.942rpx !important;
  }
  height: 115.942rpx !important;
  width: 100% !important;
  font-size: 28.986rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 43.478rpx;
}
/* #ifdef MP-WEIXIN */
scroll-view ::v-deep ::-webkit-scrollbar {
   width: 0;
   height: 0;
   color: transparent
}
// .u-mask {
// 	position: absolute !important;
// }
// .u-drawer {
// 	position: absolute !important;
// }
.note_text {
	font-size: 28.986rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #000000;
	line-height: 22px;

}
// .input_text {
// 	padding-right: 90.58rpx;
// }
/* #endif */
.item {
	line-height: 100rpx;
	text-align: center;
}
picker-view {
	width: 100%;
	height: 400rpx;
	margin-top:20rpx;
}
</style>
<style lang="scss" scoped>
.prompt {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 750rpx;
	height: 72.464rpx;
	background: #1274FF;
	font-size: 25.362rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
    .shuangkuo {
		margin: 0 39.058rpx;
		width: 28.986rpx;
		height: 28.986rpx;
	}
}
.from_itme_box {
	background: #FFFFFF;
}
.from_item {
	padding: 0px 36.232rpx;	
	.from_item_list {
		width: 713rpx;
		height: 108.696rpx;
		border-bottom: 1.812rpx solid #F4F4F4;
		display: flex;
		align-items: center;
	.from_item_list_box {
		display: flex;
		align-items: center;
	}
	.item_title {
		position: relative;
		width: 180rpx;
		height: 39.855rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 39.855rpx;
		.mandatory {
		  position: absolute;
		  left: -12.681rpx;
		  color: #E83035;

	   }
	}
	.item_input_item {
		width: 480rpx;
		padding-right: 27.174rpx;
		text-align: right;
	}
	.valuechoose {
		font-size: 28.986rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
	.notchoose {
		font-size: 28.986rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
	}
	.item_right_icon {
		width: 32.116rpx;
		height: 32.739rpx;
	}
	}
	.from_item_list_Introduction {
	margin-top: 34.42rpx;  
	width: 713.768rpx;
	padding-bottom: 45.29rpx;
	border-bottom: 1.812rpx solid #F4F4F4;
	.home_textarea_box {
		margin-top: 34.42rpx;
		margin-right: 36.232rpx;
	}
	.item_title {
		position: relative;
		width: 180rpx;
		height: 39.855rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 39.855rpx;
		.mandatory {
		  position: absolute;
		  left: -12.681rpx;
		  color: #E83035;
	   }
	}
	}
	.uploading_box {
		height: 100%;
		width: 100%;
		display: flex;
		padding-right: 36.232rpx;
		justify-content:flex-end;
		align-items: center;
		.add_icon {
			width: 25.362rpx;
			height: 25.362rpx;
		}
		.add_uploading {
			font-size: 25.362rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #1274FF;
		}
	}
}
.radio_buttons {
.picker_view_box {
	height: 400rpx;
}
.btn_box {
		margin-top: 72.464rpx;
		padding-bottom: 70.652rpx;
		width: 100%;
		display: flex;
		justify-content:center;
		.cancel_btn {
			width: 271.739rpx;
			height: 90.58rpx;
			line-height: 90.58rpx;
			text-align: center;
			background: #FFFFFF;
			box-shadow: 0px 14.493rpx 18.116rpx 0px rgba(212, 212, 212, 0.18);
			border-radius: 50.725rpx;
			font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #999999;

		}
		.confirm_btn {
			
			margin-left: 25.362rpx;
			width: 271.739rpx;
			height: 90.58rpx;
			line-height: 90.58rpx;
			text-align: center;
			background: #1274FF;
			box-shadow: 0px 14.493rpx 18.116rpx 0px rgba(18, 70, 255, 0.18);
			border-radius: 50.725rpx;
			font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
}
}
.release_btn_box {
	margin-top: 52.536rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	.release_btn {
		width: 579.71rpx;
		height: 90.58rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #1274FF;
		box-shadow: 0px 14.493rpx 18.116rpx 0px rgba(18, 70, 255, 0.18);
		border-radius: 50.725rpx;
		font-size: 32.609rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
}
</style>
