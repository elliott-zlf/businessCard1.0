<template>
	<view class="container">
		<u-navbar :is-back="true" title="编辑名片" title-size="36.232rpx" title-color="#000000"></u-navbar>
		<view class="content">
			<view class="pys_popup" v-if="editorPopShow">
				<view class="popup_conent">
					<image
						class="closeicon"
						src="@/static/home/close.png"
						mode="scaleToFill"
						@click="handleCanceEditor"
					/>
					<view>
					<view style="height:17.971rpx"></view>	
					<view class="editor_WeChat_test">
							修改作品名称
					</view>
					<view class="check_WeChat_tips">
						<input
						    class="changeName"
							v-model="changetitle"
							placeholder=""
							placeholder-class="input-placeholder"
						/>
					</view>
					<view class="share_btn_box">
							<button
								class="cancelSharebtn"
								hover-class="button-hover"
								@click="handleCanceEditor"
							>
							取消	 
							</button>
							<button
								class="sharebtn"
								hover-class="button-hover"
								@click="handledetermineEditor"
							>
							确定
							</button>
					</view>
					</view>
				</view>
			</view>
			<view v-if="cruIndex==1">
				<view class="set_head_imgbox">
					<view class="set_head_img" @click="handleClickshowPop('头像')">
					<image
							class="set_head_icon"
							:src="headPortrait !='' ? headPortrait : defaultAvatar"
							mode="scaleToFill"
						/>
						<image
							class="set_head_btn"
							src="@/static/teacherlist/xiangji.png"
							mode="scaleToFill"
						/>
					</view>
				</view>
				<view class="from_item">
					<view class="from_item_list">
						<view class="item_title">个人/企业</view>
						<view class="from_item_list_box" @click="handleClickshowPop('个人')">
							<view class="item_input_item">
								<view v-if="form.cate === ''" class="item_input_item notchoose">选择</view>
								<view v-else class="item_input_item valuechoose">{{personalTitle}}</view>
							</view>
							<image
								class="item_right_icon"
								src="@/static/home/xiangyou.png"
								mode="scaleToFill"
							/>
						</view>
					</view>
					<view class="from_item_list">
						<view class="item_title">昵称</view>
						<view class="item_input_item input_text">
							<input
								v-model="form.nickname"
								class="note_text item_input_item"
								type="text"
								placeholder="请输入"
								placeholder-class="textarea-placeholder"
							/>
						</view>
					</view>
					<view class="from_item_list" v-if="enterpriseShow">
						<view class="item_title">性别</view>
						<view class="from_item_list_box" @click="handleClickshowPop('性别')">
							<view class="item_input_item">
								<view v-if="form.sex === 0 || form.sex === 3" class="item_input_item notchoose">选择</view>
								<view v-else class="item_input_item valuechoose">{{sexob.name}}</view>
							</view>
							<image
								class="item_right_icon"
								src="@/static/home/xiangyou.png"
								mode="scaleToFill"
							/>
						</view>
					</view>
					<view class="from_item_list">
						<view class="item_title">擅长题材</view>
						<view class="from_item_list_box" @click="handleClickshowPop('题材')">
							<view class="item_input_item">
								<view v-if="tagData['2'].length === 0" class="item_input_item notchoose">选择</view>
								<view v-else class="item_input_item valuechoose">{{ subjectTitle}}</view>
							</view>
							<image
								class="item_right_icon"
								src="@/static/home/xiangyou.png"
								mode="scaleToFill"
							/>
						</view>
					</view>
					<view class="from_item_list">
						<view class="item_title">擅长风格</view>
						<view class="from_item_list_box" @click="handleClickshowPop('风格')">
							<view class="item_input_item">
								<view v-if="tagData['5'].length === 0"  class="item_input_item notchoose">选择</view>
								<view v-else class="item_input_item valuechoose">{{styleTitle}}</view>
							</view>
							<image
								class="item_right_icon"
								src="@/static/home/xiangyou.png"
								mode="scaleToFill"
							/>
						</view>
					</view>
					<view class="from_item_list">
						<view class="item_title">地区</view>
						<view class="from_item_list_box" @click="handleClickshowPop('地区')">
						<view class="item_input_item">
							<view v-if="form.district.length === 0" class="item_input_item notchoose">选择</view>
							<view v-else class="item_input_item valuechoose">{{form.district[0].name + ' ' + form.district[1].name}}</view>
						</view>
						<image
							class="item_right_icon"
							src="@/static/home/xiangyou.png"
							mode="scaleToFill"
						/>
						</view>
					</view>
					<view class="from_item_list">
						<view class="item_title">微信</view>
						<view class="item_input_item input_text">
							<input
								v-model="form.wechat_number"
								class="note_text item_input_item"
								type="text"
								placeholder="请输入"
								placeholder-class="textarea-placeholder"
							/>
						</view>
					</view>
					<view class="from_item_list_Introduction">
						<view class="item_title">简介</view>
						<view class="item_input_item">
							<view class="home_textarea_box">
								<view class="textarea_box">
									<textarea
									v-if="!popup_show"
									class="textareainput"
									v-model="form.intro"
									:disable-default-padding="true"
									placeholder="例如：从业年限，毕业院校，工作履历，代表作品"
									maxlength="200"
									placeholder-class="textarea-placeholder1"
									@input="handleInputEvents"
									/>
								</view>
								<view class="statistical_box">
									<view class="textarea_num">
									<text>{{ textareanum }}</text>
									<text>/200</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uploading" v-if="cruIndex==2">
				<view class="worksitem">
                     <view class="worksitem_title">
						上传作品 
						<text class="required_text">限音频</text>
					</view>
					<view class="worksitem_content">
                      <view class="from_item_list">
							<view class="item_title">题材类别</view>
							<view class="from_item_list_box"  @click="handleClickshowPop('题材类别')">
								<view class="item_input_item">
									<view v-if="worksItem.subjectCategory.value === ''" class="item_input_item notchoose">选择</view>
									<view v-else class="item_input_item valuechoose">{{worksItem.subjectCategory.value}}</view>
								</view>
								<image
									class="item_right_icon"
									src="@/static/home/xiangyou.png"
									mode="scaleToFill"
								/>
							</view>
						</view>
						<view class="from_item_list" v-for="(item,index) in worksItem.works" :key="index">
							<view class="item_title">作品{{index+1}}</view>
							<view class="works_name u-line-1">
                                 {{item.title}}
							</view>
							<view class="tool_box">
								<image
									class="editor_icon"
									src="@/static/carddetails/editor_icon.png"
									mode="scaleToFill"
									@tap="handleEditnameUpload(item.title,index)"
								/>
								<image
									class="delete_icon"
									src="@/static/carddetails/delete_icon.png"
									mode="scaleToFill"
									@tap="handledeleteworks(index)"
								/>
							</view>
					    </view>
						<view class="from_item_list">
							<view class="item_title">作品</view>
							<view class="uploading_box" @tap="onUpload('new')">
								<image
									class="add_icon"
									src="@/static/carddetails/addwork.png"
									mode="scaleToFill"
								/>
								<view class="btn add_uploading">从手机微信中上传</view>
							</view>
					    </view>
					</view>
				</view>
				<view class="worksitem">
                     <view class="worksitem_title">
						配音价格
						<text class="required_text">非必填</text>
					</view>
					<view class="worksitem_content">
                      <view class="from_item_list">
						    <view class="item_title" style="width:210rpx">百字收费（元）</view>
							<view class="item_input_item input_text" style="width:450rpx">
							<input
								v-model="worksItem.unit_price"
								style="width:450rpx"
								class="note_text item_input_item"
								type="text"
								placeholder="请输入整数"
								placeholder-class="textarea-placeholder"
							/>
						</view>
					  </view>
					</view>
				</view>
			</view>
		</view>
		<view class="next_step_box" v-if="cruIndex==1">
			<view class="next_step_btn" @click="handleNextStep">保存并查看</view>
		</view>
		<view class="next_step_box" style="margin-top: 205.29rpx" v-if="cruIndex==2">
			<view class="next_step_btn" @click="handleSaveView">保存并查看</view>
		</view>
		<l-file ref="lFile" :logo="logo" @up-success="onSuccess"></l-file>
		<u-popup v-model="popup_show" mode="bottom" border-radius="14">
			<popupview :title="titleList" :dataList="dubbingData" @handleSethead="handleSethead" @handleShutDown="handleShutDown" @handleListClick="handleListClick"></popupview>
		</u-popup>
	</view>
</template>
<script>
import defaultAvatar from '@/static/home2/defaultAvatar.png'
import popupview from '@/components/popupview/popupview.vue'
import { profileUpdate, editserviceublish } from '@/api/index.js'
import { profileDetail } from "@/api/carddetails.js"
import { mapState } from "vuex";
	export default {
		components:{
		   popupview
		},
		data() {
			return {
				cruIndex: 1,
				popup_show: false,
				enterpriseShow: true,
				editorPopShow: false,
				form: {
					cate: '',
					nickname: '',
					intro: '',
					avatar:'',
					sex: 0,
					style: [],
					wechat_number: '',
					subject: [],
					tag_data: {
					},
					district: [],
				},
				worksItem: {
					subjectCategory: {
						value: ''
					},
					id: '',
					tag_data: {
						'2':''
				    },
					works: [],
					unit_price: ''
				},
				tagData: {
					'2':[],
					'5':[]
			    },
				sexob: {},
				indextitle: 0,
				changetitle: '',
				personalTitle: '',
				regionsTitle: '',
				textareanum: 0,
				subjectTitle: '',
				styleTitle: '',
				titleList: '',
				forUploading: '',
				headPortrait: '',
				cardId: '',
				dubbingData: {},
				defaultAvatar: defaultAvatar,
			};
		},
		computed: {
			...mapState("user", ["token", "userInfo"]),
		},
		onLoad(options) {
		   console.log('配音师id',options)
		   this.cruIndex = parseInt(options.type)
		   this.cardId = options.id
		   if(options.item){
			   var newdata = JSON.parse(decodeURIComponent(options.item))
			   newdata.works.map((item)=>{
                  
			   })
			   this.worksItem = {
					subjectCategory: {
						value: newdata.tags[0].value
					},
					tag_data: {
						'2': newdata.tags[0].id
				    },
					id: newdata.id,
					works: newdata.works,
					unit_price: newdata.unit_price
				}
		   }
		   uni.hideShareMenu()
		   this.dubbingInformation()
		},
		methods: {
			// 获取配音师信息
			dubbingInformation() {
				profileDetail({id:this.cardId}).then((res)=>{
					this.dubbingData = res.data.data
					this.headPortrait = this.dubbingData.avatar
					this.form = {
						cate: this.dubbingData.cate,
						nickname: this.dubbingData.nickname,
						intro: this.dubbingData.intro,
						avatar: this.dubbingData.avatar,
						sex: this.dubbingData.sex,
						wechat_number: this.dubbingData.wechat_number,
						tag_data: this.tagData,
						district: this.dubbingData.district,
					}
					this.textareanum = this.dubbingData.intro.length
					if (this.dubbingData.cate===2) {
						this.personalTitle = "企业"
						this.enterpriseShow = false
					} else {
						this.personalTitle = "个人"
						this.enterpriseShow = true
					}
					if (this.dubbingData.sex===1) {
						this.sexob.name = '男'
					} else if(this.dubbingData.sex===2){
						this.sexob.name = '女'
					} else {
                       this.sexob.name = '' 
					}
					this.dubbingData.style.map((items,index)=>{
						 if (index === this.dubbingData.style.length-1) {
							  this.styleTitle += items.value
						 } else {
							 this.styleTitle += items.value+',' 
						 }	
						  console.log('题材的item', this.styleTitle)
						  this.tagData['5'].push(items.id)
					})
					this.dubbingData.theme.map((items,index)=>{
						  if (index === this.dubbingData.theme.length-1) {
							  this.subjectTitle += items.value
						  } else {
							 this.subjectTitle += items.value+',' 
						  }	
						  console.log('题材的item', this.subjectTitle)
						  this.tagData['2'].push(items.id)
					})
				})
			},
			// 编辑标题
			handleEditnameUpload(item,index) {
			   this.indextitle = index
			   this.changetitle = this.worksItem.works[index].title
			   console.log('编辑名称数据',this.worksItem,this.worksItem.works[index].title)
               this.editorPopShow = true
			},
			handleCanceEditor() {
			   this.editorPopShow = false
			},
			handledetermineEditor() {
				this.worksItem.works[this.indextitle].title =  this.changetitle
				this.editorPopShow = false
			},
			// 点击下一步
			handleNextStep() {
			  this.form.tag_data = this.tagData
			  console.log('提交 ',this.form )
			  profileUpdate(this.form).then((res)=>{
				  uni.navigateBack({
						delta: 1
					});
				//   uni.redirectTo({ url: '/subpkg/pages/carddetails/carddetails?id='+this.token})
			  })
			  .catch((err)=>{
                 console.log(err)
				 uni.showToast({
					title: err.errmsg,
					icon: 'none',
					duration: 2000
				})
			  })

			},
			handleSaveView() {
				 console.log('头像数据',this.worksItem)
				editserviceublish(this.worksItem).then((res)=>{
					console.log('保存信息成功', res)
					uni.navigateBack({
						delta: 1
					});
					// uni.redirectTo({ url: '/subpkg/pages/carddetails/carddetails?id='+this.token})
				})
				.catch((err)=>{
					console.log('保存信息成功', err)
					uni.showToast({
						title: err.errmsg,
						icon: 'none',
						duration: 2000
					})
				})
			},
			handleChanggeItem(index) {
              this.cruIndex = index
			  if (index===1) {
				// this.$refs.lsjUpload.close();
			  } else {
			  }
			},
			handleClickshowPop(title) {
			  this.titleList = title	
              this.popup_show = true
			},
			handleShutDown() {
			  this.popup_show = false
			},
			handleSethead(obj) {
			  this.headPortrait=obj.userInfo.avatarUrl
			  this.popup_show = false
              console.log('头像数据',obj)
			},
			// 计算输入框的字数
			handleInputEvents() {
			this.textareanum = this.form.intro.length;
			},
			handleListClick(item) {
                switch (this.titleList) {
					case '个人':
						this.form.cate = item.id
						this.personalTitle = item.name
						if (item.name==="企业") {
							this.enterpriseShow = false
						}else {
							this.enterpriseShow = true
						}
						break;
				    case '性别': 
					    this.form.sex = item.id
						this.sexob = item
						break;
					case '风格': 
						this.styleTitle = ''
						this.tagData['5'] = []
					    item.map((items,index)=>{
						  if (index === item.length-1) {
							  this.styleTitle += items.value
						  } else {
							 this.styleTitle += items.value+',' 
						  }	
						  console.log('题材的item', this.styleTitle)
						  this.tagData['5'].push(items.id)
						}) 
						break;
					case '题材': 
						this.subjectTitle = ''
						this.tagData['2'] = []
					    item.map((items,index)=>{
						  if (index === item.length-1) {
							  this.subjectTitle += items.value
						  } else {
							 this.subjectTitle += items.value+',' 
						  }	
						  console.log('题材的item', this.subjectTitle)
						  this.tagData['2'].push(items.id)
						}) 
					break;
					case '头像': 
						console.log(item)
						this.headPortrait = item
						this.form.avatar = item
						break;
					case '地区': 
					    console.log('题材的item', item)
						this.regionsTitle = item[0].name + ' ' + item[1].name
						this.form.district = item
					break;
					case '题材类别': 
						this.worksItem.subjectCategory = item
						this.worksItem.tag_data['2']=item.id
					break;						
					default:
						break;
				}
				this.popup_show = false
			},
			handledeleteworks(index) {
			  this.worksItem.works.splice(index,1);
			  console.log('作品数组',  this.worksItem.works)
			},
			onInputmanuscripts(e) {
				this.manuscriptsshow = true,
				this.manuscriptsProgress = e
				if(e ===100) {this.manuscriptsshow = false}
				},
				onCallbackmanuscripts(e) {
				if (e.status===200) {
					uni.showToast({
						title: e.msg,
						icon: 'success',
						duration: 2000
					});
					const rawData = JSON.parse(e.responseText)
					this.form.manuscriptsFile=rawData.data
					this.manuscriptstext = e.fileName
					this.manuscriptsshow = false
					this.manuscriptsshowtext = true
				}else{
					uni.showToast({
						title:  e.msg,
						icon: 'error',
						duration: 2000
					});
				}
			},
			onOpenNameDoc(path = '') {
				if (!path) {return;}
				/* 打开文件 */
				this.$refs.lFile.open(path);
			},
			/* 上传 */
			onUpload(item) { 
				/**
				 * currentWebview: 当前webview
				 * url：上传接口地址
				 * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
				 * header: 上传接口请求头
				 */
				 if(this.worksItem.tag_data['2']===''){
                     uni.showToast({
						title: '请先选择题材',
						icon: 'none',
						duration: 2000
					 });  
					 return;
				 }
				this.forUploading = item
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					url: "https://www.peiyinstreet.com/business/chat/batch-upload", //替换为你的
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
			},
			onSuccess(res) {
				if (this.forUploading==='new') {
					this.worksItem.works.push({title:res.fileName, id: res.data.data})
				} else {
					this.worksItem.works.splice(this.forUploading,1,{title:res.fileName, id: res.data.data});
				}
				console.log('上传成功回调',res,this.worksItem.works);
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
.input_text {
	padding-right: 90.58rpx;
}
/* #endif */
</style>
<style lang="scss">
      .home_textarea_box {
        width: 100%;
        .textarea_box {
          margin-top: 25.362rpx;
          width: 100%;
          height: 115.942rpx;
        }
        /* #ifdef H5 */
        .textarea_box {
          margin-top: 25.362rpx;
          width: 100%;
          height: 115.942rpx;
        }
        /* #endif */
        .statistical_box {
          margin-top: 10rpx;
          display: flex;
          justify-content: space-between;
          .textarea_num {
            width: 63.406rpx;
            height: 30.797rpx;
            font-size: 21.739rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 30.797rpx;
          }
          .home_upload_box {
            width: 76.087rpx;
            text-align: right;
            margin-right: 18.116rpx;
            .home_upload {
              text-align: center;
              font-size: 21.739rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              width: 76.087rpx;
              height: 36.232rpx;
              border-radius: 19.928rpx;
              border: 1.812rpx solid #c8c8c8;
            }
          }
        }
      }
.container {
	background: #F2F2F2;
	height: 100%;
	.content {
		background: #ffffff;
		.tabs_item {
			margin-left: 36.232rpx;
			width: 677.536rpx;
			height: 72.464rpx;
			background: #FCFBFC;
			display: flex;
			border-radius: 18.116rpx;
			.tabs_item_list {
				width: 50%;
				display: flex;
				justify-content:center;
				align-items: center;
				.tabs_item1_icon {
					width: 25.362rpx;
					height: 25.362rpx;
				}
				.tabs_item1_text {
					margin-left: 9.058rpx;
					width: 101.449rpx;
					height: 28.986rpx;
					font-size: 25.362rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #999999;
					line-height: 28.986rpx;
				}

			}
			.tabs_item_active {
				width: 50%;
				display: flex;
				justify-content:center;
				align-items: center;
				.tabs_item1_icon {
					width: 25.362rpx;
					height: 25.362rpx;
				}
				.tabs_item1_text {
					margin-left: 9.058rpx;
					width: 101.449rpx;
					height: 28.986rpx;
					font-size: 25.362rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 28.986rpx;
				}
			}
		}
		.set_head_imgbox {
			width: 100%;
			padding: 48.913rpx 0px;
			text-align: center;
			.set_head_img {
				display: inline-block;
				position: relative;
				width: 190rpx;
				height: 190rpx;
				box-shadow: 0px 3.623rpx 30.797rpx 0px rgba(0, 0, 0, 0.1);
				border-radius: 95rpx;	
				.set_head_icon {
				    width: 190rpx;
					height: 190rpx;
					border-radius: 95rpx;	
				}
				.set_head_btn {
					position: absolute;
					bottom: 0rpx;
					right: 18.232rpx;
					width: 47.101rpx;
					height: 47.101rpx;
				}
			}
		}
		.from_item {
		  padding: 0px 36.232rpx;	
		  .from_item_list {
            width: 713.768rpx;
			height: 108.696rpx;
			border-bottom: 1.812rpx solid #F4F4F4;
			display: flex;
			align-items: center;
			.from_item_list_box {
				display: flex;
			    align-items: center;
			}
			.item_title {
                width: 180rpx;
				height: 39.855rpx;
				font-size: 28.986rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 39.855rpx;
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
			margin-top: 59.783rpx;  
			width: 713.768rpx;
			padding-bottom: 45.29rpx;
			.item_title {
                width: 180rpx;
				height: 39.855rpx;
				font-size: 28.986rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 39.855rpx;
			}
		  }
		}
		.worksitem {
		  .worksitem_title {
			padding: 39.855rpx 0rpx 27.174rpx 19.928rpx;  
			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
		  }
		  .worksitem_content {
			 padding: 0px 36.232rpx;
			 background: #FFFFFF;	
             .from_item_list {
					width: 713.768rpx;
					height: 108.696rpx;
					border-bottom: 1.812rpx solid #F4F4F4;
					display: flex;
					align-items: center;
					.from_item_list_box {
						display: flex;
						align-items: center;
					}
					.item_title {
						width: 180rpx;
						height: 39.855rpx;
						font-size: 28.986rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
						line-height: 39.855rpx;
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
					.works_name {
					    width: 390rpx;
						font-size: 28.986rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
					}
					.tool_box {
						display: flex;
						justify-content:flex-end;
						align-items: center;
						.editor_icon {
                          width: 32rpx;
						  height: 32rpx;
						  margin-right: 50.725rpx;
						}
						.delete_icon {
						  width: 32rpx;
						  height: 32rpx;	
						}
					}
			 }
		  }
		}
	}
	.next_step_box {
		width: 100%;
		height: 188.406rpx;
		text-align: center;
		.next_step_btn {
			display: inline-block;
			text-align: center;
			margin-top: 45.29rpx;
			width: 579.71rpx;
			height: 90.58rpx;
			line-height:90.58rpx ;
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
.required_text {
	margin-left: 18.116rpx;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #999999;
}
.uploading {
  background: #F2F2F2;	
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
.editor_WeChat_test {
	width: 554.348rpx;
	text-align: center;
	height: 39.855rpx;
	font-size: 28.986rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #000000;
	line-height: 39.855rpx;
}
.check_WeChat_tips {
	margin:45.29rpx 0;
}
.changeName {
	padding: 0 30rpx;
    width: 483.478rpx;
	height: 101.449rpx;
	background: #F4F4F4;
	border-radius: 14.493rpx;
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
