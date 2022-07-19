const fs = require('fs');
const path = require('path');
const open = require("open");
const { app, BrowserWindow, dialog, shell } = require('electron');

// Keeps mainWindow from getting garbage-collected
let mainWindow;

app.on('ready', () => {

  // Create browswer instance, but don't show it
  mainWindow = new BrowserWindow({ 
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'renderer.js')
    }
  });

  // Load HTML file
  mainWindow.loadFile(`${__dirname}/index.html`);

  // Show the window after the file is loaded to avoid a white screen
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    mainWindow.on('new-window', function(event, url){
      event.preventDefault();
      shell.beep();
      shell.openExternal(url);
      // open(url);
    });
  });

});