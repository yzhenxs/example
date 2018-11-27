<template>
    <div>
       <div @click="substrict" class="left">-</div>
       <div class="middle">{{initCount}}</div>
       <div @click="add" class="right">+</div>
    </div>
</template>

<style>
.left,
.middle,
.right {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  /* display: inline-block; */
  float: left;
  text-align: center;
  line-height: 30px;
}
.middle {
  margin: 0 2px;
}
</style>


<script>
export default {
  //父组件传递过来的值,,用这个来接收
  props: ['goodsId', 'count'],
  data() {
    return {
      initCount: 0
    }
  },
  created() {
    this.initCount = this.count
  },
  methods: {
    //这里是减法
    substrict() {
      if (this.initCount === 0) {
        return
      }else{
          this.initCount--,
          this.notify()
      }
    },
    //这里是加法
    add(){ 
        this.initCount++
        this.notify()
    },
    notify(){
        //子组件,通过触发自定义事件,传递载荷
        this.$emit('goodsCountChange',{
            goodsId:this.goodsId,
            count:this.initCount
        })
    }
  }
}
</script>
