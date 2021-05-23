<template>
    <el-container>   
        <el-card  style="background-color: #FFFFFF; width:auto;height:auto">
            <span style="margin-left:35%" v-if="visible">商城还未有该分类的宝贝哦(╥╯^╰╥)</span>
            <el-col :span="4"  v-for="(goods,index) in bookgoods" :key="index" offset="1">
                <el-card  style="background-color: #FFFFFF; height:280px ;width:200px; margin-left:50px; margin-top:30px;" >
                             <img :src="goods.goodspic1path"  style="width: 170px; height: 150px"  @click="informationshow(goods.goodsid,index)">
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
            bookgoods: [],
            visible:true
        }       
    },
    created(){
        this.getbookgoods();
    },
    methods:{
        getbookgoods(){
             this.axios.get('/getbookgoods')
             .then(response=>{
                this.bookgoods=response.data;
                if(this.bookgoods.length==0)
                    this.visible=true;
                else
                   this.visible=false;
            });
        },
        informationshow(goodsid,index){
            window.sessionStorage.setItem("goodsid",goodsid);
            this.$router.push({path: '/goodsinformationshow'});

        },
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