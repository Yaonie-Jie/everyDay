<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item>店主申请管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="apply_">
        <div class="titlee" style="border:0;">店主申请管理</div>
        <div class="apply_condition" style='width:100%;padding:0;padding-bottom:80px;'>
          <div class="apply_time">
            申请时间：
            <div class="block">
              <el-date-picker
                v-model="time"
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </div>
          <div class="apply_information">

            <span style="float:left;">申请信息：</span>
            <select id="orderState" >
              <option>全部</option>
              <option>申请升级到个人店主</option>
              <option>申请升级到公司店主</option>
              <option>申请升级到高级店主</option>

            </select>
            <input type="text" placeholder="根据账号查找" v-model="account" style="float:left;margin-right: 20px"/>
            <el-button type="success" @click="searchFind">搜索</el-button>
          </div>
        </div>

        <div class="apply_form">
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="createOn"
              label="申请时间">
            </el-table-column>
            <el-table-column
              prop="account"
              label="申请账号">
            </el-table-column>
            <el-table-column
              prop="level"
              label="当前级别">
            </el-table-column>
            <el-table-column
              prop=""
              label="累计销售金">
            </el-table-column>
            <el-table-column
              prop=""
              label="所属团队">
            </el-table-column>
            <el-table-column
              prop="message"
              label="申请信息详情" >
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template scope="scope">
                <el-button type="text" size="small" @click="showapplyManage(scope.row.account)">查看</el-button>
                <el-button type="text" size="small" @click="open2(scope.row)">通过</el-button>
                <el-button type="text" size="small" @click="open3(scope.row)">驳回</el-button>
              </template>
            </el-table-column>
          </el-table>

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

  import http from '../../http'

  export default {
      data() {
        return {
          common:1,
          tableData: [],
          time:'',  //时间搜索
          message:'',   //申请信息
          account:'' , //账号信息
          currentPage:1,
          count11:1,
        }
      },
      created(){
        this.getData()
      },
      methods:{
        getData(){
          let url = http.apiMap.shopmanData;
          let data = {
            common: this.GLOBAL.common,
            startTime:'',
            endTime:'',
            size:10,
            nowpage:this.currentPage,
          };
          this.$http.post(url,data).then(
            function (res) {
              if (res.body.result) {
                //this.tableData = res.body.data.oav

                let data1 = res.body.data.oav;
                let arr = [];
                for (var i = 0; i < data1.length; i++) {
                  if (data1[i].level == 0) {
                    data1[i].level = '普通用户'
                  } else if (data1[i].level == 1) {
                    data1[i].level = '个人店主'
                  } else if (data1[i].level == 2) {
                    data1[i].level = '公司店主'
                  } else if (data1[i].level == 3) {
                    data1[i].level = '高级店主'
                  }
                  arr.push(data1[i])
                }
                console.log(arr)
                this.tableData=arr;
              }
            }
          );
        },


        //搜索
        searchFind(){
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
          let searchurl = http.apiMap.searchShopmanData;
            let searchdata = {
              common: this.GLOBAL.common,
              startTime:FormatDate(this.time[0]),
              endTime:FormatDate(this.time[1]),
              message:$("#orderState :selected").text().replace(/(^\s*)|(\s*$)/g, ""),
              account:this.account,  //账号信息
              size:10,
              nowpage:this.currentPage,
            };
            this.$http.post(searchurl,searchdata).then(
              function (res) {
                if (res.body.result) {

                  data = res.body.data.list;
                    //判断级别
                  let arr = [];
                  for (var i = 0; i < data.length; i++) {
                    if (data[i].level == 0) {
                      data[i].level = '普通用户'
                    } else if (data[i].level == 1) {
                      data[i].level = '个人店主'
                    } else if (data[i].level == 2) {
                      data[i].level = '公司店主'
                    } else if (data[i].level == 3) {
                      data[i].level = '高级店主'
                    }
                    arr.push(data[i])
                  }

                  this.tableData=arr;



                }
              }
            );
          },

        //申请详细信息
        showapplyManage(account) {
          this.$router.push('/ShopmanApplyShow/'+ account);
        },


        //分页跳转
        handleCurrentChange(val) {
          this.currentPage = val;
          this.getData()  //页面 加载数据
        },

        open2(row) {
          this.$confirm('此操作将通过该申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let passurl =  http.apiMap.passAudit;
            let passdata = {
              common: 2,
              account:row.account
            };
            this.$http.post(passurl,passdata).then(
              function (res) {
                if (res.body.result) {
                  this.$message({
                    type: 'success',
                    message: '成功通过审核!'
                  });
                  this.getData();
                }else {
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
              message: '已取消操作'
            });
          });
        },
        open3(row) {
          this.$confirm('此操作将驳回该申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let rejecturl =  http.apiMap.rejectAudit;
            let rejectdata = {
              common: 2,
              account:row.account
            };
            this.$http.post(rejecturl,rejectdata).then(
              function (res) {
                if (res.body.result) {
                  this.$message({
                    type: 'success',
                    message: '驳回成功!'
                  });
                  this.getData();
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

        },
  }









</script>

<style >
  .apply_{
    width: 100%;
    min-height: 500px;
    margin-top: 30px;
    overflow: hidden;
    position: relative;
  }

  .apply_title{
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    margin-top: 20px;
  }

  .apply_condition{
    padding: 0 10% 50px 10%;
  }

  .apply_time{
    float: left;
    line-height: 32px;
    margin-right: 10px;
  }

  .apply_time .block{
    float: right;
  }

  .apply_information{
    float: left;
    line-height: 32px;
  }

  .apply_information select{
    height: 36px;
    margin-left: 10px;
  }

  .apply_information input{
    height: 32px;
    margin-left: 10px;
  }

  .apply_search_btn{
    padding: 8px 18px;
    border-radius: 3px;
    background: #1E9FFF;
    color: #FFFFFF;
    margin-left: 10px;
  }

  .apply_search_btn:hover{
    background: #178FE5;
    color: #FFFFFF;
    text-decoration: none;
  }

  .table tr td{
    text-align: center;
    border-color: #303030 !important;
  }

  .apply_form table tr td{
    text-align: center;
  }

  .apply_form table tr th{
    text-align: center;
  }

  .table tr td a{
    color: #303030;
    margin: 0 5px;
  }
  .el-button{
    margin:0 !important;
  }
</style>

