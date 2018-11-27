import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 按需求导入localStorage中的方法
import {addLocalGoods,getTotalCount,updateLocalGoods,deleteLocalGoods} from '../common/localStorage.js'


//这里是创建的文件
const store = new Vuex.Store({
    //要操作的数据
    state:{
        buyCount:0 //购物车初始化数据为0
       
    },
    //这个里面是要操作的函数
    mutations: {
        // state就是上面的state,是固定的
        // goods是载荷,参数,约定 goods={goodsId:90,count:5}
        addGoods(state,goods) {
        //   state.buyCount+=goods.count
        state.buyCount=addLocalGoods(goods)
        },
        //增加
        updateGoods(state,goods){
            state.buyCount=updateLocalGoods(goods)
            // console.log(22222);   
        },
        //根据id删除商品
        deleteGoods(state,goodsId){
            state.buyCount=deleteLocalGoods(goodsId)
        }
    },
    getters:{
        getBuyCount(state){
          return state.buyCount===0 ? getTotalCount():state.buyCount
        }
    }

})


//这里是需要把上面创建的文件导出
export default store