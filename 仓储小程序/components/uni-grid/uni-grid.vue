<template>
	<view class="uni-grid-wrap">
		<view :id="elId" ref="uni-grid" class="uni-grid" :class="{ 'uni-grid--border': showBorder }" :style="{ 'border-left-style':'solid','border-left-color':borderColor, 'border-left-width':showBorder?'1px':0 }">
			<slot />
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom');
	// #endif
	export default {
		name: 'UniGrid',
		props: {
			// 每列显示个数
			column: {
				type: Number,
				default: 3
			},
			// 是否显示边框
			showBorder: {
				type: Boolean,
				default: true
			},
			// 边框颜色
			borderColor: {
				type: String,
				default: '#e5e5e5'
			},
			// 是否正方形显示,默认为 true
			square: {
				type: Boolean,
				default: true
			},
			highlight: {
				type: Boolean,
				default: true
			}
		},
		provide() {
			return {
				grid: this
			}
		},
		data() {
			const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				elId,
				width: 0
			}
		},
		created() {
			this.children = []
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				setTimeout(() => {
					this._getSize((width) => {
						this.children.forEach((item, index) => {
							item.width = width
						})
					})
				}, 50)
			},
			change(e) {
				this.$emit('change', e)
			},
			_getSize(fn) {
				// #ifndef APP-NVUE
				uni.createSelectorQuery()
					.in(this)
					.select(`#${this.elId}`)
					.boundingClientRect()
					.exec(ret => {
						this.width = parseInt((ret[0].width-1) / this.column) + 'px'
						fn(this.width)
					})
				// #endif
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs['uni-grid'], (ret) => {
					this.width = parseInt((ret.size.width-1) / this.column)  + 'px'
					fn(this.width)
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-grid-wrap {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: column;
		/* #ifdef H5 */
		width: 50%;
		/* #endif */
	}

	.uni-grid {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		// flex: 1;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.uni-grid--border {
		border-left-color: $uni-border-color;
		border-left-style: solid;
		border-left-width: 1px;
	}
</style>
