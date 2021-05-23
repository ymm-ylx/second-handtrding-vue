<template>
    <el-container>  
            <span style="text-align: center; font-size:30px;font-weight:400;margin-top:10px"> {{$conf.usertitle}}</span>            
                <div class="user-avator" >
                <el-avatar style="background:#409eff" >{{$conf.userlogo}} </el-avatar>  
                </div>
                <a class="user-name"> {{username}}</a>
                <i class="el-icon-shopping-cart-2" @click="myshoppingcart()"></i>
                <el-popover
                    placement="bottom"
                    title="我的钱包"
                    trigger="click"
                    >  
                 <ul class="tips-content" style="margin-right:20px">
                  <a>您的余额为：{{userbalance}}元</a>
                  <br>
                  <a>您的积分为：{{userpoints}}</a>
                  <br>
                  <br>
                  <el-button type="primary" @click="investmoney(username)">充值</el-button>
                </ul>        
                <i  slot="reference" class="el-icon-wallet"  @click="getuserwallet(username)"></i>
                </el-popover>
                <i class="el-icon-s-order" @click="mygoodsorderform()"></i>
                <el-link class="user-exit" @click="exit"> 退出 </el-link>

    </el-container>

</template>

<script>
import Qs from 'qs';
  export default {
    data(){
      return {
        username: 'twj',
        userbalance: '暂无数据',
        userpoints:   '暂无数据'
      }
    },
    created(){
        this.getusername();
    },
    methods:{
        exit(){
             window.sessionStorage.clear();
            this.$router.push({path: '/login'});
        },
        getusername(){
            this.username=window.sessionStorage.getItem("username");
            this.getuserwallet(this.username);
        },
        getuserwallet(username){
            this.axios.post('/checkwallet',Qs.stringify({
                username: username
            })).then(response=>{
                this.userbalance=response.data.userbalance;
                this.userpoints=response.data.userpoints;
            })
        },
        myshoppingcart(){
            this.$router.push({path: "/shoppingcart"})
        },
        mygoodsorderform(){
            this.$router.push({path:"/goodsorderform"})
        },
        investmoney(username){
          this.$prompt('请输入充值金额', '充值', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            this.axios.post('addbalancetomyself',Qs.stringify({
                username: username,
                userbalance: value
            })).then(response=>{
                if(response.data=="ok"){
                    this.$message({
                    type: 'success',
                    message: '充值成功，您充值的金额为: ' + value
                   });
                }
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '服务器跑丢了，请重试'
          });   
            })
        }).catch(()=>{
            this.$message({
                type: 'info',
                message: '取消输入'
          });   
        })
        }
    }
}
</script>

<style  scoped>
.user-avator{
  float: right;
  padding-right: 180px;
  display: block;
  width: 40px;
  height: 40px;
  margin-top: 10px;
  position: absolute;
  border-radius: 50%;
  right: 40px;
}
.user-name {
   float: right;
    right: 180px;
    margin-top: 20px;
    position: absolute;
}
.user-exit{
    float: right;
    right: 10px;
    margin-top: 20px;
    position: absolute;
}
.el-icon-shopping-cart-2{
    float: right;
    right: 100px;
    margin-top: 25px;
    position: absolute;  
}
.el-icon-wallet{
    float: right;
    right: 140px;
    margin-top: 25px;
    position: absolute;    
}
.el-icon-s-order{
    float: right;
    right: 60px;
    margin-top: 25px;
    position: absolute;    
}
</style>