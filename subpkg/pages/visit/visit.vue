<template>
  <view class="visit_box">
    <u-navbar
      :is-back="true"
      title="我访问的数据"
      title-size="36.232rpx"
      title-color="#000000"
    ></u-navbar>
    <view class="dataCard_box">
      <view class="business_data">
        <view class="data_content">
          <view class="seen_my" @click="handleHaveSeen('0')">
            <view class="seen_num">
               {{cardData[0]}}
            </view>
            <view class="seen_my_tile_box">
              <image
                class="seen_icon"
                src="@/static/home/kanguo.png"
                mode="scaleToFill"
              />
              <text class="seen_text">我看过的</text>
            </view>
            <view v-if="clickContent === '0'" class="blue_line"></view>
          </view>
          <view class="seen_my" @click="handleHaveSeen('1')">
            <view class="seen_num">
               {{cardData[1]}}
            </view>
            <view class="seen_my_tile_box">
              <image
                class="seen_icon"
                src="@/static/home/dianzhan.png"
                mode="scaleToFill"
              />
              <text class="seen_text">我点赞的</text>
            </view>
            <view v-if="clickContent === '1'" class="blue_line"></view>
          </view>
          <view class="seen_my" @click="handleHaveSeen('2')">
            <view class="seen_num">
               {{cardData[2]}}
            </view>
            <view class="seen_my_tile_box">
              <image
                class="seen_icon"
                src="@/static/home/guanzhu.png"
                mode="scaleToFill"
              />
              <text class="seen_text">我关注的</text>
            </view>
            <view v-if="clickContent === '2'" class="blue_line"></view>
          </view>
        </view>
      </view>
    </view>
    <view class="jisuangaodu">
      <scroll-view 
        class="scroll_view"
        :scroll-top="scrollInto"
        @scroll="tabScoll"
        @scrolltolower="reachBottom"
        scroll-y
      >
          <accesslist
            @handleFocus="handleFocus"
            :dataList="readList"
          ></accesslist>
          <!-- <view v-if="has_next===false" class="defaltext">没有更多了</view> -->
					<u-loadmore v-if="has_next===true" status="loading" bgColor="#FFFFFF"></u-loadmore>
          <view style="height:60px"></view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
import dataCard from "@/components/data_card/data_card.vue";
import accesslist from "@/components/accesslist/accesslist.vue";
import readmy from "@/components/readmy/readmy.vue";
import { followVisit,changeFocus } from '@/api/carddetails.js'
export default {
  components: { dataCard, accesslist, readmy },
  data() {
    return {
      clickContent: "0",
      readList: [
      ],
      attentionList: [
      ],
      triggered: false,
      has_next: true,
      pageData: {
        type: 0,
        page: 1,
        size: 10
      },
      cardData: [0,0,0,0,0,0],
      scrollInto: 0
    };
  },
  onLoad(options) {
    this.clickContent = options.type;
    this.pageData.type = this.clickContent
    uni.hideShareMenu()
    this.handlegainCardData(this.pageData)
  },
  methods: {
    handleHaveSeen(index) {
      this.clickContent = index;
      this.pageData.page = 1;
      this.pageData.type = this.clickContent
      this.handlegainCardData(this.pageData)
    },
    async handlegainCardData(item) {
      var res = await followVisit(item)
      console.log('我的名片数据',res)
      this.cardData = res.data[0]
      this.readList = res.data[1]
      if (res.data[1].length == this.pageData.size) {
					this.has_next = true
			} else {
				this.has_next = false
			}
      this.scrollInto = this.scrollTop
      setTimeout(()=>{
          this.scrollInto = 0
      },0)
    },
    async reachBottom() {
      if (this.has_next) {
				var pages = this.pageData.page+1;
				this.pageData = {
					page: pages,
					size: 10,
					type: this.clickContent
				}
				// const res = await getDemandList({
				// 	state: this.list[idx].id
				// })
				const res = await followVisit(this.pageData)
				console.log('res新数据',res)
				this.triggered = false
				if (res.data[1].length==this.pageData.size) {
					this.has_next = true
				} else {
					this.has_next = false
				}
				res.data[1].map((item)=>{
					this.readList.push(item)
				})
			}else {
			
			}
		},
    handleFocus(obj) {
      changeFocus({id:obj.item.teacher_id,type: obj.index}).then((res)=>{
        console.log(res)
        this.readList.map(item=>{
          if(item.id == obj.item.id) {
              item.follow = obj.index === 1 ? 0 : 1
          }
        })
      })
      console.log('关注点击事件', obj)
    },
    tabScoll(e) {
		  this.scrollTop = e.detail.scrollTop;
		},
  }
};
</script>
<style>
page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
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
.visit_box {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.dataCard_box {
  background: #ffffff;
  z-index: 99;
  padding: 41.667rpx 27.174rpx 27.174rpx 27.174rpx;
}
.jisuangaodu {
  flex: 1;
  overflow-y: hidden;
  .scroll_view {
    height: 100%;
  }
}
.business_data {
  .business_data_title {
    display: flex;
    justify-content: space-between;
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
    background: #ffffff;
    box-shadow: 0px 3.623rpx 36.232rpx 0px rgba(0, 0, 0, 0.07);
    border-radius: 21.739rpx;
    display: flex;
    .seen_my {
      width: 33.333%;
      position: relative;
      text-align: center;
       .blue_line {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 24px;
          height: 6px;
          background: #1274FF;
          border-radius: 3px;
          transform: translate(-50%, -50%);
      }
      .seen_num {
        position: relative;
        margin-top: 41.667rpx;
        height: 54.348rpx;
        font-size: 39.855rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 54.348rpx;
        color: #1274FF;
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
          color: #ffffff;
          background: #ff445a;
        }
      }

      .seen_my_tile_box {
        display: flex;
        margin-top: 9.058rpx;
        align-items: center;
        justify-content: center;
        .seen_icon {
          width: 23.551rpx;
          height: 19.928rpx;
        }
        .seen_text {
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
</style>
