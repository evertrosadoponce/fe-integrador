import { Component, Input, OnInit } from "@angular/core";
import {_IDataGrillaFiltroSelect,_IDataBaseCreacion} from '../../../../models/interfaces'

@Component({
    selector:"app-creacion-update",
    templateUrl:"./creacion-update.component.html",
    styleUrls:["./creacion-update.component.scss"]
})

export class CreacionUpdateComponent implements OnInit{
    @Input("datosProceso")  datosUpdate: _IDataBaseCreacion={ tabla:"", esProgramada:false , fechaEjecucion:"" };
    @Input("arraySeteos")  seteosUpdate:_IDataGrillaFiltroSelect[]=[];
    @Input("arrayFiltros") filtrosUpdate:_IDataGrillaFiltroSelect[]=[];
    statusFecha:boolean=true;
    mensajeExtra:string="Seleccione la fecha y hora de ejecución";
   
    constructor(){

    }
    ngOnInit(): void {
        this.inicializarTablas();
    }
    inicializarTablas(){
        
        let filGrillaJson:_IDataGrillaFiltroSelect={ idColumna:0, columna:"", valor:"" };        
        this.filtrosUpdate.push(filGrillaJson);       
        let seteoGrillaJson:_IDataGrillaFiltroSelect={ idColumna:0, columna:"", valor:"" };
        this.seteosUpdate.push(seteoGrillaJson);

    }
    
    agregarDataSeteo(){
        const idNuevo= this.seteosUpdate[this.seteosUpdate.length-1].idColumna +1;
      
         let setGrillaJson:_IDataGrillaFiltroSelect={idColumna:idNuevo, columna:"", valor:""};
         this.seteosUpdate.push(setGrillaJson);
    }
    eliminarDataSeteo(dataSeteo:_IDataGrillaFiltroSelect){
        this.seteosUpdate.forEach((filtro,index)=>{
            if(filtro.idColumna==dataSeteo.idColumna){
                this.seteosUpdate.splice(index,1);
            }
        });
    }

    agregarDataFiltro(){
        const idNuevo= this.filtrosUpdate[this.filtrosUpdate.length-1].idColumna +1;
      
         let filGrillaJson:_IDataGrillaFiltroSelect={idColumna:idNuevo, columna:"", valor:""};
         this.filtrosUpdate.push(filGrillaJson);
    }
    eliminarDataFiltro(dataFiltro:_IDataGrillaFiltroSelect){
        this.filtrosUpdate.forEach((filtro,index)=>{
            if(filtro.idColumna==dataFiltro.idColumna){
                this.filtrosUpdate.splice(index,1);
            }
        });
    }
    checkStatusFechaPrograma(){

        this.statusFecha=!this.datosUpdate.esProgramada;
    }
}