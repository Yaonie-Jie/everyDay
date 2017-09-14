<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item>店主团队管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="team_information">
        <p class="team_information_title">团队信息</p>
        <div class="team_data">
          <div class="team_data_title">团队资料</div>
          <div class="team_level">团队级别：<span>{{teamLevel}}</span></div>
          <div class="team_number">
            团队人数（算团长）：<span>{{teamNum}}</span>人
          </div>
          <div class="team_total_money">团队累计销售金：<span>￥{{teamMoney}}</span></div>
          <div class="team_month_money">团队上月销售金：<span>￥{{teamLastMoney}}</span></div>
        </div>
        <div class="team_structure">
          <table class="form_head">
            <tr>
              <td>
                <el-button type="success" @click="DisplayBlock">添加下级团员</el-button>
              </td>
            </tr>
          </table>
          <div class="junior_league_menber">
            <p>团长下级团员</p>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="companyAccount"
                label="团员账号">
              </el-table-column>
              <el-table-column
                prop="name"
                label="团员昵称">
              </el-table-column>
              <el-table-column
                prop="level"
                label="团员级别">
              </el-table-column>
              <el-table-column
                prop="address"
                label="累计销售金">
              </el-table-column>
              <el-table-column
                prop="lastMonthMoney"
                label="上月销售金">
              </el-table-column>
              <el-table-column
                prop="address"
                label="下级团员">
              </el-table-column>
              <el-table-column
                prop="address"
                label="操作">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="mask"></div>
    <div class="add_junior_member popup">
      <p>添加下级团员</p>
      <el-form ref="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="account"></el-input>
        </el-form-item>
        <el-button type="primary" @click="findTeamaccount">查找</el-button>
      </el-form>


      <div class="hide_tip"><i>此账号已属于团队</i><i>此账号不满足此团员条件</i></div>
      <div class="junior_menber_information">
        <p>团员信息</p>
        <ul>
          <li><i>账号：</i><span>{{shopmanManagey.account}}</span></li>
          <li><i>昵称：</i><span>{{shopmanManagey.name}}</span></li>
          <li><i>注册时间：</i><span>{{shopmanManagey.createOn}}</span></li>
          <li><i>店主级别：</i><span>{{shopmanManagey.level}}</span></li>
          <li><i>升级到高级店主时间：</i><span>{{shopmanManagey.modifiedOn}}</span></li>
          <li><i>累计销售金：</i><span>￥{{shopmanManagey.totalMoney}}</span></li>
          <li><i>上月销售金：</i><span>￥{{shopmanManagey.lastMonthMoney}}</span></li>
          <li><i>累计所得奖励：</i><span>{{shopmanManagey.sumBonus}}</span></li>
          <li><i>上月所得奖励：</i><span>{{shopmanManagey.lastMonthBonus}}</span></li>
        </ul>
        <div class="add_junior_member_btn">
          <el-button @click="DisplayNone">取消</el-button>
          <el-button type="primary" @click="addTeamaccount">添加下级团员</el-button>
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
        id: '',
        tableData: [],
        account:'',
        teamAccount:'',//团长账号
        teamLevel: '',   //团队等级
        teamLastMoney: '', //上月累计销售金
        teamMoney: '',     //团队累计销售金
        data1: ''  ,     //团队级别
        teamNum:'',//团队人数
        shopmanManagey: '',

      }
    },
    created() {
      this.id = this.$route.params.id;
      this.showId()
    },
    methods: {
      DisplayBlock() {
        $('.mask').css('display', 'block');
        $('.add_junior_member').css('display', 'block');
      },

      DisplayNone() {
        $('.mask').css('display', 'none');
        $('.add_junior_member').css('display', 'none');
      },

      showId() {
        let url = http.apiMap.getTeamMessage
        let data = {
          account: this.id,  //团长账号
          common: 2
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data;
              this.teamLastMoney = data.headManage.lastMonthMoney;
              this.teamMoney = data.headManage.money;
              this.teamNum=data.otm.teamNum;
              this.teamAccount=data.headManage.account;//团长账号
              let data1 = data.otm.teamLevel;
              if (data1 == 0) {
                data1 = '公司店主团队_美日美C'
              } else if (data1 == 1) {
                data1 = '公司店主团队'
              } else if (data1 == 2) {
                data1 = '高级店主团队'
              }
              this.teamLevel=data1;
            }
          }
        );
      },
       //查询
      findTeamaccount(){
        let url = http.apiMap.findTeamli;
        let data = {
          common: 2,
          account:this.account,
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.userVO
              this.shopmanManagey = data

              if (data.level == 1) {
                data.level = '个人店主'
              } else if (data.level == 2) {
                data.level = '公司店主'
              } else if (data.level == 3) {
                data.level = '高级店主'
              }
              this.shopmanManagey = data
            } else {
              this.$message({
                type: 'error',
                message: res.body.msg
              });
            }
          }
        )
      },

      addTeamaccount(){
        let url = http.apiMap.addTeamliy;
        let data = {
          common: 2,
          account: this.account,
          userAccount:this.teamAccount,
        };
        this.$http.post(url, data).then(
          function (res) {
            this.shopmanManagey=''
            this.account=''
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: res.body.msg
              });
            } else {
              this.$message({
                type: 'error',
                message: res.body.msg
              });
            }
            $('.mask').css('display', 'none');
            $('.add_junior_member').css('display', 'none');
          }
        )
      },




    }
  }
</script>


<style>
  .team_information {
    margin: 30px 0;
  }

  .team_information_title {
    font-size: 16px;
    line-height: 32px;
    margin-top: 30px;
    text-align: center;
    margin-bottom: 30px;
  }

  .team_data {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 10px 10%;
    box-sizing: border-box;
    border: 1px solid #303030;
  }

  .team_data_title {
    font-size: 16px;
    line-height: 32px;
  }

  .team_number, .team_month_money, .team_total_money, .team_level {
    font-size: 14px;
    line-height: 28px;
  }

  .team_structure {
    width: 100%;
    height: auto;
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px 0 30px 0;
    margin-top: 30px;
    border: 1px solid #303030;
  }

  .team_structure_title {
    font-size: 16px;
    line-height: 32px;
    padding-left: 10%;
  }

  .form_head {
    width: 80%;
    margin:20px auto;
  }

  .form_head tr td {
    height: 32px;
    line-height: 32px;
  }

  .form_head tr td i {
    color: #000000;
    cursor: pointer;
  }

  .junior_league_menber {
    width: 80%;
    margin-left: 10%;
  }

  .junior_league_menber p {
    font-size: 14px;
    line-height: 40px;
    color: #FFFFFF;
    background: #ff3366;
    text-align: center;
    font-weight: bold;
  }

  .add_junior_member p {
    font-size: 16px;
    font-weight: bold;
    color: #303030;
    text-align: center;
    line-height: 32px;
  }

  .el-form-item {
    width: 75%;
  }

  .el-form {
    height: 36px;
  }

  .el-form .el-form-item {
    float: left;
  }

  .el-form .el-button {
    float: right;
  }

  .hide_tip {
    width: 80%;
    height: 28px;
    margin-left: 10%;
    overflow: hidden;
    position: relative;
  }

  .hide_tip i {
    color: #ff3366;
    font-size: 14px;
    line-height: 28px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .junior_menber_information {
    width: 80%;
    margin-left: 10%;
    height: auto;
    overflow: hidden;
    text-align: center;
  }

  .junior_menber_information p {
    font-size: 14px;
    line-height: 28px;
    color: #ffffff;
    background: #ff3366;
    margin-bottom: 20px;
  }

  .junior_menber_information ul li {
    height: 28px;
    font-size: 14px;
    width: 100%;
    text-align: left;
    box-sizing: border-box;
  }

  .add_junior_member_btn {
    margin: 0 auto;
  }

  .add_junior_member_btn .el-button:nth-child(1) {
    float: left;
    margin-left: 25%;
  }

  .add_junior_member_btn .el-button:nth-child(2) {
    float: right;
    margin-right: 25%;
  }
</style>
