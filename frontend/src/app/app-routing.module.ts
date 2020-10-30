import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }, {
    path: 'home', 
    loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule)
  }, {
    path: 'new', 
    loadChildren: () => import('./page/new/new.module').then(m => m.NewModule),
    canActivate: [AuthGuard]
  }, {
    path: 'edit/:id', 
    loadChildren: () => import('./page/edit/edit.module').then(m => m.EditModule),
    canActivate: [AuthGuard]
  }, {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
