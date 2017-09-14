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
          <el-table  border style="max-width:900px;margin:0 auto;" :data="tableData">
            <el-table-column prop="account" label="账号（手机号）"  :span='3' align="center" header-align="center"></el-table-column>
            <el-table-column prop="createOn" label="注册时间" align="center" :span='2' header-align="center"></el-table-column>
            <el-table-column prop="loginTime" label="上次登录时间"  align="center"  :span='3' header-align="center"></el-table-column>
            <el-table-column prop="level" label="用户层级"  align="center":span='1' header-align="center"></el-table-column>
            <el-table-column prop="sumOrder" label="下单总数"  align="center" :span='1' header-align="center"></el-table-column>
            <el-table-column prop="sumPrice" label="下单总额" align="center" :span='1'  header-align="center"></el-table-column>
            <el-table-column prop="sumBonus" label="用户当前奖励金"align="center" header-align="center" :span='3'></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="mask"></div>
      <div class="add_regular_users popup">
        <div class="add_regular_users_title popup_title">添加普通用户</div>
        <div class="add_regular_users_tip">谨慎操作，如此添加用户，用户不需注册即可直接用账号密码登录app。</div>
        <div class="add_regular_users_account">
          <div class="add_regular_users_account_title">账号</div>
          <el-input placeholder="未注册过的手机号" v-model="phoneNum"></el-input>
        </div>
        <div class="add_regular_users_password">
          <div class="add_regular_users_password_title">密码</div>
          <el-input type="password" v-model="psd"></el-input>
        </div>
        <div class="add_regular_users_btns">
          <el-button @click="DisplayNone">取消</el-button>
          <el-button type="primary" @click="addUserMessage">添加普通用户</el-button>
        </div>
      </div>
    </div>

    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="count11">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  import http from '../../http'
 // Vue.use(Element)
  export default {
    //name: 'userManage',
    data() {
      return {
        tableData: [],
        currentPage:1,
        count11:1,
        phoneNum:'',
        psd:''
      }
    },
    created(){
        this.getUserManage()
    },
    methods: {
      addUserMessage(){
        if(this.phoneNum == ''){
          this.$message({
            type: 'info',
            message: '请输入账号'
          });
        }else {
          if(this.psd == ''){
            this.$message({
              type: 'info',
              message: '请输入密码'
            });
          }else {
            let url=http.apiMap.addreg;
            let data={
              common:1,
              account:this.phoneNum,
              password:this.psd
            };
            this.$http.post(url,data).then(
              function(res){
                if(res.body.result){
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
                  $('.mask').css('display','none');
                  $('.add_regular_users').css('display','none');
                }else{
                  this.$message({
                    type: 'error',
                    message: res.body.msg
                  });
                }
                this.phoneNum='';
                this.psd='';

              }
            )
          }
        }

      },
      //分页跳转
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserManage()  //页面 加载数据
      },

      getUserManage(){
        let url=http.apiMap.findUserManage;
        let data={
          common:2,
          size:10,
          nowpage:this.currentPage
        };
        this.$http.post(url,data).then(
          function(res){
            if(res.body.result){
              this.count11 = res.body.data.count
              //用户层级
              let data = res.body.data.userList
              let arr = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].level== 0) {
                  data[i].level = '普通用户'
                }else if (data[i].level == 1) {
                  data[i].level = '个人店主'
                } else if (data[i].level == 2) {
                  data[i].level = '公司店主'
                }else if (data[i].level == 3) {
                  data[i].level = '高级店主'
                }
                arr.push(data[i])
              }
              this.tableData=arr
            }
          }
        );
      },

      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.add_regular_users').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.add_regular_users').css('display','none');
      }

    },

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
