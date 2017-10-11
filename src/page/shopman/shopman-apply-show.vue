<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ShopmanApply' }">店主申请管理</el-breadcrumb-item>
        <el-breadcrumb-item>申请信息详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="apply_show" v-bind="shopmanApply">
        <div class="apply_show_title">
          申请信息详情
        </div>
        <div class="apply_show_time clear_">
          <div class="left_">申请时间</div>
          <div class="right_">{{shopmanApply.createOn}}</div>
        </div>
        <div class="apply_account_number clear_">
          <div class="left_">申请账号</div>
          <div class="right_">{{shopmanApply.account}}</div>
        </div>
        <div class="current_level clear_">
          <div class="left_">当前级别</div>
          <div class="right_">{{shopmanApply.level}}</div>
        </div>
        <div class="apply_show_information clear_">
          <div class="left_">提交资料</div>
          <div class="right_">{{shopmanApply.message}}</div>
        </div>
        <div class="submited_information clear_">
          <div class="left_">提交资料</div>
          <div class="right_ information">
            <div>姓名：<span>{{shopmanApply.name}}</span></div>
            <div>身份证号：<span>{{shopmanApply.idNumber}}</span></div>
            <div class="id_positive_img">
              <img :src="shopmanApply.idCardPhoto" alt="">
            </div>
            <div class="id_positive_img">
              <img :src="shopmanApply.idCardPhotof" alt="">
            </div>
            <div>支付宝账号：<span>{{shopmanApply.alipay}}</span></div>
            <div>微信支付账号：<span>{{shopmanApply.weChat}}</span></div>
          </div>
        </div>
        <div class="accumulated_sales clear_">
          <div class="left_">累计销售金：</div>
          <div class="right_">¥{{shopmanApply.money/100}}</div>
        </div>
        <div class="subordinate_team clear_">
          <div class="left_">所属团队：</div>
          <div class="right_">无</div>
        </div>

        <div class="apply_show_btn">
          <el-button type="primary" size="lager" @click="open2(shopmanApply)">通过</el-button>
          <el-button type="danger" size="lager" @click="open3(shopmanApply)">驳回</el-button>
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
        common: 1,
        account: '',
        shopmanApply: ''
      }
    },
    created() {
      this.account = this.$route.params.account;
      this.getapplyManage()
    },
    methods: {
      getapplyManage() {
        let url = http.apiMap.ownerApplyMessage;
        let data = {
          common: 1,
          account: this.account
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              console.log(res.body.data.ownerApplicationVo)
              this.shopmanApply = res.body.data.ownerApplicationVo


              let level = res.body.data.ownerApplicationVo.level;
              if (level == 0) {
                level = '普通用户'
              } else if (level == 1) {
                level = '个人店主'
              } else if (level == 2) {
                level = '公司店主'
              } else if (level == 3) {
                level = '高级店主'
              }
              this.shopmanApply.level = level;
            }
          }
        )
      },
      open2(row) {
        this.$confirm('此操作将通过改申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let passurl = http.apiMap.passAudit;
          let passdata = {
            common: 2,
            account: row.account
          };
          this.$http.post(passurl, passdata).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '成功通过审核!'
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      open3(row) {
        this.$confirm('此操作将驳回该申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let rejecturl = http.apiMap.rejectAudit;
          let rejectdata = {
            common: 2,
            account: row.account
          };
          this.$http.post(rejecturl, rejectdata).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '驳回成功!'
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消驳回'
          });
        });
      },
    },

  };


</script>


<style>
  .apply_show {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    min-height: 500px;
    border: 1px solid #303030;
    margin-top: 30px;
    overflow: hidden;
  }

  .apply_show_title {
    width: 100%;
    padding: 0 30%;
    box-sizing: border-box;
    text-align: center;
    line-height: 60px;
    font-size: 18px;
    margin-top: 20px;
  }

  .apply_show_time,
  .apply_account_number,
  .current_level,
  .apply_show_information,
  .submited_information,
  .accumulated_sales,
  .subordinate_team,
  .apply_show_btn {
    width: 400px;
    margin: 25px auto;
    box-sizing: border-box;
    font-size: 16px;
  }

  .apply_show_btn {
    margin-bottom: 100px;
  }

  .apply_reject_pplication, .apply_through {
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    float: left;
    cursor: pointer;
  }

  .apply_reject_pplication {
    background: #838383;
    float: left;
    margin-left: 100px;
    color: #FFFFFF;
  }

  .apply_through {
    background: #1E9FFF;
    float: right;
    margin-right: 100px;
    color: #FFFFFF;
  }

  .apply_through:hover {
    background: #178FE5;
  }

  .clear_ {
    overflow: hidden;
  }

  .left_ {
    float: left;
  }

  .right_ {
    float: left;
    margin-left: 50px;
  }

  .information div {
    margin-top: 30px;
  }

  .information div:first-child {
    margin-top: 0;
  }

  .id_positive_img {
    width: 300px;
    height: 200px;
  }
  .id_positive_img img{
    width: 100%;
    height:100%;
  }
</style>
