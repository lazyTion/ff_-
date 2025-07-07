<template>
	<view style="position: relative;" :class="size === 'small' ? 'small' : ''" :class="languageClass">
		<view class="uni-flex" :class="{unishadow :uniShadow}">
			<view class="uni-search-form uni-circular uni-background">
				<icon type="search" size="14" class="uni-icon-position"/>
				<input 
					type="text" 
					:placeholder="lang.scanPlaceholder"  
					v-model="inputVal" 
					@input="onInput"
					@focus="onFocus"
					@change = "change"
				></input>
			</view>
			<view class="uni-action">
				<button 
					:disabled="loading" 
					class="uni-cu-btn uni-bg-gradual-green uni-shadow-blur uni-round" 
					:class="[type === 'primary' ? 'uni-primary' : (type === 'success' ? 'uni-success' : (type === 'warning' ? 'uni-warning' : 'uni-error'))]" 
					hover-class="hover" 
					@click="handleSearch"
				>{{ lang.scanButton }}</button>
		</view>
		
	 <uni-section :title="lang.testResultTitle" type="line"></uni-section>
	 <view class="example-body">
	 	<uni-grid :column="1"  :square="false" :highlight="false" @change="change" style="border-bottom: none;">
	 		<uni-grid-item  style="text-align: center;">
				<text class="text label-text">{{ lang.carNumber }}：{{ch}}</text>
			</uni-grid-item>
	 	</uni-grid>
		<uni-grid :column="2"  :square="false" :highlight="false" @change="change" >
			<uni-grid-item >
				<text class="text label-text">{{ lang.impurity }}：{{zz}}</text>
				<text class="text label-text">{{ lang.impurityDeduction }}：{{zzk}}</text>
		</uni-grid>
		<uni-grid :column="2"  :square="false" :highlight="false" @change="change">
				<text class="text label-text">{{ lang.moisture }}：{{sf}}</text>
				<text class="text label-text">{{ lang.moistureDeduction }}：{{sfk}}</text>
				<text class="text label-text">{{ lang.imperfectGrains }}：{{bwsl}}</text>
				<text class="text label-text">{{ lang.imperfectGrainsDeduction }}：{{bwslk}}</text>
				<text class="text label-text">{{ lang.moldyRate }}：{{mbl}}</text>
				<text class="text label-text">{{ lang.moldyRateDeduction }}：{{mblk}}</text>
				<text class="text label-text">{{ lang.whiteWaxyCornRate }}：{{bnl}}</text>
				<text class="text label-text">{{ lang.whiteWaxyCornDeduction }}：{{bnlk}}</text>
				<text class="text label-text">{{ lang.volumeWeightQuantity }}：{{rzsl}}</text>
				<text class="text label-text">{{ lang.volumeWeightGrade }}：{{rzdj}}</text>
		<uni-grid :column="1"  :square="false" :highlight="false" @change="change" style="border-bottom: none;">
				<text class="text label-text">{{ lang.predictedTon }}：{{ddwlsl}}</text>
			<uni-grid-item  >
				<text class="text label-text">{{ lang.totalDeduction }}：{{zk}}</text>
				<text class="text label-text">{{ lang.grossWeight }}：{{mz}}</text>
		<uni-grid :column="1"  :square="false" :highlight="false" @change="change" >
			<uni-grid-item   style="border-bottom-color: #e5e5e5;border-bottom-style: solid;border-bottom-width: 1px;">
				<text class="text label-text">{{ lang.remarks }}：{{bz}}</text>
	 </view>      
	</view>
</template>
<script>
	 import uniGrid from "@/components/uni-grid/uni-grid.vue"
	 import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
    import uniSection from '@/components/uni-section/uni-section.vue'
    // 导入语言资源
	import zh from '../language/zh.js';
	import ru from '../language/ru.js';
import { getLanguageClass } from '@/utils/i18n.js';
    
  
	export default {
		components: {
			uniSection,
			uniGrid,
			uniGridItem
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
				default() {
					return {}
			uniShadow: {
				default: true
			type: {
				default: 'primary'
			size: {
				default: 'medium'
			 },
		data() {
			return {
				inputIsShow: false,
				inputVal: '2222222',
				dataList: [],
				isShowClearIcon: false,
				ch:'',
				zz:'',
				zzk:'',
				sf:'',
				sfk:'',
				bwsl:'',
				bwslk:'',
				mbl:'',
				mblk:'',
				rzdj:'',
				rzsl:'',
				bnl:'',
				bnlk:'',
				ddwlsl:'',
				zk:'',
				mz:'',
				bz:'',
				currentLang: 'zh', // 当前语言
				lang: zh // 语言资源对象
				languageClass: 'lang-zh lang-transition page-selectResult'
		    }
		    
		computed: {
			dataListLength() {
				return this.dataList.length
			}
		watch: {
				handler(newVal) {
					this.inputVal = newVal
				},
				immediate: true
					this.dataList = newVal
				deep: true,
			inputVal(val) {
				if(!val.length) {
					this.isShowClearIcon = false
		onShow() {
			// 每次页面显示时检查语言设置
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			this.languageClass = getLanguageClass(this.currentLang, 'page-selectResult');
			// 设置页面标题
			uni.setNavigationBarTitle({
				title: this.lang.pageTitle.testResult
			});
		onLoad: function(options) {
			// 初始化语言
		methods: {
			closeDielog() {
				this.inputIsShow = false
			onFocus() {
				if(this.dataList.length) {
					this.inputIsShow = true
					this.isShowClearIcon = !!this.inputVal
			onInput() {
				this.$emit('input', this.inputVal);
				var that=this;
				if(that.inputVal.trim().length==12)
				{
					uni.showLoading({
						title: that.lang.loading,
						icon: 'loading'
					});
					uni.request({
					      
					       url: getApp().globalData.url +'showInfo.php',
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
														   console.log(111111);
														   console.log(json);
					             if (json != null&&json.length>0&&json.toString().trim()!='') {
					               json = json.replace(/\ufeff/g,"");
								   
					               json = JSON.parse(json);
								   if(json.flag=="2")
								   {
									   uni.showToast({
									   	title: that.lang.noCard,
									   	icon: 'none'
									   });
									   return;
								   }
														  that.ch=json.ch;
														  that.sf=json.sf;
														  that.zz=json.zz;
														  that.sfk=json.sfk;
														  that.zzk=json.zzk;
														  that.mbl=json.mbl;
														  that.mblk=json.mblk;
														  that.rzsl=json.rzsl;
														  that.rzdj=json.rzdj;
														  that.bwsl=json.bwsl;
														  that.bwslk=json.bwslk;
														  that.bnl=json.bnl;
														  that.bnlk=json.bnlk;
														  that.ddwlsl=json.ddwlsl;
														  that.mz=json.mz;
														  that.zk=json.zk;
														  that.bz=json.bz;
														  that.dataList=json;
					             }else{
															uni.showToast({
																title: that.lang.noData,
																icon: 'none'
															});
														}
					           } else{
								   if(Object.keys(json).length>0)
									   console.log(22222);
									   if(json.flag=="2")
									   {
										   uni.showToast({
											title: that.lang.noCard,
											icon: 'none'
										   });
										   return;
									   }
									   that.ch=json.ch;
									   that.sf=json.sf;
									   that.zz=json.zz;
									   that.sfk=json.sfk;
									   that.zzk=json.zzk; 
									   that.mbl=json.mbl;
									   that.mblk=json.mblk;
									   that.rzsl=json.rzsl;
									   that.rzdj=json.rzdj;
									   that.bwsl=json.bwsl;
									   that.bwslk=json.bwslk;
									   that.bnl=json.bnl;
									   that.bnlk=json.bnlk;
									   that.ddwlsl=json.ddwlsl;
									   that.mz=json.mz;
									   that.zk=json.zk;
									   that.bz=json.bz;
									   that.dataList=json;
								   }else{
									   	title: that.lang.noData,
														 
													  }
																
					       fail:function(res){
					         console.log(res);
					       }
					     })
										
					   
				
			handleSearch() {
				this.inputIsShow = true
				this.$emit('handleSearch')
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						that.inputVal=res.result;
						that.$emit('input', that.inputVal)
						that.onInput();
				    }
				});
			change(){
			
			clearInputValue() {
				this.inputVal = ''
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
	.hover{
		transition: all .6s;
		transform: scale(0.8,0.8);
	.uni-flex{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
	.unishadow{
		box-shadow: 0rpx 1rpx 5rpx #DDDDDD;
	.uni-search-form{
		position: relative;
		width: 60%;
		margin: 10rpx;
		padding: 10rpx 80rpx;
		font-size: 30rpx;
		color: #999999;
	.uniRound{
		border-radius: 5px;
	.uni-circular{
		border-radius: 100rpx;
	.uni-icon-position{
		position: absolute;
		top: 50%;
		left: 26rpx;
		transform: translate(0,-50%);
	.uni-icon-clear{
		right: 26rpx;
	.uni-background{
		background-color: #F5F5F5;
	/* button */
	.uni-action{
		width:120rpx;
		height: 66rpx; 
	.uni-cu-btn{
		height: 100%;
		color: #FFFFFF;
		font-size: 28rpx;
		border: none;
		// background-color: $uni-color-primary;
	.uni-shadow-blur{
		box-shadow: 0rpx 1rpx 10rpx #C8C7CC;
	.uni-round{
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
	.uni-combox__selector-empty{
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
		background-color: #efeff4;
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
</style>
