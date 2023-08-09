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
let menuDetails = ref({title: '', path: '', componentName: ''});
const staticObjVal = ref({path : '/files/index.html'});
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
/*function addtomenu(data) {
  console.log('in addToMenuConfig');
  editorHelper.updateConfig( data.key, { opertaion : data.operation }  );
}*/
function submitMenuDetails() {
  console.log( 'menuDetails: ',menuDetails.value );
  var menuElm = menuDetails.value;
  console.log( 'title: ', menuElm.title );
  if( menuDetails.value.title == '' || menuDetails.value.path == '' || menuDetails.value.componentName == '' ) {
    alert('Provide all 3 details');
    return;
  }
  editorHelper.updateConfig( codeStore.addToMenuDetails.key, {operation : 'add', menuDetails: JSON.parse( JSON.stringify(menuDetails.value))} );
  menuDetails.value.title = '';
  menuDetails.value.path = '';
  menuDetails.value.componentName = '';
  
}
function cancelSubmitMenuDetails() {
  menuDetails.value.title = '';
  menuDetails.value.path = '';
  menuDetails.value.componentName = '';
  codeStore.displayMenuDetailsModal = false;
}
</script>
<template>
  <!--<div v-for="r2Object in r2Objects">
    <span @click="getR2ObjectData(r2Object.Key)">{{ r2Object.Key }}</span>
  </div>-->
  <div class="modal" :style="{ 'display': ( codeStore.displayMenuDetailsModal ) ? 'block' : 'none' }">
    <h2>Provide Menu Details</h2>
    <input type="text" placeholder="Title" v-model="menuDetails.title" required />
    <input type="text" placeholder="Path" v-model="menuDetails.path" required />
    <input type="text" placeholder="Component Name. It must be variable name of vue component" v-model="menuDetails.componentName" required />
    <button @click="submitMenuDetails">Submit</button>
    <button @click="cancelSubmitMenuDetails">Cancel</button>
  </div>
  <div class="vdEditorFolderContainer">
    <!--<template v-for="r2Object in r2Objects">-->
      <!--<FolderItem objectkey="'index.html'" :objectvalue="staticObjVal" @on-add-to-menu-config="addtomenu" />-->
    <template v-for="(value, key) in folderStructureObj" :key="key">
      <div class="vdEditorFolderItemWrap">
        <!--<FolderItem :objectkey="key" :objectvalue="value" @on-add-to-menu-config="addtomenu" />-->
        <FolderItem :objectkey="key" :objectvalue="value" />
      </div>
    </template>
  </div>
</template>
