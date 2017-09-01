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
  'commissionData':hosts.api+'royalty/findlist',   //查询系统默认提成(店主管理)
  'updateCommissionData':hosts.api+'royalty/modifyRoyaltyById',  //修改系统默认提成(店主管理)
  'shopmanData':hosts.api+'ownerApplication/findApplyMessageList',   //店主申请管理表(店主管理)
  'searchShopmanData':hosts.api+'ownerApplication/findApplication',   //搜索店主申请管理表(店主管理)
  'rejectShopmanData':hosts.api+'ownerManage/rejectAudit',   //驳回店主申请(店主管理)
  'passShopmanData':hosts.api+'ownerManage/passOwnerAudit',   //通过店主申请(店主管理)
  'OwnerShopmanData':hosts.api+'ownerTeamManage/findOwnerManageList',   //店主列表(店主管理)
  'modifyToCompanyLevel':hosts.api+'ownerManage/modifyOwnerToCompanyLevel',   //升级到公司店主(店主管理)
  'modifyToHighOwnerLevel':hosts.api+'ownerManage/modifyHighOwnerLevel',   //升级到高级店主(店主管理)
  'findOwnerMessage':hosts.api+'ownerManage/findOwnerMessage',   //获取店主资料(店主管理)
}

export default{
  apiMap,
  hosts
};
