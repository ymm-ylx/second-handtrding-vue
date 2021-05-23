<template>
  <div class="login-container">
    <el-form ref="loginformref" :rules="rules" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">二手交易网站</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item class="button">
        <el-button type="primary" @click="registerForm()">注册</el-button>
         <el-button type="primary" style="margin-left:100px" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import Qs from 'qs'

export default {
    data() { 
        return {
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    {required: true, message: "用户名不能为空", trigger: 'blur'},
                    {min: 3, max: 10, message: "用户名3-5位", trigger: 'blur'}
                ],
                password: [
                    {required: true, message: "密码不能为空", trigger: 'blur'},
                    {min: 3, max: 10, message: "密码3-5位", trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.loginformref.validate( valid =>{
                 if (!valid)  return ;
                this.axios.post('/login',
                   Qs.stringify({
                     username: this.form.username,
                     password: this.form.password
                   })).then(response=>{
                     console.log(response.data);

                 /*
                 1:  管理员;
                 2:  普通用户;
                 3:  商家;
                 -1: 登录错误
                 */
                 if(response.data == "1") {
                  window.sessionStorage.setItem('token',"ok");
                  window.sessionStorage.setItem('adminname', this.form.username);
                  window.sessionStorage.setItem('adminpassword', this.form.password);
                  const h = this.$createElement;
                  this.$notify({ title: '成功', message: h('i', '欢迎管理员大人(〃∇〃)'),type:'success'});
                  this.$router.push({path: '/adminplatformhome'});
                 }
                 else if(response.data == "2"){
                  window.sessionStorage.setItem('token',"ok");
                  window.sessionStorage.setItem('username', this.form.username);
                  window.sessionStorage.setItem('userpassword', this.form.password);
                  const h = this.$createElement;
                  this.$notify({ title: '成功', message: h('i', '欢迎~\(≧▽≦)/~'),type:'success'});
                  this.$router.push({path: '/platformhome'});
                   }else if(response.data == "3"){
                  window.sessionStorage.setItem('token',"ok");
                  window.sessionStorage.setItem('merchantname', this.form.username);
                  window.sessionStorage.setItem('merchantpassword', this.form.password); 
                  const h = this.$createElement;
                  this.$notify({ title: '成功', message: h('i', '欢迎ヾ(❀╹◡╹)ﾉ~'),type:'success'});                  
                  this.$router.push({path: '/merchantplatformhome'});
                 }else {
                  this.$message({
                    message: '用户名密码错误请重新输入',
                    type: 'error',
                    center: true,
                    offset: 250
                    });
                    this.$refs.loginformref.resetFields();
                }
                   });
     

           })
        },
        registerForm(){
           this.$router.push({path: '/register'});
        }
    }
  }
</script>

<style acoped>
.login-form {
     width: 400px;
     margin: 300px auto;
     background-color: rgba(255, 255, 255, 0.766); /* 透明背景色 */
     padding: 30px;
     border-radius: 20px; /* 圆角 */
}

/* 背景 */
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../assets/login.jpg");
}

/* 标题 */
.login-title {
    color: #313330;
    text-align: center;
}
</style>