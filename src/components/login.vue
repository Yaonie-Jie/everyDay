<template>
  <div class="hello">
    <div class="padd"></div>
    <div class="box">
      <h1>美日美C后台登录</h1>
      <ul>
        <li>
          <div class="left">账号：</div>
          <div class="right">
            <input type="text" placeholder="请您输入账号" v-model="account" class="account">
          </div>
        </li>
        <li>
          <div class="left">密码：</div>
          <div class="right">
            <input type="password" placeholder="请你输入密码" v-model="password" class="password">
          </div>
        </li>
        <li>
          <button class="btn" @click="login" >登录</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  import http from '../http'

  Vue.use(Element)

  export default {
    name: 'hello',
    data() {
      return {
        account: '',
        password: ''
      }
    },
    created() {
      $(document).on('keyup',function(event){
        if(event.keyCode ==13){
          $(".btn").click()
        }
      });
    },
    methods: {

      login() {
        let url = http.apiMap.login;
        let data = {
          account: this.account,
          password: this.password,
          common: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              sessionStorage.setItem('account', this.account);
              sessionStorage.setItem('router',JSON.stringify(res.body.data.menus));
              this.$router.push('/');
            } else {
              this.$message({
                type: 'warning',
                message: res.body.msg
              });
            }
          }
        );
      }
    }
  }
</script>

<style scoped="scoped">
  .padd {
    height: 200px;
  }

  .hello {
    background: #ff3366;
    height: 100%;
    width:100%;
  }

  .box {
    width: 500px;
    height: auto;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ff3366;
  }

  h1 {
    text-align: center;
    margin: 0;
    margin-bottom: 30px;
    padding-bottom: 30px;
    color: #fff;
    border-bottom: 1px solid yellow;
  }

  li {
    list-style: none;
    padding: 20px 0;
  }

  li div {
    float: left;
  }

  .left {
    text-align: right;
    box-sizing: border-box;
    padding-right: 20px;
    color: #fff;
  }

  .right {
    width: 85%;
  }

  input {
    width: 100%;
    border: none;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    box-sizing: border-box;
    border-radius: 3px;
  }

  .btn {
    background: yellow;
    color: #333;
    width: 100%;
    border: none;
    padding: 10px 0;
    margin-top: 30px;
    border-radius: 5px;
  }
</style>

