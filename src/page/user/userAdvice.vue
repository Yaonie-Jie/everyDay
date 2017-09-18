<template>
  <div id="boxs">

    <el-breadcrumb separator="/">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户意见反馈</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="header">

      <select id="orderState" class="chosetime" style="margin-left:10%;" v-model="choseba">
        <!--<option>请选择版本</option>-->
        <option value="1">版本1.0.1</option>
        <option value="2">版本1.0.2</option>
        <option value="3">版本1.0.3</option>
      </select>

      <div class="block chosetime">
        发生时间：
        <el-date-picker
          v-model="time"
          type="daterange"
          placeholder="选择日期范围">
        </el-date-picker>
        <el-button type="success" @click="findOrder">搜索</el-button>
      </div>

    </div>
    <div style="clear:both;"></div>
    <div>
      <h3>意见反馈</h3>
      <div class="advice" v-for="i in feedbackList">
        <hr>
        <div class="usertext">
          <p class="textleft">{{i.content}}</p>
          <p class="textright">{{i.version}}</p>
        </div>
        <div class="useradvice">
          <span>{{i.createBy}}</span>
          <span>{{i.createOn}}</span>
        </div>
      </div>
    </div>

  <div class="block">
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

  export default{
    data(){
      return{
        currentPage: 1,
        count11: 1,
        time: '',  //时间搜索
        startTime: '',
        endTime: '',
        feedbackList:[],
        choseba:'',
      }
    },
    created(){
      this.createdList()
    },
    methods:{
      //分页跳转
      handleCurrentChange(val) {
        this.currentPage = val;
        this.createdList()
      },
      createdList(){
        let url=http.apiMap.findFeed
        let data={
          nowpage: this.currentPage,
          size: 10,
          common:1
        };
        this.$http.post(url,data).then(
          function(res){
            if(res.body.result){
              this.count11 = res.body.data.count


              let data = res.body.data.feedbackList;
              let arr = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].version == 1) {
                  data[i].version = '版本1.0.1'
                } else if (data[i].version == 2) {
                  data[i].version = '版本1.0.2'
                } else if (data[i].version == 3) {
                  data[i].version = '版本1.0.3'
                }
                arr.push(data[i])
                this.feedbackList = arr;
              }



            }
          }
        )
      },
      //搜索订单
      findOrder() {
        var paddNum = function (num) {    //如果是一位数就补一个0
          num += "";
          return num.replace(/^(\d)$/, "0$1");
        }

        function FormatDate(strTime) {  //转换时间格式
          if (strTime) {
            var date = new Date(strTime);
            return date.getFullYear() + "-" + paddNum(date.getMonth() + 1) + "-" + paddNum(date.getDate());
          } else {
            return ''
          }
        }
        let url = http.apiMap.findFeedback;
        let data = {
          common: 1,
          size: 10,
          nowpage: this.currentPage,
          startTime: FormatDate(this.time[0]),
          endTime: FormatDate(this.time[1]),
          version:this.choseba
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11 = res.body.data.count;

              let data = res.body.data.feedbackList;
              let arr = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].version == 1) {
                  data[i].version = '版本1.0.1'
                } else if (data[i].version == 2) {
                  data[i].version = '版本1.0.2'
                } else if (data[i].version == 3) {
                  data[i].version = '版本1.0.3'
                }
                arr.push(data[i])
             this.feedbackList = arr;
              }
            }
          }
        );
      },
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
