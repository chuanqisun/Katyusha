const {ipcRenderer} = require('electron')

// Handle DOM events
minimizeButton.onclick = () => ipcRenderer.send('tryMinimize');
closeButton.onclick = () => ipcRenderer.send('tryClose');