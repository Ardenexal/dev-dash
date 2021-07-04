import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TargetComponent} from "./components/target/target.component";
import {CommandComponent} from "./components/command/command.component";

const routes: Routes = [
  {
    path: ':connection/:target',
    component: TargetComponent,
    children: [
      {
        path: 'command/:command',
        component: CommandComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetRoutingModule {
}
