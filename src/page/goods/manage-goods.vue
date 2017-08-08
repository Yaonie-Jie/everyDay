<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="add_goods">
        <el-button type="success" class="right addGoods" @click="shows()">添加商品</el-button>
      </div>

      <div class="goods_search">
        <div class="left">
          <i style="margin-top: 10px;">搜索</i>
          <select name="" style="margin-top: 10px;" >
            <option value="">一级分类</option>
          </select>
          <select name=""  style="margin-top: 10px;">
            <option value="">二级分类</option>
          </select>
        </div>
        <div class="right">
          <input placeholder="输入商品名称搜索" style="height:30px;"></input>
          <el-button type="success" style="margin-top: 0px;!important;">搜索</el-button>
        </div>
      </div>
      <div class="add_goods_form">
        <el-table
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="serial_number"
            :span="1"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            :span="2"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="stock"
            :span="1"
            label="库存">
          </el-table-column>
          <el-table-column
            :span="2"
            prop="freight_template"
            label="运费模板">
          </el-table-column>
          <el-table-column
            :span="5"
            fixed="right"
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small">上移</el-button>
              <el-button type="text" size="small">下移</el-button>
              <el-button type="text" size="small">置顶</el-button>
              <el-button type="text" size="small">置底</el-button>
              <el-button type="text" size="small" @click="DisplayBlock">修改</el-button>
              <el-button type="text" size="small" @click="open2()">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="mask"></div>

    <div class="change_brand_information popup">
      <div class="popup_title">修改商品信息</div>

      <div class="popup_form">
        <div class="popup_form_title">商品名称</div>
        <el-input v-model="input" placeholder=""></el-input>
      </div>

      <div class="popup_form">
        <div class="popup_form_title">商品库存</div>
        <el-input v-model="input" placeholder=""></el-input>
      </div>

      <div class="popup_form">
        <div class="popup_form_title">运费模板</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="popup_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<style>
  .add_goods{
    width:100%;
    margin: 30px 0;
    overflow: hidden;
  }

  .add_goods button{
    float: right;
    margin-right: 10%;
  }

  .goods_search{
    width: 80%;
    overflow: hidden;
    margin: 0 0 30px 10%;
  }

  .goods_search i{
    float: left;
    margin-left: 10px;
    line-height: 32px;
  }

  .goods_search select{
    float: left;
    height: 36px;
    margin-left: 10px;
  }

  .goods_search .el-input{
    float: left;
    margin-left: 10px;
  }

  .goods_search .el-button{
    margin-left: 10px;
  }

  .add_goods_form{
    width: 80%;
    margin-left: 10%;
  }

  .add_goods_form table tr td{
    text-align: center;
  }

  .add_goods_form table tr th{
    text-align: center;
  }
</style>

<script>
  export default {
    methods:{
      open2() {
        this.$confirm('此操作将删除该商品信息, 是否继续?', '提示', {
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
      shows:function(){
        this.$router.push('/AddGoods');
      },
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.change_brand_information').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.change_brand_information').css('display','none');
      },
    },
    data() {
      return {
        input: '',
        tableData: [{
          serial_number: '1',
          goods_name: '商品名称',
          stock: '111',
          freight_template: '运费模板'
        }, {
          serial_number: '2',
          goods_name: '商品名称',
          stock: '222',
          freight_template: '运费模板'
        }, {
          serial_number: '3',
          goods_name: '商品名称',
          stock: '333',
          freight_template: '运费模板'
        }, {
          serial_number: '4',
          goods_name: '商品名称',
          stock: '444',
          freight_template: '运费模板'
        }]
      }
    }
  }
</script>
