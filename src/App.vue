<template>
  <div id="app">
    <!-- 头部导航 -->
    <Heads></Heads>
    <main>
          <!-- 左侧导航 -->
        <div class="main-left">
          <NavBar></NavBar>
        </div>
          <!-- 右侧主内容区 -->
          <div  class="main-right" >
            <transition name="fade">
              <router-view class="view"></router-view>
            </transition>
          </div>
    </main>
  </div>
</template>

<script>

import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Heads from 'components/Heads.vue'
import NavBar from 'components/NavBar.vue'
import $ from 'jquery'

Vue.use(Element)

export default {
  name: 'app',
  components:{Heads,NavBar},
  data: function (){
    return {
      active:true,
      headerFixed : true
    }
  },
  created: function(){
    this.$router.push('/BrandGoods');
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
ul,li{
  list-style: none;
}
body{margin: 0;}
#app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
}
/* 头部导航 */
header{
z-index: 1000;min-width: 1200px;
transition: all 0.5s ease;  background-color: #ff3366;
box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
height:80px;  box-sizing: border-box;
padding: 0 40px;width:100%;
color:#fff;line-height: 80px;
position:fixed;
top:0;
left:0;
}
header .left{float: left;font-size: 30px;}
header .right{float: right; }
header img{
  height:30px;
}
header span {
  color:yellow;
  margin:0 5px;
}
.el-menu--dark{
  background: #ff3366!important;
  height: 80px;
}
.login-user .el-submenu__title{
  background: #ff3366!important;
  height: 80px!important;
  line-height: 80px!important;
  border-bottom: none!important;
  color:#fff!important;
}
.out-login{
  background: #ff3366!important;
  height: 80px!important;
  line-height: 80px!important;
  border-bottom: none!important;
  color:#fff!important;
}
/*.el-menu--horizontal .el-submenu .el-submenu__title{height:80px!important;line-height: 80px!important;color:#fff;!important;background: #ff3366;!important;}*/
  /* 主内容区 */
main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 800px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;margin-top:80px;  }
main .main-left{-webkit-box-flex: 0;-ms-flex: 0 0 285px;flex: 0 0 285px;border-right:10px solid #E9ECF1;}
main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 50px 70px; }
main .el-menu{background-color: transparent!important;}
/*  */
.router-link{display:inline-block;width:100%;height:100%;text-align:center;color:#475669;text-decoration: none; }
.is-active .router-link{color:#ffffff!important;background: #ff3366!important;}
/* 单选框 */
  .el-form-item .el-radio+.el-radio {
    margin-left: 30px!important;
  }
  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }

/* 导航栏菜单选中效果 */
  .isActive{color: #ffffff!important; background: #ff3366!important;}
   #app main .aside .is-active{color: #ff3366;}

  /* 卡片 */
  .el-card{overflow: visible!important;}
  .main-right{
   box-size:border-box;
  }
</style>
