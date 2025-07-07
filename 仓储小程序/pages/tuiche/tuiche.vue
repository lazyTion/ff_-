<template>
	<view style="position: relative" :class="size === 'small' ? 'small' : ''">
		<view class="uni-flex" :class="{unishadow :uniShadow}">
			<view class="uni-search-form uni-circular uni-background">
				<input 
					type="number" 
					:placeholder="lang.placeholder"  
					v-model="inputVal" 
					@input="onInput"
					@focus="onFocus"
					@change="change"
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
				>{{ lang.scanButton }}</button>
			</view>
		</view>

		<page-head :title="title"></page-head>
		<view class="uni-common-mt">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">{{ lang.materialName }}：</view>
					</view>
					<view class="uni-list-cell-db">
						<text style="display: block;" class="uni-input">{{wlmc}}</text>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">{{ lang.orderNumber }}</view>
					</view>
					<view class="uni-list-cell-db">
						<text style="display: block;" class="uni-input">{{czbh}}</text>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">{{ lang.carNumber }}</view>
					</view>
					<view class="uni-list-cell-db">
						<text style="display: block;" class="uni-input">{{ch}}</text>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">{{ lang.orderStatus }}</view>
					</view>
					<view class="uni-list-cell-db">
						<text style="display: block;" class="uni-input">{{yj}}</text>
					</view>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<view class="uni-btn-v">
					<button name="btn_tcqr" :disabled="isqrAble" type="primary" class="btn-setstorage" @tap="tcqr">{{ lang.returnConfirm }}</button>
					<button name="btn_tcqx" :disabled="isqxAble" @tap="tcqx">{{ lang.returnCancel }}</button>
				</view>
			</view>
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
				default() {
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
				ch:'',
				isqrAble:false,
				isqxAble:false,
				yj:'',
				czbh:'',
				wlmc:'',
				name:'',
				pwd:'',
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
				if(!val.length) {
					this.isShowClearIcon = false
				}
			}
		},
		onLoad: function (options) {
			var that = this;
			that.name = uni.getStorageSync("name");
			var se = uni.getStorageSync("sessionid");
			
			// 初始化语言
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
		},
		methods: {
			getempty:function(){
				var that=this;
				that.ch='';
				that.czbh='';
				that.yj='';
				that.wlmc='';
				that.isqrAble=false;
				that.isqxAble=false;
			},
			change:function(){},
			tcqr:function(){
				var that=this;
				if(that.czbh=='') {
					uni.showToast({
						title: that.lang.weightIdRequired,
						icon: 'none'
					});
				} else {
					that.name=uni.getStorageSync('name');
					that.pwd=uni.getStorageSync('pwd');
					uni.request({
						url: getApp().globalData.url +'tuiche.php',
						data: {
							'name':that.name,
							'pwd':that.pwd,
							'flag':'tcqr',
							'czbh':that.czbh,
							'cardid': that.inputVal
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							var json = res.data;
							var msg = '';
							
							if (typeof json != 'object') {
								if (json != null && json.length>0) {
									json = json.replace(/\ufeff/g,"");
									json = JSON.parse(json);
									var flag=json.flag;
									msg=json.msg;
								}
							} else {
								var flag=json.flag;
								msg=json.msg;
							}
							
							uni.showToast({
								title: msg,
								icon: 'none'
							});
							that.getempty();
							that.inputVal='';
						},
						fail:function(res) {
							console.log(res);
						}
					}) 
				}
			},
			tcqx:function(){
				var that=this;
				if(that.czbh=='') { 
					uni.showToast({
						title: that.lang.weightIdRequired,
						icon: 'none'
					});
				} else {
					that.name=uni.getStorageSync('name');
					that.pwd=uni.getStorageSync('pwd');
					uni.request({
						url: getApp().globalData.url +'tuiche.php',
						data: {
							'name':that.name,
							'pwd':that.pwd,
							'flag':'tcqx',
							'czbh':that.czbh,
							'cardid': that.inputVal
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							var json = res.data;
							var msg = '';
							
							if (typeof json != 'object') {
								if (json != null && json.length>0) {
									json = json.replace(/\ufeff/g,"");
									json = JSON.parse(json);
									var flag=json.flag;
									msg=json.msg;
								}
							} else {
								var flag=json.flag;
								msg=json.msg;
							}
							
							uni.showToast({
								title: msg,
								icon: 'none'
							});
							that.getempty();
							that.inputVal=''; 
						},
						fail:function(res) {
							console.log(res);
						}
					}) 
				}
			},
			closeDielog() {
				this.inputIsShow = false
			},
			onFocus() {
				if(this.dataList.length) {
					this.inputIsShow = true
					this.isShowClearIcon = !!this.inputVal
				}
			},
			onInput() {
				this.$emit('input', this.inputVal);
				var that=this;
				if(this.inputVal.trim().length >0) {
					uni.request({
						url: getApp().globalData.url +'tuiche.php',
						data: {
							'cardid': that.inputVal,
							'flag':'select'
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							var json = res.data;
							if (typeof json != 'object') {
								if (json != null && json.length>0) {
									json = json.replace(/\ufeff/g,"");
									json = JSON.parse(json);
									
									var flag=json.flag;
									if (flag.toString().trim() != 'false') {
										that.ch=json.ch;
										that.wlmc=json.wlmc;
										that.yj=json.yj;
										that.czbh=json.czbh;
										
										if (that.yj != null && that.yj=="退车") {
											that.isqrAble = true;
											that.isqxAble = false;
										} else {
											that.isqrAble= false;
											that.isqxAble = true;
										}
									} else {
										var msg=json.msg;
										uni.showToast({
											title: msg,
											icon: 'none'
										});
										that.isqrAble= true;
										that.isqxAble = true;
									}
								} else {
									uni.showToast({
										title: that.lang.noCardFound,
										icon: 'none'
									});
								}
							} else {
								var flag=json.flag;
								if (flag.toString().trim() != 'false') {
									that.ch=json.ch;
									that.wlmc=json.wlmc;
									that.yj=json.yj;
									that.czbh=json.czbh;
									
									if (that.yj != null && that.yj=="退车") {
										that.isqrAble = true;
										that.isqxAble = false;
									} else {
										that.isqrAble= false;
										that.isqxAble = true;
									}
								} else {
									var msg=json.msg;
									uni.showToast({
										title: msg,
										icon: 'none'
									});
									that.isqrAble= true;
									that.isqxAble = true;
								}
							}
						},
						fail:function(res) {
							console.log(res);
						}
					})  
				} else {
					that.getempty();
				}
			},
			handleSearch() {
				var that=this;
				this.inputIsShow = true
				this.$emit('handleSearch')
				uni.scanCode({
					success: function (res) {
						that.inputVal=res.result;
						that.$emit('input', that.inputVal);
						that.onInput();
					}
				});
			},
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
	.hover{
		transition: all .6s;
		transform: scale(0.8,0.8);
	}
	.uni-flex{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
	}
	.unishadow{
		box-shadow: 0rpx 1rpx 5rpx #DDDDDD;
	}
	.uni-search-form{
		position: relative;
		width: 60%;
		margin: 10rpx;
		padding: 10rpx 80rpx;
		font-size: 30rpx;
		color: #999999;
	}
	.uniRound{
		border-radius: 5px;
	}
	.uni-circular{
		border-radius: 100rpx;
	}
	.uni-icon-position{
		position: absolute;
		top: 50%;
		left: 26rpx;
		transform: translate(0,-50%);
	}
	.uni-icon-clear{
		position: absolute;
		top: 50%;
		right: 26rpx;
		transform: translate(0,-50%);
	}
	.uni-background{
		background-color: #F5F5F5;
	}
	.uni-action{
		width:120rpx;
		height: 66rpx; 
	}
	.uni-cu-btn{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 28rpx;
		border: none;
	}
	.uni-shadow-blur{
		box-shadow: 0rpx 1rpx 10rpx #C8C7CC;
	}
	.uni-round{
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
	.uni-combox__selector-empty{
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