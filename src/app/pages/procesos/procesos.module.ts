import { NgModule } from "@angular/core";
import { ListadoProcesosComponent } from "./listado-procesos/listado-procesos.component";
import { ProcesosRoutingModule } from "./procesos-routing.module";

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import {NzListModule} from 'ng-zorro-antd/list'
import {NzInputModule} from 'ng-zorro-antd/input'
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb'
import {NzTableModule} from 'ng-zorro-antd/table'
import {NzIconModule} from 'ng-zorro-antd/icon'
import { NzSelectModule } from 'ng-zorro-antd/select';
import {ProcesoModalModule} from './modal/proceso-modal.module'
import {NzModalModule} from 'ng-zorro-antd/modal'
import {NzProgressModule} from 'ng-zorro-antd/progress'
import {NzNotificationModule} from 'ng-zorro-antd/notification'
@NgModule({
    declarations:[
        ListadoProcesosComponent
    ],
    imports:[
        ProcesosRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzDropDownModule,
        NzSkeletonModule,
        NzListModule,
        NzInputModule,
        NzIconModule,
        NzTableModule,
        NzBreadCrumbModule,
        NzMenuModule,
        NzLayoutModule,
        NzSelectModule,
        ProcesoModalModule,
        NzModalModule,
        NzProgressModule,
        NzNotificationModule,
    ]
})
export class ProcesosModule{}