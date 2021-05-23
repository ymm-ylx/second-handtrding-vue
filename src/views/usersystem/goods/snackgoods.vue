<template>
    <el-container>   
        <el-row>
            <el-col :span="10"  v-for="(goods,index) in snackgoods" :key="index">
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
    </el-container>
</template>

<script>
import Qs from 'qs';
export default ({
    data() {
        return{
            snackgoods: [
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
        this.getsnackgoods();
    },
    methods:{
        getsnackgoods(){
             this.axios.get('/getsnackgoods')
             .then(response=>{
                this.snackgoods=response.data;
            });
        }
    }
})
</script>
<style  scoped>
.el-tag {
    float: right;
    margin-right: 30px;
  }
.clearfix:before,
.clearfix:after {
      display: table;
      content: "";
  }
  
.clearfix:after {
      clear: both
}  
</style>