<template>
    <el-form :model="form" :rules="rules" ref="registerform" label-width="100px" class="demo-ruleForm">
		<el-form-item label="用户名" prop="username">
			<el-input v-model="form.username">
			</el-input>
		</el-form-item>
 
		<el-form-item label="密码" prop="password">
			<el-input type="password" v-model="form.password" >
				</el-input>
		</el-form-item>
					    
		<el-form-item label="姓名" prop="name">
			<el-input  v-model="form.name">
			</el-input>
		</el-form-item>
						
	    <el-form-item label="性别" prop="usersex">
			<el-input v-model="form.usersex">
			</el-input>
		</el-form-item>
						
		<el-form-item label="手机号" prop="userphone">
			<el-input  v-model="form.userphone" >
			</el-input>
		</el-form-item>
						
		<el-form-item label="邮箱" prop="email">
			<el-input  v-model="form.email" >
				</el-input>
		</el-form-item>
						
		<el-form-item label="银行卡账号" prop="userbankcard">
			<el-input  v-model="form.userbankcard" >
			</el-input>
		</el-form-item>
						
	    <el-form-item label="城市" prop="usercity">
		    <el-input  v-model="form.usercity" >
			</el-input>
		</el-form-item>
		<el-row>
		    <el-col :span="12">	    
                <el-form-item   label='验证码' prop="identify">	
		        <el-input v-model="form.identify" >
			    </el-input> 		
	            </el-form-item>
	     	</el-col>
		    <el-col :span="12">
		        <identify :identifyCode="identifyCode" style="margin-left: 130px"></identify>
		    </el-col>
		</el-row>
	
		<el-form-item>
	        <el-button type="primary" style="margin-left:100px" @click="submitForm('registerform')">提交</el-button>
	    </el-form-item>
			
     </el-form>
</template>

<script>

import Qs from 'qs';

import identify from '@/views/login/identify';
export default {
    data() { 
        return {
            form: {
                username: "",
                password: "",
				name: "",
				usersex: "",
				userphone: "",
				email: "",
				userbankcard: "",
				usercity: ""
            },
            rules: {
                username: [
                    {required: true, message: "用户名不能为空", trigger: 'blur'},
                    {min: 3, max: 5, message: "用户名3-5位", trigger: 'blur'}
                ],
                password: [
                    {required: true, message: "密码不能为空", trigger: 'blur'},
                    {min: 3, max: 5, message: "密码3-5位", trigger: 'blur'}
                ],
				userbankcard: [
					{required: true, message: "银行卡不能为空", trigger: "blur"},
					{min: 16, max: 16, message: "银行卡需16位卡号", trigger: "blur"}
				],
                name:[
					 {required: true, message: "姓名不能为空", trigger: 'blur'},
                     {min: 1, max: 10, message: "姓名最长10位", trigger: 'blur'}
				],
				usersex:[
					{required: true, message: "性别不能为空", trigger: 'blur'},
				],
				identify:[
					{required: true ,message: "验证码不能为空", trigger: 'blur'},
                    
				]
			
            },
			
			identifyCode: '',
			identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',
        };
	},
 	// 初始化验证码
	mounted () {
        this.identifyCode = ''
		this.makeCode(this.identifyCodes, 4)
        },
	methods: {
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
		//提交表单
		submitForm(formName) {
			this.$refs[formName].validate( valid => {
				if(!valid)  return;
			if (this.form.identify.toLowerCase() !== this.identifyCode.toLowerCase()) {
                this.$message({
                    message: '验证码错误请重新输入',
                    type: 'error',
                    center: true,
                    offset: 50
                    });
                this.refreshCode()
                 return
				 }
			    const {data}= this.axios.post('/register',Qs.stringify({
					type: "user",
                    username: this.form.username,
                    password: this.form.password,
					name: this.form.name,
					usersex: this.form.usersex,
					userphone: this.form.userphone,
					email: this.form.email,
					userbankcard: this.form.userbankcard,
					usercity: this.form.usercity
                }));
				/*
				0: 用户名被占用
				1: 提交申请
				 */
                // console.log(data);

				if(data == 0){
				 this.$message({
                    message: '用户名已被占用请重新输入',
                    type: 'error',
                    center: true,
                    offset: 50
                    });
                this.form.username='';
				}
	  			else {
				    this.$message({
					    type: 'success',
					    message: '已将您的信息提交，请等待管理员审核',
					    center: true,
                        offset: 50
				    });
				    this.$router.push('login');
				}
			});
		}
	},
	components: {
		identify
	}
};
</script>