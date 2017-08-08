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
              <td>团长账号：13751425455</td>
              <td>团长昵称：-------</td>
              <td>级别：公司店主</td>
              <td>累计销售金:￥122232.23</td>
              <td>上月销售金：￥2434.23</td>
              <td><a href="#">添加下级团员</a></td>
            </tr>
          </table>
          <div class="junior_league_menber">
            <p>团长下级团员</p>
            <el-table
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

            <el-button type="primary" @click="DisplayBlock">全团升级</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="mask"></div>
    <div class="upgrade popup">
      <div class="popup_title">全团升级</div>
      <div class="popup_form">
        <div class="popup_form_title">账号：</div>
        <div class="account_left">18858594797</div>
      </div>
      <div style="margin: 30px 0;color:#ff3366;">必填公司店主资料</div>
      <div class="popup_form">
        <div class="popup_form_title">公司名称</div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="popup_form">
        <div class="popup_form_title">公司注册号</div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="popup_form">
        <div class="popup_form_title">公司营业执照</div>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div class="popup_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<style>
  .junior_league_menber .el-button{
    margin-top: 30px;
  }
  .account_left{
    width: 70%;
    float: left;
    line-height: 36px;
    text-align: left;
  }
</style>

<script>
  export default{
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.upgrade').css('display','block');
      },
      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.upgrade').css('display','none');
      },
      Show1:function(){
        this.$router.push('/ShopmanTeamShow');
      },
      Show2:function(){
        this.$router.push('/ShopmanTeamShow2');
      },
      Show3:function(){
        this.$router.push('/ShopmanTeamShow3');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>
