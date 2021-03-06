import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
        colorIndex: 0,
        colorList: ['#FF0000','#00FF00','#0000FF']
	},
	// 修改store中的值唯一的方法就是提交mutation来修改
	mutations: {
        setColorIndex(state,index){
            state.colorIndex = index
        }
	},
	// Getter相当于vue中的computed计算属性，
	// getter 的返回值会根据它的依赖被缓存起来，
	// 且只有当它的依赖值发生了改变才会被重新计算，
	// 这里我们可以通过定义vuex的Getter来获取，
	// Getters 可以用于监听、state中的值的变化，返回计算后的结果
    getters:{
        currentColor(state){
            return state.colorList[state.colorIndex]
        }
    },
	// 在actions中提交mutation再去修改状态值
	actions: {
		setColorIndexFn(context, index) {
			context.commit('setColorIndex', index)
		}
	}
})

export default store
