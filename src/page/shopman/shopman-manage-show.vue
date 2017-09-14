<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ShopmanManage'}">店主管理</el-breadcrumb-item>
        <el-breadcrumb-item>店主资料</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="shopman_data" v-bind="shopmanManage">
        <p class="shopman_data_title">团队资料<span>所属团队：无</span></p>
        <ul class="shopman_data1">
          <li><i>账号：</i><span>{{shopmanManage.account}}</span></li>
          <li><i>昵称：</i><span>{{shopmanManage.alipay}}</span></li>
          <li><i>注册时间：</i><span>{{shopmanManage.createOn}}</span></li>
          <li><i>店主级别：</i><span>{{stataFilter(shopmanManage.level)}}</span></li>
          <li><i>升级到公司店主时间：</i><span>{{shopmanManage.loginTime}}</span></li>
          <li><i>所属团队：</i><span></span></li>
          <li><i>累计销售金：</i><span>￥{{shopmanManage.sumPrice}}</span></li>
          <li><i>上月销售金：</i><span>￥{{shopmanManage.lastMonthMoney}}</span></li>
          <li><i>累计所得奖励：</i><span>{{shopmanManage.sumBonus}}</span></li>
          <li><i>上月所得奖励：</i><span>{{shopmanManage.lastMonthBonus}}</span></li>
        </ul>

        <div class="shopman_data2">
          <div class="data2_title">个人店主资料</div>
          <div class="data2_name"><i>真实姓名：</i><span>{{shopmanManage.realName}}</span></div>
          <div class="data2_id"><i>身份证号：</i><span>{{shopmanManage.idNumber}}</span></div>
          <div class="data2_id_img">
            <p>身份证照片</p>
            <div class="positive_img">
              <img :src="shopmanManage.idCardPhoto" alt="">
            </div>
            <div class="opposite_img">
              <img :src="shopmanManage.idCardPhotoF" alt="">
            </div>
          </div>
          <div class="zfbpay"><i>支付宝账号：</i><span>{{shopmanManage.alipay}}</span></div>
          <div class="wxpay"><i>微信支付账号：</i><span>{{shopmanManage.weChat}}</span></div>
        </div>


        <div class="operation_btn">
          <!--<el-button type="primary" size="small" @click="DisplayBlock">修改店主资料</el-button>-->
          <el-button type="primary" @click="DisplayBlock">升级到公司店主</el-button>
        </div>


      </div>
    </div>


    <div class="mask"></div>

    <div class="popup change_ticheng">
    <div class="popup_title">请补充下面的店主资料，将此人升级到公司店主<span style="font-weight:bold;" v-text="updataText"></span></div>
    <div class="popup_form">
    <div class="popup_form_title"></div>
      <p class="text_left">公司名称</p>
      <el-input placeholder="请填写公司名称" style="display:block;" v-model="companyName"></el-input>
      <p class="text_left">公司注册号</p>
      <el-input placeholder="请填写公司注册账号" style="display:block;" v-model="companyNum"></el-input>
      <p class="text_left">公司营业执照</p>
      <div style="width:85%;">
      <div style="height:200px;border:solid 1px #ccc;margin-left:70px;etxt-align:center;line-height:200px;
       font-size:20px;" @click="showPo">+请上传营业执照图片</div>
      <input type="file" style="display:none;" @change="selectChange" class="showfilePo">
        <div class="imgUrl" style="float:left;">
          <img :src="images" style="text-align:center;">
        </div>
      </div>



  </div>
    <div class="popup_btn">
    <el-button @click="DisplayNone">取消</el-button>
    <el-button type="primary" @click="updateYes">补充完毕，升级到公司店主</el-button>
    </div>
    </div>


  </div>
</template>


<script>
  import http from '../../http'

  export default {
    data() {
      return {
        shopmanManage: '',
        account: '',
        images:'',
        imgFiles:'',
        companyName:'',
        companyNum:'',
        pictureUrl:'',
        updataText:''
      }
    },
    created() {
      this.account = this.$route.params.account;
      this.showAccount()
    },
    methods: {
      showPo(){
        $('.showfilePo').click()
      },
      //上传营业执照
      selectChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files);
      },
      createImage(file) {
        if (typeof FileReader === 'undefined') {
          alert('您的浏览器不支持图片上传，请升级您的浏览器');
          return false;
        }
        console.log(file)
        let leng = file.length;
        let vm = this;

        for (let i = 0; i < leng; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            vm.images = e.target.result;
            vm.imgFiles = $('.showfilePo')[0].files[0];
          };
        }
      },
      updateYes(){
        let url=http.apiMap.modifyCompany;
        let formData = new FormData();
        formData.append('common', 1)
        formData.append('account', this.account)
        formData.append('companyName', this.companyName)
        formData.append('companyNum', this.companyNum)
        formData.append('pictureUrl', this.imgFiles)
        this.$http.post(url, formData).then(
          function (res) {
            if (res.body.result) {
              this.DisplayNone()
              this.$message({
                type: 'info',
                message: '添加成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '添加失败'
              })
            }
          }
        )
      },



      stataFilter(value) {
        if (value == 1) {
          return '个人店主'
        } else if (value == 2) {
          return '公司店主'
        } else if (value == 3) {
          return '高级店主'
        }
      },
      showAccount() {
        let url = http.apiMap.findOwnerMessage
        let data = {
          common: 1,
          account: this.account
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.user
              this.account = data.account
              this.shopmanManage = data
            }
          }
        )
      },
      DisplayBlock() {
//        this.updateData = this.tableData[index].invoiceType;
//        this.clickIndex = index;
        $('.mask').css('display', 'block');
        $('.change_ticheng').css('display', 'block');
      },
      DisplayNone() {
        $('.mask').css('display', 'none');
        $('.change_ticheng').css('display', 'none');
      },

    }
  }
</script>


<style>
  .shopman_data {
    width: 100%;
    height: auto;
    overflow: hidden;
    text-align: center;
  }

  .shopman_data_title {
    width: 50%;
    margin: 0 auto;
    font-size: 16px;
    text-align: center;
    line-height: 32px;
    margin-top: 30px;
  }

  .shopman_data_title span {
    float: right;
    font-size: 14px;
  }

  .shopman_data1 {
    border: 1px solid #303030;
    width: 80%;
    margin-left: 10%;
    height: auto;
    overflow: hidden;
    padding: 10px 0;
    margin-top: 30px;
  }

  .shopman_data1 li {
    width: 100%;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
  }
  .text_left{
    line-height:30px;
    font-size:15px;
    text-align:left;
    margin-left:75px;
  }
  .shopman_data1 li i {
    display: inline-block;
    float: left;
    width: 20%;
    text-align: left;
    margin-left: 20%;
  }

  .shopman_data1 li span {
    display: inline-block;
    float: right;
    width: 55%;
    text-align: left;
  }

  .shopman_data2 {
    width: 80%;
    height: auto;
    overflow: hidden;
    margin-left: 10%;
    margin-top: 30px;
    border: 1px solid #303030;
    padding: 10px 0;
  }

  .data2_title {
    text-align: left;
    line-height: 28px;
    font-size: 14px;
    margin-top: 10px;
    font-weight: bold;
    padding-left: 27%;
  }

  .data2_name, .data2_id {
    width: 100%;
    height: 32px;
  }

  .data2_name i {
    width: 15%;
    margin-left: 20%;
    float: left;
    text-align: left;
  }

  .data2_name span {
    width: 50%;
    float: left;
    text-align: left;
  }

  .data2_id i {
    width: 15%;
    margin-left: 27%;
    float: left;
    text-align: left;
  }

  .data2_id span {
    width: 55%;
    float: right;
    text-align: left;
  }

  .data2_id_img {
    width: 100%;
    overflow: hidden;
  }

  .data2_id_img p {
    margin-left: 27%;
    height: 32px;
    line-height: 32px;
    text-align: left;
  }

  .positive_img, .opposite_img {
    width: 200px;
    min-height: 100px;
    border: 1px solid #dddddd;
    background: #cccccc;
    float: left;
    margin-top: 10px;
  }

  .positive_img {
    margin-left: 27%;
    margin-right: 5%;
  }

  .zfbpay, .wxpay {
    width: 100%;
    height: 32px;
    line-height: 32px;
  }

  .zfbpay {
    margin-top: 20px;
  }

  .zfbpay i {
    font-size: 14px;
    width: 15%;
    margin-left: 27%;
    float: left;
  }

  .zfbpay span {
    font-size: 14px;
    width: 55%;
    float: right;
    text-align: left;
  }

  .wxpay i {
    font-size: 14px;
    width: 15%;
    margin-left: 27%;
    float: left;
  }

  .wxpay span {
    font-size: 14px;
    width: 55%;
    float: right;
    text-align: left;
  }

  .shopman_data3 {
    width: 80%;
    height: auto;
    overflow: hidden;
    margin-left: 10%;
    padding: 10px 0;
    border: 1px solid #303030;
    margin-top: 30px;
  }

  .data3_title {
    text-align: left;
    line-height: 28px;
    font-size: 14px;
    margin-top: 10px;
    font-weight: bold;
    padding-left: 27%;
  }

  .data3_name, .data3_number {
    width: 100%;
    height: 32px;
    line-height: 32px;
  }

  .data3_name i {
    font-size: 14px;
    width: 15%;
    margin-left: 27%;
    float: left;
    text-align: left;
  }

  .data3_name span {
    font-size: 14px;
    width: 55%;
    float: right;
    text-align: left;
  }

  .data3_number i {
    font-size: 14px;
    width: 15%;
    margin-left: 27%;
    float: left;
    text-align: left;
  }

  .data3_number span {
    font-size: 14px;
    width: 55%;
    float: right;
    text-align: left;
  }

  .data3_license_title {
    margin-left: 27%;
    line-height: 32px;
    text-align: left;
  }

  .data3_license_img {
    width: 200px;
    min-height: 100px;
    border: 1px solid #DDDDDD;
    background: #cccccc;
    margin-left: 27%;
  }

  .operation_btn {
    margin-top: 30px;
  }

  .supplement_information_title {
    font-size: 16px;
    line-height:;
  }

  .corporate_name,
  .company_number,
  .corporation_license {
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }

  .corporate_name_title,
  .company_number_title,
  .corporation_license_title {
    float: left;
    line-height: 36px;
  }

  .corporate_name .el-input,
  .company_number .el-input {
    width: 70%;
    float: right;
  }

  .corporation_license_upload {
    width: 70%;
    height: 150px;
    background: #DDDDDD;
    margin-top: 10px;
    line-height: 150px;
    color: #FFFFFF;
    float: right;
  }

  .supplement_information_btn {
    margin: 0 auto;
    margin-top: 40px;
  }

  .supplement_information_btn .el-button:nth-child(1) {
    float: left;
    margin-left: 20%;
  }

  .supplement_information_btn .el-button:nth-child(2) {
    float: right;
    margin-right: 10%;
  }
</style>
