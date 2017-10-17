<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="add_goods">
        <el-button type="success" class="right addGoods" @click="shows()">添加商品链接</el-button>
      </div>

      <div class="goods_search">
        <div class="left">
          <i style="margin-top: 10px;">搜索</i>
          <select name="" class="select" id="oneType" @change="OneTypeListChange" v-model="oneTypeId">
            <option value="">全部</option>
            <option v-for="option in OneTypeList" v-bind:value="option.id">
              {{ option.name }}
            </option>
          </select>
          <select name="" class="select" id="TwoType" v-model="typeId">
            <option value="">全部</option>

            <option v-for="option in TwoypeList" v-bind:value="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="left" style="margin-left: 30px">
          <i style="margin-top: 10px;">排序</i>
          <select name="" class="select" id="sort" v-model="sort">
            <option value="">请选择</option>
            <option value="0">正序</option>
            <option value="1">倒序</option>
            <option value="2">时间</option>
          </select>
        </div>
        <div class="right">
          <input placeholder="输入商品名称搜索" style="height:30px;" v-model="name"></input>
          <input placeholder="输入商品条码搜索" style="height:30px;" v-model="proCode"></input>
          <el-button type="success" style="margin-top: 0px;!important;" @click="find">搜索</el-button>
        </div>
      </div>
      <div class="add_goods_form">
        <el-table
          border
          :data="dataList"
          style="width: 100%">
          <el-table-column
            prop="num"
            :span="1"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="name"
            :span="2"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="proCode"
            :span="2"
            label="商品条码">
          </el-table-column>
          <el-table-column
            prop="stock"
            :span="1"
            label="库存">
          </el-table-column>
          <el-table-column
            :span="2"
            prop="freightName"
            label="运费模板">
          </el-table-column>
          <el-table-column
            :span="5"
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small" @click="Up(scope.row)">上移</el-button>
              <el-button type="text" size="small" @click="Down(scope.row)">下移</el-button>
              <el-button type="text" size="small" @click="Top(scope.row)">置顶</el-button>
              <el-button type="text" size="small" @click="Bottom(scope.row)">置底</el-button>
              <el-button type="text" size="small" @click="DisplayBlock(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="open2(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="mask"></div>

    <div class="block fenye">
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

  export default {
    data() {
      return {
        count11: 1,
        currentPage: 1,
        dataList: [],
        OneTypeList: [],
        TwoypeList: [],
        typeId: '',
        name: '',
        oneTypeId: '',
        id: '',
        sort:'',
        proCode: ''
      }
    },
    created() {
      this.getList();
      this.findTypeList()
    },
    methods: {
      //上移
      Up(row) {
        var nowID = row.id;
        var nowNumber = row.number;
        var table = this.dataList;
        var FrontID;
        var FrontNumber;
        for (var i = 0; i < table.length; i++) {
          if (table[i].id == nowID) {
            FrontID = table[i - 1].id;
            FrontNumber = table[i - 1].number;
          }
        }
        var arr = [{'id': nowID, 'number': FrontNumber}, {'id': FrontID, 'number': nowNumber}];
        var data = {'list': JSON.stringify(arr), 'common': this.GLOBAL.common};
        let url = http.apiMap.modifyProPos;
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.getList();
              this.$message({
                type: 'info',
                message: '上移成功！'
              });
            }
          }
        );
      },
      //下移
      Down(row) {
        let nowID = row.id;
        let nowNumber = row.number;
        let table = this.dataList;
        let FrontID;
        let FrontNumber;
        for (let i = 0; i < table.length; i++) {
          if (table[i].id == nowID) {
            FrontID = table[i + 1].id;
            FrontNumber = table[i + 1].number;
          }
        }
        let arr = [{'id': nowID, 'number': FrontNumber}, {'id': FrontID, 'number': nowNumber}];
        let data = {'list': JSON.stringify(arr), 'common': 1};
        let url = http.apiMap.modifyProPos;
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.getList();
              this.$message({
                type: 'info',
                message: '下移成功！'
              });
            }
          }
        );
      },
      //置顶
      Top(row) {
        let url = http.apiMap.modifyProTop;
        let data = {
          id: row.id,
          number: row.number,
          common: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.getList();
              this.$message({
                type: 'info',
                message: '置顶成功！'
              });

            }
          }
        );
      },
      //置底
      Bottom(row) {
        let url = http.apiMap.modifyRec;
        let data = {
          common: 1,
          number: row.number
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'info',
                message: '置底成功！'
              });
              this.getList()
            }
          }
        )
      },
      find() {
        let url = http.apiMap.findShop;
        if (this.oneTypeId == '') {
          this.typeId = '-1'
        } else {
          if ($("#TwoType :selected").attr('value')) {
            this.typeId = $("#TwoType :selected").attr('value')
          } else {
            this.typeId = this.oneTypeId
          }
        }
        let data = {
          nowpage: this.currentPage,
          size: 10,
          name: this.name,
          typeId: this.typeId,
          proCode: this.proCode,
          sort: this.sort,
          common: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11 = res.body.data.count;
              if (this.count11 == 0) {
                $(".fenye").hide()
              } else {
                $(".fenye").show()
              }
              let data = res.body.data.productList;
              let arr = [];
              let num = 0;
              for (let i = 0; i < data.length; i++) {
                num += 1;
                data[i].num = num;
                arr.push(data[i])
              }
              this.dataList = arr;
              this.id = ''
            }
          }
        );
      },
      getList() {
        let url = http.apiMap.findShopList;
        let data = {
          nowpage: this.currentPage,
          size: 10,
          common: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count11 = res.body.data.count;
              if (this.count11 == 0) {
                $(".fenye").hide()
              } else {
                $(".fenye").show()
              }
              let data = res.body.data.productList;
              let arr = [];
              let num = 0;
              for (let i = 0; i < data.length; i++) {
                num += 1;
                data[i].num = num;
                arr.push(data[i])
              }
              this.dataList = arr;
            }
          }
        );
      },
      open2(row) {
        this.$confirm('此操作将删除该商品信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = http.apiMap.deleteShop;
          let data = {
            id: row.id,
            common: 1
          }
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getList()
              } else {
                this.$message({
                  type: 'info',
                  message: res.body.msg
                });
              }
            }
          );

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      shows: function () {
        this.$router.push('/AddGoods');
      },
      DisplayBlock(row) {
        this.$router.push('/updataGoods/' + row.id);
      },

      DisplayNone: function () {
        $('.mask').css('display', 'none');
        $('.change_brand_information').css('display', 'none');
      },
      //分页跳转
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList()
      },
      OneTypeListChange() {//一级分类改变
        let url = http.apiMap.findTypeListTwo;
        let data = {
          pId: $("#oneType :selected").attr('value'),
          common: 1
        }
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.ProductTwoTypeList;
              this.TwoypeList = data;
            }
          }
        );
      },
      findTypeList() {//查询一级分类列表
        let url = http.apiMap.findTypeList;
        this.$http.post(url, {common: 1}).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.findProductOneTypeList;
              this.OneTypeList = data;
            }
          }
        );
      },
    },

  }
</script>
<style>
  .add_goods {
    width: 100%;
    margin: 30px 0;
    overflow: hidden;
  }

  .add_goods button {
    float: right;
    margin-right: 10%;
  }

  .goods_search {
    width: 80%;
    overflow: hidden;
    margin: 0 0 30px 10%;
  }

  .goods_search i {
    float: left;
    margin-left: 10px;
  }

  .goods_search select {
    float: left;
    height: 36px;
    margin-left: 10px;
  }

  .goods_search .el-input {
    float: left;
    margin-left: 10px;
  }

  .goods_search .el-button {
    margin-left: 10px;
  }

  .add_goods_form table tr td {
    text-align: center;
  }

  .add_goods_form table tr th {
    text-align: center;
  }
</style>
