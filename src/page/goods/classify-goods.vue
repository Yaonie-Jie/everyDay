<template>
  <div id="box">
    <div class="box">
      <div style="width:100%;float:left;">
        <el-breadcrumb separator="/" class="left">
          <el-breadcrumb-item>业务管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="titlee" style='border:0;'>
          商品分类
        </div>
        <el-button type="success" class="right" @click="DisplayBlock">添加一级商品分类</el-button>
      </div>
      <div class="top" style="margin-top: 100px;font-size: 20px">
        <div class="boxleft" style="text-align: center;height: 30px;line-height: 30px">一级分类</div>
        <div class="boxright" style="text-align: center;height: 30px;line-height: 30px;width: 55%;">二级分类</div>
      </div>
      <ul class="boxx">
        <li class="shows" v-for="item in tableData">
          <ul>
            <li class="self">
              <div class="boxleft">
                <div class="img-box">
                  <img :src="item.picture">
                </div>

                <p style="font-size: 20px;color:#ff3366;padding-left: 20px;" v-text="item.name"></p>

                <el-button type="primary" @click="updataOne(item)">修改</el-button>
                <el-button type="danger" @click="deleteOne(item)">删除</el-button>
                <el-button :plain="true" type="info" @click="oneUp(item)">上移</el-button>
                <el-button :plain="true" type="info" @click="oneDowm(item)">下移</el-button>
              </div>
              <div class="boxright">
                <el-button type="success" class="right" @click="DisplayBlock2(item)" style="float: left;">添加二级商品分类
                </el-button>

                <ul class="left lists" style="clear:both;">
                  <li v-for="list in item.data">
                    <div style="width: 150px;float: left;line-height: 46px;" v-text="list.name">
                    </div>
                    <el-button type="info" @click="updataTwoShow(list,item)">修改</el-button>
                    <el-button type="danger" @click="deleteTwo(list,item)">删除</el-button>
                    <el-button :plain="true" type="info" @click="twoUp(list,item)" v-show="item.number!=1">上移
                    </el-button>
                    <el-button :plain="true" type="info" @click="twoDowm(list,item)">下移</el-button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="mask"></div>
    <div class="add_Class_a popup">
      <div class="add_class_a_title popup_title">添加一级分类</div>
      <div class="class_a_name">
        <div class="class_a_name_title">一级分类名称：</div>
        <el-input v-model="name" placeholder=""></el-input>
      </div>
      <div class="class_a_img">
        <div class="class_a_img_title">一级分类图片：</div>
        <div class="class_a_img_box">
          <form name="imgForm" id="imgForm" enctype="multipart/form-data" action="" method='post'>
            <div class="labe el-icon-plus" @click="labe"></div>
            <input class="input-loc-img imgLocal" name="pictureUrl" type='file' accept="image/*"
                   @change="selectChange"/>
          </form>
          <div class="imgurl">
            <img :src="images" alt="">
          </div>
        </div>
        <div class="add_class_a_btns">
          <el-button @click="DisplayNone">取消</el-button>
          <el-button type="primary" @click="addOneType">确定</el-button>
        </div>
      </div>
    </div>

    <div class=" popup updata">
      <div class="add_class_a_title popup_title">修改一级分类</div>
      <div class="class_a_name">
        <div class="class_a_name_title">一级分类名称：</div>
        <el-input v-model="updataname" placeholder=""></el-input>
      </div>
      <div class="class_a_img">
        <div class="class_a_img_title">一级分类图片：</div>
        <div class="class_a_img_box">
          <form name="imgForm" id="imgForm1" enctype="multipart/form-data" action="" method='post' style="float: left;">
            <div class="labe el-icon-plus" @click="updatalabe"></div>
            <input class="input-loc-img updataimgLocal" name="pictureUrl" type='file' accept="image/*"
                   @change="updataselectChange"/>
          </form>
          <div class="imgurl">
            <img :src="imagesupdata" alt="">
          </div>
        </div>
        <div class="add_class_a_btns">
          <el-button @click="updataNone">取消</el-button>
          <el-button type="primary" @click="updataProductType">确定</el-button>
        </div>
      </div>
    </div>

    <div class="add_Class_b popup">
      <div class="add_class_b_title popup_title">添加二级分类</div>
      <div class="class_b_name">
        <div class="class_b_name_title">二级分类名称：</div>
        <el-input v-model="nameTwo" placeholder=""></el-input>
      </div>
      <div class="add_class_b_btns">
        <el-button @click="DisplayNone2">取消</el-button>
        <el-button type="primary" @click="addTwoType">确定</el-button>
      </div>
    </div>

    <div class="add_Class_c popup">
      <div class="add_class_b_title popup_title">修改二级分类</div>
      <div class="class_b_name">
        <div class="class_b_name_title">二级分类名称：</div>
        <el-input v-model="updataTwoname" placeholder=""></el-input>
      </div>
      <div class="add_class_b_btns">
        <el-button @click="DisplayNone3">取消</el-button>
        <el-button type="primary" @click="updataTwoType">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '../../http'

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        TableDataUrl: this.GLOBAL.baseUrl + 'productType/findProductTypeList',
        currentChange: 1,
        SumPage: 20,
        tableData: [],

        images: '',     //展示用的图片路径
        imgFiles: '',   //上传文件图片
        name: '',

        updataimgFiles: '',
        updataname: '',
        imagesupdata: '',//修改的图片
        id: '',

        nameTwo: '',//二级商品名字
        idTwo: '',  //二级分类用的当前一级分类id
        updataTwoname: '',   //修改二级分类名字
        idTypeid: '',      //二级分类id

      }


    },
    created: function () {
      this.getTable()
    },
    methods: {
      //一级分类上移
      oneUp(row) {
        console.log(row)
        let nowID = row.id;
        let nowNumber = row.number;
        let table = this.tableData;
        let FrontID;
        let FrontNumber;
        for (let i = 0; i < table.length; i++) {
          if (table[i].id == nowID) {
            FrontID = table[i - 1].id;
            FrontNumber = table[i - 1].number;
          }
        }
        let arr = [{'id': nowID, 'number': FrontNumber}, {'id': FrontID, 'number': nowNumber}];
        let data = {'list': JSON.stringify(arr), 'common': 1};
        let url = http.apiMap.numProductType;
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '上移成功!'
              });
              this.getTable();
            } else {
              this.$message({
                type: 'info',
                message: res.body.msg
              });
            }
          }
        );
      },
      //一级分类下移
      oneDowm(row) {
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
        let arr = [{'id': nowID, 'number': FrontNumber}, {'id': FrontID, 'number': nowNumber}];
        let data = {'list': JSON.stringify(arr), 'common': this.GLOBAL.common};
        let url = http.apiMap.numProductType;
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '下移成功!'
              });
              this.getTable();
            } else {
              this.$message({
                type: 'info',
                message: res.body.msg
              });
            }
          }
        );
      },
      //二级分类上移
      twoUp(row, item) {
        console.log(row)
        let nowID = row.id;
        let nowNumber = row.number;
        let table = this.tableData;
        let FrontID;
        let FrontNumber;
        for (let i = 0; i < item.data.length; i++) {
          if (item.data[i].id == nowID) {
            FrontID = item.data[i - 1].id;
            FrontNumber = item.data[i - 1].number;
          }
        }
        let arr = [{'id': nowID, 'number': FrontNumber}, {'id': FrontID, 'number': nowNumber}];
        let data = {'list': JSON.stringify(arr), 'common': 1};
        let url = http.apiMap.numProductType;
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '上移成功!'
              });
              this.getTable();
            } else {
              this.$message({
                type: 'info',
                message: res.body.msg
              });
            }
          }
        );
      },
      //二级分类下移
      twoDowm(row, item) {
        let nowID = row.id;
        let nowNumber = row.number;
        let table = this.tableData;
        let FrontID;
        console.log(item)
        let FrontNumber;
        for (let i = 0; i < item.data.length; i++) {
          if (item.data[i].id == nowID) {
            FrontID = item.data[i + 1].id;
            FrontNumber = item.data[i + 1].number;
          }
        }
        let arr = [{'id': nowID, 'number': FrontNumber}, {'id': FrontID, 'number': nowNumber}];
        let data = {'list': JSON.stringify(arr), 'common': 1};
        let url = http.apiMap.numProductType;
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '下移成功!'
              });
              this.getTable();
            } else {
              this.$message({
                type: 'info',
                message: res.body.msg
              });
            }
          }
        );
      },
      //删除一级分类
      deleteOne(item) {
        this.$confirm('是否删除一级分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = http.apiMap.deleteProductOne;
          let data = {
            common: 1,
            id: item.id
          };
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getTable()
              } else {
                this.$message({
                  type: 'info',
                  message: res.body.msg
                });
              }
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除二级分类
      deleteTwo(list, item) {
        this.$confirm('是否删除二级分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = http.apiMap.deleteProductType;
          let data = {
            common: 1,
            id: list.id
          };
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getTable()
              } else {
                this.$message({
                  type: 'info',
                  message: res.body.msg
                });
              }
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //修改二级分类
      updataTwoShow(list, item) {
        $('.mask').css('display', 'block');
        $('.add_Class_c').css('display', 'block');
        this.updataTwoname = list.name
        this.idTypeid = list.id
        this.idTwo = item.id;
      },
      DisplayNone3() {
        $('.mask').css('display', 'none');
        $('.add_Class_c').css('display', 'none');
      },
      //修改一级分类开始
      updataOne(item) {
        $('.mask').css('display', 'block');
        $('.updata').css('display', 'block');
        this.updataname = item.name;
        this.imagesupdata = item.picture;
        this.id = item.id
      },
      updataNone() {
        $('.mask').css('display', 'none');
        $('.updata').css('display', 'none');
      },
      updataselectChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.updatacreateImage(files);
      },
      updatacreateImage(file) {
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
            vm.imagesupdata = e.target.result;
            vm.updataimgFiles = $('.updataimgLocal')[0].files[0];
          };
        }
      },
      //修改一级分类
      updataProductType() {
        let url = http.apiMap.updataProductType;
        let formData = new FormData();//通过formdata上传
        if (this.imagesupdata.indexOf('http') != 0) {
          formData.append('pictureUrl', this.updataimgFiles);
        }
        formData.append('name', this.updataname);
        formData.append('pId', 0);
        formData.append('common', 1);
        formData.append('id', this.id);
        this.$http.post(url, formData).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.getTable()
              this.updataNone()
            } else {
              this.$message({
                type: 'warning',
                message: res.body.msg
              });
            }
          }
        );
      },
//修改二级分类
      updataTwoType() {
        let url = http.apiMap.updataProductType;
        let formData = new FormData();//通过formdata上传
        formData.append('name', this.updataTwoname);
        formData.append('pId', this.idTwo);
        formData.append('common', 1);
        formData.append('id', this.idTypeid);
        this.$http.post(url, formData).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.getTable()
              this.DisplayNone3()
            } else {
              this.$message({
                type: 'warning',
                message: res.body.msg
              });
            }
          }
        );
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

      //添加一级分类
      addOneType() {
        let url = http.apiMap.addProductType;
        let formData = new FormData();//通过formdata上传
        formData.append('pictureUrl', this.imgFiles);
        formData.append('name', this.name);
        formData.append('level', 1);
        formData.append('pId', 0);
        formData.append('common', 1);
        this.$http.post(url, formData).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.getTable()
              this.DisplayNone()
            } else {
              this.$message({
                type: 'warning',
                message: '添加失败'
              });
            }
          }
        );
      },
      //添加二级分类
      addTwoType() {
        let url = http.apiMap.addProductType;
        let formData = new FormData();
        formData.append('name', this.nameTwo);
        formData.append('level', 2);
        formData.append('pId', this.idTwo);
        formData.append('common', 1);
        this.$http.post(url, formData).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.DisplayNone2()
              this.getTable()
            } else {
              this.$message({
                type: 'warning',
                message: '添加失败'
              });
            }
          }
        );
      },

      //获取列表信息
      getTable: function () {
        let tableList = [];
        let sumPage;
        $.ajax({
          type: 'POST',
          data: {'common': this.GLOBAL.common, 'size': 10, 'nowpage': this.currentChange},
          async: false,
          url: this.TableDataUrl,
          success: function (data) {
            if (data.result) {
              tableList = data.data.findProductTypeList;
              let parentList = [];
              let ChildList = [];
              //寻找子元素
              for (let i = 0; i < tableList.length; i++) {
                for (let j = 0; j < tableList.length; j++) {
                  if (tableList[j].pId == tableList[i].id) {
                    ChildList.push(tableList[j]);
                  }
                }
              }
              //寻找父元素--删除子元素就是父元素啦
              for (let i = 0; i < ChildList.length; i++) {
                for (let j = 0; j < tableList.length; j++) {
                  if (tableList[j].id == ChildList[i].id) {
                    tableList.splice(j, 1);
                    j = j - 1;
                  }
                }
              }
              parentList = tableList;
              //把子元素push到父元素
              for (let i = 0; i < parentList.length; i++) {
                parentList[i].data = [];
                for (let j = 0; j < ChildList.length; j++) {
                  if (ChildList[j].pId == parentList[i].id) {
                    parentList[i].data.push(ChildList[j])
                  }
                }
              }
              this.tableData = parentList;
//              sumPage=data.data.count;
            } else {
//              swal({title: '', text: data.msg})
            }
          }
        })
        this.tableData = tableList;

//        this.SumPage=sumPage;
      },
      //分页
      handleCurrentChange(val) {
        this.currentChange = val;
        this.getTable()
      },
      //上移
      MoveUp() {
        let obj = $(this).parent('li');
      },

      open2() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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

      DisplayBlock: function () {
        $('.mask').css('display', 'block');
        $('.add_Class_a').css('display', 'block');
      },

      DisplayNone: function () {
        $('.mask').css('display', 'none');
        $('.add_Class_a').css('display', 'none');
        this.images = ''
      },

      DisplayBlock2(item) {
        this.idTwo = item.id;
        this.nameTwo = ''
        $('.mask').css('display', 'block');
        $('.add_Class_b').css('display', 'block');
      },
      labe() {
        $(".imgLocal").click()
      },
      updatalabe() {
        $(".updataimgLocal").click()
      },
      DisplayNone2: function () {
        $('.mask').css('display', 'none');
        $('.add_Class_b').css('display', 'none');
      },
    }
  }
</script>
<style>
  .boxleft {
    width: 40%;
    float: left;
  }

  .boxright {
    width: 95%;
    float: left;
  }

  .lis {
    width: 100%;
  }

  .lists {
    padding: 20px;
    box-sizing: border-box;
  }

  .updataimgLocal {
    display: none;
  }

  .two-type {
    width: 10%;
    min-width: 54px;
    padding: 18px;
    height: 100%;
  }

  .boxx {
    width: 100%;
    padding: 20px 0;
  }

  .shows {
    min-width: 700px;
    height: auto;
    overflow: hidden;
    box-shadow: 0px 0px 5px #ff3366;
    margin: 50px auto 0;
  }

  .updata {
    display: none;
  }

  .self {
    width: 100%;
    float: left;
    display: flex;
    padding: 20px;
  }

  .img-box {
    width: 200px;
    height: 200px;
    overflow: hidden;
  }

  .img-box img {
    width: 100%;
  }

  .left-title {
    border-right: 1px solid #838383;
    width: 10%;
    min-width: 50px;
    display: flex;
    align-items: center;
    padding: 20px;
    height: 342px;
  }

  .titlee {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #ff3366;
    border-bottom: 1px solid #838383;
  }

  .right-list {
    width: 90%;
    box-sizing: border-box;
    padding: 20px;
    height: auto;
  }

  .right-list:nth-child(1) {
    border: 0;
  }

  .right-list li {
    width: 100%;
    margin: 10px;
    display: flex;
    line-height: 36px;
  }

  .el-button {
    margin: 0 20px 0 0;
  }

  .margin30 {
    margin-right: 30px;
  }

  .class_a_name,
  .class_b_name {
    width: 80%;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 30px;
  }

  .class_a_name .class_a_name_title,
  .class_b_name .class_b_name_title {
    float: left;
    width: 25%;
    line-height: 36px;
    text-align: left;
  }

  .class_a_name .el-input,
  .class_b_name .el-input {
    width: 70%;
    float: right;
  }

  .class_a_img,
  .class_b_img {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 30px;
  }

  .class_a_img .class_a_img_title,
  .class_b_img .class_b_img_title {
    width: 30%;
    float: left;
    text-align: left;
    line-height: 36px;
  }

  .class_a_img_box,
  .class_b_img_box {
    float: left;
  }

  .add_class_a_btns,
  .add_class_b_btns {
    margin: 0 auto;
    width: 100%;
    float: left;
    margin-top: 40px;
  }

  .add_class_a_btns .el-button:nth-child(1),
  .add_class_b_btns .el-button:nth-child(1) {
    float: left;
    margin-left: 25%;
  }

  .add_class_a_btns .el-button:nth-child(2),
  .add_class_b_btns .el-button:nth-child(2) {
    float: right;
    margin-right: 25%;
  }

  .border-top {
    border-top: 1px solid #838383;
  }
</style>
