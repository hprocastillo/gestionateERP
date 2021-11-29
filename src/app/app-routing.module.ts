import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'auth', pathMatch: 'full'
  }, {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  }, {
    path: 'logistics',
    loadChildren: () => import('./modules/logistics/logistics.module').then(m => m.LogisticsModule)
  }, {
    path: 'rrhh',
    loadChildren: () => import('./modules/rrhh/rrhh.module').then(m => m.RrhhModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
