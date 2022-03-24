import { Component, Input, OnInit } from "@angular/core";
import { ProcesosService } from "../../procesos.service";
import {_IListadoDataColumnaTabla, _IListadoDataConsultas,_IListadoDataResultadoConsultas,_IDataExcelDescarga} from '../../../../models/interfaces'
import {EstadoProcesoEnums} from '../../../../enums/enumEstadoProceso'
import {ExrpotExcelService} from '../../../../Service/export/export-excel.service';

@Component({
    selector:'app-detalle-proceso',
    templateUrl:'./detalle-proceso.component.html',
    styleUrls:['./detalle-proceso.component.scss']
})
export class DetalleProcesoComponent implements OnInit{
@Input() codigoProceso:string=''
listaDetalle!:_IListadoDataConsultas;
listaResultados:_IListadoDataResultadoConsultas[]=[]
listaColumnas:_IListadoDataColumnaTabla[]=[];
loadingData:boolean=false;
listaDataExcel:_IDataExcelDescarga[]=[];

    constructor(private procesoService:ProcesosService,
                private exportExcelService: ExrpotExcelService,){
       
    }
    ngOnInit(): void {
        
        this.cargarDetalles();
    }
    cargarDetalles(){
        this.loadingData=true;

        let jsonFiltro={
            codProceso:this.codigoProceso
        };
        this.procesoService.detalleProceso(jsonFiltro).subscribe((resp:any)=>{
           
            this.listaDetalle=resp;
            this.listaResultados=resp.resultados;

            this.listaDataExcel= this.generarTablaExportar(this.listaDetalle);

            if(this.listaResultados){
               let tablaResult= this.listaResultados.filter(result=>result.estado==EstadoProcesoEnums.PROCESO_FINALIZADO);
              
               if(tablaResult && tablaResult.length>0){
                this.listaColumnas= tablaResult[0].tablas[0].columnaTabla;               
                console.log(this.listaColumnas);

               }             
            }
            this.loadingData=false;
        })
    }

    getEnumEstadoProceso():typeof EstadoProcesoEnums{
        return EstadoProcesoEnums;
    }

    exportarExcel(){

        this.exportExcelService.exportExcel(this.listaDataExcel,'Listado de consultas');
    }
    
    generarTablaExportar(listaData:_IListadoDataConsultas){
        let listaDataExcel:_IDataExcelDescarga[]=[];      
        
        if(listaData){
            console.log("--------");
            console.log(listaData);
            let columnasConsulta:_IListadoDataColumnaTabla[];
            //let tablaResult= listaData.resultados.filter(result=>result.estado==EstadoProcesoEnums.PROCESO_FINALIZADO);
            let tablaResult= listaData.resultados;//
           
            if(tablaResult && tablaResult[0].tablas){
                columnasConsulta=tablaResult[0].tablas[0].columnaTabla;
            }

            listaData.resultados.forEach(data=>{
                
                let dataExcel: _IDataExcelDescarga={};
                dataExcel["CÓDIGO LOCAL"]=data.codigoLocal;              
                    if(columnasConsulta){
                    dataExcel["TABLA"]= data.tablas[0].nombreTabla;                    
                  
                    columnasConsulta.forEach(cols=>{
                            if(data.tablas[0].columnaTabla){
                                let columnaFiltro=  data.tablas[0].columnaTabla.filter(columna=>columna.nombre==cols.nombre);
                                if(columnaFiltro){
                                    dataExcel[cols.nombre]=columnaFiltro[0].valor[0];
                                }else{
                                    dataExcel[cols.nombre]="";
                                }
                            }else{
                                dataExcel[cols.nombre]="";
                            }
                        });
                    }                  
               
                dataExcel["ESTADO"]=data.estado;
                dataExcel["ERROR"]=data.error;
                listaDataExcel.push(dataExcel);
            });
        }

        return listaDataExcel;
    }
}