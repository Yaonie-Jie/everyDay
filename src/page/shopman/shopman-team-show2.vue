<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>店主管理</el-breadcrumb-item>
        <el-breadcrumb-item>店主团队管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="team_information">
        <div class="team_operation_btn">
          <el-button type="primary" @click="Show1()">公司店主团队--美日美C团队</el-button>
          <el-button type="primary" @click="Show2()">高级店主团队</el-button>
          <el-button type="primary" @click="Show3()">公司店主团队</el-button>
        </div>

        <p class="team_information_title">团队信息</p>
        <div class="team_data">
          <div class="team_data_title">团队资料</div>
          <div class="team_level">团队级别：<span>高级店主团队</span></div>
          <div class="team_number">团队人数（算团长）：<span>61</span>人,其中高级店主<span>1</span>人,公司店主<span>60</span>人,个人店主<span>160</span>人</div>
          <div class="team_total_money">团队累计销售金：<span>￥2332312.00</span></div>
          <div class="team_month_money">团队上月销售金：<span>￥123123.00</span></div>
        </div>

        <div class="team_structure">
          <div class="team_structure_title">团队结构</div>
          <table class="form_head">
            <tr>
              <td>团长账号：13829182121</td>
              <td>团长昵称：-------</td>
              <td>级别：高级店主</td>
              <td>累计销售金:￥122232.23</td>
              <td>上月销售金：￥2434.23</td>
              <td></td>
            </tr>
          </table>
          <div class="junior_league_menber">
            <p>团长下级团员</p>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="团员账号">
              </el-table-column>
              <el-table-column
                prop="name"
                label="团员昵称">
              </el-table-column>
              <el-table-column
                prop="address"
                label="团员级别">
              </el-table-column>
              <el-table-column
                prop="address"
                label="累计销售金">
              </el-table-column>
              <el-table-column
                prop="address"
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


            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="团员账号">
              </el-table-column>
              <el-table-column
                prop="name"
                label="团员昵称">
              </el-table-column>
              <el-table-column
                prop="address"
                label="团员级别">
              </el-table-column>
              <el-table-column
                prop="address"
                label="累计销售金">
              </el-table-column>
              <el-table-column
                prop="address"
                label="上月销售金">
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
  </div>
</template>

<style>
  .junior_league_menber .el-table:nth-child(3){
    margin-top: 30px;
  }
</style>
<script>
  export default{
    methods: {
      Show1:function(){
        this.$router.push('/ShopmanTeamShow');
      },
      Show2:function(){
        this.$router.push('/ShopmanTeamShow2');
      },
      Show3:function(){
        this.$router.push('/ShopmanTeamShow3');
      }

    }
  }
</script>
