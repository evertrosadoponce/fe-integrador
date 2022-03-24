import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'' , redirectTo:'autenticacion' , pathMatch:'full'
  },
  {
    path:'autenticacion',  loadChildren:()=> import('./autenticacion/autenticacion.module').then(m=>m.AutenticacionModule)
  },
  {
    path:'pages', loadChildren:()=>import('./pages/pages.module').then(m=>m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
