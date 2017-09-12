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
              label="级别提成">
              <template scope="scope">
                <el-input v-show="scope.row.edit" size="small" v-model="scope.row.brand_name"></el-input>
                <span v-show="!scope.row.edit">{{ scope.row.brand_name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              :span='4'
              label="操作">
              <template scope="scope">
                <el-button :type="scope.row.edit?'success':'primary'" @click='scope.row.edit=!scope.row.edit'
                           size="small" icon="edit">{{scope.row.edit ? '完成' : '编辑'}}
                </el-button>
              </template>
            </el-table-column>a
          </el-table>
        </div>
        <div style="text-align: center;margin-top: 20px">
          <el-button type="primary" size="lager" @click="updataData">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import http from '../../http'

  export default {
    data() {
      return {
        updateData: "店主类型",
        updataText: "0%",
        clickIndex: "0",
        tableData: [],
        id:''
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        let url = http.apiMap.commissionData;
        let data = {
          common: this.GLOBAL.common
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.royalty;
              this.id=data.id;
              this.tableData = [
                {
                  brand_logo: '个人店主',
                  brand_name: data.personal / 100 + '%',
                  id: "",
                  operation: '操作',
                  edit:false
                },
                {
                  brand_logo: '公司店主',
                  brand_name: data.company / 100 + '%',
                  operation: '操作',
                  edit:false

                },
                {
                  brand_logo: '高级店主',
                  brand_name: data.senior / 100 + '%',
                  operation: '操作',
                  edit:false

                }
              ]
            }
          }
        );
      },
      updataData() {
        let updateurl = http.apiMap.updateCommissionData;
        let updatedata = {
          common: 1,
          personal: this.tableData[0].brand_name.replace(/%/,'')*100,
          company: this.tableData[1].brand_name.replace(/%/,'')*100,
          senior: this.tableData[2].brand_name.replace(/%/,'')*100,
        };
        this.$http.post(updateurl, updatedata).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.getData();
            } else {
              this.$message({
                type: 'info',
                message: res.body.msg
              });
            }
          }
        );
      }
    }


  }
</script>
<style>
  .commission_ {
    width: 100%;
    min-height: 500px;
    margin-top: 30px;
    overflow: hidden;
    position: relative;
  }

  .commission_title {
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    margin-top: 20px;
  }

  .commission_form {
    width: 80%;
    margin-left: 10%;
  }

  .commission_form table tr th {
    text-align: center;
  }

  .commission_form table tr td {
    text-align: center;
  }

  .table tr td {
    text-align: center;
    border-color: #303030 !important;
    width: 33%;
  }

  .commission_operate_btn a {
    color: #ffffff;
    padding: 2px 8px;
    background: #303030;
  }

  .commission_operate_btn a:hover {
    color: #FFFFFF !important;
    text-decoration: none;
  }

  .popup_form .el-input {
    margin: 0 auto;
    float: none;
  }
</style>

