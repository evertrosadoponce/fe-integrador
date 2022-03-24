import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NzModalRef } from "ng-zorro-antd/modal";

import {TipoProcesoEnums} from '../../../../enums/enumTipoProceso'
import {_IListadoDataColSeteoUpdate,_IListadoDataColFiltroUpdate,_IDataGrillaColSelect,_IDataGrillaFiltroSelect,_IDataBaseCreacion, _ILitsadoDataCreaConsulta, _IListadoDataCreaUpdate} from '../../../../models/interfaces'
import {ProcesosService} from '../../../procesos/procesos.service';
import{NzNotificationService} from 'ng-zorro-antd/notification'
@Component({
    selector:'app-proceso-creacion',
    templateUrl:'./proceso-creacion.component.html',
    styleUrls:['./proceso-creacion.component.scss']
})
export class ProcesoCreacionComponent implements OnInit{

    frmCreaProceso!:FormGroup
    selectedTipoProceso!:TipoProcesoEnums;
  
    datosProcesoParent:_IDataBaseCreacion={ tabla:"", esProgramada:false, fechaEjecucion:"" };
    columnasSelectParent:_IDataGrillaColSelect[]=[];
    filtrosSelectParent:_IDataGrillaFiltroSelect[]=[];

    seteosUpdateParent:_IDataGrillaFiltroSelect[]=[];
    filtrosUpdatePatrent:_IDataGrillaFiltroSelect[]=[];

    constructor(private modal:NzModalRef,
        private procesoService:ProcesosService,
        private notificacion:NzNotificationService,
        private fb: FormBuilder){
        
    }
    ngOnInit(): void {
        this.creaFormulario();

    }
    creaFormulario(){
        this.frmCreaProceso=this.fb.group({
            codTipoProceso:[null],
            codGrupoCia:[null],
            codCia:[null],
            codLocal:[null],
            codProceso:[null],
            tabla:[null],
            columnas:[null],
            filtros:[null]
        })
    }
    seleccionaTipoProceso(){
      
        this.selectedTipoProceso=this.frmCreaProceso.get("codTipoProceso")?.value;
    }
    getEnumsTipoProcesos():typeof TipoProcesoEnums{
        return TipoProcesoEnums;
    }
    procesarTarea(){
        switch(this.selectedTipoProceso){
        case TipoProcesoEnums.PROCESO_CONSULTA:
            let dataConsulta:_ILitsadoDataCreaConsulta=this.generaJsonTicketConsulta(this.datosProcesoParent,
                                                            this.columnasSelectParent,this.filtrosSelectParent );
            console.log("---->>>");
            console.log(dataConsulta);
            this.procesoService.generaTicketConsulta(dataConsulta).subscribe((resp:any)=>{
               
                if(resp){
                    let mensajeTicket="Se ha creado el ticket:"+resp;
                    this.notificacion.success("Creación de Proceso",mensajeTicket);
                    this.destroyModal(true);
                }
            },(error:any)=>{
                if(error){
                    this.notificacion.success("Creación de Proceso","Ocurrio un error al enviar solicitud.");
                }
            });

            break;
        case TipoProcesoEnums.PROCESO_UPDATE:
             let dataUpdate:_IListadoDataCreaUpdate=this.generaJsonTicketUpdate(this.datosProcesoParent,
                                                                                  this.seteosUpdateParent, this.filtrosUpdatePatrent);
           
           console.log("========>UPDATES===>>");
            console.log(dataUpdate);
           this.procesoService.generaTicketUpdate(dataUpdate).subscribe((resp:any)=>{
                if(resp){
                    let mensajeTicket="Se ha creado el ticket:"+resp;
                    this.notificacion.success("Creación de Proceso",mensajeTicket);
                    this.destroyModal(true);
                }
            },(error:any)=>{
                if(error){
                    this.notificacion.success("Creación de Proceso","Ocurrio un error al enviar solicitud.");
                }
            });
            break;
        }
       
    }
    destroyModal(estado:boolean){
        this.modal.close();
    }

    generaJsonTicketConsulta(datosProceso:_IDataBaseCreacion,aryCols:_IDataGrillaColSelect[],
                             aryFiltros:_IDataGrillaFiltroSelect[]  ): _ILitsadoDataCreaConsulta{

        //------------------------arreglos de columnas de consultas--------------------
        let colsSelect:string[]=[];
        aryCols.forEach(cols=>{
            colsSelect.push(cols.columna);
        });
        //----------------------------------------------------------------------------

        //------------------------arreglos de filtros de consulta--------------------------
        let filsSelect:_IListadoDataColFiltroUpdate[]=[];
        aryFiltros.forEach(fils=>{
            let aryValor:string[]=[];
            aryValor.push(fils.valor);
            let colFils: _IListadoDataColFiltroUpdate={  nombre:fils.columna, valor:aryValor ,tipo:"STRIMG"};
            filsSelect.push(colFils);
        });
        //---------------------------------------------------------------------------------

        let fechaEjecucion=datosProceso.esProgramada? datosProceso.fechaEjecucion:"";
        let dataJson:_ILitsadoDataCreaConsulta={ tabla:datosProceso.tabla,
                                                 codGrupoCia:this.frmCreaProceso.get("codGrupoCia")?.value,
                                                 codCia:"",
                                                 codLocal:"",
                                                 codProceso:"",
                                                 fechaProgramado:fechaEjecucion,
                                                 columnas:colsSelect,
                                                 filtros: filsSelect
                                                  };

        return dataJson;
    }

    generaJsonTicketUpdate(datosProceso:_IDataBaseCreacion,arySeteos:_IDataGrillaFiltroSelect[],
                            aryFiltros:_IDataGrillaFiltroSelect[]  ): _IListadoDataCreaUpdate{
        //------------------------arreglos de seteos--------------------
        let seteosUpdate:_IListadoDataColSeteoUpdate[]=[];
        arySeteos.forEach(seteos=>{
            let seteoJson:_IListadoDataColSeteoUpdate={nombre:seteos.columna, valor:seteos.valor }
            seteosUpdate.push(seteoJson);
        });
        //----------------------------------------------------------------------------

        //------------------------arreglos de filtros de condicion--------------------------
        let filtroSeteos:_IListadoDataColFiltroUpdate[]=[];
        aryFiltros.forEach(fils=>{
            let aryValor:string[]=[];
            aryValor.push(fils.valor);
            let colFils: _IListadoDataColFiltroUpdate={  nombre:fils.columna, valor:aryValor ,tipo:"STRIMG"};
            filtroSeteos.push(colFils);
        });
        //---------------------------------------------------------------------------------

      
        let fechaEjecucion=datosProceso.esProgramada? datosProceso.fechaEjecucion:"";
        let dataJson: _IListadoDataCreaUpdate={ 
                                    codGrupoCia:this.frmCreaProceso.get("codGrupoCia")?.value,
                                    codCia:"",
                                    codLocal:"",
                                    codProceso:"",
                                    fechaProgramado:fechaEjecucion,
                                    tablaOperacion:datosProceso.tabla, 
                                    columnasSeteo:seteosUpdate,
                                    columnasCondicion: filtroSeteos
                                    };

        return dataJson;
    }
}