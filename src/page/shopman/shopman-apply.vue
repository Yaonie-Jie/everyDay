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
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </div>
          <div class="apply_information">
            申请信息：
            <select name="">
              <option value="">全部</option>
              <option value="">升级到个人店主</option>
              <option value="">升级到高级店主</option>
              <option value="">升级到公司店主</option>
            </select>
            <input type="text" value="根据账号查找" />
            <el-button type="success">搜索</el-button>
          </div>
        </div>

        <div class="apply_form">
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="apply_time"
              label="申请时间">
            </el-table-column>
            <el-table-column
              prop="apply_account"
              label="申请账号">
            </el-table-column>
            <el-table-column
              prop="current_level"
              label="当前级别">
            </el-table-column>
            <el-table-column
              prop="accumulated_sales"
              label="累计销售金">
            </el-table-column>
            <el-table-column
              prop="subordinate_team"
              label="所属团队">
            </el-table-column>
            <el-table-column
              prop="inpofmation_detail"
              label="申请信息详情" >
              <el-button type="text" size="mini"  @click="shows()">cc</el-button>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template scope="scope">
                <el-button type="text" size="small" @click="open2()">通过</el-button>
                <el-button type="text" size="small" @click="open3()">驳回</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(Element)
  export default {
      methods:{
        open2() {
          this.$confirm('此操作将通过改申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '成功通过审核!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消通过'
            });
          });
        },
        open3() {
          this.$confirm('此操作将驳回该申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '驳回成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消驳回'
            });
          });
        },
        shows:function(){
          this.$router.push('/ShopmanApplyShow');
        }
      },
    data() {
      return {
        tableData: [{
          apply_time:'2017-02-15',
          apply_account: '店长',
          current_level:'当前级别',
          accumulated_sales:'累计销售金',
          subordinate_team:'所属团队',
          inpofmation_detail: '商品管理'
        }, {
          apply_time:'2017-02-15',
          apply_account: '店长',
          current_level:'当前级别',
          accumulated_sales:'累计销售金',
          subordinate_team:'所属团队',
          inpofmation_detail: '商品管理'
        }, {
          apply_time:'2017-02-15',
          apply_account: '店长',
          current_level:'当前级别',
          accumulated_sales:'累计销售金',
          subordinate_team:'所属团队',
          inpofmation_detail: '商品管理'
        }, {
          apply_time:'2017-02-15',
          apply_account: '店长',
          current_level:'当前级别',
          accumulated_sales:'累计销售金',
          subordinate_team:'所属团队',
          inpofmation_detail: '商品管理'
        }],
        tableDatas: this.tableData
      }
    }

  }
</script>

<style>
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
    float: right;
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

  .apply_form{
    width: 80%;
    margin-left: 10%;
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
</style>

