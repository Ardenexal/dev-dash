import {Connection} from "../../interface/connection";
import {Target} from "../../interface/target";
import {WebContents} from 'electron';
import {Command} from "../../interface/command";

export interface CommandRunnerHandleOptions {
  sender: WebContents;
  connection: Connection;
  id: string;
  command: Command;
  target: Target
  commandOutput: string;
}
