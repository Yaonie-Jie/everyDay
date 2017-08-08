<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>后台账号管理</el-breadcrumb-item>
        <el-breadcrumb-item>账号角色与权限管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="titlee" style='border:0;'>
          商品标签
      </div>
      <div class="good_tags">
        <div class="good_tag1">
          <div class="tag_name1">商品标签1：性别</div>
          <div class="tag_list1">
            <div class="tag_list1_title">性别</div>
            <ul>
              <li>男</li>
              <li>女</li>
            </ul>
          </div>
        </div>
        <div class="good_tag2">
          <div class="tag_name2">商品标签2：年龄</div>
          <div class="tag_list2">
            <div class="tag_list2_title">年龄</div>
            <ul>
              <li>60后</li>
              <li class="bordertop">70后</li>
              <li class="bordertop">80后</li>
              <li class="bordertop">90后</li>
              <li class="bordertop">00后</li>
            </ul>
          </div>
        </div>
        <div class="good_tag3">
          <div class="tag_name3">
            <div class="tag_name3_title">商品标签3：兴趣</div>
            <el-button type="success right" @click="DisplayBlock">添加兴趣</el-button>
          </div>
          <div class="tag_list3">
            <el-table
              :data="tableData"
              border
              style="width:250px;">
              <el-table-column
                prop="interest"
                label="兴趣"
                :span="2"
              >
              </el-table-column>
              <el-table-column
                :span="4"
                label="操作"
              >
                <template scope="scope">
                  <el-button type="text" size="small" @click="Change(scope.row)">修改</el-button>
                  <el-button type="text" size="small" @click="Delete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="mask"></div>
    <div class="add_interests popup">
      <div class="add_interests_title popup_title">添加兴趣</div>
      <div class="add_interests_ipt">
        <div class="add_interests_name">兴趣名称</div>
        <el-input v-model="AddInterest" placeholder="请输入内容"></el-input>
      </div>

      <div class="add_interests_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="SumbitInterest">确定</el-button>
      </div>
    </div>
    <div class="add_interests2 popup">
      <div class="add_interests_title popup_title">修改兴趣</div>
      <div class="add_interests_ipt">
        <div class="add_interests_name">兴趣名称</div>
        <el-input v-model="ChangeInterest" placeholder="请输入内容"></el-input>
      </div>

      <div class="add_interests_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="ChangesInterest">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData:[],
        AddInterest:'',
        ChangeInterest:'',
        ChangeID:'',
        DelectID:'',
        TableDataUrl:this.GLOBAL.baseUrl+'productTagInterest/findProductTagInterestList',
        AddUrl:this.GLOBAL.baseUrl+'productTagInterest/addProductTagInterest',
        ChangeUrl:this.GLOBAL.baseUrl+'productTagInterest/modifyProductTagInterest',
        DelectUrl:this.GLOBAL.baseUrl+'productTagInterest/removeProductTagInterestL'
      }
    },
    created: function(){
      this.getTable();
    },
    methods: {
      getTable:function(){
          var list=[];
          var that=this;
          var data={'common':this.GLOBAL.common}
          $.ajax({
            type:'POST',
            url:this.TableDataUrl,
            data:data,
            success:function(data){
               if(data.result){
                   list=data.data.list;
                   that.tableData=list;

               }else{
                   swal({title:'',text:'获取数据失败'})
               }
            }
          })
      },
      //添加兴趣
      SumbitInterest:function(){
         var data={'common':this.GLOBAL.common,'interest':this.AddInterest}
         var that=this;
         if(this.AddInterest==''){
             swal({title:'',text:'兴趣不能为空'})
         }else{
             $.ajax({
               type:'POST',
               url:this.AddUrl,
               data:data,
               success:function(data){
                 if(data.result){
                   $('.mask').css('display','none');
                   $('.add_interests').css('display','none');
                   that.AddInterest='';
                   that.getTable();
                 }
                 swal({title:'',text:data.msg})

               }
             })
         }

      },
      //添加兴趣弹框
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.add_interests').css('display','block');
      },
      //修改兴趣按钮
      Change:function(row){
        this.ChangeInterest=row.interest;
        this.ChangeID=row.id;
        $('.mask').css('display','block');
        $('.add_interests2').css('display','block');
      },
      //修改兴趣
      ChangesInterest:function(){
          var data={'common':this.GLOBAL.common,'interest':this.ChangeInterest,'id':this.ChangeID};
          var that=this;
          $.ajax({
            type:'POST',
            url:this.ChangeUrl,
            data:data,
            success:function(data){
                if(data.result){
                  that.ChangeInterest='';
                  that.ChangeId='';
                  that.getTable();
                  $('.mask').css('display','none');
                  $('.add_interests2').css('display','none');
                }
                swal({title:'',text:data.msg})
            }
          })

      },
      //取消
      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.add_interests').css('display','none');
        $('.add_interests2').css('display','none');
      },
      //删除
      Delete:function(row){
        var thats=this;
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var that=this;
          $.ajax({
            type:'POST',
            data:{'common':this.GLOBAL.common,'id':row.id},
            url:thats.DelectUrl,
            success:function (data) {
                console.log(data)
              if(data.result){
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                thats.getTable();
              }else{
                that.$message({
                  type: 'info',
                  message: '删除失败!'
                });
              }
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>
<style>
  li{
    list-style: none;
  }
  .good_tags{
    width: 100%;
    height: auto;
    min-height: 500px;
    overflow: hidden;
    padding: 0 20px 100px 20px;
    box-sizing: border-box;
    margin-top: 30px;
  }
  .good_tag1,.good_tag2{
    width: 50%;
    margin-top: 30px;
    padding: 0 25%;
    overflow: hidden;
  }
  .tag_name1,.tag_name2,.tag_name3{
    float: left;
    line-height: 30px;
    font-size: 16px;
  }
  .tag_name3 .add_interest{
    border-radius: 5px;
    background: #1E9FFF;
    color: #FFFFFF;
    text-decoration: none;
    margin-top: 20px;
    display: block;
    text-align: center;
  }
  .tag_list1,.tag_list2,.tag_list3{
    float: left;
    margin-left: 50px;
  }
  .tag_list1_title,.tag_list2_title,.tag_list3_title{
    width: 250px;
    height: 30px;
    background: #303030;
    color: #FFFFFF;
    text-align: center;
    line-height: 30px;
  }
  .tag_list1 ul{
    width: 250px;
    height: auto;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .tag_list1 ul li{
    width: 248px;
    height: 28px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #303030;
  }
  .tag_list1 ul li:last-child{
    border-top: 0;
  }
  .tag_list2 ul{
    width: 250px;
    height: auto;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .tag_list2 ul li{
    width: 248px;
    height: 28px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #303030;
  }
  .tag_list3 ul{
    width: 250px;
    height: auto;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .tag_list3 ul li{
    width: 248px;
    height: 36px;
    text-align: center;
    line-height: 38px;
    border: 1px solid #303030;
    vertical-align: middle;
  }
  .bordertop{
    border-top: 0 !important;
  }
  .tag_list3 ul li a{
    padding: 2px 10px;
    color: #FFFFFF;
    text-decoration: none;
    background: #303030;
    margin: 0 10px 0 20px;
    font-size: 14px;
    line-height: 30px;
    display: inline;
  }
  .tag_list3 ul li span{
    padding: 2px 10px;
    color: #FFFFFF;
    text-decoration: none;
    background: #303030;
    font-size: 14px;
  }
  .good_tag3{
    width: 70%;
    margin-top: 30px;
    padding: 0 5% 0 25%;
    overflow: hidden;
  }
  .tag3_tip{
    width: 250px;
    height: 88px;
    border: 1px solid #303030;
    text-align: center;
    line-height: 90px;
    color: #303030;
    float: left;
    margin-left: 30px;
  }
  .add_interests_ipt{
    width: 80%;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 30px;
  }
  .add_interests_name{
    width: 20%;
    float: left;
    line-height: 36px;
  }
  .add_interests_ipt .el-input{
    width: 75%;
    float: left;
  }
  .add_interests_btn{
    margin-top: 30px;
  }
</style>
