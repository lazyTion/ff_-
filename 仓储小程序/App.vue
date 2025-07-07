<script>
	export default {
		globalData:{
		    openid:null,
		    info:null,
		    phone:null,
		    sessionid:null,
		    showinfo:null,
		    adress: null,
		    adressinfo: null,
		
			url: 'https://db.fufeng.cn:9393/shouchijilj/',
			// url: 'http://127.0.0.1:80/dibang/shouchijilj/'
		  },
		onLaunch: function() {
			console.log('App Launch') 
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style> 
	  @import './common/uni.css';  
</style> 
