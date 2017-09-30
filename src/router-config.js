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
import updataGoods from './page/goods/updata-goods.vue'
import updatashop from './page/goods/updatashop.vue'
import updatashoppic from './page/goods/updatashoppic.vue'
import updatashopxi from './page/goods/updatashop-xi.vue'
import updatashopxipic from './page/goods/updatashop-xipic.vue'

import AccountedFor from './page/money/accounted-for.vue'
import OutOf from './page/money/out-of-account.vue'
import UserWithdrawApply from './page/money/user-withdraw-apply.vue'

import OrderDeliverGoods from './page/order/order-deliver-goods.vue'
import OrderEnd from './page/order/order-end.vue'
import OrderList from './page/order/order-list.vue'
import OrderNo from './page/order/order-no.vue'
import OrderRefund from './page/order/order-refund.vue'
import OrderRefundShow from './page/order/order-refund-show.vue'
import OrderDeliver from './page/order/order-deliver-goods.vue'
import OrderReceived from './page/order/order-received-goods.vue'
import OrderMoney from './page/order/order-refund-money.vue'
import OrderMoneychao from './page/order/order-chao.vue'

import BillDemo from './page/order-service/bill-demo.vue'
import FreightManage from './page/order-service/freight-manage.vue'
import addFreight from './page/order-service/add-freight.vue'
import updataFreight from './page/order-service/updata-freight.vue'

import Phone from './page/phone/phone.vue'

import PersonNum from './page/shopman/person-num.vue'
import ShopmanApply from './page/shopman/shopman-apply.vue'
import ShopmanApplyShow from './page/shopman/shopman-apply-show.vue'
import ShopmanCommission from './page/shopman/shopman-commission.vue'
import ShopmanManage from './page/shopman/shopman-manage.vue'
import ShopmanManageShow from './page/shopman/shopman-manage-show.vue'
import ShopmanManageShow1 from './page/shopman/shopman-manage-show1.vue'
import ShopmanManageShow2 from './page/shopman/shopman-manage-show2.vue'


import ShopmanTeam from './page/shopman/shopman-team.vue'
import ShopmanTeamShow from './page/shopman/shopman-team-show.vue'
import ShopmanTeamShow2 from './page/shopman/shopman-team-show2.vue'
import ShopmanTeamShow3 from './page/shopman/shopman-team-show3.vue'
import AddShopmanTeam from './page/shopman/AddShopmanTeam.vue'

import User from './page/user/user.vue'
import ChangePass from './page/user/changepassword.vue'
import userManage from './page/user/userManage.vue'
import userAdvice from './page/user/userAdvice.vue'
import login from './components/login.vue'
import home from './home.vue'

export default [
  {
    path: '/activeManage',
    component: totalpages,
    children: [
      {path: '', component: activeManage},
      {
        path: 'detail', component: detail,
        children: [
          {path: '', component: page1},
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
          {path: 'page2', component: page2},
          {path: 'page3', component: page3},
          {path: 'page4', component: page4},
          {path: 'page5', component: page5}
        ]
      },
    ]
  },


  {
    path: '/login', component: login,
  },
  {
    path: '/', component: home,
    children: [

      {
        path: '/Jurisdiction', component: Jurisdiction,
      },
      {
        path: '/ManageAccount', component: ManageAccount,
      },
      {
        path: '/RecordAccount', component: RecordAccount,
      },
      {
        path: '/BrandGoods', component: BrandGoods,
      },
      {
        path: '/updatashop/:id', component: updatashop,
      },
      {
        path: '/updatashoppic/:id', component: updatashoppic,
      },
      {
        path: '/updatashopxi/:id', component: updatashopxi,
      },
      {
        path: '/updatashopxipic/:id', component: updatashopxipic,
      },
      {
        path: '/Classify', component: Classify,
      },
      {
        path: '/ManageGoods', component: ManageGoods,
        //children:[{ path:'/AddGoods',component:AddGoods}]
      },
      {
        path: '/AddGoods', component: AddGoods},
      {
        path: '/RecommendGoods', component: RecommendGoods,
      },
      {
        path: '/RecommendGoodsLike', component: RecommendGoodsLike,
      },
      {
        path: '/TagGoods', component: tagGoods,
      },
      {
        path: '/AccountedFor', component: AccountedFor,
      },
      {
        path: '/OutOf', component: OutOf,
      },
      {
        path: '/UserWithdrawApply', component: UserWithdrawApply,
      },
      {
        path: '/OrderDeliverGoods', component: OrderDeliverGoods,
      },
      {
        path: '/OrderEnd', component: OrderEnd,
      },
      {
        path: '/OrderList', component: OrderList,
      },
      {
        path: '/OrderNo/:orderNum', component: OrderNo,
      },
      {
        path: '/updataGoods/:id', component: updataGoods,
      },
      {
        path: '/OrderDeliver/:orderNum', component: OrderDeliver,   //待发货订单详情
      },
      {
        path: '/OrderReceived/:orderNum', component: OrderReceived,   //待收货订单详情
      },
      {
        path: '/OrderEnd/:orderNum', component: OrderEnd,     //已完成订单详情
      },
      {
        path: '/OrderRefund', component: OrderRefund,
      },
      {
        path: '/OrderMoney/:orderNum', component: OrderMoney, //已退款订单详情
      },
      {
        path: '/OrderMoneychao/:orderNum', component: OrderMoneychao, //已超时订单详情
      },
      {
        path: '/OrderRefundShow/:orderNum', component: OrderRefundShow,
      },
      {
        path: '/BillDemo', component: BillDemo,
      },
      {
        path: '/addFreight', component: addFreight,
      },
      {
        path: '/updataFreight/:id', component: updataFreight,
      },
      {
        path: '/FreightManage', component: FreightManage,
      },
      {
        path: '/Phone', component: Phone,
      },
      {
        path: '/PersonNum', component: PersonNum,
      },
      {
        path: '/ShopmanApply', component: ShopmanApply,

      },
      {
        path: '/ShopmanApplyShow/:account', component: ShopmanApplyShow,
      },
      {
        path: '/ShopmanManage', component: ShopmanManage,
      },
      {
        path: '/ShopmanManageShow/:account', component: ShopmanManageShow    //个人店主 查看
      },
      {
        path: '/ShopmanManageShow1/:account', component: ShopmanManageShow1   //公司店主查看
      },
      {
        path: '/ShopmanManageShow2/:account', component: ShopmanManageShow2   //高级店主 查看
      },
      {
        path: '/ShopmanTeam', component: ShopmanTeam,
        //children:[{path:'/ShopmanTeamShow',component:ShopmanTeamShow}]
      },
      {
        path: '/ShopmanTeamShow/:id', component: ShopmanTeamShow
      },
      {
        path: '/ShopmanTeamShow2/:id', component: ShopmanTeamShow2
      },
      {
        path: '/ShopmanTeamShow3', component: ShopmanTeamShow3
      },
      {
        path: '/AddShopmanTeam', component: AddShopmanTeam
      },
      {
        path: '/ShopmanCommission', component: ShopmanCommission,
      },
      {
        path: '/User', component: User,
      },
      {
        path: '/userAdvice', component: userAdvice,
      },
      {
        path: '/ChangePass', component: ChangePass,
      }
      ,
      {
        path: '/userManage', component: userManage,
      }
    ]
  },



]
