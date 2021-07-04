import {Component, OnInit} from '@angular/core';
import {ElectronService} from './core/services';
import {TranslateService} from '@ngx-translate/core';
import {AppConfig} from '../environments/environment';
import {MenuItem} from "primeng/api";
import {ConfigService} from "./core/services/config.service";
import {Connection} from "../../interface/connection";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  connections: Connection[];
  connections$: Observable<MenuItem[]>;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private configService: ConfigService
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
      this.connections$ = this.configService.getConnectionForMenu();
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit(): void {
  }

  settings() {
    this.electronService.openSettings();
  }
}
