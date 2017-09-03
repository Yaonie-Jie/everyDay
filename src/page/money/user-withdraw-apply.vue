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
            v-model="time"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
          <el-button type="success" @click="findOrder">搜索</el-button>
        </div>
      </div>

      <div class="out_account_form">
        <el-table
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="modifiedOn"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="userAccount"
            label="用户账号">
          </el-table-column>
          <el-table-column
            prop="money"
            label="申请提现奖励（元）">
          </el-table-column>
          <el-table-column
            prop="remarks"
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
  import http from '../../http'
  export default{
    data() {
      return {
        currentPage:1,
        count11:1,
        time:'',  //时间搜索
        tableData: []
      }
    },
    created(){
      this.getWithdrawals()
    },
    methods:{
      //分页跳转
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getWithdrawals()
      },
      getWithdrawals:function(){
        let url = http.apiMap.findWithdrawals;
        let data = {
          nowpage: this.currentPage,
          size: 10,
          common: 2
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11 = res.body.data.count
              console.log(res.body.data.list)
              this.tableData = res.body.data.list
            }
          }
        );
      },
      //搜索订单
      findOrder(){
        var paddNum = function(num){    //如果是一位数就补一个0
          num += "";
          return num.replace(/^(\d)$/,"0$1");
        }
        function FormatDate (strTime) {
          if(strTime){
            var date = new Date(strTime);
            return date.getFullYear()+"-"+paddNum(date.getMonth() + 1)+"-"+paddNum(date.getDate());
          }else {
            return ''
          }
        }
        let url = http.apiMap.findOrder;
        let data = {
          common: 1,
          size:10,
          nowpage:this.currentPage,
          startTime:FormatDate(this.time[0]),
          endTime:FormatDate(this.time[1]),
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11 = res.body.data.count;
              let data = res.body.data.orderList;
              this.dataList = data;
            }
          }
        );
      },
    }
  }
</script>

