<template>
    <view>
		<u-navbar :is-back="false" title="配音师库" title-size="36.232rpx" title-color="#000000"></u-navbar>
		<view class="teacherlist_box">
		<view class="wrap">
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
					<view class="check_WeChat_tips">分享小程序后，即可查看配音师微信</view>
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
			<view class="pys_popup" v-if="rankingPopShow">
				<view class="popup_conent">
					<image
						class="closeicon"
						src="@/static/home/close.png"
						mode="scaleToFill"
						@click="handleCanceranking"
					/>
					<view>
					<view style="height:17.971rpx">

					</view>
					<view class="rankingbox">
						<view class="rankingtop_text_box">
							<view class="rankingtext">
								<view class="mingci">
									第<text class="mingci_num">{{rankData.id}}</text>位
								</view>
								<view class="tipstitle">您当前排名</view>
							</view>
							<view class="scoretest">
								<view class="jifne">
									{{rankData.score}}分
								</view>
								<view class="tipstitle">您的排序得分</view>
							</view>
						</view>
						<view class="prompt_box">
							<view style="height:43.478rpx"></view>
							<view class="defen">
                              得分 = 访问人数*1 + 点赞人数*3 + 关注人数*5
							</view>
							<view style="height:19.478rpx"></view>
							<view class="defen2">
								得分越高，排名越靠前
							</view>
							<view style="height:36.232rpx"></view>
							<view class="know_btn" @click="handleCanceranking">知道了</view>
						</view>
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
						src="@/static/home/ruku.png"
						mode="scaleToFill"
						/>
					</view>	
					<view class="erweima_box">
					添加客服微信，申请入库
					</view>
					</view>
				</view>
		   </view>
			<view class="u-tabs-box">
				<view>
					<!-- style="width:617rpx" 加上筛选后的长度-->
                   <u-tabs
						activeColor="#1274FF"
						bold
						ref="tabs"
						bg-color="#FFFFFF" 
						inactive-color="#666666" 
						:bar-style="barStyle" 
						name="value" 
						:is-scroll="true"
						:list="tagList.tags" 
						:current="current" 
						swiper-width="617rpx"
						@change="change" 
						font-size='28.362'
					></u-tabs>
				</view>
				  <!-- <view class="screening_btn_box" @click="handleScreening">
					  <view class="screening_btn">
                        <text class="screening_text">筛选</text>
						<image
							class="screening_icon"
							src="@/static/teacherlist/screening.png"
							mode="scaleToFill"
						/>
					  </view>
				  </view> -->
			</view>
			<view class="price_screening_box">
				<view class="price_item" :class="activeIndex==index ? 'activeClass' : ''" v-for="(item,index) in priceList" :key="index" @click="handlePriceScreening(index)">
                 {{item}}
				</view>
			</view>
				<scroll-view scroll-y style="height: 100%;width: 100%;"
				    @refresherrefresh="handlere(current)"
					:refresher-enabled="true" 
					:scroll-top="scrollInto"
					@scroll="tabScoll"
					@scrolltolower="reachBottom"
					:refresher-triggered="triggered">
					<view class="page-box" v-if="defaultshow">
						<view class="teacherOrder" v-for="orderItem in dataList" :key="orderItem.id">
							<view class="teacher_top_Introduction">
								<view class="teacher_top_Introduc" @click="handleVisitorsJump(orderItem)">
								<view class="top_Introduction_left">
									<image
										class="teacher_portrait"
										:src="orderItem.teacher.avatar"
										mode="scaleToFill"
									/>
									<!-- <view class="online"></view> -->
								</view>
								<view class="top_Introduction_contenr">
									<view class="teacher_nikeName">
										<text class="teacher_nikeName_text u-line-1">{{orderItem.teacher.nickname}}</text>
										<image
											v-if="orderItem.teacher.sex === 1"
											class="teacher_sex"
											src="@/static/teacherlist/manicon.png"
											mode="scaleToFill"
										/>
										<image
											v-else-if="orderItem.teacher.sex === 2"
											class="teacher_sex"
											src="@/static/teacherlist/woman.png"
											mode="scaleToFill"
										/>
										<image
											v-else-if="orderItem.teacher.sex === 3"
											class="teacher_sex"
											src="@/static/teacherlist/qi.png"
											mode="scaleToFill"
										/>
										<image
											class="listleft"
											src="@/static/carddetails/listleft.png"
											mode="scaleToFill"
										/>
									</view>
									<view class="price_text">
										<text v-if="orderItem.unit_price!=''" class="text_exclusive">专享价</text>
										<text v-if="orderItem.unit_price!=''" class="text_price">{{orderItem.unit_price}}元/百字</text>
										<text v-if="orderItem.unit_price==''" class="text_price">价格私聊</text>
									</view>
								</view>
								</view>
								<view class="top_Introduction_right">
									<view v-if="!orderItem.type" class="checkWeChat" @click="handleInviteDubbing(orderItem)">查看微信</view>
									<view v-else class="reg_group" @click="downloadcopy(orderItem.teacher.wechat_number,'复制成功，添加时备注：名片')">复制微信</view>
								</view>
							</view>
							<view class="teacher_bot_voices">
								<view class="teacher_play_box" @click="playTheMusic(orderItem)">
                                  <image
									class="teacher_play_icon"
									:src="orderItem.playStatus ? playActive : play"
									mode="scaleToFill"
									/>
									<view class="service_name u-line-1">
										{{orderItem.works.title}}
									</view>
								</view>
								<view class="download_iconbox" @click="downloadcopy(orderItem.works.url,'下载链接已复制到剪贴板')">
                                  <image
										class="download_icon"
										src="@/static/teacherlist/download.png"
										mode="scaleToFill"
									/>
								</view>
							</view>
						</view>
						<view v-if="has_next===false" class="defaltext">没有更多了</view>
						<u-loadmore v-if="has_next===true" status="loading" bgColor="#f2f2f2"></u-loadmore>
					</view>
					<view v-if="!defaultshow" class="page-box">
						<view class="defaltPage">
							<!-- <image
								class="defaltPageimg"
								src="@/static/ui/defaultPage/d1.png"
								mode="scaleToFill"
							/> -->
							<view class="defaltext">暂无匹配数据</view>
						</view>
					</view>
					<view style="height:220px"></view>
				</scroll-view>
		
		</view>
		<view v-if="cardstatus==1" class="applystorage" @click="handleVicTer">
			<view class="applystorage_btn">
				<view class="shenqing">申请入库</view>
				<view class="gengduo">让更多客户听见你</view>
			</view>
		</view>
		<!-- <u-popup v-model="sharePopShow" :mask-close-able="true" border-radius="10" mode="center" width="519.71rpx" height="306.087rpx">
			<view>
			  <view style="height:57.971rpx"></view>	
              <view class="check_WeChat_test">
					查看微信
				</view>
				<view class="check_WeChat_tips">分享小程序后，即可查看配音师微信</view>
				<view class="share_btn_box">
					<button
						class="cancelSharebtn"
						hover-class="button-hover"
						@tap="handleCanceShare"
					>
					取消	 
					</button>
					<button
						class="sharebtn"
						open-type="share"
						hover-class="button-hover"
					>
					分享给朋友	 
					</button>
				</view>
			</view>
		</u-popup> -->
		<!-- <u-popup v-model="erweimaShow" :mask-close-able="true" border-radius="10" mode="center" width="557.971rpx" height="625rpx">
			<view class="erweimabox">
			   <view class="erweima_iconbox" @click="handlecloseerweima">
				<view class="close_iconbox">
					<image
						class="close_icon"
						src="@/static/home/close.png"
						mode="scaleToFill"
						/>
				</view>
				<view style="height:41.667rpx"></view>   
				<image
			       class="erweima_icon"
				   src="@/static/home/erweima.jpeg"
				   mode="scaleToFill"
			     />
			   </view>	
			   <view class="erweima_box">
				  添加客服微信，入驻小站
			   </view>
			</view>
		</u-popup>	 -->
		<u-popup v-model="screeningShow" :mask-close-able="true" mode="right" width="612.319rpx">
		<view class="popup_content_box">
			<scroll-view scroll-y="true" style="height: 75%;">
				<view class="selection_listbox">
					<view v-for="(item,index) in screenTag" :key="index">
                      <view class="item_name">{{item.value}}</view>
					  <view class="item_tag_box">
						<view 
							class="item_tag"
							:class="{activeClass:!selectedIdObj[item.id][0]}"
							@click="handleSubjectIndexTagAll(item.id)"
							>
							全部
						</view>  
						<view 
							class="item_tag"
							v-for="(tagitem,tagIndex) in item.tags"
							:key="tagIndex" 
							:class="{activeClass:(selectedIdObj[item.id]||[]).indexOf(tagitem.id)!==-1}"
							@click="handleSubjectIndexTagActive(item.id,tagitem.id)"
							>
							{{tagitem.value}}
						</view>
					  </view>
					</view>
				</view>
			</scroll-view>
			<view class="confrim_btn_box">
				<view class="cancel_btn" @click="handletagCancel">取消</view>
				<view class="confrim_btn" @click="handletagQuery">确定</view>
			</view>
		</view>
	    </u-popup>
		<!-- <u-popup v-model="submitShow" mode="bottom" height="804.348rpx">
			<submit-form ref="submitform" :subTitle="false" btnText="立即邀请"></submit-form>
	   </u-popup> -->
	   <view v-if="audioShow" class="home_musicSrc_box disappear">
        <musicAudio 
		  ref="musicAudio"
		  :url="dataPlay.works.url"
		  :autoplay="true"
		  :portrait="dataPlay.teacher.avatar"
		  :music_title="dataPlay.works.title"
		  @handleChangePlay="handleChangePlay"  
		  @musicClose="musicClose"
		  ></musicAudio>
	  </view>
	  <view v-if="cardstatus===2" class="applystorage" @click="handlerankingPopShow">
			<view class="rankbtn">
				查看当前排名
				<!-- <view class="gengduo">让更多客户听见你</view> -->
			</view>
	  </view>
	</view>
	</view>
</template>

<script>
import { homeConfig,serviceLits,profileShare,tagAll,serviceRank } from "@/api/index.js"
import play from '@/static/home/play.png'
import playActive from '@/static/home/playActive.png'
import submitForm from '@/components/submitform/submitform.vue'
import musicAudio from '@/components/audio/audioplay.vue'
import uniCopy from '@/utils/uni-copy.js'
import { mapState, mapActions } from "vuex";
import sharetubiao from '@/static/home/sharetubiao.png'
export default {
	components: {
		submitForm,
		musicAudio
	},
	data() {
		return {
			orderList: [],
			dataList: [],
			play: play,
			sharePopShow: false,
			erweimaShow: false,
			playActive: playActive,
			tagList: [],
			screenTag: [],
			scrollInto: 0,
			scrollTop: 0,
			tagParameter: {
				sort: {},
				page: 1,
				size: 10,
				type: 0,
				tag_data: {}
			},
			list: [
				{
                  name: '热门推荐',
				  id: 1
				},
				{
				  name: '宣传片',
				  id: 2
				},
				{
				  name: '专题片',
				  id: 3
				},
				{
				  name: '广告',
				  id: 4
				},
				{
				  name: '影视配音',
				  id: 5
				},
				{
				  name: '动漫',
				  id: 6
				},
				{
				  name: '影视配音',
				  id: 7
				},
				{
				  name: '动漫',
				  id: 8
				}],
			priceList: [
				'不限',
                '中级≤20元',
				'高级30元-40元',
				'特级≥50元',
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			playStatus: false,
			dx: 0,
			activeIndex: 0,
			rankingPopShow: false,
			selectedIdObj: {},
			barStyle: {
				backgroundColor: '#1274FF',
			},
			voiceTeacherId: '',
			countdown:[],
			has_next: '',
			tagDatas: {},
            defaultshow: true,
			loadmore: false,
			screeningShow: false,
			triggered: false,
			submitShow: false,
			audioShow: false,
			cardstatus: '',
			rankData: {},
			dataPlay: {
				works: {
                  url: ''
				}	
			},
			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
		};
	},
	onLoad(options) {
		this.getUnionid()
		this.cardstatus = uni.getStorageSync('status')
		console.log('status', this.cardstatus)
	},
	computed: {
      ...mapState("user", ["token", "userInfo"]),
    },
	onHide() {
	  this.musicClose()	
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {// 来自页面内分享按钮
		    console.log(res.target)
		}
		this.sharePopShow = false
		var str = {
			type: 0,
			teacher_id: this.voiceTeacherId, 
		}
		profileShare(str).then((res)=>{
          console.log(res)
		  this.dataList.map((item)=>{
			  if(item.teacher_id===this.voiceTeacherId){
				  item.type = true
			  }
		  })
		//   this.getOrderList(this.tagParameter,this.current)
		}).catch((err)=>{
          console.log(err)
		})
		return {
			title: '配音师库',
			imageUrl: '',
			complete: function(res) {
				console.log('分享成功', res)
			},
		}
	},
	methods: {
		...mapActions("user", ["login"]),
		getUnionid() {
			uni.login({
				provider: "weixin",
				success: async (result) => {
				  await this.login(result.code);
				  this.handleList()
				// this.getAllteacher()
				},
				fail: (error) => {
				console.log("登录失败", error);
				},
			});
		},
		// 价格筛选
		handlePriceScreening(index) {
          this.activeIndex = index
		  this.tagParameter.page = 1
		  this.tagParameter.type = this.activeIndex
		  this.getOrderList(this.tagParameter,this.current)
		},
		handleScreening() {	
		  this.screeningShow = true
		},
		// 跳转配音师名片
		handleVisitorsJump(orderItem) {
		   console.log('配音师列表',orderItem.teacher_id)	
           uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist?id='+orderItem.teacher_id })
		},
		async handleList() {
		  const res1 = await homeConfig()
		  const res = await tagAll()
		  this.screenTag = res.data
		  const tagListArr = res.data.filter(item=>{
			  this.$set(this.selectedIdObj,item.id,[])
              return item.value == '题材'
		  })
		  var allList = {
			    created_at: "2021-05-26 21:37:08",
				filter: 0,
				id: 0,
				sort: 0,
				type_id: 0,
				value: "全部"
		  }
		  console.log('tags', tagListArr)
		  const a = this.$u.deepClone(tagListArr[0])
		  a.tags.unshift(allList)
		  console.log('tags', a)
		  this.tagList = a
		  this._freshing = false;
		  setTimeout(() => {
			this.triggered = true;
		  }, 100)
		  // this.list = res.data
		//   this.getOrderList(0)

		},
		handlere(idx) {
		 this.triggered = true
		 if (idx === 0) {
			var tagData = {

		     }
		 } else {
			 var tagData = {
                 '2': [this.tagList.tags[idx].id]
		     }
		 }
		  this.tagParameter = {
				sort: {},
				page: 1,
				size: 10,
				type: 0,
				tag_data: tagData
			}
		 this.getOrderList(this.tagParameter,idx)
		},
		// 点击所有标签
		handleSubjectIndexTagAll(index) {
		  this.$set(this.selectedIdObj, index, [])
		  this.$forceUpdate()
		},
		// 标签点击事件
		handleSubjectIndexTagActive(index,id) {
			const selectTags = this.selectedIdObj[index] || []
			const num = selectTags.indexOf(id)
			if (num === -1) { // 该分类未选择该标签
				selectTags.push(id)
				this.$set(this.selectedIdObj, index, selectTags)
				this.tagDatas = this.selectedIdObj
				return
			}
			// 该分类已选，需要剔除
			selectTags.splice(num, 1)
			this.$set(this.selectedIdObj, index, selectTags)
			this.tagDatas = this.selectedIdObj
			this.$forceUpdate()
		},
		// 查看微信
		handleInviteDubbing(item) {
			// console.log('配音师资源ID',item)
			this.voiceTeacherId=item.teacher_id
			this.sharePopShow = true
			// this.$refs.submitform.hadleUpdate()
		},
		handleCanceShare() {
			this.sharePopShow = false
			uni.showShareMenu({
			  title: '配音师资源',
		  })
		},
		handletagQuery() {
			this.screeningShow = false
			this.triggered = true
			  this.tagParameter = {
					sort: {},
					page: 1,
					size: 10,
					type: 0,
					tag_data: this.selectedIdObj
			  }
			  this.current = 0
			  this.getOrderList(this.tagParameter,this.current)
		},
		// 取消选择，收回弹窗
		handletagCancel(){
		  this.screeningShow = false
		},
		async reachBottom() {
			if (this.has_next) {
				var pages = this.tagParameter.page+1;
				this.tagParameter = {
					sort: {},
					page: pages,
					size: 10,
					type: this.activeIndex,
					tag_data: this.tagDatas
				}
				// const res = await getDemandList({
				// 	state: this.list[idx].id
				// })
				const res = await serviceLits(this.tagParameter)
				console.log('res新数据',res)
				this.triggered = false
				if (res.data.length==this.tagParameter.size) {
					this.has_next = true
				} else {
					this.has_next = false
				}
				res.data.map((item)=>{
					item.playStatus = false
					this.dataList.push(item)
				})
				if (this.dataList.length===0) {
					this.defaultshow = false
				} else {
					this.defaultshow = true
					this.loadmore = true
				}
				
			}else {
			
			}
		},
		// 显示排名
		handlerankingPopShow() {
		  serviceRank(this.tagParameter).then((res)=>{
			  console.log('成功')
			  this.rankData = res.data
			  this.rankingPopShow = true
		  }).catch((err)=>{
			  console.log('失败')
			  uni.showToast({
					title: err.errmsg,
					icon: 'none'
			 }) 
		  })
		},
		handleCanceranking() {
			this.rankingPopShow = false
			uni.showShareMenu({
			  title: '配音师资源',
		  })
		},
		// 音乐播放按钮
		playTheMusic(orderItem) {
		  console.log(orderItem)	
		  this.audioShow = true
		  if(this.dataPlay.works.url === orderItem.works.url) {
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
		// 页面数据
		async getOrderList(item,idx) {
			const tagParameter = {
				sort: item.sort,
				page: item.page,
				size: item.size,
				type: this.activeIndex,
				tag_data: item.tag_data
			}
			// const res = await getDemandList({
			// 	state: this.list[idx].id
			// })
			const res = await serviceLits(tagParameter)
			this.triggered = false
			res.data.map((item)=>{
				item.playStatus = false
			})
			if (res.data.length==tagParameter.size) {
					this.has_next = true
				} else {
					this.has_next = false
				}
			this.dataList = res.data
			// this.has_next = res.data.has_next
			if (this.dataList.length===0) {
				this.defaultshow = false
			} else {
				this.defaultshow = true
				this.loadmore = true
			}
			this.scrollInto = this.scrollTop
			setTimeout(()=>{
              this.scrollInto = 0
			},0)
			// this.$set(this.orderList, idx, this.dataList)
		},
		musicClose() {
          this.dataList.map((item)=>{
                item.playStatus = false
		    })
		  this.audioShow = false	
		  this.dataPlay =  {
				works: {
                  url: ''
				}
			}
		},
		// tab栏切换
		change(index) {
			console.log('scrollInto', this.scrollInto)
			this.current = index;
				if (index === 0) {
					var tagData = {}
				} else {
				var tagData = {
					'2': [this.tagList.tags[index].id]
				}
			}
			this.tagDatas = tagData
			this.tagParameter = {
					sort: {},
					page: 1,
					size: 10,
					type: this.activeIndex,
					tag_data: tagData
				}
			this.getOrderList(this.tagParameter,index)
		},
		// 配音师入驻
		handleVicTer() {
			this.erweimaShow = true
		},
		handlecloseerweima() {
			this.erweimaShow = false
		},
		tabScoll(e) {
		  this.scrollTop = e.detail.scrollTop;
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
		}
	}
};
</script>
<style lang="scss">
page{
	min-height: 100%;
	overflow: hidden;
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
/* #endif */
</style>
<style lang="scss" scoped>
.defaltext {
	margin-top: 30rpx;
	text-align: center;
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #717171;
	line-height: 16px;
}
.teacherlist_box {
	position: relative;
	.home_musicSrc_box {
		position: absolute;
		bottom: 240rpx;
		z-index: 9999;
	}
}
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
.u-tabs-box {
	min-height: 88.768rpx;
    background: white;
    position: relative;
    // width: 617.754rpx;
	.screening_btn_box {
	  background: #FFFFFF;
	  height: 100%;
      position: absolute;
	  right: -142.246rpx;
	  top: 0;
	  display: flex;
	  align-items: center;
	  width: 143.246rpx;
	  .screening_btn {
		     width: 101.449rpx;
			height: 43.478rpx;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			margin-top: -10rpx;
			margin-left: 10rpx;
			justify-content: center;
			align-items: center;
			text-align: center;
			border-radius: 21.739rpx;
			border: #666666 1px solid;
	  }
	//   top: 50%;
	//   align-items: center;
    //   transform: translate(-50%, -50%); 
	  .divider {
		  margin-left: 5rpx;
		  width: 9.058rpx;
		  height: 47.101rpx;
	  }
	  .screening_text {
		// margin-left: 16.304rpx;  
		width: 50.725rpx;
		height: 36.232rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 36.232rpx;
	  }
	  .screening_icon {
		  margin-left: 7.246rpx;
		  width: 21.739rpx;
		  height: 21.739rpx;
		  font-size: 36.232rpx;
	  }
	}
}
.price_screening_box {
  width: 100%;
  padding: 27.174rpx;
  display: flex;
  justify-content: space-between;
  .price_item{
	padding: 0 23.551rpx;
	height: 50.725rpx;
	line-height: 50.725rpx;
	background: #FFFFFF;
	border-radius: 25.362rpx;
	font-size: 21.739rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #666666;
  }
  .activeClass {
	background: #2E2E2E ;
	color: #FFFFFF;
  }
}
.teacherOrder {
	margin-left: 27.174rpx;
	padding: 36.232rpx 27.174rpx;
    width: 695.652rpx;
	height: 264.493rpx;
	background: #FFFFFF;
	border-radius: 25.362rpx;
	margin-bottom: 21.739rpx;
    .teacher_top_Introduction{
		display: flex;
		.teacher_top_Introduc{
			display: flex;
		}
		.top_Introduction_left{
			position: relative;
			width: 76.087rpx;
			height: 76.087rpx;
			.teacher_portrait {
			  width: 76.087rpx;
			  height: 76.087rpx;	
			  border-radius: 38.043rpx;
			}
			.online {
				position: absolute;
				bottom: 0;
				right: 0;
				width: 21.739rpx;
				height: 21.739rpx;
				border-radius: 10.87rpx;
				background: #26DA52;
				border: 3.623rpx solid #FFFFFF;
			}
		}
		.top_Introduction_contenr{
			margin-left: 18.116rpx;
			width: 387.681rpx;
		.teacher_nikeName_text{
			max-width: 300rpx;
			height: 22px;
			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 22px;
		}
		.teacher_sex {
			margin-left: 5rpx;	
			width: 25.362rpx;
			height: 25.362rpx;
		}
		.listleft {
		 margin-left: 15rpx;	
          width: 25.362rpx;
		  height: 25.362rpx;
		}
	    }
		.top_Introduction_right {
			.checkWeChat {
                margin-top: 5.058rpx;
				text-align: center;
				width: 159.42rpx;
				height: 65.217rpx;
				background: #1274FF;
				border-radius: 32.609rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 65.217rpx;
			}
			.reg_group {
				 margin-top: 5.058rpx;
				text-align: center;
				width: 159.42rpx;
				height: 65.217rpx;
				background: #F3F4F9;
				border-radius: 32.609rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 65.217rpx;
			}
		}
	}
	.teacher_bot_voices {
	  margin-top: 25.362rpx;	
	  width: 639.493rpx;
	  height: 90.58rpx;
	  display: flex;
	  align-items: center;
	//   padding: 0 23.551rpx;
	  position: relative;
	  background: #F1F3F7;
	  border-radius: 6px;
	  .teacher_play_box {
		 height: 100%;
		 display: flex;
	     align-items: center;
	  }
	  .teacher_play_icon {
		  width: 83.333rpx;
		  height: 83.333rpx;
	  }
	  .service_name {
        width: 513.304rpx;
		height: 36.232rpx;
		// margin-left: 16.304rpx;
		margin-top: 5rpx;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
		line-height: 36.232rpx;
	  }
	  .download_iconbox {
		height: 100%;
		width: 54.609rpx;
		height: 28.986rpx; 
	  }
	  .download_icon{
		  width: 32.609rpx;
		  height: 28.986rpx;
	  }
	}
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
.popup_content_box {
	height: 100%;
	.selection_listbox {
		padding:0rpx 18.116rpx 0rpx 32.609rpx;
	  .item_name {
		margin-top: 43.478rpx;  
		width: 28px;
		height: 20px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 20px;
	  }
	  .item_tag_box {
        display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		.item_tag {
			margin-top: 21.739rpx;
			margin-right: 18.116rpx;
			// margin: 21.739rpx ;
			text-align: center;
			font-size: 21.739rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			width: 123.188rpx;
			height: 50.725rpx;
			line-height: 50.725rpx;
			background: #F3F4F9;
			border-radius: 27.174rpx;
		}
		 .activeClass {
			background: #1274FF;
			color: #FFFFFF;
		}
	  }
	}
	.confrim_btn_box {
		margin-top: 36.232rpx;
		display: flex;
		.cancel_btn {
			margin-left: 32.609rpx;
			text-align: center;
			font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #999999;
			width: 264.493rpx;
			height: 79.71rpx;
			line-height: 79.71rpx;
			background: #FFFFFF;
			border-radius: 39.855rpx;
			border: 1px solid #DEDEDE;
		}
		.confrim_btn {
			margin-left: 18.116rpx;
			text-align: center;
			width: 264.493rpx;
			height: 79.71rpx;
			line-height: 79.71rpx;
			background: #1274FF;
			border-radius: 39.855rpx;
            font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
}
.defaltPage {
	.defaltPageimg {
		margin-top: 200rpx;
		margin-left: 225rpx;
		width: 300rpx;
		height: 300rpx;
	}
	.defaltext {
		margin-top: 70rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #717171;
		line-height: 16px;
	}

}
.margintop10 {
	margin-top: 18.116rpx;
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
.customer_service_box {
	position: absolute;
	top: 1014.493rpx;
	right: 0;
	text-align: center;
	width: 206.522rpx;
	height: 79.71rpx;
	line-height: 75.71rpx;
	background: #FFFFFF;
	box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
	border-radius: 57.971rpx 0px 0px 57.971rpx;
	border: 1px solid #EDEDED;
	.service_icon {
		margin-left: 5rpx;
		width: 35.188rpx;
		height: 35.279rpx;
		margin-right: 5.435rpx;
		margin-bottom: -8.623rpx;

	}
	.service_text {
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
		line-height: 36.232rpx;
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
.applystorage {
	position: fixed;
	bottom: 70.391rpx;
	width: 100%;
	text-align: center;
	.rankbtn {
        display: inline-block;
		width: 579.71rpx;
		height: 94.203rpx;
		line-height: 94.203rpx;
		text-align: center;
		background: #1274FF;
		box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
		border-radius: 30px;
		font-size: 32.609rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	.applystorage_btn {
		display: inline-block;
		width: 579.71rpx;
		height: 94.203rpx;
		text-align: center;
		background: #1274FF;
		box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
		border-radius: 30px;
        .shenqing{
			margin-top: 10rpx;
           font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
		.gengduo{
			font-size: 18.116rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}

	}

}
.rankingbox {
	.rankingtop_text_box{
		display: flex;
		justify-content: center;
		.rankingtext{
			width: 271.739rpx;
			.mingci {
                text-align: center;
				height: 50.725rpx;
				font-size: 36.232rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 50.725rpx;
				.mingci_num {
					color: #1274FF;
				}
			}
			.tipstitle {
				text-align: center;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 36.232rpx;
			}

		}
		.scoretest {
			width: 271.739rpx;
			.jifne {
			    text-align: center;
				height: 50.725rpx;
				font-size: 36.232rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 50.725rpx;	
			}
			.tipstitle {
				text-align: center;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 36.232rpx;
			}
		}
	}
	.prompt_box {
	  margin-top: 38.043rpx;
	  width: 543.478rpx;
	  height: 271.739rpx;
	  background: #F4F4F4;
	  border-radius: 14.493rpx;
	  text-align: center;
	  .defen {
		text-align: center;
		height: 30.797rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 30.797rpx;
	  }
	  .defen2 {
		text-align: center;
		height: 30.797rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 30.797rpx;
	  }
	  .know_btn {
		display: inline-block;
		width: 304.348rpx;
		height: 79.71rpx;
		line-height: 79.71rpx;
		background: #1274FF;
		box-shadow: 0px 14.493rpx 18.116rpx 0px rgba(18, 70, 255, 0.18);
		border-radius: 39.855rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	  }
	}
}
</style>
