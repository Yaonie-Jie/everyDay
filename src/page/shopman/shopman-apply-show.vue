<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item >店主管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ShopmanApply' }">店主申请管理</el-breadcrumb-item>
        <el-breadcrumb-item>申请信息详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="apply_show">
        <div class="apply_show_title">
          申请信息详情
        </div>
        <div class="apply_show_time clear_">
          <div class="left_">申请时间</div>
          <div class="right_">2016/05/11<span>12:00:09</span></div>
        </div>
        <div class="apply_account_number clear_">
          <div class="left_">申请账号</div>
          <div class="right_">15029292929</div>
        </div>
        <div class="current_level clear_">
          <div class="left_">当前级别</div>
          <div class="right_">普通用户</div>
        </div>
        <div class="apply_show_information clear_">
          <div class="left_">提交资料</div>
          <div class="right_">升级到个人店主</div>
        </div>
        <div class="submited_information clear_">
          <div class="left_">提交资料</div>
          <div class="right_ information">
            <div>姓名：<span>刘三刀</span></div>
            <div>身份证号：<span>1234567890123456</span></div>
            <div class="id_positive_img"></div>
            <div class="id_opposite_img"></div>
            <div>支付宝账号：<span>18858594797</span></div>
            <div>微信支付账号：<span>nch18330821708</span></div>
          </div>
        </div>
        <div class="accumulated_sales clear_">
          <div class="left_">累计销售金：</div>
          <div class="right_">¥1232.00</div>
        </div>
        <div class="subordinate_team clear_">
          <div class="left_">所属团队：</div>
          <div class="right_">无</div>
        </div>

        <div class="apply_show_btn">
          <div class="apply_reject_pplication">驳回申请</div>
          <div class="apply_through">通过申请</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .apply_show{
    width: 100%;
    max-width:800px;
    margin:0 auto;
    min-height: 500px;
    border: 1px solid #303030;
    margin-top: 30px;
    overflow: hidden;
  }

  .apply_show_title{
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
  .apply_show_btn{
    width:400px;
    margin:25px auto;
    box-sizing: border-box;
    font-size: 16px;
  }

  .apply_show_btn{
    margin-bottom: 100px;
  }

  .apply_reject_pplication,.apply_through{
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    float: left;
    cursor: pointer;
  }

  .apply_reject_pplication{
    background: #838383;
    float: left;
    margin-left: 100px;
    color: #FFFFFF;
  }

  .apply_through{
    background: #1E9FFF;
    float: right;
    margin-right: 100px;
    color: #FFFFFF;
  }

  .apply_through:hover{
    background: #178FE5;
  }

  .clear_{
    overflow: hidden;
  }

  .left_{
    float: left;
  }

  .right_{
    float: left;
    margin-left: 50px;
  }

  .information div{
    margin-top: 30px;
  }

  .information div:first-child{
    margin-top: 0;
  }

  .id_opposite_img,.id_positive_img{
    width: 300px;
    height: 150px;
    background: #ccc;
  }
</style>
