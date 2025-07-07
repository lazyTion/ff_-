<template>
	<view >
		<page-head :title="title"></page-head>
	
			
			<view class="uni-common-mt">
					<view class="uni-list">
						
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								<view class="uni-label">输入卡号：</view>
							</view>
							<view class="uni-list-cell-db">
								<input class="uni-input" style="display:flex"  @input="cardidInput"  type="text" name="cardid" placeholder="请输入卡号" :value="cardid"  ></input>
								<button class="mini-btn" type="default" size="mini" @click="handleSearch">扫码</button>
								
							</view>
							
						</view>
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								<view class="uni-label">输入仓库号：</view>
							</view>
							<view class="uni-list-cell-db">
								<input class="uni-input"  @input="ckbhInput"  type="text" name="ckbh" placeholder="请输入仓库号" :value="ckbh" ></input>
								
							</view>
							
						</view>
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								<view class="uni-label">备注：</view>
							</view>
							<view class="uni-list-cell-db">
								<textarea class="uni-textarea" @input="bzInput" name='bz' style='padding: 15rpx 25rpx 15rpx 25rpx'  placeholder="请输入备注"/>
							</view>
							
						</view>
					</view>
				</view>
			<view class="uni-padding-wrap">
				<view class="uni-btn-v">
					<button name="btn_yctj" :disabled="loadingsh"  type="primary" class="btn-setstorage" @tap="yctj">异常提交</button>
					
				</view>
			</view>
			
			
		
		</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'textarea',
				focus: false,
				cardid:'',
				ckbh:'',
				bz:''
			}
		},
		methods: {
			yctj(){
				var that=this;
				uni.request({
					         
					          url: getApp().globalData.url +'yctj.php',
					            data: {
									 'username':uni.getStorageSync('username'),
									 'cardid':that.cardid,
									 'ckbh':that.ckbh,
									 'bz':that.bz
					            },
					            method: 'POST',
					            header: {
					              'Content-Type': 'application/x-www-form-urlencoded'
					            },
					            success: function(res) {
					              console.log(res.data);
					              var json = res.data;
					              console.log(typeof json);
					              //console.log(json);
					              if (typeof json != 'object') {
									   console.log(111111);
					                   if (json != null&&json.length>0) {
											  json = json.replace(/\ufeff/g,"");
											  json = JSON.parse(json);
											  var flag=json.flag;
											  var msg=json.msg;
											 uni.showToast({
											 	title: msg,
											 	icon: 'none'
											 });
											 uni.navigateTo({
											 	url:"../yichang/yichang"
											 })}
					              } else{
										  console.log(12356);
										  var flag=json.flag;
										  var msg=json.msg;
											uni.showToast({
												title: msg,
												icon: 'none'
											});
											uni.navigateTo({
												url:"../yichang/yichang"
											}) 
										 
									  }
									
									  
								  },
					          fail:function(res){
					            
					            console.log(res);
					          }
					        })
					
					
				},
			handleSearch() {
				var that=this;
				this.inputIsShow = true
				this.$emit('handleSearch')
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						that.cardid=res.result;
						that.$emit('input', that.cardid);
						that.onInput();
				    }
				});
			},
			bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			},
			cardidInput(e){
				 this.cardid = e.detail.value 
			},
			ckbhInput(e){
				 this.ckbh = e.detail.value 
			},
			bzInput(e){
				 this.bz = e.detail.value 
			}
		}
	}
</script>

<style>
	page{
		backgroundColor:#F4F5F6
	}
	
	.small {
		transform: scale(.9, .9);
	}
	.uni-primary {
		background-color: $uni-color-primary;
	}
	.uni-success {
		background-color: #67c23a;
	}
	.uni-warning {
		background-color: $uni-color-warning;
	}
	.uni-error {
		background-color: $uni-color-error;
	}
	.hover{
		transition: all .6s;
		transform: scale(0.8,0.8);
	}
	.uni-flex{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
	}
	.unishadow{
		box-shadow: 0rpx 1rpx 5rpx #DDDDDD;
	}
	.uni-search-form{
		position: relative;
		width: 60%;
		margin: 10rpx;
		padding: 10rpx 80rpx;
		font-size: 30rpx;
		color: #999999;
	}
	.uniRound{
		border-radius: 5px;
	}
	.uni-circular{
		border-radius: 100rpx;
	}
	.uni-icon-position{
		position: absolute;
		top: 50%;
		left: 26rpx;
		transform: translate(0,-50%);
	}
	.uni-icon-clear{
		position: absolute;
		top: 50%;
		right: 26rpx;
		transform: translate(0,-50%);
	}
	.uni-background{
		background-color: #F5F5F5;
	}
	/* button */
	.uni-action{
		width:120rpx;
		height: 66rpx; 
	}
	.uni-cu-btn{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 28rpx;
		border: none;
		// background-color: $uni-color-primary;
	}
	.uni-shadow-blur{
		box-shadow: 0rpx 1rpx 10rpx #C8C7CC;
	}
	.uni-round{
		border-radius: 100rpx;
	}
	.uni-combox__selector {
		position: absolute;
		top: 100rpx;
		left: 40rpx;
		box-sizing: border-box;
		width: 75%; // 下拉框宽度
		background-color: #FFFFFF;
		border-radius: 6px;
		box-shadow: #DDDDDD 4px 4px 8px, #DDDDDD -4px -4px 8px;
		z-index: 999;
	}
	.uni-combox__selector-scroll {
		max-height: 200px;
		box-sizing: border-box;
	}
	.uni-combox__selector::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-bottom: solid 6px #FFFFFF;
		border-right: solid 6px transparent;
		border-left: solid 6px transparent;
		left: 50%;
		top: -6px;
		margin-left: -6px;
	}
	.uni-combox__selector-empty{
		text-align: center;
		color: #8F8F94;
		padding: 20rpx 0;
		font-size: 28rpx;
	}
	.uni-combox__selector-item {
		/* #ifdef APP-NVUE */
		display: flex;
		/* #endif */
		font-size: 24rpx;
		margin: 0px 10px;
		padding: 20rpx 10rpx;
		color: #808080;
	}
	.uni-combox__selector-item:hover {
		background-color: #DDDDDD;
	}
	.uni-combox__selector-empty:last-child,
	.uni-combox__selector-item:last-child {
		border-bottom: none;
	}
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}
	
	/* #endif */
	
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #F4F5F6;
		min-height: 100%;
		height: auto;
	}
	
	view {
		font-size: 28rpx;
		line-height: inherit;
	}
	
	.example {
		padding: 0 30rpx 30rpx;
	}
	
	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #ffffff;
	}
	
	.example-body {
		flex-direction: row;
		flex-wrap: wrap; 
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}
	
	/* #endif */
	.example {
		padding: 0 30rpx;
	}
	
	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 30rpx;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 30rpx;
	}
	
	.example-info-text {
		font-size: 28rpx;
		line-height: 36rpx;
	}
	
	
	.example-body {
		flex-direction: column;
		padding: 30rpx;
		background-color: #ffffff;
	}
	
	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}
	
	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}
	
	.word-btn--hover {
		background-color: #4ca2ff;
	}
	
	
	.image {
		width: 50rpx;
		height: 50rpx;
	}
	
	.text {
		font-size: 35rpx;
		margin: 5rpx;
		
		
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}
</style>
