<template>
    <div class="button" style="text-align: left;">
        <el-button v-on:click="clearList">清空列表</el-button>
    </div>
</template>

<script>
import global_ from "./Global.vue"
    export default{
        name:"Common",
        components:{
            global_
        },
        methods:{
            clearList:function(event){
                //console.log(global_.tableData.length);
                global_.tableData.splice(0,global_.tableData.length);
                global_.responsetext = '';
                global_.requestHeader = '';
            }
        }
    }
</script>

<style scoped>
    .button{
        margin:20px;
    }
</style>