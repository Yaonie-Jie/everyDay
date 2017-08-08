<template>
  <div class="userManage">
    <div class="box">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item>其他服务</el-breadcrumb-item>
        <el-breadcrumb-item>运费模板</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="contents">
        <div class="titlee" style="border:0;">
          运费模板
        </div>
        <div class="item1">
          <div class="right"><el-button type="success" icon="icon-plus" @click="DisplayBlock">添加运费模板</el-button></div>
        </div>
        <div class="item2">
          <el-table
            border
            style="width: 100%">
            <el-table-column
              label="序号">
            </el-table-column>
            <el-table-column
              label="模板名称">
            </el-table-column>
            <el-table-column
              label="默认运费">
            </el-table-column>
            <el-table-column
              label="地址">
            </el-table-column>
            <el-table-column
              label="免邮设置">
            </el-table-column>
            <el-table-column
              label="操作">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="mask"></div>
    <div class="add_template popup">
      <div class="add_template_title popup_title">添加运费模板</div>
      <div class="template_name">
        <div class="template_name_title">模板名称</div>
        <el-input placeholder=""></el-input>
      </div>
      <div class="template_freight">
        <div class="template_freight_title">默认运费</div>
        <el-input placeholder=""></el-input>
      </div>
      <div class="add_noDefaultarea_btn"><el-button type="primary" @click="DisplayBlock2">添加非默认运费地区</el-button></div>
      <div class="freight_table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="noDefault_area"
            label="非默认运费地区">
          </el-table-column>
          <el-table-column
            prop="freight"
            label="运费">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small" @click="DisplayBlock3">修改</el-button>
              <el-button type="text" size="small" @click="open2()">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="set_up">
        <div class="freight_set_up">免邮设置</div>
        <el-radio label="不免邮"></el-radio>
        <el-radio label="订单满额免邮"></el-radio>
        <el-input placeholder="免邮金额"></el-input>
      </div>
      <div class="add_template_btns">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">添加</el-button>
      </div>
    </div>
    <div class="add_noDefaultarea popup">
      <div class="add_noDefaultarea_title popup_title">添加非默认运费地区</div>
      <div class="add_noDefaultarea_list_title">非默认运费地区选择</div>
      <div class="add_noDefaultarea_list">
        <dl>
          <dt><el-checkbox label="浙江省" name="type"></el-checkbox></dt>
          <dd><el-checkbox label="杭州市" name="type"></el-checkbox></dd>
          <dd><el-checkbox label="舟山市" name="type"></el-checkbox></dd>
        </dl>
        <dl>
          <dt><el-checkbox label="辽宁省" name="type"></el-checkbox></dt>
          <dd><el-checkbox label="葫芦岛市" name="type"></el-checkbox></dd>
          <dd><el-checkbox label="大连市" name="type"></el-checkbox></dd>
        </dl>
      </div>
      <div class="add_noDefaultarea_freight">运费</div>
      <div class="add_noDefaultarea_free"><el-input v-model="input" placeholder="免邮金额"></el-input>元</div>
      <div class="add_noDefaultarea_btns">
        <el-button @click="DisplayNone2">取消</el-button>
        <el-button type="primary">添加</el-button>
      </div>
    </div>

    <div class="change_freight popup">
      <div class="popup_title">修改运费模板</div>
      <div class="popup_form">
        <div class="popup_form_title">模板名称</div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="popup_form">
        <div class="popup_form_title">默认运费</div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="popup_btn">
        <el-button @click="DisplayNone3">取消</el-button>
        <el-button type="primary">修改</el-button>
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
    name: 'userManage',
    methods: {
      open2() {
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.add_template').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.add_template').css('display','none');
      },

      DisplayBlock2:function(){
        $('.mask').css('display','block');
        $('.mask').css('z-index','9999');
        $('.add_noDefaultarea').css('display','block');
      },

      DisplayNone2:function(){
        $('.mask').css('z-index','9');
        $('.add_noDefaultarea').css('display','none');
      },
      DisplayBlock3:function(){
        $('.mask').css('display','block');
        $('.mask').css('z-index','9999');
        $('.change_freight').css('display','block');
      },

      DisplayNone3:function(){
        $('.mask').css('z-index','9');
        $('.change_freight').css('display','none');
      }
    },
    data() {
      return {
        tableData: [{
          noDefault_area:'1',
          freight:'2016-05-20  20:50',
          operation:'修改  删除'
        },
          {
            noDefault_area:'2',
            freight:'2016-05-20  20:50',
            operation:'修改  删除'
          },
          {
            noDefault_area:'3',
            freight:'2016-05-20  20:50',
            operation:'修改  删除'
          }
        ]
      }
    }
  }

</script>
<style>
  .change_freight{
    z-index: 9999;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .item2{
    padding:20px;
    box-sizing: border-box;
    margin-top: 30px;
  }
  .broad{
    margin-bottom:30px;
  }
  .item1{
    padding:20px;
  }
  .dange{
    padding:20px 20px 0 20px;
  }
  table tr td{
    text-align: center !important;
  }
  table tr th{
    text-align: center !important;
  }
  .template_name,
  .template_freight
  {
    width: 50%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }
  .template_name_title,
  .template_freight_title
  {
    width: 25%;
    text-align: left;
    line-height: 36px;
    float: left;
  }
  .template_name .el-input,
  .template_freight .el-input
  {
    width: 70%;
    float: right;
  }
  .add_noDefaultarea_btn{
    width: 70%;
    margin: 30px auto;
    text-align: right;
  }
  .add_noDefaultarea_btn .el-button{
    margin-right: 0;
  }
  .freight_table{
    width: 70%;
    margin: 0 auto;
  }
  .set_up{
    width: 70%;
    margin: 0 auto;
    line-height: 36px;
    margin-top: 30px;
    overflow: hidden;
  }
  .freight_set_up{
    float: left;
    width: 20%;
    text-align: center;
    margin: 0;
  }
  .set_up .el-input{
    float: left;
    width: 20%;
    text-align: center;
    margin: 0;
  }
  .set_up .el-radio{
    float: left;
    width: 30%;
    text-align: center;
    margin: 0;
  }
  .add_template_btns{
    margin: 0 auto;
    margin-top: 40px;
  }
  .add_template_btns .el-button:nth-child(1){
    float: left;
    margin-left: 35%;
  }
  .add_template_btns .el-button:nth-child(2){
    float: right;
    margin-right: 35%;
  }
  .add_noDefaultarea{
    width: 400px;
    padding: 30px;
    background: #ffffff;
    position: fixed;
    top: 100px;
    left: 50%;
    margin-left: -230px;
    text-align: center;
    z-index: 99999;
    display: none;
  }
  .add_noDefaultarea_list_title,
  .add_noDefaultarea_freight
  {
    width: 60%;
    text-align: left;
    margin-top: 30px;
  }
  .add_noDefaultarea_list{
    width: 60%;
    margin: 0 auto;
    overflow: hidden;
  }
  .add_noDefaultarea_list dl{
    width: 50%;
    float: left;
    margin-top: 30px;
  }
  .add_noDefaultarea_list dl dt{
    height: 28px;
    line-height: 28px;
    text-align: left;
  }
  .add_noDefaultarea_list dl dd{
    height: 28px;
    line-height: 28px;
    text-align: left;
    margin-left: 20px;
  }
  .add_noDefaultarea_free{
    width: 60%;
    margin: 0 auto;
    text-align: left;
    line-height: 36px;
    margin-top: 30px;
  }
  .add_noDefaultarea_free .el-input{
    width: 50%;
    float: left;
    margin-right: 10px;
  }
  .add_noDefaultarea_btns{
    margin: 0 auto;
    margin-top: 40px;
  }
  .add_noDefaultarea_btns .el-button:nth-child(1){
    float: left;
    margin-left: 25%;
  }
  .add_noDefaultarea_btns .el-button:nth-child(2){
    float: right;
    margin-right: 25%;
  }
</style>
