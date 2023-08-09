import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCodeStore = defineStore('codeStore', () => {
  const code = ref("")
  const name = ref("")
  const selectedObject = ref("");
  const nameDisabled = ref(false);
  const fileExplorerRerenderKey = ref(0);
  const openFiles = ref([]);
  const displayMenuDetailsModal = ref(false);
  const addToMenuDetails = ref({});
  const editorOptions = ref({ mode : {
    name: "javascript",
    json: true
  }, theme : "dracula", border : false });
  function setCode(codeStr) {
    code.value = codeStr;
  }
  return { code, setCode, name, selectedObject, nameDisabled, fileExplorerRerenderKey, openFiles, editorOptions, displayMenuDetailsModal, addToMenuDetails }
})
