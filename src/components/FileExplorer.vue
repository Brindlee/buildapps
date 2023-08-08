<script setup>
import { ref } from 'vue'
import pinia from '@/stores/store.js'
import { useCodeStore } from '@/stores/code'
import editorAPI from '@/js/editorAPI.js'
import editorHelper from '@/js/editorHelper.js'
import { onMounted } from 'vue'
import { _ } from 'vue-underscore'
import FolderItem from './FolderItem.vue'

const codeStore = useCodeStore(pinia)
let r2Objects = ref([]);
let folderStructureObj = ref({});
onMounted(() => {
  editorAPI.listR2Objects().then((r2ObjectsData) => {
    console.log('r2ObjectsData: ', r2ObjectsData)
    r2Objects.value = r2ObjectsData.Contents;
    var obj = {};
    if( typeof r2ObjectsData.Contents != 'undefined' && r2ObjectsData.Contents.length ) {
      r2ObjectsData.Contents.forEach(function(pathObj) {
        pathObj.Key.split('/').reduce(function(r, e) {

          return r[e] || (r[e] = (e.includes('.')) ? { path : pathObj.Key } : {} )
        }, obj)
      })
      folderStructureObj.value = obj;
    }
    console.log(obj)
  })
})
</script>
<template>
  <!--<div v-for="r2Object in r2Objects">
    <span @click="getR2ObjectData(r2Object.Key)">{{ r2Object.Key }}</span>
  </div>-->

  <div class="vdEditorFolderContainer">
    <!--<template v-for="r2Object in r2Objects">-->
    <template v-for="(value, key) in folderStructureObj" :key="key">
      <div class="vdEditorFolderItemWrap">
        <FolderItem :objectkey="key" :objectvalue="value" />
      </div>
    </template>
  </div>
</template>
