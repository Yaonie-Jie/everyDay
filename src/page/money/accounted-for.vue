<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>支付系统</el-breadcrumb-item>
        <el-breadcrumb-item>入账</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="titlee" style="border:0;">入账</div>
      <div class="accounted_for">
        <div class="block">
          <div class="block">
            发生时间：
            <el-date-picker
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
            <el-button type="success">搜索</el-button>
          </div>
        </div>
      </div>

      <div class="accounted_for_form">
        <el-table
          border
          style="width: 100%">
          <el-table-column
            label="发生时间">
          </el-table-column>
          <el-table-column
            label="发生原因">
          </el-table-column>
          <el-table-column
            label="入款方式">
          </el-table-column>
          <el-table-column
            label="入款账号">
          </el-table-column>
          <el-table-column
            label="用户账号">
          </el-table-column>
          <el-table-column
            label="金额变化">
          </el-table-column>
          <el-table-column
            label="后台余额">
          </el-table-column>
        </el-table>
      </div>

      <div class="current_balance">
        当前后台余额:￥<span>10086</span>
      </div>
    </div>
  </div>
</template>

<style>
  .accounted_for{
    width: 80%;
    margin: 30px 0 30px 10%;
  }

  .accounted_for_form{
    width: 80%;
    margin: 0 10%;
  }

  .current_balance{
    width: 80%;
    margin-left: 10%;
    text-align: right;
    line-height: 42px;
    font-style: 14px;
    font-weight: bold;
    color: #000000;
  }
</style>
