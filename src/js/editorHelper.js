import pinia from '@/stores/store.js'
import { useCodeStore } from '@/stores/code'
import editorAPI from '@/js/editorAPI.js'
import { _ } from 'vue-underscore'

const codeStore = useCodeStore(pinia);
export default {
    getR2ObjectData : function getR2ObjectData(key) {
        codeStore.selectedObject = key
        editorAPI.getR2Object().then((r2ObjectText) => {
          //console.log('r2ObjectText: ', r2ObjectText)
          codeStore.setCode(r2ObjectText)
          codeStore.name = key
          codeStore.nameDisabled = true

          var keyArr = key.split('/');
            if (keyArr.length > 0 && keyArr[keyArr.length - 1].includes('.')) {
                if( _.findIndex( codeStore.openFiles, function( openFile ){ return openFile.path == key } ) == -1 ) {
                    codeStore.openFiles.push({
                        filename: keyArr[keyArr.length - 1],
                        path: key
                    })
                }
            }
        })
    },
    closeEditorTab : function closeEditorTab( closedFilePath ){
        for( var openFileIdx = 0; openFileIdx < codeStore.openFiles.length; openFileIdx++ ) {
            let currentFile = codeStore.openFiles[openFileIdx];
            let r2ObjectToGet;
            if( currentFile.path == closedFilePath ) {
                if( closedFilePath == codeStore.selectedObject && openFileIdx != 0 ) {
                    r2ObjectToGet = codeStore.openFiles[ openFileIdx -1 ].path;
                    console.log( 'r2ObjectToGet in if: ', r2ObjectToGet );
                } else if( closedFilePath == codeStore.selectedObject && openFileIdx == 0 ) {
                    if( codeStore.openFiles.length > 1  ){
                        r2ObjectToGet = codeStore.openFiles[1].path;
                        console.log( 'r2ObjectToGet in else if: ', r2ObjectToGet );
                    } else {
                        this.newFile();
                    }
                } 
                codeStore.openFiles.splice( openFileIdx,1 );
                console.log( 'r2ObjectToGet: ', r2ObjectToGet );
                if( typeof r2ObjectToGet != 'undefined' ) {
                    this.getR2ObjectData( r2ObjectToGet );
                }
                break;
            }
        }
        
    },
    isJSON : function(str) {
        try {
            return JSON.parse(str) && !!str;
        } catch (e) {
            return false;
        }
    },
    updateConfig : function( key, data ) {
        var self = this;
        if( data.operation == 'delete' ) {
            console.log('check if path exists in config. if exist delete it');
            editorAPI.getR2ObjectWithKey( 'vuestandaloneapp/routeconfig.json' ).then((r2ObjectText) => {
                console.log('typeof r2ObjectText: ', r2ObjectText);
                if( r2ObjectText != '' && self.isJSON( r2ObjectText )  ) {
                    let routes = JSON.parse( r2ObjectText );
                    console.log( 'routes: ', routes );
                    let keyArr = key.split('/');
                    if( keyArr.length > 1 ) {
                        let fname = keyArr[keyArr.length-1];
                        let routeIdx = _.findIndex(routes, function(route) { return route.fileUrl.includes( fname ) });
                        console.log( 'routeIdx: ', routeIdx );
                        if( routeIdx != -1 ) {
                            routes.splice(routeIdx,1);
                            let routesStr = '';
                            if( routes.length ) {
                                routesStr = JSON.stringify( routes );
                            }
                            //save routes
                            editorAPI.saveFileToR2WithKey( 'vuestandaloneapp/routeconfig.json', routesStr ).then( function( saveResp ) {
                                console.log('save routes resp: ', saveResp);
                                alert('Menu deleted from config');
                                self.getR2ObjectData( 'vuestandaloneapp/routeconfig.json' );
                            } );
                        } else {
                            alert('Menu not exist in config');
                        }
                    }
                }
            });

        } else if( data.operation == 'add' ) {
            editorAPI.getR2ObjectWithKey( 'vuestandaloneapp/routeconfig.json' ).then((r2ObjectText) => {
                console.log('typeof r2ObjectText: ', r2ObjectText);
                let routes = [];
                if( r2ObjectText != '' && self.isJSON( r2ObjectText )  ) {
                    routes = JSON.parse( r2ObjectText )
                }
                
                console.log( 'routes: ', routes );
                let keyArr = key.split('/');
                if( keyArr.length > 1 ) {
                    let fname = keyArr[keyArr.length-1];
                    let routeIdx = _.findIndex(routes, function(route) { return route.fileUrl.includes( fname ) });
                    console.log( 'routeIdx: ', routeIdx );
                    if( routeIdx == -1 ) {
                        let fnameWithoutExt = fname.split('.')[0];
                        let routeObj = {
                            title : fnameWithoutExt,
                            fileUrl : './files/'+fname,
                            name : fnameWithoutExt,
                            path : '/'+fnameWithoutExt,
                            componentName : ''
                        }
                        routes.push( routeObj );
                        let routesStr = JSON.stringify( routes );
                        //save routes
                        editorAPI.saveFileToR2WithKey( 'vuestandaloneapp/routeconfig.json', routesStr ).then( function( saveResp ) {
                            console.log('save routes resp: ', saveResp);
                            alert( 'Menu added in config at last. You will have to update componentName in it with your vue component variable. Also check path.' )
                            self.getR2ObjectData( 'vuestandaloneapp/routeconfig.json' );
                        } );
                        
                    } else {
                        alert('Menu already exist in config');
                    }
                }
                
            });
        }
        
    },
    newFile : function newFile(){
        codeStore.name = "";
        codeStore.code = "";
        codeStore.nameDisabled = false;
        codeStore.selectedObject = "";
    }
}