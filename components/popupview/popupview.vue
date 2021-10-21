<template>
	<view>
		<view class="two_values" v-if="title==='个人'">
				<view class="item">
					<view  v-for="(item,index) in enterpriseList"
					:key="index"
					class="item_list"
					:class="{'boder_none': enterpriseList.length-1 === index}"
					@click="handleListClick(item)"
					>
						{{item.name}}
					</view>
				</view>
				<view class="item_cancel" @click="handleShutDown">取消</view>
		</view>
		<view class="two_values" v-if="title==='头像'">
				<view class="item">
					 <view  
						class="item_list"
						@click="getUserInfo(item)"
					 >
						获取微信头像
					</view>
					<view
					  class="item_list boder_none"
					  @tap="chooseAvatar"
					  >
						从相册中选择
					</view>
				</view>
				<view class="item_cancel" @click="handleShutDown">取消</view>
		</view>
		<view class="two_values" v-if="title==='性别'">
				<view class="item">
					<view  v-for="(item,index) in sexList"
					:key="index"
					class="item_list"
					:class="{'boder_none': sexList.length-1 === index}"
					@click="handleListClick(item)"
					>
						{{item.name}}
					</view>
				</view>
				<view class="item_cancel" @click="handleShutDown">取消</view>
		</view>
		<view class="radio_buttons" v-if="title==='题材'">
			<view class="subject_title_box">
				<view class="subject_title">
					<text class="subject_main">请选择擅长的题材</text>
					<text class="subject_subtitle">（最多可选择3个）</text>
				</view>
				<scroll-view class="subject_list_box" scroll-y>
					<view class="item_subject_list_box">
						<view 
							v-for="(subitem,index) in subjectList"
							class="item_subject_list"
							:key="index"
							:class="{activeClass:selectedIdObj.indexOf(subitem.id)!==-1}"
							@click="handleSubjectIndexTagActive(subitem.id,index)"
						>
						{{subitem.value}}
						</view>
					</view>
				</scroll-view>
				<!-- <view class="subject_list_box">
                   
				</view> -->
		   </view>
		   <view class="btn_box">
               <view class="cancel_btn" @click="handleShutDown">取消</view>
			   <view class="confirm_btn" @click="handlesubjectConfirm">确定</view>
		   </view>
		</view>
		<view class="radio_buttons" v-if="title==='风格'">
			<view class="subject_title_box">
				<view class="subject_title">
					<text class="subject_main">请选择擅长的风格</text>
					<text class="subject_subtitle">（最多可选择3个）</text>
				</view>
				<view class="subject_list_box">
                   <view class="item_subject_list_box">
						<view 
							v-for="(subitem,index) in styleList"
							class="item_subject_list"
							:key="index"
							:class="{activeClass:styleIdObj.indexOf(subitem.id)!==-1}"
							@click="handleStyleTagActive(subitem.id,index)"
						>
						{{subitem.value}}
						</view>
					</view>
				</view>
		   </view>
		   <view class="btn_box">
               <view class="cancel_btn" @click="handleShutDown">取消</view>
			   <view class="confirm_btn" @click="handleStyleConfirm">确定</view>
		   </view>
		</view>
		<view class="radio_buttons" v-if="title==='地区'">
			<view class="picker_view_box">
            <picker-view :indicator-style="indicatorStyle" :value="regionvalue" @change="regionbindChange" class="picker-view">
				<picker-view-column>
					<view class="item" v-for="(item,index) in provinceArray" :key="index">{{item.name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in cityArray" :key="index">{{item.name}}</view>
				</picker-view-column>
           </picker-view>
		   </view>
		   <view class="btn_box">
               <view class="cancel_btn" @click="handleShutDown">取消</view>
			   <view class="confirm_btn" @click="handleConfirmcityClicke">确定</view>
		   </view>
		</view>
		<view class="radio_buttons" v-if="title==='题材类别'">
			<view class="picker_view_box">
            <picker-view :indicator-style="indicatorStyle" :value="categoryvalue" @change="categoryChange" class="picker-view">
				<picker-view-column>
					<view class="item" v-for="(item,index) in subjectList" :key="index">{{item.value}}</view>
				</picker-view-column>
           </picker-view>
		   </view>
		   <view class="btn_box">
               <view class="cancel_btn" @click="handleShutDown">取消</view>
			   <view class="confirm_btn" @click="handleConfirmClicke">确定</view>
		   </view>
		</view>
	</view>
</template>

<script>
import { tagAll,profileProvince,profileCity } from '@/api/index.js'
	export default {
		name:"popupview",
		props: {
			title: {
				type: String,
				default: ''
			},
			dataList: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
			  sexList: [
				  {
					  name: '男',
					  id: 1
				  },
				  {
					  name: '女',
					  id: 2
				  }
			  ],
			  enterpriseList: [
				  {
					  name: '个人',
					  id: 1
				  },
				  {
					  name: '企业',
					  id: 2
				  }
			  ],
			  styleList: [
			  ],
			  subjectList: [

			   ],
			   provinceArray: [],
			   cityArray: [],	
			   value: [1],
			   regionvalue:[0,0],
			   categoryvalue: [0],
			   cvalue:0,
			   indicatorStyle: `height: 50px;`,
			   styleItem: {},
			   cityItem: [],
			   selectedIdObj: [],
			   styleIdObj: []
			};
		},
		watch: {
			dataList: {
				handler(val) {
				  this.editAssignment()
				},
				deep: true
			}
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: 'https://www.peiyinstreet.com/business/chat/upload',
					filePath: path,
					name: 'file',
					complete: (res) => {
						console.log('上传成功', JSON.parse(res.data));
						const item = JSON.parse(res.data)
						this.handleListClick(item.data)
					}
				});
			})
			this.tagAll()
			this.profileProvince()
		},
		methods: {
		  // 编辑赋值
		  editAssignment() {
			if (JSON.stringify(this.dataList)!=='{}') {
				this.dataList.theme.map((items)=>{
				this.selectedIdObj.push(items.id)
				}) 
				this.dataList.style.map((items)=>{
				  this.styleIdObj.push(items.id)	
				})
			} 
		  },
		  // 请求标签
		  async tagAll() {
            const tagAllres = await tagAll()
			this.subjectList = tagAllres.data[0].tags
            this.styleList = tagAllres.data[1].tags
		  },
		  // 获取省数据
		  async profileProvince() {
			const provinceRes = await profileProvince()
			this.provinceArray = provinceRes.data
			profileCity({province_id:110000}).then((res)=>{
				 this.cityArray = res.data
			})
		  },
          handleShutDown() {
            this.$emit('handleShutDown')
		  },
		  handleListClick(item) {
			this.$emit('handleListClick', item)
		  },
		  bindChange: function (e) {
			  const val = e.detail.value
			  this.styleItem = this.styleList[val]
			  console.log(e,val,this.styleItem)
          },
		  categoryChange: function (e) {
			  const val = e.detail.value
			  this.styleItem = this.subjectList[val]
			  console.log(val,this.styleItem)
          },
		  regionbindChange:function (e) {
			  const val = e.detail.value
			  const item = this.provinceArray[val[0]].province_code
              profileCity({province_id:item}).then((res)=>{
				 this.cityArray = res.data
				 this.cityItem = [this.provinceArray[val[0]],this.cityArray[val[1]]]
				 console.log('选中的数组', this.cityItem)
			  })
			  .catch(()=>{

			  })
			 // this.cvalue = val[0]
			//   console.log('选中的数组', this.cityItem)
			 //   this.$emit('handleListClick', styleItem)
          },
		//   图片剪辑
		chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'png',
					}
				})
			},
		  // 标签点击事件
		handleSubjectIndexTagActive(id,index) {
			const selectTags = this.selectedIdObj || []
			const num = selectTags.indexOf(id)
			if (num === -1) { // 该分类未选择该标签
			    if (this.selectedIdObj.length>=3) {
					uni.showToast({
						title: '最多可选择3个',
						icon: 'none',
					})
				} else {
					this.selectedIdObj.push(id)
				}
				return	
			}
			// 该分类已选，需要剔除
			this.selectedIdObj.splice(num, 1)
			console.log('第几个',this.selectedIdObj,num)
			// this.$set(this.selectedIdObj, index, id)
			this.$forceUpdate()
		},
		// 风格标签选择事件
		handleStyleTagActive(id) {
          const selectTags = this.styleIdObj || []
			const num = selectTags.indexOf(id)
			if (num === -1) { // 该分类未选择该标签
			    if (this.styleIdObj.length>=3) {
					uni.showToast({
						title: '最多可选择3个',
						icon: 'none',
					})
				} else {
					this.styleIdObj.push(id)
				}
				return	
			}
			// 该分类已选，需要剔除
			this.styleIdObj.splice(num, 1)
			this.$forceUpdate()
		},
		handleConfirmClicke() {
			  if (JSON.stringify(this.styleItem)=='{}') {
				  this.styleItem = this.subjectList[this.categoryvalue[0]]
			  } 
			  this.$emit('handleListClick', this.styleItem,)
		},
		handleSubjectCategory() {

		},
		handleConfirmcityClicke() {
			  if (this.cityItem.length===0) {
				  this.cityItem = [this.provinceArray[this.regionvalue[0]],this.cityArray[this.regionvalue[1]]]
			  }
              console.log('城市和地区数据',this.cityItem)
			  this.$emit('handleListClick', this.cityItem)
		  },
		  handleAccessImage() {

		  },
		  getUserInfo() {
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
				console.log(obj)
				const item = obj.userInfo.avatarUrl
				this.$emit('handleListClick',item)
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
		  },
		  handlesubjectConfirm() {
			 var subjectItem  = []
			 if ( this.selectedIdObj.length===0) {
				uni.showToast({
					title: '请选择题材',
					icon: 'none',
					duration: 2000
				})
				return
			 } else {
				 this.selectedIdObj.map((items)=> {
					 this.subjectList.map((item)=>{
						 if( item.id == items) {
                           subjectItem.push(item)
						 }
					 })
				 })
			 }
			 console.log('选择的题材',subjectItem)
			 this.$emit('handleListClick', subjectItem)
		  },
		  handleStyleConfirm() {
			 var subjectItem  = []
			 if ( this.styleIdObj.length===0) {
				uni.showToast({
					title: '请选择风格',
					icon: 'none',
					duration: 2000
				})
				return
			 } else {
				 this.styleIdObj.map((items)=> {
					 this.styleList.map((item)=>{
						 if( item.id == items) {
						   console.log()	 
                           subjectItem.push(item)
						 }
					 })
				 })
			 }
			 console.log('选择的风格',this.styleIdObj,subjectItem)
			 this.$emit('handleListClick', subjectItem)
		  }
		}
	}
</script>

<style lang="scss">
 picker-view {
        width: 100%;
        height: 400rpx;
        margin-top:20rpx;
    }

.item {
	line-height: 100rpx;
	text-align: center;
}
.two_values {
		height: 396.739rpx;
		background: #F2F2F2;
		.item {
			width: 721.014rpx;
			margin-left: 14.493rpx;
			height: 219.203rpx;
			background: white;
			.item_list {
              height: 110.507rpx;
			  line-height: 110.507rpx;
			  text-align: center;
			  font-size: 28.986rpx;
			  font-family: PingFangSC-Medium, PingFang SC;
			  font-weight: 500;
			  color: #000000;
			  border-bottom: #F4F4F4 1px solid;
			 
			}
			.boder_none {
				border: none;
			}
		}
		.item_cancel {
				width: 750rpx;
				height: 150.362rpx;
				background: #FFFFFF;
				position: absolute;
				bottom: 0;
                line-height: 72.609rpx;
				text-align: center;
				font-size: 28.986rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
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
.subject_list_box {
	overflow-y: auto;
	width: 100%;
	height: 320.739rpx;
}
.subject_title_box {
	height: 378.623rpx;
	.subject_title {
	  padding: 43.478rpx 43.478rpx 10rpx 43.478rpx;	
      .subject_main {
		height: 25px;
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 25px;
	  }
	  .subject_subtitle {
		height: 20px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 20px;

	  }
	}
	.item_subject_list_box {
		margin-left: 45.29rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
       .item_subject_list {
		margin-right: 30.797rpx;  
		margin-top: 28.986rpx; 
		text-align: center;
		width: 199.275rpx;
		height: 65.217rpx;
		line-height: 65.217rpx;
		background: #F2F2F2;
		border-radius: 32.609rpx;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	  }
	  .activeClass {
		text-align: center;
		width: 199.275rpx;
		height: 65.217rpx;
		line-height: 65.217rpx;
		background: #1274FF;
		border-radius: 32.609rpx;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	  }
	}

}
</style>
