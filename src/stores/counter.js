import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('use-store', () => {
  const newForm = ref([])

  return { newForm }
})
