<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>后台账号管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理后台账号</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="account_list">
        <div class="account_list_title mid">后台账号列表</div>
        <div class="distribution_form">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="account"
              label="账号"
              :span='3'>
            </el-table-column>
            <el-table-column
              prop="createOn"
              label="添加时间"
              :span='3'>
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="添加人"
              :span='3'
            >
            </el-table-column>
            <el-table-column
              prop="role"
              :span='3'
              label="角色">
            </el-table-column>
            <el-table-column label="操作" fixed="right" :span='3'>
              <template scope="scope">
                <el-button type="text" size="small" @click="DisplayBlock2(scope.row)" class="cPass">修改密码</el-button>
                <el-button type="text" size="small" @click="DisplayBlock3(scope.row)">分配角色</el-button>
                <el-button type="text" size="small" @click="open3(scope.row)">注销账号</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--分页-->
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="count11">
          </el-pagination>
        </div>
      </div>
      <!--添加后台账号-->
      <div class="add_background_account">
        <div class="add_background_account_title mid">添加后台账号</div>
        <div class="login_account">
          <div class="login_account_title">登录账号：</div>
          <el-input placeholder="登录账号" v-model="loginName"></el-input>
        </div>
        <div class="login_password">
          <div class="login_password_title">登录密码：</div>
          <el-input placeholder="登录密码" v-model="loginPass"></el-input>
        </div>
        <p>
          <el-button type="text" @click="DisplayBlock">分配角色</el-button>
        </p>
        <el-button type="primary" @click="open2">确认</el-button>
      </div>
    </div>
    <div class="mask"></div>
    <!--分配角色-->
    <div class="assign_roles popup">
      <div class="assign_roles_title popup_title">分配角色</div>
      <ul>
        <li v-for="item in RoledList">

          <input type="radio" v-bind:value="item.id" class="check" name="check"><span v-text="item.role"
                                                                                      style="margin-left:20px;"></span>
        </li>
      </ul>
      <div class="assign_role_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="Sumbit">确定</el-button>
      </div>
    </div>
    <div class="assign_roles2 popup">
      <div class="assign_roles_title popup_title">分配角色</div>
      <ul>
        <li v-for="item in RoledList">

          <input type="radio" v-bind:value="item.id" class="check" name="check"><span v-text="item.role"
                                                                                      style="margin-left:20px;"></span>

        </li>
      </ul>
      <div class="assign_role_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="Sumbit2">确定</el-button>
      </div>
    </div>
    <!--修改密码-->
    <div class="popup change_password">
      <div class="popup_title">修改密码</div>
      <div class="popup_form">
        <div class="popup_form_title">新密码</div>
        <el-input placeholder="请输入内容" v-model="newPass"></el-input>
      </div>

      <div class="popup_btn">
        <el-button @click="DisplayNone2">取消</el-button>
        <el-button type="primary" @click="ChangePass">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import http from '../../http'

  export default {
    data() {
      return {
        tableData: [],
        RoledList: [],
        ChangePassUrl: this.GLOBAL.baseUrl + 'account/modifyAccountPassword',
        DelectData: this.GLOBAL.baseUrl + 'account/removeAccountL',
        RoledUrl: this.GLOBAL.baseUrl + 'role/findRoleList',
        AddUrl: this.GLOBAL.baseUrl + 'account/addAccount',
        ChangeRoleUrl: this.GLOBAL.baseUrl + 'account/modifyAccountRole',
        currentChange: 1,
        SumPage: '',
        newPass: '',
        ChangePassAccount: '',
        AddID: '',
        AddValue: '',
        loginName: '',
        loginPass: '',
        ChangeID: '',
        ChangeValue: '',
        currentPage: 1,
        count11: 1,
        RoleID: ''
      }
    },
    created: function () {
      this.getTable()//定义方法
      this.getRoled()
    },
    methods: {
      //获取列表
      getTable: function () {

        let url = http.apiMap.findAccountList;
        let data = {
          size: 10,
          nowpage: this.currentPage,
          common: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.accountList;
              this.tableData = data;
            } else {
              console.log('暂无物流信息')
            }
          }
        );
      },
      //分页
      handleCurrentChange(val) {
        this.currentChange = val;
        this.getTable()
      },
      //修改密码
      ChangePass() {
        if (this.newPass == '') {
          this.$message({
            type: 'error',
            message: '密码不能为空'
          });
        } else {
          let that=this
          var data = {'account': this.ChangePassAccount, 'common': this.GLOBAL.common, 'password': this.newPass};
          $.ajax({
            type: 'POST',
            url: this.ChangePassUrl,
            data: data,
            success: function (data) {
              if (data.result) {
                that.newPass = '';
                that.$message({
                  type: 'success',
                  message: '修改成功'
                });
                $('.mask').css('display', 'none');
                $('.change_password').css('display', 'none');
              } else {
                that.$message({
                  type: 'error',
                  message: data.msg
                });
              }

            }

          })
        }
      },
      //添加账号
      open2() {
        var thats = this;
        this.$confirm('此操作将添加后台账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var that = this;
          if (this.loginName == '') {
            that.$message({
              type: 'info',
              message: '登录账号不能为空!'
            });
          } else {
            if (this.loginPass == '') {
              that.$message({
                type: 'info',
                message: '登录密码不能为空!'
              });
            } else {
              if (this.AddID == '' || this.AddValue == '') {
                that.$message({
                  type: 'info',
                  message: '请选择角色分配!'
                });
              } else {
                var data = {
                  'account': this.loginName,
                  'password': this.loginPass,
                  'roleIds': this.AddID,
                  'roles': this.AddValue,
                  'loginAccount': sessionStorage.getItem('account'),
                  'common': this.GLOBAL.common
                };
                $.ajax({
                  type: 'POST',
                  data: data,
                  url: this.AddUrl,
                  success: function (data) {
                    if (data.result) {
                      thats.loginName = '';
                      thats.loginPass = '';
                      thats.AddID = '';
                      thats.AddValue = '';
                      that.$message({
                        type: 'success',
                        message: '添加成功'
                      });

                      that.getTable()
                    } else {
                      that.$message({
                        type: 'error',
                        message: data.msg
                      });
                    }


                  }
                })
              }
            }
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          });
        });
      },
      //注销账号
      open3(row) {
        this.$confirm('此操作将注销账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            'common': this.GLOBAL.common,
            'id': row.id,
            loginAccount:sessionStorage.getItem('account')
          }
          var that = this;
          $.ajax({
            type: 'POST',
            url: this.DelectData,
            data: data,
            success: function (data) {
              if (data.result) {
                that.$message({
                  type: 'success',
                  message: '注销成功'
                });
                that.getTable()
              } else {
                that.$message({
                  type: 'info',
                  message: '注销失败'
                });
              }
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          });
        });
      },
      //获取角色列表
      getRoled: function () {
        var data = {'common': this.GLOBAL.common};
        var roleList = [];
        $.ajax({
          type: 'POST',
          data: data,
          url: this.RoledUrl,
          async: false,
          success: function (data) {
            if (data.result) {
              roleList = data.data.list;
            }
          }
        })
        this.RoledList = roleList;
      },
      //添加账号分配角色
      DisplayBlock: function () {
        $(".check").attr('checked', false);
        $('.mask').css('display', 'block');
        $('.assign_roles').css('display', 'block');
      },
      //确认角色按钮
      Sumbit: function () {
        var arrId = '';
        var arrValue = '';
        $(".check").each(function () {
          var isChecked = $(this).is(':checked');
          if (isChecked) {
            arrId = $(this).attr('value');
            arrValue = $(this).next('span').html();
          }
        })
        this.AddID = arrId;
        this.AddValue = arrValue;
        $('.mask').css('display', 'none');
        $('.assign_roles').css('display', 'none');
      },
      //确认角色按钮--修改
      Sumbit2: function () {
        var arrId = '';
        var arrValue = '';
        $(".check").each(function () {
          var isChecked = $(this).is(':checked');
          if (isChecked) {
            arrId = $(this).attr('value');
            arrValue = $(this).next('span').html();
          }
        })
        this.ChangeID = arrId;
        this.ChangeValue = arrValue;
        var data = {
          'roleIds': this.ChangeID,
          'roles': this.ChangeValue,
          'id': this.RoleID,
          'common': this.GLOBAL.common
        }
        var that = this;
        $.ajax({
          type: 'POST',
          data: data,
          url: this.ChangeRoleUrl,
          success: function (data) {
            if (data.result) {
              that.$message({
                type: 'success',
                message: '修改成功'
              });
              that.getTable();
              that.ChangeID = '';
              that.ChangeValue = '';
              that.RoleID = '';
            } else {
              that.$message({
                type: 'error',
                message: '修改失败'
              });
            }
          }
        })
        $('.mask').css('display', 'none');
        $('.assign_roles2').css('display', 'none');
      },
      //取消
      DisplayNone: function () {
        $('.mask').css('display', 'none');
        $('.assign_roles').css('display', 'none');
        $('.assign_roles2').css('display', 'none');
      },
      //修改密码
      DisplayBlock2: function (row) {
        this.newPass = '';
        $('.mask').css('display', 'block');
        $('.change_password').css('display', 'block');
        var user = row.account;
        this.ChangePassAccount = user;
      },
      //修改密码取消按钮
      DisplayNone2: function () {
        $('.mask').css('display', 'none');
        $('.change_password').css('display', 'none');
      },
      //修改角色分配
      DisplayBlock3: function (row) {
        var that = this;
        $(".check").each(function () {
          if ($(this).next('span').html() == row.role) {
            $(this).attr('checked', true)
          }
          that.RoleID = row.id;
          $('.mask').css('display', 'block');
          $('.assign_roles2').css('display', 'block');
        })
      }
    },

  }
</script>
<style>
  .popup_form {
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }

  .popup_form_title {
    width: 25%;
    float: left;
    line-height: 36px;
  }

  .popup_form .el-input,
  .popup_form .el-select,
  .popup_form .el-textarea {
    width: 70%;
    float: left;
  }

  .box {
    width: 100%;
    height: 100%;
    min-height: 600px;
    padding: 10px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .location {
    font-size: 18px;
  }

  .location a {
    font-size: 18px;
    color: #303030;
    text-decoration: none;
  }

  .location a:hover {
    text-decoration: underline;
  }

  .account_list {
    margin-top: 30px;
    overflow: hidden;
  }

  .distribution_form {
    width: 80%;
    margin-left: 10%;
  }

  .table tr td {
    text-align: center;
    border-color: #303030 !important;
  }

  .operation a {
    color: #303030;
  }

  .operation a:hover {
    text-decoration: underline;
    color: #303030;
  }

  .operation a:first-child {
    margin-right: 5px;
  }

  .operation a:last-child {
    margin-left: 5px;
  }

  .account_list_title {
    text-align: center;
    font-size: 16px;
    line-height: 60px;
    margin-top: 10px;
  }

  .add_background_account {
    height: auto;
    border-top: 0;
    text-align: center;
    overflow: hidden;
  }

  .add_background_account_title {
    text-align: center;
    font-size: 16px;
    line-height: 60px;
    margin-top: 10px;
  }

  .login_account, .login_password {
    width: 65%;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
  }

  .login_account_title, .login_password_title {
    width: 25%;
    float: left;
    line-height: 36px;
  }

  .login_account .el-input, .login_password .el-input {
    width: 70%;
    float: left;
  }

  .add_background_account p {
    width: 500px;
    margin: 0 auto;
    font-size: 16px;
    margin-top: 10px;
    line-height: 30px;
    text-align: left;
    box-sizing: border-box;
  }

  .add_background_account p .el-button--text span {
    font-size: 16px;
    line-height: 32px;
  }

  .add_background_account .el-button {
    margin: 0 auto;
  }

  .current_tip {
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: red;
    /*display: none;*/
  }

  .assign_roles ul {
    margin-top: 20px;
  }

  .assign_roles li {
    width: 40%;
    height: 28px;
    text-align: left;
    margin: 0 auto;
  }

  .assign_roles2 ul {
    margin-top: 20px;
  }

  .assign_roles2 li {
    width: 40%;
    height: 28px;
    text-align: left;
    margin: 0 auto;
  }

  .assign_role_btn {
    margin: 0 auto;
    margin-top: 20px;
  }

  .assign_role_btn .el-button:nth-child(1) {
    float: left;
    margin-left: 20%;
  }

  .assign_role_btn .el-button:nth-child(2) {
    float: right;
    margin-right: 20%;
  }
</style>
