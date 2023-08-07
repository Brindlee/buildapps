import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCodeStore = defineStore('codeStore', () => {
  const code = ref("")
  const name = ref("")
  const selectedObject = ref("");
  const nameDisabled = ref(false);
  const fileExplorerRerenderKey = ref(0);
  const openFiles = ref([]);
  function setCode(codeStr) {
    code.value = codeStr;
  }
  return { code, setCode, name, selectedObject, nameDisabled, fileExplorerRerenderKey, openFiles }
})
