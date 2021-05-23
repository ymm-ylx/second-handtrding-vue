<template>
    <el-container>
        <el-header class="header">      
            <platformheader></platformheader>      
        </el-header>
        <el-main >
            <el-row>
            <el-input
                placeholder="请输入内容"
                v-model="input"
                style="width:500px; margin-left:33%; margin-top: 1%"
                >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>            
            <el-button slot="append"  icon="el-icon-search" @click="search()"></el-button>
            </el-input>
            </el-row>
             <el-carousel :interval="4000" type="card" height="400px"  style="margin-top:1%;margin-left:15%; width:1050px">
                <el-carousel-item v-for="(img, index) in imggoods" :key="index">
                    <img :src="img.goodspic1path" style="height:100%;width:100%;" alt="图片丢失了" @click="informationshow(img.goodsid,index)" />
                </el-carousel-item>
                </el-carousel>
            <el-row>
            <el-tabs  v-model="activeName" @tab-click="handleClick" style="margin-top: -1%; margin-left: 13%; margin-right:13%">
                <el-tab-pane label="电子产品" name="first" >
                    <electronicgoods></electronicgoods>
                </el-tab-pane>
                <el-tab-pane label="书籍" name="second">
                    <bookgoods></bookgoods> 
                </el-tab-pane>
                <el-tab-pane label="文具" name="third">
                   <stationerygoods></stationerygoods>
                </el-tab-pane>
                <el-tab-pane label="生活用品" name="fourth">
                    <livelihoodgoods></livelihoodgoods>
                </el-tab-pane>
                <el-tab-pane label="零食" name="five">
                    <snackgoods></snackgoods>
                </el-tab-pane>
            </el-tabs>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import electronicgoods from '@/views/usersystem/goodssort/electronicgoods';
import stationerygoods from '@/views/usersystem/goodssort/stationerygoods';
import bookgoods from '@/views/usersystem/goodssort/bookgoods';
import livelihoodgoods from '@/views/usersystem/goodssort/livelihoodgoods';
import snackgoods from '@/views/usersystem/goodssort/snackgoods';
import platformheader from "@/views/usersystem/config/platformheader";
import Qs from 'qs';
  export default {
    data(){
      return {
        username: 'twj',
        input: "",
        activeName: 'first',
        userbalance: '暂无数据',
        userpoints:   '暂无数据',
        imggoods:[{
              goodspic1path:  "https://cdn.jsdelivr.net/gh/shmilytwj/image-bucket/2021/05/0711236213fd574a2ea5c3f0226ef5d0e9.jpg",
                },
                {
               goodspic1path:  "https://cdn.jsdelivr.net/gh/shmilytwj/image-bucket/2021/05/071d677e776d60420bb228f2c2221dbfab.jpg",
                },
                {
               goodspic1path:  "https://cdn.jsdelivr.net/gh/shmilytwj/image-bucket/2021/05/07167436cf33c0456182965c64a49dfb80.jpg",
                }
        ]
      }
    },
    created(){
        this.getusername();
    },
    methods:{
        search(){
            window.sessionStorage.setItem("searchtitle",this.input);
            if(this.input!="")
                this.$router.push({path: '/search'});
        },
        exit(){
            this.$router.push({path: '/login'});
        },
        getusername(){
            this.username=window.sessionStorage.getItem("username");
            this.getuserwallet(this.username);
            this.getallgoods()
        },
        getuserwallet(username){
            this.axios.post('/checkwallet',Qs.stringify({
                username: username
            })).then(response=>{
                this.userbalance=response.data.userbalance;
                this.userpoints=response.data.userpoints;
            })
        },
         informationshow(goodsid,index){
            window.sessionStorage.setItem("goodsid",goodsid);
            this.$router.push({path: '/goodsinformationshow'});

        },
        getallgoods(){
            this.axios.get('/getCarouselgoods').then(response=>{
                this.imggoods=response.data
            })
        }
    },
    components:{
        electronicgoods,
        stationerygoods,
        bookgoods,
        livelihoodgoods,
        snackgoods,
        platformheader
    }
}
</script>

<style>
.header{
  background: #FFFFFF; 
  height: 80px;
}
.el-main {
    /* background: url("../assets/login.jpg"); */
    background-color: #F3F3F3F3;
    color: #333;

}
.el-tabs {
    float: left;
}
</style>