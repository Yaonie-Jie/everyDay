<template>
  <div class="userManage">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户信息处理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息查看</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="contents">
        <div class="item1">
          <div class="left">用户信息查看</div>
          <div class="right"><el-button type="success" icon="icon-plus" @click="DisplayBlock">添加普通用户</el-button></div>
        </div>
        <div class="item2">
          <el-table   border style="max-width:900px;margin:0 auto;">
            <el-table-column prop="username" label="账号（手机号）"  :span='3' align="center" header-align="center"></el-table-column>
            <el-table-column prop="restime" label="注册时间" align="center" :span='2' header-align="center"></el-table-column>
            <el-table-column prop="logintime" label="上次登录时间"  align="center"  :span='3' header-align="center"></el-table-column>
            <el-table-column prop="UserType" label="用户层级"  align="center":span='1' header-align="center"></el-table-column>
            <el-table-column prop="number" label="下单总数"  align="center" :span='1' header-align="center"></el-table-column>
            <el-table-column prop="money" label="下单总额" align="center" :span='1'  header-align="center"></el-table-column>
            <el-table-column prop="moneys" label="用户当前奖励金"align="center" header-align="center" :span='3'></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="mask"></div>
      <div class="add_regular_users popup">
        <div class="add_regular_users_title popup_title">添加普通用户</div>
        <div class="add_regular_users_tip">谨慎操作，如此添加用户，用户不需注册即可直接用账号密码登录app。</div>
        <div class="add_regular_users_account">
          <div class="add_regular_users_account_title">账号</div>
          <el-input placeholder="未注册过的手机号"></el-input>
        </div>
        <div class="add_regular_users_password">
          <div class="add_regular_users_password_title">密码</div>
          <el-input value="123456"></el-input>
        </div>
        <div class="add_regular_users_btns">
          <el-button @click="DisplayNone">取消</el-button>
          <el-button type="primary">添加普通用户</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'

  Vue.use(Element)
  export default {
    name: 'userManage',
    methods: {
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.add_regular_users').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.add_regular_users').css('display','none');
      }
    },
    data() {
      return {
        tableData: [{
          username:'17696018825',
          restime:'2016-05-20  20:50',
          logintime:'2016-05-20  20:50',
          UserType:'普通用户',
          number:'123',
          money:'￥123.00',
          moneys:'142.00'
        },
          {
            username:'17696018825',
            restime:'2016-05-20  20:50',
            logintime:'2016-05-20  20:50',
            UserType:'个人店主',
            number:'123',
            money:'￥123.00',
            moneys:'142.00'
          },
          {
            username:'17696018825',
            restime:'2016-05-20  20:50',
            logintime:'2016-05-20  20:50',
            UserType:'普通用户',
            number:'123',
            money:'￥123.00',
            moneys:'142.00'
          },
          {
            username:'17696018825',
            restime:'2016-05-20  20:50',
            logintime:'2016-05-20  20:50',
            UserType:'普通用户',
            number:'123',
            money:'￥123.00',
            moneys:'142.00'
          }
        ]
      }
    }
  }

</script>
<style>
  .add_regular_users_tip{
    color: #ff3366;
    font-size: 12px;
    line-height: 24px;
  }
  .add_regular_users_account,.add_regular_users_password{
    width: 70%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }
  .add_regular_users_account_title,.add_regular_users_password_title{
    float: left;
    line-height: 36px;
    width: 20%;
    text-align: center;
  }
  .add_regular_users_account .el-input{
    width: 75%;
    float: right;
  }
  .add_regular_users_password .el-input{
    width: 75%;
    float: right;
  }
  .add_regular_users_btns{
    margin: 0 auto;
    margin-top: 40px;
  }
  .add_regular_users_btns .el-button:nth-child(1){
    float: left;
    margin-left: 25%;
  }
  .add_regular_users_btns .el-button:nth-child(2){
    float: right;
    margin-right: 25%;
  }
</style>
