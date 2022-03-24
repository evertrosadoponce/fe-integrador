import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutenticacionRoutingModule} from './autenticacion-routing.module'
import {LoginComponent} from './login/login-component'
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzCardModule} from 'ng-zorro-antd/card'
@NgModule({
    declarations:[LoginComponent],
    imports:[
        AutenticacionRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,        
        NzSkeletonModule,
        NzIconModule,
        NzButtonModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        NzDividerModule,
        NzModalModule,
        NzMessageModule,
        NzImageModule,
        NzCheckboxModule,
        NzNotificationModule,
        NzCardModule
    ]
})
export class AutenticacionModule {}