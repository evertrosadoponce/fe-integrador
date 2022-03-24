import { NgModule } from "@angular/core";

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {NzListModule} from 'ng-zorro-antd/list'
import {NzInputModule} from 'ng-zorro-antd/input'
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {NzIconModule} from 'ng-zorro-antd/icon'
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import {DetalleProcesoComponent} from './cm-detalle-proceso/detalle-proceso.component'
import {DetalleProcesoUpdtComponent} from './cm-detalle-procesos-updt/detalle-proceso-updt.component'
import {ProcesoCreacionComponent} from './cm-proceso-creacion/proceso-creacion.component'
import {CreacionSelectComponent} from './cm-creacion-select/creacion-select.component'
import {CreacionUpdateComponent} from './cm-creacion-update/creacion-update.component'
import {NzCardModule} from 'ng-zorro-antd/card'
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker'
import{NzCheckboxModule} from 'ng-zorro-antd/checkbox'
import { NzModalModule} from 'ng-zorro-antd/modal'
import {NzNotificationModule} from 'ng-zorro-antd/notification'
@NgModule({
    declarations:[
        DetalleProcesoComponent,
        DetalleProcesoUpdtComponent,
        ProcesoCreacionComponent,
        CreacionSelectComponent,
        CreacionUpdateComponent
    ],
    imports:[
       
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzDropDownModule,
        NzListModule,
        NzInputModule,
        NzSelectModule,
        NzLayoutModule,
        NzIconModule,
        NzTableModule,
        NzToolTipModule,
        NzCardModule,
        NzDatePickerModule,
        NzCheckboxModule,
        NzModalModule,
        NzNotificationModule,
    ]
})
export class ProcesoModalModule{}