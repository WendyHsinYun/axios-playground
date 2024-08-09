<template>
  <div>
    <h1>Play With Instance</h1>
    <p> Message: {{ message }}</p>
    <button @click="handleGetClick">Get</button>
    <button @click='handlePostClick'>POST</button>
    <button @click='handlePostConfigClick'>POST(With Config)</button>
  </div>
</template>

<script setup lang="ts">
import { defineOptions, ref } from 'vue';
import axios from 'axios';

defineOptions({
  name: 'BaiscInstance'
});

const message = ref('' as any);

// 建立 Axios 實例
const instance = axios.create({
  baseURL: 'http://192.168.1.188:7011',
  timeout: 3000, // 設定太小會導致請求超時並拋出錯誤。
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

const handleGetClick = () => {
  // instance.get('http://192.168.1.188:7011/api/auth/getregister?id=24698626') // it works
  instance.get('/api/auth/getregister?id=24698626')
    .then(response => {
      message.value = response.data;
    })
    .catch(error => {
      console.error('Error:', error.response?.data || error.message);
    });
};

const handlePostClick = () => {
  instance.post('/api/auth/preregister', { id: "24698626" })
    .then(response => {
      message.value = response.data
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const handlePostConfigClick = () => { 
  instance({
    method: 'post',
    url: '/api/auth/preregister',
    data: { id: "24698626" }
  })
  .then((response) => message.value = response.data)
}
</script>
