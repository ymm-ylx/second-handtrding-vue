<template>
    <el-container>
        <el-header class="header">                
              <el-page-header @back="goBack" content="搜索">
              </el-page-header>
              <div class="user-avator" >
              <el-avatar @click="admin" >{{$conf.userlogo}} </el-avatar>  
              </div>
              <a class="user-name"> {{username}}</a>
              <i class="el-icon-shopping-cart-2"></i>
              <i class="el-icon-wallet"></i>
             <el-link class="user-exit" @click="exit"> 退出 </el-link>
        </el-header>
        <el-main>
            <el-row>
            <el-input
                placeholder="请输入内容"
                v-model="input"
                style="width:500px; float: right; margin-right: 460px; margin-top: 20px"
                >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>            
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
            </el-row>
            <el-row>
            <el-card class="box-card" style="  background-color: #d9ebd9d8; margin-top: 10px;  margin-left: 220px; width: 1050px; height: 570px;">
                <el-row>
                    <el-col :span="3"  v-for="(goods,index) in searchgoods" :key="index">
                        <el-card  :body-style="{ height:'220px' ,width: '150px', padding:'0px'}" style="background-color: #d9ebd9d8" >
                             <img :src="goods.goodspic1path"  style="width: 120px; height: 120px"  @click="informationshow(goods.goodsid,index)">
                             <div>
                             <span >名称：{{goods.goodsname}}</span>
                             <br>
                             <span>价格：{{goods.goodsoriginalprice}}元</span>
                             <br>
                             <span >好评度：{{goods.goodsgoodrate}}</span>
                             <br>
                             <span >销售量：{{goods.goodssales}}</span>
                             </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-card>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import Qs from "qs"
  export default {
    data(){
      return {
        username: 'twj',
        input: "",
        searchgoods: [
                {
               goodspic1path:  "https://cdn.jsdelivr.net/gh/shmilytwj/image-bucket/businesslicense.jpg",
               goodsname: "sp1",
               goodsoriginalprice: "123",
               goodsgoodrate: "96%",
               goodssales: "0"
            },
            {
               goodspic1path:  "https://cdn.jsdelivr.net/gh/shmilytwj/image-bucket/businesslicense.jpg",
               goodsname: "sp2",
               goodsoriginalprice: "456",
               goodsgoodrate: "96%",
               goodssales: "0"
            }
            ],
      }
    },
    created(){
        this.getsearchtitle();
    },
    methods:{
        getsearchtitle(){
            this.input=window.sessionStorage.getItem("searchtitle");
            this.getsearchgoods(this.input);
        },
        search(){
            getsearchgoods(this.input);
        },
        getsearchgoods(input){
            this.axios.post('/findgoodsbywords',Qs.stringify({
                words: input
            })).then(response=>{
                this.searchgoods=response.data;
            })
        },
        exit(){
            this.$router.push({path: '/login'});
        },
        goBack(){
            this.$router.push({path: '/platformhome'});
        }
    },
}
</script>

<style>
.header{
  background: #6FAC84; 
  height: 80px;
}
.el-page-header{
   margin-top: 20px; 
}
.user-avator{
  float: right;
  padding-right: 160px;
  display: block;
  width: 40px;
  height: 40px;
  margin-top: -35px;
  position: absolute;
  border-radius: 50%;
  right: 40px;
}
.user-name {
   float: right;
    right: 160px;
    margin-top: -30px;
    position: absolute;
}
.user-exit{
    float: right;
    right: 10px;
    margin-top: -30px;
    position: absolute;
}
.el-icon-shopping-cart-2{
    float: right;
    right: 80px;
    margin-top: -25px;
    position: absolute;  
}
.el-icon-wallet{
    float: right;
    right: 120px;
    margin-top: -25px;
    position: absolute;    
}
.el-main {
    background: url("../assets/login.jpg");
    color: #333;
    height: 700px;
}
.el-tabs {
    float: left;
}
</style>