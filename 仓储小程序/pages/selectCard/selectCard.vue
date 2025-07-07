<template>
	<view style="position: relative;" :class="size === 'small' ? 'small' : ''">
		<view class="uni-flex" :class="{unishadow :uniShadow}">
			<view class="uni-search-form uni-circular uni-background">
				<input type="text" :placeholder="lang.placeholder" v-model="inputVal" @input="onInput"></input>
			</view>
			<view class="uni-action">
				<button :disabled="loading" class="uni-cu-btn uni-bg-gradual-green uni-shadow-blur uni-round"
					:class="[type === 'primary' ? 'uni-primary' : (type === 'success' ? 'uni-success' : (type === 'warning' ? 'uni-warning' : 'uni-error'))]"
					hover-class="hover" @click="handleSearch">{{ lang.scanButton }}</button>
			</view>
		</view>

		<view class="example-body">
			<uni-list>
				<uni-list-item :show-arrow="false"><text>{{ lang.materialName }}：{{wlmc}}</text></uni-list-item>
				<uni-list-item :show-arrow="false">{{ lang.orderNumber }}：{{ddbh}}</uni-list-item>
				<uni-list-item :show-arrow="false">{{ lang.carNumber }}：{{ch}}</uni-list-item>
				<uni-list-item :show-arrow="false">{{ lang.specification }}：{{guige}}</uni-list-item>
				<uni-list-item :show-arrow="false">{{ lang.quantity }}：{{ddwlsl}}</uni-list-item>
				<uni-list-item :show-arrow="false">{{ lang.weighingStatus }}：{{gbzt}}</uni-list-item>
				<uni-list-item :show-arrow="false">{{ lang.warehouseInfo }}：{{ck}}</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
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
				ddwlsl: '',
				wlmc: '',
				ddbh: '',
				ck: '',
				guige: '',
				gbzt: '',
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
			// 初始化语言
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
		},
		methods: {
			selectInfo() {},
			closeDielog() {
				this.inputIsShow = false
			},
			onInput() {
				this.$emit('input', this.inputVal);
				var that = this;
				if (this.inputVal.trim().length ==12) {
					uni.request({
						url: getApp().globalData.url + 'zaichang.php',
						data: {
							'cardid': that.inputVal,
							'lang': that.currentLang // 传递语言参数给后端
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
									that.wlmc = json.wlmc;
									that.ddbh = json.ddbh;
									that.guige = json.guige;
									that.gbzt = json.gbzt;
									that.ck = json.ck;
								} else {
									uni.showToast({
										title: that.lang.noCard,
										icon: 'none'
									});
								}
							} else {
								that.ch = json.ch;
								that.ddwlsl = json.ddwlsl;
								that.wlmc = json.wlmc;
								that.ddbh = json.ddbh;
								that.guige = json.guige;
								that.gbzt = json.gbzt;
								that.ck = json.ck;
							}
						}
					})
				}
			},
			handleSearch() {
				var that = this;
				this.inputIsShow = true
				uni.scanCode({
					success: function(res) {
						that.inputVal = res.result;
						that.$emit('input', that.inputVal);
						that.onInput();
					}
				});
			},
			change() {},
			clearInputValue() {
				this.inputVal = ''
			}
		}
	}
</script>

<style scoped lang="scss">
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
</style>