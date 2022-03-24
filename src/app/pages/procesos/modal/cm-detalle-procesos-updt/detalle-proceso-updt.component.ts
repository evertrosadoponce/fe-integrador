import { Component, Input, OnInit } from "@angular/core";
import { ProcesosService } from "../../procesos.service";
import {_IListadoDataUpdates,_ILitsadoDataResultadoUodate,_IListadoDataConsultas,_IDataExcelDescarga} from '../../../../models/interfaces'
import {EstadoProcesoEnums} from '../../../../enums/enumEstadoProceso'
import {ExrpotExcelService} from '../../../../Service/export/export-excel.service'
@Component({
    selector:'app-detalle-proceso-updt',
    templateUrl:'./detalle-proceso-updt.component.html',
    styleUrls:['./detalle-proceso-updt.component.scss']
})
export class DetalleProcesoUpdtComponent implements OnInit{
@Input() codigoProceso:string=''
@Input() nombreTabla:string=''
@Input() filtroTabla:string=''
@Input() seteoTabla:string=''

loadingData:boolean=false;
listaDataDetalles!:_IListadoDataUpdates;
ListaDataResultado:_ILitsadoDataResultadoUodate[]=[];
listaDataExcel:_IDataExcelDescarga[]=[];

    constructor(private procesoService: ProcesosService,
                private exportExcelService: ExrpotExcelService, ){


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
           
            this.listaDataDetalles=resp;
            this.ListaDataResultado=this.listaDataDetalles.resultados;
            this.listaDataExcel= this.gerenrarTablaExportar(this.listaDataDetalles);
            console.log(resp);
            this.loadingData=false;
        })
    }
    getEnumEstadoProceso():typeof EstadoProcesoEnums{
        return EstadoProcesoEnums;
    }

    gerenrarTablaExportar(listaData:_IListadoDataUpdates){
        let listaDataExcel:_IDataExcelDescarga[]=[];  
        if(listaData && listaData.resultados){

            listaData.resultados.forEach(data=>{
                let dataExcel: _IDataExcelDescarga={};
                dataExcel["CÓDIGO LOCAL"]=data.codLocal;
                dataExcel["TABLA"]=this.nombreTabla;
                dataExcel["CONDICÓN"]=this.filtroTabla;
                dataExcel["VALORES ASIGNADOS"]=this.seteoTabla;
                dataExcel["ESTADO"]=data.estado;
                dataExcel["ERROR"]=data.error;
                listaDataExcel.push(dataExcel);
            });
        }

        return listaDataExcel;
    }
    exportarExcel(){
        this.exportExcelService.exportExcel( this.listaDataExcel,"listado de actualizaciones");
    }
}