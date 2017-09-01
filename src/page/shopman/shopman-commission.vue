<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item>提成管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="commission_">
        <div class="titlee" style="border:0;">系统默认店主提成</div>
        <div class="commission_form">
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
              :span='4'
              prop="brand_logo"
              label="店主级别">
            </el-table-column>
            <el-table-column
              :span='4'
              prop="brand_name"
              label="级别提成">
            </el-table-column>
            <el-table-column
              fixed="right"
              :span='4'
              label="操作">
              <template scope="scope">
                <el-button type="primary" size="small" @click="DisplayBlock(scope.$index)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="mask"></div>
    <div class="popup change_ticheng">
      <div class="popup_title">修改"<span style="font-weight:bold;" v-text="updataText"></span>"默认提成</div>
      <div class="popup_form">
        <div class="popup_form_title"></div>
        <el-input  v-model="updateData" placeholder="请输入内容"></el-input>
      </div>
      <div class="popup_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="updateYes()">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import http from '../../http'

  export default {
    data() {
      return {
        updateData:"店主类型",
        updataText:"0%",
        clickIndex:"0",
        tableData: [
          {
            brand_logo: '个人店主',
            brand_name: '',
            id:"",
            operation: '操作'
          },
          {
            brand_logo: '公司店主',
            brand_name: '',
            operation: '操作'
          },
          {
            brand_logo: '高级店主',
            brand_name: '',
            operation: '操作'
          }
        ]
      }
    },
    created(){
      this.getData()
    },
    methods: {
      getData(){
        let url = http.apiMap.commissionData;
        let data = {
          common: this.GLOBAL.common
        };
        this.$http.post(url,data).then(
          function (res) {
            if (res.body.result) {
              this.tableData[0].brand_name = res.body.data.royalty.personal/100+"%";
              this.tableData[1].brand_name = res.body.data.royalty.company/100+"%";
              this.tableData[2].brand_name = res.body.data.royalty.senior/100+"%";
              this.tableData[0].id = res.body.data.royalty.id;
            }
          }
        );
      },
      DisplayBlock:function(index){
        this.updataText = this.tableData[index].brand_logo;
        this.updateData = this.tableData[index].brand_name;
        this.clickIndex = index;
        $('.mask').css('display','block');
        $('.change_ticheng').css('display','block');
      },
      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.change_ticheng').css('display','none');
      },
      updateYes:function(){

        let updatedataArray=[];
        for(let i=0;i<this.tableData.length;i++){
          if( i==this.clickIndex ){
            this.tableData[i].brand_name = this.updateData;
          }
        }
        let updateurl = http.apiMap.updateCommissionData;
        let updatedata = {
          common: this.GLOBAL.common,
          id:this.tableData[0].id,
          levelRoyalty:this.tableData[0].brand_name.split("%")[0]*100+","+this.tableData[1].brand_name.split("%")[0]*100+","+this.tableData[2].brand_name.split("%")[0]*100,
        };
        this.$http.post(updateurl, updatedata).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.getData();
            }else {
              this.$message({
                type: 'waring',
                message: '修改失败'
              });
            };
            $('.mask').css('display','none');
            $('.change_ticheng').css('display','none');
          }
        );
      }
    }



  }
</script>
<style>
  .commission_{
    width: 100%;
    min-height: 500px;
    margin-top: 30px;
    overflow: hidden;
    position: relative;
  }

  .commission_title{
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    margin-top: 20px;
  }

  .commission_form{
    width: 80%;
    margin-left: 10%;
  }

  .commission_form table tr th{
    text-align: center;
  }

  .commission_form table tr td{
    text-align: center;
  }

  .table tr td{
    text-align: center;
    border-color: #303030 !important;
    width: 33%;
  }

  .commission_operate_btn a{
    color: #ffffff;
    padding: 2px 8px;
    background: #303030;
  }

  .commission_operate_btn a:hover{
    color: #FFFFFF !important;
    text-decoration: none;
  }

  .popup_form .el-input{
    margin:0 auto;
    float:none;
  }
</style>

