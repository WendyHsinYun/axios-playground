
<template>
  <main>
    <div class="row">
    <div class="col-md-12">
      <h3>Cat Facts</h3>
    </div>
    <div class="col-md-12" :style="{ 'max-width': '80%' }">
      <ul class="list-group">
        <li v-for="(fact, index) in (catFacts as AnimalFacts[])" :key="index" class="list-group-item">{{index + 1}}. {{fact.text}}</li>
      </ul>
    </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios, { AxiosInstance } from 'axios'
import { nanoid } from 'nanoid'

interface AnimalFacts {
  text: string
}

const REQUEST_ID_KEY = 'X-Request-Id';
const catFacts = ref<AnimalFacts[]>([])

// 建立 Axios 實例
const instance: AxiosInstance = axios.create({
  baseURL: 'https://cat-fact.herokuapp.com',
  timeout: 3000,
});

// 設置請求攔截器
instance.interceptors.request.use((config) => {
  const requestId = nanoid();
  config.headers[REQUEST_ID_KEY] = requestId;
  return config;
});

// 設置響應攔截器
instance.interceptors.response.use((response) => {
  console.log('response:', response);  // {data: Array(5), status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…},…}
  console.log('response.config:', response.config); // 來自我所設置的 request 的 config
  console.log('response.header:', response.headers); // 來自伺服器的 headers
  console.log('response.config.headers[REQUEST_ID_KEY]:', response.config.headers[REQUEST_ID_KEY]); 
  return response;
});

// 獲取初始貓咪事實
const fetchInitialCatFacts = async () => {
  try {
    const catFactsResponse = await instance.get<AnimalFacts[]>('/facts/random?animal_type=cat&amount=5')
    catFacts.value = catFactsResponse.data
  } catch (error) {
    console.error('Error fetching cat facts:', error)
  }
}

onMounted(() => {
  fetchInitialCatFacts()
})
</script>

