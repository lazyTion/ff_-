<template>
  <view class="content">
    <view class="btnss">
      <button class="btn1" @click="onclick(0)">{{lang.pendingEntry}}</button>
      <button class="btn2" @click="onclick(1)">{{lang.entered}}</button>
      <button class="btn3" @click="onclick(2)">{{lang.completed}}</button>
    </view>
    
    <view class="uni-list" v-for="(item, index) in info" :key="index">
      <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="click" :data-cph='item.cph' :data-czbh='item.czbh'>
        <view class="uni-list-cell-navigate">
          {{lang.licensePlate}}：{{item.cph}}
        </view>
        <view class="uni-list-cell-navigate uni-navigate-right">
          {{lang.status}}：{{item.gbzt}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	
	import zh from '../language/zh.js';
	import ru from '../language/ru.js';
	export default {
		data() {
			return {
				info:null,
				currentLang: 'zh', // 当前语言
				lang: zh ,// 语言资源对象
			}
		},
		onLoad(options) {
		  var that = this;
		 // console.log(111);
		  // 查看是否授权
		this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
		  var that = this;
		  that.name = uni.getStorageSync('name');
		    wx.request({
		      
		      url: getApp().globalData.url+'cheliang.php',
		      data: {
		        "userid": that.name,
				"name": '',
				"zt":"10086"
		      },
		      method: 'POST',
		      header: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		      },
		      success: res => {
		        console.log(getApp().globalData.sessionid);
		        var jsonStr = res.data;
		        //jsonStr = jsonStr.replace(" ", "");
		        if (typeof jsonStr != 'object') {
		          jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
		          var jj = JSON.parse(jsonStr);
		          console.log("msg：" + jj.msg);
		          var flag = jj.flag;
		          if (flag==false) {
		            wx.showToast({
		              title: jj.msg,
		              icon: "none"
		            });
		            getApp().globalData.info=null;
		          }else{
		            getApp().globalData.info = jj;
		          }
		        }
		          else{
		            if(jsonStr.flag==false)
		            {
		              console.log("msg：" + jsonStr.msg);
		              wx.showToast({
		                title: jsonStr.msg,
		                icon: "none"
		              });
		              getApp().globalData.info = null;
		            }else{
		              getApp().globalData.info = jsonStr;
		            }
		          }
				  this.info=getApp().globalData.info;
				  console.log(this.info);
		      },
		      fail: function (res) {
		        console.log(res);
		      }
		
		    })
		
		 
		 
		},
		
		methods: {
			onclick(ou){
				 var that = this;
				 that.name = uni.getStorageSync('name');
				 var a=ou;
				 console.log(a);
				 wx.request({
				   
				   url: getApp().globalData.url+'cheliang.php',
				   data: {
				     "userid": that.name,
				 					 "name": '',
									 "zt":a,
									 "tz":'1'
				   },
				   method: 'POST',
				   header: {
				     'Content-Type': 'application/x-www-form-urlencoded'
				   },
				   success: res => {
				     console.log(getApp().globalData.sessionid);
				     var jsonStr = res.data;
				     //jsonStr = jsonStr.replace(" ", "");
				     if (typeof jsonStr != 'object') {
				       jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
				       var jj = JSON.parse(jsonStr);
				       console.log("msg：" + jj.msg);
				       var flag = jj.flag;
				       if (flag==false) {
				         wx.showToast({
				           title: jj.msg,
				           icon: "none"
				         });
				         getApp().globalData.info=null;
				       }else{
				         getApp().globalData.info = jj;
				       }
				     }
				       else{
				         if(jsonStr.flag==false)
				         {
				           console.log("msg：" + jsonStr.msg);
				           wx.showToast({
				             title: jsonStr.msg,
				             icon: "none"
				           });
				           getApp().globalData.info = null;
				         }else{
				           getApp().globalData.info = jsonStr;
				         }
				       }
				 								  this.info=getApp().globalData.info;
				 								  console.log(this.info);
				   },
				   fail: function (res) {
				     console.log(res);
				   }
				 						
				 })
						
				
			},
			click(event) {
			
			  const cph = event.currentTarget.dataset.cph;
			  const czbh = event.currentTarget.dataset.czbh;
			 wx.navigateTo({
			     url: '../erwm/erwm?cph=' +cph+ '&czbh=' + czbh
			})
			},
		}
	}
</script>

<style>
.btnss{
	width: 100%;
}
.btn1{
	float: left;
	background-color: aqua;
	border: 3px;
	width: 30;
}
.btn2{
	float: left;
	background-color: aqua;
	border: 3px;
	width: 30;
}
.btn3{
	float: left;
	background-color: aqua;
	border: 3px;
	width: 30;
}
</style>
