<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
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
          <div style="width: 250px;float: left;line-height: 32px">
            订单号:
            <div class="block" style="float: right;">
              <el-input v-model="orderNum"></el-input>
            </div>
          </div>
          <div style="width: 260px;float: left;line-height: 32px;margin-left: 20px">
            用户账号:
            <div class="block" style="float: right;">
              <el-input v-model="userAccount"></el-input>
            </div>
          </div>
          <div class="apply_information">
            <span style="float:left;">订单状态：</span>
            <select name="" id="orderState" v-model="orderState">
              <option v-for="option in options" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
            <el-button type="success" @click="findOrder">搜索</el-button>
          </div>
        </div>
        <ul class="order-list">
          <li v-for="i in dataList" :key="i.id">
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
                <p>订单总额：<span>{{(i.price + i.freigh) / 100}}</span></p>
                <p>运费：<span>{{i.freigh / 100}}</span></p>
                <p v-show="i.refundState != 0">退款金额：<span>{{i.refundPrice / 100}}</span></p>

                <el-button v-show="i.orderState==0" @click="DisplayBlock(i.orderNum,i.price,i.freigh)">改价</el-button>
                <el-button v-show="i.orderState==1&&i.refundState == 0" @click="addExpress(i)">发货</el-button>
                <el-button v-show="(i.orderState==2&&i.refundState==0)||i.orderState==3" @click="showwuliu(i.orderNum)">
                  查看物流
                </el-button>
                <el-button v-show="i.orderState==0" @click="open2(i.orderNum)">取消订单</el-button>
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
    <!--查看物流-->
    <div class="deliver_goods popup" style="text-align: left">
      <div class="order-list order-lists">
        <div class="TopTitle NoBorderTop NoPadding NoBorderBottom">
          <div class=" width100  NoBorderBottom">
            <div class="titlee">物流信息</div>
            <ul class="left">
              <li class="marginTopLeft">物流公司：<span>{{wuliu.company}}</span></li>
              <li class="marginTopLeft"> 运单编号：<span>{{wuliu.expressNum}}</span></li>
              <li class="marginTopLeft">电话：<span>{{wuliu.phone}}</span></li>
            </ul>
            <!--<div class="right imgNum">-->
            <!--<div class="imgBOXs">-->
            <!--<img-->
            <!--src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1500286899&di=895509c86877025244b6199b04b41a66&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8718367adab44aede5f5b1c1b91c8701a18bfb58.jpg"-->
            <!--alt="">-->
            <!--</div>-->
            <!--<div class="shopNUMs">共 <span>20</span>件商品</div>-->
            <!--</div>-->
          </div>
          <div class=" width100  NoBorderBottom">
            <div class="jt">
              <img src="" alt="">
            </div>
            <ul class="wlxq">
              <li v-for="i in wuliuList">
                <p>{{i.time}}</p>
                <p>{{i.context}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="deliver_goods_btns" style="text-align: center">
        <el-button type="primary" @click="DisplayNone3" style="float:none;">取消</el-button>
      </div>
    </div>
    <div class="deliver_tui popup" style="text-align: left">
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
        <el-button @click="Displaytui" style="float:none;">取消</el-button>
      </div>
    </div>
    <!--发货-->
    <div class="popup change_left">
      <div class="popup_title">发货</div>
      <el-row style="text-align: left;">
        <el-col :span="24" style="margin-bottom: 20px">
          <div class="fahuo">
            <span style="padding-right: 20px">订单号：</span>
          </div>
          <span style="line-height: 36px;">{{orderNum}}</span>
        </el-col>
        <el-col :span="24" style="margin-bottom: 20px">
          <div class="fahuo">
            <span style="padding-right: 20px">运单号：</span>
          </div>
          <el-input type="text" style="width: 30%" v-model="ExpressNum" @blur="qukong()"></el-input>
        </el-col>
        <el-col :span="24" style="margin-bottom: 20px">
          <div class="fahuo">
            <span style="padding-right: 20px">快递公司：</span>
          </div>
          <select name="" id="addwuliu" v-model="Abbreviation">
            <option v-for="option in expressList" v-bind:value="option.abbreviation">
              {{ option.company }}
            </option>
          </select>
        </el-col>
        <el-col :span="24" style="margin-bottom: 20px">
          <div class="fahuo">
            <span style="padding-right: 20px">手机号：</span>
          </div>
          <el-input type="text" style="width: 30%" v-model="phone"></el-input>
        </el-col>
      </el-row>
      <div class="popup_btn">
        <el-button type="primary" @click="addfa">发货</el-button>
        <el-button @click="noneblock">取消</el-button>
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
        dataList: '',
        fight: '',
        price: '',       //改价的订单价格
        orderNum: '',    //订单号
        time: '',         //选择时间搜索
        currentPage: 1,
        count11: 1,
        userAccount: '',   //用户账户
        orderState: '',    //订单状态
        options: [
          {text: '全部', value: ''},
          {text: '待付款', value: '0'},
          {text: '待发货', value: '1'},
          {text: '待收货', value: '2'},
          {text: '已完成', value: '3'},
          {text: '已退款', value: '4'},
          {text: '已超时', value: '5'}
        ],
        expressList: [],
        Abbreviation: '',
        ExpressNum: '',
        phone: '',
        wuliu: '',
        wuliuList: [],
        msg: '',
        outAccount: ""
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
      //查看物流
      showwuliu(orderNum) {
        $(".deliver_goods").show();
        $(".mask").show();
        let url = http.apiMap.findExpress;
        let data = {
          orderNum: orderNum,
          common: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.wuliu = res.body.data.expressNew;

              let data = JSON.parse(res.body.data.express);
              this.expressNum = data.nu;
              this.abbreviation = data.abbreviation;
              this.wuliuList = data.data
            } else {
              console.log('暂无物流信息')
            }
          }
        );
      },

      //发货选择框
      addExpress(i) {
        this.findExpressList();
        $(".change_left").show();
        $(".mask").show();
        this.orderNum = i.orderNum;
      },
      noneblock() {
        $(".change_left").hide();
        $(".mask").hide();
        this.orderNum = '';
      },
      //发货
      addfa() {
        let url = http.apiMap.addExpressOrder;
        let data = {
          common: 1,
          ExpressNum: this.ExpressNum,
          OrderNum: this.orderNum,
          Abbreviation: this.Abbreviation,
          company: $("#addwuliu :selected").text().replace(/\s+/g, ''),
          phone: this.phone
        }
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              this.getList();
              this.$message({
                type: 'success',
                message: '发货成功!'
              });

              this.noneblock()
            } else {
              this.$message({
                type: 'warning',
                message: res.body.msg
              });
            }
          }
        );
      },

      DisplayBlock(orderNum, price, fight) {
        this.orderNum = orderNum;
        this.price = (price + fight) / 100;
        this.fight = fight / 100;
        $('.mask').css('display', 'block');
        $('.change_price').css('display', 'block');
      },
      DisplayNone() {
        $('.mask').css('display', 'none');
        $('.change_price').css('display', 'none');
      },
      DisplayBlock3() {
        $('.mask').css('display', 'block');
        $('.deliver_goods').css('display', 'block');
      },
      Displaytui(){
        $('.mask').hide();
        $('.deliver_tui').hide();
      },
      DisplayNone3() {
        $('.mask').css('display', 'none');
        $('.deliver_goods').css('display', 'none');
      },
      //跳转详情页
      shows(i) {
        if (i.orderState == 0) {
          this.$router.push('/OrderNo/' + i.orderNum);
        } else if (i.orderState == 1 && i.refundState == 3) {
          this.$router.push('/OrderMoney/' + i.orderNum);
        } else if (i.orderState == 1 && i.refundState == 1) {
          this.$router.push('/OrderMoney/' + i.orderNum);
        } else if (i.orderState == 1) {
          this.$router.push('/OrderDeliver/' + i.orderNum);
        } else if (i.orderState == 2) {
          this.$router.push('/OrderReceived/' + i.orderNum);
        } else if (i.orderState == 3) {
          this.$router.push('/OrderEnd/' + i.orderNum);
        } else if (i.orderState == 4) {
          this.$router.push('/OrderRefundShow/' + i.orderNum);
        } else if (i.orderState == 5) {
          this.$router.push('/OrderMoneychao/' + i.orderNum);
        }
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
                  message: res.body.msg
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
      getList() {
        let url = http.apiMap.getList;
        let data = {
          nowpage: this.currentPage,
          size: 10,
          common: this.GLOBAL.common
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
            refundState: 3,
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
            refundState: 2,
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
      //点击退款成功
      open4(i) {
        $(".deliver_tui").show();
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
            $(".deliver_tui").hide();
            $(".mask").hide();
          }
        );
      },
      //改价
      updata() {
        let url = http.apiMap.updataOrderNum;
        let data = {
          orderNum: this.orderNum,
          price: this.price * 100 - this.fight * 100,
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
      //分页跳转
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList()
      },
      //搜索订单
      findOrder() {
        var paddNum = function (num) {    //如果是一位数就补一个0
          num += "";
          return num.replace(/^(\d)$/, "0$1");
        }

        function FormatDate(strTime) {
          if (strTime) {
            var date = new Date(strTime);
            return date.getFullYear() + "-" + paddNum(date.getMonth() + 1) + "-" + paddNum(date.getDate());
          } else {
            return ''
          }
        }

        let url = http.apiMap.findOrder;
        let data = {
          orderNum: this.orderNum,
          userAccount: this.userAccount,
          common: this.GLOBAL.common,
          size: 10,
          nowpage: this.currentPage,
          startTime: FormatDate(this.time[0]),
          endTime: FormatDate(this.time[1]),
          orderState: $("#orderState :selected").attr('value')
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
              let data = res.body.data.orderList;
              for (let i = 0; i < data.length; i++) {
                let num = 0
                for (let q = 0; q < data[i].orderProduct.length; q++) {
                  num += data[i].orderProduct[q].amount

                }
                data[i].num = num
              }
              this.dataList = data;
              this.$message({
                type: 'success',
                message: '查询成功!'
              });
            }
          }
        );
      },
      qukong(){
        this.ExpressNum = this.ExpressNum.replace(/\s+/g, '')
      },
      //快递公司列表
      findExpressList() {
        let url = http.apiMap.findExpressList;
        let data = {
          common: 1
        }
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.expressList
              this.expressList = data
            }
          }
        );
      }
    }
  }
</script>
<style>
  .fahuo {
    width: 100px;
    float: left;
    line-height: 36px;
  }

  #addwuliu {
    height: 36px;
  }

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

