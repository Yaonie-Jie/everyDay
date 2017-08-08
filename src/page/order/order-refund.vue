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
              <el-radio class="radio" v-model="radio" label="1">只看已审核同意的订单</el-radio>
            </div>
          </div>
          <div class="apply_information">
            退货类型：
            <select name="">
              <option value="">全部</option>
              <option value="">退款</option>
              <option value="">退货退款</option>
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
                <el-button @click="open2">审核驳回</el-button>
                <el-button @click="open3">审核同意</el-button>
                <el-button @click="open4">退款成功</el-button>
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
                  <div class="right"><el-button type="danger">退款中&nbsp;&nbsp;&nbsp;退款类型：退款</el-button></div>
                </div>
              </div>
              <div class="right AddPic">
                <p>订单总额：<span>200.00</span></p>
                <p>包含运费：<span>11.00</span></p>
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
  </div>
</template>

<script>
  export default {
    methods: {
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
      shows:function(){
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



