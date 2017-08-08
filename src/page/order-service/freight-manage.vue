<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>其他服务</el-breadcrumb-item>
        <el-breadcrumb-item>发票管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="invoice">
        <div class="titlee" style="border:0;">
          用户可选发票内容
        </div>
        <el-button type="success">添加发票内容</el-button>
        <div class="invoice_form">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="invoice_content"
              label="发票内容">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .invoice{
    width: 100%;
    min-height: 500px;
    margin-top: 30px;
    overflow: hidden;
    position: relative;
  }

  .invoice button{
    float: right;
    margin: 50px 10% 20px 0;
  }

  .invoice_title{
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    margin-top: 20px;
  }

  .add_invoice_btn{
    width: 100px;
    height: 30px;
    border-radius: 5px;
    background: #1E9FFF;
    color: #FFFFFF;
    text-align: center;
    line-height: 30px;
    position: absolute;
    right: 10%;
    top: 30px;
  }

  .invoice_form{
    width: 80%;
    margin:70px auto;
  }

  .invoice_form table tr td{
    text-align: center;
  }

  .invoice_form table tr th{
    text-align: center;
  }

  .table tr td{
    text-align: center;
    border-color: #303030 !important;
  }
</style>

<script>
  export default {
    data() {
      return {
        tableData: [{
          invoice_content: '2016-05-02',
          operation: '王小虎',
        }, {
          invoice_content: '2016-05-04',
          operation: '王小虎'
        }]
      }
    }
  }
</script>
