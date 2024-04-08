<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <q-item
            clickable
            @click="backToIndex()"
          >
            <q-item-label>帳務管理</q-item-label>
          </q-item>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      width="200"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          功能選單
        </q-item-label>

        <SidFunctionItem
          v-for="link in linksList"
          :key="link.title"
          :router-path="link.routerPath"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {ref} from 'vue'
import SidFunctionItem from "components/SidFunctionItem.vue";
import {useRouter} from 'vue-router'

const router = useRouter()

defineOptions({
  name: 'MainLayout'
})

const linksList = [{
  title: "類別",
  routerPath: "/category"
}]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const backToIndex = () => {
  router.push("/");
}

</script>
