<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>客服电话</el-breadcrumb-item>
        <el-breadcrumb-item>客服电话</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="phone">
        <div class="phone_title">客服电话</div>
        <div class="current_phone">
          <p>当前客服电话：<i class="current_phonenumber">18858594797</i><el-button type="primary" @click="DisplayBlock">修改</el-button></p>
        </div>

      </div>
    </div>
    <div class="mask"></div>
    <div class="modify_phone popup">
      <div class="modify_ipt">
        <div class="modify_ipt_title">当前电话修改：</div>
        <el-input placeholder="手机号或座机号"></el-input>
      </div>
      <div class="modify_btns">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">修改</el-button>
      </div>
    </div>
  </div>
</template>

<style>
  .phone{
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 20px;
    position: relative;
  }
  .current_phone{
    margin-top: 30px;
  }
  .current_phone button{
    margin-left: 30px;
  }
  .modify_ipt{
    height: 36px;
    line-height: 36px;
    width: 100%;
    margin-top: 40px;
    overflow: hidden;
  }
  .modify_ipt_title{
    float: left;
    line-height: 36px;
  }
  .modify_ipt .el-input{
    width: 75%;
    float: left;
    margin-left: 20px;
  }
  .modify_btns{
    margin: 0 auto;
    margin-top: 40px;
  }
  .modify_btns .el-button:nth-child(1){
    float: left;
    margin-left: 25%;
  }
  .modify_btns .el-button:nth-child(2){
    float: right;
    margin-right: 25%;
  }
</style>

<script>
  export default{
    methods: {
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.modify_phone').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.modify_phone').css('display','none');
      }
    }
  }
</script>
