<template>
  <div id="boxs">
    <div class="content">
      <div class="titles">
        登录信息
      </div>
      <ul>
        <li>用户名：<span v-text="accounts.account"></span></li>
        <li>上次登录时间：<span v-text="accounts.loginTime"></span></li>
        <li>上次登录地址：<span v-text="accounts.loginAddr"></span></li>
        <li>ip地址：<span v-text="accounts.loginIp"></span></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        accounts:{},
        getAccount:this.GLOBAL.baseUrl+'account/findNewsByAccount'
      }
    },
    created: function(){
      this.getAccounts()
    },
    methods: {
      getAccounts: function () {
        var account = {};
        $.ajax({
          type: 'POST',
          data: {'account': 'admin', 'common': this.GLOBAL.common},
          async: false,
          url: this.getAccount,
          success: function (data) {
              if(data.result){
                account = data.data.account;
              }else{
                  swal({title:'',text:'获取信息失败！'})
              }


          }
        })
        this.accounts = account;
        console.log(this.accounts)
      }

    }
  }

</script>
<style>
  .titles{
    width:100%;
    height:60px;
    background: #ff3366;
    line-height: 60px;
    text-align: center;
    color:#fff;
  }
  .content{
    width:400px;
    border:1px solid #ff3366;
    border-radius: 7px;
    margin:100px auto 0;
    overflow: hidden;
  }
  .content ul{
    padding:20px;
    width:100%;
    box-sizing: border-box;
  }
  .content ul li{
    margin-bottom:20px;
  }

</style>
