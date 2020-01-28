<template>
  <el-container>
    <el-main width="50%">
      <el-table  :data="tableData" @row-click="getUrl">
        <el-table-column   prop="method"    label="Method" width="180"></el-table-column>
        <el-table-column   prop="url"    label="URL"></el-table-column>
      </el-table>
    </el-main>
    <el-aside width="50%">
      <el-input type="textarea" :rows="15" placeholder="request header" v-model="requestHeader"></el-input>
      <el-input type="textarea" :rows="15" placeholder="response" v-model="responsetext" style="margin-top: 10px;"></el-input>
    </el-aside>
  </el-container>
</template>

<script>
import global_ from './Global.vue'
import Vue from 'vue'
  export default {
    name: 'HelloWorld',
    components: {
      global_
    },
    data() {
      return {
        tableData: global_.tableData,
        responsetext: global_.responsetext,
        requestHeader:global_.requestHeader,
      }
    },

    mounted() {   
        var ws = new WebSocket('ws:liuyuxideMacBook-Pro.local:5000/');
        ws.onmessage = function(event) {
          //console.log('url is: ' + JSON.parse(event.data).url);
          if(JSON.parse(event.data).type == "req")
          {
            global_.tableData.push({ url: JSON.parse(event.data).url, method: JSON.parse(event.data).method});
          } else if (JSON.parse(event.data).type == "map") {
            var data = JSON.parse(event.data);
            global_.dataMap = new Map(JSON.parse(data.value));
          }
        }     
    },
 
    methods:{
      getUrl:function(row){
        //console.log(global_.dataMap.get(row.url));
        var data = global_.dataMap.get(row.url);
        if(data.hasOwnProperty("responseHeader") && data.hasOwnProperty("body")){
          this.responsetext = "statusCode: " + '\n' + data.statusCode + "\n response headers:" + '\n' + JSON.stringify(data.responseHeader)
                            + '\nresponse body:' + '\n' + data.body;
        }
        if(data.hasOwnProperty("requestHeader")){
          this.requestHeader = JSON.stringify(data.requestHeader);
        }
      }
    }
  }
</script>

<style scoped>
  .table{
    
  }
</style>