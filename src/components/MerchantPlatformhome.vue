<template>
    <div>
        <el-container class="BigContainer">
            <el-header class="header">                
               <span style="text-align: center; font-size:30px;font-weight:400;margin-top:10px"> 
                {{$conf.merchanttitle}}
              </span>
              <div class="merchant-avator" >
              <el-avatar  style="background: #409EFF">{{$conf.merchantlogo}} </el-avatar>  
              </div>
              <a class="merchant-name" v-text="merchantname"></a>
              <el-popover
                    placement="bottom"
                    title="我的钱包"
                    trigger="click"
                    >  
                 <ul class="tips-content">
                  <a>您的余额为：{{merchantbalance}}元</a>
                </ul>        
                <i  slot="reference" class="el-icon-wallet"  @click="getmerchantwallet()"></i>
                </el-popover>
             <el-link class="merchantexit" @click="exit">
             退出
             </el-link>
            </el-header>
        <el-container>
        <el-aside >
    <el-menu default-active="$route.path" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose" background-color="#FFFFFF"
       text-color="#333" active-text-color="#409EFF" style="height:100% ;" >
        <el-menu-item-group> 
          <el-menu-item index="/merchantplatformhome/merchantshop" class="el-icon-sort"  style="width:100%">发布/下架商品</el-menu-item>
          <el-menu-item index="/merchantplatformhome/merchantorderform" class="el-icon-s-order" style="width:100%">我的订单 </el-menu-item>
          <el-menu-item index="/merchantplatformhome/goodsmanagement" class="el-icon-goods"  style="width:100%">我的商品</el-menu-item>
        </el-menu-item-group>
    </el-menu>
  </el-aside>
   
  <el-main >
     <router-view></router-view>
  </el-main>

           </el-container>
        </el-container>
    </div>
</template>

<script>
import Qs from 'qs'
export default ({
 data(){
   return{
     merchantname: 'twj',
     merchantbalance:""
   }
 },
 created(){
  this.merchant();
 },
 methods:{
   merchant(){
     this.merchantname=window.sessionStorage.getItem("merchantname");
     this.getmerchantwallet();
   },
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
    getmerchantwallet(){
      this.merchantname=window.sessionStorage.getItem("merchantname");
            this.axios.post('/checkmerchantwallet',Qs.stringify({
               merchantname: this.merchantname
            })).then(response=>{
                this.merchantbalance=response.data.merchantbalance;
            })
        },
 }
})
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
    /* background: url("../assets/login.jpg"); */
    background: "F3F3F3";
    color: #333;
    height: auto;
}
.merchant-avator{
  float: right;
  padding-right: 140px;
  display: block;
  width: 40px;
  height: 40px;
  margin-top: -30px;
  position: absolute;
  border-radius: 50%;
  right: 40px;
}
.merchantexit {
    right:20px;
    margin-top: 20px;
    position: absolute;
}
.merchant-name{
    right: 120px;
    margin-top: 20px;
    position: absolute;
}
.el-aside{
width:"200px";
}
.el-icon-wallet{
    float: right;
    right: 70px;
    margin-top: 25px;
    position: absolute;    
}
</style>