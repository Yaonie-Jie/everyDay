<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>其他服务</el-breadcrumb-item>
        <el-breadcrumb-item>发票管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="invoice" style="text-align:center;">
        <div class="titlee" style="border:0;">
          用户可选发票内容
        </div>
        <el-button type="text" @click="dialogFormVisible = true" class="addMsk">添加发票内容</el-button>
        <div class="invoice_form">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="invoiceType"
              label="发票内容">
            </el-table-column>
            <el-table-column
              label="操作">
            <template scope="scope" style="text-align:center;">
              <el-button type="text" size="small" @click="DisplayBlock(scope.$index)" >修改</el-button>
              <el-button type="text" size="small" @click="open2(scope.row)">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>


  <!--修改-->
  <div class="mask"></div>
  <div class="popup change_ticheng">
    <div class="popup_title">修改<span style="font-weight:bold;" v-text="updataText"></span></div>
    <div class="popup_form">
      <div class="popup_form_title"></div>
      <el-input  v-model="updateData" placeholder="请输入内容"></el-input>
    </div>
    <div class="popup_btn">
      <el-button @click="DisplayNone">取消</el-button>
      <el-button type="primary" @click="updateYes">确定</el-button>
    </div>
  </div>

<!--添加发票内容-->
    <el-dialog title="添加发票内容" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="发票内容" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="">取 消</el-button>
        <el-button type="primary" @click="addMask">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
  .invoice{
    width: 100%;
    min-height: 500px;
    margin-top: 30px;
    overflow: hidden;
    position: relative;
  }

  .invoice button{
    tetx-align:center;
    margin: 50px 10% 20px 0;
  }

  .invoice_title{
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    margin-top: 20px;
  }

  .add_invoice_btn{
    width: 100px;
    height: 30px;
    border-radius: 5px;
    background: #1E9FFF;
    color: #FFFFFF;
    text-align: center;
    line-height: 30px;
    position: absolute;
    right: 10%;
    top: 30px;
  }

  .invoice_form{
    width: 80%;
    margin:70px auto;
  }

  .invoice_form table tr td{
    text-align: center;
  }

  .invoice_form table tr th{
    text-align: center;
  }

  .table tr td{
    text-align: center;
    border-color: #303030 !important;
  }
</style>

<script>
  import http from '../../http'
  export default {
    data() {
      return {
        tableData: [],
        updateData: '',
        updataText: '',
        clickIndex: '',
        DeleteId: this.GLOBAL.baseUrl + 'invoiceType/removeInvoiceTypeL',
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
        },
        formLabelWidth: '120px'
      }
    },
    created() {
      this.findList()
    },
    methods: {
      findList() {
        let url = http.apiMap.findInvoiceList
        let data = {
          common: 2
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              console.log(res.body.data.list)
              this.tableData = res.body.data.list
            }
          }
        );
      },
      DisplayBlock(index) {
        this.updateData = this.tableData[index].invoiceType;
        this.clickIndex = index;
        $('.mask').css('display', 'block');
        $('.change_ticheng').css('display', 'block');
      },
      DisplayNone() {
        $('.mask').css('display', 'none');
        $('.change_ticheng').css('display', 'none');
      },


      updateYes() {
        for (let i = 0; i < this.tableData.length; i++) {
          if (i == this.clickIndex) {
            this.tableData[i].invoiceType = this.updateData;
          }
        }
        let updateurl = http.apiMap.modifyInvoiceList;
        let updatedata = {
          common: 2,
          id: this.tableData[0].id,
          invoiceType: this.tableData[0].invoiceType
        };
        this.$http.post(updateurl, updatedata).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              $('.mask').css('display', 'none');
              $('.change_ticheng').css('display', 'none');
              this.getData();
            } else {
              this.$message({
                type: 'waring',
                message: '修改失败'
              });
            }
            ;
            $('.mask').css('display', 'none');
            $('.change_ticheng').css('display', 'none');
          }
        );
      },

      //删除
      open2(row) {
        var data = {'id': row.id, 'common': this.GLOBAL.common}
        var that = this;
        this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var item = this;
          $.ajax({
            type: 'POST',
            url: that.DeleteId,
            data: data,
            success: function (data) {
              if (data.result) {
                item.$message({
                  type: 'success',
                  message: '删除成功!',
                });
               that.findList();
              } else {
                this.$message({
                  type: 'info',
                  message: '删除失败!'
                });
              }
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //添加发票
      addMask() {
        console.log(1)
        this.dialogFormVisible=false;
        let url = http.apiMap.addInvoiceList;
        let data = {
          invoiceType:this.form.name,
          common:1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              console.log(res.body.data.list)
              this.tableData = res.body.data.list
              this.findList()
            }

          }
        );
      },


    }
  }
</script>
