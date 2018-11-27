//获取本地存储的商品
const KEY = 'GOODS'
const getLocalGoods = () => {
  return JSON.parse(localStorage.getItem(KEY) || '{}')
}

//获取总数量
const getTotalCount = () => {
  const localGoods = getLocalGoods()
  let totalCount = 0
  for (var key in localGoods) {
    totalCount += localGoods[key]
  }
  return totalCount
}

//主要是把商品信息存储在本地
const addLocalGoods = goods => {
  //1.获取本地的localStorage中的值,并且转成对象
  const localGoods = getLocalGoods()
  //2.对传递过来的goods.goodsId进行判断,如果这个信息已经存在,就把数量进行累加,不存在的话,就新增一对键值对
  if (localGoods[goods.goodsId]) {
    localGoods[goods.goodsId] += goods.count
  } else {
    localGoods[goods.goodsId] = goods.count
  }
  //3.把对象转换成字符串,覆盖保存回去
  localStorage.setItem(KEY, JSON.stringify(localGoods))
  //4.重新统计,并且返回数据
  return getTotalCount()
}

//增加
const updateLocalGoods = goods => {
  //1.先获取本地的localStorage中的值,并且转成对象
  const localGoods = getLocalGoods()
  //2.更改本地商品的信息
  localGoods[goods.goodsId] = goods.count
  //3.把对象转换成字符串,覆盖保存回去
  localStorage.setItem(KEY, JSON.stringify(localGoods))
  //4.重新统计,并且返回数据
  return getTotalCount()
}

//删除
const deleteLocalGoods = goodsId => {
  //1.先获取本地的localStorage中的值,并且转成对象
  const localGoods = getLocalGoods()
  //2.删除对应的id的商品
  delete localGoods[goodsId] 
  //3.把对象转换成字符串,覆盖保存回去
  localStorage.setItem(KEY, JSON.stringify(localGoods))
  //4.重新统计,并且返回数据
  return getTotalCount()
}

//不加default就是按需导入
export { addLocalGoods, getTotalCount, getLocalGoods, updateLocalGoods,deleteLocalGoods  }


