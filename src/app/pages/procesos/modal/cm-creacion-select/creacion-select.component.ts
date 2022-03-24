import { Component ,Input,OnInit} from "@angular/core";
import {_IDataGrillaColSelect,_IDataGrillaFiltroSelect,_IDataBaseCreacion} from '../../../../models/interfaces'
import {TablaColumnasObservablesService} from '../../observables/tabla-columnas.observables.service'
@Component({
    selector:"app-creacion-select",
    templateUrl:"./creacion-select.component.html",    
    styleUrls:["./creacion-select.component.scss"]
})
export class  CreacionSelectComponent implements OnInit{
    @Input("datosProceso")  datosSelect: _IDataBaseCreacion={ tabla:"", esProgramada:false , fechaEjecucion:"" };
    @Input("arrayColumnas") columnasSelect:_IDataGrillaColSelect[]=[];
    @Input("arrayFiltros") filtrosSelect:_IDataGrillaFiltroSelect[]=[];
     fechaProgramada?:Date;
   
    statusFecha:boolean=true;
    mensajeExtra:string="Seleccione la fecha y hora de ejecución";

   
    
    constructor(){
       
    }
     
    ngOnInit(): void {      
       this.inicializarTablas();

    }

    inicializarTablas(){
        let colGrillaJson:_IDataGrillaColSelect={idColumna:0, columna:""};
        this.columnasSelect.push(colGrillaJson);
        let filGrillaJson:_IDataGrillaFiltroSelect={ idColumna:0, columna:"", valor:"" };
        this.filtrosSelect.push(filGrillaJson);
    }
    
    agregarDataColumna(){
       const idNuevo= this.columnasSelect[this.columnasSelect.length-1].idColumna +1;
      
        let colGrillaJson:_IDataGrillaColSelect={idColumna:idNuevo, columna:""};       
        this.columnasSelect.push(colGrillaJson);
    }
    eliminarDataColumna(dataColumna:_IDataGrillaColSelect){      
        this.columnasSelect.forEach((filtro,index)=>{
            if(filtro.idColumna==dataColumna.idColumna){
                this.columnasSelect.splice(index,1);
            }
        });
    }

    agregarDataFiltro(){
        const idNuevo= this.filtrosSelect[this.filtrosSelect.length-1].idColumna +1;
      
         let filGrillaJson:_IDataGrillaFiltroSelect={idColumna:idNuevo, columna:"", valor:""};
         this.filtrosSelect.push(filGrillaJson);
    }
    eliminarDataFiltro(dataFiltro:_IDataGrillaFiltroSelect){
        this.filtrosSelect.forEach((filtro,index)=>{
            if(filtro.idColumna==dataFiltro.idColumna){
                this.filtrosSelect.splice(index,1);
            }
        });
    }
    checkStatusFechaPrograma(){

        this.statusFecha=!this.datosSelect.esProgramada;
    }
   
   
}