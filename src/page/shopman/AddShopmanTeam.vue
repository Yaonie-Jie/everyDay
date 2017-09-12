<template>
  <div id="box">
    <div class="add_team">

      <div class="add_team_ul">
        <div class="add_team_title popup_title">添加团队-选择团长</div>
        <div class="add_team_search">
          <div class="add_team_search_title">店主账号：</div>
          <el-input placeholder="输入团长账号（需是无团队的高级店主或公司店主）" v-model="account"></el-input>
          <el-button type="primary" @click="findTeamli">查询</el-button>
        </div>
      </div>

      <p class="add_team_search_tip" style="display:none;"><i>此账号不符合团长的条件</i><i>此账号已属于团队</i></p>

      <div class="add_team_li" style="display:none;">
        <div class="teamer_information">团长信息</div>
        <ul class="teamer_information_list">
          <li><i>账号：</i><span>{{shopmanManage.account}}</span></li>
          <li><i>昵称：</i><span>{{shopmanManage.name}}</span></li>
          <li><i>注册时间：</i><span>{{shopmanManage.createOn}}</span></li>
          <li><i>店主级别：</i><span>{{shopmanManage.level}}</span></li>
          <li><i>升级到高级店主时间：</i><span>{{shopmanManage.canLevel}}</span></li>
          <li><i>累计销售金：</i><span>￥{{shopmanManage.totalMoney}}</span></li>
          <li><i>上月销售金：</i><span>￥{{shopmanManage.lastMonthMoney}}</span></li>
          <li><i>累计所得奖励：</i><span>{{shopmanManage.sumBonus}}</span></li>
          <li><i>上月所得奖励：</i><span>{{shopmanManage.lastMonthBonus}}</span></li>
        </ul>
      </div>

      <div class="add_this_teamer">
        <el-button type="primary" size="lager" @click="addTeamli">添加其做团长</el-button>
      </div>

    </div>


    <div class="add_team2" style="display:none;">
      <div class="add_team2_title popup_title">添加团队-团长下级团员添加</div>
      <div class="add_team_search">
        <div class="add_team_search_title">店主账号：</div>
        <el-input placeholder="输入团长账号（需是无团队的高级店主或公司店主）" v-model="teamAccount
"></el-input>
        <el-button type="primary" @click="findTeamy">查询</el-button>
      </div>
      <div class="add_team_y">
        <div class="teamer_information">团员</div>
        <ul class="teamer_information_list">
          <li><i>账号：</i><span>{9</span></li>
          <li><i>昵称：</i><span>{{shopmanManagey.name}}</span></li>
          <li><i>注册时间：</i><span>{{shopmanManagey.createOn}}</span></li>
          <li><i>店主级别：</i><span>{{shopmanManagey.level}}</span></li>
          <li><i>升级到高级店主时间：</i><span>{{shopmanManagey.canLevel}}</span></li>
          <li><i>累计销售金：</i><span>￥{{shopmanManagey.totalMoney}}</span></li>
          <li><i>上月销售金：</i><span>￥{{shopmanManagey.lastMonthMoney}}</span></li>
          <li><i>累计所得奖励：</i><span>{{shopmanManagey.sumBonus}}</span></li>
          <li><i>上月所得奖励：</i><span>{{shopmanManagey.lastMonthBonus}}</span></li>
        </ul>
        <!--<div class="add_tip3"><i>添加其做团长下级团员</i>您正在创建高级店主团队</div>-->
        <!--<div class="add_this_teamer"><el-button type="primary"  size="small">添加其做团长</el-button></div>-->
        <!--<div class="already_team">您已指定139281982918做团长</div>-->
        <div class="add_team2_btns">
          <el-button @click="returnshowTeam">完成，返回团队管理列表</el-button>
          <el-button type="primary" @click="addTeamy">完成，继续添加团员</el-button>
        </div>
      </div>

    </div>
</template>

<script>
  import http from '../../http'

  export default {
    data() {
      return {
        account: '',
        shopmanManage: '',
        shopmanManagey: {},
        teamAccount: '',
        state: ''
      }
    },
    created() {
    },
    methods: {
      findTeamli() {
        let url = http.apiMap.findTeamli;
        let data = {
          common: 2,
          account: this.account
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              $('.add_team_li').css('display', 'block');
              $(".add_this_teamer").show()
              let data = res.body.data.userVO
              if (data.level == 1) {
                data.level = '个人店主'
              } else if (data.level == 2) {
                data.level = '公司店主'
              } else if (data.level == 3) {
                data.level = '高级店主'
              }

              this.shopmanManage = data
            } else {
              this.$message({
                type: 'error',
                message: res.body.msg
              });
            }
          }
        )
      },

      addTeamli() {
        this.$confirm('是否添加其做团长', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = http.apiMap.addTeamli;
          let data = {
            common: 1,
            account: this.shopmanManage.account,
          };
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: res.body.msg
                });
                $('.add_team_li').css('display', 'none');
                $('.add_team_ul').css('display', 'none');
                $('.add_this_teamer').css('display', 'none');
                $('.add_team2').css('display', 'block');
              } else {
                this.$message({
                  type: 'error',
                  message: res.body.msg,
                });
              }
            }
          )
        }).catch(() => {
          $('.add_team_li').css('display', 'none');
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },

      findTeamy() {
        let url = http.apiMap.findTeamli;
        let data = {
          common: 2,
          account: this.teamAccount
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              $('.add_team_y').css('display', 'block');
              let data = res.body.data.userVO
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

      addTeamy() {
        let url = http.apiMap.addTeamliy;
        let data = {
          common: 2,
          account: this.teamAccount
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              console.log(1)
              this.$router.push('/ShopmanTeamShow/' + this.teamAccount);
            } else {
              this.$message({
                type: 'error',
                message: res.body.msg
              });
            }
          }
        )
      },

      returnshowTeam() {
        this.$router.push('/ShopmanTeam/');
      },

      DisplayBlock2: function () {
        $('.add_team').css('display', 'none');
        $('.add_team2').css('display', 'block');
      },
      DisplayNone: function () {
        $('.mask').css('display', 'none');
        $('.add_team2').css('display', 'none');
      },

    }
  }
</script>


<style>
  .add_team_search {
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    line-height: 36px;
    overflow: hidden;
  }

  .add_team_search_title {
    float: left;
    width: 10%;
  }

  .add_team_search .el-input {
    float: left;
    width: 72%;
    margin-left: 10px;
  }

  .add_team_search .el-button {
    float: left;
    margin: 0;
    margin-left: 10px;
  }

  .add_team_search_tip {
    margin-left: 20%;
    position: relative;
    height: 28px;
    display: flex;
  }

  .add_team_search_tip i {
    color: #ff3366;
    font-size: 14px;
    line-height: 28px;
  }

  .teamer_information {
    margin-top: 20px;
  }

  .teamer_information_list {
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
    overflow: hidden;
    border: 1px solid #303030;
    padding: 30px 0;
  }

  .teamer_information_list li {
    height: 28px;
    line-height: 28px;
  }

  .teamer_information_list li i {
    display: inline-block;
    float: left;
    width: 40%;
    text-align: left;
    margin-left: 10%;
  }

  .teamer_information_list li span {
    display: inline-block;
    float: left;
    width: 40%;
    text-align: left;
  }

  .add_team .add_tip,
  .add_tip2,
  .already_team {
    color: #ff3366;
    text-align: left;
    line-height: 28px;
    margin-left: 20%;
  }

  .add_tip2 {
    margin-left: 10%;
    margin-top: 20px;
  }

  .add_tip3 {
    text-align: left;
    color: #ff3366;
    margin: 20px 0;
    margin-left: 20%;
  }

  .add_tip3 i {
    color: #303030;
    margin-right: 20px;
  }

  .add_this_teamer {
    width: 60%;
    margin: 0 auto;
    overflow: hidden;
  }

  .add_this_teamer .el-button {
    float: right;
    margin: 0;
  }

  .add_small_title {
    width: 80%;
    margin: 0 auto;
    color: #FFFFFF;
    background: #ff3366;
  }

  .add_team2_btns {
    width: 100%;
    margin: 0 auto;
    margin-top: 40px;
    overflow: hidden;
  }

  .add_team2_btns .el-button:nth-child(1) {
    float: left;
    margin-left: 10%;
  }

  .add_team2_btns .el-button:nth-child(2) {
    float: right;
    margin-right: 10%;
  }

  .add_this_teamer {
    display: none;
  }
</style>


