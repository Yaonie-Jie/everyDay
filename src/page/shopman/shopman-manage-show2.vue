<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item>店主资料</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="shopman_data" v-bind="shopmanManage">
        <p class="shopman_data_title">团队资料<span>所属团队：{{shopmanManage.headAccount}}</span></p>
        <ul class="shopman_data1" >
          <li><i>账号：</i><span>{{shopmanManage.account}}</span></li>
          <li><i>昵称：</i><span>{{shopmanManage.name}}</span></li>
          <li><i>注册时间：</i><span>{{shopmanManage.createOn}}</span></li>
          <li><i>店主级别：</i><span>{{shopmanManage.level}}</span></li>
          <li><i>升级到公司店主时间：</i><span>{{shopmanManage.modifiedOn}}</span></li>
          <li><i>所属团队：</i><span>{{shopmanManage.headAccount}}</span></li>
          <li><i>累计销售金：</i><span>￥{{shopmanManage.totalMoney/100}}</span></li>
          <li><i>上月销售金：</i><span>￥{{shopmanManage.lastMonthMoney/100}}</span></li>
          <li><i>累计所得奖励：</i><span>￥{{shopmanManage.sumBonus/100}}</span></li>
          <li><i>上月所得奖励：</i><span>￥{{shopmanManage.lastMonthBonus/100}}</span></li>
        </ul>

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
    width: 18%;
    text-align: left;
    margin-left: 27%;
  }
  .shopman_data1 li span{
    display: inline-block;
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
  import http from '../../http'
  export default{
    data(){
      return{
        shopmanManage:'',
        account:''
      }
    },
    created(){
      this.account = this.$route.params.account;
      this.showAccount()
    },
    methods: {
      showAccount(){
        let url=http.apiMap.findOwnerMessage
        let data={
          common:1,
          account:this.account
        };
        this.$http.post(url,data).then(
          function(res){
            if(res.body.result){
              let data=res.body.data.user;
              this.account=data.account;
              if(data.level == 1){
                  data.level='个人店主'
              }else if(data.level == 2){

              }else if(data.level == 3){
                data.level='高级店主'
              }
              if(data.headAccount == 0){
                data.headAccount ='暂无'
              }
              console.log(data)
              this.shopmanManage=data
            }
          }
        )
      },
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
