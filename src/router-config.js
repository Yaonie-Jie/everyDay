
import activePublic from './page/activePublic/index.vue'
import step1 from './page/activePublic/step1.vue'
import step2 from './page/activePublic/step2.vue'
import step3 from './page/activePublic/step3.vue'
import step4 from './page/activePublic/step4.vue'

import totalpages from './page/activeManage/totalpages.vue'
import activeManage from './page/activeManage/index.vue'
import detail from './page/activeManage/detail.vue'
import page1 from './page/activeManage/page1.vue'
import page2 from './page/activeManage/page2.vue'
import page3 from './page/activeManage/page3.vue'
import page4 from './page/activeManage/page4.vue'
import page5 from './page/activeManage/page5.vue'

import Jurisdiction from './page/account/jurisdiction.vue'
import ManageAccount from './page/account/manage-account.vue'
import RecordAccount from './page/account/record-account.vue'

import AddGoods from './page/goods/add-goods.vue'
import BrandGoods from './page/goods/brand-goods.vue'
import Classify from './page/goods/classify-goods.vue'
import ManageGoods from './page/goods/manage-goods.vue'
import RecommendGoods from './page/goods/recommend-goods.vue'
import RecommendGoodsLike from './page/goods/recommend-goods-like.vue'
import tagGoods from './page/goods/tag-goods.vue'

import AccountedFor from './page/money/accounted-for.vue'
import OutOf from './page/money/out-of-account.vue'
import UserWithdrawApply from './page/money/user-withdraw-apply.vue'

import OrderDeliverGoods from './page/order/order-deliver-goods.vue'
import OrderEnd from './page/order/order-end.vue'
import OrderList from './page/order/order-list.vue'
import OrderNo from './page/order/order-no.vue'
import OrderReceivedGoods from './page/order/order-received-goods.vue'
import OrderRefund from './page/order/order-refund.vue'
import OrderRefundList from './page/order/order-refund-list.vue'
import OrderRefundShow from './page/order/order-refund-show.vue'

import  BillDemo from './page/order-service/bill-demo.vue'
import  FreightManage from './page/order-service/freight-manage.vue'

import  Phone from './page/phone/phone.vue'

import  PersonNum from './page/shopman/person-num.vue'
import  ShopmanApply from './page/shopman/shopman-apply.vue'
import  ShopmanApplyShow from './page/shopman/shopman-apply-show.vue'
import  ShopmanCommission from './page/shopman/shopman-commission.vue'
import  ShopmanManage from './page/shopman/shopman-manage.vue'
import  ShopmanManageShow from './page/shopman/shopman-manage-show.vue'
import  ShopmanTeam from './page/shopman/shopman-team.vue'
import  ShopmanTeamShow from './page/shopman/shopman-team-show.vue'
import  ShopmanTeamShow2 from './page/shopman/shopman-team-show2.vue'
import  ShopmanTeamShow3 from './page/shopman/shopman-team-show3.vue'


import  User from './page/user/user.vue'
import ChangePass from './page/user/changepassword.vue'
import userManage from './page/user/userManage.vue'
export default [
  {
    path: '/activeManage',
    component:totalpages,
    children:[
      { path: '', component: activeManage},
      {
        path: 'detail', component: detail,
        children: [
          {path:'',component: page1},
          {
            path: 'page1', component: page1,
            children: [
              {path: '', component: step1},
              {path: 'step1', component: step1},
              {path: 'step2', component: step2},
              {path: 'step3', component: step3},
              {path: 'step4', component: step4}
            ]
          },
          { path: 'page2', component: page2  },
          { path: 'page3', component: page3  },
          { path: 'page4', component: page4  },
          { path: 'page5', component: page5  }
        ]
      },
    ]
  },
  {
    path:'/activePublic',component:activePublic,
    children:[
      { path: ''      , component: step1  },
      { path: 'step1', component: step1  },
      { path: 'step2', component: step2  },
      { path: 'step3', component: step3  },
      { path: 'step4', component: step4  }
    ]
  },
  {
    path:'/Jurisdiction',component:Jurisdiction,
  },
  {
    path:'/ManageAccount',component:ManageAccount,
  },
  {
    path:'/RecordAccount',component:RecordAccount,
  },
  {
    path:'/BrandGoods',component:BrandGoods,
  },
  {
    path:'/Classify',component:Classify,
  },
  {
    path:'/ManageGoods',component:ManageGoods,
    //children:[{ path:'/AddGoods',component:AddGoods}]
  },
  { path:'/AddGoods',component:AddGoods},
  {
    path:'/RecommendGoods',component:RecommendGoods,
  },
  {
    path:'/RecommendGoodsLike',component:RecommendGoodsLike,
  },
  {
    path:'/TagGoods',component:tagGoods,
  },
  {
    path:'/AccountedFor',component:AccountedFor,
  },
  {
    path:'/OutOf',component:OutOf,
  },
  {
    path:'/UserWithdrawApply',component:UserWithdrawApply,
  },
  {
    path:'/OrderDeliverGoods',component:OrderDeliverGoods,
  },
  {
    path:'/OrderEnd',component:OrderEnd,
  },
  {
    path:'/OrderList',component:OrderList,
  },
  {
    path:'/OrderNo',component:OrderNo,
  },
  {
    path:'/OrderReceivedGoods',component:OrderReceivedGoods,
  },
  {
    path:'/OrderRefund',component:OrderRefund,
  },
  {
    path:'/OrderRefundList',component:OrderRefundList,
  },
  {
    path:'/OrderRefundShow',component:OrderRefundShow,
  },
  {
    path:'/BillDemo',component:BillDemo,
  },
  {
    path:'/FreightManage',component:FreightManage,
  },
  {
    path:'/Phone',component:Phone,
  },
  {
    path:'/PersonNum',component:PersonNum,
  },
  {
    path:'/ShopmanApply',component:ShopmanApply,

  },
  {
    path:'/ShopmanApplyShow',
    component:ShopmanApplyShow
  },
  {
    path:'/ShopmanManage',component:ShopmanManage,
  },
  {
    path:'/ShopmanManageShow',component:ShopmanManageShow
  },
  {
    path:'/ShopmanTeam',component:ShopmanTeam,
    //children:[{path:'/ShopmanTeamShow',component:ShopmanTeamShow}]
  },
  {
    path:'/ShopmanTeamShow',component:ShopmanTeamShow
  },
  {
    path:'/ShopmanTeamShow2',component:ShopmanTeamShow2
  },
  {
    path:'/ShopmanTeamShow3',component:ShopmanTeamShow3
  },
  {
    path:'/ShopmanCommission',component:ShopmanCommission,
  },
  {
    path:'/User',component:User,
  },
  {
    path:'/ChangePass',component:ChangePass,
  }
  ,
  {
    path:'/userManage',component:userManage,
  }

]
