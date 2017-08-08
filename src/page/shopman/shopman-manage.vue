<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="apply_">
        <div class="titlee" style="border:0;">店主列表</div>
        <div class="apply_condition">
          <div class="apply_time">

            <div class="block">
              <el-button type="success" @click="DisplayBlock">添加无团队店主</el-button>
            </div>
          </div>
          <div class="apply_information">
            筛选：
            <select name="">
              <option value="">全部</option>
              <option value="">有团队店主</option>
              <option value="">无团队店主</option>
            </select>

            <input type="text" placeholder="输入账号（手机号）查找店主" style="padding:0 10px;" />
            <el-button type="success">查找</el-button>
          </div>
        </div>

        <div class="apply_form">
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="apply_time"
              label="何时升级到此级别店主">
            </el-table-column>
            <el-table-column
              prop="apply_account"
              label="店主级别">
            </el-table-column>
            <el-table-column
              prop="current_level"
              label="账号" inline-template>
              <el-button type="text" size="mini"  @click="shows()">222</el-button>
            </el-table-column>
            <el-table-column
              prop="accumulated_sales"
              label="所属团队--团长账号">
            </el-table-column>
            <el-table-column
              prop="subordinate_team"
              label="累计销售金额">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template scope="scope">
                <el-button type="text" size="small" @click="open2()">升级</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </div>
    </div>
    <div class="mask"></div>
    <div class="add_shopman popup">
      <div class="add_shopman_title popup_title">添加店主</div>
      <div class="add_shopman_account">
        <div class="add_shopman_account_title">账号</div>
        <el-input placeholder=""></el-input>
      </div>
      <div class="add_level">
        <div class="add_level_title">分配级别</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="add_s_title">添加个人店主</div>
      <div class="required_">必填个人店主资料</div>
      <div class="true_name">
        <div class="true_name_title">真实姓名</div>
        <el-input placeholder="请填写真实姓名"></el-input>
      </div>
      <div class="id_num">
        <div class="id_num_title">身份证号</div>
        <el-input placeholder="请填写身份证号"></el-input>
      </div>
      <div class="id_img_title">身份证照片</div>
      <div class="id_img_upload">
        <div>请上传身份证正面图片</div>
        <div>请上传身份证反面图片</div>
      </div>
      <div class="optional_">必填个人店主资料</div>
      <div class="zfb_account">
        <div class="zfb_account_title">支付宝账号</div>
        <el-input placeholder="请填写支付宝账号"></el-input>
      </div>
      <div class="wx_account">
        <div class="wx_account_title">微信支付账号</div>
        <el-input placeholder="请填写微信支付账号"></el-input>
      </div>
      <div class="add_shopman_btns">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">添加</el-button>
      </div>
    </div>
  </div>
</template>

<style>
  .apply_form{
    margin-top: 20px;
  }
  .add_shopman_account,
  .true_name,
  .id_num,
  .zfb_account,
  .wx_account
  {
    width: 60%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }
  .add_shopman_account_title,
  .add_level_title,
  .true_name_title,
  .id_num_title,
  .zfb_account_title,
  .wx_account_title
  {
    width: 25%;
    float: left;
    line-height: 36px;
    text-align: left;
  }
  .add_shopman_account .el-input,
  .true_name .el-input,
  .id_num .el-input,
  .zfb_account .el-input,
  .wx_account .el-input
  {
    float: right;
    width: 75%;
  }
  .add_level{
    width: 60%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }
  .add_level .el-select{
    width: 75%;
    float: right;
  }
  .add_s_title{
    width: 100%;
    margin: 30px 0 0 0;
  }
  .required_,.optional_{
    width: 60%;
    margin: 0 auto;
    text-align: left;
    line-height: 28px;
    font-size: 14px;
    font-weight: bold;
    background: #ff3366;
    color: #FFFFFF;
    margin-top: 30px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .id_img_title{
    margin-left: 20%;
    line-height: 36px;
    text-align: left;
    margin-top: 30px;
  }
  .id_img_upload{
    width: 60%;
    overflow: hidden;
    margin: 0 auto;
  }
  .id_img_upload div{
    width: 150px;
    height: 80px;
    background: #cccccc;
    text-align: center;
    line-height: 80px;
    color: #FFFFFF;
  }
  .id_img_upload div:nth-child(1){
    float: left;
  }
  .id_img_upload div:nth-child(2){
    float: right;
  }
  .add_shopman_btns{
    margin: 0 auto;
    margin-top: 40px;
  }
  .add_shopman_btns .el-button:nth-child(1){
    float: left;
    margin-left: 25%;
  }
  .add_shopman_btns .el-button:nth-child(2){
    float: right;
    margin-right: 25%;
  }
</style>

<script>
  export default{
    methods: {
      open2() {
        this.$confirm('此操作将升级该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '升级成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消升级'
          });
        });
      },
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.add_shopman').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.add_shopman').css('display','none');
      },
      shows:function(){
        this.$router.push('/ShopmanManageShow');
      }
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '个人店主'
        }, {
          value: '选项2',
          label: '公司店主'
        }, {
          value: '选项3',
          label: '高级店主'
        }],
        value: '',
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
        }]
      }
    }
  }
</script>


