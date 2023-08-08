<script setup>
    import { ref } from 'vue'
    import pinia from '@/stores/store.js'
    import { useCodeStore } from '@/stores/code'
    import editorAPI from '@/js/editorAPI.js'
    import editorHelper from '@/js/editorHelper.js'
    import { _ } from 'vue-underscore'

    const props = defineProps(['objectkey', 'objectvalue'])
    const codeStore = useCodeStore(pinia)

    function getR2ObjectData(key) {
        console.log( 'key: ', key );
        editorHelper.getR2ObjectData(key)
        
    }
    function deleteR2Object(key) {
        console.log('key to delete: ', key)
        var filesNotToBeDeleted = [ 'index.html', 'main.js', 'menue.js', 'routeconfig.json' ];
        var keyArr = key.split('/')
        if (keyArr.length > 0 && keyArr[keyArr.length - 1].includes('.')) {
            let filename = keyArr[keyArr.length - 1];
            if( filesNotToBeDeleted.includes( filename ) ) {
            alert('This file is not allowed to be deleted');
            return;
            }
        }
        if ( _.findIndex(codeStore.openFiles, function (openFile) {return openFile.path == key}) != -1 ) {
            if (confirm('This file is open in editor. Any unsaved changes may be lost. Do you want to delete?') == true) {
            //alert('deleting file');
            editorAPI.deleteR2Object( key ).then( function( deleteResp ) {
                console.log('deleteResp: ', deleteResp);
                editorHelper.closeEditorTab( key );
                codeStore.fileExplorerRerenderKey +=1;
                if( key.includes( codeStore.name ) ) {
                codeStore.name = '';
                codeStore.code = '';
                }
                let data = { operation : 'delete' };
                editorHelper.updateConfig( key, data );
            } )
            } 
        }else {
            //alert('deleting file');
            editorAPI.deleteR2Object( key ).then( function( deleteResp ) {
            console.log('deleteResp: ', deleteResp);
            codeStore.fileExplorerRerenderKey +=1;
            if( key.includes( codeStore.name ) ) {
                codeStore.name = '';
                codeStore.code = '';
                }
            let data = { operation : 'delete' };
            editorHelper.updateConfig( key, data );
            } )
        }
    }
    function addToMenuConfig( key ) {
        let data = { operation : 'add' };
        editorHelper.updateConfig( key, data );
    }
    function removeFromMenuConfig( key ) {
        let data = { operation : 'delete' };
        editorHelper.updateConfig( key, data );
    }
</script>
<template>
    <div class="vdEditorFolderItem">
          <!--active class here-->
        <template v-if="!props.objectkey.includes('.')">
            <div class="vdEditorFolderIcon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_3602_759" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                    <rect width="20" height="20" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_3602_759)">
                    <path d="M3.33317 16.6667C2.87484 16.6667 2.48248 16.5035 2.15609 16.1771C1.8297 15.8507 1.6665 15.4583 1.6665 15V5C1.6665 4.54167 1.8297 4.14931 2.15609 3.82292C2.48248 3.49653 2.87484 3.33333 3.33317 3.33333H8.33317L9.99984 5H16.6665C17.1248 5 17.5172 5.1632 17.8436 5.48958C18.17 5.81597 18.3332 6.20833 18.3332 6.66667V15C18.3332 15.4583 18.17 15.8507 17.8436 16.1771C17.5172 16.5035 17.1248 16.6667 16.6665 16.6667H3.33317Z" fill="#5e5b89"/>
                    </g>
                </svg>
            </div>
        </template>
        <template v-else>
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
        </template>
          
        <template v-if="!props.objectkey.includes('.')">
          <div class="vdEditorFolderText">
            {{ props.objectkey }}
          </div>
          </template>
          <template v-else>
            <div class="vdEditorFolderText" @click="getR2ObjectData(props.objectvalue['path'])">
                {{ props.objectkey }}
            </div>
          </template>
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
            <template v-if="props.objectkey.includes('.') && props.objectvalue['path'].includes('files')">
                <div class="vdEditorFolderOptionDropdown">
                    <div class="vdEditorFolderOptionDropdownItem" @click="deleteR2Object(props.objectvalue['path'])">Delete</div>
                    <div class="vdEditorFolderOptionDropdownItem" @click="addToMenuConfig(props.objectvalue['path'])">Add to Menu</div>
                    <div class="vdEditorFolderOptionDropdownItem" @click="removeFromMenuConfig(props.objectvalue['path'])">Remove from Menu</div>
               </div>
            </template>
          </div>
        </div>


    <template v-if="!props.objectkey.includes('.')">
        <div class="vdEditorFolderItemWrap">
        <template v-for="(value, key) in objectvalue">
            
                <FolderItem :objectkey="key" :objectvalue="value" />
            
        </template>
        </div>
    </template>
</template>