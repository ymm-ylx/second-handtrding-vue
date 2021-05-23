<template>
    <el-container>
        <el-header class="header">
            <platformheader></platformheader> 
        </el-header>
        <el-main>
            <el-page-header @back="goBack" content="店铺">
            </el-page-header> 
            <el-card style="  background-color: #FFFFFF;  margin-top: 2%; margin-left:2%; width: auto; height: auto;margin-right:2%">
                <div slot="header" >
                <span style=" font-size: 20px">{{storename}}</span>
                <br>
                <span> 商家等级：{{merchantrank}} 商家好评度：{{merchantgoodrate}}%</span>
                </div>
                <el-col :span="3"  v-for="(goods,index) in allgoods" :key="index" offset="1">
                <el-card  style="background-color: #FFFFFF; height:280px ;width:200px; margin-left:-35px; margin-top:30px;" >
                             <img :src="goods.goodspic1path"  style="width: 160px; height: 150px"  @click="informationshow(goods.goodsid,index)">
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
            </el-card>   
        </el-main>
    </el-container>
</template>

<script>
import platformheader from '@/views/usersystem/config/platformheader';
import Qs from 'qs';

export default ({
    data() {
        return{
            storename: "twj",
            merchantrank: "1",
            merchantgoodrate: "96",
            goodsid:"",
            allgoods:[{
                goodsname:""
            }],
        }
        
    },
    created(){
        this.getstoreinformation();
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        getstoreinformation(){
            this.goodsid=window.sessionStorage.getItem("goodsid");
            this.axios.post('/getstoreinformation', Qs.stringify({
                goodsid: this.goodsid
            })).then(response=>{
                this.merchantrank=response.data.merchantrank;
                this.merchantgoodrate=response.data.merchantgoodrate;
                this.storename=response.data.storename;
                this.getgoods(this.storename);
            })
        },
        getgoods(storename){
            this.axios.post('/merchantshop/getgoods', Qs.stringify({
                storename: storename
            })).then(response=>{
                this.allgoods=response.data;
            });
        },
        informationshow(goodsid,index){
            window.sessionStorage.setItem("goodsid",goodsid);
            this.$router.push({path: '/goodsinformationshow'});

        },
    },
    components:{
        platformheader
    }
})
</script>
