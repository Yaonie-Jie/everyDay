<template>
  <div class="userManage">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item>团队人数限制</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="population_restriction" >
        <div class="population_restriction_titles">
          下面两个设置人数相同
        </div>

        <el-form  label-width="250px" class="demo-ruleForm" style="padding-top:30px;">
          <el-form-item label="设置每个高级店主下最多公司店主数量" prop="resname">
            <el-input  type="number"></el-input>
          </el-form-item>
          <el-form-item label="设置每个公司店主下最多公司店主数量" prop="pass">
            <el-input  type="number"></el-input>
          </el-form-item>
          <div class="bill_demo_btn">
            <el-button type="primary" style="margin: 0 auto 30px;float: right" @click="open2">确定</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style>
  .population_restriction{
    min-width:600px;
    margin: 0 auto;
  }
  .population_restriction_titles{
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    margin-top: 30px;
  }
</style>

<script>
  export default {
    methods: {
      open2() {
        this.$confirm('此操作将修改店主相同人数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    }
  }
</script>


