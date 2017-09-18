<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统推荐商品</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="titlee" style="border:none;">系统推荐列表</div>
      <div style="margin-bottom: 20px;padding-bottom: 20px">
        <el-button type="success" @click="addOneShow">添加到商品详情</el-button>
        <el-button type="success" @click="addTwoShow">添加到图文详情</el-button>
      </div>

      <div class="boxx">
        <el-table
          :data="tableData"
          border>
          <el-table-column
            label="排序"
            prop="num">
          </el-table-column>
          <el-table-column
            prop="proName"
            label="商品">
          </el-table-column>
          <el-table-column
            prop="mode"
            label="推荐模式">
          </el-table-column>
          <el-table-column
            prop="createOn"
            label="添加时间">
          </el-table-column>
          <el-table-column

            label="操作">
            <template scope="scope">
              <el-button type="text" size="small" @click="Up(scope.row)" v-show="scope.row.num!=1">上移</el-button>
              <el-button type="text" size="small" @click="Down(scope.row)" v-show="scope.row.num!=DataLength">下移</el-button>
              <el-button type="text" size="small" @click="removeTop(scope.row)">置顶</el-button>
              <el-button type="text" size="small" @click="removeBottom(scope.row)">置底</el-button>
              <el-button type="text" size="small" @click="updataALl(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="deleteShop(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      <el-row>
        <el-col :span="24">
          <span style="padding-right: 20px">设置推荐页的链接到商品推荐（优品推荐）最多展示数量：</span>
          <el-input type="text" style="width: 10%"
                    v-model="pAmount"></el-input>
          <el-button type="primary" @click="updatapopAmount">确定</el-button>
        </el-col>
        <el-col :span="24">
          <span style="padding-right: 20px">设置推荐页的链接到图文推荐（人气爆款）最多展示数量：</span>
          <el-input type="text" style="width: 10%"
                    v-model="popAmount"></el-input>
          <el-button type="primary" @click="updatapopAmountpop">确定</el-button>
        </el-col>
      </el-row>
      <!--添加到商品详情弹窗-->
      <div class="leftshow popup">
        <div class="titlee">添加系统推荐-链接到商品详情（优品推荐）</div>
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
            <el-col :span="24">
              <span class="left" style="padding-right: 20px">商品标签</span>
              <div class="left">
                <div class="left aaa">
                  <span class="left">性别</span>
                  <div class="left" style="padding-left: 20px">
                    <div class="listshow" style=" ">
                      <input type="radio" id="jack" value="m" v-model="sex">
                      <label for="jack">男</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="john" value="w" v-model="sex">
                      <label for="john">女</label>
                    </div>
                  </div>
                </div>
                <div class="left aaa">
                  <span class="left">年龄</span>
                  <div class="left" style="padding-left: 20px">
                    <div class="listshow" style=" ">
                      <input type="radio" id="60" value="60" v-model="age">
                      <label for="60">60后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="70" value="70" v-model="age">
                      <label for="70">70后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="80" value="80" v-model="age">
                      <label for="80">80后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="90" value="90" v-model="age">
                      <label for="90">90后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="00" value="00" v-model="age">
                      <label for="00">00后</label>
                    </div>
                  </div>
                </div>
                <div class="left aaa">
                  <span class="left">兴趣</span>
                  <div class="left" style="padding-left: 20px">
                    <div class="listshow" v-for="i in TagList">
                      <input type="checkbox" :id="i.id" :value="i.id" v-model="interest">
                      <label :for="i.id">{{i.interest}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-button type="primary" @click="open2">添加</el-button>
          <el-button type="" @click="addOneHide">取消</el-button>

        </div>
      </div>

      <!--添加到图文详情弹窗-->
      <div class="rightshow popup">
        <div class="titlee">添加系统推荐-链接到图文详情（人气爆款）</div>
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
                        v-model="picName"></el-input>
              <el-button type="primary" class="" @click="selectShowTwo">查询</el-button>
            </el-col>
            <el-col :span="24">
              <span class="left" style="padding-right: 20px">推荐页展示图片</span>
              <form name="imgForm" id="picimgForm" enctype="multipart/form-data" action="" method='post'
                    style="float: left;">
                <div class="labe el-icon-plus" @click="piclabe"></div>
                <input class="input-loc-img picimgLocal" name="pictureUrl" type='file' accept="image/*"
                       @change="picselectChange"/>
              </form>
              <div class="imgurl">
                <img :src="picimages" alt="">
              </div>
            </el-col>
            <el-col :span="24">
              <span class="left" style="padding-right: 20px">商品标签</span>
              <div class="left">
                <div class="right aaa">
                  <span class="left">性别</span>
                  <div class="left" style="padding-left: 20px">
                    <div class="listshow" style=" ">
                      <input type="radio" id="jackpic" value="m" v-model="picsex">
                      <label for="jackpic">男</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="johnpic" value="w" v-model="picsex">
                      <label for="johnpic">女</label>
                    </div>
                  </div>
                </div>
                <div class="right aaa">
                  <span class="left">年龄</span>
                  <div class="left" style="padding-left: 20px">
                    <div class="listshow" style=" ">
                      <input type="radio" id="pic60" value="60" v-model="picage">
                      <label for="pic60">60后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="pic70" value="70" v-model="picage">
                      <label for="pic70">70后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="pic80" value="80" v-model="picage">
                      <label for="pic80">80后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="pic90" value="90" v-model="picage">
                      <label for="pic90">90后</label>
                    </div>
                    <div class="listshow">
                      <input type="radio" id="pic00" value="00" v-model="picage">
                      <label for="pic00">00后</label>
                    </div>
                  </div>
                </div>
                <div class="right aaa">
                  <span class="left">兴趣</span>
                  <div class="left" style="padding-left: 20px">
                    <div class="listshow" v-for="i in TagList">
                      <input type="checkbox" :id="i.id+123" :value="i.id" v-model="picinterest">
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

          <el-button type="primary" @click="addpic">添加</el-button>
          <el-button @click="addTwoHide">取消</el-button>

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
        selectData: [],
        images: '',
        imgFiles: '',
        id: '',
        sex: '',
        age: '',
        interest: [],
        TagList: [],
        //图文推荐
        title: '',
        picName: '',
        flag: '',
        picid: '',
        picimages: '',
        picimgFiles: '',
        picsex: '',
        picage: '',
        picinterest: [],

        popAmount: '',
        pAmount: '',

        content: '',
        editorOption: {},
        DataLength:''
      }
    },
    created() {
      this.findProList()
      this.findTagList()
      this.findProductNum()
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
      //查询推荐数量
      findProductNum() {
        let url = http.apiMap.findProductNum;
        let data = {
          common: 1,
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.popAmount = res.body.data.popAmount;
              this.pAmount = res.body.data.pAmount;
            }
          }
        )
      },
      //修改图文推荐数量
      updatapopAmount() {
        let url = http.apiMap.updataProductNum;
        let data = {
          common: 1,
          amount: this.pAmount
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.findProductNum()
            }else {
              this.$message({
                type: 'error',
                message: '修改失败'
              });
            }
          }
        )
      },
      //修改商品详情数量
      updatapopAmountpop() {
        let url = http.apiMap.updataProductNumpop;
        let data = {
          common: 1,
          amount: this.popAmount
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.findProductNum()
            }else {
              this.$message({
                type: 'error',
                message: '修改失败'
              });
            }
          }
        )
      },
      findProList() {
        let url = http.apiMap.findProductList;
        let data = {
          common: 2,
          size: 10,
          nowpage: this.currentPage
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11 = res.body.data.count;
              let data = res.body.data.list;
              let arr = [];
              let num = 0;
              for (let i = 0; i < data.length; i++) {
                if (data[i].mode == 1) {
                  data[i].mode = '图文推荐'
                } else {
                  data[i].mode = '商品推荐'
                }
                num += 1;
                data[i].num = num;
                arr.push(data[i])
              }
              this.tableData = arr;
              this.DataLength = arr[arr.length - 1].num;

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
      //添加到商品推荐
      open2() {
        this.$confirm('此操作将添加此商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let url = http.apiMap.addInterestRecommend;
          let formData = new FormData();//通过formdata上传
          formData.append('pictureUrl', this.imgFiles);
          formData.append('proName', this.name);
          formData.append('mode', 0);
          formData.append('proId', this.id);
          formData.append('sex', this.sex);
          formData.append('age', this.age);
          formData.append('interest', this.interest);
          formData.append('common', 1);
          this.$http.post(url, formData).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.findProList()
                this.addOneHide()
                this.name = '';
                this.sex = '';
                this.age = '';
                this.interest = [];
                this.images = '';
                this.imgFiles = '';
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
            message: '已取消添加'
          });
        });
      },
      //添加右边图文详情
      addpic() {
        this.$confirm('此操作将添加此商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let url = http.apiMap.addInterestRecommend;
          let formData = new FormData();//通过formdata上传
          formData.append('pictureUrl', this.picimgFiles);
          formData.append('proName', this.picName);
          formData.append('title', this.title);
          formData.append('mode', 1);
          formData.append('proId', this.picid);
          formData.append('sex', this.picsex);
          formData.append('age', this.picage);
          formData.append('interest', this.picinterest);
          formData.append('introduce', this.content);
          formData.append('common', 1);
          this.$http.post(url, formData).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.findProList()
                this.addTwoHide()
                this.picname = '';
                this.picsex = '';
                this.picage = '';
                this.picinterest = [];
                this.picimages = '';
                this.picimgFiles = '';
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
            message: '已取消添加'
          });
        });
      },
      //上移
      Up(row) {
        var nowID = row.id;
        var nowNumber = row.number;
        var table = this.tableData;
        var FrontID;
        var FrontNumber;
        for (var i = 0; i < table.length; i++) {
          if (table[i].id == nowID) {
            FrontID = table[i - 1].id;
            FrontNumber = table[i - 1].number;
          }
        }
        var arr = [{'id': nowID, 'number':  FrontNumber}, {'id': FrontID, 'number':  nowNumber}];
        var data = {'list': JSON.stringify(arr), 'common': this.GLOBAL.common};
        let url = http.apiMap.moveSystemxing;
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.findProList();
            }
          }
        );
      },
      //下移
      Down(row) {
        let nowID = row.id;
        let nowNumber = row.number;
        let table = this.tableData;
        let FrontID;
        let FrontNumber;
        for (let i = 0; i < table.length; i++) {
          if (table[i].id == nowID) {
            FrontID = table[i + 1].id;
            FrontNumber = table[i + 1].number;
          }
        }
        let arr = [{'id': nowID, 'number':  FrontNumber}, {'id': FrontID, 'number':  nowNumber}];
        let data = {'list': JSON.stringify(arr), 'common': this.GLOBAL.common};
        let url = http.apiMap.moveSystemxing;
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.findProList();
            }
          }
        );
      },
      deleteShop(row) {
        this.$confirm('此操作将删除该推荐商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = http.apiMap.deleteProductList;
          let data = {
            common: 1,
            id: row.id
          };
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.findProList()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  type: 'info',
                  message: res.body.msg
                });
              }
            }
          )

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //修改商品推荐
      updataALl(row) {
        if (row.mode == '商品推荐') {
          this.$router.push('/updatashop/' + row.id);
        }else {
          this.$router.push('/updatashoppic/' + row.id);
        }
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
        $('.mask').show()
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
          nowpage: this.currentPage22
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
          nowpage: this.currentPage22
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
        this.currentPage22 = val;
        if(this.flag = 1){
          this.selectShowOne()
        }else {
          this.selectShowTwo()
        }
      },
      labe() {
        $(".imgLocal").click()
      },
      piclabe() {
        $(".picimgLocal").click()
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
        for (let i = 0; i < leng; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            vm.images = e.target.result;
            vm.imgFiles = $('.imgLocal')[0].files[0];

          };
        }
      },
      picselectChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.piccreateImage(files);
      },
      piccreateImage(file) {
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
            vm.picimages = e.target.result;
            vm.picimgFiles = $('.picimgLocal')[0].files[0];

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

  .leftshow {
    display: none;
  }
  .editer{
    width:500px;
    margin-bottom: 40px;
  }
  .popup {
    height:500px;
  }
</style>
