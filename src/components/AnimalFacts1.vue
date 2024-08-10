<template>
  <div class="row">
    <div class="col-md-12">
      <h3>Cat Facts</h3>
    </div>
    <div class="col-md-12" :style="{ 'max-width': '80%' }">
      <ul class="list-group">
        <li v-for="(fact, index) in (catFacts as AnimalFacts[])" :key="index" class="list-group-item">{{index + 1}}. {{fact.text}}</li>
      </ul>
    </div>
    <div class="row mt-3">
      <div class="col-md-12 text-center">
        <button @click="loadMoreFacts" class="btn btn-md btn-primary">{{ isFetchingFacts ? '...' : 'Load more' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineOptions, Ref } from 'vue'; 
import { ref, onMounted } from 'vue'
import axios from 'axios'

defineOptions({
  name: 'AnimalFacts1'
});

interface AnimalFacts {
  text: string
}

const catFacts = ref<AnimalFacts[]>([])
const isFetchingFacts: Ref<Boolean> = ref(false)

// load more cat facts
const loadMoreFacts = async() => {
  isFetchingFacts.value = true

  const catFactsResponse = await axios.get<AnimalFacts[]>('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=5')
  catFacts.value.push(...(catFactsResponse.data || [])) // append new facts to existing facts array, if no new facts, append empty array

  isFetchingFacts.value = false
}

// fetch initial cat facts
const fetchInitialCatFacts = async() => {
  const catFactsResponse = await axios.get<AnimalFacts[]>('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=5')

  catFacts.value = catFactsResponse.data
}

const testAxios = async() => {
  await axios.get<AnimalFacts[]>('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=5')
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
}

onMounted(async () => {
  await fetchInitialCatFacts()
  await testAxios()
})
</script>
