<script setup>
  import {computed} from "vue";
  import  useAlertStore from '@/store/alert'

  const store = useAlertStore();
  const show = computed(() => store.show);
  const message = computed(() => store.message);
  const alertType = computed(() => store.type);
  const title = computed(() => store.title);
  
</script>

<template>
  <v-alert
    :text="message"
    :type="alertType"
    v-if="show"
    class="mx-6 my-6"
    :title="title"
  ></v-alert>

</template>

<style scoped>

</style>
