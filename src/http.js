const hosts = {
  api: 'http://192.168.3.176:8083/'
}

const apiMap={
  'AddProductBrand':hosts.api+'productBrand/addProductBrand',   //添加商品品牌信息
  'updataProductBrand':hosts.api+'productBrand/modifyProductBrand',    //修改商品品牌信息
  'listSystemRecommend':hosts.api+'systemRecommend/findSystemRecommendList',    //系统推荐列表
  'moveSystemRecommend':hosts.api+'systemRecommend/modifySystemRecommendPosition',    //系统推荐列表上移下移
  'deleteSystemRecommend':hosts.api+'systemRecommend/removeSystemRecommendL',    //系统推荐商品删除
  'topSystemRecommend':hosts.api+'systemRecommend/removeSystemRecommendL',    //系统推荐商品置顶





  'getList':hosts.api+'order/findOrder',    //获取订单列表
  'updataOrderNum':hosts.api+'order/modifyOrderPriceByOrderNum',    //订单改价
  'removeOrder':hosts.api+'order/removeOrder',    //取消订单
  'showOrder':hosts.api+'order/findOrderByOrderNum',    //订单详情
}

export default{
  apiMap,
  hosts
};
