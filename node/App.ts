import {BrowserWindow, screen} from 'electron';
import * as path from 'path';
import * as url from 'url';
import {IPCMainHandler} from "./events/IPCMainHandler/IPCMainHandler";

export default class App {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow;

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      App.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object.
    App.mainWindow = null;
  }

  private static onReady() {
    setTimeout(() => {
      App.mainWindow = App.createWindow();
      new IPCMainHandler();
    }, 400);

  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow): void {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for
    App.BrowserWindow = browserWindow;
    App.application = app;
    App.application.on('window-all-closed', App.onWindowAllClosed.bind(this));
    App.application.on('ready', App.onReady.bind(this));
  }

  private static createWindow(): BrowserWindow {
    const args = process.argv.slice(1);
    const serve = args.some(val => val === '--serve');
    const size = screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    let win = new BrowserWindow({
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: serve,
        contextIsolation: false,  // false if you want to run 2e2 test with Spectron
        enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
      },
    });

    if (serve) {

      win.webContents.openDevTools();

      require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
      });
      win.loadURL('http://localhost:4200');

    } else {
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
      }));
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
    });

    return win;
  }
}
