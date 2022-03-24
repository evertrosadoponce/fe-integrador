import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { ListadoProcesosComponent } from "./listado-procesos/listado-procesos.component";
import { MainProcesosComponent } from "./main-procesos/main-procesos.component";

const routes:Routes=[{
    path:'',
    component: MainProcesosComponent
},{
    path:'listado-procesos',
    component:ListadoProcesosComponent
}]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ProcesosRoutingModule{}