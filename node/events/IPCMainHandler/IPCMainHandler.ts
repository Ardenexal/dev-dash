import {IpcMainInvokeEvent, shell} from 'electron';
import {CommandRunner} from "../commandRunner";
import {config} from "../../config/defaults";

const ElectronStore = require('electron-store');

export class IPCMainHandler {
  store: any;

  constructor() {

    this.store = new ElectronStore({
      defaults: config,
    });
  }

  async runCommand(event: IpcMainInvokeEvent, args: any): Promise<void> {
    const runner = new CommandRunner();
    await runner.handle({
      id: args.runId,
      connection: args.connection,
      target: args.target,
      command: args.command,
      commandOutput: args.commandOutput,
      sender: event.sender
    });
  }


  config(event: IpcMainInvokeEvent, key: string): any {
    if (key) {
      return this.store.get(key);
    }
    return this.store.get();
  }

  async openSettings(): Promise<void> {
    console.log('opening settings');
    console.log(this.store.path);
    await shell.openPath(this.store.path);
  }

}
