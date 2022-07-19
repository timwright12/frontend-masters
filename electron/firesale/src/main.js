const fs = require('fs');
const { app, BrowserWindow, dialog } = require('electron');

// Keeps mainWindow from getting garbage-collected
let mainWindow;

app.on('ready', () => {

  // Create browswer instance, but don't show it
  mainWindow = new BrowserWindow({ 
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Load HTML file
  mainWindow.loadFile(`${__dirname}/index.html`);

  // Show the window after the file is loaded to avoid a white screen
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

});

const openFile = (file) => {
  const content = fs.readFileSync(file).toString();

  // Set "file-opened" event, this is a custom event name
  mainWindow.webContents.send(
    'file-opened',
    file,
    content
  );
};

// Let mainProcess talk to renderer
exports.getFileFromUser = () => {
  const files = dialog.showOpenDialog({
    properties: ['openFile'],
    buttonLabel: 'Choose file / Open',
    title: 'Open fire sale document',
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown', 'mdown'] },
      { name: 'Text Files', extensions: ['txt', 'text'] },
    ]
  });
  if(!files) return;

  const file = files[0];
  openFile(file);
};