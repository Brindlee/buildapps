<script setup>
import ChatInput from './components/ChatInput.vue'
import ChatMessages from './components/ChatMessages.vue'
import FileExplorer from './components/FileExplorer.vue';
import TheEditor from './components/TheEditor.vue';
import EditorTabs from './components/EditorTabs.vue';
import { useCodeStore } from '@/stores/code'
const codeStore = useCodeStore()
</script>

<template>
  	<div class="vdEditorPage">
			<EditorTabs />
			<div class="vdEditorPageCols">
				<div class="vdEditorFoldersCol">
					<FileExplorer :key="codeStore.fileExplorerRerenderKey" />
				</div>
				<div class="vdEditorCol">
					<!--<div id="editor" class="vdEditor">function foo(items) {
						var x = "All this is syntax highlighted";
						return x;
					}</div>-->
          <TheEditor />
				</div>
				<div class="vdEditorChatCol">
					<!-- Chats container -->
					<!--<div class="chat-container"></div>-->
          <ChatMessages />
					
					<!-- Typing container -->
					<ChatInput />
			</div>
		</div>
    </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
