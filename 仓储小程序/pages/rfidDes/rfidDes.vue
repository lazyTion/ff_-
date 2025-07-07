<template>
	<view :class="languageClass">
		<view class="uni-common-mt">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">{{ lang.rfidLabel }}：</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input input-text" type="text" @input="rfidInput" :placeholder="lang.rfidPlaceholder" name="rfid"
							:value="rfidValue"></input>
				</view>
				<view>
					<button class="btn button-text" type="default" @click="scanCode">{{ lang.scanButton }}</button>
						<view class="uni-label">{{ lang.descriptionLabel }}：</view>
						<input class="uni-input input-text" type="text" @input="descriptionInput" :placeholder="lang.descriptionPlaceholder" name="descrption" :value="descriptionValue"/>
			</view>
			<view class="uni-padding-wrap">
				<view class="uni-btn-v">
					<button name="btn_insert" type="primary" class="btn-setstorage button-text" @tap="insert">{{ lang.bindButton }}</button>
					<button name="btn_reset" type="warn" class="btn-setstorage button-text" @tap="getempty">{{ lang.clearButton }}</button>
		</view>
	</view>
</template>

<script>
	// 导入语言资源
	import zh from '../language/zh.js';
	import ru from '../language/ru.js';
import { getLanguageClass } from '@/utils/i18n.js';
	
	export default {
		data() {
			return {
				rfidValue: '',
				descriptionValue: '',
				currentLang: 'zh', // 当前语言
				lang: zh // 语言资源对象
				languageClass: 'lang-zh lang-transition page-rfidDes'
			}
		},
		onLoad: function(options) {
			// 初始化语言
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			this.languageClass = getLanguageClass(this.currentLang, 'page-rfidDes');
			
			this.getempty()
		methods: {
			rfidInput(e) {
				this.rfidValue = e.detail.value
			},
			descriptionInput(e){
				this.descriptionValue = e.detail.value
			// 二维码扫描
			scanCode() {
				var that = this;
				uni.scanCode({
					success: function(res) {
						that.rfidValue = res.result
						console.log('条码类型：' + res.scanType)
						console.log('条码内容：' + res.result)
					}
				});
			getempty: function() {
				this.rfidValue = ''
				this.descriptionValue = ''
			// 信息绑定
			insert: function(e) {
				if (that.rfidValue == '') {
					uni.showToast({
						title: that.lang.rfidRequired,
						icon: 'none'
					});
				} else if(that.descriptionValue == ''){
						title: that.lang.descriptionRequired,
				} else {
					that.name = uni.getStorageSync('name');
					that.pwd = uni.getStorageSync('pwd');
					uni.request({
						url: getApp().globalData.url + 'rfidDes.php',
						data: {
							'name': that.name,
							'pwd': that.pwd,
							'flag': 'insert',
							'rfid': that.rfidValue,
							'description': that.descriptionValue
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						success: function(res) {
							console.log(res.data);
							var json = res.data;
							if (typeof json != 'object') {
								if (json != null && json.length > 0) {
									json = json.replace(/\ufeff/g, "");
									json = JSON.parse(json);
									console.log("json:", json);
									var flag = json.flag;
									var msg = json.msg;
								}
							} else {
								console.log("json:", json);
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
		}
	}
</script>
<style scoped lang="scss">
/* 导入国际化样式 */
@import '@/styles/i18n-styles.css';
	.btn {
		text-align: center;
		background: linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
		background-color: #7892c2;
		padding: 10rpx 15rpx;
		color: #fff;
		border-radius: 10rpx;
		margin: 30rpx;
</style>
