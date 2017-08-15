<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>已退款订单</el-breadcrumb-item>
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
                <li>订单总额：￥<span>{{listData.price}}</span> 包含运费：￥<span>{{listData.freigh}}</span></li>
                <li>共<b class="pink">{{listData.orderState}}</b>件商品，商品总额：￥<span class="pink">{{listData.price}}</span>
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
                      <p>商品单价：<span>{{i.unitPrice}}</span></p>
                      <p>购买数量：X<span>{{i.amount}}</span></p>
                      <p>总价：<span>{{i.amount * i.unitPrice}}</span></p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="apply_">

        <div class="order-list order-lists">
          <div class="TopTitle NoBorderTop NoPadding NoBorderBottom">
            <ul class="left width100">
              <div class="titlee">退款信息</div>
              <li class="marginTopLeft">申请退款时间：<span>2017-12-22   12：00:00</span></li>
              <li class="marginTopLeft">退款类型：退货退款</li>
              <li class="marginTopLeft">退款金额：￥21323.00</li>
              <li class="marginTopLeft">用户备注：-----</li>
              <li class="marginTopLeft">用户支付宝/微信账号：132231321232</li>
            </ul>

          </div>
          <div class="TopTitle NoPadding NoBorderBottom">
            <ul class="left width100">
              <div class="titlee">退款记录</div>
              <ul style="overflow: auto;">
                <li class="marginTopLeft">后台账号admin于2017-12-22 12：00:00审核同意了此订单的退款申请 </li>
                <li class="marginTopLeft">后台账号admin于2017-12-22 12：00:00审核同意了此订单的退款申请</li>
                <li class="marginTopLeft">后台账号admin于2017-12-22 12：00:00审核同意了此订单的退款申请</li>
                <li class="marginTopLeft">后台账号admin于2017-12-22 12：00:00审核同意了此订单的退款申请 </li>
                <li class="marginTopLeft">后台账号admin于2017-12-22 12：00:00审核同意了此订单的退款申请</li>
                <li class="marginTopLeft">后台账号admin于2017-12-22 12：00:00审核同意了此订单的退款申请</li>
              </ul>

            </ul>
          </div>
        </div>
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
  export default{
    data(){
      return {
        orderNum: '',    //订单号
        listData: '',
      }
    },
    created() {
      this.orderNum = this.$route.params.orderNum;
      this.getshow()
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
      getshow(){
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
      DisplayNone: function () {
        $('.mask').css('display', 'none');
        $('.change_price').css('display', 'none');
      },
    }
  }


</script>


