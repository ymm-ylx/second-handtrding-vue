<template>
    <el-container>
        <el-table :data="tableData"  height="550" border style="width: 100%  background: #FFFFFF; " header-cell-style="color: #333;"> 
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

    </el-container>
</template>

<script>
import Qs from 'qs'

export default ({
    data() {
        return{
            tableData:[],
            merchantname:""
        }
        
    },
    created(){
        this.getgoodsorderform();
    },
    methods:{
        getgoodsorderform(){
            this.merchantname=window.sessionStorage.getItem("merchantname");
            this.axios.post('/merchantshop/getdoingorder',Qs.stringify({
               merchantname: this.merchantname 
            })).then(response=>{
                for(var i=0;i<response.data.length;i++)
                    this.tableData.push(response.data[i]);
            })
        }
    }
})
</script>
