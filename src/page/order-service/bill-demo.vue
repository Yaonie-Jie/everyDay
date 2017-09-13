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
          <div class="right">
            <el-button type="success" icon="icon-plus" @click="DisplayBlock">添加运费模板</el-button>
          </div>
        </div>
        <div class="item2">
          <el-table
            :data="dataList"
            border
            style="width: 100%">
            <el-table-column
              prop="num"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="template"
              label="模板名称">
            </el-table-column>
            <el-table-column
              prop="freight"
              label="默认运费">
            </el-table-column>
            <el-table-column
              prop="region"
              label="默认运费地址">
            </el-table-column>
            <el-table-column
              prop="freeShipping"
              label="免邮设置">
            </el-table-column>
            <el-table-column
              label="操作">
              <template scope="scope">

                <el-button type="text" size="small" @click="DisplayBlock3(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="open2(scope.row)">删除</el-button>

              </template>
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
        <el-input v-model="template"></el-input>
      </div>
      <div class="template_freight">
        <div class="template_freight_title">默认运费</div>
        <el-input v-model="freight"></el-input>
      </div>
      <div class="add_noDefaultarea_btn">
        <el-button type="primary" @click="DisplayBlock2">添加非默认运费地区</el-button>
      </div>
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
              <el-button type="text" size="small" @click="open2(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="set_up">
        <div class="freight_set_up">免邮设置</div>
        <div>
          <input type="radio" id="jack" value="0" v-model="freeShipping">
          <label for="jack">不包邮</label>
          <input type="radio" id="john" value="1" v-model="freeShipping">
          <label for="john">订单满额免邮</label>
        </div>
        <div class="freight_set_up"  v-show="freeShipping == 1">满额免邮</div>
        <el-input v-show="freeShipping == 1" style="width: 40%" v-model="full"></el-input>

      </div>
      <div class="add_template_btns">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="addFreightTemplate">添加</el-button>
      </div>
    </div>
       <div class="add_noDefaultarea popup">
          <div class="add_noDefaultarea_title popup_title">添加非默认运费地区</div>
          <!--<div class="add_noDefaultarea_list_title">非默认运费地区选择</div>-->
          <!--<div class="add_noDefaultarea_list">-->
            <!--<dl>-->
              <!--<dt><el-checkbox label="浙江省" name="type"></el-checkbox></dt>-->
              <!--<dd><el-checkbox label="杭州市" name="type"></el-checkbox></dd>-->
              <!--<dd><el-checkbox label="舟山市" name="type"></el-checkbox></dd>-->
            <!--</dl>-->
            <!--<dl>-->
              <!--<dt><el-checkbox label="辽宁省" name="type"></el-checkbox></dt>-->
              <!--<dd><el-checkbox label="葫芦岛市" name="type"></el-checkbox></dd>-->
              <!--<dd><el-checkbox label="大连市" name="type"></el-checkbox></dd>-->
            <!--</dl>-->
          <!--</div>-->
         <el-row style="margin-top: 20px">
           <el-col :span="24" style="margin-bottom: 20px">
             <span style="padding-right: 20px">地区</span>
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
             <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加地区</el-button>
           </el-col>
           <el-col :span="24">
             <span style="padding-right: 20px">运费</span>
             <el-input type="text" style="width: 50%" v-model="freights"></el-input>
           </el-col>
         </el-row>
          <div class="add_noDefaultarea_btns">
            <el-button @click="DisplayNone2">取消</el-button>
            <el-button type="primary" @click="adddiqu">添加</el-button>
          </div>
        </div>

    <div class="change_freight popup">
      <div class="popup_title">修改运费模板</div>
      <div class="popup_form">
        <div class="popup_form_title">模板名称</div>
        <el-input v-model="template"></el-input>
      </div>
      <div class="popup_form">
        <div class="popup_form_title">默认运费</div>
        <el-input v-model="freight"></el-input>
      </div>
      <div class="set_up" style="width: 80%;">
        <div class="freight_set_up">免邮设置</div>
        <!--<select name="" id="orderState"@change="change" >-->
        <!--<option v-for="option in options" v-bind:value="option.value">-->
        <!--{{ option.text }}-->
        <!--</option>-->
        <!--</select>-->

        <div class="fullmoney">
          免邮金额：
          <el-input v-model="full"></el-input>
        </div>
      </div>
      <div class="popup_btn">
        <el-button @click="DisplayNone3">取消</el-button>
        <el-button type="primary" @click="Updata">修改</el-button>
      </div>
    </div>

  </div>
</template>
<script>

  import http from '../../http'


  export default {
    name: 'userManage',
    data() {
      return {
        tableData: [],
        dataList: [],
        template: '',
        freight: '',
        full: '',
        id: '',
        freeShipping: '',
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        freights:'',
      }
    },
    created() {
      this.getList()
    },
    methods: {
      adddiqu(){
        let data={
          noDefault_area: this.dynamicTags.join(','),
          freight: this.freights,
        }
        this.tableData.push(data);
        this.DisplayNone2()
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
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
      addFreightTemplate(){
        let url = http.apiMap.addFreight;
        let data = {
          common: 1,
          template: this.template,
          freight: this.freight,
          full: this.full,
          freeShipping: this.freeShipping,
          freightNodefaults:this.tableData
        };
        console.log(data)
//        this.$http.post(url, data).then(
//          function (res) {
//            if (res.body.result) {
//              this.$message({
//                type: 'success',
//                message: '添加成功!'
//              });
//              $(".add_template").hide();
//              $(".mask").hide();
//              this.getList()
//            }
//
//          }
//        );
      },
      open2(row) {
        this.$confirm('此操作将删除运费模版, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = http.apiMap.deleteFreight;
          let data = {
            common: 1,
            id:row.id
          };
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getList()
              }else {
                this.$message({
                  type: 'error',
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
      DisplayBlock() {
        $('.mask').css('display', 'block');
        $('.add_template').css('display', 'block');

      },

      DisplayNone: function () {
        $('.mask').css('display', 'none');
        $('.add_template').css('display', 'none');
      },

      DisplayBlock2: function () {
        $('.mask').css('display', 'block');
        $('.add_noDefaultarea').css('display', 'block');
      },

      DisplayNone2: function () {
        $('.add_noDefaultarea').css('display', 'none');
      },
      DisplayBlock3(row) {
        $('.mask').css('display', 'block');
        $('.change_freight').css('display', 'block');
        this.template = row.template;
        this.freight = row.freight;
        this.full = row.full;
        this.id = row.id;
        if (row.freeShipping == '不免邮') {
          this.freeShipping = '0';
          $(".fullmoney").hide()
        } else {
          this.freeShipping = '1'
          $(".fullmoney").show()
        }
      },

      DisplayNone3: function () {
        $('.mask').css('display', 'none');
        $('.change_freight').css('display', 'none');
      },
      getList() {
        let url = http.apiMap.freightList;
        let data = {
          nowpage: 1,
          size: 10,
          common: this.GLOBAL.common
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.list;
              let arr = [];
              let num = 0;
              for (let i = 0; i < data.length; i++) {
                data[i].region = '除' + data[i].region + '之外所有地区'
                if (data[i].freeShipping == 0) {
                  data[i].freeShipping = '不免邮'
                } else {
                  data[i].freeShipping = '￥' + data[i].full + '免邮'
                }
                num += 1;
                data[i].num = num;
                arr.push(data[i])
              }
              this.dataList = arr;
            }

          }
        );
      },
      //修改运费模板
      Updata() {

        let url = http.apiMap.updataFreight;
        let data = {
          common: this.GLOBAL.common,
          id: this.id,
          template: this.template,
          freight: this.freight,
          full: this.full,
          freeShipping: this.freeShipping,
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.DisplayNone3();
              this.getList()
            }

          }
        );
      },
      change() {
        if ($("#orderState :selected").attr('value') == '1') {
          $(".fullmoney").show()
        } else {
          $(".fullmoney").hide()
        }
      }

    },

  }

</script>
<style>
  #orderState {
    height: 36px;
    float: left;
    margin-left: 20px;
  }

  .change_freight {
    z-index: 9999;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .item2 {
    padding: 20px;
    box-sizing: border-box;
    margin-top: 30px;
  }

  .broad {
    margin-bottom: 30px;
  }

  .item1 {
    padding: 20px;
  }

  .dange {
    padding: 20px 20px 0 20px;
  }

  table tr td {
    text-align: center !important;
  }

  table tr th {
    text-align: center !important;
  }

  .template_name,
  .template_freight {
    width: 50%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }

  .template_name_title,
  .template_freight_title {
    width: 25%;
    text-align: left;
    line-height: 36px;
    float: left;
  }

  .template_name .el-input,
  .template_freight .el-input {
    width: 70%;
    float: right;
  }

  .add_noDefaultarea_btn {
    width: 70%;
    margin: 30px auto;
    text-align: right;
  }

  .add_noDefaultarea_btn .el-button {
    margin-right: 0;
  }

  .freight_table {
    width: 70%;
    margin: 0 auto;
  }

  .set_up {
    width: 70%;
    margin: 0 auto;
    line-height: 36px;
    margin-top: 30px;
    overflow: hidden;
  }

  .freight_set_up {
    float: left;
    text-align: center;
    margin: 0;
  }

  .set_up .el-input {
    width: 20%;
    text-align: center;
    margin: 0;
  }

  .set_up .el-radio {
    float: left;
    width: 30%;
    text-align: center;
    margin: 0;
  }

  .add_template_btns {
    margin: 0 auto;
    margin-top: 40px;
  }

  .add_template_btns .el-button:nth-child(1) {
    float: left;
    margin-left: 35%;
  }

  .add_template_btns .el-button:nth-child(2) {
    float: right;
    margin-right: 35%;
  }

  .add_noDefaultarea {
    width: 600px;
    height:400px;
    padding: 30px;
    background: #ffffff;
    position: fixed;
    top: 100px;
    /*left: 50%;*/
    /*margin-left: -230px;*/
    text-align: center;
    z-index: 99999;
    display: none;
  }

  .add_noDefaultarea_list_title,
  .add_noDefaultarea_freight {
    width: 60%;
    text-align: left;
    margin-top: 30px;
  }

  .add_noDefaultarea_list {
    width: 60%;
    margin: 0 auto;
    overflow: hidden;
  }

  .add_noDefaultarea_list dl {
    width: 50%;
    float: left;
    margin-top: 30px;
  }

  .add_noDefaultarea_list dl dt {
    height: 28px;
    line-height: 28px;
    text-align: left;
  }

  .add_noDefaultarea_list dl dd {
    height: 28px;
    line-height: 28px;
    text-align: left;
    margin-left: 20px;
  }

  .add_noDefaultarea_free {
    width: 60%;
    margin: 0 auto;
    text-align: left;
    line-height: 36px;
    margin-top: 30px;
  }

  .add_noDefaultarea_free .el-input {
    width: 50%;
    float: left;
    margin-right: 10px;
  }

  .add_noDefaultarea_btns {
    margin: 0 auto;
    margin-top: 40px;
  }

  .add_noDefaultarea_btns .el-button:nth-child(1) {
    float: left;
    margin-left: 25%;
  }

  .add_noDefaultarea_btns .el-button:nth-child(2) {
    float: right;
    margin-right: 25%;
  }
</style>
