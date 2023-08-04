<script setup>
import ChatInput from './components/ChatInput.vue'
import ChatMessages from './components/ChatMessages.vue'
import FileExplorer from './components/FileExplorer.vue';
import TheEditor from './components/TheEditor.vue';
import { useCodeStore } from '@/stores/code'
const codeStore = useCodeStore()
</script>

<template>
  	<div class="vdEditorPage">
			<div class="vdEditorPageTabs">
				<div class="vdEditorPageSaearch">
					<div class="vdEditorPageSaearchBtn">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.3333 15.5L9.08333 10.25C8.66667 10.5833 8.1875 10.8472 7.64583 11.0417C7.10417 11.2361 6.52778 11.3333 5.91667 11.3333C4.40278 11.3333 3.12153 10.809 2.07292 9.76042C1.02431 8.71181 0.5 7.43056 0.5 5.91667C0.5 4.40278 1.02431 3.12153 2.07292 2.07292C3.12153 1.02431 4.40278 0.5 5.91667 0.5C7.43056 0.5 8.71181 1.02431 9.76042 2.07292C10.809 3.12153 11.3333 4.40278 11.3333 5.91667C11.3333 6.52778 11.2361 7.10417 11.0417 7.64583C10.8472 8.1875 10.5833 8.66667 10.25 9.08333L15.5 14.3333L14.3333 15.5ZM5.91667 9.66667C6.95833 9.66667 7.84375 9.30208 8.57292 8.57292C9.30208 7.84375 9.66667 6.95833 9.66667 5.91667C9.66667 4.875 9.30208 3.98958 8.57292 3.26042C7.84375 2.53125 6.95833 2.16667 5.91667 2.16667C4.875 2.16667 3.98958 2.53125 3.26042 3.26042C2.53125 3.98958 2.16667 4.875 2.16667 5.91667C2.16667 6.95833 2.53125 7.84375 3.26042 8.57292C3.98958 9.30208 4.875 9.66667 5.91667 9.66667Z" fill="white"/>
						</svg>
						Search
					</div>
				</div>
				<div class="vdEditorPageTabsWrapper">
					<div class="vdEditorPageTab">
						<span class="vdEditorPageTabName">index.html</span>
						<span class="vdEditorPageTabClose vdEditorPageTabBtn">
							<svg width="11" height="11" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.33268 12.5833L0.166016 11.4167L4.83268 6.75001L0.166016 2.08334L1.33268 0.916672L5.99935 5.58334L10.666 0.916672L11.8327 2.08334L7.16602 6.75001L11.8327 11.4167L10.666 12.5833L5.99935 7.91667L1.33268 12.5833Z" fill="#5e5d93"/>
							</svg>
						</span>
					</div>
					<div class="vdEditorPageTab active">
						<span class="vdEditorPageTabName">common.js</span>
						<span class="vdEditorPagePreview vdEditorPageTabBtn">
							<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<mask id="mask0_3615_795" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
							<rect width="20" height="20" fill="#fff"/>
							</mask>
							<g mask="url(#mask0_3615_795)">
							<path d="M10.0002 13.3333C11.0418 13.3333 11.9272 12.9688 12.6564 12.2396C13.3856 11.5104 13.7502 10.625 13.7502 9.58334C13.7502 8.54167 13.3856 7.65625 12.6564 6.92709C11.9272 6.19792 11.0418 5.83334 10.0002 5.83334C8.9585 5.83334 8.07308 6.19792 7.34391 6.92709C6.61475 7.65625 6.25016 8.54167 6.25016 9.58334C6.25016 10.625 6.61475 11.5104 7.34391 12.2396C8.07308 12.9688 8.9585 13.3333 10.0002 13.3333ZM10.0002 11.8333C9.37516 11.8333 8.84391 11.6146 8.40641 11.1771C7.96891 10.7396 7.75016 10.2083 7.75016 9.58334C7.75016 8.95834 7.96891 8.42709 8.40641 7.98959C8.84391 7.55209 9.37516 7.33334 10.0002 7.33334C10.6252 7.33334 11.1564 7.55209 11.5939 7.98959C12.0314 8.42709 12.2502 8.95834 12.2502 9.58334C12.2502 10.2083 12.0314 10.7396 11.5939 11.1771C11.1564 11.6146 10.6252 11.8333 10.0002 11.8333ZM10.0002 15.8333C7.97239 15.8333 6.12516 15.2674 4.4585 14.1354C2.79183 13.0035 1.5835 11.4861 0.833496 9.58334C1.5835 7.68056 2.79183 6.1632 4.4585 5.03125C6.12516 3.89931 7.97239 3.33334 10.0002 3.33334C12.0279 3.33334 13.8752 3.89931 15.5418 5.03125C17.2085 6.1632 18.4168 7.68056 19.1668 9.58334C18.4168 11.4861 17.2085 13.0035 15.5418 14.1354C13.8752 15.2674 12.0279 15.8333 10.0002 15.8333Z" fill="#fff"/>
							</g>
							</svg>
						</span>
						<span class="vdEditorPageTabClose vdEditorPageTabBtn">
							<svg width="11" height="11" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.33268 12.5833L0.166016 11.4167L4.83268 6.75001L0.166016 2.08334L1.33268 0.916672L5.99935 5.58334L10.666 0.916672L11.8327 2.08334L7.16602 6.75001L11.8327 11.4167L10.666 12.5833L5.99935 7.91667L1.33268 12.5833Z" fill="#5e5d93"/>
							</svg>
						</span>
					</div>
				</div>
			</div>
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
