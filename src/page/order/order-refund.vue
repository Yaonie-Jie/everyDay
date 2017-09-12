<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>退款中订单</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="apply_">
        <div class="titlee" style="border:0;">退款中订单列表</div>
        <div class="apply_condition">
          <div class="apply_time">
            <div class="block">
              <el-radio class="radio" label="1">只看已审核同意的订单</el-radio>
            </div>
          </div>
          <div class="apply_information">
            退货类型：
            <select name="">
              <option value="">全部</option>
              <option value="">退款</option>
              <option value="">退货退款</option>
            </select>
            <input type="text" placeholder="输入订单号或用户账号查找订单"/>
            <el-button type="success">搜索</el-button>
          </div>
        </div>
        <ul class="order-list" v-for="i in dataList" :key="i.id">
          <li>
            <div class="TopTitle">
              <ul class="left">
                <li>订单号：<span>{{i.orderNum}}</span> 下单账号：<span>{{i.userAccount}}</span></li>
                <li>下单时间：<span>{{i.createOn}}</span></li>
              </ul>
              <div class="right zt">订单状态：<span class="pink">{{stataFilter(i.orderState)}}</span></div>
            </div>
            <div class="Bottom">
              <div class="left ShopShowList">
                <ul>
                  <li class="shopList" v-for="list in i.orderProduct">
                    <div class="shopImgBox">
                      <img
                        :src="list.picture"
                        alt="">
                    </div>
                    <div class="shopMessage">
                      <p>{{list.proName}}</p>
                      <p>{{list.parameters}}</p>
                    </div>
                    <div class="shopPic">
                      <p>商品单价：<span>{{list.unitPrice/100}}</span></p>
                      <p>购买数量：X<span>{{list.amount}}</span></p>
                      <p>总价：<span>{{list.unitPrice * list.amount/100}}</span></p>
                    </div>
                  </li>
                </ul>
                <div class="Pic">
                  <div class="left">
                    <p>共<span class="pink">{{i.orderState}}</span>件商品</p>
                    <p>商品总额：￥<span class="pink">{{i.price/100}}</span></p>
                  </div>
                  <div class="right">
                    <el-button type="danger">退款中&nbsp;&nbsp;&nbsp;退款类型：退货退款</el-button>
                  </div>
                </div>
              </div>
              <div class="right AddPic">
                <p>订单总额：<span>{{i.price/100}}</span></p>
                <p>包含运费：<span>{{i.freigh/100}}</span></p>
                <el-button @click="open2">审核驳回</el-button>
                <el-button @click="open3">审核同意</el-button>
                <el-button @click="open4">退款成功</el-button>
                <el-button @click="shows">订单详情</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import http from '../../http'

  export default {
    data(){
      return {
        currentPage: 1,
        dataList:'',
        count:1
      }

    },
    created(){
      this.getList()
    },
    methods: {
      stataFilter(value){
        if (value == 0) {
          return '待付款'
        } else if (value == 1) {
          return '待发货'
        } else if (value == 2) {
          return '待收货'
        } else if (value == 3) {
          return '已完成'
        } else if (value == 4) {
          return '已退款'
        } else if (value == 5) {
          return '已超时'
        }
      },
      //获取列表
      getList(){
        let url = http.apiMap.returnOrderList;
        let data = {
          nowpage: this.currentPage,
          size: 10,
          common: this.GLOBAL.common
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count= res.body.data.count;
              let data = res.body.data.orderList;
              this.dataList = data;
            }
          }
        );
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList()
      },
      open2() {
        this.$confirm('此操作将驳回审核, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已驳回审核!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消驳回'
          });
        });
      },
      shows: function () {
        this.$router.push('/OrderNo');
      },
      open3() {
        this.$confirm('此操作将同意审核, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已同意审核!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消同意'
          });
        });
      },

      open4() {
        this.$confirm('此操作将退款, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退款成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退款'
          });
        });
      }
    }
  }
</script>



