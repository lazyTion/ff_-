<template>
	<view>
		<view class="person-head">
			<view class="person-head-box">
				<view class="person-head-nickname">{{username}}</view>
				<view class="person-head-username">{{date}} {{time}}</view>
			</view>
		</view>
		<view class="person-list">
			<cmd-cell-item :title="lang.rfidBind" slot-left arrow @click="rfid">
				<cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.rfidCheck" slot-left arrow @click="rfidCheck">
				<cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.rfidNoCheck" slot-left arrow @click="rfidNoCheck">
				<cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.rfidException" slot-left arrow @click="rfidYC">
				<cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.testResult" slot-left arrow @click="selectResult">
				<cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.scanQuery" @click="selectCard" slot-left arrow>
				<cmd-icon type="message" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.warehouse" @click="cangk" slot-left arrow>
				<cmd-icon type="home" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.secondCheck" @click="ajsh" slot-left arrow>
				<cmd-icon type="link" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.returnCar" @click="tuiche" slot-left arrow>
				<cmd-icon type="subtract-circle" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.adjustInfo" @click="jiakou" slot-left arrow>
				<cmd-icon type="add-circle" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.palletMaintain" @click="tuopan" slot-left arrow>
				<cmd-icon type="text-underline" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.loadingQuery" @click="chaxun" slot-left arrow>
				<cmd-icon type="reload" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.reweigh" @click="clfb" slot-left arrow>
				<cmd-icon type="link" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.exceptionSubmit" @click="yichang" slot-left arrow>
				<cmd-icon type="alert-circle" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.transferMark" @click="zhuanchan" slot-left arrow>
				<cmd-icon type="reload" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.tempCarReg" @click="cheliang" slot-left arrow>
				<cmd-icon type="alert-circle" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.tempCarView" @click="lsclcx" slot-left arrow>
				<cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.resetPwd" @click="updatemi" slot-left arrow>
				<cmd-icon type="repecmd-play" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item :title="lang.logout" @click="zxdl" slot-left arrow>
				<cmd-icon type="close-circle" size="24" color="#368dff"></cmd-icon>
			</cmd-cell-item>
		</view>
	</view>
</template>

<script>
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	// 导入语言资源
	import zh from '../language/zh.js';
	import ru from '../language/ru.js';

	export default {
		components: {
			cmdAvatar,
			cmdCellItem,
			cmdIcon
		},
		data() {
			return {
				date: new Date().toISOString().slice(0, 10),
				time: new Date().toLocaleTimeString(),
				username: '',
				currentLang: 'zh', // 当前语言
				lang: zh // 语言资源对象
			};
		},
		onShow() {
			// 每次页面显示时检查语言设置
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			// 设置页面标题
			uni.setNavigationBarTitle({
				title: this.lang.pageTitle.warehouseManagement
			});
		},

		onLoad: function(options) {
			uni.hideHomeButton()
			var that = this;
			that.username = uni.getStorageSync("username");
			var name = uni.getStorageSync("name");
			var se = uni.getStorageSync("sessionid");
			
			// 初始化语言
			this.currentLang = uni.getStorageSync('lang') || 'zh';
			this.lang = this.currentLang === 'zh' ? zh : ru;
			// 设置页面标题
			uni.setNavigationBarTitle({
				title: this.lang.pageTitle.warehouseManagement
			});
			
			console.log("se" + se + name);
			if (se == '') {
				uni.showModal({
					title: this.lang.notLoginTitle,
					content: this.lang.notLoginContent,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.redirectTo({
								url: '../login/login',
							})
						}
					}
				})
			} else {
				getApp().globalData.sessionid = se;
				getApp().globalData.phone = name;
				uni.request({
					url: getApp().globalData.url + 'login/mmjy.php',
					data: {
						name: getApp().globalData.phone
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						var jsonStr = res.data;
						console.log(jsonStr);
						if (typeof jsonStr != 'object') {
							jsonStr = jsonStr.replace(/\ufeff/g, "");
							var jj = JSON.parse(jsonStr);
							var flag = jj.flag;
							var msg = jj.msg;
						} else {
							var flag = jsonStr.flag;
							var msg = jsonStr.msg;
						}
						if (flag.toString().trim() != 'false') {
							uni.showModal({
								title: that.lang.pwdRuleTitle,
								content: msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.redirectTo({
											url: '../Updatemi/Updatemi',
										})
									} else if (res.cancel) {
										uni.redirectTo({
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
			zxdl() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			rfid() {
				uni.navigateTo({
					url: '/pages/rfid/rfid'
				})
			},
			rfidCheck() {
				uni.navigateTo({
					url: '/pages/rfidCheck/rfidCheck'
				})
			},
			rfidNoCheck() {
				uni.navigateTo({
					url: '/pages/rfidDes/rfidDes'
				})
			},
			rfidYC() {
				uni.navigateTo({
					url: '/pages/rfidyichang/rfidyichang'
				})
			},
			selectResult() {
				uni.navigateTo({
					url: '/pages/selectResult/selectResult'
				})
			},
			selectCard() {
				uni.navigateTo({
					url: '/pages/selectCard/selectCard'
				})
			},
			cangk() {
				uni.navigateTo({
					url: '/pages/cangk/cangk'
				})
			},
			tuiche() {
				uni.navigateTo({
					url: '/pages/tuiche/tuiche'
				})
			},
			ajsh() {
				uni.navigateTo({
					url: '/pages/ajsh/ajsh'
				})
			},
			jiakou() {
				uni.navigateTo({
					url: '/pages/jiakou/jiakou'
				})
			},
			tuopan() {
				uni.navigateTo({
					url: '/pages/tuopan/tuopan'
				})
			},
			chaxun() {
				uni.navigateTo({
					url: '/pages/chaxun/chaxun'
				})
			},
			clfb() {
				uni.navigateTo({
					url: '/pages/clfb/clfb'
				})
			},
			yichang() {
				uni.navigateTo({
					url: '/pages/yichang/yichang'
				})
			},
			cheliang() {
				uni.navigateTo({
					url: '/pages/cheliang/cheliang'
				})
			},
			zhuanchan() {
				uni.navigateTo({
					url: '/pages/zhuanchang/zhuanchang'
				})
			},
			updatemi() {
				uni.navigateTo({
					url: '/pages/Updatemi/Updatemi'
				})
			},
			lsclcx() {
				uni.navigateTo({
					url: '/pages/lsclcx/lsclcx'
				})
			}
		}
	}
</script>

<style>
	.person-head {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 150px;
		padding-left: 20px;
		background: linear-gradient(to right, #365fff, #36bbff);
	}

	.person-head-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin-left: 10px;
	}

	.person-head-nickname {
		font-size: 18px;
		font-weight: 500;
		color: #fff;
	}

	.person-head-username {
		font-size: 14px;
		font-weight: 500;
		color: #fff;
	}

	.person-list {
		line-height: 0;
	}
</style>