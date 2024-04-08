<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()

defineOptions({
  name: 'SidFunctionItem'
})

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  depiction: {
    type: String,
    default: ""
  },
  routerPath: {
    type: String,
    required: true
  }
});

const jumpPage = () => {
  router.push(props.routerPath);
}
</script>

<template>
  <q-item
    clickable
    @click="jumpPage()"
  >
    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.depiction }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>

</style>
