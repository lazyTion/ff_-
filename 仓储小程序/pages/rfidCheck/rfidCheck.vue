<template>
	<view>
		<view class="uni-common-mt">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">{{ lang.rfidLabel }}：</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" @input="rfidInput" :placeholder="lang.rfidPlaceholder" name="rfid"
							:value="rfidValue"></input>
					</view>
				</view>
				<view>
					<button class="btn" type="default" @click="scanCode">{{ lang.scanButton }}</button>
				</view>

				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">{{ lang.plateLabel }}：</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" @input="cphInput" :placeholder="lang.platePlaceholder" name="jkzl" disabled="true"
							:value="cphValue"></input>
					</view>
				</view>
				<view>
					<button class="btn" type="default" @click="chooseCPHImage">{{ lang.selectPlateImage }}</button>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">{{ lang.vinLabel }}：</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" @input="vinInput" type="text" :placeholder="lang.vinPlaceholder" name="vin" disabled="true"
							:value="vinValue"></input>
					</view>
				</view>
				<view>
					<button class="btn" type="default" @click="chooseVINImage">{{ lang.selectVinImage }}</button>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<view class="uni-btn-v">
					<button name="btn_check" type="primary" class="btn-setstorage" @tap="check">{{ lang.checkButton }}</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import {
		pathToBase64,
		base64ToPath
	} from '@/components/js_sdk/mmmm-image-tools/index.js'
	// 导入语言资源
	import zh from '../language/zh.js';
	import ru from '../language/ru.js';

	export default {
		components: {
			uniList,
			uniListItem
		},
		name: 'rfidCheck',
		props: {
			// ...原有props
		},
		data() {
			return {
				rfidValue: '',
				cphValue: '',
				vinValue: '',
				'name': '',
				'pwd': '',
				currentLang: 'zh', // 当前语言
				lang: zh // 语言资源对象
			}
		},
		onLoad: function(options) {
			var that = this;
			that.getempty();
			
			// 初始化语言
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
		},
		methods: {
			getempty: function() {
				var that = this;
				that.rfidValue = '';
				that.cphValue = '';
				that.vinValue = '';
			},
			check: function() {
				var that = this;
				if (that.rfidValue == '') {
					uni.showToast({
						title: that.lang.rfidRequired,
						icon: 'none'
					});
				} else if (that.cphValue == '') {
					uni.showToast({
						title: that.lang.plateRequired,
						icon: 'none'
					});
				} else if (that.vinValue != '') {
					uni.showToast({
						title: that.lang.vinRequired,
						icon: 'none'
					});
				} else {
					that.name = uni.getStorageSync('name');
					that.pwd = uni.getStorageSync('pwd');
					uni.request({
						url: getApp().globalData.url + 'rfid.php',
						data: {
							'name': that.name,
							'pwd': that.pwd,
							'flag': 'check',
							'rfid': that.rfidValue,
							'cph': that.cphValue,
							'vin': that.vinValue
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							console.log(res.data);
							var json = res.data;

							if (typeof json != 'object') {
								if (json != null && json.length > 0 && json.toString().trim() != "") {
									json = json.replace(/\ufeff/g, "");
									json = JSON.parse(json);
									if (json.flag) {
										uni.showModal({
											title: that.lang.tipTitle,
											content: that.lang.checkSuccess,
											showCancel: false,
											icon: 'exception'
										});
									} else {
										uni.showToast({
											title: json.msg,
											icon: 'none'
										});
									}
								} else {
									uni.showToast({
										title: json.msg,
										icon: 'none'
									});
								}
							} else if (json.flag) {
								uni.showModal({
									title: that.lang.tipTitle,
									content: that.lang.checkSuccess,
									showCancel: false,
									icon: 'exception'
								});
							} else {
								uni.showModal({
									title: that.lang.warningTitle,
									content: that.lang.checkFailed,
									showCancel: false,
									icon: 'exception'
								});
							}
						},
						fail: function(res) {
							console.log(res);
						}
					})
				}
			},
			// ...其他原有方法保持不变
				rfidInput(e) {
							this.rfidValue = e.detail.value
						},
						cphInput(e) {
							this.cphValue = e.detail.value
						},
						vinInput(e) {
							this.vinValue = e.detail.value
						},
						scanCode() {
							var that = this;
							uni.scanCode({
								success: function(res) {
									that.rfidValue = res.result;
									console.log('条码类型：' + res.scanType);
									console.log('条码内容：' + res.result);
								}
							});
						},
						chooseCPHImage() {
							var that = this;
							uni.chooseImage({
								count: 1,
								success: (ress) => {
									uni.showLoading({
										title: that.lang.recognizing
									})
									uni.compressImage({
										src: ress.tempFilePaths[0],
										quality: 80,
										success: (res) => {
											that.toBase64(res.tempFilePath)
												.then((res) => {
													that.getCPH(res);
												})
												.catch((error) => {
													console.error('发生错误:', error);
												});
										}
									})
								},
								fail(err) {
									uni.hideLoading()
									console.log(err)
								}
							})
						},
						chooseVINImage() {
							var that = this
							uni.chooseImage({
								count: 1,
								success: (ress) => {
									uni.showLoading({
										title: that.lang.recognizing
									})
									uni.compressImage({
										src: ress.tempFilePaths[0],
										quality: 80,
										success: (res) => {
											that.toBase64(res.tempFilePath)
												.then((res) => {
													that.getVIN(res);
												})
												.catch((error) => {
													console.error('发生错误:', error);
												});
										}
									})
								},
								fail(err) {
									uni.hideLoading()
									console.log(err)
								}
							})
						},
						getCPH(image64) {
							var that = this;
							uni.request({
								url: getApp().globalData.url + 'rfid.php',
								data: {
									'flag': 'getCPH',
									'image': image64
								},
								method: 'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								success: function(res) {
									uni.hideLoading();
									console.log(res.data);
									var json = res.data;
									if (json.flag) {
										that.cphValue = json.cph;
									} else {
										uni.showToast({
											title: json.msg,
											icon: 'none'
										});
									}
								},
								fail: function(res) {
									uni.hideLoading();
									console.log(res);
								}
							})
						},
						getVIN(image64) {
							var that = this;
							uni.request({
								url: getApp().globalData.url + 'rfid.php',
								data: {
									'flag': 'getVIN',
									'image': image64
								},
								method: 'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								success: function(res) {
									uni.hideLoading();
									console.log(res.data);
									var json = res.data;
									if (json.flag) {
										that.vinValue = json.cph;
									} else {
										uni.showToast({
											title: json.msg,
											icon: 'none'
										});
									}
								},
								fail: function(res) {
									uni.hideLoading();
									console.log(res);
								}
							})
						},
						toBase64(path) {
							return new Promise((resolve, reject) => {
								pathToBase64(path)
									.then(base64 => {
										resolve(base64);
									})
									.catch(error => {
										console.error(error);
										reject(error);
									})
							})
						},
		}
	}
</script>
<style scoped lang="scss">
	// ...原有样式保持不变
	// $selectWidth: 75%; // 下拉选择框宽度
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
	
		.hover {
			transition: all .6s;
			transform: scale(0.8, 0.8);
		}
	
		.uni-flex {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
		}
	
		.unishadow {
			box-shadow: 0rpx 1rpx 5rpx #DDDDDD;
		}
	
		.uni-search-form {
			position: relative;
			width: 60%;
			margin: 10rpx;
			padding: 10rpx 80rpx;
			font-size: 30rpx;
			color: #999999;
		}
	
		.uniRound {
			border-radius: 5px;
		}
	
		.uni-circular {
			border-radius: 100rpx;
		}
	
		.uni-icon-position {
			position: absolute;
			top: 50%;
			left: 26rpx;
			transform: translate(0, -50%);
		}
	
		.uni-icon-clear {
			position: absolute;
			top: 50%;
			right: 26rpx;
			transform: translate(0, -50%);
		}
	
		.uni-background {
			background-color: #F5F5F5;
		}
	
		/* button */
		.uni-action {
			width: 120rpx;
			height: 66rpx;
		}
	
		.uni-cu-btn {
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
	
		.uni-shadow-blur {
			box-shadow: 0rpx 1rpx 10rpx #C8C7CC;
		}
	
		.uni-round {
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
	
		.uni-combox__selector-empty {
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
			color: #DDDDDD;
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
	
		.btn {
			text-align: center;
			background: linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
			background-color: #7892c2;
			padding: 10rpx 15rpx;
			color: #fff;
			border-radius: 10rpx;
			margin: 30rpx;
		}
</style>