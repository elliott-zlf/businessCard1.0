<template>
  <view class="container">
    <u-navbar
      :is-back="true"
      title="需求详情"
      title-size="36.232rpx"
      :border-bottom="true"
      title-color="#000000"
      :custom-back="handleGoBack"
    ></u-navbar>
    <view class="content">
		<!-- 入库二维码 -->
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
				<!-- <view class="check_WeChat_test">
					申请入库
				</view> -->
				<view class="check_WeChat_tips" style="margin-bottom: 76.232rpx;">资料完整度不够，<br/>请先创建名片并上传作品</view>
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
    <view class="pys_popup" v-if="orderShow">
			<view class="popup_conent">
				<image
					class="closeicon"
					src="@/static/home/close.png"
					mode="scaleToFill"
					@click="handlecloseerweima"
				/>
				<view>
				<view style="height:17.971rpx"></view>	
				<!-- <view class="check_WeChat_test">
					申请入库
				</view> -->
				<view class="check_WeChat_tips" style="margin-bottom:76rpx">确认要提前结束需求吗</view>
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
							@click="handlebuEndOrder"
						>
						确认
						</button>
				</view>
				</view>
			</view>
		</view>
      <view class="demand_box">
        <scroll-view
          class="voice_list"
          scroll-y
          @refresherrefresh="handlere()"
          :refresher-enabled="true"
          :scroll-top="scrollInto"
          @scroll="tabScoll"
          @scrolltolower="reachBottom"
          :refresher-triggered="triggered"
        >
          <view class="order_list">
            <view class="order_title_box" @click="handleVisitorsJump(orderData)">
              <view class="orderimg_box">
                  <image
                  class="headPortrait"
                  :src="orderData.avatar"
                  mode="scaleToFill"
                />
              </view>
              <view class="nickname_box">
                <view class="vio_name">
                  <view class="nickname u-line-1">
                  {{orderData.nickname || ''}}
                </view>
                </view>
                <view class="creation_date">{{orderData.create_time || ''}}</view>
              </view>
              <view class="budget_box">
                  <text class="price">￥{{orderData.total || '私聊'}}</text>
              </view>
            </view>
            <view class="order-content">
              <view class="order-label_item">
                <view class="order_label">标题</view>
                <view class="order_text u-line-1">{{orderData.title}}</view>
              </view>
              <view class="order-label_item">
                <view class="order_label">描述</view>
                <view class="order_text">
                  {{orderData.content || ''}}
                </view>
              </view>
            </view>
      <view class="bottom_line"></view>
      <view class="countdown_num_box">
        <view v-if="orderData.status===0">
          <text class="countdown_num">倒计时：</text>
          <u-count-down class="countdown_num" :timestamp="orderData.end_time" font-size = '25.362' separator-size="25.362" separator-color="#FFA006" separator="zh" color='#FFA006'></u-count-down>
        </view>
        <view v-if="orderData.status===1">
          <text class="countdown_num_end">倒计时：</text>
          <u-count-down class="countdown_num" :timestamp="0" font-size = '25.362' separator-size="25.362" separator-color="#a09a9a" separator="zh" color='#a09a9a'></u-count-down>
        </view>
      </view>
      <view class="delivery_btn_box" v-if="orderData.status===0">
        <view v-if="orderData.cate===0">
           <view v-if="orderData.type ===0" class="delivery_btn" @click.stop="handlebuSinessCard(orderData.id)">我要报名</view>
				   <view v-if="orderData.type ===1"  class="end_btn">我已报名</view>
        </view>
        <view v-if="orderData.cate===1">
           <view class="delivery_btn" @click.stop="handlebuEndorderShow(orderData.id)">提前结束需求</view>
        </view>
			</view>
			<view class="delivery_btn_box"  v-if="orderData.status===1">
				<view class="end_btn" >已结束</view>
			</view>
          </view>
          <view class="divider">
            <view class="line"></view>
            <view class="text">{{orderData.teacher_count || 0}}人已报名</view>
            <view class="line"></view>
          </view>
          <view
            class="voice_item"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <image
              v-if="item.status === 1 && orderData.cate!==1"
              class="zhongbiao"
              src="@/static/home2/zhongbiao.png"
              mode="scaleToFill"
            />
            <view class="head_portrait_box" @click="playTheMusic(item.teacher)">
              <image
                class="head_portrait_img"
                :src="item.teacher.avatar"
                mode="aspectFill"
              />
              <image
                class="home_play"
                :src="item.teacher.works.playStatus ? playActive : play"
                mode="scaleToFill"
              />
              <view class="head_portrait_meng"></view>
            </view>
            <view class="voice_introduce">
              <view class="voice_name">
                <view class="rank" v-if="index < 9">{{
                  "0" + (index + 1)
                }}</view>
                <view class="rank" v-else>{{ index + 1 }}</view>
                <view class="name u-line-1" @click="handleVisitorsJump(item)">
                  {{item.teacher.nickname}}
                </view>
                <image
                  v-if="item.teacher.sex === 1"
                  class="sex"
                  src="@/static/teacherlist/manicon.png"
                  mode="scaleToFill"
                />
                <image
                  v-else-if="item.teacher.sex === 2"
                  class="sex"
                  src="@/static/teacherlist/woman.png"
                  mode="scaleToFill"
                />
                <image
                  v-else-if="item.teacher.sex === 3"
                  class="sex"
                  src="@/static/teacherlist/qi.png"
                  mode="scaleToFill"
                />
                <view v-if="orderData.cate===1" :class="[item.status === 0 ? 'winning':'nowinning']" @click.stop="handleorderBid(item.id)">
                  {{item.status === 0 ? '操作中标':'已中标'}}
                </view>
              </view>
              <view @click="handleVisitorsJump(item)">
                <view class="numberworks">
                  <text class="workscount"
                    >作品数{{ item.teacher.work_count }}</text
                  >
                  <text class="playcount"
                    >播放量{{ item.teacher.browse_count }}</text
                  >
                </view>
                <view class="tagNum">
                  <view
                    v-for="(tagitem, tagindex) in item.teacher.tags"
                    :key="tagindex"
                  >
                    <view v-if="tagitem.type_id === 5" class="tag">
                      {{ tagitem.value }}
                    </view>
                  </view>
                </view>
                <view class="jianjie u-line-1">
                  {{ item.teacher.intro }}
                </view>
              </view>
            </view>
          </view>
          <!-- <view v-if="has_next === false" class="defaltext">没有更多了</view> -->
          <u-loadmore
            v-if="has_next === true"
            style="margin-top: 30px"
            status="loading"
            bgColor="#f2f2f2"
          ></u-loadmore>
          <!-- <view v-if="defaultshow" class="page_box">
            <view class="defaltPage">
              <view class="defaltext">暂无匹配数据</view>
            </view>
          </view> -->
          <view class="toushu_box">
            <button  class="invitationBtn" open-type="contact" send-message-title="联系客服" :show-message-card="true">
                <image
                  class="toushu"
                  src="@/static/home2/toushu.png"
                  mode="scaleToFill"
                />
                <text class="toushu_text">投诉</text>
            </button>
          </view>
          <view style="height: 180px"></view>
        </scroll-view>
      </view>
    </view>
	  <view v-if="audioShow" class="home_musicSrc_box disappear">
        <musicAudio 
        ref="musicAudio"
        :url="dataPlay.works.url"
        :autoplay="true"
        :portrait="dataPlay.avatar"
        :music_title="dataPlay.works.title"
        @handleChangePlay="handleChangePlay"  
        @musicClose="musicClose"
        >
      </musicAudio>
	 </view>
   <view class="share_box">
     <button  class="invitationBtn" id="shou" open-type="share">
       <image
         class="share_icon"
         src="@/static/carddetails/shareicon.png"
         mode="scaleToFill"
       />
     </button>  
   </view>
  </view>
</template>

<script>
import { orderdetails,orderteacher,orderdelivery,orderEnd,orderBid } from '@/api/myneeds.js'
import { mapState, mapActions } from "vuex";
import play from "@/static/teacherlist/paly2.png";
import musicAudio from "@/components/audio/audioplay.vue";
import playActive from "@/static/teacherlist/palyActive2.png";
export default {
  components: {
	musicAudio
  },	
  data() {
    return {
      play: play,
      playActive: playActive,
      current: 0,
      has_next: "",
      tagParameter: {
        page: 1,
        size: 10,
        id: ""
      },
      zhongbiao: false,
      dataList: [],
      dataPlay: {
        works: { url: "" },
      },
      navTitle: "",
      orderData: {},
      userStatus: null,
      rankingPopShow: false,
      defaultshow: false,
      audioShow: false,
      triggered: false,
      scrollInto: 0,
      scrollTop: 0,
      notputShow: false,
      orderShow: false,
	    orderId: '',
    };
  },
  computed: {
    ...mapState("user", ["token", "userInfo"]),
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
    this.orderId = options.id;
    this.getUnionid();
  },
  onHide() {
    this.musicClose();
  },
  methods: {
    ...mapActions("user", ["login"]),
    getUnionid() {
      uni.login({
        provider: "weixin",
        success: async (result) => {
          await this.login(result.code);
          this.tagParameter.id = this.orderId;
		      this.getOrderdetails()
          this.getVoicelist();
        },
        fail: (error) => {
          console.log("登录失败", error);
        },
      });
    },
    // 订单数据
	getOrderdetails() {
	  orderdetails({id:this.orderId}).then((res)=>{
		  console.log('订单数据',res)
		  this.orderData = res.data
      this.getVoicelist();
	  })
	},
  handlebuEndorderShow() {
    this.orderShow = true
  },
  // 提前结束订单
  handlebuEndOrder() {
    orderEnd({id:this.orderId}).then((res)=>{
      console.log(res)
      this.orderShow = false
      this.getOrderdetails()
    })
  },
  // 操作中标
  handleorderBid(id) {
    orderBid({id:id}).then((res)=>{
      console.log('操作中标成功',res)
      this.getVoicelist()
    })
  },
  handlebuSinessCard() {
    orderdelivery({id: this.orderId}).then((res)=>{
       uni.showToast({
					  title: '报名成功，发布者选中后会主动联系您',
					  icon: 'none',
					  duration: 3000
			  })
        this.getVoicelist();
        this.getOrderdetails()
    }).catch((err)=>{
      this.notputShow = true
    })
  },
  handlere() {
    this.triggered = true;
    this.getVoicelist();
    this._freshing = true;
    console.log("上拉加载");
  },
    // 请求列表数据
    async getVoicelist() {
      this.tagParameter.page = 1;
      const res = await orderteacher(this.tagParameter);
      console.log("res新数据", res);
      this.triggered = false;
      this._freshing = false;
      this.dataList = res.data;
      this.scrollInto = this.scrollTop;
      if (this.dataList.length === 0) {
        this.has_next = "";
        this.defaultshow = true;
      } else {
        this.has_next = res.has_next;
        this.defaultshow = false;
      }
      setTimeout(() => {
        this.scrollInto = 0;
      }, 0);
    },
    async reachBottom() {
      if (this.has_next) {
        this.tagParameter.page = this.tagParameter.page + 1;
        const res = await orderteacher(this.tagParameter);
        this.triggered = false;
        this.has_next = res.has_next;
        res.data.map((item) => {
          this.dataList.push(item);
        });
        if (this.dataList.length === 0) {
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
	handlecloseerweima() {
    this.notputShow = false
    this.orderShow = false
	},
  // 跳转配音师名片
  handleVisitorsJump(orderItem) {
    //   console.log("配音师列表", orderItem.teacher_id);
    //   uni.setStorageSync("current", this.options1[this.current].value);
      uni.navigateTo({
        url: "/subpkg/pages/teacherlist/teacherlist?id=" + orderItem.teacher_id,
      });
    },
    // 返回上一页
    handleGoBack() {
      uni.switchTab({ url: '/pages/singlesquare/singlesquare' })
    },
    playTheMusic(orderItem) {
      console.log("传过来的数据", orderItem, this.dataList);
      this.audioShow = true;
      if (this.dataPlay.works.url === orderItem.works.url) {
        this.dataList.map((item) => {
          if (this.dataPlay === item.teacher) {
            orderItem.works.playStatus = !orderItem.works.playStatus;
          } else {
            item.teacher.works.playStatus = false;
          }
        });
      } else {
        this.dataList.map((item) => {
		      console.log('遍历的数据', item)	
          item.teacher.works.playStatus = false;
        });

        orderItem.works.playStatus = true;
        this.dataPlay = orderItem;
      }
      setTimeout(() => {
        this.$refs.musicAudio.preStartPlay();
      }, 0);
    },
    handleChangePlay(status) {
      this.dataList.map((item) => {
        if (this.dataPlay === item.teacher) {
          item.teacher.works.playStatus = status;
        } else {
          item.teacher.works.playStatus = false;
        }
      });
    },
    musicClose() {
      this.dataList.map((item) => {
        item.teacher.works.playStatus = false;
      });
      this.audioShow = false;
      this.dataPlay = {
        works: {
          url: "",
        },
      };
    },
    handlechangehome() {
      uni.switchTab({ url: "/pages/index/index" });
    },
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.container {
  position: relative;
  height: 100%;
  background: #f2f2f2;
}
.share_box {
  position: fixed;
  right: 0;
  bottom: 201.739rpx;
  width: 126.812rpx;
  height: 126.812rpx;
  .share_icon {
    width: 126.812rpx;
    height: 126.812rpx;
  }
}
.invitationBtn {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0);
  /* justify-content: space-between; */
  border: none;
  padding: 0 !important;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.invitationBtn::after {
  border: none !important;
}
</style>>
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
.container {
	position: relative;
	.home_musicSrc_box {
		position: fixed;
		bottom: 100rpx;
		z-index: 9999;
	}
}
.content {
  display: flex;
  height: 100%;
  flex-direction: column;
  .demand_box {
	  height: 100%;
  }
  .order_list {
    margin-top: 28.986rpx;
    margin-left: 27.174rpx;
    padding-bottom: 43.478rpx;
    width: 695.652rpx;
    background: #ffffff;
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
						font-weight: 400;
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
					font-size: 21.739rpx;
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
    .countdown_num_box {
      width: 100%;
      display: flex;
      justify-content: center;
      .countdown_num {
				font-size: 25.362rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFA006;
			}
      .countdown_num_end {
        font-size: 25.362rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #a09a9a;
      }
    }
    .order-content {
      padding: 0rpx 34.42rpx;
      .order-label_item {
        margin-top: 27.174rpx;
        display: flex;
        //   align-items: center;
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
            background: #f2f2f2;
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
      margin-top: 32.913rpx;
      margin-left: 57.971rpx;
      .delivery_btn {
        text-align: center;
        width: 579.71rpx;
        height: 90.58rpx;
        background: #1274ff;
        box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
        border-radius: 30px;
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
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
      justify-content: center;
      .voice_img_box {
        display: flex;
        .voice_img {
          margin-left: -9.058rpx;
          width: 50.101rpx;
          height: 50.101rpx;
          border-radius: 23.551rpx;
        }
      }
      .delivery_number {
        margin-left: 14.493rpx;
        display: flex;
        align-items: center;
        .num {
          height: 30.797rpx;
          font-size: 21.739rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #cccccc;
          line-height: 30.797rpx;
        }
        .arrorRight {
          margin-left: 5.435rpx;
          width: 12.681rpx;
          height: 19.928rpx;
        }
      }
    }
  }
  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 34.42rpx;
    .line {
      width: 56.159rpx;
      height: 1.812rpx;
      background: #bababa;
    }
    .text {
      margin-left: 23.551rpx;
      margin-right: 23.551rpx;
      text-align: center;
      height: 39.855rpx;
      font-size: 28.986rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 39.855rpx;
    }
  }
  .voice_list {
    height: 100%;
    .voice_item {
	  position: relative;	
      display: flex;
      width: 695.652rpx;
      height: 231.884rpx;
      background: #ffffff;
      border-radius: 14.493rpx;
      margin-top: 25.362rpx;
      margin-left: 27.174rpx;
	  .zhongbiao {
		  position: absolute;
		  top: 0;
		  right: 0;
		  width: 96.014rpx;
		  height: 96.014rpx;
	  }
      .head_portrait_box {
        position: relative;
        border-top-left-radius: 14.493rpx;
        border-bottom-left-radius: 14.493rpx;
        width: 177.536rpx;
        height: 231.884rpx;
        background: rgba(0, 0, 0, 0.2);
        .head_portrait_img {
          border-top-left-radius: 14.493rpx;
          border-bottom-left-radius: 14.493rpx;
          width: 177.536rpx;
          height: 231.884rpx;
        }
        .home_play {
          position: absolute;
          top: 101.449rpx;
          left: 76.992rpx;
          width: 23.551rpx;
          height: 28.986rpx;
          z-index: 9;
        }
        .head_portrait_meng {
          position: absolute;
          left: 0px;
          top: 0;
          border-top-left-radius: 14.493rpx;
          border-bottom-left-radius: 14.493rpx;
          width: 177.536rpx;
          height: 231.884rpx;
          background: rgba(0, 0, 0, 0.1);
        }
      }
      .voice_introduce {
        margin-left: 38.043rpx;
        padding-top: 25.362rpx;
        width: 472rpx;
        .voice_name {
          display: flex;
          align-items: center;
          position: relative;
          .rank {
            height: 39.855rpx;
            font-size: 28.986rpx;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #000000;
            line-height: 39.855rpx;
          }
          .name {
            margin-left: 16.304rpx;
            max-width: 250rpx;
            height: 39.855rpx;
            font-size: 28.986rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
            line-height: 39.855rpx;
          }
          .sex {
            margin-left: 3.623rpx;
            width: 25.362rpx;
            height: 25.362rpx;
          }
          .winning {
            text-align: center;
            position: absolute;
            right: 10rpx;
            width: 144.928rpx;
            height: 50.725rpx;
            background: #ffffff;
            border-radius: 32.609rpx;
            border: 1px solid #1274ff;
            font-size: 21.739rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #1274ff;
            line-height: 50.725rpx;
          }
          .nowinning {
            text-align: center;
            position: absolute;
            right: 10rpx;
            width: 144.928rpx;
            height: 50.725rpx;
            background: #ffffff;
            border-radius: 32.609rpx;
            border: 1px solid #cecece;
            font-size: 21.739rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 50.725rpx;
          }
          
        }
        .numberworks {
          height: 32.609rpx;
          margin: 14.493rpx 0;
          font-size: 23.551rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 32.609rpx;
          .workscount {
            margin-right: 30.797rpx;
          }
        }
        .tagNum {
          display: flex;
          .tag {
            min-width: 108.696rpx;
            padding: 0 9.058rpx;
            height: 39.855rpx;
            background: rgba(255, 165, 61, 0.12);
            border-radius: 3.623rpx;
            font-size: 21.739rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ff9c29;
            line-height: 39.855rpx;
            margin-right: 10.87rpx;
          }
        }
        .jianjie {
          margin-top: 14.493rpx;
          width: 461.957rpx;
          height: 32.609rpx;
          font-size: 23.551rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 32.609rpx;
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
    .toushu_box {
      margin-top: 38.043rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      .toushu {
        width: 28.986rpx;
        height: 28.986rpx;
      }
      .toushu_text {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
      }
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

