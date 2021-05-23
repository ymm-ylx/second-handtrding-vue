<template>
	<div class="register-container">
		<h2 style="text-align: center"> 用户注册</h2>
		<el-card  class="register-form" label-width="150px" style="background:#FFFFFF; background-color: rgba(255, 255, 255, 0.722); border-radius: 20px; " >
		   <el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="普通用户" name="first" >
					<userregister v-if="userisupdate"></userregister>
			    </el-tab-pane>
 
			<el-tab-pane label="商家" name="second">
				<businessregister v-if="merchantisupdate"></businessregister>
			</el-tab-pane>
		</el-tabs>
		</el-card>
	</div>
</template>
 
<script>

import businessregister from '@/views/login/BusinessRegister';

import userregister from '@/views/login/UserRegister';

export default {
	data() {
      return {
        activeName: 'first',
		userisupdate: true,
		merchantisupdate : false
      }
	},

	methods:{
	//选项卡切换
	handleClick(tab, event) {
		if(tab.name == "first") {
                this.userisupdate = true;
                this.merchantisupdate = false;
            } else if(tab.name == "second") {
                this.userisupdate = false;
                this.merchantisupdate= true;
            }
	},
	},

	components: {
		businessregister,
		userregister,
	}
};
</script>
 
<style acoped>
.register-form{
     width: 500px; 
     margin: 50px auto; 
     background-color: rgba(255, 255, 255, 0.822); /* 透明背景色 */
     padding: 30px;
     border-radius: 20px; 
}
.register-container {
    position: absolute;
    width: 100%;
    height: 200% auto; 
    background: url("../assets/login.jpg");
}
</style>