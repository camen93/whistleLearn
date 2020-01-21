<template>
  <div class="table">
    <el-table  :data="tableData"   style="width: 100%">
      <el-table-column   prop="url"    label="URL"></el-table-column>
    </el-table>
    <el-input  type="textarea" :rows="10" placeholder="请输入内容" v-model="textarea"></el-input>
  </div>
</template>

<script>
import global_ from './Global.vue'
  export default {
    name: 'HelloWorld',
    components: {
      global_
    },
    data() {
      return {
        tableData: global_.tableData,
        textarea: ''
      }
    },

    mounted() {   
        var ws = new WebSocket('ws://sz-wxsq-0744a:5000/');
        ws.onmessage = function(event) {
          console.log('url is: ' + event.data);
          global_.tableData.push({ url: event.data });
        }     
    },

    methods:{
    }
  }
</script>

<style scoped>
  .table{
    float:left;
  }
</style>