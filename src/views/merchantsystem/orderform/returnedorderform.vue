<template>
<el-container>
    <el-row style="margin-top:-1%">
    <h5 style="text-align: center">待审核订单</h5>
    <el-table :data="tableData"  height="350" border style="width: 100%  background: #FFFFFF; " header-cell-style="color: #333;"> 
    <el-table-column prop="goodsid" label="商品编号" width="120" v-if="false">
    </el-table-column>
     <el-table-column prop="buyrelationid" label="订单编号" width="120" v-if="false">
    </el-table-column>
    <el-table-column  label="商品照片" width="130">     
        <template slot-scope="scope">      
             <img :src="scope.row.goodspic1path" width="100" height="100" /> 
　       </template>
    </el-table-column>
    <el-table-column prop="goodsname" label="商品名称" width="120">
    </el-table-column>
    <el-table-column prop="username" label="购买者用户名" width="120" >
    </el-table-column>
    <el-table-column prop="goodsdiscount" label="商品折扣" width="120">
    </el-table-column> 
    <el-table-column prop="goodsoriginalprice" label="商品价格(元)" width="120">
    </el-table-column> 
    <el-table-column prop="buynum" label="购买数量" width="80" >  
    </el-table-column> 
     <el-table-column prop="goodstotalprice" label="商品总价(元)" width="120">
    </el-table-column>     
    <el-table-column prop="purchasedate" label="购买日期" width="160" >
    </el-table-column>
    <el-table-column  label="操作" width="80" > 
        <template slot-scope="scope">
            <el-button @click="passClick(scope.row, scope.$index)" type="success" icon="el-icon-check" circle  size="mini"></el-button>
        </template>
    </el-table-column>
  </el-table>   
  </el-row>
   <el-row style="margin-top:20%;margin-left:-50%">
  <h5 style="text-align: center">退货订单 </h5>
   <el-table :data="returntableData"  height="350" border style="width: 100%  background: #FFFFFF; " header-cell-style="color: #333;"> 
    <el-table-column prop="goodsid" label="商品编号" width="120" v-if="false">
    </el-table-column>
    <el-table-column  label="商品照片" width="130">     
        <template slot-scope="scope">      
            <img :src="scope.row.goodspic1path" width="100" height="100" /> 
　       </template>
    </el-table-column>
    <el-table-column prop="goodsname" label="商品名称" width="120">
    </el-table-column>
    <el-table-column prop="username" label="购买者用户名" width="120" >
    </el-table-column> 
   <el-table-column prop="goodsdiscount" label="商品折扣" width="120">
    </el-table-column>   
    <el-table-column prop="goodsoriginalprice" label="商品价格(元)" width="120">
    </el-table-column> 
    <el-table-column prop="buynum" label="购买数量" width="80" >  
    </el-table-column> 
     <el-table-column prop="goodstotalprice" label="商品总价(元)" width="120">
    </el-table-column>     
    <el-table-column prop="purchasedate" label="购买日期" width="240" >
    </el-table-column>
    </el-table>  
   </el-row>
  <el-dialog title="评价" :visible.sync="dialogVisible" width="30%" >
  <span>to {{username}}</span>
  <div class="block">
  <br>
  <el-rate v-model="value" :colors="colors"  show-score>
  </el-rate>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="sumbit()">确 定</el-button>
  </span>
</el-dialog>

</el-container>

</template>

<script>
import Qs from 'qs';
export default({
   data(){
       return{
           tableData:  [],
           returntableData: [],
           dialogVisible: false,
           username: "",
           buyrelationid: "",
           merchantname: "",
           value: "0",
           colors: ['#99A9BF', '#F7BA2A', '#FF9900'] ,

       }
   },
   created(){
       this.getgoodsorderform();
   },
   methods:{
       sumbit(){
           this.axios.post('/merchantshop/agreereturn',Qs.stringify({
            username: this.username,
            usergoodrate: this.value,
            merchantname: this.merchantname,
            buyrelationid: this.buyrelationid
           })).then(response=>{
                if(response.data=='ok')
                    this.dialogVisible=false;
                this.$message({
                    message: '操作成功',
                    type: 'success',
                    center: true,
                    offset: 50
                    });
            this.value="0";
            this.tableData=[];
            this.returntableData=[];
            this.getgoodsorderform();
           }).catch(response=>{
               this.$message.info("服务器走丢了!请重试!");
           })
       },
        getgoodsorderform(){
            this.merchantname=window.sessionStorage.getItem("merchantname");
            this.axios.post('/merchantshop/getreturntomerchant',Qs.stringify({
               merchantname: this.merchantname
            })).then(response=>{
                for (var i=0;i<response.data.length;i++)
                    this.tableData.push(response.data[i]); 
                this.getreturngoodsform(this.merchantname);
            });
           
       },
       getreturngoodsform(merchantname){
            this.axios.post('/merchantshop/getreturnagreed',Qs.stringify({
               merchantname: merchantname
            })).then(response=>{
                for (var i=0;i<response.data.length;i++)
                    this.returntableData.push(response.data[i]);
            });
       },
        passClick(row, index){
            this.username=row.username;
            this.buyrelationid=row.buyrelationid;
            this.dialogVisible=true;
        },
   }
})
</script>
<style  scoped>
.el-main{
   top: 10px;
}
</style>