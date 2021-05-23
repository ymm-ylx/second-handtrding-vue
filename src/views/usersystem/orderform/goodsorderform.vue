<template>
    <el-container>
        <el-header  class="header">
            <platformheader></platformheader>
        </el-header>
        <el-main>
            <el-page-header @back="goBack" content="我的订单">
            </el-page-header> 
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="正在进行" name="first">
                        <doingorderform v-if="doing"></doingorderform>
                    </el-tab-pane>
                    <el-tab-pane label="已完成" name="second">
                        <finishorderform v-if="finish"></finishorderform>
                    </el-tab-pane>
                    <el-tab-pane label="退货申请" name="third">
                        <returnorderform v-if="returned"></returnorderform>
                    </el-tab-pane>
                </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
import platformheader from '@/views/usersystem/config/platformheader';
import finishorderform from '@/views/usersystem/orderform/finishorderform'
import returnorderform from '@/views/usersystem/orderform/returnorderform'
import doingorderform from '@/views/usersystem/orderform/doingorderform'
export default({
    data() {
        return{
            activeName: 'first',
            doing:true,
            returned:false,
            finish:false

        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        handleClick(tab, event) {
		    if(tab.name == "first") {
                this.doing = true;
                this.returned = false;
                this.finish=false;
            } else if(tab.name == "second") {
                this.doing = false;
                this.returned = false;
                this.finish=true;  
            }else if(tab.name == "third") {               
                this.doing = false;
                this.returned = true;
                this.finish=false;
            }
	},
    },
    components:{
        platformheader,
        finishorderform,
        returnorderform,
        doingorderform
    }
})
</script>
<style  scoped>
.el-tabs {
    margin-left: 15%;
    margin-top: 1%;
}
</style>

