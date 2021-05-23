<template>
    <el-container style=" position: absolute;left: 0;top: 0;bottom: 0;right:0 ;">
        <el-header class="header">  
            <platformheader></platformheader>
        </el-header>
        <el-main>
            <el-page-header @back="goBack" content="搜索">
              </el-page-header>           
            <el-row>
            <el-input
                placeholder="请输入内容"
                v-model="input"
                style="width:500px; margin-left: 35%; margin-top:1%"
                >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>            
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
            </el-row>
            <el-dropdown  @command="handleselectsorttype">
                <span class="el-dropdown-link">
                {{selectsorttype}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="goodsgoodrate">好评度</el-dropdown-item>
                <el-dropdown-item command="goodssales">销售量</el-dropdown-item>
                <el-dropdown-item command="goodsoriginalprice">价格</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-row>
            <el-card class="box-card" style="  background-color: #FFFFFF; margin-top: 2%;  margin-left: 15%;margin-right: 15%; width: auto; height:auto;">
                <el-row>
                    <el-col span="4" v-for="(goods,index) in searchgoods" :key="index" offset="1">
                        <el-card   style="background-color: #FFFFFF; height:280px ;width:200px; margin-left:50px; margin-top:30px;" >
                             <img :src="goods.goodspic1path"  style="width: 150px; height: 150px"  @click="informationshow(goods.goodsid,index)">
                             <div>
                             <span >名称：{{goods.goodsname}}</span>
                             <br>
                             <span>价格：{{goods.goodsoriginalprice}}元</span>
                             <br>
                             <span >好评度：{{goods.goodsgoodrate}}%</span>
                             <br>
                             <span >销售量：{{goods.goodssales}}</span>
                             </div>
                        </el-card>
                        <br>
                    </el-col>
                </el-row>
            </el-card>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import Qs from "qs" ;
import platformheader from "@/views/usersystem/config/platformheader";
  export default {
    data(){
      return {
        username: 'twj',
        input: "",
        visible: false,
        selectsorttype: "价格",
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
        userbalance: '暂无数据',
        userpoints:   '暂无数据',
        sorttype:"goodsoriginalprice"
      }
    },
    created(){
        this.getusername();
    },
    methods:{
        getsearchtitle(){
            this.input=window.sessionStorage.getItem("searchtitle");
            this.getsearchgoods(this.input);
        },
        search(){
            this.getsearchgoods(this.input);
        },
        getsearchgoods(input){
            this.axios.post('/findgoodsbywords',Qs.stringify({
                words: input,
                sorttype: this.sorttype
            })).then(response=>{
                this.searchgoods=response.data;
            })
        },
        exit(){
            this.$router.push({path: '/login'});
        },
        goBack(){
            this.$router.go(-1);
        },
        getusername(){
            this.username=window.sessionStorage.getItem("username");
            this.getsearchtitle();
            this.getuserwallet(this.username);
        },
        getuserwallet(username){
            this.axios.post('/checkwallet',Qs.stringify({
                username: username
            })).then(response=>{
                this.userbalance=response.data.userbalance;
                this.userpoints=response.data.userpoints;
            })
        },
         handleselectsorttype(command){
            if(command=="goodsgoodrate")
                this.selectsorttype="好评度";
            else if(command=="goodssales")
                this.selectsorttype="销售量";
            else if(command=="goodsoriginalprice")
                this.selectsorttype="价格";
            this.sorttype=command;
            this.getsearchgoods(this.input);
            
        },
        informationshow(goodsid,index){
            window.sessionStorage.setItem("goodsid",goodsid);
            this.$router.push({path: '/goodsinformationshow'});

        },
    },
    components:{
        platformheader
    }
}
</script>

<style>
.el-dropdown{
    margin-top: 2%;
    left:15%;
}
</style>