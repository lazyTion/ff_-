<template>
	<view style="position: relative" :class="size === 'small' ? 'small' : ''">
		<view class="uni-flex" :class="{unishadow :uniShadow}">
			<view class="uni-search-form uni-circular uni-background">
				<input 
					type="text" 
					:placeholder="lang.scanPlaceholder"  
					v-model="inputVal" 
					@input="onInput"
					@focus="onFocus"
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
		</view>

		
		 <view class="uni-common-mt">
	     		<view class="uni-list">
	     			<view class="uni-list-cell">
	     				<view class="uni-list-cell-left">
	     					<view class="uni-label">{{lang.carNumber}}</view>
	     				</view>
	     				<view class="uni-list-cell-db">
	     					<text style="display: block;" class="uni-input">{{ch}}</text>
						</view>
	     			</view>
	     			
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.woodTrayMin}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" @input="tpzdInput" type="digit" :placeholder="lang.woodTrayMinPlaceholder"  name="tpzd" :value="tpzd" ></input> 
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.woodTrayMax}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" @input="tpzgInput" type="digit" :placeholder="lang.woodTrayMaxPlaceholder"  name="tpzg" :value="tpzg" ></input> 
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.woodTrayQuantity}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" @input="tpslInput" type="number" :placeholder="lang.woodTrayQuantityPlaceholder"  name="tpsl" :value="tpsl" ></input> 
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.plasticTrayMin}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" @input="sltpzdInput" type="digit" :placeholder="lang.plasticTrayMinPlaceholder"  name="sltpzd" :value="sltpzd"></input> 
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.plasticTrayMax}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" @input="sltpzgInput" type="digit" :placeholder="lang.plasticTrayMaxPlaceholder"  name="sltpzg" :value="sltpzg" ></input> 
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.plasticTrayQuantity}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" @input="sltpslInput" type="number" :placeholder="lang.plasticTrayQuantityPlaceholder"  name="sltpsl" :value="sltpsl" ></input> 
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.ironTrayMin}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" @input="ironminInput" type="digit" :placeholder="lang.ironTrayMinPlaceholder"  name="ironmin" :value="ironmin"></input>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.ironTrayMax}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" @input="ironmaxInput" type="digit" :placeholder="lang.ironTrayMaxPlaceholder"  name="ironmax" :value="ironmax"></input>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.ironTrayQuantity}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" @input="ironnumInput" type="number" :placeholder="lang.ironTrayQuantityPlaceholder"  name="ironnum" :value="ironnum" ></input> 
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.minImpurity}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" @input="zzzdInput" type="digit" :placeholder="lang.minImpurityPlaceholder"  name="zzzd" :value="zzzd" ></input> 
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">{{lang.maxImpurity}}</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" @input="zzzgInput" type="digit" :placeholder="lang.maxImpurityPlaceholder"  name="zzzg" :value="zzzg"></input> 
						</view> 
					</view>
					
				    <view class="uni-list-cell">
				    	<view class="uni-list-cell-left">
				    		<view class="uni-label">{{lang.includeImpurity}}</view>
				    	</view>
				    	<view class="uni-list-cell-db">
								<checkbox-group name="ai" @change="chk">
									<label class="uni-list-cell uni-list-cell-pd">
										<view>
											<checkbox :value="lang.plasticCloth" :checked="slcheck" />
										</view>
										<view>{{lang.plasticCloth}}</view>
									</label>
									<label class="uni-list-cell uni-list-cell-pd">
											<view>
											<checkbox :value="lang.kraftPaper" :checked="npzcheck" />
										</view>
										<view>{{lang.kraftPaper}}</view>
									</label>
									<label class="uni-list-cell uni-list-cell-pd">
										<view>
											<checkbox :value="lang.corrugatedPaper" :checked="wlzcheck" />
										</view>
										<view>{{lang.corrugatedPaper}}</view>
									</label>
									<label class="uni-list-cell uni-list-cell-pd">
										<view>
											<checkbox :value="lang.desiccant" :checked="gzjcheck" />
										</view>
										<view>{{lang.desiccant}}</view>
									</label>
								</checkbox-group>
						</view>
				    </view>
				</view>
	     		<view class="uni-padding-wrap">
	     			<view class="uni-btn-v">
	     				<button name="btn_tjqr"  type="primary" class="btn-setstorage" @tap="tjqr">{{lang.addConfirmButton}}</button>
	     			</view>
	     		</view>
	     </view>
	</view>
</template>
<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import zh from '../language/zh.js';
	import ru from '../language/ru.js';
	
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
			 },
			// isShowSelect: {
			// 	type: Boolean,
			// 	default: false
			// }
		},
		data() {
			return {
				inputIsShow: false,
				inputVal: '2222222',
				dataList: [],
				placeholder: '请扫码',
				isShowClearIcon: true,
				ch:'',
				czbh:'',
				'zzzg':'',
				'zzzd':'',
				tpzg:'',
				'tpzd':'',
				'name':'',
				'pwd':'',
				'cls':'',
				'sflag':'',
				'sltpsl':'',
				'sltpzg':'',
				'sltpzd':'',
				'ironmin':'',
				'ironmax':'',
				'ironnum':'',
				'tpsl':'',
				'msg':'',
				'zwmes':'',
				'slcheck':false,
				'npzcheck':false,
				'wlzcheck':false,
				'gzjcheck':false,
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
		// 初始化语言
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			
            var name = uni.getStorageSync("name");
            var se = uni.getStorageSync("sessionid");
			if (se == '') {
			  uni.showModal({
				title: that.lang.notLoggedInTitle,
				
				content: that.lang.notLoggedInContent,
				success:function(res) {
				  if (res.confirm) {
					uni.navigateTo({
						url: '../login/login',
					})

				  } else if (res.cancel) {
					uni.navigateTo({
					  url: '../login/login',
					})
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
				},
				method: 'POST',
				header: {
				  'Content-Type': 'application/x-www-form-urlencoded'
				},
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

				  }
				  if (flag.toString().trim() == 'false') {
					uni.showModal({
					  title: '登录已过期',
					  content: msg,
					  success: function (res) {
						if (res.confirm) {
						  uni.redirectTo({
							url: '../login/login',
						  })

						} else if (res.cancel) {
						  uni.redirectTo()({
							url: '../login/login',
						  })
						}
					  }

					})
				  }

				}

			  })
			}

    },
  
 
		methods: {
			chk:function(e){
				this.cls=e.detail.value	
						
				this.cls=this.cls.join(",");
				this.cls+=',';
				
			},
			checkboxChange: function (e) {
				// var items = this.items,
				// 	values = e.detail.value;
				// for (var i = 0, lenI = items.length; i < lenI; ++i) {
				// 	const item = items[i]
				// 	if(values.includes(item.value)){
				// 		this.$set(item,'checked',true)
				// 	}else{
				// 		this.$set(item,'checked',false)
				// 	}
				// }
			},
			getempty:function(){
				var that=this;
				
				that.ch='';
				that.zzzg='';
				that.zzzd='';
				that.tpzg='';
				that.tpzd='';
				that.sltpsl='';
				that.sltpzg='';
				that.sltpzd='';
				that.ironmin='';
				that.ironmax='';
				that.ironnum='';
				that.tpsl='';							
				that.zwmes='';
				//that.inputVal='';
				that.slcheck=false;
				that.npzcheck=false; 
				that.wlzcheck=false;
				that.gzjcheck=false;
				
				// uni.redirectTo({
				// 	url:'../tuopan/tuopan'
				// })
			},
			
			tjqr:function(){
				var that=this;
				if(that.ch=='')
				{
					uni.showToast({
						title: '车号不可为空',
						icon: 'none'
					});
				}else{
					// that.name=uni.getStorageSync('name');
					// that.pwd=uni.getStorageSync('pwd');
					var bhzw=that.cls;
					// for(var i=0;i<=3;i++)
					// {
					// 	if(that.items[i].checked==true)
					// 	{
					// 		bhzw+=that.items[i].name+',';
					// 	}
					// }
					
					uni.request({
						         
						          url: getApp().globalData.url +'tuopan.php',
						            data: {
									  // 'name':that.name,
									  // 'pwd':that.pwd,
						              'flag':'tjqr',
						              'czbh':that.czbh,
									  'zzzg':that.zzzg,
									  'zzzd':that.zzzd,
									  tpzg:that.tpzg,
									  'tpzd':that.tpzd,
									  'sltpsl':that.sltpsl,
									  'sltpzg':that.sltpzg,
									  'sltpzd':that.sltpzd,
									  'ironmin':that.ironmin,
									  'ironmax':that.ironmax,
									  'ironnum':that.ironnum,
									  'tpsl':that.tpsl,
									  'cardid': that.inputVal,
									  'zwmes':that.cls
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
						                if (json != null&&json.length>0) {
						                  json = json.replace(/\ufeff/g,"");
						                  json = JSON.parse(json);
										  var flag=json.flag;
										  var msg=json.msg;
										 uni.showToast({
										 	title: msg,
										 	icon: 'success',
											success() {
												uni.redirectTo({
													url:'../tuopan/tuopan'
												})
											}
										 });
										 
						                }
						              } else{
										  console.log(22222);
										 var flag=json.flag;
										 var msg=json.msg;
										 uni.showToast({
										 	title: msg,
										 	icon: 'success',
											success() {
												uni.redirectTo({
													url:'../tuopan/tuopan'
												})
											}
										 });
										  
									  }
									   
									 
									 	  
									     },
									   fail:function(res){
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
				// if(this.inputVal.length==10)
				// {
					var that=this;
					that.npzcheck=false;
					that.slcheck=false;
					that.wlzcheck=false;
					that.gzjcheck=false;
					
					var that=this;
					if(this.inputVal.trim().length >0)
					{
					   uni.request({
					         
					          url: getApp().globalData.url +'tuopan.php',
					            data: { 
					              
					              'cardid': that.inputVal,
								  'flag':'select'
					            },
					            method: 'POST',
					            header: {
					              'Content-Type': 'application/x-www-form-urlencoded'
					            },
					            success: function(res) {
					             // console.log(res);
					              var json = res.data;
					   //          if(json.toString().trim()=='')
								// {
								//     that.getempty();
								// 	return;
									
								// }else{
					              if (typeof json != 'object') {
									
					                if (json != null&&json.length>0&&json.toString().trim()!="") {
					                  json = json.replace(/\ufeff/g, "");
									  console.log(json);
					                  json = JSON.parse(json);
									  var flag=json.flag;
									   var msg=json.msg;
									   
									  	if (flag.toString().trim() == 'false') {
										  uni.showToast({
											title: msg,
											icon: 'none'
										  });
									  	}else{
											console.log(111111);
											  that.ch=json.ch;
																			
											  that.czbh=json.czbh;
											  that.tpsl=json.tpsl;			
											  that.tpzg=json.tpzg;							
											  that.tpzd=json.tpzd;
											  that.zzzd=json.zzzd;
											  that.zzzg=json.zzzg;
											  that.sltpsl=json.sltpsl;
											  that.sltpzg=json.sltpzg;							
											  that.sltpzd=json.sltpzd;
											  that.ironmin=json.ttpzd;
											  that.ironmax=json.ttpzg;
											  that.ironnum=json.ttpsl;
											  that.zwmes=json.zwmes;
											  if(that.zwmes != null && that.zwmes != "")
											  { 
												var values = that.zwmes;
												 	
												if(values.includes('塑料布')){
													that.slcheck=true;
												}
												if(values.includes('牛皮纸')){
													that.npzcheck=true; 
												}
												if(values.includes('瓦楞纸')){
													that.wlzcheck=true;
												}
												if(values.includes('干燥剂')){
													that.gzjcheck=true;
												}
												that.cls=that.zwmes;
											  }						  
									  	}
					                }else{
										uni.showToast({
											title: '未查询到卡号',
											icon: 'none'
										});
									}
					              } else{
									  console.log(22222);
									  var flag=json.flag;
									  var msg=json.msg;
									  console.log(msg);
									  if (flag.toString().trim() == 'false') {
										  uni.showToast({
											title: msg,
											icon: 'none'
										  });
									  }else{
										  that.ch=json.ch;
																		
										  that.czbh=json.czbh;
										  that.tpsl=json.tpsl;			
										  that.tpzg=json.tpzg;							
										  that.tpzd=json.tpzd;
										  that.zzzd=json.zzzd;
										  that.zzzg=json.zzzg;
										  that.sltpsl=json.sltpsl;
										  that.sltpzg=json.sltpzg;							
										  that.sltpzd=json.sltpzd;
										  that.ironmin=json.ttpzd;
										  that.ironmax=json.ttpzg;
										  that.ironnum=json.ttpsl;
										  that.zwmes=json.zwmes;
										  if(that.zwmes != null && that.zwmes != "")
										 { 
											    var values = that.zwmes;
												
												if(values.includes('塑料布')){
													that.slcheck=true;
													
												}
												if(values.includes('牛皮纸')){
													that.npzcheck=true; 
												}
												if(values.includes('瓦楞纸')){
													that.wlzcheck=true;
													
												}
												if(values.includes('干燥剂')){
													that.gzjcheck=true;
													
												}
										 		that.cls=that.zwmes;										 
										 												  
										 }
									 								  
									 								  
									 								  
									 }
								  }
								  
								  
					             },
								  fail:function(res){
								   
								    console.log(res);
								  }
								})  
				// }else{
					
				// }
					}	 
			},
			handleSearch() {
				var that=this;
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
			},
			valInput(){
				this.$emit('input', this.inputVal);
			},
			zzzdInput(e){
				 this.zzzd = e.detail.value 
			},
			tpzdInput(e){
				 this.tpzd = e.detail.value 
			},
			tpzgInput(e){
				 this.tpzg = e.detail.value 
			},
			tpslInput(e){
				 this.tpsl = e.detail.value 
			},
			sltpzdInput(e){
				 this.sltpzd = e.detail.value 
			},
			sltpzgInput(e){
				 this.sltpzg = e.detail.value 
			},
			sltpslInput(e){
				 this.sltpsl = e.detail.value 
			},
			ironminInput(e){
				this.ironmin = e.detail.value
			},
			ironmaxInput(e){
				this.ironmax = e.detail.value
			},
			ironnumInput(e){
				this.ironnum = e.detail.value
			},
			zzzgInput(e){
				this.zzzg = e.detail.value 
			},
			
			clearInputValue() {
				this.inputVal = ''
			}
		}
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
	
	.uni-list-cell {
	    justify-content: flex-start
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
	/* button */
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
		// background-color: $uni-color-primary;
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
	.uni-combox__selector-empty{
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
</style>