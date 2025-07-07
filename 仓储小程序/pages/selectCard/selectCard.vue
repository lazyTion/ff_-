<template>
	<view style="position: relative;" :class="size === 'small' ? 'small' : ''" :class="languageClass">
		<view class="uni-flex" :class="{unishadow :uniShadow}">
			<view class="uni-search-form uni-circular uni-background">
				<input type="text" :placeholder="lang.placeholder" v-model="inputVal" @input="onInput"></input>
			</view>
			<view class="uni-action">
				<button :disabled="loading" class="uni-cu-btn uni-bg-gradual-green uni-shadow-blur uni-round button-text"
					:class="[type === 'primary' ? 'uni-primary' : (type === 'success' ? 'uni-success' : (type === 'warning' ? 'uni-warning' : 'uni-error'))]"
					hover-class="hover" @click="handleSearch">{{ lang.scanButton }}</button>
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
</template>
<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
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
				ddwlsl: '',
				wlmc: '',
				ddbh: '',
				ck: '',
				guige: '',
				gbzt: '',
				currentLang: 'zh', // 当前语言
				lang: zh // 语言资源对象
				languageClass: 'lang-zh lang-transition page-selectCard'
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
		onLoad: function(options) {
			// 初始化语言
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			this.languageClass = getLanguageClass(this.currentLang, 'page-selectCard');
		methods: {
			selectInfo() {},
			closeDielog() {
				this.inputIsShow = false
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
			handleSearch() {
				this.inputIsShow = true
				uni.scanCode({
					success: function(res) {
						that.inputVal = res.result;
						that.$emit('input', that.inputVal);
						that.onInput();
					}
				});
			change() {},
			clearInputValue() {
				this.inputVal = ''
		}
	}
</script>
<style scoped lang="scss">
/* 导入国际化样式 */
@import '@/styles/i18n-styles.css';
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
</style>
