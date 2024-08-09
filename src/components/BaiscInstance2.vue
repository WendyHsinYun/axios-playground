<template>
  <div>
    <h1>Play With Instance</h1>
    <p> Message: {{ message }}</p>
    <button @click="handleGetClick">Get</button>
    <!-- <button @click='handlePostClick'>POST</button>
    <button @click='handlePostConfigClick'>POST(With Config)</button> -->
  </div>
</template>

<script setup lang="ts">
import { defineOptions, ref } from 'vue';
import api from '../service/api/index';

defineOptions({
  name: 'BaiscInstance2'
});

const message = ref('' as any);

// GET 請求
const handleGetClick = async () => {
  try {
    const data = await api.GET('/api/auth/getregister', { id: "24698626" });
    // const data = await api.GET('/api/auth/getregister', { name: "24698626" });
  message.value = data;
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>
