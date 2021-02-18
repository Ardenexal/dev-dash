"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var App_1 = require("./node/App");
try {
    App_1.default.main(electron_1.app, electron_1.BrowserWindow);
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map