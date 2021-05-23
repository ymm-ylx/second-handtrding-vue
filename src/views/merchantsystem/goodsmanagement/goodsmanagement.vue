<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已经上架" name="first">
            <goodsshelves v-if="shelves"></goodsshelves>
        </el-tab-pane>
        <el-tab-pane label="已经下架" name="second">
            <goodssoldout v-if="soldout"></goodssoldout>
        </el-tab-pane> 
    </el-tabs>
</template>
<script>

import goodsshelves from '@/views/merchantsystem/goodsmanagement/goodsshelves';
import goodssoldout from '@/views/merchantsystem/goodsmanagement/goodssoldout';
export default({
    data() {
        return{
            activeName: "first",
            shelves: true,
            soldout: false,
        }
    
    },
    methods:{
           handleClick(tab, event) {
		        if(tab.name == "first") {
                    this.shelves=true;
                    this.soldout=false;
                } else if(tab.name == "second") {
                    this.shelves=false;
                    this.soldout=true;
                }
            }
    },
    components: {
          goodsshelves,
          goodssoldout,
    }
})
</script>

<style  scoped>

</style>