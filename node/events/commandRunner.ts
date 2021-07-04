import {NodeSSH} from "node-ssh";
import {Connection} from "../../interface/connection";
import {Target} from "../../interface/target";
import {CommandRunnerHandleOptions} from "./commandRunnerHandleOptions";
import {Command} from "../../interface/command";

export class CommandRunner {
  connection: Connection;
  target: Target;
  command: Command;

  async handle(options: CommandRunnerHandleOptions): Promise<void> {
    const ssh = new NodeSSH();
    this.connection = options.connection;
    this.target = options.target;
    this.command = options.command;
    try {
      const connection = await ssh.connect({
        privateKey: this.connection.privateKey,
        host: this.connection.host,
        username: this.connection.username
      });
      const output = await connection.exec(options.commandOutput, [], {
        cwd: this.command.cwd,
        onStdout: chunk => {
          options.sender.send(options.id, {message: chunk.toString('utf8'), type: 'info'});
        },
        onStderr: chunk => {
          options.sender.send(options.id, {message: chunk.toString('utf8'), type: 'danger'});
        },
      });
      options.sender.send(options.id, {message: output, type: 'info'});
      options.sender.send(options.id, {message: 'done', type: 'success', end: true});
      ssh.dispose();


    } catch (e) {
      options.sender.send(options.id, {message: e.toString(), type: 'danger'});
      options.sender.send(options.id, {message: 'Failed with error', type: 'danger', end: true});
      ssh.dispose();
    }

  }
}
