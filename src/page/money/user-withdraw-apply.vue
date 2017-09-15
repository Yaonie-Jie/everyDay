<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>支付系统</el-breadcrumb-item>
        <el-breadcrumb-item>奖励结算</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="titlee" style="border:0;">结算申请明细</div>
      <div class="operation_time" style="line-height: 60px">
        <i style="float:left;">申请时间：</i>
        <div class="block" style="float:left;width: 500px;">
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
            prop="createOn"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="userAccount"
            label="用户账号">
          </el-table-column>
          <el-table-column
            prop="money"
            label="结算金额">
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small" @click="DispalyBlock(scope.row)">提现成功</el-button>
              <el-button type="text" size="small" @click="fireDra(scope.row)">提现驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="mask"></div>
    <div class="modifypass popup">
      <el-row >
        <el-col :span="24" style="margin-top:20px;">
          <span style="float:left;margin-left:21%;">提现方式:</span>:
          <select name="" id="orderState" v-model="orderState" style="width:50%;">
            <option value="">请选择</option>
            <option value="1">支付宝</option>
            <option value="2">微信</option>
          </select>
        </el-col>
        <el-col :span="24" style="margin-top:20px;">
          <span>用户支付宝账号</span>:
          <el-input style="width:50%;" v-model="userzfb"></el-input>
        </el-col>
        <el-col :span="24" style="margin-top:20px;">
          <span>退款支付宝账号</span>:
          <el-input style="width:50%;" v-model="tkzfb"></el-input>
        </el-col>
        <el-button type="info" @click="DisplayNone">取消</el-button>
        <el-button type="success" @click="successDra">确认提现成功</el-button>
      </el-row>
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
<style>
  .input_f{
    width:80%;
    height:30px;
    font-size:16px;
  }
  .mask{

    display:none;
  }
  .modifypass{
    display:none;
  }
  .input_user{
    width:80%;
    height:30px;
    font-size:16px;
    line-height:30px;
   text-align:left;
  }
</style>


<script>
  import http from '../../http'
  export default{
    data() {
      return {
        currentPage:1,
        count11:1,
        time:'',  //时间搜索
        tableData: [],
        orderState:'',
        userzfb:'',
        tkzfb:'',
        id:'',
        money:'',
        userAccount:''
      }
    },
    created(){
      this.getWithdrawals()
    },
    methods:{
      DispalyBlock(row){
         this.id=row.id;
         this.money=row.money;
         this.userAccount=row.userAccount;
        $('.mask').css('display','block');
        $('.modifypass').css('display','block');
      },
      DisplayNone(){
        $('.mask').css('display','none');
        $('.modifypass').css('display','none');
      },
      //提现成功
      successDra(){
           let url=http.apiMap.modifyPass;
           let data={
             common:1,
             id:this.id,
             outMent:this.orderState,//出账方式
             outAccount:this.tkzfb,//出账账号
             incomeAccount:this.userAccount,//收款账号
             userAccount:this.userzfb,//用户账号
             outMoney:this.money,//出账金额
           };
           this.$http.post(url,data).then(
             function(res){
               if(res.body.result){
                 this.$message({
                   type: 'success',
                   message: '提现成功!'
                 });
                 this.getWithdrawals()
               }else{
                 this.$message({
                   type: 'danger',
                   message: '申请失败!'
                 });
               }
               $('.mask').css('display','none');
               $('.modifypass').css('display','none');
               this.orderState='';
               this.tkzfb='';
               this.userzfb='';
             }
           )
      },

      //提现驳回
      fireDra(row){
        this.$confirm('此操作将驳回该申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url =  http.apiMap.modifyReject;
          let data = {
            common: 2,
            id:row.id,
          };
          this.$http.post(url,data).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '驳回成功!'
                });
                this.getWithdrawals();
              }else{
                this.$message({
                  type: 'info',
                  message: res.body.msg
                });
              }
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消驳回'
          });
        });
      },
      //分页跳转
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getWithdrawals()
      },

      getWithdrawals(){
        let url = http.apiMap.findWithdrawals;
        let data = {
          nowpage: this.currentPage,
          size: 10,
          common: 2,
          startTime:'',
          endTime:''
        };
        this.$http.post(url,data).then(
          function (res) {
            console.log(res)
            if (res.body.result) {
              console.log(1)
              console.log(res)
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
        let url = http.apiMap.findWithdrawals;
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
              console.log(res.body.data)
              let data = res.body.data.list;
              this.tableData = data;
            }
          }
        );
      },
    }
  }
</script>

