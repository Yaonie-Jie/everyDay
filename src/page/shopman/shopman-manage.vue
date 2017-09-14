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
            <select name="" id="shopManState" v-model="teamState">
              <option  v-for="option in options" v-bind:value="option.value">{{option.text}}</option>
            </select>

            <input type="text" placeholder="输入账号查找店主" style="padding:0 10px;" v-model="account"/>
            <el-button type="success" @click="checkShopman">查找</el-button>
          </div>
        </div>

        <div class="apply_form">
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="createOn"
              label="何时升级到此级别店主">
            </el-table-column>
            <el-table-column
              prop="level"
              label="店主级别">
            </el-table-column>
            <el-table-column
              prop="account"
              label="账号">
            </el-table-column>
            <el-table-column
              prop="account"
              label="所属团队--团长账号">
            </el-table-column>
            <el-table-column
              prop="totalMoney"
              label="累计销售金额">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template scope="scope">
                <el-button type="text" size="small" @click="shows(scope.row.account,scope.row.level)">查看</el-button>
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
        <el-input placeholder="请输入一个账号" v-model="shopmanAccount"></el-input>
      </div>
      <div class="add_level">
        <div class="add_level_title" style="display:block;">分配级别</div>
        <select id="tLevel" v-model="teLevel" style="width:75%;height:36px;float:right;">
          <option value="1" style="display:block;height:36px;font-size:16px;line-height:36px;">个人店主</option>
          <option value="2" style="display:block;height:36px;font-size:16px;line-height:36px;">公司店主</option>
          <option value="3" style="display:block;height:36px;font-size:16px;line-height:36px;">高级店主</option>
        </select>
      </div>


      <!--个人店主-->
      <div class="required_" style="width:100%;">添加个人店主</div>
      <h2 style="float:left;margin-left:20%;margin-top:10px;margin-bottom:10px;">必填个人店主资料</h2>
      <div class="true_name">
        <div class="true_name_title">真实姓名</div>
        <el-input placeholder="请填写真实姓名" v-model="relName"></el-input>
      </div>
      <div class="id_num">
        <div class="id_num_title">身份证号</div>
        <el-input placeholder="请填写身份证号" v-model="idNumber"></el-input>
      </div>
      <div class="id_img_title">身份证照片</div>

      <!--正面-->
      <div class="id_img_upload">
        <div @click="postPho" class="showPho">+请上传身份证正面图片</div>
        <input type="file" class="postFilepho" @change="selectChange">
        <div class="imgUrl" style="float:right;">
          <img :src="images" style="text-align:center;">
        </div>
      </div>

      <!--反面-->
      <div class="id_img_upload">
        <div @click="postPhof" class="showPho">+请上传身份证反面图片</div>
        <input type="file" class="postFilephof" @change="selectChangef" style="display:none;">
        <div class="imgUrl" style="float:right;">
          <img :src="imagesf" style="text-align:center;">
        </div>
      </div>

      <hr >
      <h2 style="float:left;margin-left:20%;margin-top:10px;margin-bottom:10px;">选填个人店主资料</h2>
      <div class="zfb_account">
        <div class="zfb_account_title">支付宝账号</div>
        <el-input placeholder="请填写支付宝账号" v-model="alipay"></el-input>
      </div>
      <div class="wx_account">
        <div class="wx_account_title">微信支付账号</div>
        <el-input placeholder="请填写微信支付账号" v-model="weChat"></el-input>
      </div>

      <div v-show="teLevel==2 || teLevel==3">
      <!--公司店主-->
      <hr >
      <h2 style="float:left;margin-left:20%;margin-top:10px;margin-bottom:10px;">必填公司店主资料</h2>
      <div class="true_name">
        <div class="true_name_title">公司名称</div>
        <el-input placeholder="请填写公司名称" v-model="comName"></el-input>
      </div>
      <div class="id_num">
        <div class="id_num_title">公司注册号</div>
        <el-input placeholder="请填写公司注册号" v-model="comNumber"></el-input>
      </div>
      <div class="id_img_title">公司营业执照</div>
      <!--公司营业执照-->
      <div class="id_img_upload">
        <div @click="postPhofs" class="showPho phof">+请上传公司营业执照</div>
        <input type="file" class="postFilephofs" @change="selectChangefs" style="display:none;">
        <div class="imgUrl" style="float:right;">
          <img :src="imagesfs" style="text-align:center;">
        </div>
      </div>
      </div>

      <div class="add_shopman_btns">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="addShopman">添加</el-button>
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
        tableData: [],
        modifyMessage: "升级到公司店主",
        teamState: '',
        shopmanMessage: {},
        currentPage: 1,
        count11: 1,
        options: [
          {text: '全部', value: ''},
          {text: '有团队店主', value: '1'},
          {text: '无团队店主', value: '2'}
        ],
        account: '',
        relName: '', //真实姓名
        shopmanAccount: '',//账号
        idNumber: '',//身份证号码
        alipay: '',//支付宝
        weChat: '',//微信
        images: '',
        imgFiles: '',
        imagesf: '',
        imgFilesf: '',
        imagesfs: '',
        imgFilesfs: '',
        teLevel:'',
        comName:'',
        comNumber:''
      }
    },

    created() {
      this.getData()
    },
    methods: {
      //添加身份证正面
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
        let vm = this;
        let leng = file.length;
        for (let i = 0; i < leng; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            vm.images = e.target.result;
            vm.imgFiles = $('.postFilepho')[0].files[0];
          };
        }
      },

      //添加身份证反面
      selectChangef(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImagef(files);
      },
      createImagef(file) {
        if (typeof FileReader === 'undefined') {
          alert('您的浏览器不支持图片上传，请升级您的浏览器');
          return false;
        }
        let vm = this;
        let leng = file.length;
        for (let i = 0; i < leng; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            vm.imagesf = e.target.result;
            vm.imgFilesf = $('.postFilephof')[0].files[0];
          };
        }
      },

      //添加公司营业执照
      selectChangefs(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImagefs(files);
      },
      createImagefs(file) {
        if (typeof FileReader === 'undefined') {
          alert('您的浏览器不支持图片上传，请升级您的浏览器');
          return false;
        }
        let vm = this;
        let leng = file.length;
        for (let i = 0; i < leng; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            vm.imagesfs = e.target.result;
            vm.imgFilesfs = $('.postFilephofs')[0].files[0];
          };
        }
      },


      postPho() {
        $(".postFilepho").click()
      },
      postPhof() {
        $(".postFilephof").click()
      },
      postPhofs() {
        $(".postFilephofs").click()
      },
      //查看
      shows: function (account, level) {
        if (level == '个人店主') {
          this.$router.push('/ShopmanManageShow/' + account);
        } else if (level == '公司店主') {
          this.$router.push('/ShopmanManageShow1/' + account);
        } else if (level == '高级店主') {
          this.$router.push('/ShopmanManageShow2/' + account);
        }
      },


      getData() {
        let url = http.apiMap.OwnerShopmanData;
        let data = {
          common: 1,
          size: 10,
          nowpage: this.currentPage,
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11=res.body.data.count
              //店主级别
              let data1 = res.body.data.userVoList
              let arr = [];
              for (let i = 0; i < data1.length; i++) {
                if (data1[i].level == 1) {
                  data1[i].level = '个人店主'
                } else if (data1[i].level == 2) {
                  data1[i].level = '公司店主'
                } else if (data1[i].level == 3) {
                  data1[i].level = '高级店主'
                }
                arr.push(data1[i])
              }
              this.tableData = arr
            }
          })
      },


      DisplayBlock () {
        $('.mask').css('display', 'block');
        $('.add_shopman').css('display', 'block');
      },

      DisplayNone () {
        $('.mask').css('display', 'none');
        $('.add_shopman').css('display', 'none');
      },


      checkShopman() {
        let url = http.apiMap.findShopmanData
        let data = {
          common: 2,
          account: this.account,
          teamState: $("#shopManState :selected").attr('value'),
          size: 10,
          nowpage: this.currentPage,
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.userVO
              this.count11=res.body.data.count
              //店主级别
              let arr = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].level == 1) {
                  data[i].level = '个人店主'
                } else if (data[i].level == 2) {
                  data[i].level = '公司店主'
                } else if (data[i].level == 3) {
                  data[i].level = '高级店主'
                }
                arr.push(data[i])
              }
              this.tableData = arr

            }
          }
        )
      },

      addShopman() {
        console.log(this.imgFiles)
        let url = http.apiMap.addShopman;
        let formData = new FormData();
        formData.append('common', 1)
        formData.append('account', this.shopmanAccount)
        formData.append('level', this.teLevel)
        formData.append('realName', this.relName)
        formData.append('idNumber', this.idNumber)
        formData.append('pictureUrl', this.imgFiles)
        formData.append('pictureUrl1', this.imgFilesf)
        formData.append('pictureUrl2', this.imgFilesfs)
        formData.append('alipay', this.alipay)
        formData.append('weChat', this.weChat)
        formData.append('companyName', this.comName)
        formData.append('companyNum', this.comNumber)
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

      //分页跳转
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData()  //页面 加载数据
      },
    },

  }


</script>


<style>
  .apply_form {
    margin-top: 20px;
  }

  .add_shopman_account,
  .true_name,
  .id_num,
  .zfb_account,
  .wx_account {
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
  .wx_account_title {
    width: 25%;
    float: left;
    line-height: 36px;
    text-align: left;
  }

  .add_shopman_account .el-input,
  .true_name .el-input,
  .id_num .el-input,
  .zfb_account .el-input,
  .wx_account .el-input {
    float: right;
    width: 75%;
  }

  .add_level {
    width: 60%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }

  .add_level .el-select {
    width: 75%;
    float: right;
  }

  .add_s_title {
    width: 100%;
    margin: 30px 0 0 0;
  }

  .required_, .optional_ {
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

  .id_img_title {
    margin-left: 20%;
    line-height: 36px;
    text-align: left;
    margin-top: 30px;
  }

  .id_img_upload {
    width: 60%;
    overflow: hidden;
    margin: 0 auto;
  }

  /*.id_img_upload div{*/
  /*width: 150px;*/
  /*height: 80px;*/
  /*border:dotted 5px #aaa;*/
  /*float:left;*/
  /*margin:30px;*/
  /*z-index:0;*/
  /*text-align: center;*/
  /*line-height: 80px;*/
  /*color: #FFFFFF;*/
  /*}*/
  .showPho {
    width: 150px;
    height: 80px;
    border: solid 3px #ccc;
    float: left;
    margin: 10px;
    text-align: center;
    line-height: 80px;
    color: #000;
  }
  .phof {
    width: 150px;
    height: 80px;
    border: solid 3px #ccc;
    margin-top: 20px;
  }
  .postFilepho {
    display: none;
  }

  .id_img_upload div:nth-child(1) {
    float: left;
  }

  .id_img_upload div:nth-child(2) {
    float: right;
  }

  .add_shopman_btns {
    margin: 0 auto;
    margin-top: 40px;
  }

  .add_shopman_btns .el-button:nth-child(1) {
    float: left;
    margin-left: 25%;
  }

  .add_shopman_btns .el-button:nth-child(2) {
    float: right;
    margin-right: 25%;
  }
</style>
