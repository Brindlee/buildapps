<script setup>
import { ref } from 'vue'
import pinia from '@/stores/store.js'
import { useCodeStore } from '@/stores/code'
import editorAPI from '@/js/editorAPI.js'
import { onMounted } from 'vue'

const codeStore = useCodeStore(pinia)
let r2Objects = ref([])
onMounted(() => {
  editorAPI.listR2Objects().then((r2ObjectsData) => {
    console.log('r2ObjectsData: ', r2ObjectsData)
    r2Objects.value = r2ObjectsData.Contents
  })
})
function getR2ObjectData(key) {
  codeStore.selectedObject = key
  editorAPI.getR2Object().then((r2ObjectText) => {
    //console.log('r2ObjectText: ', r2ObjectText)
    codeStore.setCode(r2ObjectText)
    codeStore.name = key
    codeStore.nameDisabled = true
  })
}
</script>
<template>
  <!--<div v-for="r2Object in r2Objects">
    <span @click="getR2ObjectData(r2Object.Key)">{{ r2Object.Key }}</span>
  </div>-->

  <div class="vdEditorFolderContainer">
    <template v-for="r2Object in r2Objects">
      <div class="vdEditorFolderItemWrap">
        <div :class="r2Object.Key == codeStore.selectedObject ? 'vdEditorFolderItem active' : 'vdEditorFolderItem'" > <!--active class here-->
          <div class="vdEditorFolderIcon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_3602_771"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="20"
                height="20"
              >
                <rect width="20" height="20" fill="#5e5b89" />
              </mask>
              <g mask="url(#mask0_3602_771)">
                <path
                  d="M6.66683 15H13.3335V13.3333H6.66683V15ZM6.66683 11.6667H13.3335V10H6.66683V11.6667ZM5.00016 18.3333C4.54183 18.3333 4.14947 18.1701 3.82308 17.8438C3.49669 17.5174 3.3335 17.125 3.3335 16.6667V3.33333C3.3335 2.875 3.49669 2.48264 3.82308 2.15625C4.14947 1.82986 4.54183 1.66667 5.00016 1.66667H11.6668L16.6668 6.66667V16.6667C16.6668 17.125 16.5036 17.5174 16.1772 17.8438C15.8509 18.1701 15.4585 18.3333 15.0002 18.3333H5.00016ZM10.8335 7.5H15.0002L10.8335 3.33333V7.5Z"
                  fill="#5e5b89"
                />
              </g>
            </svg>
          </div>
          <div class="vdEditorFolderText" @click="getR2ObjectData(r2Object.Key)">{{ r2Object.Key }}</div>
          <div class="vdEditorFolderOptions">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_3602_765"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="20"
                height="20"
              >
                <rect width="20" height="20" fill="#5e5b89" />
              </mask>
              <g mask="url(#mask0_3602_765)">
                <path
                  d="M5.00651 11.6666C4.54818 11.6666 4.15582 11.5034 3.82943 11.177C3.50304 10.8506 3.33984 10.4583 3.33984 9.99995C3.33984 9.54162 3.50304 9.14925 3.82943 8.82287C4.15582 8.49648 4.54818 8.33328 5.00651 8.33328C5.46484 8.33328 5.8572 8.49648 6.18359 8.82287C6.50998 9.14925 6.67318 9.54162 6.67318 9.99995C6.67318 10.4583 6.50998 10.8506 6.18359 11.177C5.8572 11.5034 5.46484 11.6666 5.00651 11.6666ZM10.0065 11.6666C9.54818 11.6666 9.15581 11.5034 8.82943 11.177C8.50304 10.8506 8.33984 10.4583 8.33984 9.99995C8.33984 9.54162 8.50304 9.14925 8.82943 8.82287C9.15581 8.49648 9.54818 8.33328 10.0065 8.33328C10.4648 8.33328 10.8572 8.49648 11.1836 8.82287C11.51 9.14925 11.6732 9.54162 11.6732 9.99995C11.6732 10.4583 11.51 10.8506 11.1836 11.177C10.8572 11.5034 10.4648 11.6666 10.0065 11.6666ZM15.0065 11.6666C14.5482 11.6666 14.1558 11.5034 13.8294 11.177C13.503 10.8506 13.3398 10.4583 13.3398 9.99995C13.3398 9.54162 13.503 9.14925 13.8294 8.82287C14.1558 8.49648 14.5482 8.33328 15.0065 8.33328C15.4648 8.33328 15.8572 8.49648 16.1836 8.82287C16.51 9.14925 16.6732 9.54162 16.6732 9.99995C16.6732 10.4583 16.51 10.8506 16.1836 11.177C15.8572 11.5034 15.4648 11.6666 15.0065 11.6666Z"
                  fill="#5e5b89"
                />
              </g>
            </svg>
            <div class="vdEditorFolderOptionDropdown">
              <div class="vdEditorFolderOptionDropdownItem">Cut</div>
              <div class="vdEditorFolderOptionDropdownItem">Copy</div>
              <div class="vdEditorFolderOptionDropdownItem">Rename</div>
              <div class="vdEditorFolderOptionDropdownItem">Delete</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
