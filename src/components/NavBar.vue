<template>
  <div id="box">
    <el-menu default-active="/" class="el-menu-vertical-demo" :router="true">
      <!--<el-menu-item index="/activePublic">活动发布</el-menu-item>-->
      <!--<el-menu-item index="/activeManage">活动管理</el-menu-item>-->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>后台账号管理
        </template>
        <el-menu-item index="Jurisdiction">后台权限管理</el-menu-item>
        <el-menu-item index="ManageAccount">后台账号管理</el-menu-item>
        <el-menu-item index="RecordAccount">后台账号操作记录</el-menu-item>
      </el-submenu>
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-menu"></i>商品管理
        </template>
        <el-menu-item index="Classify">商品分类管理</el-menu-item>
        <el-menu-item index="BrandGoods">商品品牌管理</el-menu-item>
        <el-menu-item index="TagGoods">商品标签管理</el-menu-item>
        <el-menu-item index="RecommendGoods">推荐页--系统推荐商品</el-menu-item>
        <el-menu-item index="RecommendGoodsLike">推荐页--根据客户兴趣推荐商品</el-menu-item>
        <el-menu-item index="ManageGoods">商品管理（添加商品）</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>订单管理
        </template>
        <el-menu-item index="OrderList">订单列表</el-menu-item>
        <el-menu-item index="OrderRefund">退款中订单</el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-document"></i>订单服务
        </template>
        <el-menu-item index="FreightManage">发票管理</el-menu-item>
        <el-menu-item index="BillDemo">运费模板管理</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-star-off"></i>店主管理
        </template>
        <el-menu-item index="PersonNum">团队人数限制</el-menu-item>
        <el-menu-item index="ShopmanCommission">系统默认提成管理</el-menu-item>
        <el-menu-item index="ShopmanApply">店主申请管理</el-menu-item>
        <el-menu-item index="ShopmanManage">店主管理</el-menu-item>
        <el-menu-item index="ShopmanTeam">店主团队管理</el-menu-item>
      </el-submenu>
      <el-submenu index="5" >
        <template slot="title">
          <i class="el-icon-edit"></i>财务管理
        </template>
        <el-menu-item index="AccountedFor">入账</el-menu-item>
        <el-menu-item index="OutOf">出账记录</el-menu-item>
        <el-menu-item index="UserWithdrawApply">用户提现申请</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-menu"></i>美日美C用户管理
        </template>
        <el-menu-item index="userManage">用户管理</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title" ><i class="el-icon-message"></i>美日美C客服电话</template>
        <el-menu-item index="Phone">客服电话</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'

  Vue.use(Element)

  export default {
    name: 'box'
  }
</script>
