<template>
  <div id="box">

    <div class="box">
      <el-row>
        <el-col :span="24">
          <div class="add_goods_title mid">修改商品</div>

          <div class="add_goods_img">
            <div class="add_goods_img_title" style="width: 10%;">链接封面</div>
            <form name="imgForm" id="imgFor" enctype="multipart/form-data" action="" method='post'>
              <div class="labe el-icon-plus" @click="labe1"></div>
              <input class="input-loc-img imgLocal1" name="pictureUrl" type='file' accept="image/*"
                     @change="coverChange"/>
            </form>
            <div class="imgurl" v-if="images1">
              <img :src="images1" alt="">
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="add_goods_img">
            <div class="add_goods_img_title" style="width: 10%;">商品图片</div>
            <form name="imgForm" id="imgForm" enctype="multipart/form-data" action="" method='post'>
              <div class="labe el-icon-plus" @click="labe"></div>
              <input class="input-loc-img imgLocal" name="pictureUrl" type='file' accept="image/*"
                     @change="selectChange"/>
            </form>
            <div class="imgurl" v-for="(i,index) in images">
              <img :src="i">
              <span @click="deletes" :index="index">删除</span>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="add_goods_name">
            <div class="add_goods_name_title">商品名称</div>
            <input v-model="name" maxlength="10" class="el-input__inner" style="float: left;width: 70%;"></input>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="add_goods_name">
            <div class="add_goods_name_title">商品条码</div>
            <el-input v-model="proCode"></el-input>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="add_goods_saleprice">
            <div class="add_goods_saleprice_title">商品销售价</div>
            <el-input v-model="price"></el-input>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="add_goods_costprice">
            <div class="add_goods_costprice_title">商品成本价</div>
            <el-input v-model="cose" placeholder=""></el-input>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="add_goods_stock">
            <div class="add_goods_stock_title">商品库存</div>
            <el-input v-model="stock" placeholder=""></el-input>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="add_goods_classify">
            <div class="add_goods_classify_title">商品分类</div>
            <select name="" class="select" id="oneType" @change="OneTypeListChange" v-model="typeIdOne">
              <option value="">请选择</option>
              <option v-for="option in OneTypeList" v-bind:value="option.id">
                {{ option.name }}
              </option>
            </select>
            <select name="" class="select" id="TwoType" @change="TwoTypeListChange" v-model="typeId">
              <option value="">请选择</option>
              <option v-for="option in TwoypeList" v-bind:value="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="add_goods_brands">
            <div class="add_goods_brands_title">商品品牌</div>
            <select name="" class="select" id="BrandList" v-model="brandId">
              <option v-for="option in BrandList" v-bind:value="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <div class="add_goods_stock_title">商品详情</div>
          <div class="edit_container">
            <quill-editor v-model="content"
                          ref="myQuillEditor"
                          class="editer"
                          :options="editorOption"
                          @ready="onEditorReady($event)">
            </quill-editor>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <div class="add_goods_stock_title">商品参数</div>
          <div class="edit_container">
            <quill-editor v-model="contentCan"
                          ref="myQuillEditorCan"
                          class="editer"
                          :options="editorOptionCan"
                          @ready="onEditorReadyCan($event)">
            </quill-editor>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <div class="add_goods_specifications">
            <div class="add_goods_specifications_title">规格：</div>
            <div class="add_goods_specifications_btn">
              <el-button type="primary" @click="DisplayBlock">添加规格</el-button>
            </div>
          </div>
        </el-col>


        <div class="mask"></div>
        <el-col :span="24" style="margin-top: 20px">

          <div class="add_specifications popup">
            <div class="popup_form">
              <div class="popup_form_title">规格名称</div>
              <el-input v-model="paramName" placeholder="请输入内容"></el-input>
            </div>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              :closable="true"
              :close-transition="false"
              @close="handleClose(tag)"
            >
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加规格</el-button>

            <div class="add_specifications_btn">
              <el-button @click="DisplayNone">取消</el-button>
              <el-button type="primary" @click="finish">确定</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <div class="add_goods_form">
            <el-table
              border
              :data="paramlist"
              style="width: 100%">
              <el-table-column
                prop="paramName"
                :span="1"
                label="规格">
              </el-table-column>
              <el-table-column
                :span="2"
                prop="parameters"
                label="选项">
              </el-table-column>
              <el-table-column
                :span="5"
                fixed="right"
                label="操作">
                <template scope="scope">
                  <!--<el-button type="primary" icon="edit" @click="DisplayBlock2(scope.row)"></el-button>-->
                  <el-button type="primary" icon="delete" @click="deleteParam(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>

        <el-col :span="24" style="margin-top: 20px">

          <div class="add_goods_commission">
            <div class="add_goods_commission_title">店主可得提成</div>
            <div class="add_goods_commission_ipt" style="font-size: 16px;line-height: 36px">
              <el-input v-model="royalty" placeholder="请输入内容"></el-input>
              %
              （销售价-成本价）
            </div>
          </div>
        </el-col>
      </el-row>

      <!--<p class="add_goods_commission_tip">所有店主最多可分得提成金20.21元</p>

      <div class="add_goods_hierarchycommission">
        <div class="add_goods_hierarchycommission_title">店主层级提成</div>
        <table class="add_goods_hierarchycommission_table" border="1" cellpadding="0" cellspacing="0">
          <tr>
            <td>个人店主</td>
            <td>公司店主</td>
            <td>高级店主 </td>
          </tr>
          <tr>
            <td>50%</td>
            <td>30%</td>
            <td>20% </td>
          </tr>
        </table>
      </div>-->

      <div class="add_goods_freight">
        <div class="add_goods_freight_title">运费模板</div>
        <select name="" class="select" id="freight" v-model="freightId">
          <option value="">请选择</option>
          <option v-for="option in feightList" v-bind:value="option.id">
            {{ option.template }}
          </option>
        </select>
      </div>
      <el-col :span="24" style="margin-top: 20px;text-align: center">
        <el-button style="margin-left: 10px;" type="success" @click="submitUpload">修改商品</el-button>
      </el-col>
      <!--<div class="add_goods_btn">-->
      <!--<el-button>取消</el-button>-->
      <!--<el-button type="primary" @click="addshop()">确定</el-button>-->
      <!--</div>-->
      <!--</div>-->

    </div>
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
        id: '',
        images: [],     //展示用的图片路径
        imgFiles: [],   //上传文件图片
        name: '',        //商品名称
        price: '',       //商品售价
        cose: '',        //成本价
        stock: '',       //库存
        OneTypeList: [],
        TwoypeList: [],
        BrandList: [],//商品品牌列表
        typeId: '',
        value: '',
        brandId: '',
        content: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{'header': 1}, {'header': 2}],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'indent': '-1'}, {'indent': '+1'}],
              [{'direction': 'rtl'}],
              [{'size': ['small', false, 'large', 'huge']}],
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'color': []}, {'background': []}],
              [{'font': []}],
              [{'align': []}],
              ['clean'],
              ['image']
            ]
          }
        },
        proCode: '',
        contentCan: '',
        editorOptionCan: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{'header': 1}, {'header': 2}],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'indent': '-1'}, {'indent': '+1'}],
              [{'direction': 'rtl'}],
              [{'size': ['small', false, 'large', 'huge']}],
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'color': []}, {'background': []}],
              [{'font': []}],
              [{'align': []}],
              ['clean'],
            ]
          }
        },
        paramlist: [],
        paramName: '', //规格名称
        dynamicTags: [],//单个规格数组
        inputVisible: false,
        inputValue: '',
        royalty: '',   //店主可的提成
        feightList: [],
        freightId: '',//运费模版Id
        typeIdOne: '',
        pic: [],//存放已有图片路径
        typeId_two: '',
        images1: ''
      };
    },
    created() {
      this.id = this.$route.params.id;
      this.findTypeList();
      this.findBrandList();
      this.findFeightList();
      this.findById();
    },
    methods: {
      //查询商品详情
      findById() {
        let url = http.apiMap.findById;
        let data = {
          id: this.id,
          common: 1
        }
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.product;
              this.name = data.name;
              this.images1 = data.coverPicture
              this.price = data.price / 100;
              this.stock = data.stock;
              this.cose = data.cose / 100;
              this.paramlist = data.parameters;
              this.brandId = data.brandId;
              this.typeId = data.typeId;
              this.typeId_two = data.typeId;
              this.freightId = data.freightId;
              this.royalty = data.royalty / 100;
              this.images = data.picture.split(',');
              this.pic = data.picture.split(',');
              this.proCode = data.proCode;
              for (let i = 0; i < data.picture.split(',').length; i++) {
                let o = new Object();
                o.name = data.picture.split(',')[i];
                this.imgFiles.push(o);
              }
              this.content = data.details;
              this.contentCan = data.parameter;
              let url = http.apiMap.findtTypeByTwoId;
              let data1 = {
                common: 1,
                id: data.typeId
              };
              this.$http.post(url, data1).then(
                function (res) {
                  if (res.body.result) {
                    this.typeIdOne = res.body.data.names.pId;
                    this.OneTypeListChange()

                  }
                }
              );
            }
          }
        );
      },

      //运费模版
      findFeightList() {
        let url = http.apiMap.freightList;
        let data = {
          size: 100,
          nowpage: 1,
          common: 1
        }
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.list;
              this.feightList = data
            }
          }
        );
      },
      //规格标签
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        //this.paramName = '';
        // this.dynamicTags = [];
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      finish() {
        if (this.paramName == '') {
          this.$message({
            type: 'info',
            message: '请填写规格名称'
          });
        } else {
          if (this.dynamicTags == '') {
            this.$message({
              type: 'info',
              message: '请填写规格参数'
            });
          } else {
            let arr = {
              paramName: this.paramName,
              parameters: this.dynamicTags.join(',')
            }
            this.paramlist.push(arr);
            this.paramName = '';
            this.dynamicTags = [];
            $('.mask').css('display', 'none');
            $('.add_specifications').css('display', 'none');
          }
        }
      },
      deleteParam(row) {
        this.paramlist.splice(this.paramlist.indexOf(row), 1);
      },


      //查询分类
      findTypeList() {//查询一级分类列表
        let url = http.apiMap.findTypeList;
        this.$http.post(url, {common: 1}).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.findProductOneTypeList;
              this.OneTypeList = data;
            }
          }
        );
      },
      //根据二级分类查询一级分类
      findtTypeByTwoId() {

      },
      OneTypeListChange() {//一级分类改变
        let url = http.apiMap.findTypeListTwo;
        let data = {
          pId: this.typeIdOne,
          common: 1
        }
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.ProductTwoTypeList;
              this.TwoypeList = data;
              this.typeId = this.typeId_two
            }
          }
        );
      },
      TwoTypeListChange() {//二级分类改变
        this.typeId = $("#TwoType :selected").attr('value')
      },
      findBrandList() {//查询商品品牌分类
        let url = http.apiMap.findBrandList;
        let data = {
          nowpage: 1,
          size: 100,
          common: 1
        }
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.productBrandList;
              this.BrandList = data;
            }
          }
        );
      },
      onEditorReady(editor) {
        //console.log('editor ready!', editor)
      },
      onEditorReadyCan(editor) {
//        console.log('editor ready!', editor)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      DisplayBlock: function () {
        $('.mask').css('display', 'block');
        $('.add_specifications').css('display', 'block');
      },

      DisplayNone: function () {
        $('.mask').css('display', 'none');
        $('.add_specifications').css('display', 'none');
      },
      DisplayBlock2(row) {
        $('.mask').css('display', 'block');
        $('.modify_specifications').css('display', 'block');
        this.paramName = row.paramName;
        this.dynamicTags = row.parameters.split(',')
      },

      DisplayNone2: function () {
        $('.mask').css('display', 'none');
        $('.modify_specifications').css('display', 'none');
      },
      labe() {
        $(".imgLocal").click()
      },
      //上传图片
      selectChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files);
      },
      createImage(file) {
        if (typeof FileReader === 'undefined') {
          alert('您的浏览器不支持图片上传，请升级您的浏览器');
          return false;
        }
        var vm = this;
        var leng = file.length;
        for (var i = 0; i < leng; i++) {
          var reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            vm.images.push(e.target.result);
            for (var i = 0; i < $('.imgLocal')[0].files.length; i++) {
              vm.imgFiles.push($('.imgLocal')[0].files[i])
            }
          };
        }
        console.log(this.imgFiles)
      },
      deletes(e) {
        console.log(this.images);
        let el = e.target;
        let tmpi = 0;
        for (let i = 0; i < this.images.length; i++) {
          if ($(el).prev().attr('src') == this.images[i]) {
            tmpi = i;
            break;
          }
        }
        this.images.splice(tmpi, 1);
        this.imgFiles.splice(tmpi, 1);
        for (let i = 0; i < this.pic.length; i++) {
          if ($(el).prev().attr('src') == this.pic[i]) {
            tmpi = i;
            break;
          }
        }
        this.pic.splice(tmpi, 1);
      },
      labe1() {
        $(".imgLocal1").click()
      },
      coverChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage1(files);
      },
      createImage1(file) {
        var vm = this;
        var leng = file.length;
        let arr = []
        for (var i = 0; i < leng; i++) {
          var reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            vm.images1 = e.target.result;
            vm.imgFiles1 = $('.imgLocal1')[0].files[0];
          }
        }
      },
      submitUpload() {
        if (this.typeId == '') {
          this.$message({
            type: 'info',
            message: '请选择商品分类'
          });
        } else {
          if (this.brandId == '') {
            this.$message({
              type: 'info',
              message: '请选择商品品牌'
            });
          } else {
            if (this.freightId == '') {
              this.$message({
                type: 'info',
                message: '请选择运费模版'
              })
            } else if (this.content.length > 6291456) {
              this.$message({
                type: 'warning',
                message: '商品详情上传图片不能超过5M'
              });
            }else {
              this.$confirm('是否修改商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                $(".mask").show()
                let url = http.apiMap.updataShop;
                let formData = new FormData();//通过formdata上传
                let arr = []
                for (let i = 0; i < this.imgFiles.length; i++) {
                  if (arr.indexOf(this.imgFiles[i]) == -1) {//上传图片文件去重
                    if (this.imgFiles[i].name.indexOf('http') != 0) {
                      arr.push(this.imgFiles[i])
                      formData.append('pictureUrl', this.imgFiles[i])
                    }
                  }
                }
                formData.append('id', this.id);
                formData.append('pictureUrl1', this.imgFiles1);
                formData.append('common', '2');
                formData.append('typeId', this.typeId);
                formData.append('stock', this.stock);
                formData.append('cose', this.cose * 100);
                formData.append('royalty', this.royalty * 100);
                formData.append('name', this.name);
                formData.append('price', this.price * 100);
                formData.append('brandId', this.brandId);
                formData.append('details', this.content);
                formData.append('parameters', JSON.stringify(this.paramlist));
                formData.append('freightId', this.freightId);
                formData.append('pictureOriginal', this.pic.join(','));
                formData.append('parameter', this.contentCan);
                formData.append('proCode', this.proCode);

                this.$http.post(url, formData, {
                  method: 'post',
                  headers: {'Content-Type': 'multipart/form-data'}
                }).then(function (res) {
                  $(".mask").hide()
                  if (res.body.result) {
                    this.$message({
                      type: 'success',
                      message: '修改成功!'
                    });
                    this.$router.push('/ManageGoods');
                  } else {
                    this.$message({
                      type: 'warning',
                      message: res.body.msg
                    });
                  }
                }).catch(function (error) {
                  this.$message({
                    type: 'info',
                    message: '修改失败'
                  });
                })


              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消修改'
                });
              });
            }
          }
        }
      }
    }
    ,
    open3() {
      this.$confirm('此操作将删除此规格, 是否继续?', '提示', {
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
    }
    ,


  }
</script>


<style>
  .add_goods_name,
  .add_goods_saleprice,
  .add_goods_costprice,
  .add_goods_stock,
  .add_goods_classify,
  .add_goods_brands,
  .add_goods_words,
  .add_goods_specifications,
  .add_goods_commission,
  .add_goods_hierarchycommission,
  .add_goods_freight,
  .add_goods_commission_tip {
    width: 40%;
    margin-top: 30px;
    overflow: hidden;
  }

  .add_goods_commission_tip {
    margin-top: 0;
    color: #ff3366;
  }

  .add_goods_img_title,
  .add_goods_name_title,
  .add_goods_saleprice_title,
  .add_goods_costprice_title,
  .add_goods_stock_title,
  .add_goods_classify_title,
  .add_goods_brands_title,
  .add_goods_words_title,
  .add_goods_specifications_title,
  .add_goods_commission_title,
  .add_goods_hierarchycommission_title,
  .add_goods_freight_title {
    float: left;
    line-height: 36px;
    text-align: left;
    width: 100px;
    font-size: 16px;
  }

  .add_goods_name .el-input,
  .add_goods_saleprice .el-input,
  .add_goods_costprice .el-input,
  .add_goods_stock .el-input,
  .add_goods_classify .el-select,
  .add_goods_brands .el-select,
  .add_goods_specifications_btn,
  .add_goods_words .el-textarea,
  .add_goods_commission .add_goods_commission_ipt,
  .add_goods_hierarchycommission .add_goods_hierarchycommission_table,
  .add_goods_freight .el-select {
    float: left;
    width: 70%;
  }

  .add_goods_img .upload-demo {
    width: 70%;
    float: left;
  }

  .add_goods_words .el-textarea {
    margin-top: 15px;
  }

  .add_goods_words .el-textarea:nth-child(2) {
    margin-top: 0;
  }

  .add_goods_words .el-textarea:nth-child(3) {
    margin-left: 25%;
  }

  .add_goods_words .el-textarea:nth-child(4) {
    margin-left: 25%;
  }

  .add_goods_classify .el-select {
    width: 33%;
    float: left;
  }

  .add_goods_classify .el-select:nth-child(2) {
    margin-right: 4%;
  }

  .add_goods_commission_ipt .el-input {
    width: 40%;
    float: left;
  }

  .add_goods_hierarchycommission_table {
    border: 0;
    cellspacing: 0;
    cellpadding: 0;
  }

  .add_goods_hierarchycommission_table tr td {
    border: 1px solid #303030;
    border-right: 0;
    border-bottom: 0;
    text-align: center;
    line-height: 36px;
    height: 36px;
  }

  .add_goods_hierarchycommission_table tr td:nth-child(3) {
    border-right: 1px solid #303030;
  }

  .add_goods_hierarchycommission_table tr:nth-of-type(2) td {
    border-bottom: 1px solid #303030;
  }

  .add_goods_btn {
    width: 40%;
    margin: 0 auto;
    margin-top: 50px;
    overflow: hidden;
  }

  .add_goods_btn .el-button:nth-child(1) {
    float: left;
    margin-left: 20%;
  }

  .add_goods_btn .el-button:nth-child(2) {
    float: right;
    margin-right: 20%;
  }

  .add_specifications_ipt {
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }

  .add_specifications_ipt_title {
    float: left;
    width: 20%;
    line-height: 36px;
    text-align: left;
  }

  .add_specifications_ipt .el-input {
    width: 75%;
    float: right;
  }

  .add_specifications_btn {
    margin: 0 auto;
    margin-top: 50px;
    overflow: hidden;
  }

  .add_specifications_btn .el-button:nth-child(1) {
    float: left;
    margin-left: 20%;
  }

  .add_specifications_btn .el-button:nth-child(2) {
    float: right;
    margin-right: 20%;
  }

  .add_choose_specifications {
    width: 80%;
    padding: 30px;
    margin: 0 auto;
    margin-top: 30px;
    box-sizing: border-box;
    border: 1px solid #dddddd;
    border-radius: 5px;
  }

  .labe {
    width: 100px;
    height: 100px;
    font-size: 30px;
    text-align: center;
    line-height: 100px;
    border: 1px dashed #000;
    margin-right: 10px;
  }

  .imgurl {
    float: left;
  }

  .imgurl img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }

  #imgForm {
    float: left;
  }

  .imgLocal {
    display: none;
  }

  .select {
    height: 35px;
  }

  .edit_container {
    margin-bottom: 40px;
    float: left;
  }

  .editer {
    height: 350px;
    width: 800px;
  }
</style>

