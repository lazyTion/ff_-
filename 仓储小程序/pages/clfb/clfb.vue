<template>
	<view style="position: relative" :class="size === 'small' ? 'small' : ''" :class="languageClass">
		<view class="uni-flex" :class="{unishadow :uniShadow}">
			<view class="uni-search-form uni-circular uni-background">
				<input 
					type="text" 
					:placeholder="lang.scanPlaceholder"  
					v-model="inputVal" 
					@input="onInput"
					@focus="onFocus"
					@change = "change"
				></input>
				<icon type="search" size="14" class="uni-icon-position" @tap="selectInfo"/>
			</view>
			<view class="uni-action">
				<button 
					:disabled="loading" 
					class="uni-cu-btn uni-bg-gradual-green uni-shadow-blur uni-round" 
					:class="[type === 'primary' ? 'uni-primary' : (type === 'success' ? 'uni-success' : (type === 'warning' ? 'uni-warning' : 'uni-error'))]" 
					hover-class="hover" 
					@click="handleSearch"
				>{{lang.scanButton}}</button>
		</view>

		<page-head :title="title"></page-head>
		<view class="uni-common-mt">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">{{lang.orderNumber}}</view>
					</view>
					<view class="uni-list-cell-db">
						<text style="display: block;" class="uni-input label-text">{{czbh}}</text>
				</view>
						<view class="uni-label">{{lang.carNumber}}</view>
						<text style="display: block;" class="uni-input label-text">{{ch}}</text>
						<view class="uni-label">{{lang.entryWeight}}</view>
						<text style="display: block;" class="uni-input label-text">{{jczl}}</text>
						<view class="uni-label">{{lang.entryTime}}</view>
						<text style="display: block;" class="uni-input label-text">{{jcsj}}</text>
						<view class="uni-label">{{lang.weighingNumber}}</view>
			<view class="uni-padding-wrap">
				<view class="uni-btn-v">
					<button name="btn_fbqr" :disabled="isqrAble" type="primary" class="btn-setstorage button-text" @tap="fbqr">
						{{lang.reweighConfirm}}
					</button>
	</view>
</template>
<script>
	 import uniList from '@/components/uni-list/uni-list.vue'
	 import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
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
			// placeholder: {
			// 	type: String,
			// 	default: '请输入信息'
			// },
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
			// isShowSelect: {
			// 	type: Boolean,
			// 	default: false
			// }
		data() {
			return {
				inputIsShow: false,
				inputVal: '2222222',
				dataList: [],
				placeholder: '请扫码',
				isShowClearIcon: true,
				ch:'',
				isqrAble:false,
				isqxAble:false,
				jczl:'',
				czbh:'',
				jcsj:'',
				ddbh:'',
				'name':'',
				'pwd':'',
				currentLang: 'zh', // 当前语言
				lang: zh // 语言资源对象
				languageClass: 'lang-zh lang-transition page-clfb'
	
				
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
		onLoad: function (options) {
           var that = this;
		this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			this.languageClass = getLanguageClass(this.currentLang, 'page-clfb');
            var name = uni.getStorageSync("name");
            var se = uni.getStorageSync("sessionid");
			if (se == '') {
			  uni.showModal({
				title: this.lang.notLoggedInTitle,
				content: this.lang.notLoggedInContent,
				success:function(res) {
				  if (res.confirm) {
					uni.navigateTo({
						url: '../login/login',
					})
				  } else if (res.cancel) {
					  url: '../login/login',
				  }
				}  
			  })  
			}else{
			  getApp().globalData.sessionid = se;
			  getApp().globalData.phone = name;
			  uni.request({
				url: getApp().globalData.url + 'login/check.php',
				data: {
				  name: getApp().globalData.phone,
				  sessionid: getApp().globalData.sessionid
				method: 'POST',
				header: {
				  'Content-Type': 'application/x-www-form-urlencoded'
				success: res => {
					
				  var jsonStr = res.data;
				 
				  if (typeof jsonStr != 'object') {
					jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
					var jj = JSON.parse(jsonStr);
					var flag = jj.flag;
					var msg = jj.msg;
				  } else {
					var flag = jsonStr.flag;
					var msg = jsonStr.msg;
				  if (flag.toString().trim() == 'false') {
					uni.showModal({
					  title: this.lang.loginExpiredTitle,
					  content: msg,
					  success: function (res) {
						if (res.confirm) {
						  uni.navigateTo({
							url: '../login/login',
						  })
						} else if (res.cancel) {
						}
					  }
			  })
    },
 
		methods: {
			getempty:function(){
				var that=this;
				that.ch='';
				that.czbh='';
				that.ddbh='';
				that.jczl='';
				that.jcsj='';
				that.isqrAble=false;
				that.inputVal='';
			change:function(){
			fbqr:function(){
				if(that.czbh=='')
				{
					uni.showToast({
						title: this.lang.weightIdRequired,
						icon: 'none'
					});
				}else{
					// that.name=uni.getStorageSync('name');
					// that.pwd=uni.getStorageSync('pwd');
					uni.request({
						         
						          url: getApp().globalData.url +'clfb.php',
						            data: {
									  // 'name':that.name,
									  // 'pwd':that.pwd,
						              'flag':'fbqr',
						              'czbh':that.czbh,
									  'cardid': that.inputVal
									  
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
						                if (json != null&&json.length>0) {
						                  json = json.replace(/\ufeff/g,"");
						                  json = JSON.parse(json);
										  var flag=json.flag;
										  var msg=json.msg;
										 
						                }
						              } else{
										  console.log(22222);
										 var flag=json.flag;
										 var msg=json.msg;
									  }
									   uni.showToast({
									   	title: msg,
									   	icon: 'none'
									   });
					                    that.getempty();
									 
									 	  
									     },
									   fail:function(res){
									     
									     console.log(res);
									   }
									 }) 
			closeDielog() {
				this.inputIsShow = false
			onFocus() {
				if(this.dataList.length) {
					this.inputIsShow = true
					this.isShowClearIcon = !!this.inputVal
			onInput() {
				this.$emit('input', this.inputVal);
				if(that.inputVal.trim().length >0){
				   uni.request({
				         
				          url: getApp().globalData.url +'clfb.php',
				            data: {
				              
				              'cardid': that.inputVal,
							  'flag':'select'
				            },
				            method: 'POST',
				            header: {
				              'Content-Type': 'application/x-www-form-urlencoded'
				            success: function(res) {
				              console.log(res.data);
				              var json = res.data;
				            
				              if (typeof json != 'object') {
								   console.log(111111);
				                if (json != null&&json.length>0&&json.toString().trim()!="") {
				                  json = json.replace(/\ufeff/g,"");
				                  json = JSON.parse(json);
								  that.ch=json.ch;
								
								  that.ddbh=json.ddbh;
				                   that.jczl=json.mz;
								  that.jcsj=json.mzsj;
								  that.czbh=json.czbh;
								  	
				                }else{
									uni.showToast({
										title: this.lang.cardNotFound,
										icon: 'none'
									});
								}
				              } else{
								  console.log(22222);
								 that.ch=json.ch;
								 								
								 that.ddbh=json.ddbh;
								  that.jczl=json.mz;
								 that.jcsj=json.mzsj;
								 that.czbh=json.czbh;
							  }
								  
							    },
							  fail:function(res){
							   
							    console.log(res);
							})  
						 }
			handleSearch() {
				this.inputIsShow = true
				this.$emit('handleSearch')
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						that.inputVal=res.result;
						that.$emit('input', that.inputVal);
						that.onInput();
				    }
				});
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
		
</style>
