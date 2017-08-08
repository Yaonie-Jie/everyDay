<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item>提成管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="commission_">
        <div class="titlee" style="border:0;">系统默认店主提成</div>
        <div class="commission_form">
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
              :span='4'
              prop="brand_logo"
              label="店主级别">
            </el-table-column>
            <el-table-column
              :span='4'
              prop="brand_name"
              label="级别提成">
            </el-table-column>
            <el-table-column
              fixed="right"
              :span='4'
              label="操作">
              <template scope="scope">
                <el-button type="text" size="small" @click="DisplayBlock">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="mask"></div>
    <div class="popup change_ticheng">
      <div class="popup_title">修改默认提成</div>
      <div class="popup_form">
        <div class="popup_form_title">默认提成</div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="popup_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.change_ticheng').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.change_ticheng').css('display','none');
      }
    },
    data() {
      return {
        tableData: [{
          brand_logo: '高级店主',
          brand_name: '30%',
          brand_introduction: '品牌介绍',
          operation: '操作'
        }, {
          brand_logo: '公司店主',
          brand_name: '30%',
          brand_introduction: '品牌介绍',
          operation: '操作'
        }, {
          brand_logo: '个人店主',
          brand_name: '30%',
          brand_introduction: '品牌介绍',
          operation: '操作'
        }, {
          brand_logo: '品牌logo',
          brand_name: '40%',
          brand_introduction: '品牌介绍',
          operation: '操作'
        }]
      }
    }
  }
</script>
<style>
  .commission_{
    width: 100%;
    min-height: 500px;
    margin-top: 30px;
    overflow: hidden;
    position: relative;
  }

  .commission_title{
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    margin-top: 20px;
  }

  .commission_form{
    width: 80%;
    margin-left: 10%;
  }

  .commission_form table tr th{
    text-align: center;
  }

  .commission_form table tr td{
    text-align: center;
  }

  .table tr td{
    text-align: center;
    border-color: #303030 !important;
    width: 33%;
  }

  .commission_operate_btn a{
    color: #ffffff;
    padding: 2px 8px;
    background: #303030;
  }

  .commission_operate_btn a:hover{
    color: #FFFFFF !important;
    text-decoration: none;
  }
</style>

