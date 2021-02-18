import {Connection} from "./connection";
import {Command} from "./command";

export interface Config {
  connections: Connection[];
  commands: Command[];
}
