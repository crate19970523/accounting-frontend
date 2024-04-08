<template>
  <div class="titleArea">
    <label class="title">類別</label>
  </div>
  <div class="frame">
    <div class="areaTitle">
      <label>搜尋條件</label>
    </div>
    <div class="areaContent">
      <div class="row">
        <label style="margin-right: 20px">名稱:</label>
        <q-input v-model="searchCondition.name"></q-input>
      </div>
      <div class="row content-center">
        <q-btn class="button" icon="search" label="search" color="blue" @click="queryCategory"></q-btn>
        <q-btn class="button" icon="add" label="add" color="green"></q-btn>
      </div>
    </div>
    <div>
      <q-table title="搜尋結果" color="green-2" :rows="queryResultRows" :columns="queryResultColumns">
        <template v-slot:body-cell-operate="props">
          <q-td class="text-center">
            <q-btn icon="edit" label="edit" @click="doEdit(props.row)"></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import envParam from "../env.js"
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter()

defineOptions({
  name: 'IndexPage'
});
const searchCondition = reactive({name: ""});
const queryResultRows = reactive([]);
const queryResultColumns = reactive([
  {
    name: 'name',
    align: 'center',
    label: 'name',
    field: 'name',
    sortable: true,
    style: "width:500px"
  },
  {
    name: "lastUpdateTime",
    align: "center",
    field: 'lastUpdateTime',
    label: "lastUpdateTime",
  },
  {
    name: "operate",
    align: "center",
    field: 'operate',
    label: "operate",
  },
]);

const queryCategory = () => {
  console.log("in queryCategory");
  let url = envParam.backendUrl + "/categoryController/categoryIndex?";
  console.log("url: " + url);
  if (searchCondition.name) {
    url = url + "name=" + searchCondition.name;
  }
  axios.get(url)
    .then(({ data }) => {
      if (!data.status.isSuccess) {
        //TODO: add alert windows
        return;
      }
      queryResultRows.length = 0;
      data.categoryIndexData.forEach(i => queryResultRows.push(i));
    });
}

const doEdit = rowData => {
  router.push({
    path: "categoryEdit",
    query: {
      categorySerialNo: rowData.serialNo
    }
  })
}
</script>

<style scoped>
@import '../css/main.css';
</style>
