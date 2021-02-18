import {Injectable} from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import {ipcRenderer, webFrame} from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import {Connection} from "../../../../../interface/connection";
import {Target} from "../../../../../interface/target";
import {Subject} from "rxjs";
import {CommandOutputLine} from "../../../../../interface/command-output-line";
import {v4 as uuidv4} from 'uuid';
import {Command} from "../../../../../interface/command";

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  childProcess: typeof childProcess;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

  runCommand(connection: Connection, target: Target, command: Command, commandString: string): Subject<CommandOutputLine[]> {
    const logs = [];
    const runner: Subject<CommandOutputLine[]> = new Subject<CommandOutputLine[]>();
    const id = uuidv4();
    const commandConfig = {
      runId: id,
      connection: connection,
      target: target,
      command: command,
      commandOutput: commandString
    };
    this.ipcRenderer.invoke('run-command', commandConfig);

    this.ipcRenderer.on(id, ((event, args) => {
      logs.push(args);
      runner.next(logs);
    }));

    return runner;
  }

  async openSettings(): Promise<void> {
    return await this.ipcRenderer.invoke('openSettings');
  }
}
