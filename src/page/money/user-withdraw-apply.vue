<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>支付系统</el-breadcrumb-item>
        <el-breadcrumb-item>用户提现申请</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="titlee" style="border:0;">提现申请列表</div>
      <div class="operation_time">
        <i>申请时间：</i>
        <div class="block">
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>
      </div>

      <div class="out_account_form">
        <el-table
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="apply_time"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户账号">
          </el-table-column>
          <el-table-column
            prop="apply_money"
            label="申请提现奖励（元）">
          </el-table-column>
          <el-table-column
            prop="apply_message"
            label="备注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small">升级</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        tableData: [
          {
            apply_time:'2017-02-15',
            username: '店长',
            apply_money:'120',
            apply_message:'累计销售金'
          },
          {
            apply_time:'2017-02-15',
            username: '店长',
            apply_money:'120',
            apply_message:'累计销售金'
          },
          {
            apply_time:'2017-02-15',
            username: '店长',
            apply_money:'120',
            apply_message:'累计销售金'
          },
          {
            apply_time:'2017-02-15',
            username: '店长',
            apply_money:'120',
            apply_message:'累计销售金'
          }
        ]
      }
    }
  }
</script>

