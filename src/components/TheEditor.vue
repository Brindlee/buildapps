<script setup>
import pinia from "@/stores/store.js";
import {useCodeStore} from '@/stores/code'
import editorAPI from '@/js/editorAPI.js'
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';

import modeJavascriptUrl from 'ace-builds/src-noconflict/mode-javascript?url';
ace.config.setModuleUrl('ace/mode/javascript', modeJavascriptUrl);

import themeMonokaiUrl from 'ace-builds/src-noconflict/theme-monokai?url';
import editorHelper from "../js/editorHelper";
ace.config.setModuleUrl('ace/theme/monokai', themeMonokaiUrl);

const codeStore = useCodeStore(pinia);
function deployWorkerToCloudeflare() {
    console.log("in theeditor deployWorkerToCloudeflare");
    editorAPI.deployWorkerToCloudeflare().then((data) => {
        console.log('response: ',data);
        //loaderStore.hideLoader();
    });
}
function saveFileToR2() {
    console.log()
    if( codeStore.name == '' ) {
        alert('Provide file name');
    } else {
        editorAPI.saveFileToR2().then((data) => {
            console.log('response: ',data);
            //loaderStore.hideLoader();
            
        });
    }
}
function previewApp() {
    window.open("https://worker-r2.integrately.workers.dev/vuestandaloneapp/index.html#/", "_blank");
   
}

function editorInit() {
    console.log('editor init');
}
function newFile() {
    editorHelper.newFile();
    
}
</script>
<template>
    <!--<button @click="deployWorkerToCloudeflare">Deploy</button>-->
    <button @click="newFile">New</button>
    <button @click="saveFileToR2">Save</button>
    <button @click="previewApp">Preview App</button>
    <input v-model="codeStore.name" placeholder="Type File Name" :disabled="codeStore.nameDisabled" />
    <!--<textarea v-model="codeStore.code"></textarea>-->
    <VAceEditor
    v-model:value="codeStore.code"
    @init="editorInit"
    lang="javascript"
    theme="monokai"/>
</template>