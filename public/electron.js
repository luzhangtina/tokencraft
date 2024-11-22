const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

async function createWindow() {
  // Dynamically import electron-is-dev
  const isDev = (await import('electron-is-dev')).default;

  // Create the browser window
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,  // Allow access to Node.js API in Renderer process
      contextIsolation: false // Disable context isolation
    },
    icon: isDev
      ? path.join(__dirname, 'public', 'favicon.ico')
      : path.join(__dirname, 'build', 'favicon.ico'),
  });

  if (isDev) {
    win.loadURL('http://localhost:3000');
  } else {
    // Load the React app's production build
    const indexPath = path.join(__dirname, 'index.html');
    win.loadFile(indexPath);
  }
  
  if (isDev) {
    win.webContents.openDevTools(); // Open DevTools for debugging
  }

  // Remove the menu bar
  win.setMenu(null);

  // Emitted when the window is closed
  win.on('closed', () => {
    win = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
