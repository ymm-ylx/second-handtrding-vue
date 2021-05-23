<template>
    <el-container>
        <div>
        <h5 style="text-align: center">待评价订单</h5>
        <el-table :data="tableData"  height="350" border style="width: auto ;background: #FFFFFF; " header-cell-style=" color: #333;"> 
            <el-table-column prop="goodsid" label="商品编号" width="150" v-if="false">
            </el-table-column>  
            <el-table-column prop="buyrelationid" label="订单编号" width="150" v-if="false">
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
            <el-table-column  label="操作" width="130" > 
            <template slot-scope="scope">
                <el-button @click="editcomments(scope.row) " type="warning" icon="el-icon-star-on" circle size="mini" style="margin-left:20%"></el-button>
            </template>
            </el-table-column>
        </el-table>
        <h5 style="text-align: center">已评价订单</h5>
        <el-table :data="finishtableData"  height="350" border style="width: auto ;background: #FFFFFF;" header-cell-style="color: #333;"> 
            <el-table-column prop="goodsid" label="商品编号" width="150" v-if="false">
            </el-table-column>  
            <el-table-column prop="buyrelationid" label="订单编号" width="150" v-if="false">
            </el-table-column>  
            <el-table-column  label="商品照片" width="130">     
                <template slot-scope="scope">      
                <img :src="scope.row.goodspic1path" width="100" height="100" /> 
　          </template>
            </el-table-column>
            <el-table-column prop="goodsname" label="商品名称">
            </el-table-column>  
            <el-table-column prop="buynum" label="购买数量" >
            </el-table-column>
            <el-table-column prop="goodsoriginalprice" label="商品价格(元)" >
            </el-table-column> 
            <el-table-column prop="goodsdiscount" label="商品折扣" >
            </el-table-column> 
            <el-table-column prop="goodstotalprice" label="商品总价(元)" >
            </el-table-column>     
            <el-table-column prop="purchasedate" label="购买日期"  >
            </el-table-column>
            <el-table-column  label="查看评价" width="130" > 
            <template slot-scope="scope">
                <el-button @click="commentsshow(scope.row) " type="primary" icon="el-icon-search" circle size="mini" style="margin-left:20%"></el-button>
            </template>
            </el-table-column>
        </el-table>
        </div>
    <el-dialog title="评价" :visible.sync="dialogVisible" width="30%" >
        <span>to 商家服务态度: </span>
        <div >
        <br>
        <el-rate v-model="value1" :colors="colors"  show-score>
        </el-rate>
        </div>
        <span>to {{goodsname}}:</span>
        <div class="block">
        <br>
        <el-rate v-model="value2" :colors="colors"  show-score>
        </el-rate>
        <br>
        <el-input type="textarea"  placeholder="请输入内容"  v-model="textarea"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog title="查看评价" :visible.sync="commentdialogVisible" width="30%" >
        <span>
            商家服务态度:
        </span>
        <el-rate v-model="merchantgoodrate" :colors="colors"  show-score :disabled="true" >
        </el-rate>
        <br>
        <br>
        <br>
         <span>您已为该商品评价了{{num}}次</span>
         
        <span>
            <div v-for="(comment,index) in comments" :key="index">
                <br>
                <br>
                <br>
                <span>商品好评度:</span>
                <el-rate v-model="comment.goodrate" :colors="colors"  show-score :disabled="true" >
                </el-rate>
                <span>商品评价: </span>
                <el-input type="textarea"   :disabled="true"  v-model="comment.content"></el-input>
            </div>
        </span>
    </el-dialog>
    </el-container>
</template>
<script>
import Qs from 'qs'

export default ({
    data() {
        return{
            username:"",
            tableData:[],
            finishtableData:[],
            dialogVisible: false,
            value1: "0",
            value2: "0",
            textarea: null,
            goodsname: "",
            goodsid: "",
            merchantgoodrate:"",
            comments:[
                {merchantgoodrate:"",
                content:"",
                goodrate:""}],
            
            commentdialogVisible: false,
            num:"2",
            buyrelationid:""
        }        
    },
    created(){
        this.getorderform();
    },
    methods:{
        getorderform(){
            this.username=window.sessionStorage.getItem("username");
            this.axios.post('/getorderformedtoevaluate',Qs.stringify({
                username: this.username              
            })).then(response=>{
                for(var i=0;i<response.data.length;i++){
                    this.tableData.push(response.data[i]);
                };
                this.getfinishorderform();
            })
        },
        getfinishorderform(){
            this.username=window.sessionStorage.getItem("username");
            this.axios.post('/getorderformedevaluated',Qs.stringify({
                username: this.username              
            })).then(response=>{
                for(var i=0;i<response.data.length;i++){
                    this.finishtableData.push(response.data[i]);
                }
            })
        },
        editcomments(row){
            this.goodsname=row.goodsname;
            this.goodsid=row.goodsid;
            this.dialogVisible=true;
            this.buyrelationid=row.buyrelationid;
            this.textarea="";
            this.value1="";
            this.value2="";
        },
        submit(){
            this.axios.post('/addevaluate',Qs.stringify({
                goodsid:this.goodsid,
                buyrelationid: this.buyrelationid,
                goodrate: this.value2,
                merchantgoodrate: this.value1,
                content: this.textarea
            })).then(response=>{
                console.info(this.buyrelationid);
                if(response.data=="1"){
                        this.$message({
					    type: 'success',
					    message: '评论成功',
					    center: true,
                        offset: 50
				    });
                this.tableData=[];
                this.finishtableData=[];
                this.getorderform();
                this.dialogVisible=false
                }
            }).catch(()=>{
                    this.$message({
					    type: 'info',
					    message: '服务器走丢了!请重试！',
					    center: true,
                        offset: 50
				    });
            });
        },
        commentsshow(row){
            this.axios.post('/getevaluated',Qs.stringify({
                buyrelationid: row.buyrelationid
            })).then(response=>{
                console.info(response.data);
                for(var i=0;i<response.data.length;i++){
                    if(response.data[i].merchantgoodrate!=null){
                        this.merchantgoodrate=response.data[i].merchantgoodrate;
                    }
                }
                this.comments=response.data;
                this.num=this.comments.length;
                this.commentdialogVisible=true;
            }).catch(()=>{
                    this.$message({
					    type: 'info',
					    message: '服务器走丢了!请重试！',
					    center: true,
                        offset: 50
				    });
            });
        }
    }
})
</script>
