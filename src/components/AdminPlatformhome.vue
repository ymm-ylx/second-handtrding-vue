<template>
    <div>
        <el-container class="BigContainer">
            <el-header class="header">                
              <span style="text-align: center; font-size:30px;font-weight:400;margin-top:10px"> 
               {{$conf.admintitle}}
              </span> 
              <div class="admin-avator" >
              <el-avatar style="background:#409EFF" @click="admin" >{{$conf.adminlogo}} </el-avatar>  
              </div>
              <a class="admin-name" v-text="adminname"></a>
              <el-popover
                    placement="bottom"
                    title="我的钱包"
                    trigger="click"
                    >  
                 <ul class="tips-content">
                  <a>您的余额为：{{adminbalance}}元</a>
                </ul>        
                <i  slot="reference" class="el-icon-wallet"  @click="getadminwallet(adminname)"></i>
                </el-popover>
             <el-link class="adminexit" @click="exit">
             退出
             </el-link>
            </el-header>
        <el-container>
        <el-aside >
    <el-menu default-active="$route.path" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose" background-color="#FFFFFF"
       text-color="#333" active-text-color="#409EFF" style="height:100% ;" >
      <el-submenu index="verify">
        <template slot="title">
          <i class="el-icon-warning"></i>
          <span>审核</span>
        </template>
        <el-menu-item-group> 
          <el-menu-item index="/adminplatformhome/userverify" >普通用户</el-menu-item>
          <el-menu-item index="/adminplatformhome/merchantverify">商家</el-menu-item>
          <el-menu-item index="/adminplatformhome/goodsverify">商品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="management">
        <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/adminplatformhome/usermanagement">普通用户</el-menu-item>
          <el-menu-item index="/adminplatformhome/merchantmanagement">商家</el-menu-item>
      </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
   
  <el-main>
     <router-view></router-view>
  </el-main>

           </el-container>
        </el-container>
    </div>
</template>
<script>
import Qs from 'qs'
  export default {
    data(){
      return {
        adminname: 'admin',
        adminbalance:""
      }
    },
    created(){
      this.admin();
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);

      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      exit(){
        window.sessionStorage.clear();
        this.$router.push("/login");
      
},
      admin(){
          this.adminname  =window.sessionStorage.getItem("adminname");
          this.getadminwallet(this.adminname)
      },
      getadminwallet(adminname){
            this.axios.post('/checkadminwallet',Qs.stringify({
               adminname: adminname
            })).then(response=>{
                this.adminbalance=response.data.adminbalance;
            })
        },
    },
  }
</script>

<style scoped>
.BigContainer{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right:0 ;
  overflow: auto;
}
.header{
  background: #FFFFFF; 
  height: 80px;
}
.el-main {
    background: #F3F3F3;
    color: #333;
}
.admin-avator{
  float: right;
  padding-right: 120px;
  display: block;
  width: 40px;
  height: 40px;
  margin-top: -30px;
  position: absolute;
  border-radius: 50%;
  right: 40px;
}
.admin-name {
    right: 100px;
    margin-top: 20px;
    position: absolute;
}
.adminexit{
    right: 30px;
    margin-top: 20px;
    position: absolute;
}
.el-aside{
width:"200px"
}
.el-icon-wallet{
    float: right;
    right: 80px;
    margin-top: 25px;
    position: absolute;    
}
</style>