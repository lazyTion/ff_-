<template>
	<view style="position: relative" :class="size === 'small' ? 'small' : ''" :class="languageClass">
		<view class="uni-flex" :class="{unishadow :uniShadow}">
			<view class="uni-search-form uni-circular uni-background">
				<input type="text" :placeholder="lang.placeholder" v-model="inputVal" @input="onInput"
					@focus="onFocus"></input>
				<icon type="search" size="14" class="uni-icon-position" @tap="selectInfo" />
			</view>
			<view class="uni-action">
				<button class="uni-cu-btn uni-bg-gradual-green uni-shadow-blur uni-round button-text"
					:class="[type === 'primary' ? 'uni-primary' : (type === 'success' ? 'uni-success' : (type === 'warning' ? 'uni-warning' : 'uni-error'))]"
					hover-class="hover" @click="handleSearch">{{ lang.scanButton }}
				</button>
		</view>

		<page-head :title="title"></page-head>
		<view class="uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.materialName }}：</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;" class="uni-input label-text">{{ wlmc }}</text>
					</view>
							<view class="uni-label">{{ lang.orderNumber }}</view>
							<text style="display: block;" class="uni-input label-text">{{ ddbh }}</text>
							<view class="uni-label">{{ lang.carNumber }}</view>
							<text style="display: block;" class="uni-input label-text">{{ ch }}</text>
							<view class="uni-label">{{ lang.entryTime }}：</view>
							<text style="display: block;" class="uni-input label-text">{{ mzsj }}</text>
							<view class="uni-label">{{ lang.specification }}</view>
							<text style="display: block;" class="uni-input label-text">{{ guige }}</text>
							<view class="uni-label">{{ lang.quantity }}</view>
							<text style="display: block;" class="uni-input label-text">{{ ddwlsl }}</text>
							<view class="uni-label">{{ lang.supplierName }}</view>
							<text style="display: block;" class="uni-input label-text">{{ gysdm }}</text>
							<view class="uni-label">{{ lang.remarks }}</view>
							<text style="display: block;" class="uni-input label-text">{{ bz }}</text>
							<view class="uni-label">{{ lang.warehouseCode }}</view>
						<view class="uni-list-cell-db" style="font-size: 6px">
							<uni-combox :border="false" :candidates="candidates" :emptyTips="lang.noWarehousePermission"
								:placeholder="lang.enterWarehouseCode" v-model="ckbh" name="ckbh" value="ckbh"
								@input="ckbhChange"></uni-combox>
							<view class="uni-label">{{ lang.handlingTeam }}</view>
							<input class="uni-input input-text" type="text" name="zxcbz" :placeholder="lang.enterHandlingTeam" :value="xcbh"
								@input="zxcbzChange"></input>
							<view class="uni-label">{{ lang.warehouseName }}</view>
							<text style="display: block;" name='ckmc' class="uni-input label-text">{{ ckmc }}</text>
					<view class="uni-list-cell" v-if="!loadingsh">
							<view class="uni-label">{{ lang.warehouseConfirmPhoto }}</view>
							<text style="display: block;
							 width: 45%;
							 overflow: hidden;
							 text-overflow: ellipsis; 
							 white-space: nowrap;" name='ckmc' class="uni-input">{{ ckqrImage }}
							</text>
					<button class="upload_btn button-text" type="default" @click="chooseCkqrImage" v-if="!loadingsh">{{ lang.selectPhoto }}</button>
					<view class="uni-list-cell" v-if="!loadingqr">
							<view class="uni-label">{{ lang.handlingConfirmPhoto }}</view>
               width: 45%;
							 text-overflow: ellipsis;
							 white-space: nowrap;" name='ckmc' class="uni-input">{{ zxcqrImage }}
					<button class="upload_btn button-text" type="default" @click="chooseZxcqrImage" v-if="!loadingqr">{{ lang.selectPhoto }}</button>
				</view>
				<view class="uni-padding-wrap">
					<view class="uni-btn-v">
						<button name="btn_cksh" :disabled="loadingsh" type="primary" class="btn-setstorage button-text"
							@tap="ckqr">{{ lang.warehouseConfirm }}
						</button>
						<button name="btn_ckqr" :disabled="loadingqr" @tap="zxcqr">{{ lang.handlingConfirm }}</button>
			</form>
	</view>
</template>
<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import graceChecker from "@/common/graceChecker.js";
	
	// 导入语言资源
	import zh from '../language/zh.js';
	import ru from '../language/ru.js';
import { getLanguageClass } from '@/utils/i18n.js';
	export default {
		components: {
			uniList,
			uniListItem
		},
		name: 'select',
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
			btnStyleColor: {
				type: Object,
					return {}
			uniShadow: {
				default: true
			type: {
				default: 'primary'
			size: {
				default: 'medium'
			}
		data() {
			return {
				inputIsShow: false,
				inputVal: '2222222',
				dataList: [],
				isShowClearIcon: true,
				ch: '',
				zxcbz: '',
				ckbh: '',
				ddwlsl: '',
				wlmc: '',
				guige: '',
				gysdm: '',
				bz: '',
				ckmc: '',
				czbh: '',
				xcbh: '',
				name: '',
				pwd: '',
				ddbh: '',
				mzsj: '',
				loadingqr: false,
				loadingsh: false,
				ckqrImage: '',
				zxcqrImage: '',
				candidates: [],
				currentLang: 'zh', // 当前语言
				lang: zh // 语言资源对象
				languageClass: 'lang-zh lang-transition page-cangk'
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
			inputVal(val) {
				if (!val.length) {
					this.isShowClearIcon = false
		onShow() {
			// 每次页面显示时检查语言设置
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			this.languageClass = getLanguageClass(this.currentLang, 'page-cangk');
			// 设置页面标题
			uni.setNavigationBarTitle({
				title: this.lang.pageTitle.warehouseHandling
			});
		onLoad: function(options) {
			var that = this;
			that.name = uni.getStorageSync("name");
			var se = uni.getStorageSync("sessionid");
			
			// 初始化语言
			that.selectCK();
		methods: {
			getempty: function() {
				var that = this;
				that.ch = '';
				that.zxcbz = '';
				that.ckbh = '';
				that.ddwlsl = '';
				that.wlmc = '';
				that.guige = '';
				that.bz = '';
				that.ckmc = '';
				that.gysdm = '';
				that.czbh = '';
				that.xcbh = '';
				that.inputVal = '';
				that.ddbh = '';
				that.mzsj = '';
				that.loadingqr = false;
				that.loadingsh = false;
				that.ckqrImage = '';
				that.zxcqrImage = '';
			ckqr: function(e) {
				if (that.ckmc == '' || that.ckmc == '') {
					uni.showToast({
						title: that.lang.warehouseCodeRequired,
						icon: 'none'
					});
				} else if (that.ckqrImage == '') {
						title: that.lang.selectWarehousePhoto,
				} else {
					that.name = uni.getStorageSync('name');
					that.pwd = uni.getStorageSync('pwd');
					console.log('cksh');
					uni.request({
						url: getApp().globalData.url + 'cangk.php',
						data: {
							'name': that.name,
							'pwd': that.pwd,
							'flag': 'cksh',
							'czbh': that.czbh,
							'ckbh': that.ckbh,
							'ckmc': that.ckmc,
							'xcbm': that.xcbh,
							'cardid': that.inputVal
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
									var flag = json.flag;
									var msg = json.msg;
									if (flag) {
										that.uploadImage(that.ckqrImage, 'ckqrImg', that.czbh);
									}
								}
							} else {
								var flag = json.flag;
								var msg = json.msg;
								if (flag) {
									that.uploadImage(that.ckqrImage, 'ckqrImg', that.czbh);
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
			zxcqr: function() {
				if (that.ckbh == '' || that.ckmc == '') {
						title: that.lang.warehouseInfoRequired,
				} else if (that.xcbh == '') {
						title: that.lang.handlingTeamRequired,
				} else if (that.zxcqrImage == '') {
						title: that.lang.selectHandlingPhoto,
							'flag': 'ckqr',
										that.uploadImage(that.zxcqrImage, 'zxcqrImg', that.czbh);
									that.uploadImage(that.zxcqrImage, 'zxcqrImg', that.czbh);
			zxcbzChange: function(e) {
				this.zxcbz = e.target.value;
				this.xcbh = e.target.value;
			ckbhChange: function(e) {
				this.ckmc = '';
				if (that.ckbh.trim().length == 4) {
						url: getApp().globalData.url + 'selectCK.php',
							'flag': 'selectCkmc',
								json = json.replace(/\ufeff/g, "");
								json = JSON.parse(json);
								if (flag.toString().trim() == 'true') {
									that.ckmc = json.ckmc;
								} else {
									uni.showToast({
										title: msg,
										icon: 'none'
									});
								if (flag.toString().trim() != 'false') {
								that.ckmc = json.ckmc;
			selectInfo() {},
			closeDielog() {
				this.inputIsShow = false
			onFocus() {
				if (this.dataList.length) {
					this.inputIsShow = true
					this.isShowClearIcon = !!this.inputVal
			onInput() {
				this.$emit('input', this.inputVal);
				if (that.inputVal.trim().length ==12) {
							'cardid': that.inputVal,
							'flag': 'info'
									that.ch = json.ch;
									that.ddwlsl = json.ddwlsl;
									that.gysdm = json.gys;
									that.wlmc = json.wlmc;
									that.ddbh = json.ddbh;
									that.guige = json.guige;
									that.gbzt = json.gbzt;
									that.mzsj = json.mzsj;
									that.xcbh = json.xcbh;
									that.czbh = json.czbh;
									
									if (that.czbh == "") {
										uni.showToast({
											title: that.lang.noCardFound,
											icon: 'none'
										});
										return;
									if (that.gbzt == "进厂称重") {
										that.loadingsh = false;
										that.loadingqr = true;
									} else if (that.gbzt == '卸车审核') {
										that.loadingsh = true;
										that.loadingqr = false;
										that.ckbh = json.ckbh;
										that.ckmc = json.ckmc;
									} else if (that.gbzt != '' && that.gbzt != '卸车审核' && that
										.gbzt != '进厂称重' &&
										that.gbzt != '退车') {
										if (that.inputVal.trim().length == 12) {
											uni.showToast({
												title: that.lang.invalidVehicleStatus,
												icon: 'none'
											});
										}
								that.ch = json.ch;
								that.ddwlsl = json.ddwlsl;
								that.gysdm = json.gys;
								that.wlmc = json.wlmc;
								that.ddbh = json.ddbh;
								that.guige = json.guige;
								that.gbzt = json.gbzt;
								that.xcbh = json.xcbh;
								that.mzsj = json.mzsj;
								that.czbh = json.czbh;
								if (that.czbh == "") {
										title: that.lang.noCardFound,
									return;
								if (that.gbzt == "进厂称重") {
									that.loadingsh = false;
									that.loadingqr = true;
								} else if (that.gbzt == '卸车审核') {
									that.loadingsh = true;
									that.loadingqr = false;
									that.ckbh = json.ckbh;
			handleSearch() {
				this.inputIsShow = true
				this.$emit('handleSearch')
				uni.scanCode({
					success: function(res) {
						that.inputVal = res.result;
						that.$emit('input', that.inputVal);
						that.onInput();
					}
				});
			clearInputValue() {
				this.inputVal = ''
			selectCK() {
				uni.request({
					url: getApp().globalData.url + 'selectCK.php',
					data: {
						'flag': 'selectCK',
						'name': that.name,
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
						var json = res.data;
						if (typeof json != 'object') {
							if (json != null && json.length > 0 && json.toString().trim() !== "") {
								var json1 = json.replace(/\ufeff/g, "");
								json = JSON.parse(json1);
								var array = json.data;
								for (var i = 0; i < array.length; i++) {
									that.candidates.push(array[i].ckbh);
						} else {
							var array = json.data;
							for (var i = 0; i < array.length; i++) {
								that.candidates.push(array[i].ckbh);
				})
			chooseCkqrImage() {
				var that = this
				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
					success: (ress) => {
						uni.compressImage({
							src: ress.tempFilePaths[0],
							quality: 80,
							success: (res) => {
								that.ckqrImage = res.tempFilePath;
						})
			chooseZxcqrImage() {
								that.zxcqrImage = res.tempFilePath;
			uploadImage(filePath, imageType, czbh) {
				wx.uploadFile({
					filePath: filePath,
					name: 'file',
					url: getApp().globalData.url + 'uploadImage.php',
						"content-type": "multipart/form-data"
					formData: {
						'flag': imageType,
						'czbh': czbh
					success(res) {},
					fail(res) {
						wx.showToast({
							title: that.lang.uploadFailed,
							icon: 'none'
						});
		}
	}
</script>
<style scoped lang="scss">
/* 导入国际化样式 */
@import '@/styles/i18n-styles.css';
	/* 原有样式保持不变 */
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
	.uni-action {
		width: 120rpx;
		height: 66rpx;
	.uni-cu-btn {
		height: 100%;
		color: #FFFFFF;
		font-size: 28rpx;
		border: none;
	.uni-shadow-blur {
		box-shadow: 0rpx 1rpx 10rpx #C8C7CC;
	.uni-round {
	.uni-combox__selector {
		top: 100rpx;
		left: 40rpx;
		width: 75%;
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
		font-size: 24rpx;
		margin: 0px 10px;
		padding: 20rpx 10rpx;
		color: #808080;
	.uni-combox__selector-item:hover {
		background-color: #DDDDDD;
	.uni-combox__selector-empty:last-child,
	.uni-combox__selector-item:last-child {
		border-bottom: none;
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
	.example-info-text {
		line-height: 36rpx;
		flex-direction: column;
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
		display: block;
	.upload_btn {
		font-size: 12px;
</style>
