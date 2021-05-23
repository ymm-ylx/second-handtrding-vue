<template>
      <h2 style="text-align: center"> 待审核普通用户信息 
    <br>
    <br>
    <div> 
    <el-table :data="tableData" height="500" style="width: 85%; background: #E0F2E8;"  header-cell-style="background: #CCEBD9; color: #333;" >
      <el-table-column  prop="userid" label="id" width="120" v-if="false">
      </el-table-column>  
      <el-table-column prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="120" v-if="false">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column  prop="usersex" label="性别" width="120">
      </el-table-column>
      <el-table-column prop="userphone" label="电话" width="120">
      </el-table-column>
      <el-table-column  prop="email" label="邮箱" width="120">
      </el-table-column>
      <el-table-column  prop="userbankcard" label="银行卡" width="140">
      </el-table-column>
      <el-table-column  prop="usercity" label="城市" width="120">
      </el-table-column> 
    <el-table-column  label="操作" >
      <template slot-scope="scope">
        <el-button @click="passClick(scope.row, scope.$index)" type="success" icon="el-icon-check" circle></el-button>

       <el-button @click="nopassClick(scope.row, scope.$index)" type="danger" icon="el-icon-close" circle></el-button>
      </template>
    </el-table-column>
   </el-table>
   </div>
   </h2>

</template>

<script>

import Qs from 'qs'
export default({
     data() {
      return {
         tableData: [],
      }},

  created(){
       this.getuserdata();
    },
    methods:{
        passClick(row,index){
            this.axios.post('/userverify/agree',Qs.stringify({
              userid: row.userid
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
           this.axios.post('/userverify/disagree',Qs.stringify({
              userid: row.userid
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
       getuserdata(){
         this.axios.get('/userverify').then (response=>{
           for (var i=0;i<response.data.length;i++)
             this.tableData.push(response.data[i]);
         })
       }
      }
})
</script>


<style scoped>

</style>