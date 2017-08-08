<template>
  <div id="Header">
    <header class="header">
      <div class="left"><img src="../assets/logo.png" alt=""></div>
      <div class="right">
        <el-menu theme="dark" default-active="/" class="el-menu-demo" mode="horizontal"  :router="true">
          <el-submenu index="2" class="login-user">
            <template slot="title">欢迎<span>admin</span>登录</template>
            <el-menu-item index="/User">登录信息</el-menu-item>
            <el-menu-item index="/ChangePass">修改密码</el-menu-item>
          </el-submenu>
          <el-menu-item index="1" class="out-login">退出登录</el-menu-item>
        </el-menu>
      </div>
    </header>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'

  Vue.use(Element)

  export default {
    name: 'Header'
  }
</script>
