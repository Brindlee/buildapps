import axios from 'axios'
import pinia from "@/stores/store.js";
import {useCodeStore} from '@/stores/code'


const codeStore = useCodeStore(pinia);

//default export
export default {
    deployWorkerToCloudeflare  : async function deployWorkerToCloudeflare() {
        var url = '/api/deploycloudflareworker'
        try {
            const blob = new Blob([codeStore.code], {type : "application/javascript+module"})
            const formDt = new FormData();
            formDt.append("worker.js", blob, "worker.js")
            const metadata = {
                "main_module" : "worker.js"
            }
            formDt.append("metadata", JSON.stringify(metadata))
            const response = await axios.put(url,formDt)
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    saveFileToR2 : async function saveFileToR2() {
        var url = '/api/saveFileToR2'
        try {
            /*const blob = new Blob([codeStore.code], {type : "application/javascript+module"})
            const formDt = new FormData();
            formDt.append('file', blob, codeStore.name+".js")
            //formDt.append("filename", codeStore.name+".js")
            const response = await axios.put(url,formDt)
            console.log(response);
            return response.data;*/
            var fName = codeStore.name;
            if( !fName.includes('/') ) {
                fName = 'vuestandaloneapp/files/'+fName;
            }
            var data = { content : codeStore.code, fileName : fName };
            //, {headers: { "Content-Type": 'application/json' }
            const response = await axios.put(url,data);
            var fname = codeStore.name;
            if( fname.indexOf('/') == -1 ) {
                codeStore.fileExplorerRerenderKey +=1;
            }
            codeStore.selectedObject = fName;
            console.log('response: ',response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    saveFileToR2WithKey : async function( key, text ) {
        var url = '/api/saveFileToR2'
        try {
            var data = { content : text, fileName : key };
            const response = await axios.put(url,data);

            console.log('response: ',response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    getR2Object : async function getR2Object() {
        var url = '/api/getR2Object'
        try {
            var objectDetails = {
                selectedObject : codeStore.selectedObject,
            }
            const response = await axios.post(url,JSON.stringify(objectDetails))
            console.log('response data type: ',typeof response.data);
            let respData = response.data;
            if( typeof response.data == 'object' ) {
                respData = JSON.stringify(response.data);
            }
            return respData;
        } catch (error) {
            console.error(error);
        }
    },
    getR2ObjectWithKey : async function getR2Object( key ) {
        var url = '/api/getR2Object'
        try {
            var objectDetails = {
                selectedObject : key,
            }
            const response = await axios.post(url,JSON.stringify(objectDetails))
            console.log('response data type: ',typeof response.data);
            let respData = response.data;
            if( typeof response.data == 'object' ) {
                respData = JSON.stringify(response.data);
            }
            return respData;
        } catch (error) {
            console.error(error);
        }
    },
    listR2Objects : async function getR2File() {
        var url = '/api/listR2Objects';
        const response = await axios.post(url,JSON.stringify({}));
        //add try catch
        return response.data;
    },
    deleteR2Object : async function( key ) {
        var url = '/api/deleteR2Object';
        var data = {
            bucket : 'abhishek',
            key : key
        }
        const response = await axios.post(url,JSON.stringify(data));
        //add try catch
        return response.data;
    }
    
}