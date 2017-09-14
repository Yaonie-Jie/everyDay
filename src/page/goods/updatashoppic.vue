<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改推荐商品</el-breadcrumb-item>
      </el-breadcrumb>


      <div class="rightshow">
        <div class="titlee">修改兴趣推荐-链接到图文详情（人气爆款）</div>
        <div class="show-shop">
          <el-row>
            <el-col :span="24" style="text-align: left">
              <span style="padding-right: 50px">标题</span>
              <el-input type="text" style="width: 50%"
                        v-model="title"></el-input>
            </el-col>
            <el-col :span="24" style="text-align: left">
              <span style="padding-right: 20px">链接商品</span>
              <el-input type="text" style="width: 50%" class=""
                        v-model="name"></el-input>
              <el-button type="primary" class="" @click="selectShowTwo">查询</el-button>
            </el-col>
            <el-col :span="24">
              <span class="left" style="padding-right: 20px">推荐页展示图片</span>
              <form name="imgForm" id="picimgForm" enctype="multipart/form-data" action="" method='post'
                    style="float: left;">
                <div class="labe el-icon-plus" @click="labe"></div>
                <input class="input-loc-img picimgLocal" name="pictureUrl" type='file' accept="image/*"
                       @change="selectChange"/>
              </form>
              <div class="imgurl">
                <img :src="images" alt="">
              </div>
            </el-col>
            <el-col :span="24">
              <span class="left" style="padding-right: 20px">商品标签</span>
              <div class="left">
                <div class="right aaa">
                  <span class="left">性别</span>
                  <div class="left" style="padding-left: 20px">
                    <div class="listshow" style=" ">
                      <input type="radio" id="jackpic" value="m" v-model="sex">
                      <label for="jackpic">男</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="johnpic" value="w" v-model="sex">
                      <label for="johnpic">女</label>
                    </div>
                  </div>
                </div>
                <div class="right aaa">
                  <span class="left">年龄</span>
                  <div class="left" style="padding-left: 20px">
                    <div class="listshow" style=" ">
                      <input type="radio" id="pic60" value="60" v-model="age">
                      <label for="pic60">60后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="pic70" value="70" v-model="age">
                      <label for="pic70">70后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="pic80" value="80" v-model="age">
                      <label for="pic80">80后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="pic90" value="90" v-model="age">
                      <label for="pic90">90后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="pic00" value="00" v-model="age">
                      <label for="pic00">00后</label>
                    </div>
                  </div>
                </div>
                <div class="right aaa">
                  <span class="left">兴趣</span>
                  <div class="left" style="padding-left: 20px">
                    <div class="listshow" v-for="i in TagList">
                      <input type="checkbox" :id="i.id+123" :value="i.id" v-model="interest">
                      <label :for="i.id+123">{{i.interest}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <span class="left" style="padding-right: 20px">图文详情</span>
              <div class="left">
                <div class="edit_container">
                  <quill-editor v-model="content"
                                ref="myQuillEditor"
                                class="editer"
                                :options="editorOption"
                                @ready="onEditorReady($event)">
                  </quill-editor>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-button type="primary" @click="open2">修改</el-button>

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
  import {quillEditor} from 'vue-quill-editor'

  export default {
    components: {
      quillEditor,
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    data() {
      return {
        tableData: [],
        count11: 1,
        count22: 1,
        currentPage: 1,
        currentPage22: 1,
        name: '',
        title:'',
        selectData: [],
        images: '',
        imgFiles: '',
        id: '',
        sex: '',
        age: '',
        interest: [],
        TagList: [],
        ids: '',

        content: '',
        editorOption: {},
      }
    },
    created() {
      this.ids = this.$route.params.id;
      this.findTagList()
      this.findProList()
    },
    methods: {
      addOneShow() {
        $(".leftshow").show();
        $(".mask").show();
      },
      addOneHide() {
        $(".leftshow").hide();
        $(".mask").hide();
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
        let url = http.apiMap.findInterestRecommendById;
        let data = {
          common: 1,
          id: this.ids,
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.interestRecommend
              this.name = data.proName;
              this.images = data.proPicture;
              this.sex = data.sex;
              this.age = data.age;
              this.interest = data.interest.split(',');
              this.id = data.proId;
              this.title=data.title;
              this.content=data.introduce
            }
          }
        )
      },
      findTagList() {
        let url = http.apiMap.findTagList;
        let data = {
          common: 2,
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.TagList = res.body.data.list;
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
          let url = http.apiMap.updataInterestRecommend;
          let formData = new FormData();//通过formdata上传
          formData.append('pictureUrl', this.imgFiles);
          formData.append('proName', this.name);
          formData.append('id', this.ids);
          formData.append('proId', this.id);
          formData.append('sex', this.sex);
          formData.append('age', this.age);
          formData.append('interest', this.interest);
          formData.append('title', this.title);
          formData.append('introduce', this.content);
          formData.append('common', 1);
          this.$http.post(url, formData).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.$router.push('/RecommendGoodsLike/');
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
      onEditorReady(editor) {
//        console.log('editor ready!', editor)
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

  .rightshow {
    display: block;
  }
  .editer{
    width:500px;
    margin-bottom: 40px;
  }
  .popup {
    height: 500px;
  }
</style>
