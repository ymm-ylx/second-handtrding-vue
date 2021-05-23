<template>
    <el-container>
  <el-header>
    <h2 style="text-align: center"> 商品审核  </h2> 
    <br>
    <br>
    </el-header>
     <el-main>
    <el-table :data="tableData" height="500" style="width: 100% ; background: #FFFFFF; " header-cell-style=" color: #333;" >    
     
      <el-table-column  prop="goodsid" label="id"  v-if="false">
      </el-table-column>  
      <el-table-column prop="merchantname" label="商家用户名" >
      </el-table-column>
      <el-table-column prop="storename" label="店铺名称">
      </el-table-column>
      <el-table-column  prop="goodsname" label="商品名字" >
      </el-table-column>
    <el-table-column  label="操作" > 
      <template slot-scope="scope">
        <el-button @click="informationshow(scope.row) " type="primary" icon="el-icon-search" circle size="mini"></el-button>
        <el-button @click="passClick(scope.row, scope.$index)" type="success" icon="el-icon-check" circle size="mini"></el-button>
        <el-button @click="nopassClick(scope.row, scope.$index)" type="danger" icon="el-icon-close" circle size="mini"></el-button>     
     </template>
     </el-table-column>
   
    </el-table>
    </el-main> 
    <el-dialog title="商品详细信息" :visible.sync="dialogVisible" width="60%"  >
    
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
      <el-form-item label="商品名称">
        <el-input v-model="form.goodsname" :disabled="true" ></el-input>
      </el-form-item>
      <el-form-item label="商品类型">
        <el-input v-model="form.goodstype" :disabled="true"></el-input>
      </el-form-item >  
      <el-form-item label="商品介绍">
        <el-input v-model="form.goodsexplain" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="新旧程度">
        <el-input v-model="form.goodsoldandnew" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商品尺寸">
        <el-input v-model="form.goodssize" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input v-model="form.goodsstock" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="能否议价">
        <el-input v-model="form.goodsallowbargin" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商品原价">
        <el-input v-model="form.goodsoriginalprice" :disabled="true"></el-input>
      </el-form-item>
       <el-form-item label="商品折扣">
        <el-input v-model="form.goodsdiscount" :disabled="true"></el-input>
      </el-form-item>
      <br>
      <el-row>
      <el-form-item label="商品照片" >
        <el-image style="width: 100px; height: 100px" :src="goodspic1path"></el-image>
        <el-image style="width: 100px; height: 100px" :src="goodspic2path"></el-image>
        <el-image style="width: 100px; height: 100px" :src="goodspic3path"></el-image>
      </el-form-item>
      </el-row>
     </el-form>  
</el-dialog>
  </el-container>

</template>
<script>

import Qs from 'qs'
export default({
     data() {
      return {
         tableData: [],
         dialogVisible: false,
         form: [],
         goodspic1path: "",
         goodspic2path: "",
         goodspic3path: ""
      }},

    created(){
      this.getgoods();
    },
    methods:{
      getgoods(){
         this.axios.get('/goodsverify').then(response=>{
           for(var i=0; i<response.data.length; i++){
              this.tableData.push(response.data[i]);
           }
         })
       },
      informationshow(row){
        this.axios.post('/goodsverify/checkgoods',Qs.stringify({
          goodsid: row.goodsid
        })).then(response=>{
          this.form=response.data;
          this.goodspic1path=response.data.goodspic1path;
          this.goodspic2path=response.data.goodspic2path;
          this.goodspic3path=response.data.goodspic3path;
          this.dialogVisible =true; 
        }).catch(response => {
          this.$message.info("服务器走丢了!请重试!");
          return;
        });    
      },
       passClick(row,index){
            this.axios.post('/goodsverify/agree',Qs.stringify({
              goodsid: row.goodsid
            })).then (response=>{
          if (response.data=="ok"){                  
            this.tableData.splice(index,1);
            this.$message({
                    message: '操作成功',
                    type: 'success',
                    center: true,
                    offset: 50
                    });
          }
         }).catch(response=>{
            this.$message.info("服务器走丢了!请重试!");
        })
        },
        nopassClick(row,index){
           this.axios.post('/goodsverify/disagree',Qs.stringify({
              goodsid: row.goodsid
            })).then (response=>{
          if (response.data=="ok"){                  
            this.tableData.splice(index,1);
            this.$message({
                    message: '操作成功',
                    type: 'success',
                    center: true,
                    offset: 50
                    });
          }
         }).catch(response=>{
            this.$message.info("服务器走丢了!请重试!");
        })
        },

    }
})
</script>
