import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import {_IDataGrillaColSelect} from '../../../models/interfaces'
@Injectable({
    providedIn:"root"
})
export class TablaColumnasObservablesService{
    private tablaColumnaGrilla$:Subject<_IDataGrillaColSelect[]>=new Subject<_IDataGrillaColSelect[]>();
    private tablaColumnaGrilla:_IDataGrillaColSelect[]=[];

    agregarColumna(ColumnaGrilla:_IDataGrillaColSelect){
        this.tablaColumnaGrilla.push(ColumnaGrilla);
        this.tablaColumnaGrilla$.next(this.tablaColumnaGrilla);
    }
    eliminarColumna(ColumnaGrilla:_IDataGrillaColSelect){
        this.tablaColumnaGrilla.forEach((data,index)=>{
            if(data.idColumna==ColumnaGrilla.idColumna){
                this.tablaColumnaGrilla.splice(index,1);
            }
        });
        this.tablaColumnaGrilla$.next(this.tablaColumnaGrilla);       
    }
    getTablaColumnsObservable():Observable<_IDataGrillaColSelect[]>{
        return this.tablaColumnaGrilla$.asObservable();
    }
}