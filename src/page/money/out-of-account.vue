<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>支付系统</el-breadcrumb-item>
        <el-breadcrumb-item>出账记录</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="titlee" style="border:0;">出账</div>
      <div class="operation_time">
        <i>操作时间：</i>
        <div class="block">
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>

        <i>发生原因：</i>
        <select name="" id="">
          <option value="">全部</option>
          <option value="">退款</option>
          <option value="">体现</option>
        </select>
      </div>

      <div class="out_account_form">
        <el-table
          border
          style="width: 100%">
          <el-table-column
            label="操作时间">
          </el-table-column>
          <el-table-column
            label="发生原因">
          </el-table-column>
          <el-table-column
            label="出款方式">
          </el-table-column>
          <el-table-column
            label="财务出款账号">
          </el-table-column>
          <el-table-column
            label="用户账号">
          </el-table-column>
          <el-table-column
            label="出账金额">
          </el-table-column>
        </el-table>
      </div>

      <div class="accumulated_account">
        当前后台余额:￥<span>10086</span>
      </div>
    </div>
  </div>
</template>

<style>
  .operation_time{
    width: 80%;
    margin: 30px 0 30px 10%;
    overflow: hidden;
  }

  .operation_time i{
    line-height: 36px;
    float: left;
  }

  .operation_time .block{
    float: left;
    margin-left: 30px;
    margin-right: 60px;
  }

  .operation_time select{
    width: 100px;
    padding-left: 10px;
    height: 36px;
    float: left;
    margin-left: 30px;
  }

  .out_account_form{
    width: 80%;
    margin-left: 10%;
  }

  .accumulated_account{
    width: 80%;
    margin-left: 10%;
    text-align: right;
    line-height: 42px;
    font-style: 14px;
    font-weight: bold;
    color: #000000;
  }
</style>

<script>
  export default {
    data() {
      return {
        tableData: [{
          operating_time: '操作时间',
          occurrence_cause: '操作时间',
          payment: '出款方式',
          finance_account: '财务出款账号',
          user_account: '用户账号',
          amount_account: '出账金额'
        }, {
          operating_time: '操作时间',
          occurrence_cause: '操作时间',
          payment: '出款方式',
          finance_account: '财务出款账号',
          user_account: '用户账号',
          amount_account: '出账金额'
        }, {
          operating_time: '操作时间',
          occurrence_cause: '操作时间',
          payment: '出款方式',
          finance_account: '财务出款账号',
          user_account: '用户账号',
          amount_account: '出账金额'
        }, {
          operating_time: '操作时间',
          occurrence_cause: '操作时间',
          payment: '出款方式',
          finance_account: '财务出款账号',
          user_account: '用户账号',
          amount_account: '出账金额'
        }],
        value6: '',
        value7: ''
      }
    }
  }
</script>
