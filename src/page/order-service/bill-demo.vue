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

                <el-button type="text" size="small" @click="updataf(scope.row)">修改</el-button>
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
            prop="region"
            label="非默认运费地区">
          </el-table-column>
          <el-table-column
            prop="freight"
            label="运费">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
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
        <div class="freight_set_up" v-show="freeShipping == 1">满额免邮</div>
        <el-input v-show="freeShipping == 1" style="width: 40%" v-model="full"></el-input>

      </div>
      <div class="add_template_btns">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="addFreightTemplate">添加</el-button>
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
        freights: '',
      }
    },
    created() {
      this.getList()
    },
    methods: {
      adddiqu() {
        let data = {
          region: this.dynamicTags.join(','),
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
      addFreightTemplate() {
        if (this.template == '') {
          this.$message({
            type: 'info',
            message: '请填写运费模版'
          });
        } else {

        }
        let url = http.apiMap.addFreight;
        let data = {
          common: 1,
          template: this.template,
          freight: this.freight,
          full: this.full,
          freeShipping: this.freeShipping,
          freightNodefaults: JSON.stringify(this.tableData)
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.template = '';
              this.freight = '';
              this.full = '';
              this.tableData = [];
              this.freeShipping = '';
              $(".add_template").hide();
              $(".mask").hide();
              this.getList()
            } else {
              this.$message({
                type: 'error',
                message: ''
              });
            }

          }
        );
      },
//      删除运费模版
      open2(row) {
        this.$confirm('此操作将删除运费模版, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = http.apiMap.deleteFreight;
          let data = {
            common: 1,
            id: row.id
          };
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getList()
              } else {
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
        this.$router.push('/addFreight');

//        $('.mask').css('display', 'block');
//        $('.add_template').css('display', 'block');
//        this.template = '';
//        this.freight = '';
//        this.tableData = [];
//        this.full = ''
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
          this.freeShipping = '1';
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
                if (data[i].region) {
                  data[i].region = '除' + data[i].region + '之外所有地区'
                } else {
                  data[i].region = '所有地区'
                }
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
      updataf(row) {
        this.$router.push('/updataFreight/' + row.id);
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
    height: 400px;
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
