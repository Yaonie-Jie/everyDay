<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
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
                <li>商品总额：￥<span>{{listData.price / 100}}</span> 运费：￥<span>{{listData.freigh / 100}}</span></li>
                <li>共<b class="pink">{{listData.amounts}}</b>件商品，订单总额：￥<span
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
                <li>买家备注：<span>{{listData.remarks}}</span></li>
                <li>卖家备注：<span>{{listData.sellRemarks}}</span> <el-button type="success" @click="updataRemark">修改</el-button>
                </li>
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
                <el-button @click="DisplayBlock(listData)">订单改价</el-button>
                <el-button @click="Delete(listData.orderNum)">取消此订单</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mask"></div>
    <div class="change_price popup">
      <div class="change_nowprice">
        <div class="change_nowprice_title">修改当前订单价格</div>
        <el-input placeholder="" v-model="price"></el-input>
      </div>
      <div class="deliver_goods_btns">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="updata">订单改价</el-button>
      </div>
    </div>


    <div class="change_sellRemarks popup">
      <div class="change_nowprice">
        <div class="change_nowprice_title">修改买家备注</div>
        <el-input v-model="sellRemarks"></el-input>
      </div>
      <div class="deliver_goods_btns">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="Remark">确定</el-button>
      </div>
    </div>
  </div>
</template>
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
<script>
  import http from '../../http'

  export default {
    data() {
      return {
        orderNum: '',    //订单号
        listData: '',
        price: '',
        sellRemarks:'',
        fight:'',
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
              this.sellRemarks = data.sellRemarks
            }
          }
        );
      },
      updataRemark(){
        $(".change_sellRemarks").show();
        $(".mask").show();
      },
      Remark(){
        let url = http.apiMap.updataRemark;
        let data = {
          orderNum: this.orderNum,
          sellRemarks:this.sellRemarks,
          common: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.getshow()
            }
          }
        );
        $(".change_sellRemarks").hide();
        $(".mask").hide()
      },
      DisplayNone: function () {
        $('.mask').css('display', 'none');
        $('.change_price').css('display', 'none');
        $(".change_sellRemarks").hide()
      },
      DisplayBlock(i) {
        this.orderNum = i.orderNum;
        this.price = (i.price + i.freigh) / 100;
        this.fight = i.freigh / 100;
        $('.mask').css('display', 'block');
        $('.change_price').css('display', 'block');
      },
      //改价
      updata() {
        let url = http.apiMap.updataOrderNum;
        let data = {
          orderNum: this.orderNum,
          price: this.price * 100-this.fight*100,
          common: this.GLOBAL.common
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.DisplayNone();
              this.$message({
                type: 'success',
                message: '订单修改成功!'
              });
              this.getshow()
            } else {
              this.DisplayNone();
              this.$message({
                type: 'warning',
                message: '订单修改失败!'
              });
            }
          }
        );
      },
      Delete(orderNum) {
        this.$confirm('此操作将取消订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = http.apiMap.removeOrder;
          let data = {
            orderNum: orderNum,
            common: this.GLOBAL.common
          };
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '取消订单成功!'
                });

                this.getList()
              } else {
                this.$message({
                  type: 'warning',
                  message: '取消订单失败'
                });
              }
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
    }
  }


</script>


