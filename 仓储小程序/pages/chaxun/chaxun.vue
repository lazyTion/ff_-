<template>
  <view>
    <view class="test">
      <view>{{ lang.dateRangeSelect }}</view>

      {{ rangetime[0] }} - {{ rangetime[1] }}
      <button type="primary" @click="onShowDatePicker('rangetime')">{{ lang.selectDateTimeRange }}</button>
    </view>
    <mx-date-picker
        :show="showPicker"
        :type="type"
        :value="value"
        :show-tips="true"
        :begin-text="lang.beginText"
        :end-text="lang.endText"
        :show-seconds="true"
        @confirm="onSelected"
        @cancel="onSelected"
    />
    <view class="table">

      <view v-for="val in valdata" :key="val.index">
        <view class="tr" style="background-color: #B2B2B2;">
          <view style="text-align: left;">{{ lang.materialName }}：{{ val.wlmc }}</view>
        </view>
        <view class="tr">
          <view class="td">{{ lang.carNumber }}：{{ val.ch }}</view>
          <view class="td">{{ lang.specification }}：{{ val.guige }}</view>
          <view class="td">{{ lang.quantity }}：{{ val.ddwlsl }}</view>
        </view>
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
      showPicker: false,

      rangetime: ['', ''],

      type: 'rangetime',
      value: '',
      listData: [
        {"code": "120", "text": "70", "date": "2018年4月19日"},
        {"code": "125", "text": "74", "date": "2018年4月17日"},

        {"code": "119", "text": "76", "date": "2018年4月16日"},
        {"code": "117", "text": "78", "date": "2018年4月15日"}
      ],
      valdata: [],
	  currentLang: 'zh', // 当前语言
	  lang: zh // 语言资源对象

    }

  },
  onLoad: function (options) {
    var that = this;


    var date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    var time1 = year + '/' + month + '/' + day + ' 00:00';
    var time2 = year + '/' + month + '/' + day + ' 23:59';
    console.log(time1 + time2);
    that.rangetime[0] = time1;
    that.rangetime[1] = time2;

		this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
    var name = uni.getStorageSync("name");
    var se = uni.getStorageSync("sessionid");
    if (se == '') {
      uni.showModal({
        title: this.lang.notLoginTitle,

        content: this.lang.notLoginContent,
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
    } else {
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

  },
  methods: {
    // out(e){
    //  console.log(111);
    //  console.log(e);
    //  var vid=e.target.dataset.czbh;
    //  console.log("../cxdetail/cxdetail?czbh="+vid);
    //  uni.navigateTo({
    //  	  url:"../cxdetail/cxdetail?czbh="+vid
    //  })


    // },
    colsSpanMethod(row, column, rowIndex, columnIndex) {
      // console.log(column)
      if (column.key == 'name' && row.nameCols == 2) {
        return {
          rowspan: 1,
          colspan: 2
        };
      } else if (row.nameCols == 2 && column.key == 'age') {
        return {
          rowspan: 1,
          colspan: 0
        };
      } else {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
    },
    onShowDatePicker(type) {//显示
      this.type = type;
      this.showPicker = true;
      this.value = this[type];
    },
    onSelected(e) {//选择
      this.showPicker = false;
      if (e) {
        this[this.type] = e.value;
        //选择的值
        console.log('value => ' + e.value);
        var that = this;
        that.value = e.value;
        var val = e.value.toString();
        var arr = val.split(',');
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].replace(/\//g, '-');
        }
        console.log('username' + uni.getStorageSync('username'));
        that.valdata = [];
        uni.showLoading({
          title: this.lang.loadingTitle,
        });
        uni.request({

          url: getApp().globalData.url + 'chaxun.php',
          data: {

            'starttime': arr[0],
            'endtime': arr[1],
            'username': uni.getStorageSync('username')
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            uni.hideLoading();
            console.log(res.data);
            var json = res.data;
            //console.log(typeof json);
            //console.log(json);
            if (typeof json != 'object') {
              console.log(111111);


              json = json.replace(/\ufeff/g, "");
              json = JSON.parse(json);
              if (json.length == 0) {
                wx.showToast({
                  title: this.lang.noData,

                });
              }
              for (var i = 0; i < json.length; i++) {
                var newStu = {
                  ch: json[i]['cph'],
                  ddwlsl: json[i]['ddwlsl'],
                  guige: json[i]['guige'],
                  wlmc: json[i]['wlmc'],
                  index: i
                }
                that.valdata.unshift(newStu);
              }
              // console.log(that.valdata);


            } else {
              console.log(22222);
              uni.hideLoading();
              if (json.length == 0) {
                wx.showToast({
                  title: this.lang.noData,

                });
              }
              for (var i = 0; i < json.length; i++) {
                var newStu = {
                  ch: json[i]['cph'],
                  ddwlsl: json[i]['ddwlsl'],
                  guige: json[i]['guige'],
                  wlmc: json[i]['wlmc'],
                  index: i
                }
                that.valdata.unshift(newStu);


              }

              console.log(that.valdata);
            }

            // that.setData({
            //   'info': json,
            //   'flag':true
            // })
            that.dataList = json;


          },
          fail: function (res) {
            uni.hideLoading();
            wx.showToast({
              title: this.lang.error,

            });
            console.log(res);
          }
        })


      }


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
}

,
.table {
  border: 0px solid darkgray;
  font-size: 12px;
}

.tr {
  display: flex;
  width: 100%;
  justify-content: center;
  height: 2rem;
  align-items: center;
}

.td {
  width: 40%;
  justify-content: center;
  text-align: center;
}

.bg-w {
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