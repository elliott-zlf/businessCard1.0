<template>
	<view class="content">
		<view v-if="dataList.length!==0">
           <view class="accesslist" v-for="(item,index) in dataList" :key="index" @click="handleTravelTo(item)">
			<image
			    class="accesslist_portrait"
				:src="item.teacher.avatar"
				mode="scaleToFill"
			/>
			<view class="personal_Profile">
				<view class="name_box">
					<text class="nick_name u-line-1">{{item.teacher.nickname}}</text>
				</view>
			</view>
			<view class="deta_text u-line-1">{{item.created_at}}</view>
		</view>
		</view>
		<view v-if="dataList.length===0" class="emptydata">
			<image
			    class="emptydataimg"
				src="@/static/carddetails/emptydata.png"
				mode="scaleToFill"
			/>
			<view class="emptydatatext">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"accesslist",
		props: {
           dataList: {
			   type: Array,
			   default: () => {
					return []
				}
		   }
		},
		data() {
			return {
				concern: true,
			};
		},
		methods: {
			handleTravelTo(item) {
			  console.log('跳转到配音师名片页面', item)
			  // //   uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist' })
			  if (item.teacher.status>0) {
				 uni.setStorageSync('current', '')
				 console.log('没走这里吗')
                 uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist?id='+item.user_id })
			  }else {
                //  uni.showToast({
				// 		title: '该用户暂未创建名片',
				// 		icon: 'none'
				//  })
			  }	
			},
		}
	}
</script>

<style lang="scss">
.content {
	padding: 0 27.174rpx;
	.accesslist {
		display: flex;
		height: 144.928rpx;
		margin-top: 9.058rpx;
		align-items: center;
		.accesslist_portrait {
			width: 108.696rpx;
			height: 108.696rpx;
			border-radius: 54.348rpx;
		}
		.personal_Profile {
			margin-left: 32.609rpx;
		    width: 305rpx;
			.name_box {
				display: flex;
				align-items: center;
				.nick_name {
					display: inline-block;
					max-width: 300rpx;
					font-size: 28.986rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #171F24;
				}
				.gender {
					margin-left: 7.246rpx;
					width: 28.986rpx;
					height: 28.986rpx;
				}
			}
		}
		.deta_text {
			margin-top: 9.058rpx;
			max-width: 390rpx;
			font-size: 23.551rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #B9BABC;
		}
	}
	.emptydata {
		text-align: center;
		position: relative;
		.emptydataimg {
           width: 431.159rpx;
		   height: 387.681rpx;
		}
		.emptydatatext {
			top: 300rpx;
			width: 100%;
			text-align: center;
			position: absolute;
			text-align: center;
			font-size: 25.362rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
		}
	}
}
</style>
