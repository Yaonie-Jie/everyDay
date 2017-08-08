<template>
  <div id="box">
    <div class="box">
      <div class="add_goods_title mid">添加商品</div>

      <div class="add_goods_img">
        <div class="add_goods_img_title">商品图片</div>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>

      <div class="add_goods_name">
        <div class="add_goods_name_title">商品名称</div>
        <el-input v-model="input" placeholder=""></el-input>
      </div>

      <div class="add_goods_saleprice">
        <div class="add_goods_saleprice_title">商品销售价</div>
        <el-input v-model="input" placeholder=""></el-input>
      </div>

      <div class="add_goods_costprice">
        <div class="add_goods_costprice_title">商品成本价</div>
        <el-input v-model="input" placeholder=""></el-input>
      </div>

      <div class="add_goods_stock">
        <div class="add_goods_stock_title">商品库存</div>
        <el-input v-model="input" placeholder=""></el-input>
      </div>

      <div class="add_goods_classify">
        <div class="add_goods_classify_title">商品分类</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="add_goods_brands">
        <div class="add_goods_brands_title">商品品牌</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="add_goods_words">
        <div class="add_goods_words_title">商品详情</div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </div>

      <div class="add_goods_specifications">
        <div class="add_goods_specifications_title">用户可选规格：</div>
        <div class="add_goods_specifications_btn">
          <el-button type="primary" @click="DisplayBlock">添加规格</el-button>
          <el-button type="warning" @click="DisplayBlock2">修改、删除规格</el-button>
        </div>
      </div>

      <div class="add_goods_commission">
        <div class="add_goods_commission_title">店主可得提成金</div>
        <div class="add_goods_commission_ipt"><el-input v-model="input" placeholder="请输入内容"></el-input>*（销售价-成本价）</div>

      </div>

      <p class="add_goods_commission_tip">所有店主最多可分得提成金20.21元</p>

      <div class="add_goods_hierarchycommission">
        <div class="add_goods_hierarchycommission_title">店主层级提成</div>
        <table class="add_goods_hierarchycommission_table"  border="1" cellpadding="0" cellspacing="0">
          <tr>
            <td>个人店主</td>
            <td>公司店主</td>
            <td>高级店主 </td>
          </tr>
          <tr>
            <td>50%</td>
            <td>30%</td>
            <td>20% </td>
          </tr>
        </table>
      </div>

      <div class="add_goods_freight">
        <div class="add_goods_freight_title">运费模板</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="add_goods_btn">
        <el-button>取消</el-button>
        <el-button type="primary" @click="open2">确定</el-button>
      </div>
    </div>

    <div class="mask"></div>

    <div class="add_specifications popup">
      <div class="popup_form">
        <div class="popup_form_title">规格名称</div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>

      <div class="add_choose_specifications">
        <el-checkbox v-model="checked">红色</el-checkbox>
        <el-checkbox v-model="checked">黄色</el-checkbox>
      </div>

      <div class="add_specifications_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </div>

    <div class="modify_specifications popup">
      <div class="popup_form">
        <div class="popup_form_title">规格名称</div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>

      <div class="add_choose_specifications">
        <el-checkbox v-model="checked">红色</el-checkbox>
        <el-checkbox v-model="checked">黄色</el-checkbox>
      </div>

      <div class="popup_btn">
        <el-button @click="open3">删除此规格</el-button>
        <el-button type="primary" @click="DisplayNone2">修改</el-button>
      </div>
    </div>


  </div>
</template>

<style>
  .add_goods_img,
  .add_goods_name,
  .add_goods_saleprice,
  .add_goods_costprice,
  .add_goods_stock,
  .add_goods_classify,
  .add_goods_brands,
  .add_goods_words,
  .add_goods_specifications,
  .add_goods_commission,
  .add_goods_hierarchycommission,
  .add_goods_freight,
  .add_goods_commission_tip{
    width: 40%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }

  .add_goods_commission_tip{
    margin-top: 0;
    color: #ff3366;
  }

  .add_goods_img_title,
  .add_goods_name_title,
  .add_goods_saleprice_title,
  .add_goods_costprice_title,
  .add_goods_stock_title,
  .add_goods_classify_title,
  .add_goods_brands_title,
  .add_goods_words_title,
  .add_goods_specifications_title,
  .add_goods_commission_title,
  .add_goods_hierarchycommission_title,
  .add_goods_freight_title{
    float: left;
    line-height: 36px;
    text-align: left;
    width: 25%;
    font-size: 16px;
  }

  .add_goods_img .el-upload,
  .add_goods_name .el-input,
  .add_goods_saleprice .el-input,
  .add_goods_costprice .el-input,
  .add_goods_stock .el-input,
  .add_goods_classify .el-select,
  .add_goods_brands .el-select,
  .add_goods_specifications_btn,
  .add_goods_words .el-textarea,
  .add_goods_commission .add_goods_commission_ipt,
  .add_goods_hierarchycommission .add_goods_hierarchycommission_table,
  .add_goods_freight .el-select{
    float: left;
    width: 70%;
  }

  .add_goods_img .upload-demo{
    width: 70%;
    float: left;
  }

  .add_goods_words .el-textarea{
    margin-top: 15px;
  }

  .add_goods_words .el-textarea:nth-child(2){
    margin-top: 0;
  }

  .add_goods_words .el-textarea:nth-child(3){
    margin-left: 25%;
  }

  .add_goods_words .el-textarea:nth-child(4){
    margin-left: 25%;
  }

  .add_goods_classify .el-select{
    width: 33%;
    float: left;
  }
  .add_goods_classify .el-select:nth-child(2){
    margin-right: 4%;
  }

  .add_goods_commission_ipt .el-input{
    width: 40%;
    float: left;
  }

  .add_goods_hierarchycommission_table{
    border:0;
    cellspacing:0;
    cellpadding:0;
  }

  .add_goods_hierarchycommission_table tr td{
    border: 1px solid #303030;
    border-right: 0;
    border-bottom: 0;
    text-align: center;
    line-height: 36px;
    height: 36px;
  }

  .add_goods_hierarchycommission_table tr td:nth-child(3){
    border-right: 1px solid #303030;
  }

  .add_goods_hierarchycommission_table tr:nth-of-type(2) td{
    border-bottom: 1px solid #303030;
  }

  .add_goods_btn{
    width: 40%;
    margin: 0 auto;
    margin-top: 50px;
    overflow: hidden;
  }
  .add_goods_btn .el-button:nth-child(1){
    float: left;
    margin-left: 20%;
  }
  .add_goods_btn .el-button:nth-child(2){
    float: right;
    margin-right: 20%;
  }

  .add_specifications_ipt{
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }

  .add_specifications_ipt_title{
    float: left;
    width: 20%;
    line-height: 36px;
    text-align: left;
  }

  .add_specifications_ipt .el-input{
    width: 75%;
    float: right;
  }

  .add_specifications_btn{
    margin: 0 auto;
    margin-top: 50px;
    overflow: hidden;
  }
  .add_specifications_btn .el-button:nth-child(1){
    float: left;
    margin-left: 20%;
  }
  .add_specifications_btn .el-button:nth-child(2){
    float: right;
    margin-right: 20%;
  }
  .add_choose_specifications{
    width: 80%;
    padding: 30px;
    margin: 0 auto;
    margin-top: 30px;
    box-sizing: border-box;
    border: 1px solid #dddddd;
    border-radius: 5px;
  }
</style>

<script>
  export default {
    data() {
      return {
        fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      };
    },
    methods: {
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.add_specifications').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.add_specifications').css('display','none');
      },
      DisplayBlock2:function(){
        $('.mask').css('display','block');
        $('.modify_specifications').css('display','block');
      },

      DisplayNone2:function(){
        $('.mask').css('display','none');
        $('.modify_specifications').css('display','none');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      open2() {
        this.$confirm('此操作将添加此商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
        });
      },
      open3() {
        this.$confirm('此操作将删除此规格, 是否继续?', '提示', {
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
      }
    }
  }
</script>

