import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {DetailRoutingModule} from './detail/detail-routing.module';

const routes: Routes = [
  {
    path: 'targets',
    loadChildren: () => import('./target/target.module').then(m => m.TargetModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy', paramsInheritanceStrategy: 'always'}),
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
