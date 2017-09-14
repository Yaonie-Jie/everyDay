const hosts = {
  // api: 'http://test.sunxung.cn:3083/'
  api: 'http://meirimeic.com/'

}
const apiMap={
  'login':hosts.api+'account/login',   //登陆



  'addProductType':hosts.api+'productType/addProductType',   //添加商品分类
  'updataProductType':hosts.api+'productType/modifyProductType',   //修改商品分类
  'deleteProductType':hosts.api+'productType/removeTwoProductType',   //删除二级分类
  'deleteProductOne':hosts.api+'productType/removeOneProductType',   //删除一级分类
  'numProductType':hosts.api+'productType/modifyProductTypePosition',   //移动分类

  'findBrandList':hosts.api+'productBrand/findProductBrandList',   //查询商品品牌列表
  'AddProductBrand':hosts.api+'productBrand/addProductBrand',   //添加商品品牌信息
  'updataProductBrand':hosts.api+'productBrand/modifyProductBrand',    //修改商品品牌信息

  'listSystemRecommend':hosts.api+'systemRecommend/findSystemRecommendList',    //系统推荐列表
  'addInterestRecommend':hosts.api+'interestRecommend/addInterestRecommend',    //添加商品到根据兴趣推荐列表商品详情
  'updataInterestRecommend':hosts.api+'interestRecommend/modifyInterestRecommend',    //修改商品到系统推荐列表商品详情
  'moveSystemRecommend':hosts.api+'systemRecommend/modifySystemRecommendPosition',    //推荐列表上移下移
  'moveSystemxing':hosts.api+'interestRecommend/modifyInterestRecommendPosition',    //兴趣推荐列表上移下移
  'deleteSystemRecommend':hosts.api+'systemRecommend/removeSystemRecommendL',    //系统推荐商品删除
  'findTagList':hosts.api+'productTagInterest/findProductTagInterestList',    //商品标签列表
  'topSystemRecommend':hosts.api+'systemRecommend/removeSystemRecommendL',    //兴趣推荐商品置顶
  'SystemRecommendTop':hosts.api+'systemRecommend/modifySystemRecommendTop',    //系统推荐商品置顶
  'SystemRecommendBottom':hosts.api+'systemRecommend/modifySystemRecommendBottom',    //系统推荐商品置底
  'findProductList':hosts.api+'interestRecommend/findInterestRecommendList',    //兴趣列表
  'findProductNum':hosts.api+'interestRecommend/findRecommendAmount',    //兴趣推荐数量查询
  'updataProductNums':hosts.api+'/systemRecommend/modifySystemRecommendPamount',    //系统推荐数量修改
  'updataSystemRecommend':hosts.api+'systemRecommend/modifySystemRecommend',    //修改系统推荐商品详情
  'updataProductNum':hosts.api+'interestRecommend/modifyInterestRecommendProAmount',    //修改人气爆款推荐数量
  'updataProductNumpop':hosts.api+'interestRecommend/modifyInterestRecommendAmount',    //修改商品详情推荐数量
  'deleteProductList':hosts.api+'interestRecommend/removeInterestRecommendL',    //删除兴趣推荐商品
  'InterestRecommendBottom':hosts.api+'interestRecommend/modifyInterestRecommendBottom',    //置底根据客户兴趣列表商品
  'InterestRecommendTop':hosts.api+'interestRecommend/modifyInterestRecommendTop',    //置顶根据客户兴趣列表商品
  'findInterestRecommendById':hosts.api+'interestRecommend/findInterestRecommendById',    //根据客户兴趣列表id查询商品详情
  'findSystemRecommendById':hosts.api+'systemRecommend/findSystemRecommendById',    //根据系统推荐id查询商品详情

  'addSystemRecommend':hosts.api+'systemRecommend/addSystemRecommend',    //添加商品到系统推荐列表商品详情



  'addShop':hosts.api+'product/addProduct',    //添加商品
  'findById':hosts.api+'product/findProductById',    //查看商品详情
  'deleteShop':hosts.api+'product/removeProductByIdL',    //删除商品
  'updataShop':hosts.api+'product/modifyProduct',    //修改商品
  'findShop':hosts.api+'product/findProductListByCondition',    //查询商品
  'findShopList':hosts.api+'product/findProductList',    //商品列表
  'findTypeList':hosts.api+'productType/findProductOneTypeList',    //查询一级分类
  'findTypeListTwo':hosts.api+'productType/findProductTwoTypeList',    //查询二级分类
  'findtTypeByTwoId':hosts.api+'productType/findProductTypeByTwoId',    //根据二级分类id查询一级分类


  'getList':hosts.api+'order/findOrder',    //获取订单列表
  'findExpressList':hosts.api+'express/findExpressList',    //快递公司列表
  'addExpressOrder':hosts.api+'express/addExpressOrder',    //发货
  'updataOrderNum':hosts.api+'order/modifyOrderPriceByOrderNum',    //订单改价
  'removeOrder':hosts.api+'order/removeOrder',    //取消订单
  'showOrder':hosts.api+'order/findOrderByOrderNum',    //订单详情
  'returnOrderList':hosts.api+'order/findOrderRefundList',    //退款中订单列表
  'findOrder':hosts.api+'order/findOrder',    //搜索订单
  'findExpress':hosts.api+'express/findExpressByOrderNum',    //查看物流
  'Reject':hosts.api+'refund/modifyRefundStateReject',    //审核驳回
  'gettuikuan':hosts.api+'refund/findRefundeAccount',    //点击退款成功获取信息
  'tuikuan':hosts.api+'refund/addRefundeSuccess',    //确定退款



  'addFreight':hosts.api+'freightTemplate/addFreightTemplate',    //添加运费模板
  'freightList':hosts.api+'freightTemplate/findfreightTemplateList',    //运费模板列表
  'updataFreight':hosts.api+'freightTemplate/modifyfreightTemplate',    //修改运费模板
  'deleteFreight':hosts.api+'freightTemplate/removefreightTemplateL',    //删除运费模板


  'teamData':hosts.api+'teamNumLimit/findTeamNum',    //查询团队人数限制
  'updataTeamData':hosts.api+'teamNumLimit/modifyTeamNumById',    //修改团队人数限制
  'commissionData':hosts.api+'royalty/findlist',   //查询系统默认提成(店主管理)
  'updateCommissionData':hosts.api+'royalty/modifyRoyaltyById',  //修改系统默认提成(店主管理)
  'shopmanData':hosts.api+'ownerApplication/findApplyMessageList',   //店主申请管理表(店主管理)
  'ownerApplyMessage':hosts.api+'ownerApplication/findApplyMessage',   //申请详细信息(店主申请管理)
  'passAudit':hosts.api+'ownerManage/passOwnerAudit',   //通过申请(店主申请管理)
  'rejectAudit':hosts.api+'ownerManage/rejectAudit',   //驳回申请(店主申请管理)
  'addShopman':hosts.api+'ownerManage/addNoTeamOwner',   //添加无店主团队(店主申请管理)
  'modifyCompany':hosts.api+'ownerManage/modifyOwnerToCompanyLevel',   //升级到公司店主(店主申请管理)
  'modifyHigh':hosts.api+'ownerManage/modifyHighOwnerLevel',   //升级到高级店主(店主申请管理)





  'searchShopmanData':hosts.api+'ownerApplication/findApplication',   //搜索店主申请管理表(店主管理)
  'rejectShopmanData':hosts.api+'ownerManage/rejectAudit',   //驳回店主申请(店主管理)
  'passShopmanData':hosts.api+'ownerManage/passOwnerAudit',   //通过店主申请(店主管理)
  'OwnerShopmanData':hosts.api+'ownerTeamManage/findOwnerManageList',   //店主列表(店主管理)
  'findShopmanData':hosts.api+'ownerTeamManage/findOwnerManageByAccount',   //店主列表(店主管理)



  'modifyToCompanyLevel':hosts.api+'ownerManage/modifyOwnerToCompany',   //升级到公司店主(店主管理)
  'modifyToHighOwnerLevel':hosts.api+'ownerManage/modifyHighOwnerLevel',   //升级到高级店主(店主管理)
  'findOwnerMessage':hosts.api+'ownerManage/findOwnerMessage',   //获取店主资料(店主管理)
  'getTeamList':hosts.api+'ownerTeamManage/findOwnerTeamManageList',   //获取店主团队信息（店主管理）
  'getTeamMessage':hosts.api+'ownerTeamManage/findTeamMessage',   //获取店主团队信息（店主管理）
  'findTeamli':hosts.api+'ownerTeamManage/findUserTeamByAccount',   //查询店主信息
  'addTeamli':hosts.api+'headManage/addHeadManage',   //添加团长
  'findTeamy':hosts.api+'ownerTeamManage/findMemberByAccount',   //查询店主信息
  'addTeamliy':hosts.api+'companyMemberManage/addCompanyMemberManage',   //添加tuanyuan






  'findTeam':hosts.api+'ownerTeamManage/findOwnerTeamManage', //搜索
  'findInFinance':hosts.api+'finance/findInFinanceList', //入账记录
  'findOutFinance':hosts.api+'finance/findOutFinanceList', //出账记录
  'findWithdrawals':hosts.api+'withdrawals/findWithdrawalsList', //提现申请
  'modifyPass':hosts.api+'withdrawals/modifyWithdrawalsPass', //提现成功
  'modifyReject':hosts.api+'withdrawals/modifyWithdrawalsRejectById', //提现驳回


  'findUserManage':hosts.api+'user/userMessageList', //用户管理

  'findInvoiceList':hosts.api+'invoiceType/findInvoiceTypeList', //获取发票列表
  'modifyInvoiceList':hosts.api+'invoiceType/modifyInvoiceType', //修改发票列表
  'addInvoiceList':hosts.api+'invoiceType/addInvoiceType', //添加发票列表



  'addreg':hosts.api+'user/registerUser', //添加普通用户


  'findPhon':hosts.api+'systemPhone/findSystemPhone', //客服电话
  'modifyPhon':hosts.api+'systemPhone/modifySystemPhone', //修改客服电话




}
export default{
  apiMap,
  hosts
};
