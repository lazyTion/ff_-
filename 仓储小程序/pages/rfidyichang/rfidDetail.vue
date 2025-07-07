<template>
  <view>
    <view class="detail-item">
      <view class="detail-label">车号：</view>
      <view class="detail-value">{{ cphValue }}</view>
    </view>
      <view class="detail-label">RFID：</view>
      <view class="detail-value">{{ rfidValue }}</view>
      <view class="detail-label">称重编号：</view>
      <view class="detail-value">{{ czbhValue }}</view>
      <view class="detail-label">状态：</view>
      <view class="detail-value">{{ statusValue }}</view>
      <view class="detail-label">行驶路径：</view>
      <view class="detail-value">{{ xsljValue }}</view>
    <!-- 其他车辆信息 -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      czbh: "",
      cphValue: "",
      rfidValue: "",
      statusValue: "",
      xsljValue: "",
      czbhValue: "",
    };
  },
  onLoad(query) {
    this.czbh = query.czbh; // 获取页面导航参数中的id
    this.getVehicleDetail(this.czbh);
  methods: {
    // 根据唯一标识符获取车辆详细信息的方法
    getVehicleDetail(czbh) {
      // 进行数据请求，获取对应的车辆详细信息
        uni.showLoading({
          title: '加载中',
          icon: 'loading',
        });
        var that = this;
        uni.request({
          url: getApp().globalData.url + 'rfidlc.php',
          data: {
            'flag': 'select_detail',
            'czbh': czbh,
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          success: function (res) {
            uni.hideLoading();
            console.log(res.data);
            var json = res.data;
            if (typeof json != 'object') {
              console.log(111111);
              if (json != null && json.length > 0 && json.toString().trim() !== "") {
                json = json.replace(/\ufeff/g, "");
                json = JSON.parse(json);
                if (json.flag) {
                  that.rfidValue = json.rfid;
                  that.cphValue = json.cph;
                  that.vinValue = json.vin;
                } else {
                  uni.showToast({
                    title: json.msg,
                    icon: 'none'
                  });
                }
              } else {
                uni.showToast({
                  title: "未查询到数据",
                  icon: 'none'
                });
              }
            } else if (json.flag) {
              console.log(22222);
              that.rfidValue = json.rfid;
              that.cphValue = json.cph;
              that.vinValue = json.vin;
              that.czbhValue = json.czbh;
              that.statusValue = json.status;
              that.xsljValue = json.xslj;
            } else {
              uni.showToast({
                title: json.msg,
                icon: 'none'
              });
            }
          fail: function (res) {
            console.log(res);
          }
        })
        setTimeout(function () {
          uni.hideLoading();
        }, 2000);
      },
};
</script>
<style>
.detail-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.detail-label {
  width: 80px;
  font-weight: bold;
.detail-value {
  flex: 1;
</style>
