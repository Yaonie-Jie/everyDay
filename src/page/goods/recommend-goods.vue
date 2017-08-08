<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统推荐商品</el-breadcrumb-item>
      </el-breadcrumb>
        <div class="titlee" style="border:none;">系统推荐列表</div>
        <div class="boxx" style="max-width:800px;margin:0 auto;">
        <el-table
          :data='tableData'
          border>
          <el-table-column
            label="排序"
            prop="date">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品">
          </el-table-column>
          <el-table-column
            prop="province"
            label="推荐模式">
          </el-table-column>
          <el-table-column
            prop="addTime"
            label="添加时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small">上移</el-button>
              <el-button type="text" size="small">下移</el-button>
              <el-button type="text" size="small">置顶</el-button>
              <el-button type="text" size="small">置底</el-button>
              <el-button type="text" size="small" @click="DisplayBlock">修改</el-button>
              <el-button type="text" size="small" @click="open3()">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
        <div class="boxx" style="max-width:800px;margin:0 auto;">
          <el-pagination
            layout="prev, pager, next"
            :total="50" class="right" style=" margin:0;">
          </el-pagination>
        </div>
      <ul class="show-img">
        <li>
          <div class="titlee">添加系统推荐-链接到商品详情</div>
          <div class="show-shop">
            <el-form label-width="150px" class="demo-ruleForm" style="width:80%;">
              <el-form-item
                label="链接商品"
                prop="goods">
                <el-input type="age" auto-complete="off" placeholder="输入商品名称查找商品"></el-input>
              </el-form-item>
              <el-form-item
                label="推荐页展示图片"
                prop="imgs">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">图片中请包含价格与标题</div>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="open2">添加</el-button>
              </el-form-item>
            </el-form>
          </div>
        </li>
        <li>
          <div class="titlee">添加系统推荐-链接到图文详情</div>
          <div class="show-shop">
            <el-form label-width="150px" class="demo-ruleForm" style="width:80%;">
              <el-form-item
                label="推荐页标题"
                prop="goods">
                <el-input type="age" auto-complete="off" placeholder="输入推荐页标题"></el-input>
              </el-form-item>
              <el-form-item
                label="推荐页展示图片"
                prop="imgs">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">图片中请包含价格与标题</div>
                </el-upload>
              </el-form-item>
              <el-form-item
                label="推荐页图文介绍"
                prop="goods">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="图文介绍">
                </el-input>
              </el-form-item>
              <el-form-item
                label="链接商品"
                prop="goods">
                <el-input type="age" auto-complete="off" placeholder="输入商品名称查找商品"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="open2">添加</el-button>
              </el-form-item>
            </el-form>
          </div>
        </li>
      </ul>
    </div>

    <div class="mask"></div>

    <div class="popup change_recommend">
      <div class="popup_title">修改系统推荐商品</div>
      <div class="popup_form">
        <div class="popup_form_title">商品名称</div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="popup_form">
        <div class="popup_form_title">推荐模式</div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="popup_form">
        <div class="popup_form_title">添加时间</div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="popup_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>
<style>
  .show-img{
    border-top:1px solid #838383;
    max-width:800px;
    margin:50px auto 0;
    display: flex;
  }
  .show-img li{
    width:50%;
    float: left;
    border-right:1px solid #838383;
    border-bottom:1px solid #838383;
  }
  .show-img li:nth-child(2){
    border-right:0;
  }
  .demo-ruleForm{
    margin: 30px 0!important;
  }
</style>

<script>
  export default {
   data() {
        return {
          tableData: [
            {
              date:'1',
              name: '品牌logo',
              province: '品牌名称',
              addTime: '品牌介绍',
              operation: '操作'
            },
            {
              date:'2',
              name: '品牌logo',
              province: '品牌名称',
              addTime: '品牌介绍',
              operation: '操作'
            },
            {
              date:'3',
              name: '品牌logo',
              province: '品牌名称',
              addTime: '品牌介绍',
              operation: '操作'
            },
            {
              date:'4',
              name: '品牌logo',
              province: '品牌名称',
              addTime: '品牌介绍',
              operation: '操作'
            }]
        }
      },
    methods: {
      open2() {
        this.$confirm('此操作将添加此商品, 是否继续?', '提示', {
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
      open3() {
        this.$confirm('此操作将删除该推荐商品, 是否继续?', '提示', {
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
        $('.change_recommend').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.change_recommend').css('display','none');
      }
    }
  }
</script>

