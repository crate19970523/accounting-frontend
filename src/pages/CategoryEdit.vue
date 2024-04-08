<template>
  <div class="titleArea">
    <label class="title">類別編輯</label>
  </div>
  <div class="row">
    <q-btn icon="save" label="存檔" style="margin: 10px" @click="doSave()"></q-btn>
    <q-btn icon="cancel" label="取消" style="margin: 10px" @click="doCancel()"></q-btn>
    <q-btn icon="delete" label="刪除" color="red" style="margin: 10px" @click="doCancel()"></q-btn>
  </div>
  <div class="frame">
    <div class="row">
      <div class="col-auto text-left">
        <label>serialNo</label>
      </div>
      <div class="col-lg text-center" style="margin-left: 10px">
        <label>{{ categoryData.serialNo }}</label>
      </div>
      <div class="col-auto text-center">
        <label>name</label>
      </div>
      <div class="col-lg text-center" style="margin-left: 10px">
        <q-input v-model="categoryData.name" :error="!!errorMessage.name" :error-message="errorMessage.name"
                 style="text-align: center;"></q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-auto text-left">
        <label>createTime</label>
      </div>
      <div class="col-lg text-center" style="margin-left: 10px">
        <label>{{ categoryData.createTime }}</label>
      </div>
      <div class="col-auto text-center">
        <label>createUser</label>
      </div>
      <div class="col-lg text-center" style="margin-left: 10px">
        <label>{{ categoryData.createUser }}</label>
      </div>
    </div>
    <div class="row">
      <div class="col-auto text-left">
        <label>updateTime</label>
      </div>
      <div class="col-lg text-center" style="margin-left: 10px">
        <label>{{ categoryData.updateTime }}</label>
      </div>
      <div class="col-auto text-center">
        <label>updateUser</label>
      </div>
      <div class="col-lg text-center" style="margin-left: 10px">
        <label>{{ categoryData.updateUser }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {useRouter, useRoute} from "vue-router";
import axios from "axios";
import envParam from "src/env";

const router = useRouter()
const route = useRoute()

let isEdit = true;

onMounted(() => {
  const categorySerialNo = route.query.categorySerialNo;
  if (categorySerialNo) {
    putValue(categorySerialNo);
    isEdit = true;
  }
  console.log(route.query.categorySerialNo);
})

const categoryData = reactive({
  serialNo: "",
  name: "",
  createTime: "",
  createUser: "",
  updateTime: "",
  updateUser: ""
})

const errorMessage = reactive({
  name: ""
})

const putValue = categorySerialNo => {
  const url = envParam.backendUrl + "/categoryController/category?serialNo=" + categorySerialNo;
  axios.get(url)
    .then(({ data }) => {
      console.log(JSON.stringify(data))
      if (!data.status.isSuccess) {
        //TODO: add alert windows
        return;
      }
      const {serialNo, name, createTime, createUser, updateTime, updateUser} = data.categoryData;
      Object.assign(categoryData, {serialNo, name, createTime, createUser, updateTime, updateUser});
    });
}

const doCancel = () => {
  router.go(-1);
}

const doSave = () => {
  if (!doValidate()) {
    return;
  }
  const url = envParam.backendUrl + "/categoryController/category";
  const request = {
    name: categoryData.name,
    serialNo: categoryData.serialNo
  }
  axios.put(url, request, {
    headers: {
      'User-ID': 'test',
      'Content-Type': 'application/json'
    }
  }).then(({ data }) => {
    console.log(JSON.stringify(data))
    if (!data.status.isSuccess) {
      //TODO: add alert windows
      return;
    }
  })
}

const doValidate = () => {
  let isValidateOk = true;
  if (!categoryData.name) {
    errorMessage.name = "不可為空"
    isValidateOk = false;
  } else {
    errorMessage.name = "";
  }
  return isValidateOk;
}

</script>

<style scoped>
@import '../css/main.css';

label {
  font-size: 30px;
}
</style>
