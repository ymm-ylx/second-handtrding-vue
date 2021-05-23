<template>
   <el-container>
        <el-header class="header"> 
             <platformheader></platformheader>               
        </el-header>
        <el-main>
            <goodsshow></goodsshow>
        </el-main>
   </el-container>
</template>
<script>
import goodsshow from '@/views/usersystem/goodsinformation/goodsshow';
import platformheader from "@/views/usersystem/config/platformheader";
export default ({
    data() {
        return{
        }  
    },
    methods:{
    },
    components:{
        goodsshow,
        platformheader,
    }
})
</script>

<style  scoped>
.el-main{
    width: 100%;
    height: auto; 
}
</style>