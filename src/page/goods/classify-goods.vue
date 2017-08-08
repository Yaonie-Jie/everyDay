<template>
  <div id="box">
    <div class="box">
      <div style="width:100%;float:left;">
        <el-breadcrumb separator="/" class="left">
          <el-breadcrumb-item>业务管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="titlee" style='border:0;'>
                  商品分类
        </div>
        <el-button type="success" class="right" @click="DisplayBlock">添加一级商品分类</el-button>
      </div>
      <ul class="boxx">
         <li class="shows" v-for="item in tableData">
           <div class="titlee" v-text="item.name"></div>
           <ul>
             <li class="self">
               <div class="left left-title">一级商品</div>
               <ul class="right right-list">
                 <div class="img-box">
                   <img v-bind:src="item.picture">
                 </div>
                 <li>
                   <span class="left" style="font-size: 20px;color:#ff3366;margin-right:30px;"  v-text="item.name"></span>
                   <el-button type="success" class="right" @click="DisplayBlock2">添加二级商品分类</el-button>
                 </li>
                 <li>
                   <el-button :plain="true" type="info">修改</el-button>
                   <el-button @click="open2">删除</el-button>
                   <el-button :plain="true" type="info">上移</el-button>
                   <el-button :plain="true" type="info">下移</el-button>
                 </li>
               </ul>
             </li>
             <li class="border-top left lis" v-if="item.data.length>0">
               <div class="left two-type">二级商品</div>
               <ul class="left lists">
                 <li v-for="list in item.data">
                   <span class="margin30" v-text="list.name" :span="4">礼袋</span>
                   <el-button :plain="true" type="info">修改</el-button>
                   <el-button @click="open2">删除</el-button>
                   <el-button :plain="true" type="info" @click="up">上移</el-button>
                   <el-button :plain="true" type="info">下移</el-button>
                 </li>
               </ul>
             </li>
           </ul>
         </li>
      </ul>
    </div>
    <div class="mask"></div>
    <div class="add_Class_a popup">
      <div class="add_class_a_title popup_title">添加一级分类</div>
      <div class="class_a_name">
        <div class="class_a_name_title">一级分类名称：</div>
        <el-input placeholder=""></el-input>
      </div>
      <div class="class_a_img">
        <div class="class_a_img_title">一级分类图片：</div>
        <div class="class_a_img_box">
          <el-upload
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </div>
      <div class="add_class_a_btns">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </div>
    <div class="add_Class_b popup">
      <div class="add_class_b_title popup_title">添加二级分类</div>
      <div class="class_b_name">
        <div class="class_b_name_title">二级分类名称：</div>
        <el-input placeholder=""></el-input>
      </div>
      <div class="add_class_b_btns">
        <el-button @click="DisplayNone2">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        TableDataUrl:this.GLOBAL.baseUrl+'productType/findProductTypeList',
        currentChange:1,
        SumPage:20,
        tableData:[]
      }


    },
    created: function(){
      this.getTable()
    },
    methods: {
      //获取列表信息
      getTable:function(){
        var tableList=[];
        var sumPage;
        $.ajax({
          type:'POST',
          data:{'common':this.GLOBAL.common,'size':10,'nowpage':this.currentChange},
          async:false,
          url:this.TableDataUrl,
          success:function (data) {
            if(data.result){
              tableList=data.data.findProductTypeList;
              var parentList=[];
              var ChildList=[];
              //寻找子元素
              for(var i=0;i<tableList.length;i++){
                for(var j=0;j<tableList.length;j++){
                  if(tableList[j].pId==tableList[i].id){
                    ChildList.push(tableList[j]);
                  }
                }
              }
              //寻找父元素--删除子元素就是父元素啦
              for(var i=0;i<ChildList.length;i++){
                for(var j=0;j<tableList.length;j++)
                {
                  if(tableList[j].id==ChildList[i].id){
                    tableList.splice(j,1);
                    j=j-1;
                  }
                }
              }
              parentList=tableList;
              //把子元素push到父元素
              for(var i=0;i<parentList.length;i++){
                parentList[i].data=[];
                for(var j=0;j<ChildList.length;j++){
                  if(ChildList[j].pId==parentList[i].id){
                    parentList[i].data.push(ChildList[j])
                  }
                }
              }
                this.tableData=parentList;
                console.log(this.tableData);
//              sumPage=data.data.count;
            }else{
                swal({title:'',text:data.msg})
            }
          }
        })
        this.tableData=tableList;
        console.log(this.tableData)
//        this.SumPage=sumPage;
      },
      //分页
      handleCurrentChange(val) {
        this.currentChange=val;
        this.getTable()
      },
      //上移
      MoveUp(){
          var obj = $(this).parent('li');
          console.log(obj)
     },

      open2() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.add_Class_a').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.add_Class_a').css('display','none');
      },

      DisplayBlock2:function(){
        $('.mask').css('display','block');
        $('.add_Class_b').css('display','block');
      },

      DisplayNone2:function(){
        $('.mask').css('display','none');
        $('.add_Class_b').css('display','none');
      },
    }
  }
</script>
<style>
  .lis{
    width:100%;
  }
  .lists{
    border-left:1px solid #838383;
    padding:20px;
    box-sizing: border-box;
  }
  .two-type{
    width: 10%;
    min-width: 54px;
    padding:18px;
    height:100%;
  }
  .boxx{
    width:100%;
    padding:20px 0;
    margin-top: 40px;
  }
  .shows{
    width:80%;
    min-width:700px;
    height:auto;
    border:1px solid #838383;
    overflow: hidden;
    margin:50px auto 0;
  }
  .self{
    width:100%;
    float: left;
    display: flex;
  }
  .img-box{
    width:200px;
    height:200px;
    overflow: hidden;
  }
  .img-box img{
    width:100%;
  }
  .left-title{
    border-right:1px solid #838383;
    width:10%;
    min-width:50px;
    display: flex;
    align-items: center;
    padding:20px;
    height:342px;
  }
  .titlee{
    width:100%;
    height:50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color:#ff3366;
    border-bottom:1px solid #838383;
  }
  .right-list{
    width:90%;
    box-sizing: border-box;
    padding:20px;
    height:auto;
  }
  .right-list:nth-child(1){
    border:0;
  }
  .right-list li{
    width:100%;
    margin: 10px;
    display: flex;
    line-height: 36px;
  }
  .el-button {
    margin: 0 20px 0 0;
  }
  .margin30{
    margin-right:30px;
  }
  .class_a_name,
  .class_b_name{
    width: 80%;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 30px;
  }
  .class_a_name .class_a_name_title,
  .class_b_name .class_b_name_title
  {
    float: left;
    width: 25%;
    line-height: 36px;
    text-align: left;
  }
  .class_a_name .el-input,
  .class_b_name .el-input
  {
    width: 70%;
    float: right;
  }
  .class_a_img,
  .class_b_img
  {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 30px;
  }
  .class_a_img .class_a_img_title,
  .class_b_img .class_b_img_title
  {
    width: 30%;
    float: left;
    text-align: left;
    line-height: 36px;
  }
  .class_a_img_box,
  .class_b_img_box
  {
    width: 100%;
    height: auto;
    float: left;
  }
  .add_class_a_btns,
  .add_class_b_btns
  {
    margin: 0 auto;
    margin-top: 40px;
  }
  .add_class_a_btns .el-button:nth-child(1),
  .add_class_b_btns .el-button:nth-child(1)
  {
    float: left;
    margin-left: 25%;
  }
  .add_class_a_btns .el-button:nth-child(2),
  .add_class_b_btns .el-button:nth-child(2)
  {
    float: right;
    margin-right: 25%;
  }
  .border-top{
    border-top:1px solid #838383;
  }
</style>
