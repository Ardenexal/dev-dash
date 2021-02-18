import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TargetRoutingModule} from './target-routing.module';
import {TargetComponent} from './components/target/target.component';
import {MenubarModule} from "primeng/menubar";
import {CommandComponent} from './components/command/command.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import {FormlyModule} from "@ngx-formly/core";
import { HorizontalWrapperComponent } from './components/horizontal-wrapper/horizontal-wrapper.component';


@NgModule({
  declarations: [TargetComponent, CommandComponent, HorizontalWrapperComponent],
  imports: [
    MenubarModule,
    CommonModule,
    TargetRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      wrappers: [{ name: 'form-field-horizontal', component: HorizontalWrapperComponent }],
    }),
    FormlyBootstrapModule
  ]
})
export class TargetModule {
}
