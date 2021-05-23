<template>
<el-container >
    <el-main>
 <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="正在进行" name="first">
        <doingorderform v-if="doing"></doingorderform>
    </el-tab-pane>
    <el-tab-pane label="已完成" name="second">
        <finishorderform v-if="finish"></finishorderform>
    </el-tab-pane> 
    <el-tab-pane label="退货" name="third">
        <returnedorderform v-if="returned"></returnedorderform>
    </el-tab-pane>
    </el-tabs>
    </el-main>
</el-container>
</template>
<script>
import finishorderform from '@/views/merchantsystem/orderform/finishorderform';
import returnedorderform from '@/views/merchantsystem/orderform/returnedorderform';
import doingorderform from '@/views/merchantsystem/orderform/doingorderform';
export default ({
     data() {
        return{
            activeName: "first",
            finish: false,
            returned: false,
            doing: true
        }
    },
    methods:{
        handleClick(tab, event) {
		if(tab.name == "first") {
               this.finish=false;
               this.returned=false;
               this.doing=true;
            } else if(tab.name == "second") {
               this.finish=true;
               this.returned=false;
               this.doing=false;
            }else if(tab.name =="third"){
                this.finish=false;
                this.returned=true;
                this.doing=false;
            }
	},
    
    },
    components: {
        finishorderform,  
        returnedorderform,
        doingorderform
    }
})
</script>

<style  scoped>

</style>