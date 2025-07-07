<template>
	<view style="position: relative" :class="size === 'small' ? 'small' : ''">
		<view class="uni-flex" :class="{unishadow :uniShadow}">
			<view class="uni-search-form uni-circular uni-background">
				<input type="text" :placeholder="lang.placeholder" v-model="inputVal" @input="onInput"
					@focus="onFocus"></input>
				<icon type="search" size="14" class="uni-icon-position" @tap="selectInfo" />
			</view>
			<view class="uni-action">
				<button class="uni-cu-btn uni-bg-gradual-green uni-shadow-blur uni-round"
					:class="[type === 'primary' ? 'uni-primary' : (type === 'success' ? 'uni-success' : (type === 'warning' ? 'uni-warning' : 'uni-error'))]"
					hover-class="hover" @click="handleSearch">{{ lang.scanButton }}
				</button>
			</view>
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
							<text style="display: block;" class="uni-input">{{ wlmc }}</text>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.orderNumber }}</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;" class="uni-input">{{ ddbh }}</text>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.carNumber }}</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;" class="uni-input">{{ ch }}</text>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.entryTime }}：</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;" class="uni-input">{{ mzsj }}</text>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.specification }}</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;" class="uni-input">{{ guige }}</text>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.quantity }}</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;" class="uni-input">{{ ddwlsl }}</text>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.supplierName }}</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;" class="uni-input">{{ gysdm }}</text>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.remarks }}</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;" class="uni-input">{{ bz }}</text>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.warehouseCode }}</view>
						</view>
						<view class="uni-list-cell-db" style="font-size: 6px">
							<uni-combox :border="false" :candidates="candidates" :emptyTips="lang.noWarehousePermission"
								:placeholder="lang.enterWarehouseCode" v-model="ckbh" name="ckbh" value="ckbh"
								@input="ckbhChange"></uni-combox>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.handlingTeam }}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" type="text" name="zxcbz" :placeholder="lang.enterHandlingTeam" :value="xcbh"
								@input="zxcbzChange"></input>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.warehouseName }}</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;" name='ckmc' class="uni-input">{{ ckmc }}</text>
						</view>
					</view>
					<view class="uni-list-cell" v-if="!loadingsh">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.warehouseConfirmPhoto }}</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;
							 width: 45%;
							 overflow: hidden;
							 text-overflow: ellipsis; 
							 white-space: nowrap;" name='ckmc' class="uni-input">{{ ckqrImage }}
							</text>
						</view>
					</view>
					<button class="upload_btn" type="default" @click="chooseCkqrImage" v-if="!loadingsh">{{ lang.selectPhoto }}</button>

					<view class="uni-list-cell" v-if="!loadingqr">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{ lang.handlingConfirmPhoto }}</view>
						</view>
						<view class="uni-list-cell-db">
							<text style="display: block;
               width: 45%;
							 overflow: hidden;
							 text-overflow: ellipsis;
							 white-space: nowrap;" name='ckmc' class="uni-input">{{ zxcqrImage }}
							</text>
						</view>
					</view>
					<button class="upload_btn" type="default" @click="chooseZxcqrImage" v-if="!loadingqr">{{ lang.selectPhoto }}</button>
				</view>
				<view class="uni-padding-wrap">
					<view class="uni-btn-v">
						<button name="btn_cksh" :disabled="loadingsh" type="primary" class="btn-setstorage"
							@tap="ckqr">{{ lang.warehouseConfirm }}
						</button>

						<button name="btn_ckqr" :disabled="loadingqr" @tap="zxcqr">{{ lang.handlingConfirm }}</button>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import graceChecker from "@/common/graceChecker.js";
	
	// 导入语言资源
	import zh from '../language/zh.js';
	import ru from '../language/ru.js';

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
			},
			showValue: {
				type: String,
				default: 'name'
			},
			emptyTips: {
				type: String,
				default: '暂无数据'
			},
			loading: {
				type: Boolean,
				default: false
			},
			btnStyleColor: {
				type: Object,
				default () {
					return {}
				}
			},
			uniShadow: {
				type: Boolean,
				default: true
			},
			type: {
				type: String,
				default: 'primary'
			},
			size: {
				type: String,
				default: 'medium'
			}
		},
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
			}
		},
		computed: {
			dataListLength() {
				return this.dataList.length
			}
		},
		watch: {
			value: {
				handler(newVal) {
					this.inputVal = newVal
				},
				immediate: true
			},
			infoList: {
				handler(newVal) {
					this.dataList = newVal
				},
				deep: true,
				immediate: true
			},
			inputVal(val) {
				if (!val.length) {
					this.isShowClearIcon = false
				}
			}
		},
		onLoad: function(options) {
			var that = this;
			that.name = uni.getStorageSync("name");
			var se = uni.getStorageSync("sessionid");
			
			// 初始化语言
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			
			that.selectCK();
		},
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
			},
			ckqr: function(e) {
				var that = this;
				if (that.ckmc == '' || that.ckmc == '') {
					uni.showToast({
						title: that.lang.warehouseCodeRequired,
						icon: 'none'
					});
				} else if (that.ckqrImage == '') {
					uni.showToast({
						title: that.lang.selectWarehousePhoto,
						icon: 'none'
					});
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
						},
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
							}
							uni.showToast({
								title: msg,
								icon: 'none'
							});
							that.getempty();
						},
						fail: function(res) {
							console.log(res);
						}
					})
				}
			},
			zxcqr: function() {
				var that = this;
				if (that.ckbh == '' || that.ckmc == '') {
					uni.showToast({
						title: that.lang.warehouseInfoRequired,
						icon: 'none'
					});
				} else if (that.xcbh == '') {
					uni.showToast({
						title: that.lang.handlingTeamRequired,
						icon: 'none'
					});
				} else if (that.zxcqrImage == '') {
					uni.showToast({
						title: that.lang.selectHandlingPhoto,
						icon: 'none'
					});
				} else {
					that.name = uni.getStorageSync('name');
					that.pwd = uni.getStorageSync('pwd');
					uni.request({
						url: getApp().globalData.url + 'cangk.php',
						data: {
							'name': that.name,
							'pwd': that.pwd,
							'flag': 'ckqr',
							'czbh': that.czbh,
							'ckbh': that.ckbh,
							'ckmc': that.ckmc,
							'xcbm': that.xcbh,
							'cardid': that.inputVal
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
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
										that.uploadImage(that.zxcqrImage, 'zxcqrImg', that.czbh);
									}
								}
							} else {
								var flag = json.flag;
								var msg = json.msg;
								if (flag) {
									that.uploadImage(that.zxcqrImage, 'zxcqrImg', that.czbh);
								}
							}
							uni.showToast({
								title: msg,
								icon: 'none'
							});
							that.getempty();
						},
						fail: function(res) {
							console.log(res);
						}
					})
				}
			},
			zxcbzChange: function(e) {
				this.zxcbz = e.target.value;
				this.xcbh = e.target.value;
			},
			ckbhChange: function(e) {
				this.ckmc = '';
				var that = this;
				if (that.ckbh.trim().length == 4) {
					uni.request({
						url: getApp().globalData.url + 'selectCK.php',
						data: {
							'flag': 'selectCkmc',
							'ckbh': that.ckbh,
							'cardid': that.inputVal
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							console.log(res.data);
							var json = res.data;
							if (typeof json != 'object') {
								json = json.replace(/\ufeff/g, "");
								json = JSON.parse(json);
								var flag = json.flag;
								if (flag.toString().trim() == 'true') {
									that.ckmc = json.ckmc;
								} else {
									var msg = json.msg;
									uni.showToast({
										title: msg,
										icon: 'none'
									});
								}
							} else {
								var flag = json.flag;
								if (flag.toString().trim() != 'false') {
									that.ckmc = json.ckmc;
								} else {
									var msg = json.msg;
									uni.showToast({
										title: msg,
										icon: 'none'
									});
								}
								that.ckmc = json.ckmc;
							}
						},
						fail: function(res) {
							console.log(res);
						}
					})
				}
			},
			selectInfo() {},
			closeDielog() {
				this.inputIsShow = false
			},
			onFocus() {
				if (this.dataList.length) {
					this.inputIsShow = true
					this.isShowClearIcon = !!this.inputVal
				}
			},
			onInput() {
				this.$emit('input', this.inputVal);
				var that = this;
				that.ckbh = '';
				that.ckmc = '';

				if (that.inputVal.trim().length ==12) {
					uni.request({
						url: getApp().globalData.url + 'cangk.php',
						data: {
							'cardid': that.inputVal,
							'flag': 'info'
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							console.log(res.data);
							var json = res.data;
							if (typeof json != 'object') {
								if (json != null && json.length > 0) {
									json = json.replace(/\ufeff/g, "");
									json = JSON.parse(json);
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
									}
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
										that.loadingsh = true;
										that.loadingqr = true;
										that.ckbh = json.ckbh;
										that.ckmc = json.ckmc;
										if (that.inputVal.trim().length == 12) {
											uni.showToast({
												title: that.lang.invalidVehicleStatus,
												icon: 'none'
											});
										}
									}
								}
							} else {
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
									uni.showToast({
										title: that.lang.noCardFound,
										icon: 'none'
									});
									return;
								}
								if (that.gbzt == "进厂称重") {
									that.loadingsh = false;
									that.loadingqr = true;
								} else if (that.gbzt == '卸车审核') {
									that.loadingsh = true;
									that.loadingqr = false;
									that.ckbh = json.ckbh;
									that.ckmc = json.ckmc;
								} else {
									that.loadingsh = true;
									that.loadingqr = true;
								}
							}
						},
						fail: function(res) {
							console.log(res);
						}
					})
				}
			},
			handleSearch() {
				var that = this;
				this.inputIsShow = true
				this.$emit('handleSearch')
				uni.scanCode({
					success: function(res) {
						that.inputVal = res.result;
						that.$emit('input', that.inputVal);
						that.onInput();
					}
				});
			},
			clearInputValue() {
				this.inputVal = ''
			},
			selectCK() {
				var that = this;
				uni.request({
					url: getApp().globalData.url + 'selectCK.php',
					data: {
						'flag': 'selectCK',
						'name': that.name,
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						var json = res.data;
						if (typeof json != 'object') {
							if (json != null && json.length > 0 && json.toString().trim() !== "") {
								var json1 = json.replace(/\ufeff/g, "");
								json = JSON.parse(json1);
								var array = json.data;
								for (var i = 0; i < array.length; i++) {
									that.candidates.push(array[i].ckbh);
								}
							}
						} else {
							var array = json.data;
							for (var i = 0; i < array.length; i++) {
								that.candidates.push(array[i].ckbh);
							}
						}
					}
				})
			},
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
							}
						})
					}
				})
			},
			chooseZxcqrImage() {
				var that = this
				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
					success: (ress) => {
						uni.compressImage({
							src: ress.tempFilePaths[0],
							quality: 80,
							success: (res) => {
								that.zxcqrImage = res.tempFilePath;
							}
						})
					}
				})
			},
			uploadImage(filePath, imageType, czbh) {
				wx.uploadFile({
					filePath: filePath,
					name: 'file',
					url: getApp().globalData.url + 'uploadImage.php',
					header: {
						"content-type": "multipart/form-data"
					},
					formData: {
						'flag': imageType,
						'czbh': czbh
					},
					success(res) {},
					fail(res) {
						wx.showToast({
							title: that.lang.uploadFailed,
							icon: 'none'
						});
					},
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	/* 原有样式保持不变 */
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
		width: 75%;
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
	.example {
		padding: 0 30rpx;
	}
	.example-info {
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
		display: block;
	}
	.upload_btn {
		text-align: center;
		font-size: 12px;
	}
</style>