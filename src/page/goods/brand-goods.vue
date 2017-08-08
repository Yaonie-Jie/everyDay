<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品品牌</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="brand_">
        <div class="titlee" style='border:0;'>
          商品品牌列表
        </div>
        <el-button type="success" @click="DisplayBlock" class="right">添加商品品牌</el-button>
        <div class="brand_form">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="picture"
              :span='2'
              label="品牌logo">
              <template scope="scope">
              <img v-bind:src="scope.row.picture" alt="">
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :span='2'
              label="品牌名称">
            </el-table-column>
            <el-table-column
              prop="details"
              :span='3'
              label="品牌介绍">
            </el-table-column>
            <el-table-column
              :span='5'
              label="操作">
               <template scope="scope">
                 <el-button type="text" size="small" @click="Up(scope.row)" v-if="scope.row.number!=1">上移</el-button>
                 <el-button type="text" size="small" @click="Down(scope.row)" v-show="scope.row.number!=DataLength">下移</el-button>
                 <el-button type="text" size="small" @click="Top(scope.row)" v-if="scope.row.number!=1">置顶</el-button>
                 <el-button type="text" size="small" @click="Bottom(scope.row)" v-show="scope.row.number!=DataLength">置底</el-button>
                 <el-button type="text" size="small" @click="DisplayBlock2">修改</el-button>
                 <el-button type="text" size="small" @click="open2(scope.row)">删除</el-button>
                 <span></span>
               </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="mask"></div>

    <div class="add_commodity_brand popup">
      <div class="add_commodity_brands_title popup_title">添加商品品牌</div>
      <div class="brand_logo">
        <div class="brand_logo_title">品牌logo</div>
        <div class="brand_logo_img"></div>
      </div>
      <div class="brand_name">
        <div class="brand_name_title">品牌名称</div>
        <el-input></el-input>
      </div>
      <div class="brand_introduce">
        <div class="brand_introduce_title">品牌介绍</div>
        <el-input
          type="textarea"
          :rows="2"
        >
        </el-input>
      </div>
      <div class="add_commodity_brand_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </div>

    <div class="change_brand popup">
      <div class="popup_title">修改商品信息</div>
      <div class="popup_form">
        <div class="popup_form_title">品牌logo</div>
        <div class="brand_logo_img"></div>
      </div>
      <div class="popup_form">
        <div class="popup_form_title">品牌名称</div>
        <el-input></el-input>
      </div>
      <div class="popup_form">
        <div class="popup_form_title">品牌介绍</div>
        <el-input
          type="textarea"
          :rows="2"
          >
        </el-input>
      </div>
      <div class="add_commodity_brand_btn">
        <el-button @click="DisplayNone2">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        tableData: [],
        TableDataUrl:this.GLOBAL.baseUrl+'productBrand/findProductBrandList',
        TopUrl:this.GLOBAL.baseUrl+'productBrand/modifyProductBrandTop',
        BottomUrl:this.GLOBAL.baseUrl+'productBrand/modifyProductBrandBottom',
        UpDownUrl:this.GLOBAL.baseUrl+'productBrand/modifyProductBrandPosition',
        DeleteUrl:this.GLOBAL.baseUrl+'productBrand/removeProductBrandByIdL',
        DataLength:'',
        currentChange:1
      }
    },
    created: function(){
      this.getTable()//定义方法
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
              tableList=data.data.productBrandList;
            }else{
              swal({title:'',text:data.msg})
            }
          }
        })
        this.tableData=tableList;
        this.DataLength=tableList[tableList.length-1].number;
      },
      //上移
      Up:function(row){
         var nowID=row.id;
         var nowNumber=row.number;
         var table=this.tableData;
         var FrontID;
         var FrontNumber;
         for(var i=0;i<table.length;i++){
             if(table[i].id==nowID){
               FrontID=table[i-1].id;
               FrontNumber=table[i-1].number;
             }
         }
         var arr=[{'id':nowID,'number':nowNumber-1},{'id':FrontID,'number':FrontNumber+1}];
         var data={'list':JSON.stringify(arr),'common':this.GLOBAL.common};
         var that=this;
         $.ajax({
           type:'POST',
           url:this.UpDownUrl,
           data:data,
           success:function(data){
              if(data.result){
                  that.getTable()
              }else{
                  swal({title:'',text:data.msg})
              }
           }
         })

      },
      //下移
      Down:function(row){
        var nowID=row.id;
        var nowNumber=row.number;
        var table=this.tableData;
        var FrontID;
        var FrontNumber;
        for(var i=0;i<table.length;i++){
          if(table[i].id==nowID){
            FrontID=table[i+1].id;
            FrontNumber=table[i+1].number;
          }
        }
        var arr=[{'id':nowID,'number':nowNumber+1},{'id':FrontID,'number':FrontNumber-1}];
        var data={'list':JSON.stringify(arr),'common':this.GLOBAL.common};
        var that=this;
        $.ajax({
          type:'POST',
          url:this.UpDownUrl,
          data:data,
          success:function(data){
            if(data.result){
              that.getTable()
            }else{
              swal({title:'',text:data.msg})
            }
          }
        })
      },
      //置顶
      Top:function(row){
        var data={'id':row.id,'number':row.number,'common':this.GLOBAL.common};
        var that=this;
        $.ajax({
          type:'POST',
          url:that.TopUrl,
          data:data,
          success:function(data){
             if(data.result){
                 that.getTable();
             }
          }
        })
      },
      //置底
      Bottom:function(row){
        var data={'number':row.number,'common':this.GLOBAL.common};
        var that=this;
        $.ajax({
          type:'POST',
          url:that.BottomUrl,
          data:data,
          success:function(data){
            if(data.result){
              that.getTable();
            }
          }
        })
      },
      //删除
      open2(row) {
        var data={'id':row.id,'common':this.GLOBAL.common}
        var that=this;
        this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var item=this;
          $.ajax({
            type:'POST',
            url:that.DeleteUrl,
            data:data,
            success:function(data){
                if(data.result){
                  item.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  that.getTable();
                }else{
                  this.$message({
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
      },
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.add_commodity_brand').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.add_commodity_brand').css('display','none');
      },
      DisplayBlock2:function(){
        $('.mask').css('display','block');
        $('.change_brand').css('display','block');
      },

      DisplayNone2:function(){
        $('.mask').css('display','none');
        $('.change_brand').css('display','none');
      }
    },

  }
</script>
<style>
  .el-button+.el-button{
    margin:10px 10px 0px!important;
  }
  .el-button{
    margin:10px 10px 0px!important;
  }
  .brand_{
    width: 100%;
    min-height: 500px;
    margin-top: 30px;
    overflow: hidden;
    position: relative;
  }
  .brand_title{
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    margin-top: 20px;
  }
  .brand_form{
    width: 80%;
    margin:60px auto 0;
  }
  .brand_form table tr td{
    text-align: center;
  }
  .brand_form table tr th{
    text-align: center;
  }
  .table tr td{
    text-align: center;
    border-color: #303030 !important;
  }
  .table tr td:nth-child(4){
    width: 35%;
  }
  .brand_operate_btn a{
    margin: 0 5px;
    color: #303030;
  }
  .brand_logo,.brand_name,.brand_introduce{
    width: 70%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 20px;
  }
  .brand_logo_title,.brand_name_title,.brand_introduce_title{
    float: left;
    line-height: 36px;
  }
  .brand_logo_img{
    width: 200px;
    height: 120px;
    background: #cccccc;
    float: left;
    margin-left: 20px;
  }
  .brand_name .el-input{
    width: 75%;
    float: left;
    margin-left: 20px;
  }
  .brand_introduce .el-textarea{
    width: 75%;
    float: left;
    margin-left: 20px;
  }
  .add_commodity_brand_btn{
    overflow: hidden;
    margin: 0 auto;
    margin-top: 30px;
  }
  .add_commodity_brand_btn .el-button:nth-child(1){
    float: left;
    margin-left: 30%;
  }
  .add_commodity_brand_btn .el-button:nth-child(2){
    float: right;
    margin-right: 30%;
  }
</style>
