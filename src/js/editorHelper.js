import pinia from '@/stores/store.js'
import { useCodeStore } from '@/stores/code'
import editorAPI from '@/js/editorAPI.js'

const codeStore = useCodeStore(pinia);

export default {
    getR2ObjectData : function getR2ObjectData(key) {
        codeStore.selectedObject = key
        editorAPI.getR2Object().then((r2ObjectText) => {
          //console.log('r2ObjectText: ', r2ObjectText)
          codeStore.setCode(r2ObjectText)
          codeStore.name = key
          codeStore.nameDisabled = true
        })
    },
    closeEditorTab : function closeEditorTab( closedFilePath ){
        for( var openFileIdx = 0; openFileIdx < codeStore.openFiles.length; openFileIdx++ ) {
            let currentFile = codeStore.openFiles[openFileIdx];
            let r2ObjectToGet;
            if( currentFile.path == closedFilePath ) {
                if( closedFilePath == codeStore.selectedObject && openFileIdx != 0 ) {
                    r2ObjectToGet = codeStore.openFiles[ openFileIdx -1 ].path;
                } else if( closedFilePath == codeStore.selectedObject && openFileIdx == 0 ) {
                    if( codeStore.openFiles.length > 1  ){
                        r2ObjectToGet = codeStore.openFiles[1].path;
                    } else {
                        this.newFile();
                    }
                }
                codeStore.openFiles.splice( openFileIdx,1 );
                if( typeof r2ObjectToGet != 'undefined' ) {
                    this.getR2ObjectData( r2ObjectToGet );
                }
                break;
            }
        }
        
    },
    newFile : function newFile(){
        codeStore.name = "";
        codeStore.code = "";
        codeStore.nameDisabled = false;
        codeStore.selectedObject = "";
    }
}