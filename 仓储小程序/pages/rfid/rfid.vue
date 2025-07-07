<template>
	<view :class="languageClass">
		<view class="uni-common-mt">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label label-text">{{ lang.rfidLabel }}：</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input input-text" type="text" @input="rfidInput" :placeholder="lang.rfidPlaceholder" name="rfid"
							:value="rfidValue"></input>
				</view>
				<view>
					<button class="btn button-text" type="default" @click="scanCode">{{ lang.scanButton }}</button>

						<view class="uni-label label-text">{{ lang.plateLabel }}：</view>
						<input class="uni-input input-text" type="text" @input="cphInput" :placeholder="lang.platePlaceholder" name="jkzl"  
							:value="cphValue"></input>
					<button class="btn button-text" type="default" @click="chooseCPHImage">{{ lang.selectPlateImage }}</button>
						<view class="uni-label label-text">{{ lang.vinLabel }}：</view>
						<input class="uni-input input-text" @input="vinInput" type="text" :placeholder="lang.vinPlaceholder" name="vin"  
							:value="vinValue"></input>
					<button class="btn button-text" type="default" @click="chooseVINImage">{{ lang.selectVinImage }}</button>
			</view>
			<view class="uni-padding-wrap">
				<view class="uni-btn button-text-v">
					<button name="btn button-text_select" type="default" class="btn button-text-setstorage button-text" @tap="select">{{ lang.queryButton }}</button>
					<button name="btn button-text_insert" type="primary" class="btn button-text-setstorage button-text" @tap="insert">{{ lang.bindButton }}</button>
					<button name="btn button-text_reset" type="warn" class="btn button-text-setstorage button-text" @tap="getempty">{{ lang.clearButton }}</button>
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
	import { getLanguageClass } from '@/utils/i18n.js';
	export default {
		components: {
			uniList,
			uniListItem
		},
		name: 'rfid',
		props: {
			infoList: {
				type: Array,
				default () {
					return []
				}
			},
			value: {
				type: String,
				default: ''
			showValue: {
				default: 'name'
			emptyTips: {
				default: '暂无数据'
			loading: {
				type: Boolean,
				default: false
			btn button-textStyleColor: {
				type: Object,
					return {}
			uniShadow: {
				default: true
			type: {
				default: 'primary'
			size: {
				default: 'medium'
		data() {
			return {
				rfidValue: '',
				cphValue: '',
				vinValue: '',
				'name': '',
				'pwd': '',
				currentLang: 'zh', // 当前语言
				lang: zh // 语言资源对象
				languageClass: 'lang-zh lang-transition page-rfid'
			}
		computed: {
			dataListLength() {
				return this.dataList.length
		watch: {
				handler(newVal) {
					this.inputVal = newVal
				},
				immediate: true
					this.dataList = newVal
				deep: true,
		onShow() {
			// 每次页面显示时检查语言设置
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			this.languageClass = getLanguageClass(this.currentLang, 'page-rfid');
			// 设置页面标题
			uni.setNavigationBarTitle({
				title: this.lang.pageTitle.rfidOperation
			});
		onLoad: function(options) {
			var that = this;
			that.getempty();
			// 初始化语言
			// that.getAccessToken();
			/*
						var name = uni.getStorageSync("name");
						var se = uni.getStorageSync("sessionid");
						if (se == '') {
							uni.showModal({
								title: '未登录',
								content: '您还未登录，不能操作,请至登录界面进行登录！！',
								success: function(res) {
									if (res.confirm) {
										uni.navigateTo({
											url: '../login/login',
										})
									} else if (res.cancel) {
									}
								}
							})
						} else {
							getApp().globalData.sessionid = se;
							getApp().globalData.phone = name;
							uni.request({
								url: getApp().globalData.url + 'login/check.php',
								data: {
									name: getApp().globalData.phone,
									sessionid: getApp().globalData.sessionid
								},
								method: 'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								success: res => {
									var jsonStr = res.data;
									if (typeof jsonStr != 'object') {
										jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
										var jj = JSON.parse(jsonStr);
										var flag = jj.flag;
										var msg = jj.msg;
									} else {
										var flag = jsonStr.flag;
										var msg = jsonStr.msg;
									if (flag.toString().trim() == 'false') {
										uni.showModal({
											title: '登录已过期',
											content: msg,
											success: function(res) {
												if (res.confirm) {
													uni.navigateTo({
														url: '../login/login',
													})
												} else if (res.cancel) {
												}
											}
						}
			*/
		methods: {
			getempty: function() {
				var that = this;
				that.rfidValue = '';
				that.cphValue = '';
				that.vinValue = '';
			select: function() {
				var cph = this.cphValue;
				console.log(this.cphValue);
				console.log(cph);
				
				uni.request({
					url: getApp().globalData.url + 'rfid.php',
					data: {
						'flag': 'select',
						'rfid': this.rfidValue,
						'cph': cph,
						'vin': this.vinValue
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					success: function(res) {
						console.log(res.data);
						var json = res.data;
						console.log(json);
						if (typeof json != 'object') {
							console.log(111111);
							if (json != null && json.length > 0 && json.toString().trim() != "") {
								json = json.replace(/\ufeff/g, "");
								json = JSON.parse(json);
								
								if (json.flag) {
									that.rfidValue = json.rfid;
									that.cphValue = json.cph;
									that.vinValue = json.vin;
								} else {
									uni.showToast({
										title: json.msg,
										icon: 'none'
									});
							} else {
								uni.showToast({
									title: that.lang.noData,
									icon: 'none'
								});
							}
						}  else if(json.flag=="true") {
							console.log(json.flag);
							console.log(22223);
							that.rfidValue = json.rfid;
							that.cphValue = json.cph;
							that.vinValue = json.vin;
							uni.showToast({
								title: json.msg,
								icon: 'none'
							});
					fail: function(res) {
						console.log(res);
					}
				})
			// 信息绑定
			insert: function(e) {
				let reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
				const careg = reg.test(this.cphValue);
				if (!careg) {
				  wx.showToast({
				    icon: 'none',
				    title: that.lang.invalidPlate,
				  })
				  return;
				if (that.rfidValue == '') {
					uni.showToast({
						title: that.lang.rfidRequired,
						icon: 'none'
					});
				} else if (that.cphValue == '') {
						title: that.lang.plateRequired,
				} else {
					that.name = uni.getStorageSync('name');
					that.pwd = uni.getStorageSync('pwd');
					uni.request({
						url: getApp().globalData.url + 'rfid.php',
						data: {
							'name': that.name,
							'pwd': that.pwd,
							'flag': 'insert',
							'rfid': that.rfidValue,
							'cph': that.cphValue,
							'vin': that.vinValue
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						success: function(res) {
							console.log(res.data);
							console.log("name:", that.name);
							console.log("name:", that.pwd);
							var json = res.data;
							if (typeof json != 'object') {
								console.log(111111);
								if (json != null && json.length > 0) {
									json = json.replace(/\ufeff/g, "");
									json = JSON.parse(json);
									console.log("json:", json);
									var flag = json.flag;
									var msg = json.msg;
								console.log(22222);
								console.log("json:", json);
								var flag = json.flag;
								var msg = json.msg;
								title: msg,
							that.getempty();
						fail: function(res) {
							console.log(res);
					})
			rfidInput(e) {
				this.rfidValue = e.detail.value
			cphInput(e) {
				this.cphValue = e.detail.value
			vinInput(e) {
				this.vinValue = e.detail.value
			// 二维码扫描
			scanCode() {
				uni.scanCode({
						that.rfidValue = res.result;
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
				});
			// 选择车牌号图片
			chooseCPHImage() {
				uni.chooseImage({
					count: 1,
					success: (ress) => {
						uni.showLoading({
							title: that.lang.recognizing
						})
						// 下面将图片本地路径转base64
						console.log('ress:', ress)
						uni.compressImage({
							src: ress.tempFilePaths[0],
							quality: 80,
							success: (res) => {
								console.log("tempFilePath:", res.tempFilePath)
								that.toBase64(res.tempFilePath)
									.then((res) => {
										// 识别车牌号
										that.getCPH(res);
									})
									.catch((error) => {
										console.error('发生错误:', error);
					fail(err) {
						uni.hideLoading()
						console.log(err)
			// 选择车架号图片
			chooseVINImage() {
				var that = this
						console.log('ress:', ress);
										that.getVIN(res);
			getCPH(image64) {
						'flag': 'getCPH',
						'image': image64
						uni.hideLoading();
						if (json.flag) {
			getVIN(image64) {
						'flag': 'getVIN',
							that.vinValue = json.cph;
			// 转换为base64的函数
			toBase64(path) {
				return new Promise((resolve, reject) => {
					pathToBase64(path)
						.then(base64 => {
							// console.log(base64);
							resolve(base64);
						.catch(error => {
							console.error(error);
							reject(error);
		}
	}
</script>
<style scoped lang="scss">
/* 导入国际化样式 */
@import '@/styles/i18n-styles.css';
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
	.hover {
		transition: all .6s;
		transform: scale(0.8, 0.8);
	.uni-flex {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
	.unishadow {
		box-shadow: 0rpx 1rpx 5rpx #DDDDDD;
	.uni-search-form {
		position: relative;
		width: 60%;
		margin: 10rpx;
		padding: 10rpx 80rpx;
		font-size: 30rpx;
		color: #999999;
	.uniRound {
		border-radius: 5px;
	.uni-circular {
		border-radius: 100rpx;
	.uni-icon-position {
		position: absolute;
		top: 50%;
		left: 26rpx;
		transform: translate(0, -50%);
	.uni-icon-clear {
		right: 26rpx;
	.uni-background {
		background-color: #F5F5F5;
	/* button */
	.uni-action {
		width: 120rpx;
		height: 66rpx;
	.uni-cu-btn button-text {
		height: 100%;
		color: #FFFFFF;
		font-size: 28rpx;
		border: none;
		// background-color: $uni-color-primary;
	.uni-shadow-blur {
		box-shadow: 0rpx 1rpx 10rpx #C8C7CC;
	.uni-round {
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
	.uni-combox__selector-empty {
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
	.word-btn button-text-white {
		font-size: 18px;
	.word-btn button-text {
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
		color: #DDDDDD;
	.word-btn button-text--hover {
		background-color: #4ca2ff;
	.image {
		width: 50rpx;
		height: 50rpx;
	.text {
		font-size: 35rpx;
		margin: 5rpx;
	.btn button-text {
		background: linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
		background-color: #7892c2;
		padding: 10rpx 15rpx;
		color: #fff;
		border-radius: 10rpx;
		margin: 30rpx;
</style>
