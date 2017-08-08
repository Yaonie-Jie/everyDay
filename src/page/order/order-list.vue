<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>未付款订单</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="apply_">
        <div class="titlee" style="border:0;">列表订单</div>
        <div class="apply_condition" style="width:100%;padding:0;overflow:hidden;margin-bottom:40px;">
          <div class="apply_time">
            下单时间：
            <div class="block">
              <el-date-picker
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </div>
          <div class="apply_information">
            订单状态：
            <select name="">
              <option value="">全部</option>
              <option value="">未付款</option>
              <option value="">已付款</option>
              <option value="">待发货</option>
              <option value="">待收货</option>
              <option value="">已完成</option>
              <option value="">已退款</option>
            </select>
            <input type="text" value="输入订单号或用户账号查找订单" />
            <el-button type="success">搜索</el-button>
          </div>
        </div>
        <ul class="order-list">
          <li>
            <div class="TopTitle">
              <ul class="left">
                <li>订单号：<span>20170101121201001</span> 下单账号：<span>17696018825</span></li>
                <li>下单时间：<span>2017-12-22 12：00:00</span></li>
              </ul>
              <div class="right zt">订单状态：<span class="pink">未付款</span></div>
            </div>
            <div class="Bottom">
                <div class="left ShopShowList">
                  <ul>
                    <li class="shopList">
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
                    <li class="shopList">
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
                    <li class="shopList">
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
                  <div class="Pic">
                    <p>共<span class="pink">20</span>件商品</p>
                    <p>商品总额：￥<span class="pink">284.00</span></p>
                  </div>
                </div>
                <div class="right AddPic">
                  <p>订单总额：<span>200.00</span></p>
                  <p>包含运费：<span>11.00</span></p>
                  <el-button @click="DisplayBlock">改价</el-button>
                  <el-button @click="open2">取消订单</el-button>
                  <el-button @click="shows">订单详情</el-button>
                </div>
            </div>
          </li>
          <li>
            <div class="TopTitle">
              <ul class="left">
                <li>订单号：<span>20170101121201001</span> 下单账号：<span>17696018825</span></li>
                <li>下单时间：<span>2017-12-22 12：00:00</span></li>
              </ul>
              <div class="right zt">订单状态：<span class="pink">待发货</span></div>
            </div>
            <div class="Bottom">
              <div class="left ShopShowList">
                <ul>
                  <li class="shopList">
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
                  <li class="shopList">
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
                <div class="Pic">
                  <p>共<span class="pink">20</span>件商品</p>
                  <p>商品总额：￥<span class="pink">284.00</span></p>
                </div>
              </div>
              <div class="right AddPic">
                <p>订单总额：<span>200.00</span></p>
                <p>包含运费：<span>11.00</span></p>
                <el-button @click="DisplayBlock3">发货</el-button>
                <el-button @click="open2">取消订单</el-button>
                <el-button @click="shows">订单详情</el-button>
              </div>
            </div>
          </li>
          <li>
            <div class="TopTitle">
              <ul class="left">
                <li>订单号：<span>20170101121201001</span> 下单账号：<span>17696018825</span></li>
                <li>下单时间：<span>2017-12-22 12：00:00</span></li>
              </ul>
              <div class="right zt">订单状态：<span class="pink">待收货</span></div>
            </div>
            <div class="Bottom">
              <div class="left ShopShowList">
                <ul>
                  <li class="shopList">
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
                  <li class="shopList">
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
                <div class="Pic">
                  <p>共<span class="pink">20</span>件商品</p>
                  <p>商品总额：￥<span class="pink">284.00</span></p>
                </div>
              </div>
              <div class="right AddPic">
                <p>订单总额：<span>200.00</span></p>
                <p>包含运费：<span>11.00</span></p>
                <el-button>查看物流</el-button>
                <el-button @click="shows">订单详情</el-button>
              </div>
            </div>
          </li>
          <li>
            <div class="TopTitle">
              <ul class="left">
                <li>订单号：<span>20170101121201001</span> 下单账号：<span>17696018825</span></li>
                <li>下单时间：<span>2017-12-22 12：00:00</span></li>
              </ul>
              <div class="right zt">订单状态：<span class="pink">已完成</span></div>
            </div>
            <div class="Bottom">
              <div class="left ShopShowList">
                <ul>
                  <li class="shopList">
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
                  <li class="shopList">
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
                <div class="Pic">
                  <p>共<span class="pink">20</span>件商品</p>
                  <p>商品总额：￥<span class="pink">284.00</span></p>
                </div>
              </div>
              <div class="right AddPic">
                <p>订单总额：<span>200.00</span></p>
                <p>包含运费：<span>11.00</span></p>
                <el-button>查看物流</el-button>
                <el-button @click="shows">订单详情</el-button>
              </div>
            </div>
          </li>
          <li>
            <div class="TopTitle">
              <ul class="left">
                <li>订单号：<span>20170101121201001</span> 下单账号：<span>17696018825</span></li>
                <li>下单时间：<span>2017-12-22 12：00:00</span></li>
              </ul>
              <div class="right zt">订单状态：<span class="pink">已退款</span></div>
            </div>
            <div class="Bottom">
              <div class="left ShopShowList">
                <ul>
                  <li class="shopList">
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
                  <li class="shopList">
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
                <div class="Pic">
                  <p>共<span class="pink">20</span>件商品</p>
                  <p>商品总额：￥<span class="pink">284.00</span></p>
                </div>
              </div>
              <div class="right AddPic">
                <p>订单总额：<span>200.00</span></p>
                <p>包含运费：<span>11.00</span></p>
                <el-button>退款详情</el-button>
                <el-button @click="shows">订单详情</el-button>
              </div>
            </div>
          </li>
          <li>
            <div class="TopTitle">
              <ul class="left">
                <li>订单号：<span>20170101121201001</span> 下单账号：<span>17696018825</span></li>
                <li>下单时间：<span>2017-12-22 12：00:00</span></li>
              </ul>
              <div class="right zt">订单状态：<span class="pink">待收货</span></div>
            </div>
            <div class="Bottom">
              <div class="left ShopShowList">
                <ul>
                  <li class="shopList">
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
                  <li class="shopList">
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
                <div class="Pic">
                  <div class="left">
                    <p>共<span class="pink">20</span>件商品</p>
                    <p>商品总额：￥<span class="pink">284.00</span></p>
                  </div>
                  <div class="right"><el-button type="danger">退款中&nbsp;&nbsp;&nbsp;退款类型：退货退款</el-button></div>
                </div>
              </div>
              <div class="right AddPic">
                <p>订单总额：<span>200.00</span></p>
                <p>包含运费：<span>11.00</span></p>
                <el-button>退款详情</el-button>
                <el-button @click="shows">订单详情</el-button>
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
        <el-input placeholder=""></el-input>
      </div>
      <div class="deliver_goods_btns">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary">订单改价</el-button>
      </div>
    </div>
    <div class="deliver_goods popup">
      <div class="order_number">
        <div class="order_number_title">订单编号：</div>
        <el-input placeholder=""></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
      <div class="logistics_company">
        <div class="logistics_company_title">物流公司：</div>
        <el-input placeholder=""></el-input>
      </div>
      <div class="logistics_company_phone">
        <div class="logistics_company_phone_title">物流公司电话：</div>
        <el-input placeholder=""></el-input>
      </div>
      <div class="deliver_goods_btns">
        <el-button type="primary" @click="DisplayNone3">取消</el-button>
        <el-button>发货</el-button>
      </div>
    </div>
  </div>
</template>
<style>
  .zt{
    line-height: 60px;
  }
  .TopTitle{
    border-top:1px solid #838383;
    border-bottom:1px solid #838383;
    padding:20px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .TopTitle li:nth-child(1){
    margin-bottom:20px;
  }
  .TopTitle li span{
    margin-right:20px;
  }
  .pink{
    color:#ff3366;
  }
  .Bottom{
    border-bottom:1px solid #838383;
    overflow: hidden;
  }
  .ShopShowList{
    border-right:1px solid #838383; width:80%;box-sizing: border-box;
  }
  .ShopShowList div{
    padding:20px;
    box-sizing:border-box;
  }
  .shopList{
    display: flex;
    float: left;
    border-bottom:1px solid #838383;
  }
  .shopList .shopImgBox{
    width:20%;
    overflow: hidden;
  }
  .shopList .shopImgBox img{
    width:100%;
  }
  .shopList .shopMessage{
    width:60%;
    overflow: hidden;
  }
  .shopList .shopPic{
    width:20%;
    overflow: hidden;
  }
  .shopList div p{
   margin-bottom:20px;
  }
  .AddPic{
    width:20%;padding:20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .AddPic p{
    margin-bottom:10px;
  }
  .AddPic button{
    margin-left: 0!important;
    margin-bottom:10px;
  }
  .order-list li{
    margin-bottom:20px;
  }
  .deliver_remind{
    width: 100%;
    height: 50px;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    overflow: hidden;
  }
  .deliver_goods_btns{
    margin: 0 auto;
    margin-top: 40px;
  }
  .deliver_goods_btns .el-button:nth-child(1){
    float: left;
    margin-left: 25%;
  }
  .deliver_goods_btns .el-button:nth-child(2){
    float: right;
    margin-right: 25%;
  }
  .change_nowprice{
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    overflow: hidden;
  }
  .change_nowprice_title{
    float: left;
    line-height: 36px;
  }
  .change_price .el-input{
    width: 70%;
    float: right;
  }
  .order_number,
  .logistics_company,
  .logistics_company_phone{
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 30px;
  }
  .order_number_title,
  .logistics_company_title,
  .logistics_company_phone_title{
    width: 25%;
    float: left;
    text-align: left;
    line-height: 36px;
  }
  .order_number .el-input{
    width: 55%;
    float: left;
  }
  .order_number .el-button{
    float: right;
    margin-right: 0;
  }
  .logistics_company .el-input,
  .logistics_company_phone .el-input{
    width: 75%;
    float: left;
  }
</style>

<script>
  export default{
    methods: {
      DisplayBlock:function(){
        $('.mask').css('display','block');
        $('.change_price').css('display','block');
      },

      DisplayNone:function(){
        $('.mask').css('display','none');
        $('.change_price').css('display','none');
      },

      DisplayBlock3:function(){
        $('.mask').css('display','block');
        $('.deliver_goods').css('display','block');
      },

      DisplayNone3:function(){
        $('.mask').css('display','none');
        $('.deliver_goods').css('display','none');
      },
      shows:function(){
        this.$router.push('/OrderNo');
      },
      open2() {
        this.$confirm('此操作将取消订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '取消订单成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    }
  }
</script>


