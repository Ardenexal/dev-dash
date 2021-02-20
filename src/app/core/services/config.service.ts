import {Injectable} from '@angular/core';
import {ElectronService} from "./electron/electron.service";
import {Config} from "../../../../interface/config";
import {Observable, ReplaySubject} from "rxjs";
import {map} from "rxjs/operators";
import {Connection} from "../../../../interface/connection";
import {Command} from "../../../../interface/command";
import {MenuItem} from "primeng/api";
import {Target} from "../../../../interface/target";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configObservable: ReplaySubject<Config> = new ReplaySubject<Config>();
  private commands: Command[];

  constructor(private electronService: ElectronService) {
  }

  initConfig() {
    if (this.electronService.isElectron) {
      this.electronService.ipcRenderer.invoke('config').then((config: Config) => {
        this.configObservable.next(config);
      });
    }
  }

  getConnection(connectionKey: string): Observable<Connection> {
    return this.configObservable.pipe(map(config => {
      return config.connections.find(connection => {
        return connection.key === connectionKey ? connection : null;
      });
    }));
  }

  getConnections(): Observable<Connection[]> {
    return this.configObservable.pipe(map(config => {
      this.commands = config.commands;
      return config.connections;
    }));
  }

  getCommands(): Observable<Command[]> {
    return this.configObservable.pipe(map(config => {
      return config.commands;
    }));
  }

  getConnectionForMenu(): Observable<MenuItem[]> {
    return this.getConnections().pipe(map(connections => {
      return connections.map(connection => {
        return {
          label: connection.label,
          items: connection.targets.map(target => {
            return {
              label: target.label,
              routerLink: `targets/${connection.key}/${target.key}`
            } as MenuItem;
          })
        };
      });
    }));
  }

  getTarget(connectionKey: string, targetKey: string): Observable<Target> {
    return this.configObservable.pipe(map((config) => {
      // Find connection by connection.key
      const connection = config.connections.find(connection => {
        return connection.key === connectionKey ? connection : null;
      });

      if (connection) {
        return connection.targets.find(target => {
          return target.key === targetKey ? target : null;
        });
      }
    }));
  }

  getTargetMenu(connectionKey: string, targetKey: string): Observable<MenuItem[]> {
    return this.getTarget(connectionKey, targetKey).pipe(map((target) => {
      return target.commands.map(commandGroups => {
        return {
          label: commandGroups.name,
          items: commandGroups.commands.map((commandKey: string) => {
            const command = this.getCommand(commandKey);
            if (command) {
              return {
                label: command.label,
                routerLink: `command/${commandKey}`
              } as MenuItem;
            }
            return null;
          })
        } as MenuItem;
      });
    }));
  }

  getCommandAsObservable(commandKey: string): Observable<Command> {
    return this.configObservable.pipe(map(config => {
      return config.commands.find(command => {
        return command.key === commandKey ? command : null;
      });
    }));
  }

  getCommand(commandKey: string): Command {
    return this.commands.find(command => {
      return command.key === commandKey ? command : null;
    });
  }
}
