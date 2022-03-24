import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { ListadoProcesosComponent } from "./procesos/listado-procesos/listado-procesos.component";

const routes:Routes=[{
    path:'',
    component:PagesComponent,
    children:[{
        path:'procesos',
        loadChildren:()=>import('./procesos/procesos.module').then(m=>m.ProcesosModule)
    }
]
    
}]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PagesRoutingModule{}