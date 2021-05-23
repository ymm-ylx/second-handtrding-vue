<template>
    <el-container style=" position: absolute;left: 0;top: 0;bottom: 0;right:0 ;">
        <el-header class="header">  
            <platformheader></platformheader>
        </el-header>
        <el-main>
            <el-page-header @back="goBack" content="我的购物车">
            </el-page-header>    
            <br>
            <el-card style="  background-color: #FFFFFF; margin-left:10%; width: 1200px; height:auto">
                <span v-if="visible" style="margin-left:40%;">购物车空空如也，快去选购商品吧(๑òᆺó๑)</span>
            <el-row v-for="(goods,index) in cartgoods" :key="index" >
                <el-card  style="  background-color: #FFFFFF; margin-left:100px; width: auto;margin-right:100px; height:150px;">
                    <img :src="goods.goodspic1path"  style="width: 150px; height: 150px; margin-top: -20px; margin-left: -20px;"
                      @click="informationshow(goods.goodsid,index)">
                    <div class="cartgoodsinformation">
                        <h5>商品名称：{{goods.goodsname}}</h5>
                        <h5>购买数量：{{goods.buynum}}</h5>
                        <h5>商品总价：{{goods.goodstotalprice}}元</h5>
                    </div>
                    <div class="buttonpostion">
                        <el-button type="danger" round @click="buygoods(goods.goodsid,goods.goodstotalprice,goods.buynum,goods.buyrelationid)" style="margin-right:20px">立即购买</el-button>
                        <el-button type="info" round @click="deletegoods(goods.goodsid,goods.buyrelationid)">删除宝贝</el-button>
                    </div>                
            </el-card>
            <br>
            </el-row>
            <el-row class="allcartbutton" >
                <el-button type="danger" round style="margin-right:100px"  @click="buyallcartgoods()">一键购买</el-button>
                <el-button type="info" round @click="deletedialogVisible=true">一键清空</el-button>
            </el-row>
            </el-card>
        </el-main>
        <el-dialog
            title="购买窗口"
            :visible.sync="dialogVisible"
            width="30%" >
            <a>您这次购买需要:{{goodstotalprice}}元</a>
            <br>
            <a>您的钱包余额为：{{userbalance}}元</a>
            <span slot="footer" class="dialog-footer"> 
                <el-button type="primary" @click="submit()">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
    </el-dialog>
    <el-dialog
        title="购买窗口"
        :visible.sync="buydialogVisible"
        width="30%" >
        <a>您这次购买需要:{{totalprice}}元</a>
        <br>
        <a>您的钱包余额为：{{userbalance}}元</a>
        <span slot="footer" class="dialog-footer"> 
            <el-button type="primary" @click="buyall()">确 定</el-button>
            <el-button @click="buydialogVisible = false">取 消</el-button>
           
        </span>
    </el-dialog>
    <el-dialog
        title="删除窗口"
        :visible.sync="deletedialogVisible"
        width="30%" >
        <a>是否删除所有宝贝？</a>
        <span slot="footer" class="dialog-footer"> 
            <el-button type="primary" @click="deleteall()">确 定</el-button>
            <el-button @click="deletedialogVisible = false">取 消</el-button>
           
        </span>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="lackdialogVisible"
        width="30%" >
        <div v-for="(lackgoods,index) in lackgoodslist"  :key="index">
        <a>{{lackgoods.goodsname}}的库存量为：{{lackgoods.goodsstock}}</a>
        <br>
        <a>您这次购买的数量为:{{lackgoods.buynum}}</a>
        <br>
        <a>库存不足请重新选购！</a>
        <br>
        </div>
        <span slot="footer" class="dialog-footer"> 
            <el-button  type="primary" @click="lackdialogVisible = false">确定</el-button>    
        </span>
    </el-dialog>
    </el-container>
</template>

<script>
import platformheader from '@/views/usersystem/config/platformheader';
import Qs from 'qs';
export default ({
    data() {
        return{
            cartgoods:[],
            visible: true,
            username: "",
            totalprice:"",
            userbalance: "",
            userpoints: "",
            buydialogVisible: false,
            dialogVisible: false,
            deletedialogVisible: false,
            goodstotalprice: "",
            goodsid: "",
            buyrelationid:"",
            buynum: "",
            lackdialogVisible: false,
            lackgoodslist:[{
                goodsname:"123"
            },
            {
                buynum:"123"
            }
            ]

        }
    },
    created(){
        this.getcartgoods();
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        getcartgoods(){
            this.username=window.sessionStorage.getItem("username");
            this.axios.post('/checkshoppingcart',Qs.stringify({
                username: this.username
            })).then(response=>{
                this.cartgoods=response.data;
                if(this.cartgoods.length!=0)
                    this.visible=false;
                else{
                    this.visible=true;
                }
            })
            

        },
        buygoods(goodsid,goodstotalprice,buynum,buyrelationid){
            this.username=window.sessionStorage.getItem("username");
            this.axios.post('/checkwallet',Qs.stringify({
                username: this.username
            })).then(response=>{
                this.userbalance=response.data.userbalance;
                this.userpoints=response.data.userpoints; 
                this.goodstotalprice=goodstotalprice; 
                this.goodsid=goodsid;
                this.buynum=buynum;
                this.buyrelationid=buyrelationid;
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
            this.axios.post('/buygoodsfromshoppingcart',Qs.stringify({
                username: this.username,
                goodsid: this.goodsid,
                buynum: this.buynum,
                buyrelationid: this.buyrelationid
            })).then(response=>{
                if(response.data=="ok"){
                        this.dialogVisible=false; 
                        this.$message({
					        type: 'success',
					        message: '购买成功',
					        center: true,
                            offset: 50
                        });
                        this.getcartgoods();
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
        deletegoods(goodsid, buyrelationid){
            this.axios.post('/deleteonegoods',Qs.stringify({
                username: this.username,
                goodsid: goodsid,
                buyrelationid: buyrelationid
            })).then(response=>{
                if(response.data=="ok"){
                    this.$message({
					    type: 'success',
					    message: '删除成功',
					    center: true,
                        offset: 50
                    });
                    this.getcartgoods();
                }
            }).catch(()=>{
                this.$message({
					type: 'info',
					message: '服务器走丢了!请重试!',
					center: true,
                    offset: 50
                });
            })

        },
        buyallcartgoods(){
            this.username=window.sessionStorage.getItem("username");
            this.axios.post('/checkwallet',Qs.stringify({
                username: this.username
            })).then(response=>{
                this.userbalance=response.data.userbalance;
                this.userpoints=response.data.userpoints; 
                this.getallgoodstotalprice();
                this.buydialogVisible=true;
            }).catch(()=>{
                    this.$message({
					        type: 'info',
					        message: '服务器走丢了!请重试！',
					        center: true,
                            offset: 50
			         });
            });
        },
        getallgoodstotalprice(){
            this.username=window.sessionStorage.getItem("username");
            this.axios.post('/gettotalprice',Qs.stringify({
                username: this.username      
            })).then(response=>{
                this.totalprice=response.data;
            })
        },
        buyall(){
            this.axios.post('/clearshoppingcart',Qs.stringify({
                username: this.username,
                totalprice: this.totalprice
            })).then(response=>{
                if(response.data=="ok"){
                        this.buydialogVisible=false; 
                        this.$message({
					        type: 'success',
					        message: '购买成功',
					        center: true,
                            offset: 50
                        });
                        this.getcartgoods();
                } else if(response.data=="1"){
                        this.buydialogVisible=false; 
                        this.$message({
					        type: 'error',
					        message: '您的钱包余额不足，请充值后重试！',
					        center: true,
                            offset: 50
                })
                }else if(response.data=="0"){
                    this.axios.post('/getoutofstock',Qs.stringify({
                        username: this.username      
                    })).then(res=>{
                        this.lackgoodslist=res.data;
                        this.lackdialogVisible=true;
                    }).catch(()=>{
                         this.$message({
					        type: 'info',
					        message: '服务器走丢了!请重试！',
					        center: true,
                            offset: 50
			        });
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
        deleteall(){
            this.axios.post('/deleteshoppingcart',Qs.stringify({
                username: this.username
            })).then(response=>{
                if(response.data=="ok"){
                        this.deletedialogVisible=false; 
                        this.$message({
					        type: 'success',
					        message: '删除成功',
					        center: true,
                            offset: 50
                        });
                        this.getcartgoods();
                }
            }).catch(()=>{
                this.$message({
					        type: 'info',
					        message: '服务器走丢了!请重试！',
					        center: true,
                            offset: 50
			        });
            })

        }
        
    },
    components:{
        platformheader,
    }
})
</script>

<style scoped>
.cartgoodsinformation{
    position: absolute;
    left: 30%;
    top:0%;
}
.buttonpostion{
    position: absolute;
    left: 65%;
    top:50%;
}
.allcartbutton{
    /* position: absolute; */
    margin-left: 40%;
    margin-top:2%;
}

</style>