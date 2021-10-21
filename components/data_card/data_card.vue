<template>
  <view>
    <view class="business_data">
      <view class="business_data_title">
        <!-- <view>查看</view> -->
      </view>
      <view class="data_content">
        <view class="seen_my" @click="handleHaveSeen(1)">
          <view class="seen_num">
            153
            <view class="seen_badge">12</view>
          </view>
          <view class="seen_my_tile_box">
            <image
              class="seen_icon"
              src="@/static/home/kanguo.png"
              mode="scaleToFill"
            />
            <text class="seen_text">我看过的</text>
          </view>
          <view v-if="clickType==='1'" class="blue_line"></view>
        </view>
        <view class="seen_my" @click="handleHaveSeen(2)">
          <view class="seen_num">153</view>
          <view class="seen_my_tile_box">
            <image
              class="seen_icon"
              src="@/static/home/dianzhan.png"
              mode="scaleToFill"
            />
            <text class="seen_text">我点赞的</text>
          </view>
           <view v-if="clickType==='2'" class="blue_line"></view>
        </view>
        <view class="seen_my" @click="handleHaveSeen(3)">
          <view class="seen_num">68</view>
          <view class="seen_my_tile_box">
            <image
              class="seen_icon"
              src="@/static/home/guanzhu.png"
              mode="scaleToFill"
            />
            <text class="seen_text">我关注的</text>
          </view>
           <view v-if="clickType==='3'" class="blue_line"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "data_card",
  props: {
      clickContent: {
			   type: String,
			   default: '1'
		  }
	},
  data() {
    return {
      clickType: this.clickContent
    };
  },
  watch: {
    clickContent: {
			handler(val) {
        this.clickType = this.clickContent
			},
			immediate: true,
      deep: true
		 }
	},
  onLoad(options) {

  },
  methods: {
    handleHaveSeen(index) {
      this.clickType = index
      this.$emit('handleHaveSeen', index)
    }
  }
};
</script>

<style lang="scss">
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
