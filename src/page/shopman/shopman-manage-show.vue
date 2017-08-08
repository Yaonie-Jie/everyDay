<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ShopmanManage'}">店主管理</el-breadcrumb-item>
        <el-breadcrumb-item>店主资料</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="shopman_data">
        <p class="shopman_data_title">团队资料<span>所属团队：无</span></p>
        <ul class="shopman_data1">
          <li><i>账号：</i><span>13928989823</span></li>
          <li><i>昵称：</i><span>------</span></li>
          <li><i>注册时间：</i><span>2015-01-01 ·12:00:00</span></li>
          <li><i>店主级别：</i><span>高级店主</span></li>
          <li><i>升级到高级店主时间：</i><span>2015-01-01 ·12:00:00</span></li>
          <li><i>所属团队：</i><span>高级店主团队（有可以点击查看团队详情，没有空）</span></li>
          <li><i>累计销售金：</i><span>￥1353.00</span></li>
          <li><i>上月销售金：</i><span>￥132.00</span></li>
          <li><i>累计所得奖励：</i><span>133.00</span></li>
          <li><i>上月所得奖励：</i><span>13.00</span></li>
        </ul>
        <div class="shopman_data2">
          <div class="data2_title">个人店主资料</div>
          <div class="data2_name"><i>真实姓名：</i><span>果果</span></div>
          <div class="data2_id"><i>身份证号：</i><span>2119290129302198323</span></div>
          <div class="data2_id_img">
            <p>身份证照片</p>
            <div class="positive_img"></div>
            <div class="opposite_img"></div>
          </div>
          <div class="zfbpay"><i>支付宝账号：</i><span>18858594797</span></div>
          <div class="wxpay"><i>微信支付账号：</i><span>18858594797</span></div>
        </div>

        <div class="shopman_data3">
          <div class="data3_title">公司店主资料</div>
          <div class="data3_name"><i>公司名称: </i><span>xx公司</span></div>
          <div class="data3_number"><i>公司注册号：</i><span>abcd123果果-</span></div>
          <div class="data3_license">
            <p class="data3_license_title">公司营业执照</p>
            <div class="data3_license_img"></div>
          </div>
        </div>

        <div class="operation_btn">
          <el-button type="primary">修改店主资料</el-button>
          <el-button type="primary" @click="DisplayBlock">升级到公司店主</el-button>
          <el-button type="primary">升级到高级店主</el-button>
        </div>
      </div>
    </div>
    <div class="mask"></div>
    <div class="supplement_information popup">
      <div class="supplement_information_title popup_title">请补充下面的店主资料，将此人升级到公司店主</div>
      <div class="corporate_name">
        <div class="corporate_name_title">公司名称</div>
        <el-input placeholder="请填写公司名称"></el-input>
      </div>
      <div class="company_number">
        <div class="company_number_title">公司注册号</div>
        <el-input placeholder="请填写公司注册号"></el-input>
      </div>
      <div class="corporation_license">
        <div class="corporation_license_title">公司营业执照</div>
        <div class="corporation_license_upload">上传营业执照图片</div>
      </div>
      <div class="supplement_information_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">补充完毕，升级到公司店主</el-button>
      </div>
    </div>
  </div>
</template>

<style>
  .shopman_data{
    width: 100%;
    height: auto;
    overflow: hidden;
    text-align: center;
  }
  .shopman_data_title{
    width: 50%;
    margin: 0 auto;
    font-size: 16px;
    text-align: center;
    line-height: 32px;
    margin-top: 30px;
  }
  .shopman_data_title span{
    float: right;
    font-size: 14px;
  }
  .shopman_data1{
    border: 1px solid #303030;
    width: 80%;
    margin-left: 10%;
    height: auto;
    overflow: hidden;
    padding: 10px 0;
    margin-top: 30px;
  }
  .shopman_data1 li{
    width: 100%;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
  }
  .shopman_data1 li i{
    display: inline-block;
    float: left;
    width: 15%;
    text-align: left;
    margin-left: 27%;
  }
  .shopman_data1 li span{
    display: inline-block;
    float: right;
    width: 55%;
    text-align: left;
  }
  .shopman_data2{
    width: 80%;
    height: auto;
    overflow: hidden;
    margin-left: 10%;
    margin-top: 30px;
    border: 1px solid #303030;
    padding: 10px 0;
  }
  .data2_title{
    text-align: left;
    line-height: 28px;
    font-size: 14px;
    margin-top: 10px;
    font-weight: bold;padding-left: 27%;
  }
  .data2_name,.data2_id{
    width: 100%;
    height: 32px;
  }
  .data2_name i{
    width: 15%;
    margin-left: 27%;
    float: left;
    text-align: left;
  }
  .data2_name span{
    width: 55%;
    float: right;
    text-align: left;
  }
  .data2_id i{
    width: 15%;
    margin-left: 27%;
    float: left;
    text-align: left;
  }
  .data2_id span{
    width: 55%;
    float: right;
    text-align: left;
  }
  .data2_id_img{
    width: 100%;
    overflow: hidden;
  }
  .data2_id_img p{
    margin-left: 27%;
    height: 32px;
    line-height: 32px;
    text-align: left;
  }
  .positive_img,.opposite_img{
    width: 200px;
    min-height: 100px;
    border: 1px solid #dddddd;
    background: #cccccc;
    float: left;
    margin-top: 10px;
  }
  .positive_img{
    margin-left: 27%;
    margin-right: 5%;
  }
  .zfbpay,.wxpay{
    width: 100%;
    height: 32px;
    line-height: 32px;
  }
  .zfbpay{
    margin-top: 20px;
  }
  .zfbpay i{
    font-size: 14px;
    width: 15%;
    margin-left: 27%;
    float: left;
  }
  .zfbpay span{
    font-size: 14px;
    width: 55%;
    float: right;
    text-align: left;
  }
  .wxpay i{
    font-size: 14px;
    width: 15%;
    margin-left: 27%;
    float: left;
  }
  .wxpay span{
    font-size: 14px;
    width: 55%;
    float: right;
    text-align: left;
  }
  .shopman_data3{
    width: 80%;
    height: auto;
    overflow: hidden;
    margin-left: 10%;
    padding: 10px 0;
    border: 1px solid #303030;
    margin-top: 30px;
  }
  .data3_title{
    text-align: left;
    line-height: 28px;
    font-size: 14px;
    margin-top: 10px;
    font-weight: bold;padding-left: 27%;
  }
  .data3_name,.data3_number{
    width: 100%;
    height: 32px;
    line-height: 32px;
  }
  .data3_name i{
    font-size: 14px;
    width: 15%;
    margin-left: 27%;
    float: left;
    text-align: left;
  }
  .data3_name span{
    font-size: 14px;
    width: 55%;
    float: right;
    text-align: left;
  }
  .data3_number i{
    font-size: 14px;
    width: 15%;
    margin-left: 27%;
    float: left;
    text-align: left;
  }
  .data3_number span{
    font-size: 14px;
    width: 55%;
    float: right;
    text-align: left;
  }
  .data3_license_title{
    margin-left: 27%;
    line-height: 32px;
    text-align: left;
  }
  .data3_license_img{
    width: 200px;
    min-height: 100px;
    border: 1px solid #DDDDDD;
    background: #cccccc;
    margin-left: 27%;
  }
  .operation_btn{
    margin-top: 30px;
  }
  .supplement_information_title{
    font-size: 16px;
    line-height: ;
  }
  .corporate_name,
  .company_number,
  .corporation_license
  {
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }
  .corporate_name_title,
  .company_number_title,
  .corporation_license_title
  {
    float: left;
    line-height: 36px;
  }
  .corporate_name .el-input,
  .company_number .el-input
  {
    width: 70%;
    float: right;
  }
  .corporation_license_upload{
    width: 70%;
    height: 150px;
    background: #DDDDDD;
    margin-top: 10px;
    line-height: 150px;
    color: #FFFFFF;
    float: right;
  }
  .supplement_information_btn{
    margin: 0 auto;
    margin-top: 40px;
  }
  .supplement_information_btn .el-button:nth-child(1){
    float: left;
    margin-left: 20%;
  }
  .supplement_information_btn .el-button:nth-child(2){
    float: right;
    margin-right:10%;
  }
</style>

<script>
  export default{
    methods: {
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.supplement_information').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.supplement_information').css('display','none');
      }
    }
  }
</script>
