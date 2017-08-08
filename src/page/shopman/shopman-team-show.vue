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
          <div class="team_level">团队级别：<span>公司店主团队</span></div>
          <div class="team_number">团队人数（算团长）：<span>61</span>人,其中高级店主<span>0</span>人,公司店主<span>1</span>人,个人店主<span>60</span>人</div>
          <div class="team_total_money">团队累计销售金：<span>￥2332312.00</span></div>
          <div class="team_month_money">团队上月销售金：<span>￥123123.00</span></div>
        </div>
        <div class="team_structure">
          <div class="team_structure_title">团队结构</div>
          <table class="form_head">
            <tr>
              <td>团长账号：美日美c</td>
              <td>团长昵称：-------</td>
              <td>级别：公司店主</td>
              <td>累计销售金:￥122232.23</td>
              <td>上月销售金：￥2434.23</td>
              <td><i @click="DisplayBlock">添加下级团员</i></td>
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
                label="日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
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
          <el-input></el-input>
        </el-form-item>
        <el-button type="primary">查找</el-button>
      </el-form>


      <div class="hide_tip"><i>此账号已属于团队</i><i>此账号不满足此团员条件</i></div>
      <div class="junior_menber_information">
        <p>团员信息</p>
        <ul>
          <li>账号：12345678901</li>
          <li>昵称：----</li>
          <li>注册时间：2015-01-01  12:00</li>
          <li>店主级别：高级店主</li>
          <li>升级到高级店主时间：2015-01-01  12:00</li>
          <li>累计销售金：￥1000</li>
          <li>上月销售金：￥100</li>
          <li>累计所得奖励：￥100</li>
          <li>上月所得奖励：￥10</li>
        </ul>
        <div class="add_junior_member_btn">
          <el-button @click="DisplayNone">取消</el-button>
          <el-button type="primary">添加下级团员</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .team_information{
    margin: 30px 0;
  }
  .team_information_title{
    font-size: 16px;
    line-height: 32px;
    margin-top: 30px;
    text-align: center;
    margin-bottom: 30px;
  }
  .team_data{
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 10px 10%;
    box-sizing: border-box;
    border: 1px solid #303030;
  }
  .team_data_title{
    font-size: 16px;
    line-height: 32px;
  }
  .team_number,.team_month_money,.team_total_money,.team_level{
    font-size: 14px;
    line-height: 28px;
  }
  .team_structure{
    width: 100%;
    height: auto;
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px 0 30px 0;
    margin-top: 30px;
    border: 1px solid #303030;
  }
  .team_structure_title{
    font-size: 16px;
    line-height: 32px;
    padding-left: 10%;
  }
  .form_head{
    width: 80%;
    margin-left: 10%;
  }
  .form_head tr td{
    height: 32px;
    line-height: 32px;
  }
  .form_head tr td i{
    color: #000000;
    cursor: pointer;
  }
  .junior_league_menber{
    width: 80%;
    margin-left: 10%;
  }
  .junior_league_menber p{
    font-size: 14px;
    line-height: 40px;
    color: #FFFFFF;
    background: #ff3366;
    text-align: center;
    font-weight: bold;
  }
  .add_junior_member p{
    font-size: 16px;
    font-weight: bold;
    color: #303030;
    text-align: center;
    line-height: 32px;
  }
  .el-form-item{
    width: 75%;
  }
  .el-form{
    height: 36px;
  }
  .el-form .el-form-item{
    float: left;
  }
  .el-form .el-button{
    float: right;
  }
  .hide_tip{
    width: 80%;
    height: 28px;
    margin-left: 10%;
    overflow: hidden;
    position: relative;
  }
  .hide_tip i{
    color: #ff3366;
    font-size: 14px;
    line-height: 28px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .junior_menber_information{
    width: 80%;
    margin-left: 10%;
    height: auto;
    overflow: hidden;
    text-align: center;
  }
  .junior_menber_information p{
    font-size: 14px;
    line-height: 28px;
    color: #ffffff;
    background: #ff3366;
    margin-bottom: 20px;
  }
  .junior_menber_information ul li{
    height: 28px;
    font-size: 14px;
    width: 100%;
    text-align: left;
    box-sizing: border-box;
  }
  .add_junior_member_btn{
    margin: 0 auto;
  }
  .add_junior_member_btn .el-button:nth-child(1){
    float: left;
    margin-left: 25%;
  }
  .add_junior_member_btn .el-button:nth-child(2){
    float: right;
    margin-right: 25%;
  }
</style>

<script>
  export default{
    methods: {
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.add_junior_member').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.add_junior_member').css('display','none');
      },
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
