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
            v-model="time"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>

        <i>发生原因：</i>
        <select name="" id="orderState" v-model="reason">
          <option value="" v-for="option in options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
        <el-button type="success" @click="findOrder">搜索</el-button>
      </div>

      <div class="out_account_form">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="createOn"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="发生原因">
          </el-table-column>
          <el-table-column
            prop="outMent"
            label="出款方式">
          </el-table-column>
          <el-table-column
            prop="incomeAccount"
            label="财务出款账号">
          </el-table-column>
          <el-table-column
            prop="userAccount"
            label="用户账号">
          </el-table-column>
          <el-table-column
            prop="outMoney"
            label="出账金额">
            <template scope="scope">
              <span type="text">{{scope.row.outMoney / 100}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="accumulated_account">
        当前后台余额:￥<span>{{OutMoney / 100}}</span>
      </div>
    </div>

    <div class="block fenye">
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
  import http from '../../http'

  export default {
    data() {
      return {
        currentPage: 1,
        count11: 1,
        tableData: [],
        time: '',  //时间搜索
        value6: '',
        value7: '',
        OutMoney: '',
        reason: '',    //发生原因
        options: [
          {text: '全部', value: ''},
          {text: '退款', value: '1'},
          {text: '提现', value: '2'}
        ]
      }
    },
    created() {
      this.getOutfinance()
    },
    methods: {
      getOutfinance() {
        let url = http.apiMap.findOutFinance;
        let data = {
          nowpage: this.currentPage,
          size: 10,
          common: 2,
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11 = res.body.data.count
              if (this.count11 == 0) {
                $(".fenye").hide()
              } else {
                $(".fenye").show()
              }
              this.OutMoney = res.body.data.sumInFinance
              //出账原因
              let data = res.body.data.list
              let arr = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].reason == 1) {
                  data[i].reason = '订单' + data[i].orderNum + '退款'
                } else if (data[i].reason == 2) {
                  data[i].reason = '用户' + data[i].userAccount + '提现'
                }
                if (data[i].outMent == 1) {
                  data[i].outMent = '支付宝'
                } else if (data[i].outMent == 0) {
                  data[i].outMent = '微信'
                }
                arr.push(data[i])
              }
              this.tableData = arr;


            }
          }
        );
      },
      //分页跳转
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getOutfinance()
      },
      //搜索订单
      findOrder() {
        var paddNum = function (num) {    //如果是一位数就补一个0
          num += "";
          return num.replace(/^(\d)$/, "0$1");
        }

        function FormatDate(strTime) {
          if (strTime) {
            var date = new Date(strTime);
            return date.getFullYear() + "-" + paddNum(date.getMonth() + 1) + "-" + paddNum(date.getDate());
          } else {
            return ''
          }
        }

        let url = http.apiMap.findOutFinance;
        let data = {
          common: 1,
          size: 10,
          nowpage: this.currentPage,
          startTime: FormatDate(this.time[0]),
          endTime: FormatDate(this.time[1]),
          reason: $("#orderState :selected").attr('value')
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11 = res.body.data.count;
              if (this.count11 == 0) {
                $(".fenye").hide()
              } else {
                $(".fenye").show()
              }

              //出账原因
              let data = res.body.data.list
              let arr = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].reason == 1) {
                  data[i].reason = '退款'
                } else if (data[i].reason == 2) {
                  data[i].reason = '提现'
                }
                if (data[i].outMent == 1) {
                  data[i].outMent = '支付宝'
                } else if (data[i].outMent == 2) {
                  data[i].outMent = '微信'
                }
                arr.push(data[i])
              }
              this.tableData = arr;


            }
          }
        );
      },
    }
  }
</script>
<style>
  .operation_time {
    width: 80%;
    margin: 30px 0 30px 10%;
    overflow: hidden;
  }

  .operation_time i {
    line-height: 36px;
    float: left;
  }

  .operation_time .block {
    float: left;
    margin-left: 30px;
    margin-right: 60px;
  }

  .operation_time select {
    width: 100px;
    padding-left: 10px;
    height: 36px;
    float: left;
    margin-left: 30px;
  }

  .out_account_form {
    width: 80%;
    margin-left: 10%;
  }

  .accumulated_account {
    width: 80%;
    margin-left: 10%;
    text-align: right;
    line-height: 42px;
    font-size: 14px;
    font-weight: bold;
    color: #000000;
  }

  .el-button {
    margin: 0 !important;
  }

  #orderState {
    margin-right: 20px;
  }
</style>
