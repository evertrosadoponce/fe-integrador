import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import {_IDataGrillaFiltroSelect} from '../../../models/interfaces'

@Injectable({
    providedIn:"root"
})
export class TablaFiltrosObservablesService{
    private tablaFiltroGrilla$:Subject<_IDataGrillaFiltroSelect[]>=new Subject<_IDataGrillaFiltroSelect[]>();
    private tablaFiltroGrilla:_IDataGrillaFiltroSelect[]=[];

    
}