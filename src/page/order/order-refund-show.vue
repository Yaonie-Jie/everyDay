<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/OrderRefund' }">退款订单</el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="apply_">
        <div class="titlee" style="border:0;">订单详情</div>
        <ul class="order-list order-lists">
          <li v-bind="listData">
            <div class="TopTitle NoBorderTop">
              <ul class="left">
                <li>订单号：<span>{{listData.orderNum}}</span></li>
                <li>下单账号：<span>{{listData.userAccount}}</span></li>
                <li>下单时间：<span>{{listData.createOn}}</span></li>
              </ul>
              <ul class="right">
                <li>订单状态：<span class="pink">{{stataFilter(listData.orderState)}}</span></li>
                <li>订单总额：￥<span>{{listData.price / 100}}</span> 包含运费：￥<span>{{listData.freigh / 100}}</span></li>
                <li>共<b class="pink">{{listData.amounts}}</b>件商品，商品总额：￥<span
                  class="pink">{{(listData.price + listData.freigh) / 100}}</span>
                </li>
              </ul>
            </div>
            <div class="TopTitle NoBorderTop">
              <ul class="left">
                <li>收件人：<span>{{listData.consignee}}</span></li>
                <li>收件电话：<span>{{listData.phone}}</span></li>
                <li>收货地址：<span>{{listData.addr}}</span></li>
              </ul>
            </div>
            <div class="TopTitle NoBorderTop">
              <ul class="left">
                <li>发票抬头：<span>{{listData.invoiceHeader}}</span></li>
                <li>发票税号：<span>{{listData.dutyNumber}}</span></li>
                <li>发票内容：<span>{{listData.invoiceType}}</span></li>
              </ul>
            </div>
            <div class="TopTitle NoBorderTop">
              <ul class="left">
                <li>订单备注：<span>{{listData.remarks}}</span></li>
              </ul>
            </div>
            <div class="Bottom NoBorderBottom">
              <div class="ShopShowList MarginAuto " style="border:0;">
                <ul>
                  <li class="shopList " v-for="i in listData.orderProduct">
                    <div class="shopImgBox">
                      <img
                        :src="i.picture"
                        alt="">
                    </div>
                    <div class="shopMessage">
                      <p>{{i.proName}}</p>
                      <p>{{i.parameters}}</p>
                    </div>
                    <div class="shopPic">
                      <p>商品单价：<span>{{i.unitPrice / 100}}</span></p>
                      <p>购买数量：X<span>{{i.amount}}</span></p>
                      <p>总价：<span>{{i.amount * i.unitPrice / 100}}</span></p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="TopTitle NoBorderTop NoBorderBottom">
              <div class="right">
                <el-button v-show="listData.refundState == 1" @click="Reject(i)">审核驳回{{listData.refundState}}</el-button>
                <el-button v-show="listData.refundState == 1" @click="open3(i)">审核同意</el-button>
                <el-button v-show="listData.refundState ==1" @click="open4(i)">退款成功</el-button>

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>
<script>
  import http from '../../http'

  export default {
    data() {
      return {
        orderNum: '',    //订单号
        listData: '',
        price: ''
      }
    },
    created() {
      this.orderNum = this.$route.params.orderNum;
      this.getshow()
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
      getshow() {
        let url = http.apiMap.showOrder;
        let data = {
          orderNum: this.orderNum,
          common: this.GLOBAL.common
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.order;
              this.listData = data

            }
          }
        );
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
            message: '已取消驳回'
          });
        });

      },
      //点击退款成功
      open4(i) {
        $(".deliver_goods").show();
        $(".mask").show();
        this.orderNum = i.orderNum
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
      DisplayNone: function () {
        $('.mask').css('display', 'none');
        $('.change_price').css('display', 'none');
      },
      DisplayBlock(orderNum) {
        this.orderNum = orderNum;
        console.log(orderNum)
        $('.mask').css('display', 'block');
        $('.change_price').css('display', 'block');
      },
    }
  }


</script>

<style>
  .wlxq {
    display: flex;
    justify-content: space-around;
  }

  .order-lists {
    max-width: 800px;
    margin: 0 auto;
    border: 1px solid #838383;
    overflow: hidden;
  }

  .NoBorderTop {
    border-top: 0 !important;
  }

  .NoBorderBottom {
    border-bottom: 0 !important;
  }

  .MarginAuto {
    margin: 0 auto;
  }

  .width100 {
    width: 100%;
    overflow: hidden;
  }

  .NoPadding {
    padding: 0;
  }

  .marginTopLeft {
    margin-top: 20px;
    margin-left: 20px;
  }

  .imgNum {
    padding: 20px;
    box-sizing: border-box;
  }

  .imgBOXs {
    width: 150px;
    height: 100px;
    overflow: hidden;
  }

  .imgBOXs img {
    width: 100%;
  }

  .shopNUMs {
    width: 100%;
    text-align: center;
    border: 1px solid #838383;
    border-top: 0;
    box-sizing: border-box;
  }
</style>

