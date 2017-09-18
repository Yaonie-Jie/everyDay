<template>
  <div id="box">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>后台账号管理</el-breadcrumb-item>
        <el-breadcrumb-item>账号角色与权限管理</el-breadcrumb-item>
      </el-breadcrumb>


      <div class="distribution">
        <div class="distribution_title">
          分配角色权限
        </div>
        <div class="distribution_form">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="role"
              label="角色"
              :span="2"
            >
            </el-table-column>
            <el-table-column
              prop="menuName"
              label="角色现有权限"
              :span="6"
            >
            </el-table-column>
            <el-table-column
              :span="4"
              label="操作"
            >
              <template scope="scope">
                <el-button type="text" size="small" @click="DisplayBlock2(scope.row)">权限分配</el-button>
                <el-button type="text" size="small" @click="open3(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="SumPage"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
      <!--添加账号角色-->
      <div class="add_account">
        <div class="add_title">添加账号角色</div>
        <div class="add_name">
          <el-input placeholder="填写角色名称" v-model="AddName"></el-input>
        </div>
        <div class="add_distribution">
          <i class="permission_url" @click="DisplayBlock">权限分配</i>
        </div>
        <el-button type="primary" @click="AddRole">确认添加</el-button>
      </div>
    </div>
    <div class="mask"></div>


    <div class="assign_role_permissions popup">
      <div class="assign_role_permissions_title popup_title">分配角色权限</div>
      <div class="checkbox_box">
        <div class="assign_checkbox">
          <ul>
            <li v-for="item in jurData" class="lis">
              <input type="checkbox" class="checks checkAll" :value="item.id"><span>{{item.name}}</span>
              <ul style="padding-left:30px;">
                <li v-for="list in item.data" class="listLi">
                  <input type="checkbox" class="checks checkList" :value="list.id"><span
                  v-text="list.name"></span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="popup_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="SumbitAdd">确定</el-button>
      </div>
    </div>

    <!--修改分配权限-->
    <div class="assign_role_permissions2 popup">
      <div class="assign_role_permissions_title popup_title">分配角色权限</div>
      <div class="checkbox_box">
        <div class="assign_checkbox">
          <ul>
            <li v-for="item in jurData" class="lis">
              <input type="checkbox" class="check checkAll" :value="item.id" >
              <span class="roleValue">{{item.name}}</span>
              <ul style="padding-left:30px;">
                <li v-for="list in item.data" class="listLi">
                  <input type="checkbox" class="check checkList" :value="list.id">
                  <span class="roleValue">{{list.name}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="popup_btn">
        <el-button @click="DisplayNone">取消</el-button>
        <el-button type="primary" @click="ChangeSumbit">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../http'

  export default {
    data() {
      return {
        tableData: [],
        jurData: [],
        TableDataUrl: this.GLOBAL.baseUrl + 'role/findAuthorityByRoleList',
        JurListUrl: this.GLOBAL.baseUrl + 'authority/findAuthorityList',
        DelectList: this.GLOBAL.baseUrl + 'role/removeRoleByIdL',
        AddRoleUrl: this.GLOBAL.baseUrl + 'role/addRole',
        getJurListUrl: this.GLOBAL.baseUrl + 'authority/findAuthorityByRoleId',
        ChangeRoleUrl: this.GLOBAL.baseUrl + 'role/saveAuthority',
        currentChange: 1,
        SumPage: '',
        AddName: '',
        AddID: '',
        AddValue: '',
        ChangeID: '',
        ChangeValue: '',
        RoleID: '',
//        AllList:[]
      }
    },
    created: function () {
      this.getJurisdiction();//定义方法
      this.getTable();
    },
    methods: {
      //获取列表信息
      getTable() {
        var tableList = [];
        var sumPage;
        $.ajax({
          type: 'POST',
          data: {'common': this.GLOBAL.common, 'size': 10, 'nowpage': this.currentChange},
          async: false,
          url: this.TableDataUrl,
          success: function (data) {
            if (data.result) {
              tableList = data.data.list;
              sumPage = data.data.count;
            } else {
              this.$message({
                type: 'error',
                message: data.msg
              });
            }
          }
        })
        this.tableData = tableList;
        this.SumPage = sumPage;
      },
      //分页
      handleCurrentChange(val) {
        this.currentChange = val;
        this.getTable()
      },
      //获取权限列表
      getJurisdiction() {
        var list = [];
        var that = this;
        $.ajax({
          type: 'POST',
          data: {'common': this.GLOBAL.common},
          url: this.JurListUrl,
          async: false,
          success: function (data) {
            if (data.result) {
              list = data.data.authorityList;
              var parentList = [];
              var ChildList = [];
              //寻找子元素
              for (var i = 0; i < list.length; i++) {
                for (var j = 0; j < list.length; j++) {
                  if (list[j].parentId == list[i].id) {
                    ChildList.push(list[j]);
                  }
                }
              }
              //寻找父元素--删除子元素就是父元素啦
              for (var i = 0; i < ChildList.length; i++) {
                for (var j = 0; j < list.length; j++) {
                  if (list[j].id == ChildList[i].id) {
                    list.splice(j, 1);
                    j = j - 1;
                  }
                }
              }
              parentList = list;
              //把子元素push到父元素
              for (var i = 0; i < parentList.length; i++) {
                parentList[i].data = [];
                for (var j = 0; j < ChildList.length; j++) {
                  if (ChildList[j].parentId == parentList[i].id) {
                    parentList[i].data.push(ChildList[j])
                  }
                }
              }
              that.jurData = parentList;
            } else {
              this.$message({
                type: 'error',
                message: data.msg
              });
            }
          }
        })

      },
      //添加角色确认按钮
      AddRole() {
        var that = this;
        this.$confirm('此操作将添加账号角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var item = this;
          if (that.AddName == '') {
            item.$message({
              type: 'info',
              message: '角色不能为空!'
            });
          } else {
            if (that.AddID == '' || that.AddValue == '') {
              item.$message({
                type: 'info',
                message: '请选择权限分配!'
              });
            } else {
              var data = {
                'role': that.AddName,
                'menuIds': that.AddID,
                'menus': that.AddValue,
                'common': this.GLOBAL.common
              }
              $.ajax({
                type: 'POST',
                data: data,
                url: that.AddRoleUrl,
                success: function (data) {
                  if (data.result) {
                    item.$message({
                      type: 'info',
                      message: '添加成功!'
                    });
                    that.AddID = '';
                    that.AddValue = '';
                    that.AddName = '';
                    that.getTable();
                  } else {
                    item.$message({
                      type: 'info',
                      message: data.msg
                    });
                  }
                }
              })
            }
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          });
        });
      },
      //删除
      open3(row) {
        var thats = this;
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var that = this;
          $.ajax({
            type: 'GET',
            data: {'common': this.GLOBAL.common, 'id': row.id},
            url: this.DelectList,
            success: function (data) {
              if (data.result) {
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                thats.getTable();
              } else {
                that.$message({
                  type: 'info',
                  message: '此角色下有账号，不能删除成功!'
                });
              }
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //添加角色
      DisplayBlock: function () {
        if (this.AddID == '') {
          $(".checks").attr('checked', false)
        }
        $('.mask').css('display', 'block');
        $('.assign_role_permissions').css('display', 'block');
      },
      //添加获取角色id和value
      SumbitAdd: function () {
        var ChecksID = '';
        var ChecksValue = '';
        $(".checks").each(function () {
          var isChecked = $(this).is(':checked');
          if (isChecked) {
            ChecksID += $(this).attr('value') + ',';
            ChecksValue += $(this).next('span').html() + ',';
          }
        })
        this.AddID = ChecksID;
        this.AddValue = ChecksValue;
        $('.mask').css('display', 'none');
        $('.assign_role_permissions').css('display', 'none');
      },
      //取消
      DisplayNone () {
        $('.mask').css('display', 'none');
        $('.assign_role_permissions').css('display', 'none');
        $('.assign_role_permissions2').css('display', 'none');
        window.location.reload()
      },
      //修改权限
      DisplayBlock2(row) {
        var roleID = row.id;
        this.RoleID = roleID;
        var data = {'roleId': roleID, 'common': this.GLOBAL.common}
        $.ajax({
          type: 'POST',
          data: data,
          url: this.getJurListUrl,
          success: function (data) {
            if (data.result) {
              var list = data.data.authorityList;
              var IdList = [];
              let arr=[];
              for (var i = 0; i < list.length; i++) {
                IdList.push(list[i].id)
              }
              $(".check").each(function () {
                for (var j = 0; j < IdList.length; j++) {
                  if ($(this).val() == IdList[j]) {
                    $(this).attr('checked',true)
                  }
                }
              })

            }
          }
        })
        $('.mask').css('display', 'block');
        $('.assign_role_permissions2').css('display', 'block');
      },
      //修改权限id和value
      ChangeSumbit: function () {
        var ChecksID = '';
        var ChecksValue = '';
        $(".check").each(function () {
          var isChecked = $(this).is(':checked');
          if (isChecked) {
            ChecksID += $(this).attr('value') + ',';
            ChecksValue += $(this).next('span').html() + ',';
          }
        })
        this.ChangeID = ChecksID;
        this.ChangeValue = ChecksValue;
        var data = {
          'menuIds': this.ChangeID,
          'menus': this.ChangeValue,
          'common': this.GLOBAL.common,
          'loginAccount': sessionStorage.getItem('account'),
          'id': this.RoleID
        }
        var that = this;
        $.ajax({
          type: 'POST',
          data: data,
          url: this.ChangeRoleUrl,
          success: function (data) {
            if (data.result) {
              that.RoleID = '';
              that.ChangeID = '';
              that.ChangeValue = '';
              that.getTable();
              window.location.reload()
              that.$message({
                type: 'success',
                message: '修改成功'
              });
            } else {
              that.ChangeID = '';
              that.ChangeValue = '';
              that.$message({
                type: 'error',
                message: '修改失败'
              });
            }

          },
          error: function () {
            that.$message({
              type: 'error',
              message: '修改失败'
            });
          }
        })
        $('.mask').css('display', 'none');
        $('.assign_role_permissions2').css('display', 'none');
      },


    }


  }
</script>
<style lang="scss">
  #box {
    position: relative;
  }

  .add_account {
    width: 100%;
    height: 200px;
    text-align: center;
    border-top: 1px solid #c4c4c4;
  }

  .add_title, .add_name, .add_distribution {
    width: 100%;
    padding: 0 40%;
    box-sizing: border-box;
  }

  .add_title {
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    margin-top: 20px;
  }

  .add_name {
    width: 100%;
    height: 36px;
    overflow: hidden;
  }

  .add_name input {
    width: 100%;
    height: 30px;
    font-size: 14px;
  }

  .add_distribution {
    text-align: left;
    line-height: 48px;
    font-size: 14px;
  }

  .add_distribution i {
    text-decoration: none;
    cursor: pointer;
    color: #20a0ff;
  }

  .el-button {
    margin: auto;
  }

  .distribution {
    width: 100%;
    height: auto;
    padding-bottom: 50px;
    overflow: hidden;
    margin-top: 50px;
  }

  .listLi {
    margin-top: 10px;
  }

  .distribution_title {
    text-align: center;
    font-size: 18px;
    line-height: 60px;
    margin-top: 20px;
  }

  .distribution_form {
    width: 80%;
    margin: 0 10%;
  }

  .distribution_form table tr td {
    text-align: center;
  }

  .distribution_form table tr th {
    text-align: center;
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

  .el-pagination {
    float: right;
    margin: 50px 10% 0 0;
  }

  .assign_checkbox .lis {
    width: 100%;
    height: auto;
    text-align: left;
    margin: 0 auto 15px;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    display: none;
  }

  .popup {
    border-radius: 10px;
    width: 600px;
    max-height: 400px;
    overflow-y: scroll;
    padding: 30px;
    background: #FFFFFF;
    position: fixed;
    top: 100px;
    left: 50%;
    margin-left: -330px;
    z-index: 999;
    text-align: center;
    display: none;
  }

  .popup_title {
    font-size: 16px;
    color: #303030;
    text-align: center;
    line-height: 32px;
  }

  .popup_btn {
    margin: 0 auto;
    margin-top: 20px;
  }

  .checkbox_box {
    overflow: hidden;
  }

  .assign_checkbox {
    width: 50%;
    height: auto;
    margin: 0 auto;
  }
</style>
