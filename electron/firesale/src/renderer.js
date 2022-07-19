const path = require('path');
const marked = require('marked');

const { remote, ipcRenderer } = require('electron');

let filePath = null;
let originalContent = '';

// const mainProcess = remote.require('./main.js');
const mainProcess = ipcRenderer.invoke('read-file', './main.js')

// const currentWindow = remote.getCurrentWindow();

const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');
const showFileButton = document.querySelector('#show-file');
const openInDefaultButton = document.querySelector('#open-in-default');

const renderMarkdownToHtml = markdown => {
  htmlView.innerHTML = marked(markdown, { sanitize: true });
};

const updateUserInterface = (isEdited) => {
  let title = 'Fire Sale';
  if (filePath) {
    title = `${path.basename(filePath)} - ${title}`;
  }
  if (isEdited) {
    title = `${title} (Edited)`;
  }

  saveMarkdownButton.disabled = !isEdited;
  revertButton.disabled = !isEdited;

  // currentWindow.setTitle(title);

  // currentWindow.setRepresentedFilename(filePath);
  // currentWindow.setDocumentEdited(isEdited);

};

markdownView.addEventListener('keyup', event => {
  const currentContent = event.target.value;

  renderMarkdownToHtml(currentContent);
  updateUserInterface(currentContent !== originalContent);
});

openFileButton.addEventListener('click', () => {
  mainProcess.getFileFromUser();
});

newFileButton.addEventListener('click', () => {
  alert('Create new file!');
});

saveMarkdownButton.addEventListener('click', () => {
  alert('Save Markdown');
});

revertButton.addEventListener('click', () => {
  markdownView.value = originalContent;
  renderMarkdownToHtml(originalContent);
  updateUserInterface();
});

// Event listener from main.js
ipcRenderer.on('file-opened', (event, file, content) => {

  filePath = file;
  originalContent = content;

  markdownView.value = content;
  renderMarkdownToHtml(content);
  updateUserInterface();
});