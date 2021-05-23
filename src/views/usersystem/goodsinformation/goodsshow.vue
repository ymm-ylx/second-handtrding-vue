<template>
<el-container>
    <div>
    <el-page-header @back="goBack" content="商品详请">
    </el-page-header>    
    <el-card class="box-card" style="  background-color: #FFFFFF;  margin-top: 2%; margin-left:8%; width: auto; height: auto;">
        <div slot="header" >
            <span style=" font-size: 20px; font-weight:600">{{storename}}</span>
            <br>
            <span> 商家等级：{{merchantrank}} 商家好评度：{{merchantgoodrate}}%</span>    
        <el-button style="float: right; padding: 3px 0" type="text" @click="intostore()">进入店铺</el-button>
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
             <span  style=" font-size: 16px; font-weight:600; margin-right:20px">￥{{goodsprice}}元</span>
             <span style=" font-size: 16px; text-decoration: line-through; margin-right:20px">￥{{goodsoriginalprice}}元</span>
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
            <div class="informationshow">    
              <h5>{{goodsexplain}}</h5>
              <h5>{{goodssize}}</h5>
              <h5>{{goodsoldandnew}}</h5>
              <h5>{{goodsstock}}</h5>
              <h5>{{goodssales}}</h5>  
              <h5>{{goodsallowbargin}}</h5> 
                </div> 
              <div class="button">  
              <el-input-number  size="small" v-model="num"  :min="1" :max="10" >
              </el-input-number>  
               <br>   
              <br>
              <el-button type="danger" round @click="buy()" size="medium" > 立即购买</el-button>
              <el-button type="warning" round @click="addshoppingcart()" size="medium"> 加入购物车</el-button>
            </div>  
            
            </el-row>
        </el-card>

         <el-card style="  background-color: #FFFFFF;  margin-top: 5px; margin-left: 100px; margin-right: 100px; width: auto; height: auto;">
            <el-row>
            <h3>商品评价</h3>
            
            <span style="float: left; margin-left: 50px;margin-top:20px">好评度：</span>
            <el-avatar :size="100" style="background:#409EFF; margin-top:-20px; color:black"> {{goodsgoodrate}}% </el-avatar>
            <div class="block">
                <span class="demonstration">评分</span>
                <el-rate
                v-model="value"
                show-score
                :colors="colors">
                </el-rate>
            </div>
            <br>
            <el-input type="textarea"  placeholder="请输入内容"  v-model="textarea"
                style="width: 800px; float: left; margin-left: 50px;" ></el-input>
            <el-button type="primary" icon="el-icon-chat-dot-square" round style="float:right;margin-left:150px;margin-top:-50px" @click="writecomment()">我也要写评价</el-button>
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
    <el-dialog
        title="购买窗口"
        :visible.sync="dialogVisible"
        width="30%" >
        <a>您这次购买需要：{{purchase}}元</a>
        <br>
        <a>您的钱包余额为：{{userbalance}}元</a>
        <span slot="footer" class="dialog-footer"> 
            <el-button type="primary" @click="submit()">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
           
        </span>
    </el-dialog>
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
            ]
        }
        
    },
    created(){
        this.getstorename();
    },
    methods:{
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
                this.goodsgoodrate=response.data.goodsgoodrate;
                this.goodsprice=this.goodsdiscount*this.goodsoriginalprice/10;
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
        writecomment(){
            this.username=window.sessionStorage.getItem("username");
            this.axios.post('/addevaluate',Qs.stringify({
                username: this.username,
                goodrate: this.value,
                content: this.textarea,
                goodsid: this.goodsid
            })).then(response=>{
                if(response.data=="3"){
                    this.textarea="",
                    this.value="",
                    this.$message({
					    type: 'info',
					    message: '您还未购买该商品，请购买后进行评价！',
					    center: true,
                        offset: 50
				    });
                } else if(response.data=="2"){
                    this.textarea="",
                    this.value="",
                    this.$message({
					    type: 'info',
					    message: '您已下单该商品，请交易完成后进行评价！',
					    center: true,
                        offset: 50
				    });
                } else if(response.data=="0"){
                    this.textarea="",
                    this.value="",
                    this.$message({
					    type: 'info',
					    message: '您已发起退货，请勿评价！',
					    center: true,
                        offset: 50
				    });
                }else {
                    this.textarea="",
                    this.value="",
                    this.$message({
					    type: 'success',
					    message: '评论成功',
					    center: true,
                        offset: 50
				    });
                    this.getgoodscomment(this.goodsid);
                    this.getgoodsinformation(this.goodsid);
                }
            }).catch(()=>{
                    this.$message({
					    type: 'info',
					    message: '服务器走丢了!请重试！',
					    center: true,
                        offset: 50
				    });
            });
        },
        buy(){
            this.purchase=this.num*this.goodsoriginalprice*this.goodsdiscount/10.0;
            this.username=window.sessionStorage.getItem("username");
            this.axios.post('/checkwallet',Qs.stringify({
                username: this.username
            })).then(response=>{
                this.userbalance=response.data.userbalance;
                this.userpoints=response.data.userpoints;  
                this.dialogVisible=true;
            }).catch(()=>{
                    this.$message({
					        type: 'info',
					        message: '服务器走丢了!请重试！',
					        center: true,
                            offset: 50
			         });
            });
        },
        submit(){
                this.axios.post('/buygoods',Qs.stringify(
                    {
                      username: this.username,
                      buynum:  this.num,
                      goodsid: this.goodsid
                    }
                )).then(response=>{
                    if(response.data=="ok"){
                        this.dialogVisible=false; 
                        this.$message({
					        type: 'success',
					        message: '购买成功',
					        center: true,
                            offset: 50
                        })
                    this.getgoodsinformation(this.goodsid);
                  }else if(response.data=="0"){
                       this.dialogVisible=false; 
                        this.$message({
					        type: 'error',
					        message: '库存数量不够，请重新选购！',
					        center: true,
                            offset: 50
                        })
                  } else if(response.data=="1"){
                        this.dialogVisible=false; 
                        this.$message({
					        type: 'error',
					        message: '您的钱包余额不足，请充值后重试！',
					        center: true,
                            offset: 50
                        })
                  }                  
                }).catch(()=>{
                    this.$message({
					        type: 'info',
					        message: '服务器走丢了!请重试！',
					        center: true,
                            offset: 50
				    });
                })
        },
        goBack(){
            this.$router.go(-1);
        },
        addshoppingcart(){
            this.username=window.sessionStorage.getItem("username");
            this.axios.post('/addtoshoppingcart',Qs.stringify({
                username:this.username,
                goodsid: this.goodsid,
                buynum: this.num
            })).then(response=>{
                if(response.data=="ok"){
                    this.$message({
					    type: 'success',
					    message: '加购成功',
					    center: true,
                        offset: 50
                    })
                }else if(response.data=="1"){
                    this.$message({
					    type: 'error',
					    message: '加购数量超出库存',
					    center: true,
                        offset: 50
                    })
                }
            }).catch(()=>{
                    this.$message({
					        type: 'info',
					        message: '服务器走丢了!请重试！',
					        center: true,
                            offset: 50
				    });
                })
        },
        intostore(){
            window.sessionStorage.setItem('goodsid',this.goodsid);
            this.$router.push({path:"/intostore"})
        }

    }
})
</script>

<style  scoped>
.introduction{
    position: absolute;
    left: 70%;
    top:3%;
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
.informationshow{
    margin-left: 68%;
    margin-top: -35%;    
}
.button{
    margin-left: 60%;    
    margin-top: 0%;
}
</style>
