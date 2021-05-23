<template>
<el-container>
  <el-header>
       <el-button class="openshop" type="primary" @click="openstoredialogVisible = true" :disabled="disabled" >我要开店 </el-button>
  </el-header>
  <el-main>  
            <el-card class="box-card" style="background-color:#FFFFFF">
             <div slot="header" class="clearfix">
            <span style=" font-size: 20px; font-weight:600">{{storename}}</span>
            <br>
            <span> 商家等级：{{merchantrank}} 商家好评度：{{merchantgoodrate}}%</span>   
                </div>
                <el-row>
                     <el-col :span="4" v-for="(goods,index) in allgoods" :key="index" offset="1">
                         <el-card  style="background-color: #FFFFFF; height:310px ;width:200px; margin-left:50px; margin-top:30px;">
                             <img :src="goods.goodspic1path"  style="width: 190px; height: 150px" @click="getgoodsshow(goods.goodsid)">
                             <div>
                             <span >名称：{{goods.goodsname}}</span>
                             <br>
                             <span>价格：{{goods.goodsoriginalprice}}元</span>
                             <br>
                             <span>库存量：{{goods.goodsstock}}</span>
                             <br>
                             <span  class="goodsgoodrate">好评度：{{goods.goodsgoodrate}}%</span>
                             <div class="bottom clearfix">
                             <el-tag type="danger" @click="soldout(goods.goodsid,index)">下架</el-tag>
                             </div>
                             </div>
                        </el-card>
                        <br>
                        <br>
                    </el-col>
                        <el-col :span="4" offset="1">
                    <el-card  style="background-color: #FFFFFF; height:310px ;width:200px; margin-left:50px; margin-top:30px;">
                        <i   class="el-icon-circle-plus-outline"  @click="judgestorename(storename)"></i>
                    </el-card>
                </el-col>
               </el-row>
               <br>
        </el-card>
  </el-main>

  <el-dialog
  title="我要开店"
  :visible.sync="openstoredialogVisible">
  <el-form ref="shopform" :rules="rules" :model="shopform" label-width="80px" class="shopform">
      <h2 class="shop-title">请填写信息</h2>
      <el-form-item label="店铺名称" prop="storename">
        <el-input v-model="shopform.storename"></el-input>
      </el-form-item>
      <el-button type="primary"   style="display:block;margin:0 auto" @click="submit('shopform')"> 提交 </el-button>
  </el-form>
</el-dialog>

<el-dialog
  title="上架商品"
  :visible.sync=" addgoodsdialogVisible">
  <el-form ref="goodsform" :rules="goodsrules" :model="goodsform" label-width="80px" class="goodsform"  :inline="true" >
      <h2 class="goods-title">请填写信息</h2>
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="goodsform.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="商品尺寸" prop="goodssize">
        <el-input v-model="goodsform.goodssize"></el-input>
      </el-form-item> 
      <el-form-item label="使用说明" prop="goodsexplain">
        <el-input v-model="goodsform.goodsexplain"></el-input>
      </el-form-item>
      <el-form-item label="原价(元)" prop="goodsoriginalprice">
        <el-input v-model="goodsform.goodsoriginalprice"></el-input>
      </el-form-item>
      <el-form-item label="商品折扣" prop="goodsdiscount">
        <el-input v-model="goodsform.goodsdiscount"></el-input>
      </el-form-item>
      <el-form-item label="商品类别" prop="goodstype">
        <el-select v-model="value" placeholder="请选择">
             <el-option  v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
             </el-option>
        </el-select>
      </el-form-item>  
      <el-form-item label="商品数量" prop="goodsstock">
        <el-input v-model="goodsform.goodsstock"></el-input>
      </el-form-item>
     <el-form-item label="新旧程度" prop="goodsoldandnew">
         <el-select v-model="index" placeholder="请选择">
             <el-option  v-for="item in goodsoptions"
              :key="item.index"
              :label="item.label"
              :value="item.index">
             </el-option>
        </el-select>
      </el-form-item>
     <br>
     <el-form-item label="能否议价" prop="goodsallowbargin">
       <el-switch v-model="goodsallowbargin" active-color="#13ce66" inactive-color="#ff4949">
       </el-switch>
      </el-form-item>
      <br>
      <el-form-item label="商品照片" prop="goodspics">
          	<el-upload :multiple="multiple" action="/uploadPics" list-type="picture-card" :auto-upload="false"
            :http-request="goodspicsuploadFile" ref="uploadPic" 
            :on-remove="Remove" 
            :on-change="Change"
            :class="{hide:hideUpload}">
            <i class="el-icon-plus"></i>
            </el-upload>
      </el-form-item>

      <el-button type="primary"   style="display:block;margin:0 auto" @click="addgoods('goodsform')"> 提交 </el-button>
  </el-form>
</el-dialog>



</el-container>


</template>

<script>
import Qs from 'qs'
export default ({
    data() {
        return{
            openstoredialogVisible: false,
            addgoodsdialogVisible: false,
            goodsallowbargin: false,
            hideUpload: false,
            formPicsData: '',
            multiple: true,
            merchantname: '',
            disabled:false,
            shopform:{
                storename: "",
            },
            goodsform:{},
            allgoods: [
                
            ],
            storename: "暂无店铺",
            merchantgoodrate:"0",
            merchantrank: "空",
            options: [{
                value:   1,
                label: '电子设备'
                },
                {
                value:  2,
                label: '书籍'
                }, 
                {
                value:  3,
                label: '文具'
                }, {
                value:  4,
                label: '生活用品'
                }, {
                value:  5,
                label: '零食'
                }],
            value: '',
               goodsoptions: [{
                index:   10,
                label: '全新'
                },
                {
                index:  9,
                label: '九成新'
                }, 
                {
                index:  8,
                label: '八成新'
                }, {
                index:  7,
                label: '七成新'
                }, {
                index:  6,
                label: '六成新'
                },{
                index:  5,
                label: '五成新'
                }, {
                index:  4,
                label: '四成新'
                },{
                index:  3,
                label: '三成新'
                }, {
                index:  2,
                label: '二成新'
                },{
                index:  1,
                label: '一成新'
                }],
            index: '',
            rules: {
                storename: [
                    {required: true, message: "店名不能为空", trigger: 'blur'}
                ],
                },
            goodsrules:{
                goodsname: [
                    {required: true, message:"商品名称不能为空",trigger: 'blur'}
                ],
                goodsstock:[
                     {required: true, message:"商品数量不能为空",trigger: 'blur'}
                ],
                goodsexplain:[
                     {required: true, message:"使用说明不能为空",trigger: 'blur'}
                ],
                goodsoriginalprice:[
                     {required: true, message:"商品原价不能为空",trigger: 'blur'}
                ],
                goodsdiscount:[
                    {required: true, message:"商品折扣不能为空",trigger: 'blur'}
                ],
                goodssize:[
                    {required: true, message:"商品尺寸不能为空",trigger: 'blur'}
                ]

            }
        }
        
    },
    created(){
        this.getstorename();
    },
    methods:{
        submit(shopform){
            this.$refs[shopform].validate( valid =>{
                if (!valid)  return ;
                this.merchantname=window.sessionStorage.getItem("merchantname");
                this.axios.post('/merchantshop/addstore',Qs.stringify({
                    merchantname: this.merchantname,
                    storename: this.shopform.storename,
                    storetype: this.value             
               }) ).then(response=>{
                   if(response.data=="ok"){
                        this.openstoredialogVisible=false;
                        this.$message({
                            type: 'success',
					        message: '店铺申请成功',
					        center: true,
                            offset: 50
				        });
                        this.getstorename();
                    }
               }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '服务器走丢了!请重试!'
                     }); 
                 });
        });
    },
    	goodspicsuploadFile(file) {
            this.formPicsData.append('goodspics', file.file);
      },
       Remove(file, fileList) {
       this.hideUpload = fileList.length >= 3;     // 上传的项目截图 < 3时，显示上传按钮
       this.change=true;

      },
        Change(file, fileList) {
        this.hideUpload = fileList.length >= 3; // 上传的项目截图 >= 3时，隐藏上传按钮
      },
      
        addgoods(goodsform){
            this.$refs[goodsform].validate( valid =>{
                if (!valid)  return ;
            let self = this;
            this.formPicsData = new FormData();
            this.$refs.uploadPic.submit();
            let config = {
             headers: {
            'Content-Type': 'multipart/form-data'
             }
         }; 	
            this.formPicsData.append('storename',this.storename);		   
            this.formPicsData.append('goodsname',this.goodsform.goodsname);
		    this.formPicsData.append('goodstype',this.value);
		    this.formPicsData.append('goodsallowbargin',this.goodsallowbargin);
	        this.formPicsData.append('goodsstock',this.goodsform.goodsstock);
	        this.formPicsData.append('goodssize',this.goodsform.goodssize);
	        this.formPicsData.append('goodsexplain',this.goodsform.goodsexplain);
		    this.formPicsData.append('goodsoldandnew',this.index);
            this.formPicsData.append('goodsoriginalprice',this.goodsform.goodsoriginalprice);
            this.formPicsData.append('goodsdiscount',this.goodsform.goodsdiscount);
            this.axios.post("/merchantshop/addgoods", this.formPicsData, config).then(res => {
                if(res.data =="nophoto"){
                    this.$message({
                        message: '请上传三张商品照片',
                        type: 'error',
                        center: true,
                        offset: 50
                    });
                }
                else if(res.data =="ok"){
                    this.addgoodsdialogVisible=false;
            	    this.$message({
					        type: 'success',
					        message: '请等待管理员审核商品',
					        center: true,
                            offset: 50
				    });  
                    this.getgoods(this.storename);
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '服务器走丢了!请重试!'
                     }); 
                 });
        });
      
    },
        getstorename(){
            this.merchantname=window.sessionStorage.getItem("merchantname");
            this.axios.post('/merchantshop/storeinformation', Qs.stringify({
                merchantname: this.merchantname
            })).then(response=>{
                this.storename=response.data.storename;
                this.merchantrank=response.data.merchantrank;
                this.merchantgoodrate=response.data.merchantgoodrate;
                this.getgoods(this.storename);
                if(this.storename!=null){
                    this.disabled=true;
                }
            })
        },
        getgoods(storename){
            this.axios.post('/merchantshop/getgoods', Qs.stringify({
                storename: storename
            })).then(response=>{
                this.allgoods=response.data;
            });
    },
    soldout(goodsid,index){
        this.axios.post('merchantshop/deletegoods',Qs.stringify({
            goodsid:  goodsid
    })).then(response=>{
        if(response="ok"){
            this.$message({
			    type: 'success',
				message: '下架成功',
				center: true,
                offset: 50
			});  
        this.allgoods.splice(index,1);
        }
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '服务器走丢了!请重试!',
                center: true,
                offset: 50
        }); 
    });
    },
    getgoodsshow(goodsid){
        window.sessionStorage.setItem("goodsid",goodsid);
        this.$router.push({path: '/goodsshow'});
    },
    judgestorename(storename){
        if(storename!="暂无店铺"){
            this.goodsform=[];      
            this.value="";
            this.index="";
           this.addgoodsdialogVisible=true
        }else{
            this.$message({
                type: 'error',
				message: '您目前还没有店铺请开店后重试！',
				center: true,
                offset: 50

            })
        }
    }
    },

})
</script>

<style >
.openshop{
    margin-top: 10px;
    float: right;
}
.box-card{
    background-color: #d9ebd9d8;
    margin-top: 10px;
    margin-left: 1%;
    margin-right: 1%;
    width: auto;
    height: auto;
}
.bottom {
    margin-top: 13px;
    line-height: 12px;
  }
.el-tag {
    float: right;
    margin-right: 0px;
  }
.clearfix:before,
.clearfix:after {
      display: table;
      content: "";
  }
  
.clearfix:after {
      clear: both
}  
.goodrate{
     float: left;
}
.el-icon-circle-plus-outline{
    margin-top: 120px;
    margin-left: 70px;
    display:block;
    position: absolute;
}
.hide .el-upload--picture-card {
    display: none;
}
</style>