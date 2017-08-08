<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/OrderList' }">未付款订单</el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="apply_">
        <div class="titlee" style="border:0;">订单详情</div>
        <ul class="order-list order-lists">
          <li>
            <div class="TopTitle NoBorderTop">
              <ul class="left">
                <li>订单号：<span>20170101121201001</span> </li>
                <li>下单账号：<span>17696018825</span></li>
                <li>下单时间：<span>2017-12-22 12：00:00</span></li>
              </ul>
              <ul class="right">
                <li>订单状态：<span class="pink">待发货</span> </li>
                <li>订单总额：￥<span>1212.00</span>    包含运费：￥<span>11.00</span></li>
                <li>共<b class="pink">20</b>件商品，商品总额：￥<span class="pink">284.00</span></li>
              </ul>
            </div>
            <div class="TopTitle NoBorderTop">
              <ul class="left">
                <li>收件人：<span>果果</span> </li>
                <li>收件电话：<span>17696018825</span></li>
                <li>收货地址：<span>浙江省小米市A区   详细地址详细地址详细地址详细地址详细地址</span></li>
              </ul>
            </div>
            <div class="TopTitle NoBorderTop">
              <ul class="left">
                <li>发票抬头：<span>杭州上行科技有限公司</span> </li>
                <li>发票税号：<span>17696018825</span></li>
                <li>发票内容：<span>食品</span></li>
              </ul>
            </div>
            <div class="TopTitle NoBorderTop">
              <ul class="left">
                <li>订单备注：<span>杭州上行科技有限公司</span> </li>
              </ul>
            </div>
            <div class="Bottom NoBorderBottom">
              <div class="ShopShowList MarginAuto " style="border:0;">
                <ul>
                  <li class="shopList ">
                    <div class="shopImgBox">
                      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1500286899&di=895509c86877025244b6199b04b41a66&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8718367adab44aede5f5b1c1b91c8701a18bfb58.jpg" alt="">
                    </div>
                    <div class="shopMessage">
                      <p>商品名称商品名称商品名称商品名称商品名称商品名称商品名</p>
                      <p>用户所选规格用户所选规格</p>
                    </div>
                    <div class="shopPic">
                      <p>商品单价：<span>16.02</span></p>
                      <p>购买数量：X<span>10</span></p>
                      <p>总价：<span>160.2</span></p>
                    </div>
                  </li>
                  <li class="shopList ">
                    <div class="shopImgBox">
                      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1500286899&di=895509c86877025244b6199b04b41a66&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8718367adab44aede5f5b1c1b91c8701a18bfb58.jpg" alt="">
                    </div>
                    <div class="shopMessage">
                      <p>商品名称商品名称商品名称商品名称商品名称商品名称商品名</p>
                      <p>用户所选规格用户所选规格</p>
                    </div>
                    <div class="shopPic">
                      <p>商品单价：<span>16.02</span></p>
                      <p>购买数量：X<span>10</span></p>
                      <p>总价：<span>160.2</span></p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="TopTitle NoBorderTop NoBorderBottom">
              <div class="right">
                <el-button>订单改价</el-button>
                <el-button>发货</el-button>
                <el-button>取消此订单</el-button>
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
      <div class="apply_">

        <div class="order-list order-lists">
          <div class="TopTitle NoBorderTop NoPadding NoBorderBottom">
            <div class=" width100  NoBorderBottom">
              <div class="titlee">物流信息</div>
              <ul class="left">
                <li class="marginTopLeft">物流公司：<span>百世快递</span></li>
                <li class="marginTopLeft"> 运单编号：<span>3222222233343</span></li>
                <li class="marginTopLeft">物流电话：<span>暂无</span></li>
              </ul>
              <div class="right imgNum">
                <div class="imgBOXs">
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1500286899&di=895509c86877025244b6199b04b41a66&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8718367adab44aede5f5b1c1b91c8701a18bfb58.jpg" alt="">
                </div>
                <div class="shopNUMs">共 <span>20</span>件商品</div>
              </div>
            </div>
            <div class=" width100  NoBorderBottom">
              <div class="jt">
                <img src="" alt="">
              </div>
              <ul class="wlxq">
                <li>
                  <p>2017-12-22 12：00:00</p>
                  <p>您的订单已导入，快递公司正在取件</p>
                </li>
                <li>
                  <p>2017-12-22 12：00:00</p>
                  <p>收货人已取货</p>
                </li>
                <li>
                  <p>2017-12-22 12：00:00</p>
                  <p>收货人已取货</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .wlxq{
    display: flex;
    justify-content: space-around;
  }
  .order-lists{
    max-width:800px;
    margin:0 auto;
    border:1px solid #838383;
    overflow: hidden;
  }
  .NoBorderTop{
    border-top:0!important;
  }
  .NoBorderBottom{
    border-bottom:0!important;
  }
  .MarginAuto{
    margin:0 auto;
  }
  .width100{
    width:100%;
    overflow: hidden;
  }
  .NoPadding{
    padding:0;
  }
  .marginTopLeft{
    margin-top:20px ;
    margin-left:20px;
  }
  .imgNum{
    padding:20px;
    box-sizing: border-box;
  }
  .imgBOXs{
    width:150px;
    height:100px;
    overflow: hidden;
  }
  .imgBOXs img{
    width:100%;
  }
  .shopNUMs{
    width:100%;
    text-align: center;
    border:1px solid #838383;
    border-top:0;
    box-sizing: border-box;
  }
</style>


