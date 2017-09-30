<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item>店主团队管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="apply_">
        <div class="titlee" style="border:0;">店主团队列表</div>
        <div class="apply_condition">
          <div class="apply_time" style="float:left;">
            <div class="block">
              <el-button type="success" @click="AddshopmanTeam">添加团队</el-button>
            </div>
          </div>
          <div class="apply_information">
            <input type="text" v-model="teamAccount" placeholder="输入团长账号搜索团队" style="padding:0 10px;height: 30px;"/>
            <el-button type="success" @click="findTeam">搜索</el-button>
          </div>
        </div>
        <div class="apply_form">
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="teamLevel"
              :span="1"
              label="团队级别">
            </el-table-column>
            <el-table-column
              prop="createOn"
              :span="2"
              label="团队生成时间">
            </el-table-column>
            <el-table-column
              prop="teamAccount"
              :span="1"
              label="团长账号">
            </el-table-column>
            <el-table-column
              :span="2"
              prop="teamNum"
              label="团队人数">
            </el-table-column>
            <el-table-column
              :span="5"
              fixed="right"
              label="操作">
              <template scope="scope">
                <el-button type="text" size="small" @click="shows(scope.row)">查看团队信息</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>


    <div class="block fenye">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="count11">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import http from '../../http'

  export default {
    data() {
      return {
        tableData: [],
        teamAccount: '',
        id: '',
        currentPage: 1,
        count11: 1,
      }
    },
    created() {
      this.getTeamList()
    },
    methods: {

      getTeamList() {
        let url = http.apiMap.getTeamList
        let data = {
          common: 1,
          size: 10,
          nowpage: this.currentPage,
        }
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11 = res.body.data.count;
              if(this.count11 == 0){
                $(".fenye").hide()
              }else {
                $(".fenye").show()
              }
              let data = res.body.data.ownerTeamManageList;
              let arr = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].teamLevel == 0) {
                  data[i].teamLevel = '公司店主团队_美日美C'
                } else if (data[i].teamLevel == 1) {
                  data[i].teamLevel = '公司店主团队'
                } else if (data[i].teamLevel == 2) {
                  data[i].teamLevel = '高级店主团队'
                }
                arr.push(data[i])
              }
              this.tableData = arr
            }
          }
        )
      },
      findTeam() {
        if(this.teamAccount == ''){
          this.$message({
            type: 'info',
            message: '请输入账号搜索'
          });
        }else {
          let url = http.apiMap.findTeam
          let data = {
            teamAccount: this.teamAccount,
            common: 2
          }
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '查询成功'
                });
                let arr = []
                let data = res.body.data.ownerTeamManage;
                if (data.teamLevel == 0) {
                  data.teamLevel = '公司店主团队_美日美C'
                } else if (data.teamLevel == 1) {
                  data.teamLevel = '公司店主团队'
                } else if (data.teamLevel == 2) {
                  data.teamLevel = '高级店主团队'
                }
                arr.push(data)
                this.tableData = arr
              } else {
                this.$message({
                  type: 'warning',
                  message: res.body.msg
                });
              }
            }
          )
        }

      },

      DisplayBlock2: function () {
        $('.mask').css('display', 'block');
        $('.add_team').css('display', 'none');
        $('.add_team2').css('display', 'block');
      },
      DisplayNone: function () {
        $('.mask').css('display', 'none');
        $('.add_team2').css('display', 'none');
      },


      AddshopmanTeam () {
        this.$router.push('/AddShopmanTeam/')
      },
      //分页跳转
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getTeamList()
      },
      shows(row) {
        if(row.teamLevel == '高级店主团队') {
          this.$router.push('/ShopmanTeamShow/' + row.teamAccount);//高级
        }else if(row.teamLevel == '公司店主团队'){
          this.$router.push('/ShopmanTeamShow2/' + row.teamAccount);//公司
        }
      }
    }
  }
</script>


<style scoped="scoped">
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
</style>


