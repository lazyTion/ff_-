<template>
	<view v-if="width" :style="'width:'+width+';'+(square?'height:'+width:'')" class="uni-grid-item">
		<view :class="{ 'uni-grid-item--border': showBorder,  'uni-grid-item--border-top': showBorder && index < column, 'uni-highlight': highlight }"
		 :style="{  'border-right-color': borderColor ,'border-bottom-color': borderColor ,'border-top-color': borderColor }"
		 class="uni-grid-item__box" @click="_onClick">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniGridItem',
		inject: ['grid'],
		props: {
			index:{
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				column: 0,
				showBorder: true,
				square: true,
				highlight: true,
				left: 0,
				top: 0,
				openNum: 2,
				width: 84,
				borderColor: '#e5e5e5'
			}
		},
		created() {
			this.column = this.grid.column
			this.showBorder = this.grid.showBorder
			this.square = this.grid.square
			this.highlight = this.grid.highlight
			this.top = this.hor === 0 ? this.grid.hor : this.hor
			this.left = this.ver === 0 ? this.grid.ver : this.ver
			this.borderColor = this.grid.borderColor
			this.grid.children.push(this)
			// this.grid.init()
			this.width = this.grid.width
		},
		beforeDestroy() {
			this.grid.children.forEach((item, index) => {
				if (item === this) {
					this.grid.children.splice(index, 1)
				}
			})
		},
		methods: {
			_onClick() {
				this.grid.change({
					detail: {
						index: this.index
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-grid-item {
		/* #ifndef APP-NVUE */
		height: 100%;
		display: flex;
		/* #endif */
	}

	.uni-grid-item__box {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		position: relative;
		flex: 1;
		flex-direction: column;
		// justify-content: center;
		// align-items: center;
	}

	.uni-grid-item--border {
		position: relative;
		border-bottom-color: $uni-border-color;
		border-bottom-style: solid;
		border-bottom-width: 0px;
		border-right-color: $uni-border-color;
		border-right-style: solid;
		border-right-width: 1px;
	}

	.uni-grid-item--border-top {
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 1px;
		/* #ifndef APP-NVUE */
		height: 100%;
		box-sizing: border-box;
		/* #endif */
	}

	.uni-highlight:active {
		background-color: $uni-bg-color-hover;
	}
</style>
