<template>
<el-container>
 <el-header class="header">                
              <h1 class="h5 text-light mb-0 mr-auto"> 
               {{$conf.merchanttitle}}
              </h1> 
              <div class="merchant-avator" >
              <el-avatar>{{$conf.merchantlogo}} </el-avatar>  
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
     <el-main>
    <div>
    <el-page-header @back="goBack" content="商品详请">
    </el-page-header>    
    <el-card class="box-card" style="  background-color: #FFFFFF;  margin-top: 2%; margin-left:8%;margin-right:8%; width: auto; height: auto;">
        <div slot="header" >
            <span style=" font-size: 20px; font-weight:600">{{storename}}</span>
            <br>
            <span> 商家等级：{{merchantrank}} 商家好评度：{{merchantgoodrate}}%</span>  
        </div>
        
        <el-card style="background-color: #FFFFFF;  margin-top: 5px; margin-left: 100px; margin-right: 100px; width: auto; height: auto;">
            <el-row>
            <el-carousel trigger="click" height="500px" :interval="3500" arrow="always" style="width:500px;margin-left:-20px; margin-top:-20px" >
                <el-carousel-item v-for="(img, index) in imggoods" :key="index">
                    <img :src="img.url" style="height:100%;width:100%;" alt="图片丢失了"  />
                </el-carousel-item>
            </el-carousel>
            <div class="introduction">
              <span style=" font-size: 18px; font-weight:600">{{goodsname}}</span>  
              <br>
              <br>
             <span  style=" font-size: 16px; font-weight:600; margin-right:30px">￥{{goodsprice}}元</span>
             <span style=" font-size: 16px; text-decoration: line-through; margin-right:30px">￥{{goodsoriginalprice}}元</span>
             <span style=" font-size: 16px; font-weight:600; color:red">{{goodsdiscount}}折</span>
             </div>
             <div class="tag">
             <el-tag effect="dark" >商品介绍</el-tag> 
             <br>
             <br>  
             <el-tag effect="dark">尺寸大小</el-tag>
             <br>
             <br> 
             <el-tag effect="dark" >新旧程度</el-tag> 
             <br>
             <br>  
             <el-tag effect="dark">库存量</el-tag> 
             <br>
             <br> 
             <el-tag effect="dark">销售量</el-tag> 
             <br>
             <br>  
             <el-tag effect="dark" >能否议价</el-tag> 
             </div>
            <div style="margin-left: 68%;margin-top:-35% ;margin-bottom:13%">    
              <h5>{{goodsexplain}}</h5>
              <h5>{{goodssize}}</h5>
              <h5>{{goodsoldandnew}}</h5>
              <h5>{{goodsstock}}</h5>
              <h5>{{goodssales}}</h5>  
              <h5>{{goodsallowbargin}}</h5>     
            </div> 
            </el-row>
        </el-card>

         <el-card style="  background-color: #FFFFFF;  margin-top: 5px; margin-left: 100px; margin-right: 100px; width: auto; height: auto;">
            <el-row>
            <h3>商品评价</h3>
            
            <span style="float: left; margin-left: 50px;margin-top:20px">好评度：</span>
            <el-avatar :size="100" style="background:#409EFF; margin-top:-20px; color:black"> {{goodsgoodrate}}% </el-avatar>
            </el-row>
            <br>
            <el-row  v-for="(usercomment,index) in usercomments" :key="index">
                <span style=" font-size: 15px; font-weight:600;margin-right:10px;" >{{usercomment.username}}</span>
                <span style=" font-size: 15px; "> 好评度：{{usercomment.goodrate}}%</span>
                    <el-card  style="background-color: #FFFFFF;margin-top:10px;margin-left: 50px; margin-right: 50px; width: auto; height: auto;">
                        <a>{{usercomment.content}}</a>
                    </el-card>
            </el-row>
        </el-card>      
    </el-card>
    </div>
     </el-main>
</el-container>   
</template>

<script>
import Qs from 'qs';
export default({
    data() {
        return{
            dialogVisible: false,
            userbalance:"50",
            purchase: "",
            userpoints:"",
            storename:"暂无店铺",
            merchantrank: "无",
            merchantgoodrate: "0",
            goodsid: "",
            goodsname:"无",
            goodsexplain: "暂无介绍",
            goodssize:"无",
            goodsoldandnew:"暂无",
            goodsoriginalprice:"20",
            goodsallowbargin:"未知",
            goodssales:"未知",
            goodsdiscount: "9",
            goodsprice:"10",
            goodsgoodrate:"0",
            goodsstock:"无",
            textarea:"",
            num: "1",
            username: "",
            value: null,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            imggoods: [
                {
               url:  "https://cdn.jsdelivr.net/gh/shmilytwj/image-bucket/2021/05/0711236213fd574a2ea5c3f0226ef5d0e9.jpg",
                },
                {
               url:  "https://cdn.jsdelivr.net/gh/shmilytwj/image-bucket/2021/05/071d677e776d60420bb228f2c2221dbfab.jpg",
                },
                {
               url:  "https://cdn.jsdelivr.net/gh/shmilytwj/image-bucket/2021/05/07167436cf33c0456182965c64a49dfb80.jpg",
                }
            ],
            usercomments:[
                {
                    username: "hhh",
                    goodrate: "95",
                    content: "hhh"
                },
                    {
                    username: "twj",
                    goodrate: "94"
                },
            ],
            merchantname:"",
        }
        
    },
    created(){
        this.getstorename();
    },
    methods:{
        getmerchantname(){
            this.merchantname=window.sessionStorage.getItem("merchantname");
        },
        getstorename(){
            this.goodsid=window.sessionStorage.getItem("goodsid");
            this.axios.post('/getstoreinformation', Qs.stringify({
                goodsid: this.goodsid
            })).then(response=>{
                this.storename=response.data.storename;
                this.merchantrank=response.data.merchantrank;
                this.merchantgoodrate=response.data.merchantgoodrate;
                this.getgoodsinformation(this.goodsid);
                this.getgoodscomment(this.goodsid);
                this.getmerchantname()
            })
        },
        getgoodsinformation(goodsid){
            this.axios.post('/goodsinformation',Qs.stringify({
                goodsid: goodsid
            })).then(response=>{
                this.goodsname=response.data.goodsname;
                this.goodsexplain=response.data.goodsexplain;
                this.goodssize=response.data.goodssize;
                this.goodsoldandnew=response.data.goodsoldandnew;
                this.goodsoriginalprice=response.data.goodsoriginalprice;
                this.goodsdiscount=response.data.goodsdiscount;
                this.goodssales=response.data.goodssales;
                this.goodsallowbargin=response.data.goodsallowbargin;
                this.goodsstock=response.data.goodsstock;
                this.goodsprice=this.goodsoriginalprice*this.goodsdiscount/10;
                this.goodsgoodrate=response.data.goodsgoodrate;
            });
            this.axios.post('/getgoodspics',Qs.stringify({
                goodsid: goodsid
            })).then(response=>{
                for(var i=0;i<response.data.length;i++){
                     this.imggoods[i].url=response.data[i];
                }             
            });

        },
        getgoodscomment(goodsid){
            this.axios.post('/getevaluate',Qs.stringify({
                goodsid: goodsid
            })).then(response=>{
                this.usercomments=response.data;
            })
        },  
        goBack(){
            this.$router.go(-1);
        },
         exit(){
             window.sessionStorage.clear();
            this.$router.push("/login");
        }

    }
})
</script>

<style  scoped>
.introduction{
    position: absolute;
    left: 70%;
    top:5%;
    transform: translate(-50%,0%);

}
.block{
    margin-left: 50px;
    margin-top: 50px;
}
.el-page-header{
    margin-top: -10px;
}
.tag{
    position: absolute;
    margin-left: 60%;
    margin-top:-34%;
}
.merchant-avator{
  float: right;
  padding-right: 140px;
  display: block;
  width: 40px;
  height: 40px;
  margin-top: -55px;
  position: absolute;
  border-radius: 50%;
  right: 40px;
}
.merchantexit {
    right: 20px;
    margin-top: -50px;
    position: absolute;
}
.merchant-name{
    right: 100px;
    margin-top: -50px;
    position: absolute;
}
.el-icon-wallet{
    float: right;
    right: 70px;
    margin-top: -45px;
    position: absolute;    
}
</style>
