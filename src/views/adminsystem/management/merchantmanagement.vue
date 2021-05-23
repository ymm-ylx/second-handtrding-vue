<template>
<el-container>
  <el-header>
    <h2 style="text-align: center"> 商家信息  </h2> 
    <br>
    <br>
    </el-header>
     <el-main>
    <el-table :data="tableData" height="500" style="width: 100% ; background: #FFFFFF; " header-cell-style=" color: #333;" >    
     
      <el-table-column  prop="merchantid" label="id" width="120" v-if="false">
      </el-table-column>  
      <el-table-column prop="merchantname" label="用户名" >
      </el-table-column>
      <el-table-column prop="merchantpassword" label="密码" width="120" v-if="false"> 
     </el-table-column> 
      <el-table-column prop="merchantrealname" label="姓名">
      </el-table-column>
      <el-table-column  prop="merchantsex" label="性别" v-if="false" >
      </el-table-column>
      <el-table-column  prop="storename" label="店铺名称" >
      </el-table-column>
      <el-table-column  prop="tradenum" label="交易笔数" >
      </el-table-column>
       <el-table-column  prop="tradecountsum" label="交易总金额(元)" >
      </el-table-column>
      <el-table-column  prop="merchantgoodrate" label="商家好评度(%)" >
      </el-table-column>
      <el-table-column  prop="merchantrank" label="商家等级" >
      </el-table-column>
      <el-table-column prop="merchantphone" label="电话" width="160" v-if="false">
      </el-table-column>
      <el-table-column  prop="merchantbankcard" label="银行卡" width="160" v-if="false">
      </el-table-column>
    <el-table-column  label="操作" width="180px"> 
      <template slot-scope="scope">

       <el-button @click="informationshow(scope.row) " type="primary" icon="el-icon-search" circle size="mini"></el-button>
       <el-button @click="updatemerchantrank(scope.row,scope.$index)" type="info" icon="el-icon-s-data" circle size="mini"></el-button>       
       <el-button @click="editClick(scope.row, scope.$index)" type="success" icon="el-icon-edit" circle size="mini"></el-button>
       <el-button @click="deleteClick(scope.row, scope.$index)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>       
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
      <el-form-item label="营业执照" >
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

    <el-dialog title="商家详细信息" :visible.sync="editdialogVisible" width="60%"  >
    
    <el-form ref="editform" :model="editform" label-width="80px" :inline="true">
      <el-form-item label="用户名">
        
        <el-input v-model="editform.merchantname" ></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="editform.merchantrealname"></el-input>
      </el-form-item >
      <el-form-item label="性别">
        <el-input v-model="editform.merchantsex" ></el-input>
      </el-form-item>
       <el-form-item label="电话">
        <el-input v-model="editform.merchantphone" ></el-input>
      </el-form-item>
      <el-form-item label="银行卡">
        <el-input v-model="editform.merchantbankcard" ></el-input>
      </el-form-item> 
      <br>
      <el-form-item label="营业执照" prop="businesslicense">
        <el-upload  
        list-type="picture-card" 
        :class="{hide:hideUpload}"
        :multiple="multiple" 
        action="/uploadPics"
        :http-request="licenseuploadFile"
        ref="uploadPic1"
        :on-preview="licensehandlePictureCardPreview" 
        :on-remove="licenseRemove" 
        :on-change="licenseChange"
        :file-list="businesslicenseUrlArray"
        :auto-upload="false">
      <i class="el-icon-plus"></i>
      </el-upload>   
      </el-form-item>  
      <el-row>
		  <el-form-item label="身份证正反面" prop="identitycard">
        <el-upload
        list-type="picture-card" 
        :multiple="multiple" 
        action="/uploadPics"
        :http-request="carduploadFile"
        ref="uploadPic2"
        :class="{hide:hideUpload}"
        :on-preview="cardhandlePictureCardPreview" 
        :on-remove="cardRemove" 
        :on-change="cardChange"
        :file-list="identitycardUrlArray">
        <i class="el-icon-plus"></i>
      </el-upload>   
      </el-form-item>
      </el-row>
      <el-form-item>
			<el-button type="primary" @click="updatemerchant()">提交</el-button>
			</el-form-item>
     </el-form>  
</el-dialog>
     <el-dialog :visible.sync="imgcardVisible">
            <img width="100%" :src="cardUrl" alt="">
      </el-dialog>
      <el-dialog :visible.sync="imgVisible">
            <img width="100%" :src="licenseUrl" alt="">
      </el-dialog>
      <el-dialog :visible.sync="rankVisible"  title="修改" width="30%">
        <span>当前商家等级为：{{merchantrank}}</span>
        <br>
        <span>请修改商家等级：</span>
        <el-select v-model="value" placeholder="请选择" size="mini" style="width:100px">
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitrank()">修改</el-button>
        <el-button   @click="rankVisible=false">取消</el-button>
        </span>
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
         tableData: [],
         rankVisible: false,
         merchantid:"",
         merchantrank:"",
         dialogVisible: false,
         form: [],
         editform: [],
         editdialogVisible: false,
         businesslicenseUrlArray: [{url: ''}],
         identitycardUrlArray: [{url: ''},{url: ''}],
         imgVisible: false,
         hideUpload: false,
         cardUrl: '',
         formPicsData: '',
         multiple: true,
         licensechange: false,
         cardchange: false,
         imgcardVisible: false,
          options: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }],
        value: ''

      }},

  created(){
       this.getmerchantdata();
    },
    methods:{
      licensehandlePictureCardPreview(file) {
        this.licenseUrl = file.url;
        this.imgVisible = true;
      },
      cardhandlePictureCardPreview(file) {
        this.cardUrl = file.url;
        this.imgcardVisible = true;
      },
      licenseRemove(file, fileList) {
       this.hideUpload = fileList.length >= 1;     // 上传的项目截图 < 1时，显示上传按钮
       this.licensechange=true;

      },
      cardRemove(file, fileList) {
        this.cardchange=true;
       this.hideUpload = fileList.length >= 2;     // 上传的项目截图 < 2时，显示上传按钮
      },
      licenseChange(file, fileList) {
        this.hideUpload = fileList.length >= 1; // 上传的项目截图 >= 1时，隐藏上传按钮
      },
      cardChange(file, fileList) {
        this.hideUpload = fileList.length >= 2; // 上传的项目截图 >= 1时，隐藏上传按钮
      },
      

      licenseuploadFile(file) {
        this.formPicsData.append('businesslicense', file.file);
      },
	    carduploadFile(file) {
        this.formPicsData.append('identitycard', file.file);
      },
      deleteClick(row,index){
            this.axios.post('/merchantmanagement/deletemerchant',Qs.stringify({
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
         }).catch(() => {
          this.$message({
            type: 'error',
            message: '操作失败',
            center: true,
            offset:50
          });       
        });
        },
        updatemerchantrank(row,index){
          this.merchantrank=row.merchantrank;
          this.merchantid=row.merchantid;
          this.rankVisible=true;
        },
       submitrank(){
          this.axios.post('/merchantmanagement/editmerchantrank',Qs.stringify({
            merchantid: this.merchantid,
            merchantrank: this.value            
         })).then(response=>{
             if(response.data=="ok"){
                 this.$message({
                    message: '操作成功',
                    type: 'success',
                    center: true,
                    offset: 50
                    });
            this.rankVisible=false;
            this.tableData=[];
            this.getmerchantdata();
             }
         }).catch(()=>{
            this.$message.info("服务器走丢了!请重试!");
        });    
       },
       getmerchantdata(){
         this.axios.get('/merchantmanagement').then (response=>{
           for (var i=0;i<response.data.length;i++)
             this.tableData.push(response.data[i]);
         })
       },
       informationshow(row){
           this.form=row;           
           this.axios.post('/merchantmanagement/getpics',Qs.stringify({merchantname: this.form.merchantname})).then(response=>{
             this.businesslicenseurl=response.data[0];
             this.identitycardurl=response.data[1];
             this.identitycardbackurl=response.data[2];
             this.dialogVisible =true; 
           }).catch(response => {
          this.$message.info("服务器走丢了!请重试!");
          return;
        });    
       },
        editClick(row,index){
           this.editform=JSON.parse(JSON.stringify(row));   
           this.axios.post('/merchantmanagement/getpics',Qs.stringify({merchantname: this.editform.merchantname})).then(response=>{
             this.businesslicenseUrlArray[0].url=response.data[0];
             this.identitycardUrlArray[0].url=response.data[1];
             this.identitycardUrlArray[1].url=response.data[2];
             this.licenseChange('',this.businesslicenseUrlArray);  
             this.cardChange('',this.identitycardUrlArray);      
             this.editdialogVisible=true;
           }).catch(response => {
          this.$message.info("服务器走丢了!请重试!");
           
       });
       },
       updatemerchant(){
        let self = this;
        this.formPicsData = new FormData();
        this.$refs.uploadPic1.submit();
				this.$refs.uploadPic2.submit();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }; 	
        this.formPicsData.append('merchantid',this.editform.merchantid);		   
        this.formPicsData.append('merchantname',this.editform.merchantname);
		    this.formPicsData.append('type',"merchant");
		    this.formPicsData.append('merchantpassword',this.editform.merchantpassword);
	      this.formPicsData.append('merchantrealname',this.editform.merchantrealname);
	      this.formPicsData.append('merchantsex',this.editform.merchantsex);
	      this.formPicsData.append('merchantphone',this.editform.merchantphone);
		    this.formPicsData.append('merchantbankcard',this.editform.merchantbankcard);
        this.formPicsData.append('licensechange',this.licensechange);
        this.formPicsData.append('cardchange',this.cardchange);
        this.axios.post("/merchantmanagement/updatemerchant", this.formPicsData, config).then(res => {
          if(res.data=="2"){
             this.$message({
                    message: '请检查营业执照上传是否符合要求',
                    type: 'error',
                    center: true,
                    offset: 50
                    });
          }else if(res.data =="3"){
            this.$message({
                    message: '请检查身份证上传是否符合要求',
                    type: 'error',
                    center: true,
                    offset: 50
                    });
          }else{
              this.editdialogVisible=false;
            	this.$message({
					          type: 'success',
					          message: '修改成功',
					          center: true,
                    offset: 50
				    });
          }
        }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '服务器走丢了!请重试!'
                     }); 
                 });
       }
      }
})
</script>


<style>
.hide .el-upload--picture-card {
    display: none;
}
</style>