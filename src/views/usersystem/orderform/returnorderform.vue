<template>
    <el-container>
        <div>
        <el-table :data="tableData"  height="550" border style="width: auto ;background: #FFFFFF;  " header-cell-style=" color: #333;"> 
            <el-table-column prop="goodsid" label="商品编号" width="150" v-if="false">
            </el-table-column>  
            <el-table-column  label="商品照片" width="130">     
                <template slot-scope="scope">      
                <img :src="scope.row.goodspic1path" width="100" height="100" /> 
　          </template>
            </el-table-column>
            <el-table-column prop="goodsname" label="商品名称" width="150">
            </el-table-column>  
            <el-table-column prop="buynum" label="购买数量" width="80">
            </el-table-column>
            <el-table-column prop="goodsoriginalprice" label="商品价格(元)" width="150">
            </el-table-column> 
            <el-table-column prop="goodsdiscount" label="商品折扣" width="150">
            </el-table-column> 
            <el-table-column prop="goodstotalprice" label="商品总价(元)" width="150" >
            </el-table-column>     
            <el-table-column prop="purchasedate" label="购买日期" width="160" >
            </el-table-column>
            <el-table-column prop="state" label="状态" width="150" >
            </el-table-column>
        </el-table>  
        </div>
    </el-container>
</template>
<script>
import Qs from 'qs'

export default ({
    data() {
        return{
            username:"",
            tableData:[],
            dialogVisible: false,
            value: null,
            textarea: null,
            goodsname: "",
            goodsid: ""

        }        
    },
    created(){
        this.getorderform();
    },
    methods:{
        getorderform(){
            this.username=window.sessionStorage.getItem("username");
            this.axios.post('getreturnedgoods',Qs.stringify({
                username: this.username              
            })).then(response=>{
                for(var i=0;i<response.data.length;i++){
                    this.tableData.push(response.data[i]);
                };
            })
        },
    }
})
</script>
