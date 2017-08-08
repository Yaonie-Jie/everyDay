<template>
  <div id="boxs">
    <div class="content">
      <div class="titles">
        修改当前密码
      </div>
      <div class="form">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="当前密码:" prop="nowpass">
            <el-input v-model="ruleForm2.nowpass" placeholder="请输入原密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入修改后的密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确保两次输入的密码一致"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')" class="right" style="margin-right: 50px;">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(Element)
  export default {
    data() {
      var NowPass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入当前密码'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
          this.ruleForm2.checkPass='';
        } else {
          callback();
        }
      };
      return {
        changePass:this.GLOBAL.baseUrl+'account/modifyAccountLoginPassword',
        ruleForm2: {
          pass: '',
          checkPass: '',
          nowpass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          nowpass: [
            { validator: NowPass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
          if(this.ruleForm2.pass!=''&&this.ruleForm2.nowpass!=''&&this.ruleForm2.checkPass!=''){
              if(this.ruleForm2.pass==this.ruleForm2.nowpass){
                  swal({title:'',text:'当前密码与修改密码相同'});
                  this.ruleForm2.pass='';
                  this.ruleForm2.checkPass='';
              }else{
                var data={
                  'oldPassword':this.ruleForm2.nowpass,
                  'newPassword':this.ruleForm2.pass,
                  'common':this.GLOBAL.common,
                  'account':'admin'
                }
                var that=this;
                $.ajax({
                  type:'POST',
                  url:this.changePass,
                  data:data,
                  success:function(data){
                 if(data.result){
                   that.ruleForm2.pass='';
                   that.ruleForm2.nowpass='';
                   that.ruleForm2.checkPass='';
                 }
                    swal({title:'',text:data.msg})
                  }
                })
              }


          }else{
              swal({title:'',text:'密码不能为空'})
          }


      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
  /*.form{*/
    /*padding:30px 30px 0 0;*/
  /*}*/
  .form{
    width:300px;
    margin:0 auto;
  }
</style>
