<template>
  <div id="boxs">

    <el-breadcrumb separator="/">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户意见反馈</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="header">


      <select id="orderState" class="chosetime" style="margin-left:10%;">
        <option>请选择版本</option>
        <option>版本1.0.1</option>
        <option>版本1.0.2</option>
        <option>版本1.0.3</option>
      </select>



      <div class="block chosetime">
        <span class="demonstration">选择时间</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          placeholder="选择日期范围">
        </el-date-picker>
      </div>


    </div>
    <div style="clear:both;"></div>
    <div>
      <h3>意见反馈</h3>
      <div class="advice">
      <hr>
      <div class="usertext">
        <p class="textleft">这个app目前用起来还是很流畅，各位加油</p>
        <p class="textright">版本2.0.1</p>
      </div>
      <div class="useradvice">
        <span>用户18733665522</span>
        <span>2017年8月23日</span>
      </div>
    </div>
      <div class="advice">
        <hr>
        <div class="usertext">
          <p class="textleft">这个app目前用起来还是很流畅，各位加油</p>
          <p class="textright">版本2.0.1</p>
        </div>
        <div class="useradvice">
          <span>用户18733665522</span>
          <span>2017年8月23日</span>
        </div>
      </div>
    </div>




  <!--<div class="block">-->
    <!--<el-pagination-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page.sync="currentPage"-->
      <!--:page-size="10"-->
      <!--layout="prev, pager, next, jumper"-->
      <!--:total="count11">-->
    <!--</el-pagination>-->
  <!--</div>-->


  </div>
</template>

<script>
  export default{
    data(){
      return{
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        value1: '',
//        currentPage: 1,
//        count11: 1,

      }
    },
    created(){
//      this.createdList()
    },
    motheds:{
//      //分页跳转
//      handleCurrentChange(val) {
//        this.currentPage = val;
//        this.getOutfinance()
//      },
//      createdList(){
//        let url=http.apiMap
//        let data={
//          nowpage: this.currentPage,
//          size: 10,
//          common:1
//        };
//        this.$http.post(url,data).then(
//          function(res){
//            if(res.body.result){
//              this.count11 = res.body.data.count
//            }
//          }
//        )
//      }
    },
  }
</script>

<style>
  .chosetime{
    float:left;
    margin-left:10%;
    margin-top:20px;
  }
  h3{
    line-height:30px;
  }
  hr{
    color:#aaa;
    margin-bottom:10px;
  }
  .usertext{
    height:40px;
    width:100%;
  }
  .textleft{
    float:left;
    font-size:16px;
    line-height:30px;
    text-align:left;
  }
  .textright{
    float:right;
    color:#aaa;
    font-size:14px;
  }
  .useradvice{
    width:100%;
    height:30px;
    font-size:14px;
    color:#888;
  }
  .advice{
    height:100px;
  }
</style>
