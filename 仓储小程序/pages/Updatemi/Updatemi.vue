<!--
时间：2024-01-31
添加供应商名称
-->
<template>
	<view style="position: relative" :class="size === 'small' ? 'small' : ''">
		<view class="uni-flex" :class="{unishadow :uniShadow}"></view>

		<page-head :title="title"></page-head>
		<view class="uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.oldPassword}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" type="password" :placeholder="lang.enterOldPassword" name="yuanmi" :value="yuanmi"
								@input="ymiinput"></input>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.newPassword}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" type="password" :placeholder="lang.enterNewPassword" name="xmi" :value="xmi"
								@input="xmiinput"></input>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.confirmNewPassword}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" type="password" name="qxmi" :placeholder="lang.enterNewPasswordAgain" :value="qxmi"
								@input="qxmiinput"></input>
						</view>
					</view>
				</view>
				<view class="uni-padding-wrap">
					<view class="uni-btn-v">
						<button name="btn_cksh" form-type="submit" type="primary" class="btn-setstorage">
							{{lang.resetButton}}
						</button>
					</view>
				</view>
			</form>
			
			<view style="color:#F76260">
				<view>{{lang.remark1}}</view>
				<view>{{lang.remark2}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	var graceChecker = require("@/common/graceChecker.js");
	import zh from '../language/zh.js';
	import ru from '../language/ru.js';
	import { setPageTitle } from '@/utils/i18n.js';

	export default {
		components: {
			uniList,
			uniListItem
		},
		name: 'select',
		
		data() {
			return {
				yuanmi: '',
				xmi: '',
				qxmi: '',
				loadingsh: false,
				currentLang: 'zh', // 当前语言
				lang: zh ,// 语言资源对象


			}

		},
		onShow() {
			// 每次页面显示时检查语言设置
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			setPageTitle('pageTitle.resetPassword', this.lang);
		},
		onLoad: function(options) {
			var that = this;
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			setPageTitle('pageTitle.resetPassword', this.lang);
			var name = uni.getStorageSync("name");
			var pwd = uni.getStorageSync("pwd");
			console.log(pwd);
			console.log(name);
		},
		methods: {
			getempty: function() {
				var that = this;
				that.yuanmi = '',
				that.xmi = '',
				that.qxmi = ''
			},

			formSubmit: function(e) {
				var that = this;
				var rule = [{
						name: "yuanmi",
						checkType: "notnull",
						checkRule: "",
						errorMsg: this.lang.errorOldPasswordRequired
					},{
						name: "xmi",
						checkType: "notnull",
						checkRule: "",
						errorMsg: this.lang.errorNewPasswordRequired
					},{
						name: "qxmi",
						checkType: "notnull",
						checkRule: "",
						errorMsg: this.lang.errorNewPasswordRequired
					},

				];
				
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (!checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				} else {
					console.log(that.pwd);
					console.log(that.yuanmi);
					console.log(that.xmi);
					
					if(!(validateString(that.xmi).isValid)){
						uni.showToast({
							title: this.lang.errorPasswordRule,
							icon: 'none'
						});
						return
					}
					if(that.xmi.length < 6){
						uni.showToast({
							title: this.lang.errorPasswordLength,
							icon: 'none'
						});
						return
					}
					if (that.xmi == that.qxmi) {
						that.name = uni.getStorageSync('name');
						that.pwd = uni.getStorageSync('pwd');
						
						
						if(that.yuanmi==that.pwd){
							uni.request({
								url: getApp().globalData.url + 'updatePassword.php',
								data: {
									'userId': that.name,
									'oldPassword': that.yuanmi,
									'newPassword':that.xmi
								},
								method: 'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								success: function(res) {
									console.log(res.data);
									var json = res.data;
									//console.log(typeof json);
									//console.log(json);
									if (typeof json != 'object') {
										console.log(111111);
										if (json != null && json.length > 0) {
											json = json.replace(/\ufeff/g, "");
											json = JSON.parse(json);
											var flag = json.flag;
											var msg = json.msg;
											var ch = json.ch;
											var sj = json.sj;
							
										}
									} else {
										console.log(22222); 
										var flag = json.flag;
										var msg = json.msg;
										var ch = json.ch;
										var sj = json.sj;
									}
								    if(flag==true){

										
										uni.showToast({
											title: msg,
											icon: 'none'
										});
										// 设置定时器
										const timer = setTimeout(() => {
										console.log("延迟1s执行---->");
										  wx.redirectTo({
										    url: '../login/login'
										  });
										}, 1000);

										
									}else{
										uni.showToast({
											title: msg,
											icon: 'none'
										});
									}
								},
								fail: function(res) {
							
									console.log(res);
								}
							})
						}else{
							uni.showToast({
								title: this.lang.errorOldPasswordIncorrect,
								icon: 'none'
							});
						}
					
					} else {
						uni.showToast({
							title: this.lang.errorPasswordNotMatch,
							icon: 'none'
						});
					}
				}
			},
			ymiinput: function(e) {
				this.yuanmi = e.target.value;
			},
			xmiinput: function(e) {
				this.xmi = e.target.value;
			},
			qxmiinput: function(e) {
				this.qxmi = e.target.value;
			},



		}
	}
	function validateString(str) {
	    const hasLetter = /[a-zA-Z]/.test(str); // 检查是否包含字母
	    const hasNumber = /[0-9]/.test(str);     // 检查是否包含数字
	    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(str); // 检查是否包含特殊字符
	
	    return {
	        hasLetter,
	        hasNumber,
	        hasSpecialChar,
	        isValid: hasLetter && hasNumber && hasSpecialChar // 判断是否同时满足条件
	    };
	}
	// 使用 setTimeout 延迟 1 秒（1000 毫秒）执行
	// setTimeout(function() {

	// }, 1000);
	
	
	function isValidPassword(password) {
    // 正则表达式模式
    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?~`-]).{6,}$/;
    return pattern.test(password);
	}
</script>
<style scoped lang="scss">
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

	.upload_btn {
		text-align: center;
		font-size: 15px;
	}
</style>