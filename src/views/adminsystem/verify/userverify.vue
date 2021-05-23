<template>
<el-container>
  <el-header>
    <h2 style="text-align: center"> 待审核普通用户信息  </h2>
    <br>
    <br>
  </el-header>
  <el-main>
    <div> 
    <el-table :data="tableData" height="500" style="width: 100%; background: #FFFFFF;"  header-cell-style=" color: #333;" >
      <el-table-column  prop="userid" label="id" width="120" v-if="false">
      </el-table-column>  
      <el-table-column prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="120" v-if="false">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column  prop="usersex" label="性别" width="80">
      </el-table-column>
      <el-table-column prop="userphone" label="电话" width="150">
      </el-table-column>
      <el-table-column  prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column  prop="userbankcard" label="银行卡" width="170">
      </el-table-column>
      <el-table-column  prop="usercity" label="城市" width="120">
      </el-table-column> 
    <el-table-column  label="操作" >
      <template slot-scope="scope">
        <el-button @click="passClick(scope.row, scope.$index)" type="success" icon="el-icon-check" circle size="mini"></el-button>

       <el-button @click="nopassClick(scope.row, scope.$index)" type="danger" icon="el-icon-close" circle size="mini"></el-button>
      </template>
    </el-table-column>
   </el-table>
   </div>
  </el-main>
</el-container>

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