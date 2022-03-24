import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {_ILitsadoDataCreaConsulta,_IListadoDataCreaUpdate} from '../../models/interfaces'
@Injectable({
    providedIn:'root'
})
export class ProcesosService{
    _urlServices:string='';
    constructor(public http:HttpClient){

        this._urlServices = environment.urlServices;
    }

    listarProcesos(filtros:any){
        const url =`${this._urlServices}api/centralizado/listar-procesos`
        return this.http.post(url,filtros)
    }

    detalleProceso(filtros:any){
        const url =`${this._urlServices}api/centralizado/obtener-procesos`
        return this.http.post(url,filtros)
    }
    cancelarProceso(dataProceso:any){
        const url =`${this._urlServices}api/centralizado/cancelar-procesos`;
        return this.http.post(url,dataProceso)
    }
    aprobarProceso(dataProceso:any){
        const url =`${this._urlServices}api/centralizado/aprobar-procesos`;
        return this.http.post(url,dataProceso)
    }
    generaTicketConsulta(dataConsulta:_ILitsadoDataCreaConsulta){
        const url =`${this._urlServices}api/centralizado/generar-ticket-consulta`;
        return this.http.post(url,dataConsulta,{responseType:"text" })
    }
    generaTicketUpdate(dataUpdate:_IListadoDataCreaUpdate){
        const url =`${this._urlServices}api/centralizado/generar-ticket-update`;
        return this.http.post(url,dataUpdate,{responseType:"text" })
    }
}