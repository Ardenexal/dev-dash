import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigService} from "./services/config.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(configService: ConfigService) {
    configService.initConfig();

  }

}
