<template >
	<view style="position: relative" :class="size === 'small' ? 'small' : ''">

		 <page-head :title="title"></page-head>
		 <view class="uni-common-mt">
	     		<view class="uni-list">
	     			
	     			<view class="uni-list-cell">
	     				<view class="uni-list-cell-left">
	     					<view class="uni-label">订单编号</view>
	     				</view>
						<view class="uni-list-cell-db">
							<text style="display: block;" class="uni-input">{{ddbh}}</text>
						</view>
	     				
	     			</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">车号</view>
							<text style="display: block;" class="uni-input">{{ch}}</text>
						
					</view>
							<view class="uni-label">称重编号：</view>
							<text style="display: block;" class="uni-input">{{czbh}}</text>
							<view class="uni-label">供应商名称：</view>
							<text style="display: block;" class="uni-input">{{gysdm}}</text>
							<view class="uni-label">公司名称：</view>
							<text style="display: block;" class="uni-input">{{gsmc}}</text>
							<view class="uni-label">物料名称：</view>
							<text style="display: block;" class="uni-input">{{wlmc}}</text>
							<view class="uni-label">仓库编码：</view>
							<text style="display: block;" class="uni-input">{{ckbh}}</text>
							<view class="uni-label">仓库名称：</view>
							<text style="display: block;" class="uni-input">{{ckmc}}</text>
							<view class="uni-label">卸车部门：</view>
							<text style="display: block;" class="uni-input">{{xcbm}}</text>
	     		
	     </view>
	
	</view>
</template>
<script>
	 import uniList from '@/components/uni-list/uni-list.vue'
	 import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
   
    
  
	export default { 
		components: {
			
			uniList,
			uniListItem
		},
		name: 'select',
		data() {
			return {
				'ddbh':'',
			  'ch':'',
			  'gysdm':'',
			  'gsmc':'',
			  'czbh':'',
			  'wlmc':'',
			  'ckbh':'',
			  'ckmc':'',
			  'xcbm':''
				
		    }
		    
		
		watch: {
			value: {
				handler(newVal) {
					this.inputVal = newVal
				},
				immediate: true
			},
			infoList: {
					this.dataList = newVal
				deep: true,
			inputVal(val) {
				if(!val.length) {
					this.isShowClearIcon = false
				}
			}
		onLoad: function (options) {
           var that = this;
		     
		   
		   console.log('称重编号：'+options.czbh);
		   that.czbh=options.czbh;
			uni.request({
				         
				          url: getApp().globalData.url +'cxdetail.php',
				            data: {
				              
				              'czbh': that.czbh//传称重编号
							  
				            },
				            method: 'POST',
				            header: {
				              'Content-Type': 'application/x-www-form-urlencoded'
				            success: function(res) {
				              console.log(res.data);
				              var json = res.data;
				            
				              if (typeof json != 'object') {
								   console.log(111111);
				                if (json != null&&json.length>0) {
				                  json = json.replace(/\ufeff/g,"");
				                  json = JSON.parse(json);
								  that.ch=json.ch;
								  that.ddbh=json.ddbh;
				                   that.gysdm=json.gysdm;
								  that.gsmc=json.gsmc;
								  that.czbh=json.czbh;
								  that.wlmc=json.wlmc;
								   that.$ckbh=json.ckbh;
								  that.ckmc=json.ckmc;
								  that.xcbm=json.xcbm;
								
								  	
				                }
				              } else{
								  console.log(22222);
								that.ch=json.ch;
								that.ddbh=json.ddbh;
								 that.gysdm=json.gysdm;
								that.gsmc=json.gsmc;
								that.czbh=json.czbh;
								that.wlmc=json.wlmc;
								 that.$ckbh=json.ckbh;
								that.ckmc=json.ckmc;
								that.xcbm=json.xcbm;
							  }
								  
							    },
							  fail:function(res){
							   
							    console.log(res);
							})  
    },
 
		methods: {
	}
</script>
<style scoped lang="scss"> 
	 
	// $selectWidth: 75%; // 下拉选择框宽度
	.small {
		transform: scale(.9, .9);
	.uni-primary {
		background-color: $uni-color-primary;
	.uni-success {
		background-color: #67c23a;
	.uni-warning {
		background-color: $uni-color-warning;
	.uni-error {
		background-color: $uni-color-error;
	.hover{
		transition: all .6s;
		transform: scale(0.8,0.8);
	.uni-flex{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
	.unishadow{
		box-shadow: 0rpx 1rpx 5rpx #DDDDDD;
	.uni-search-form{
		position: relative;
		width: 60%;
		margin: 10rpx;
		padding: 10rpx 80rpx;
		font-size: 30rpx;
		color: #999999;
	.uniRound{
		border-radius: 5px;
	.uni-circular{
		border-radius: 100rpx;
	.uni-icon-position{
		position: absolute;
		top: 50%;
		left: 26rpx;
		transform: translate(0,-50%);
	.uni-icon-clear{
		right: 26rpx;
	.uni-background{
		background-color: #F5F5F5;
	/* button */
	.uni-action{
		width:120rpx;
		height: 66rpx; 
	.uni-cu-btn{
		height: 100%;
		color: #FFFFFF;
		font-size: 28rpx;
		border: none;
		// background-color: $uni-color-primary;
	.uni-shadow-blur{
		box-shadow: 0rpx 1rpx 10rpx #C8C7CC;
	.uni-round{
	.uni-combox__selector {
		top: 100rpx;
		left: 40rpx;
		width: 75%; // 下拉框宽度
		background-color: #FFFFFF;
		border-radius: 6px;
		box-shadow: #DDDDDD 4px 4px 8px, #DDDDDD -4px -4px 8px;
		z-index: 999;
	.uni-combox__selector-scroll {
		max-height: 200px;
	.uni-combox__selector::before {
		content: '';
		width: 0;
		height: 0;
		border-bottom: solid 6px #FFFFFF;
		border-right: solid 6px transparent;
		border-left: solid 6px transparent;
		left: 50%;
		top: -6px;
		margin-left: -6px;
	.uni-combox__selector-empty{
		text-align: center;
		color: #8F8F94;
		padding: 20rpx 0;
	.uni-combox__selector-item {
		/* #ifdef APP-NVUE */
		/* #endif */
		font-size: 24rpx;
		margin: 0px 10px;
		padding: 20rpx 10rpx;
		color: #808080;
	.uni-combox__selector-item:hover {
		background-color: #DDDDDD;
	.uni-combox__selector-empty:last-child,
	.uni-combox__selector-item:last-child {
		border-bottom: none;
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	/* #endif */
	/* #ifndef APP-NVUE */
	page {
		flex-direction: column;
		background-color: #F4F5F6;
		min-height: 100%;
		height: auto;
	view {
		line-height: inherit;
	.example {
		padding: 0 30rpx 30rpx;
	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #ffffff;
	.example-body {
		flex-direction: row;
		flex-wrap: wrap; 
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
		padding: 0 30rpx;
		/* #ifndef APP-NVUE */
		display: block;
	.example-info-text {
		line-height: 36rpx;
	.word-btn-white {
		font-size: 18px;
	.word-btn {
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	.word-btn--hover {
		background-color: #4ca2ff;
	.image {
		width: 50rpx;
		height: 50rpx;
	.text {
		font-size: 35rpx;
		margin: 5rpx;
</style>
