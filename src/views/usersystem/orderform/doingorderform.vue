<template>
    <el-container>
        <div>
        <el-table :data="tableData"  height="550" border style="width: auto ;background: #FFFFFF;  " header-cell-style="color: #333;"> 
            <el-table-column prop="goodsid" label="商品编号" width="150" v-if="false">
            </el-table-column>  
            <el-table-column prop="buyrelationid" label="订单编号" width="150" v-if="false">
            </el-table-column>  
             <el-table-column  label="商品照片" width="130">     
                <template slot-scope="scope">      
                <img :src="scope.row.goodspic1path" width="100" height="100" /> 
　          </template>
            </el-table-column>
            <el-table-column prop="goodsname" label="商品名称" width="120"> 
            </el-table-column>  
            <el-table-column prop="buynum" label="购买数量" width="80">
            </el-table-column>
            <el-table-column prop="goodsoriginalprice" label="商品价格(元)" width="120">
            </el-table-column> 
            <el-table-column prop="goodsdiscount" label="商品折扣" width="120">
            </el-table-column> 
            <el-table-column prop="goodstotalprice" label="商品总价(元)" width="120" >
            </el-table-column>     
            <el-table-column prop="purchasedate" label="购买日期" width="160" >
            </el-table-column>
            <el-table-column  label="操作" width="130" > 
            <template slot-scope="scope">
                <el-button @click="returnorderform(scope.row) " type="danger"   size="mini" style="margin-left:20%">退货</el-button>
            </template>
            </el-table-column>
        </el-table>  
        </div>
    </el-container>
</template>

<script>
import Qs from 'qs'
export default({
    data() {
        return{
            tableData: [],
            username:"",
        }
    },
    created(){
        this.getorderform();
    },
    methods:{
        getorderform(){
            this.username=window.sessionStorage.getItem("username");
            this.axios.post('/getorderforming',Qs.stringify({
                username: this.username              
            })).then(response=>{
                console.info(response.data);
                for(var i=0;i<response.data.length;i++){
                    this.tableData.push(response.data[i]);
                };
            })
        },
        returnorderform(row){
            this.axios.post('/returngoods',Qs.stringify({
                username: this.username,
                goodsid: row.goodsid,
                buyrelationid: row.buyrelationid
            })).then(response=>{
                if(response.data=="ok"){
                    this.$message({
					    type: 'success',
					    message: '已向商家发送退货请求，请等待通过！',
					    center: true,
                        offset: 50
				    });
                    this.tableData=[];
                    this.getorderform();
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
    }
})
</script>
