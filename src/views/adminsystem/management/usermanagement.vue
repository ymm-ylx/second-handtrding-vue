<template>
<el-container>
  <el-header>
    <h2 style="text-align: center"> 普通用户信息 </h2> 
    <br>
    <br>
    </el-header>
     <el-main>
    <el-table :data="tableData" height="500" style="width: 100% ; background: #FFFFFF; " header-cell-style=" color: #333;" >    
     
      <el-table-column  prop="userid" label="id" width="120" v-if="false">
      </el-table-column>  
      <el-table-column prop="username" label="用户名" >
      </el-table-column>
      <el-table-column prop="password" label="密码" width="120" v-if="false"> 
      </el-table-column> 
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column  prop="usersex" label="性别" >
      </el-table-column>
      <el-table-column  prop="email" label="邮箱" v-if="false">
      </el-table-column>
      <el-table-column  prop="usercity" label="城市" v-if="false">
      </el-table-column>
      <el-table-column prop="userphone" label="电话" width="160" v-if="false">
      </el-table-column>
      <el-table-column  prop="userbankcard" label="银行卡" width="160" v-if="false">
      </el-table-column>
      <el-table-column  prop="userbalance" label="余额(元)">
      </el-table-column>
      <el-table-column  prop="userpoints" label="积分">
      </el-table-column>
    <el-table-column  label="操作" width="180"> 
      <template slot-scope="scope">

       <el-button @click="informationshow(scope.row) " type="primary" icon="el-icon-search" circle size="mini"></el-button>
       <el-button @click="addbalanceClick(scope.row, scope.$index)" type="warning" icon="el-icon-coin" circle size="mini"></el-button>
       <el-button @click="editClick(scope.row, scope.$index)" type="success" icon="el-icon-edit" circle size="mini"></el-button>
       <el-button @click="deleteClick(scope.row, scope.$index)" type="danger" icon="el-icon-delete" circle size="mini"></el-button> 
      
     </template>
     </el-table-column>
   
    </el-table>
    </el-main> 
    <el-dialog title="用户详细信息" :visible.sync="dialogVisible" width="60%"  >
    
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item label="用户名">
            <el-input v-model="form.username" :disabled="notdisplay" ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="form.name" :disabled="notdisplay"></el-input>
         </el-form-item >
        <el-form-item label="性别">
            <el-input v-model="form.usersex" :disabled="notdisplay"></el-input>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="form.userphone" :disabled="notdisplay"></el-input>
        </el-form-item>
            <el-form-item label="银行卡">
        <el-input v-model="form.userbankcard" :disabled="notdisplay"></el-input>
        </el-form-item> 
        <el-form-item label="城市">
        <el-input v-model="form.usercity" :disabled="notdisplay"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
        <el-input v-model="form.email" :disabled="notdisplay"></el-input>
        </el-form-item> 
       </el-form>   
       <span slot="footer" class="dialog-footer"> 
        <el-button type="primary" :disabled="notdisplay" @click="updateuser()">确 定</el-button>
        </span>
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
         notdisplay: true
      }},

  created(){
       this.getuserdata();
    },
    methods:{
        deleteClick(row,index){
            this.axios.post('/usermanagement/deleteuser',Qs.stringify({
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
         this.axios.get('/usermanagement').then (response=>{
           for (var i=0;i<response.data.length;i++)
             this.tableData.push(response.data[i]);
         })
       },
       informationshow(row){
           this.form=row;  
           this.notdisplay=true;   
           this.dialogVisible=true;          
       },
       addbalanceClick(row,index){
          this.$prompt('请输入充值金额', '充值', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            this.axios.post('usermanagement/addbalance',Qs.stringify({
                userid: row.userid,
                userbalance: value
            })).then(response=>{
                if(response.data =="ok"){    
                    this.tableData.splice(0,this.tableData.length);
                    this.getuserdata();
                    this.$message({
                    type: 'success',
                    message: '您充值的金额为: ' + value
                   });
                 }
                });  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
   
       },
       editClick(row,index){
           this.form=row;  
           this.notdisplay=false;   
           this.dialogVisible=true;
       },
       updateuser(){
           this.axios.post('/usermanagement/updateuser',Qs.stringify({
               userid: this.form.userid,
               username: this.form.username,
               name: this.form.name,
               usersex: this.form.usersex,
               userphone: this.form.userphone,
               email: this.form.email,
               usercity: this.form.usercity,
               userbankcard: this.form.userbankcard
           })).then(response=>{
               if(response.data =="ok"){
                   this.tableData.splice(0,this.tableData.length);
                   this.getuserdata();
                   this.notdisplay=false;
                   this.dialogVisible=false;
                }
           })

       },


      }
})
</script>


<style scoped>

</style>