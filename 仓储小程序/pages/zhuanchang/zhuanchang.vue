<template>
	<view style="position: relative" :class="size === 'small' ? 'small' : ''" :class="languageClass">
		<view class="uni-flex" :class="{unishadow :uniShadow}">
			<view class="uni-search-form uni-circular uni-background">
				<input type="text" :placeholder="lang.scanPlaceholder" v-model="inputVal" @input="onInput"
					@focus="onFocus"></input>
				<icon type="search" size="14" class="uni-icon-position" @tap="selectInfo" />
			</view>
			<view class="uni-action">
				<button class="uni-cu-btn uni-bg-gradual-green uni-shadow-blur uni-round button-text"
					:class="[type === 'primary' ? 'uni-primary' : (type === 'success' ? 'uni-success' : (type === 'warning' ? 'uni-warning' : 'uni-error'))]"
					hover-class="hover" @click="handleSearch">{{lang.scanButton}}
				</button>
		</view>
	
		<page-head :title="title"></page-head>
		<view class="uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.carNumber}}</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;" class="uni-input label-text">{{ ch }}</text>
					</view>
							<view class="uni-label">{{lang.materialName}}</view>
							<text style="display: block;" class="uni-input label-text">{{ wlmc }}</text>
							<view class="uni-label">{{lang.weighingType}}</view>
							<text style="display: block;" class="uni-input label-text">{{ gbzt }}</text>
					<view class="uni-list-cell" v-if="!mjjc">
							<view class="uni-label">{{lang.accessCount}}</view>
							<input class="uni-input input-text" type="text" name="jc" :placeholder="lang.enterAccessCount" :value="jc"></input>
				</view>
				<view class="uni-padding-wrap">
					<view class="uni-btn-v">
						<button name="btn_cksh" :disabled="dis" type="primary" class="btn-setstorage button-text" form-type="submit">
							{{lang.reportMark}}
						</button>
			</form>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import zh from '../language/zh.js';
	import ru from '../language/ru.js';
import { getLanguageClass } from '@/utils/i18n.js';
	var graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				inputIsShow: false,
				inputVal: '',
				dataList: [],
				placeholder: '请扫码',
				isShowClearIcon: true,
				dis:true,
				mjjc:true,
				ch: '',
				wlmc: '',
				gbzt: '',
				zybl: '',
				bz:'',
				jc:'',
				currentLang: 'zh', // 当前语言
				lang: zh ,// 语言资源对象
				languageClass: 'lang-zh lang-transition page-zhuanchang'
			}
		},
		
		methods: {
			getempty: function() {
				var that = this;
				that.ch = '';
				that.wlmc = '';
				that.bz = '';
				that.gbzt = '';
				that.jc='';
				that.mjjc=true;
				that.dis = true;
				that.inputVal = '';
			},
			onLoad(){
				this.currentLang = uni.getStorageSync('lang') || 'zh';
					this.lang = this.currentLang === 'zh' ? zh : ru;
			this.languageClass = getLanguageClass(this.currentLang, 'page-zhuanchang');
				console.log(this.dis)
			formSubmit: function(e) {
				var graceChecker = require("../../components/graceUI/graceChecker.js");
				var rule = [
					// {
					// 	name: "bz",
					// 	checkType: "notnull",
					// 	checkRule: "",
					// 	errorMsg: "转厂原因不能为空"
					// },
					{
							name: "jc",
							checkType: "betweenD",
							checkRule: "1,9999999999",
							errorMsg: "进出次数为整数"
					},
				];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (!checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}else {
					that.name = uni.getStorageSync('name');
					that.pwd = uni.getStorageSync('pwd');
					var bz=e.target.value.bz;
					var jc=e.detail.value.jc;
					uni.request({
						url: getApp().globalData.url + 'zhuanchang.php',
						data: {
							'name': that.name,
							'pwd': that.pwd,
							'flag': 'cksh',
							'ch': that.ch,
							'bz': bz,
							'gbzt': that.gbzt,
							'wlmc': that.wlmc,
							'jc':jc,
							'inputVal':that.inputVal
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
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
								}
							} else {
								console.log(22222);
								var flag = json.flag;
								var msg = json.msg;
							}
							uni.showToast({
								title: msg,
								icon: 'none'
							});
							 that.getempty();
						fail: function(res) {
							console.log(res);
						}
					})
				}
			onInput() {
				this.$emit('input', this.inputVal);
				if (this.inputVal.trim().length == 12) {
						url: getApp().globalData.url + 'zaichang.php',
							'cardid': that.inputVal
									that.ch = json.ch;
									that.wlmc = json.wlmc;
									that.gbzt = json.gbzt;
									that.jc=json.jc;
								} else {
									uni.showToast({
										title: '未查询到卡号',
										icon: 'none'
									});
								if (that.gbzt == "进厂称重") {
									that.dis = false;
								} 
								that.ch = json.ch;
								that.wlmc = json.wlmc;
								that.gbzt = json.gbzt;
								that.jc=json.jc;
									that.mjjc=false;
								}else{
									that.dis = true;
									that.mjjc=true;
			handleSearch() {
				this.inputIsShow = true
				// this.$emit('handleSearch')
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						that.inputVal = res.result;
						that.$emit('input', that.inputVal);
						that.onInput();
					}
				});
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
	.uni-cu-btn {
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
	.upload_btn {
		font-size: 12px;
</style>
