import { Injectable } from "@angular/core";
import {Observable, Subject} from 'rxjs'  
import {_IListadoDataProcesos} from '../../models/interfaces'

@Injectable({
 providedIn:'root'
})
export class ProcesoObservablesService{
    private tareasEnProceso$:Subject<_IListadoDataProcesos[]> =new Subject<_IListadoDataProcesos[]>();
    private listaTareasEnProceso:_IListadoDataProcesos[]=[];

    agregarProceso(proceso:_IListadoDataProcesos){
       let filtroEnProceso= this.listaTareasEnProceso.filter(tarea=>tarea.codProceso==proceso.codProceso );
       console.log("agregando en observable..");
       console.log(filtroEnProceso); 
       if(filtroEnProceso && filtroEnProceso.length>0){
           // filtroEnProceso[0]
           this.listaTareasEnProceso.filter(tarea=>tarea.codProceso==proceso.codProceso )[0]=proceso;
        }else{
            this.listaTareasEnProceso.push(proceso);
        }
      
        this.tareasEnProceso$.next(this.listaTareasEnProceso);
    }
   
    getTareasEnProceso$():Observable<_IListadoDataProcesos[]>{
        return this.tareasEnProceso$.asObservable();
    }

}