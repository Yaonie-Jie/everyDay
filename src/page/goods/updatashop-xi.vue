<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改推荐商品</el-breadcrumb-item>
      </el-breadcrumb>


      <!--添加到商品详情弹窗-->
      <div class="leftshow">
        <div class="titlee">修改系统推荐-链接到商品详情</div>
        <div class="show-shop">
          <el-row>
            <el-col :span="24" style="text-align: left">
              <span style="padding-right: 20px">链接商品</span>
              <el-input type="text" style="width: 50%" auto-complete="off" placeholder="输入商品名称查找商品"
                        v-model="name"></el-input>
              <el-button type="primary" @click="selectShowOne">查询</el-button>
            </el-col>
            <el-col :span="24">
              <span class="left" style="padding-right: 20px">推荐页展示图片</span>
              <form name="imgForm" id="imgForm" enctype="multipart/form-data" action="" method='post'>
                <div class="labe el-icon-plus" @click="labe"></div>
                <input class="input-loc-img imgLocal" name="pictureUrl" type='file' accept="image/*"
                       @change="selectChange"/>
              </form>
              <div class="imgurl">
                <img :src="images" alt="">
              </div>
            </el-col>
          </el-row>
          <div style="text-align: center">
            <el-button type="primary" @click="open2">修改</el-button>
          </div>
        </div>
      </div>


    </div>
    <div class="popup change_left">
      <div class="popup_title">商品列表</div>

      <el-table
        :data="selectData"
        border>
        <el-table-column
          label="商品名称"
          prop="name">
        </el-table-column>
        <el-table-column
          :span='5'
          label="操作">
          <template scope="scope">
            <el-button type="teprimaryxt" size="small" @click="select(scope.row)">选择</el-button>
            <span></span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="height: 50px;">
        <el-pagination
          @current-change="handleCurrentChange22"
          :current-page.sync="currentPage22"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="count22">
        </el-pagination>
      </div>
      <div class="popup_btn">
        <el-button @click="selectNoneOne">取消</el-button>
      </div>
    </div>
    <div class="mask"></div>

  </div>
</template>


<script>
  import http from '../../http'

  export default {
    data() {
      return {
        tableData: [],
        count11: 1,
        count22: 1,
        currentPage: 1,
        currentPage22: 1,
        name: '',
        selectData: [],
        images: '',
        imgFiles: '',
        id: '',
      }
    },
    created() {

      this.ids = this.$route.params.id;
      this.findProList()
    },
    methods: {

      addOneShow() {
        $(".leftshow").show();
        $(".mask").show();
      },
      addTwoShow() {
        $(".rightshow").show();
        $(".mask").show();
      },
      addTwoHide() {
        $(".rightshow").hide();
        $(".mask").hide();
      },
      removeBottom(row) {
        let url = http.apiMap.InterestRecommendBottom;
        let data = {
          common: 1,
          number: row.number
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.findProList()
            }
          }
        )
      },
      removeTop(row) {
        let url = http.apiMap.InterestRecommendTop;
        let data = {
          common: 1,
          number: row.number,
          id: row.id
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.findProList()
            }
          }
        )
      },

      findProList() {
        let url = http.apiMap.findSystemRecommendById;
        let data = {
          common: 1,
          id: this.ids,
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.systemRecommend
              this.name = data.proName;
              this.images = data.proPicture;
              this.id = data.proId
            }
          }
        )
      },
      //修改到商品推荐
      open2() {
        this.$confirm('此操作将修改此商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let url = http.apiMap.updataSystemRecommend;
          let formData = new FormData();//通过formdata上传
          formData.append('pictureUrl', this.imgFiles);
          formData.append('proName', this.name);
          formData.append('id', this.ids);
          formData.append('proId', this.id);
          formData.append('common', 1);
          this.$http.post(url, formData).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.$router.push('/RecommendGoods/');
              } else {
                this.$message({
                  type: 'warning',
                  message: res.body.msg
                });
              }
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      },


      DisplayNone() {
        $('.mask').css('display', 'none');
        $('.leftshow').css('display', 'none');
      },
      select(row) {
        if (this.flag == 1) {
          this.name = row.name;
          this.id = row.id;
        } else if (this.flag == 2) {
          this.picName = row.name;
          this.picid = row.id;
        }
        this.selectNoneOne()
      },

      selectNoneOne() {
        $('.mask').hide()
        $('.change_left').css('display', 'none');
      },
      selectShowOne() {
        this.flag = 1
        $('.mask').css('display', 'block');
        $('.change_left').css('display', 'block');
        let url = http.apiMap.findShop;
        let data = {
          common: 2,
          size: 10,
          name: this.name,
          typeId: -1,
          nowpage: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count22 = res.body.data.count;
              this.selectData = res.body.data.productList
            }
          }
        )
      },
      selectShowTwo() {
        this.flag = 2
        $('.mask').css('display', 'block');
        $('.change_left').css('display', 'block');
        let url = http.apiMap.findShop;
        let data = {
          common: 2,
          size: 10,
          name: this.picName,
          typeId: -1,
          nowpage: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count22 = res.body.data.count;
              this.selectData = res.body.data.productList
            }
          }
        )
      },

      //分页跳转
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findProList()
      },
      //xiao分页跳转
      handleCurrentChange22(val) {
        this.currentPage = val;
        this.selectShowOne()
      },
      labe() {
        $(".imgLocal").click()
      },
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
        let arr = []
        for (let i = 0; i < leng; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            vm.images = e.target.result;
            vm.imgFiles = $('.imgLocal')[0].files[0];

          };
        }
      },

    }
  }
</script>


<style scoped="scoped">
  .show-img {
    border-top: 1px solid #838383;
    max-width: 800px;
    margin: 50px auto 0;
    display: flex;
  }

  .show-img li {
    width: 50%;
    float: left;
    border-right: 1px solid #838383;
    border-bottom: 1px solid #838383;
  }

  .show-img li:nth-child(2) {
    border-right: 0;
  }

  .demo-ruleForm {
    margin: 30px 0 !important;
  }

  .picimgLocal {
    display: none;
  }

  .show-shop {
    padding-top: 30px;
  }

  .popup_btn {
    width: 100px;
  }

  .el-col-24 {
    padding: 20px 0;
  }

  .aaa {
    padding-top: 20px;
    width: 80%;
  }

  .listshow {
    border: none;
  }

  .leftshow {
    display: block;
  }

  .popup {
    height: 500px;
  }
</style>
