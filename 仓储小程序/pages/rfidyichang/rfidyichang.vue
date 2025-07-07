<template>
  <view>
    <view>
      <view>
        <button class="btn" type="default" @click="handleSearch">{{ lang.searchButton }}</button>
      </view>
    </view>
    <view class="table">
      <view class="tr bg-w">
        <view class="th">{{ lang.index }}</view>
        <view class="th">{{ lang.plateNumber }}</view>
        <view class="th">{{ lang.status }}</view>
		<view class="th">{{ lang.weighingNumber }}</view>
      </view>
      <view class="tr" v-for="(item, index) in dataList" :key="index" @click="goToDetail(item.czbh)">
        <view class="td">{{ item.id }}</view>
        <view class="td">{{ item.cph }}</view>
        <view class="td">{{ langStatus(item.status) }}</view>
        <view class="tb">{{ item.czbh }}</view>
      </view>
    </view>
  </view>
</template>

<script>
// 导入语言资源
import zh from '../language/zh.js';
import ru from '../language/ru.js';

export default {
  data() {
    return {
      cphValue: '', // 车牌号
      dataList: [], // 列表数据
      currentLang: 'zh', // 当前语言
      lang: zh // 语言资源对象
    };
  },
  onLoad() {
    // 初始化语言
    this.currentLang = uni.getStorageSync('lang') || 'zh';
    this.lang = this.currentLang === 'zh' ? zh : ru;
  },
  methods: {
    // 状态国际化
    langStatus(status) {
      if (this.currentLang === 'ru') {
        const statusMap = {
          '未处理': 'Не обработано',
          '已处理': 'Обработано',
          '处理中': 'В процессе'
        };
        return statusMap[status] || status;
      }
      return status;
    },
    
    // 导航至详情页面
    goToDetail(czbh) {
      uni.navigateTo({
        url: '/pages/rfidyichang/rfidDetail?czbh=' + czbh,
      });
    },

    handleSearch() {
      uni.showLoading({
        title: this.lang.loading,
        icon: 'loading',
      });
      var that = this;
      uni.request({
        url: getApp().globalData.url + 'rfidlc.php',
        data: {
          'flag': 'select',
          'cph': that.cphValue,
          'lang': that.currentLang // 传递语言参数给后端
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          uni.hideLoading();
          console.log(res.data);
          var json = res.data;
          if (typeof json != 'object') {
            if (json != null && json.length > 0 && json.toString().trim() !== "") {
              json = json.replace(/\ufeff/g, "");
              json = JSON.parse(json);
              if (json.flag) {
                that.dataList = json.data;
              } else {
                uni.showToast({
                  title: json.msg,
                  icon: 'none'
                });
              }
            } else {
              uni.showToast({
                title: that.lang.noData,
                icon: 'none'
              });
            }
          } else if (json.flag) {
            that.dataList = json.data;
          } else {
            uni.showToast({
              title: json.msg,
              icon: 'none'
            });
          }
        },
        fail: function (res) {
          uni.hideLoading();
          console.log(res);
        }
      })
    },
  },
};
</script>

<style>
.table {
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
}

.tr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.td {
  flex: 1;
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

.btn {
  text-align: center;
  background: linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
  background-color: #7892c2;
  padding: 10rpx 15rpx;
  color: #fff;
  border-radius: 10rpx;
  margin: 30rpx;
}
</style>