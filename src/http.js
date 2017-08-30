const hosts = {
  api: 'http://192.168.0.137:8083/'
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
  'returnOrderList':hosts.api+'order/findOrderRefundList',    //退款中订单列表
  'findOrder':hosts.api+'order/findOrder',    //搜索订单


  'addFreight':hosts.api+'freightTemplate/addFreightTemplate',    //添加运费模板
  'freightList':hosts.api+'freightTemplate/findfreightTemplateList',    //运费模板列表
  'updataFreight':hosts.api+'freightTemplate/modifyfreightTemplate',    //修改运费模板


  'teamData':hosts.api+'teamNumLimit/findTeamNum',    //查询团队人数限制
  'updataTeamData':hosts.api+'teamNumLimit/modifyTeamNumById',    //修改团队人数限制
}

export default{
  apiMap,
  hosts
};
