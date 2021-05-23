<template>
<el-container>
  <el-header>
    <h2 style="text-align: center"> 待审核商家信息  </h2> 
    <br>
    <br>
    </el-header>
     <el-main>
    <el-table :data="tableData"  style="width: 85% ; background: #E0F2E8; " header-cell-style="background: #CCEBD9; color: #333;" >    
     
      <el-table-column  prop="merchantid" label="id" width="120" v-if="false">
      </el-table-column>  
      <el-table-column prop="merchantname" label="用户名" >
      </el-table-column>
      <el-table-column prop="merchantpassword" label="密码" width="120" v-if="false"> 
     </el-table-column> 
      <el-table-column prop="merchantrealname" label="姓名">
      </el-table-column>
      <el-table-column  prop="merchantsex" label="性别" >
      </el-table-column>
      <el-table-column prop="merchantphone" label="电话" width="160" v-if="false">
      </el-table-column>
      <el-table-column  prop="merchantbankcard" label="银行卡" width="160" v-if="false">
      </el-table-column>
    <el-table-column  label="操作" > 
      <template slot-scope="scope">

       <el-button @click="informationshow(scope.row) " type="primary" icon="el-icon-search" circle></el-button>
       <el-button @click="passClick(scope.row, scope.$index)" type="success" icon="el-icon-check" circle></el-button>
       <el-button @click="nopassClick(scope.row, scope.$index)" type="danger" icon="el-icon-close" circle></el-button> 
      
     </template>
     </el-table-column>
   
    </el-table>
    </el-main> 
    <el-dialog title="商家详细信息" :visible.sync="dialogVisible" width="60%"  >
    
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
      <el-form-item label="用户名">
        
        <el-input v-model="form.merchantname" :disabled="true" ></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.merchantrealname" :disabled="true"></el-input>
      </el-form-item >
      <el-form-item label="性别">
        <el-input v-model="form.merchantsex" :disabled="true"></el-input>
      </el-form-item>
       <el-form-item label="电话">
        <el-input v-model="form.merchantphone" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="银行卡">
        <el-input v-model="form.merchantbankcard" :disabled="true"></el-input>
      </el-form-item> 
      <br>
      <el-form-item label="营业执照">
         <el-image style="width: 100px; height: 100px" :src="businesslicenseurl"></el-image>
      </el-form-item>
      <br>
      <el-form-item label="身份证正面">
        <el-image style="width: 100px; height: 100px" :src="identitycardurl"></el-image>
      </el-form-item>
      <el-form-item label="身份证背面">
        <el-image style="width: 100px; height: 100px" :src="identitycardbackurl"></el-image>
      </el-form-item>
     </el-form>  
</el-dialog>

  </el-container>
</template>

<script>

import Qs from 'qs'
export default({
     data() {
      return {
         identitycards: ['身份证正面', '身份证背面'],
         businesslicenseurl: '',
         identitycardurl: '',
         identitycardbackurl: '',
         tableData: [{merchantname:"twj"}],
         dialogVisible: false,
         form: []
      }},

  created(){
       this.getmerchantdata();
    },
    methods:{
        passClick(row,index){
            this.axios.post('/merchantverify/agree',Qs.stringify({
              merchantid: row.merchantid
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
         })
        },
        nopassClick(row,index){
           this.axios.post('/merchantverify/disagree',Qs.stringify({
              merchantid: row.merchantid
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
         })
        },
       getmerchantdata(){
         this.axios.get('/merchantverify').then (response=>{
           for (var i=0;i<response.data.length;i++)
             this.tableData.push(response.data[i]);
         })
       },
       informationshow(row){
           this.form=row;
            this.dialogVisible =true; 
           this.axios.post('/merchantverify/getpics',Qs.stringify({merchantname: this.form.merchantname})).then(response=>{
             this.businesslicenseurl=response.data[0];
             this.identitycardurl=response.data[1];
             this.identitycardbackurl=response.data[2];
             
           }).catch(response => {
          this.$message.info("服务器走丢了!请重试!");
        });
       },
      }
})
</script>


<style scoped>

</style>