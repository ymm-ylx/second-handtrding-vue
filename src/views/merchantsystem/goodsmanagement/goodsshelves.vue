<template>
    <el-container>   
        <el-card  style="background-color: #FFFFFF; width:auto;height:auto">
            <span style="margin-left:0%" v-if="visible">您还未有上架的宝贝哦(╥╯^╰╥)</span>
            <el-col span="4"   v-for="(goods,index) in shelvesgoods" :key="index" offset="1">
                <el-card style="background-color: #FFFFFF; height:280px ;width:200px; margin-left:60px; margin-top:30px;margin-right:100px">
                             <img :src="goods.goodspic1path"  style="width: 170px; height: 150px" @click="getgoodsshow(goods.goodsid)">
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
    </el-container>
</template>

<script>
import Qs from 'qs';
export default ({
    data() {
        return{
             shelvesgoods: [],
            merchantname:"",
            visible:true
        }       
    },
    created(){
        this.getstorename();
    },
    methods:{
        getstorename(){
          this.merchantname=window.sessionStorage.getItem("merchantname");
            this.axios.post('/merchantshop/storeinformation', Qs.stringify({
                merchantname: this.merchantname
            })).then(response=>{
                this.storename=response.data.storename;
                this.merchantrank=response.data.merchantrank;
                this.storetype=response.data.storetype;
                this.getgoodsshelvesdata(this.storename);
            });
        },
        getgoodsshelvesdata(storename){
             this.axios.post('/merchantshop/getgoods', Qs.stringify({
                storename: storename
            })).then(response=>{
                this.shelvesgoods=response.data;
                if(this.shelvesgoods.length!=0)
                    this.visible=false;
                else
                    this.visible=true;
            });
        },
        getgoodsshow(goodsid){
            window.sessionStorage.setItem("goodsid",goodsid);
            this.$router.push({path: '/goodsshow'});
    }
    }
})
</script>
<style  scoped>
</style>