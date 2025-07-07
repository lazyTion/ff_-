<template>
  <view class="container">
    <view>
      <view class="cph">车牌号为：{{cph}}</view>
      <!-- 修复1: 使用 @click 替代 :onclick -->
      <canvas 
        canvas-id="canvas" 
        @click="generateQRCode" 
        style="background:#fff;width: 200px;height: 200px;"
      />
    </view>
  </view>
</template>

<script>
// 修复2: 移除不必要的CDN引入（已在import中使用本地文件）
import UQRCode from '../../utils/uqrcode.js'

export default {
  data() {
    return {
      cph: null,
      czbh: ""
    }
  },
  onLoad(options) {
    console.log("车牌号:", options.cph);
	console.log("称重号:", options.czbh);
    this.cph = options.cph;
    this.czbh = options.czbh || "";
  },
  methods: {
    generateQRCode() {
      console.log("生成二维码，内容:", this.czbh || this.cph);
      
      if (!this.czbh && !this.cph) {
        uni.showToast({
          title: '缺少二维码内容',
          icon: 'none'
        });
        return;
      }
      
      // 修复3: 使用正确的二维码内容
      const qrContent = this.czbh || this.cph;
      
      const qr = new UQRCode();
      // 设置二维码内容
      qr.data = qrContent;
      // 设置二维码大小
      qr.size = 200;
      // 设置边距
      qr.margin = 10;
      
      try {
        // 调用制作二维码方法
        qr.make();
        
        // 获取canvas上下文
        const canvasContext = uni.createCanvasContext('canvas', this);
        
        // 设置uQRCode实例的canvas上下文
        qr.canvasContext = canvasContext;
        
        // 调用绘制方法将二维码图案绘制到canvas上
        qr.drawCanvas();
        
        console.log("二维码生成成功");
      } catch (error) {
        console.error("二维码生成失败:", error);
        uni.showToast({
          title: '二维码生成失败',
          icon: 'none'
        });
      }
    }
  }
}
</script>

<style>
 .container{
	  margin-left: 90px;
	 margin-top: 100px;
 }
 .cph{
 	 margin-left: 15px;
  }
</style>
