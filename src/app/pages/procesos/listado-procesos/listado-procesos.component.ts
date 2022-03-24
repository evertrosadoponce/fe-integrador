import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NzModalService } from "ng-zorro-antd/modal";
import { _IListadoDataProcesos , _IListadoDataFiltroUodate,_IRespuestaDataServicio,_IDataExcelDescarga} from "src/app/models/interfaces";
import { ProcesosService } from "../procesos.service";
import {DetalleProcesoComponent} from '../modal/cm-detalle-proceso/detalle-proceso.component'
import {DetalleProcesoUpdtComponent} from '../modal/cm-detalle-procesos-updt/detalle-proceso-updt.component'
import { Data } from "@angular/router";
import {ProcesoCreacionComponent} from '../modal/cm-proceso-creacion/proceso-creacion.component'
import {ExrpotExcelService} from '../../../Service/export/export-excel.service'
import {EstadoProcesoEnums} from '../../../enums/enumEstadoProceso'
import {TipoProcesoEnums} from '../../../enums/enumTipoProceso'
import { interval, Observable } from "rxjs";
import {ProcesoObservablesService} from '../../procesos/procesos-observables.service'

import {NzNotificationService} from 'ng-zorro-antd/notification';
import { ThisReceiver } from "@angular/compiler";
import { DatePipe, formatDate } from "@angular/common";

@Component({
    selector:'app-listado-procesos',
    templateUrl:'./listado-procesos.component.html',
    styleUrls:['./listado-procesos.component.scss']
})
export class ListadoProcesosComponent implements OnInit{
    listaProcesos:_IListadoDataProcesos[]=[];
    frmFiltros!:FormGroup;
    loadingData:boolean=false;
    filtroUpdate!:_IListadoDataFiltroUodate ;
    listaEnProceso:_IListadoDataProcesos[]=[];
    obsProcesos$!:Observable<_IListadoDataProcesos[]>;
    respuestaData!:_IRespuestaDataServicio;
    listaDataExcel:_IDataExcelDescarga[]=[];

    constructor(private modalService:NzModalService,
                private procesoServices: ProcesosService,
                private fb: FormBuilder,
                private exportExcelService: ExrpotExcelService,
                private observableProcesos:ProcesoObservablesService,
                private notificacion:NzNotificationService){

        

        this.crearFormulario();
        this.interactiveProgress();
    }
    ngOnInit(): void {
      this.obsProcesos$ =  this.observableProcesos.getTareasEnProceso$();

    }

    cargarGrilla(){
        console.log(this.frmFiltros.value);
        this.loadingData=true;
        this.procesoServices.listarProcesos(this.frmFiltros.value).subscribe((resp:any)=>{
            this.listaProcesos= resp;
            this.listaDataExcel= this.generarTablaExportar(this.listaProcesos);
            this.setearCalculoAvancePorcentaje(this.listaProcesos);
            this.listaEnProceso=this.getFiltrarTareasEnProceso(this.listaProcesos);            
            this.loadingData=false
        })
    }
    crearFormulario(){
        this.frmFiltros=this.fb.group({
            codProceso:[null],
            codGrupoCia:[null],
            codCia:[null],
            codLocal:[null],
            codStatus:[null],
            codTipoProceso:[null]
        })
    }
    getBack(){
        
    }
    creaRegistro(){
        const modalCreacion=this.modalService.create({
            nzTitle:'Creación de Proceso',
            nzWidth:800,
            nzContent:ProcesoCreacionComponent,
            nzComponentParams:{
                
            }
        })
    }
    deleteRegistro(data:any){

    }
    verDetalles(proceso:_IListadoDataProcesos){
        console.log(proceso.jsonFiltro);

        if(proceso.codTipoProceso=='PROCESO_CONSULTA'){
            const modal=this.modalService.create({
                nzTitle:'Detalle de Procesos',  
                nzWidth:700,            
                nzContent:DetalleProcesoComponent,           
                nzComponentParams:{
                    codigoProceso:proceso.codProceso
                }
            })
        }else{
            this.filtroUpdate=JSON.parse(proceso.jsonFiltro);

            console.log("---");
            console.log(this.filtroUpdate);

            const modal=this.modalService.create({
                nzTitle:'Detalle de Procesos',
                nzWidth:750,
                nzContent:DetalleProcesoUpdtComponent,           
                nzComponentParams:{
                    codigoProceso:proceso.codProceso,
                    nombreTabla:this.filtroUpdate.tablaOperacion,
                    filtroTabla:this.getCadenaFiltros(this.filtroUpdate),
                    seteoTabla:this.getCadenaColSeteos(this.filtroUpdate)
                }
            })
        }
       
    };

    getCadenaColSeteos(filtro:_IListadoDataFiltroUodate){
        let strFiltros:string='[';

        filtro.columnasSeteo.forEach(col=>{
          strFiltros+=  col.nombre+' = '+col.valor+'|';
        })
        strFiltros+=']';
        strFiltros=strFiltros.replace('[','')
                            .replace('|]','')
        return strFiltros;
    }

    getCadenaFiltros(filtro:_IListadoDataFiltroUodate){
        let strFiltros:string='[';
        filtro.columnasCondicion.forEach(col=>{
            if(col.valor.length==1){
                strFiltros+=  col.nombre+' = '+col.valor[0]+'|';
            }else{
                strFiltros+=  col.nombre+' IN ('
                col.valor.forEach(valor=>{
                    strFiltros+=valor+','
                })
                strFiltros+=')|'
            }          
          })
          strFiltros+=']';
          strFiltros=strFiltros.replace('[','')
                              .replace('|]','')
                             
          return strFiltros;
    }
    generarTablaExportar(dataLista:_IListadoDataProcesos[]){
        let  listaDataExcel:_IDataExcelDescarga[]=[];

        if(dataLista){
            dataLista.forEach(data=>{
                let dataExcel:_IDataExcelDescarga={};
                dataExcel["CÓDIGO PROCESO"]=data.codProceso;
                dataExcel["CÓDIGO LOCAL"]=data.codLocal;
                dataExcel["ESTADO"]=this.getDesEstadoProcesoTabla(data.codStatus);
                dataExcel["TIPO"]=this.getDesTipoProcesoTabla(data.codTipoProceso);
                dataExcel["AVANCE %"]=this.calcularAvancePorc(data.tareasRealizadas,data.tareasProgramadas);
                dataExcel["PROCESADOS"]=data.tareasRealizadas?data.tareasRealizadas.toString():'0';
                dataExcel["TOTALES"]=data.tareasProgramadas?data.tareasProgramadas.toString():'0';
                dataExcel["INICIO"]=formatDate(data.fecIniProc,"dd/MM/yyyy hh:mm:ss","en-US");
                dataExcel["FIN"]=formatDate(data.fecFinProc,"dd/MM/yyyy hh:mm:ss","en-US");
              
                listaDataExcel.push(dataExcel);
            });
        }
        return listaDataExcel;
    }
    exportarExcel(){
        this.exportExcelService.exportExcel(this.listaDataExcel,'Lista de Procesos');
    }

    private  getFiltrarTareasEnProceso(dataArray:_IListadoDataProcesos[]){
       
        const filtroEnProceso=dataArray.filter(data=>data.codStatus==EstadoProcesoEnums.PROCESO_EN_PROCESO || 
                                                     data.codStatus==EstadoProcesoEnums.PROCESO_PENDIENTE);
        
       
        if(filtroEnProceso){

            filtroEnProceso.forEach(dataFiltro=>{
                this.observableProcesos.agregarProceso(dataFiltro);
            })
        }
        return filtroEnProceso;
    }

    private setearCalculoAvancePorcentaje(dataArray:_IListadoDataProcesos[]):void{
        dataArray.forEach((data,index)=>{
            dataArray[index].porcentajeTareas=this.calcularAvancePorc(data.tareasRealizadas,data.tareasProgramadas);
        });
    }
    interactiveProgress(){
       
            const obsProcesoServicio = interval(10000);
            
            obsProcesoServicio.subscribe(()=>{
               
                this.listaEnProceso.forEach((dataObs,index)=>{
                   
                    let filtroJson={codProceso:dataObs.codProceso};
                    this.procesoServices.listarProcesos(filtroJson).subscribe((resp:any)=>{
                        if(resp){
                           
                            const respDataJson=resp[0]; 
                            this.listaProcesos.forEach((procesoLista,indexCons)=>{
                                    if(procesoLista.codProceso==filtroJson.codProceso){
                                       
                                        this.listaProcesos[indexCons].porcentajeTareas=this.calcularAvancePorc(respDataJson.tareasRealizadas,respDataJson.tareasProgramadas);
                                        this.listaProcesos[indexCons].tareasRealizadas=respDataJson.tareasRealizadas;
                                        this.listaProcesos[indexCons].tareasProgramadas=respDataJson.tareasProgramadas;
                                        this.listaProcesos[indexCons].codStatus=respDataJson.codStatus;
                                        this.listaProcesos[indexCons].fecIniProc=respDataJson.fecIniProc;
                                        this.listaProcesos[indexCons].fecFinProc=respDataJson.fecFinProc;
                                        
                                    }
                            });
                             //-----------------------------------------------------------------------
                            // damos de alta al registro en caso cambie a estado Finalizado /Error
                            //-----------------------------------------------------------------------
                            if(respDataJson.codStatus==EstadoProcesoEnums.PROCESO_FINALIZADO ||
                               respDataJson.codStatus==EstadoProcesoEnums.PROCESO_CON_ERROR ){
                                this.listaEnProceso.splice(index,1);
                            }
                            //-----------------------------------------------------------------------
                        }
                    });
                });
               
                console.log("pruebas timer");
            });
        
    }

    private calcularAvancePorc(realizada:number,programadas:number){

        const hechas=realizada==null?0:realizada ;
        const total=programadas==null?0:programadas;
        let porcRealizado=0.00;       
        if(hechas >0 && total >0){
            porcRealizado=(hechas/total)*100;   
        }   
        return porcRealizado.toFixed(2);
    }

    cancelarProceso(dataProceso:_IListadoDataProcesos){
        let dataJson={
            codigoProceso:dataProceso.codProceso
        };
        this.procesoServices.cancelarProceso(dataJson).subscribe((resp:any)=>{
            this.respuestaData=resp;
            if(this.respuestaData.error){
                this.notificacion.error("Cancelación de Proceso",this.respuestaData.mensaje);
            }else{
                this.notificacion.success("Cancelación de Proceso",this.respuestaData.mensaje);
                this.cargarGrilla();
            }
           
        });
    }
    aprobarProceso(dataProceso:_IListadoDataProcesos){
        let dataJson={
            codigoProceso:dataProceso.codProceso
        };
        this.procesoServices.aprobarProceso(dataJson).subscribe((resp:any)=>{
            this.respuestaData=resp;
            if(this.respuestaData.error){
                this.notificacion.error("Autorización de Proceso",this.respuestaData.mensaje);

            }else{
                this.notificacion.success("Autorización de Proceso",this.respuestaData.mensaje);
                this.cargarGrilla();
            }
           
        });
    }

    getDesTipoProcesoTabla(enumTipoProceso:string){
        let nombreTipoProceso="";
        switch(enumTipoProceso){
            case TipoProcesoEnums.PROCESO_CONSULTA:
                nombreTipoProceso="CONSULTAS";
                break;
            case TipoProcesoEnums.PROCESO_UPDATE:
                nombreTipoProceso="ACTUALIZACIONES";
                break;
        }
        return nombreTipoProceso;
    }

    getDesEstadoProcesoTabla(enumEstadoProceso:string){
        let nombreEstadoProceso="";
        switch(enumEstadoProceso){
            case EstadoProcesoEnums.PROCESO_POR_AUTORIZAR:
                nombreEstadoProceso="SIN AUTORIZAR";
                break;
            case EstadoProcesoEnums.PROCESO_CON_ERROR:
                nombreEstadoProceso="FIN. CON ERROR";
                break;
            case EstadoProcesoEnums.PROCESO_EN_PROCESO:
                nombreEstadoProceso="PROCESANDO";
                break;
            case EstadoProcesoEnums.PROCESO_FINALIZADO:
                nombreEstadoProceso="FIN. EXITOSO";
                break;
            case EstadoProcesoEnums.PROCESO_PENDIENTE:
                nombreEstadoProceso="PENDIENTE";
                break;
            default:
                nombreEstadoProceso="SIN DEFINIR";
                break;
        }

        return nombreEstadoProceso;
    }
}