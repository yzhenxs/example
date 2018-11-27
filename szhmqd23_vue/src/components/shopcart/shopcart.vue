<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item,index) in goodsList" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch
                                            v-model="item.isSelect">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <!-- {{item.buycount}} -->
                                        <!-- 下面是通过父组件给子组件传值 -->
                                        <inputnumber :goodsId="item.id" :count="item.buycount" @goodsCountChange="getChangedGoods"></inputnumber>

                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a @click="deleteGoods(index)" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr v-if="goodsList.length === 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <!-- <router-link to="/goodslist"> -->
                            <button @click="continueBuy" class="button" >继续购物</button>
                           <!-- </router-link> -->
                            <button class="submit" @click="goToPay">提交订单</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .shopInfo{
        display: flex;
        align-items: center;
    }
</style>


<script>
    import {getLocalGoods} from '../../common/localStorage.js'
    import inputnumber from '../../components/subcomponents/inputnumber.vue'

    export default{ 
        components:{
            inputnumber
        },
        data(){
            return {
                goodsList:[]
            }
        },
        created(){
            this.getGoodsListData()
        },
        computed:{
            // 获取总数量
            getTotalCount(){
                let totalCount = 0
                this.goodsList.forEach(item=>{
                    if(item.isSelect){
                        totalCount+=item.buycount
                    }
                })

                return totalCount
            },
            // 获取总价格
            getTotalAmount(){
                let totalAmount = 0
                this.goodsList.forEach(item=>{
                    if(item.isSelect){
                        totalAmount+=item.buycount*item.sell_price
                    }
                })

                return totalAmount
            }
        },
        methods:{
            getGoodsListData(){
                //1.准备好url
                const localGoods = getLocalGoods()

                //2.获取到对象中的key
                const keys = Object.keys(localGoods)

                //3.判断一下是否有值
                if(keys.length === 0){
                    return
                }

                //4.组装好url
                const url = `site/comment/getshopcargoods/${keys.join(',')}`

                this.$axios.get(url).then(response=>{
                    response.data.message.forEach(item=>{
                        item.buycount = localGoods[item.id]
                        item.isSelect = true
                    })

                    this.goodsList = response.data.message
                })
            },
            //子组件传值给父组件之后,父组件执行的函数
            getChangedGoods(changedGoods){
                // console.log(changedGoods);
               this.goodsList.forEach(item=>{
                   if(item.id===changedGoods.goodsId){
                       item.buycount=changedGoods.count
                   }                               
               })

               //准备好载荷,调用Vuex的mutation的updateGoods方法
               this.$store.commit('updateGoods',changedGoods)
            },//这个地方是删除(通过下标把数组删除掉)
            deleteGoods(index){
                console.log(index);
                this.$confirm('是否删除此商品?', '提示', {
                 confirmButtonText: '确定',
                cancelButtonText: '取消',
                 type: 'warning'
              }).then(() => {
              this.$message({
               type: 'success',
               message: '删除成功!'
               });
                //所以需要对本地存储的数据也进行删除,可以根据id去删除本地的数据
                 this.$store.commit('deleteGoods',this.goodsList[index].id)
                        // console.log(index);
                     //1.把goodsList对应的数据干掉
                  this.goodsList.splice(index,1)//从下标多少开始删除一个,这个位置是删除数组里面的数据的,但是更新后发现数据还是原来的
                    //  console.log(index);

                 }).catch(() => {
                    this.$message({
                   type: 'info',
                    message: '已取消删除'
                 });          
                 });
            },//继续购物
            continueBuy(){
                //通过命名路由跳转过去
                // this.$router.push({name:'GOODSLIST'})

                this.$router.push({path:'/goodslist'})
            },
            //提交订单,立即结算
            goToPay(){
                const ids=[]
                this.goodsList.forEach(item=>{
                    if(item.isSelect){
                        ids.push(item.id)
                    }
                })

                if(ids.length===0){
                    this.$message({ 
                    message: '至少选择一个商品下单!',
                     type: 'warning'
                     });
                     return;
                }
                //通过$router编程式导航跳转到下单页面
                this.$router.push({path:'/order',query:{ids:ids.join(',')}})
                //$route是用来获取路径中的参数,不管它是通过params还是query 
            }

        }
    }
</script>