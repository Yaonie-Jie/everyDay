<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>未付款订单</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="apply_">
        <div class="titlee" style="border:0;">订单列表</div>
        <div class="apply_condition" style="width:100%;padding:0;overflow:hidden;margin-bottom:40px;">
          <div class="apply_time">
            下单时间：
            <div class="block">
              <el-date-picker
                v-model="time"
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
            <input type="text" value="输入订单号或用户账号查找订单"/>
            <el-button type="success">搜索</el-button>
          </div>
        </div>
        <ul class="order-list">
          <li v-for="i in dataList" :key="i.id">
            <div class="TopTitle">
              <ul class="left">
                <li>订单号：<span>{{i.orderNum}}</span> 下单账号：<span>{{i.userAccount}}</span></li>
                <li>下单时间：<span>{{i.createOn}}</span></li>
              </ul>
              <div class="right zt">订单状态：<span class="pink">{{stataFilter(i.state)}}</span></div>
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
                      <p>商品单价：<span>{{list.unitPrice}}</span></p>
                      <p>购买数量：X<span>{{list.amount}}</span></p>
                      <p>总价：<span>{{list.unitPrice*list.amount}}</span></p>
                    </div>
                  </li>
                </ul>
                <div class="Pic">
                  <p>共<span class="pink">{{i.orderState}}</span>件商品</p>
                  <p>商品总额：￥<span class="pink">{{i.price}}</span></p>
                </div>
              </div>
              <div class="right AddPic">
                <p>订单总额：<span>{{i.price}}</span></p>
                <p>包含运费：<span>{{i.freigh}}</span></p>
                <el-button @click="DisplayBlock(i.orderNum)">改价</el-button>
                <el-button @click="open2(i.orderNum)">取消订单</el-button>
                <el-button @click="shows(i.orderNum)">订单详情</el-button>
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

    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="200">
      </el-pagination>
    </div>
  </div>

</template>
<style>
  .zt {
    line-height: 60px;
  }

  .TopTitle {
    border-top: 1px solid #838383;
    border-bottom: 1px solid #838383;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .TopTitle li:nth-child(1) {
    margin-bottom: 20px;
  }

  .TopTitle li span {
    margin-right: 20px;
  }

  .pink {
    color: #ff3366;
  }

  .Bottom {
    border-bottom: 1px solid #838383;
    overflow: hidden;
  }

  .ShopShowList {
    border-right: 1px solid #838383;
    width: 80%;
    box-sizing: border-box;
  }

  .ShopShowList div {
    padding: 20px;
    box-sizing: border-box;
  }

  .shopList {
    display: flex;
    border-bottom: 1px solid #838383;
  }

  .shopList .shopImgBox {
    width: 20%;
    overflow: hidden;
  }

  .shopList .shopImgBox img {
    width: 100%;
  }

  .shopList .shopMessage {
    width: 60%;
    overflow: hidden;
  }

  .shopList .shopPic {
    width: 25%;
    overflow: hidden;
  }

  .shopList div p {
    margin-bottom: 20px;
  }

  .AddPic {
    width: 20%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .AddPic p {
    margin-bottom: 10px;
  }

  .AddPic button {
    margin-left: 0 !important;
    margin-bottom: 10px;
  }

  .order-list li {
    margin-bottom: 20px;
  }

  .deliver_remind {
    width: 100%;
    height: 50px;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    overflow: hidden;
  }

  .deliver_goods_btns {
    margin: 0 auto;
    margin-top: 40px;
  }

  .deliver_goods_btns .el-button:nth-child(1) {
    float: left;
    margin-left: 25%;
  }

  .deliver_goods_btns .el-button:nth-child(2) {
    float: right;
    margin-right: 25%;
  }

  .change_nowprice {
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    overflow: hidden;
  }

  .change_nowprice_title {
    float: left;
    line-height: 36px;
  }

  .change_price .el-input {
    width: 70%;
    float: right;
  }

  .order_number,
  .logistics_company,
  .logistics_company_phone {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 30px;
  }

  .order_number_title,
  .logistics_company_title,
  .logistics_company_phone_title {
    width: 25%;
    float: left;
    text-align: left;
    line-height: 36px;
  }

  .order_number .el-input {
    width: 55%;
    float: left;
  }

  .order_number .el-button {
    float: right;
    margin-right: 0;
  }

  .logistics_company .el-input,
  .logistics_company_phone .el-input {
    width: 75%;
    float: left;
  }
</style>

<script>
  import http from '../../http'
  export default{
    data(){
      return {
        dataList: '',
        price:'',       //改价的订单价格
        orderNum:'',    //订单号
        time:'',         //选择时间搜索
        currentPage:1
      }
    },
    created() {
      this.getList()
    },
    methods: {
      stataFilter(value){
          if(value == 1){
              return '已完成'
          }
      },
      DisplayBlock: function (orderNum) {
        this.orderNum=orderNum;
        $('.mask').css('display', 'block');
        $('.change_price').css('display', 'block');
      },

      DisplayNone: function () {
        $('.mask').css('display', 'none');
        $('.change_price').css('display', 'none');
      },

      DisplayBlock3: function () {
        $('.mask').css('display', 'block');
        $('.deliver_goods').css('display', 'block');
      },

      DisplayNone3: function () {
        $('.mask').css('display', 'none');
        $('.deliver_goods').css('display', 'none');
      },
      shows: function (row) {
        this.$router.push('/OrderNo/'+row+'');
      },
      //取消订单
      open2(orderNum) {
        this.$confirm('此操作将取消订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = http.apiMap.removeOrder;
          let data = {
            orderNum:orderNum,
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
              }else {
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
      //获取列表
      getList(){
        let url = http.apiMap.getList;
        let data = {
          nowpage: this.currentPage,
          size: 10,
          common: this.GLOBAL.common
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.orderList;
              this.dataList = data;
            }
          }
        );
      },
      //改价
      updata(){
        let url = http.apiMap.updataOrderNum;
        let data = {
          orderNum:this.orderNum,
          price:this.price,
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
              this.getList()
            }
          }
        );
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.getList()
      }
    }
  }
</script>


