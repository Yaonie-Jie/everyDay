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
              v-model="time"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
            <el-button type="success" @click="findOrder">搜索</el-button>
          </div>
        </div>
      </div>

      <div class="accounted_for_form">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="createOn"
            label="发生时间">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="发生原因">
          </el-table-column>
          <el-table-column
            prop="incomeMent"
            label="入款方式">
          </el-table-column>
          <el-table-column
            prop="incomeAccount"
            label="入款账号">
          </el-table-column>
          <el-table-column
            prop="userAccount"
            label="用户账号">
          </el-table-column>
          <el-table-column
            label="金额变化">
            <template scope="scope">
              <span type="text">{{scope.row.incomeMoney / 100}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="后台余额">
            <template scope="scope">
              <span type="text">{{scope.row.balance / 100}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="current_balance">
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
        tableData: [],
        currentPage: 1,
        count11: 1,
        time: '',  //时间搜索
        startTime: '',
        endTime: '',
        OutMoney: ''
      }
    },
    created() {
      this.getInfinance()
    },
    methods: {
      getInfinance() {
        let url = http.apiMap.findInFinance;
        let data = {
          nowpage: this.currentPage,
          size: 10,
          common: 2,
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11 = res.body.data.count
              this.OutMoney = res.body.data.sumInFinance
              //发生原因
              let data = res.body.data.list
              let arr = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].reason == 1) {
                  data[i].reason = '订单' + data[i].orderNum + '付款'
                }
                if (data[i].incomeMent == 1) {
                  data[i].incomeMent = '支付宝'
                } else if (data[i].incomeMent == 0) {
                  data[i].incomeMent = '微信'
                }
                arr.push(data[i])
              }
              this.tableData = arr


            }
          }
        );
      },
      //分页跳转
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getInfinance()  //页面 加载数据
      },
      //搜索订单
      findOrder() {
        var paddNum = function (num) {    //如果是一位数就补一个0
          num += "";
          return num.replace(/^(\d)$/, "0$1");
        }

        function FormatDate(strTime) {  //转换时间格式
          if (strTime) {
            var date = new Date(strTime);
            return date.getFullYear() + "-" + paddNum(date.getMonth() + 1) + "-" + paddNum(date.getDate());
          } else {
            return ''
          }
        }

        let url = http.apiMap.findInFinance;
        let data = {
          common: 1,
          size: 10,
          nowpage: this.currentPage,
          startTime: FormatDate(this.time[0]),
          endTime: FormatDate(this.time[1]),
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11 = res.body.data.count;
              if (this.count11 == 0) {
                $(".fenye").hide()
              }else {
                $(".fenye").show()
              }
              //发生原因
              let data = res.body.data.list
              let arr = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].reason == 1) {
                  data[i].reason = '付款'
                }
                if (data[i].incomeMent == 0) {
                  data[i].incomeMent = '支付宝'
                } else if (data[i].incomeMent == 1) {
                  data[i].incomeMent = '微信'
                }
                arr.push(data[i])
              }
              this.tableData = arr


            }
          }
        );
      },
    }
  }
</script>

<style>
  .accounted_for {
    width: 80%;
    margin: 30px 0 30px 10%;
  }

  .accounted_for_form {
    width: 100%;
  }

  .current_balance {
    width: 80%;
    margin-left: 10%;
    text-align: right;
    line-height: 42px;
    font-weight: bold;
    color: #000000;
  }
</style>
