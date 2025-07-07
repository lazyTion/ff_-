<template>
	<view>
		<view class="test">
			<button type="primary" @click="addyc">{{lang.addException}}</button>
		</view>
		<view class="table">
		  <view class="tr bg-w">
		    <view class="th"  style="width:40px">{{lang.serialNumber}}</view>
		    <view class="th">{{lang.status}}</view>
		    <view class="th">{{lang.submissionTime}}</view>
			<view class="th">{{lang.remarks}}</view>
		  </view>
		  
		  <view class="tr" v-for="val in valdata" :key="val.index">
		    <view class="td" style="width:40px" :value="val.index">{{val.index}}</view>
		    <view class="td" :value="val.yztxx">{{val.yztxx}}</view>
		    <view class="td" :value="val.ytime">{{val.ytime}}</view>
			<view class="td" :value="val.yname">{{val.yname}}</view>
		  </view>
		</view>
	</view>
</template>
<script>
   import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
   import vTable from "@/components/no-bad-table/table.vue"
 import zh from '../language/zh.js';
 import ru from '../language/ru.js';
   export default {
       components: {
           MxDatePicker,
		   vTable
       },
       data() {
           return {
               
			    
				currentLang: 'zh', // 当前语言
				lang: zh ,// 语言资源对象
				valdata:[]
									
			}

       },
	   onLoad: function (options) {
	          var that = this;
	   this.currentLang = uni.getStorageSync('lang') || 'zh';
	   	this.lang = this.currentLang === 'zh' ? zh : ru;
	           var name = uni.getStorageSync("name");
	           var se = uni.getStorageSync("sessionid");
	   		if (se == '') {
	   		  uni.showModal({
	   			title: this.lang.notLoginTitle,
	   			
	   			content: this.lang.notLoginContent,
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
	   				  title: this.lang.loginExpiredTitle,
	   				  content: msg,
	   				  success: function (res) {
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
	   			  }
	   
	   			}
	   
	   		  })
	   		}
			uni.request({
				         
				          url: getApp().globalData.url +'chaxunyc.php',
				            data: {

							 'username':uni.getStorageSync('username')
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
								 
								  for(var i=0;i<json.length;i++)
								  {
									  var newStu = {
										  index:json[i]['index'],
										  yztxx: json[i]['yztxx'],
										  yname:json[i]['yname'],
										  ytime: json[i]['ytime']
									  }
									  that.valdata.push(newStu);
								  }
												 // console.log(that.valdata);
				                }
				              } else{
								  console.log(22222);
								  
								  for(var i=0;i<json.length;i++)
								  {
									  var newStu = {
													index:json[i]['index'],
													yztxx: json[i]['yztxx'],
													yname:json[i]['yname'],
													ytime: json[i]['ytime']
													 }
									that.valdata.push(newStu);			 
									 
								  }
								  console.log(that.valdata);
							  }
										
				              // that.setData({
				              //   'info': json,
				              //   'flag':true
				              // })
							  that.dataList=json;
							  
							  
				            },
				          fail:function(res){
				            
				            console.log(res);
				          }
				        })
				
				
			},
		
		
		methods:{
			addyc(){
				uni.navigateTo({
				  url: '/pages/addyc/addyc'
				})
			}
		}	
	   }
		

</script>
<style>
.example {
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 14rpx;
	background-color: #ffffff;
}
,
.test {
	text-align: center;
	padding: 10px 0;
}
,
.button {
	margin: 20upx;
	font-size: 28upx;
}
,
.content {
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: #fbf9fe;
},.table {
  border: 0px solid darkgray;
  font-size: 12px;
}
.tr {
  display: flex;
  width: 100%;
  justify-content: center;
/*  height: 2rem; */
  align-items: center;
}
.td {
    width:40%;
    justify-content: center;
    text-align: center;
}
.bg-w{
  background: snow;
}

.th {
  width: 40%;
  justify-content: center;
  background: #3366FF;
  color: #fff;
  display: flex;
  height: 2rem;
  align-items: center;
}
</style>
