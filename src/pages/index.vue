<template>
	<div>
		<el-button>{{ msg }}</el-button>
		<router-link to="/test">Go to test!</router-link>
		<p :style="{color: currentColor}">测试 vuex</p>
		<p>切换颜色：</p>
		<div class="choose-color" @click="chooseColor">
			<div :style="{'background-color': colorArr[i]}" :data-idx="i" class="btn" v-for="(item, i) in colorArr" :key="i">{{colorArr[i]}}</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex'
	export default {
        data () {
            return {
                msg: "我是index 页面"
            }
        },
		computed: {
			...mapState({
				colorIdx: 'colorIndex',
				colorArr: 'colorList'
			}),		
			...mapGetters(['currentColor'])
		},
		mounted() {
		},
		methods: {
			...mapActions(['setColorIndexFn']),
			// 使用事件委托
			chooseColor(e) {
				let classList = [].slice.call(e.target.classList);
				if(~classList.indexOf('btn')) {
					var idx = e.target.dataset.idx;
					this.setColorIndexFn(idx);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.choose-color {
		display: flex;
		justify-content: center;
		.btn {
			padding: 12px 24px;
			border: 1px #c5c5c5 solid;
			width: 80px;
			margin: 0 12px;
			color: #fff;
		}		
	}
</style>
