"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var IPCMainHandler_1 = require("./events/IPCMainHandler/IPCMainHandler");
var App = /** @class */ (function () {
    function App() {
    }
    App.onWindowAllClosed = function () {
        if (process.platform !== 'darwin') {
            App.application.quit();
        }
    };
    App.onClose = function () {
        // Dereference the window object.
        App.mainWindow = null;
    };
    App.onReady = function () {
        setTimeout(function () {
            App.mainWindow = App.createWindow();
            new IPCMainHandler_1.IPCMainHandler();
        }, 400);
    };
    App.main = function (app, browserWindow) {
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class has no dependencies. This
        // makes the code easier to write tests for
        App.BrowserWindow = browserWindow;
        App.application = app;
        App.application.on('window-all-closed', App.onWindowAllClosed.bind(this));
        App.application.on('ready', App.onReady.bind(this));
    };
    App.createWindow = function () {
        var args = process.argv.slice(1);
        var serve = args.some(function (val) { return val === '--serve'; });
        var size = electron_1.screen.getPrimaryDisplay().workAreaSize;
        // Create the browser window.
        var win = new electron_1.BrowserWindow({
            x: 0,
            y: 0,
            width: size.width,
            height: size.height,
            webPreferences: {
                nodeIntegration: true,
                allowRunningInsecureContent: serve,
                contextIsolation: false,
                enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
            },
        });
        if (serve) {
            win.webContents.openDevTools();
            require('electron-reload')(__dirname, {
                electron: require(__dirname + "/node_modules/electron")
            });
            win.loadURL('http://localhost:4200');
        }
        else {
            win.loadURL(url.format({
                pathname: path.join(__dirname, 'dist/index.html'),
                protocol: 'file:',
                slashes: true
            }));
        }
        // Emitted when the window is closed.
        win.on('closed', function () {
            // Dereference the window object, usually you would store window
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null;
        });
        return win;
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=App.js.map