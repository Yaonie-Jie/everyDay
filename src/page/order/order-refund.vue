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
          <div class="apply_information">
            退货类型：
            <select name="" v-model="refundType">
              <option value="">全部</option>
              <option value="0">仅退款</option>
              <option value="1">退货退款</option>
            </select>
            审核状态：
            <select name="" v-model="refundState">
              <option value="">全部</option>
              <option value="1,3">退款中</option>
              <option value="2">退款驳回</option>
              <option value="3">退款同意</option>
            </select>
            <input type="text" placeholder="输入用户账号查找订单" v-model="userAccount"/>
            <input type="text" placeholder="输入订单号查找订单" v-model="orderNumsou"/>
            <el-button type="success" @click="selectOrder">搜索</el-button>
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
                      <p>商品名称：{{list.proName}}</p>
                      <p>商品条码：{{list.proCode}}</p>
                      <p>商品规格：{{list.parameters}}</p>
                    </div>
                    <div class="shopPic">
                      <p>商品单价：<span>{{list.unitPrice / 100}}</span></p>
                      <p>购买数量：X<span>{{list.amount}}</span></p>
                      <p>总价：<span>{{list.unitPrice * list.amount / 100}}</span></p>
                    </div>
                  </li>
                </ul>
                <div class="Pic">
                  <div class="left">
                    <p>共<span class="pink">{{i.num}}</span>件商品</p>
                    <p>商品总额：￥<span class="pink">{{i.price / 100}}</span></p>
                  </div>
                  <div class="right">
                    <el-button type="danger" v-show="i.refundType==0&&i.orderState==4">已退款&nbsp;&nbsp;&nbsp;退款类型：仅退款
                    </el-button>
                    <el-button type="danger" v-show="i.refundType==1&&i.orderState==4">已退款&nbsp;&nbsp;&nbsp;退款类型：退货退款
                    </el-button>
                    <el-button type="danger" v-show="i.refundType==0&&i.orderState!=4">退款中&nbsp;&nbsp;&nbsp;退款类型：仅退款
                    </el-button>
                    <el-button type="danger" v-show="i.refundType==1&&i.orderState!=4">退款中&nbsp;&nbsp;&nbsp;退款类型：退货退款
                    </el-button>
                  </div>
                </div>
              </div>
              <div class="right AddPic">
                <p>订单总额：<span>{{(i.price + i.freigh ) / 100}}</span></p>
                <p>运费：<span>{{i.freigh / 100}}</span></p>
                <p>退款金额：<span>{{i.refundPrice / 100}}</span></p>
                <el-button v-show="i.refundState == 1&&i.orderState!=4" @click="Reject(i)">审核驳回</el-button>
                <el-button v-show="i.refundState == 1&&i.orderState!=4" @click="open3(i)">审核同意</el-button>
                <el-button v-show="i.refundState == 3&&i.orderState!=4" @click="open4(i)">退款成功</el-button>
                <el-button @click="shows(i)">订单详情</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="deliver_goods popup" style="text-align: left">
      <el-row>
        <el-col :span="24" style="text-align: left">
          <span style="padding-right: 50px">退款方式</span>
          <span>{{msg.incomeMent}}</span>
        </el-col>
        <el-col :span="24" style="text-align: left;margin-top: 20px">
          <span style="padding-right: 50px">用户账号</span>
          <span>{{msg.payAccount}}</span>
        </el-col>
        <el-col :span="24" style="text-align: left;margin-top: 20px">
          <span style="padding-right: 50px">退款账号</span>
          <el-input style="width: 30%;" v-model="outAccount"></el-input>
        </el-col>
      </el-row>
      <div class="deliver_goods_btns" style="text-align: center">
        <el-button type="primary" @click="backMoney" style="float:none;">确定退款成功</el-button>
        <el-button @click="DisplayNone3" style="float:none;">取消</el-button>
      </div>
    </div>
    <div class="mask"></div>
    <div class="block fenye">
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
    data() {
      return {
        currentPage: 1,
        dataList: '',
        count: 1,
        userAccount: '',
        orderNum: '',
        orderNumsou: '',
        refundType: '',
        refundState: '',
        outMent: '',
        msg: '',
        outAccount: ''
      }

    },
    created() {
      this.getList()
    },
    methods: {
      stataFilter(value) {
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
      getList() {
        let url = http.apiMap.returnOrderList;
        let data = {
          nowpage: this.currentPage,
          size: 10,
          common: 2
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.count = res.body.data.count;
              if (this.count == 0) {
                $(".fenye").hide()
              } else {
                $(".fenye").show()
              }
              let data = res.body.data.orderList;
              for (let i = 0; i < data.length; i++) {
                let num = 0
                for (let q = 0; q < data[i].orderProduct.length; q++) {
                  num += data[i].orderProduct[q].amount

                }
                data[i].num = num
              }
              this.dataList = data;
            }
          }
        );
      },
      selectOrder() {
        let url = http.apiMap.returnOrderList;
        let data = {
          nowpage: this.currentPage,
          size: 10,
          common: 1,
          userAccount: this.userAccount,
          orderNum: this.orderNumsou,
          refundType: this.refundType,
          refundState: this.refundState
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.$message({
                type: 'success',
                message: '查询成功'
              });
              this.count = res.body.data.count;
              if (this.count == 0) {
                $(".fenye").hide()
              } else {
                $(".fenye").show()
              }
              let data = res.body.data.orderList;
              for (let i = 0; i < data.length; i++) {
                let num = 0
                for (let q = 0; q < data[i].orderProduct.length; q++) {
                  num += data[i].orderProduct[q].amount

                }
                data[i].num = num
              }
              this.dataList = data;
            }
          }
        );
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList()
      },
      //审核驳回
      Reject(i) {
        this.$confirm('驳回退款？驳回后用户只能通过客服电话与我们联系!, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = http.apiMap.Reject;
          let data = {
            orderNum: i.orderNum,
            refundState: 0,
            common: 1
          };
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.getList()
                this.$message({
                  type: 'success',
                  message: '已驳回审核!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: res.body.msg
                });
              }
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消驳回'
          });
        });
      },
      shows(i) {
        if (i.orderState == '4') {
          this.$router.push('/OrderRefundShow/' + i.orderNum);
        } else if (i.refundState == 1) {
          this.$router.push('/OrderMoney/' + i.orderNum);
        } else if (i.refundState == 2) {
          this.$router.push('/OrderRefundShow/' + i.orderNum);
        } else if (i.refundState == 3) {
          this.$router.push('/OrderMoney/' + i.orderNum);
        }
      },
      //审核同意
      open3(i) {
        this.$confirm('审核同意, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = http.apiMap.Reject;
          let data = {
            orderNum: i.orderNum,
            refundState: 1,
            common: 1
          };
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.getList()
                this.$message({
                  type: 'success',
                  message: '已审核!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: res.body.msg
                });
              }
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          });
        });
      },
      DisplayNone3() {
        $('.mask').css('display', 'none');
        $('.deliver_goods').css('display', 'none');
      },
      //点击退款成功
      open4(i) {
          console.log(i)
        $(".deliver_goods").show();
        $(".mask").show();
        this.orderNum = i.orderNum;
        let url = http.apiMap.gettuikuan;
        let data = {
          orderNum: this.orderNum,
          common: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.msg;
              this.backincomeMent = data.incomeMent;
              this.backincomeMent = data.incomeMent;

              if (data.incomeMent == 1) {
                data.incomeMent = '支付宝'
              } else {
                data.incomeMent = '微信'
              }
              this.msg = data
            } else {
              console.log('暂无物流信息')
            }
          }
        );
      },
      //点击确认退款成功
      backMoney() {
        let url = http.apiMap.tuikuan;
        let data = {
          orderNum: this.orderNum,
          outMent: this.backincomeMent,
          incomeAccount: this.msg.payAccount,
          outAccount: this.outAccount,
          userAccount: this.msg.userAccount,
          outMoney: this.msg.incomeMoney,
          common: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.getList();
              this.$message({
                type: 'success',
                message: '退款成功!'
              });
            } else {
              this.$message({
                type: 'info',
                message: res.body.msg
              });
            }
            $(".deliver_goods").hide();
            $(".mask").hide();
          }
        );
      }
    },


  }
</script>



