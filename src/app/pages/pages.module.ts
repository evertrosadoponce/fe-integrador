import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb'
import {NzTableModule} from 'ng-zorro-antd/table'
import {NzIconModule} from 'ng-zorro-antd/icon'
import {NzFormModule} from 'ng-zorro-antd/form'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import {NzListModule} from 'ng-zorro-antd/list'
import {NzInputModule} from 'ng-zorro-antd/input'
import {NzAvatarModule} from 'ng-zorro-antd/avatar'
@NgModule({
    declarations:[PagesComponent],
    imports:[PagesRoutingModule,
        NzLayoutModule,
        NzMenuModule,
        NzInputModule,
        NzBreadCrumbModule,
        NzTableModule,
        NzIconModule,
         NzFormModule,
         NzDropDownModule, 
         NzSkeletonModule,
         NzListModule,
         NzAvatarModule
        ]
})
export class PagesModule {}