export interface _IListadoDataProcesos{
    codProceso:string,
    codGrupoCia:string,
    codCia:string,
    codLocal:string,
    codStatus:string,
    usuCreaSesion:string,
    usuModfSesion:string,
    tareasRealizadas:number,
    tareasProgramadas:number,
    jsonData:string,
    jsonFiltro:string,
    fecIniProc:string,
    fecFinProc:string,
    fecRegistro:string,
    fecModifica:string,
    hasValue:boolean,
    codTipoProceso:string,
    porcentajeTareas:string
}

export interface _IListadoDataConsultas{
    codProceso:string,
    codGrupoCia:string,
    resultados:_IListadoDataResultadoConsultas[]
}
export interface _IListadoDataResultadoConsultas{
    codigoLocal:string,
    procesadoLocal:boolean,
    tablas:_IListadoDataTablaConsultas[],
    estado:string,
    error:string
}
export interface _IListadoDataTablaConsultas{
    nombreTabla:string,
    totalRegistros:number,
    columnaTabla:_IListadoDataColumnaTabla[]
}
export interface _IListadoDataColumnaTabla{
    nombre:string,
    tipo:string,
    valor:string[]
}
export interface _IListadoDataUpdates{
    codProceso:string,
    codGrupoCia:string,
    resultados:_ILitsadoDataResultadoUodate[]
}
export interface _ILitsadoDataResultadoUodate{
    codLocal:string,
    codProcesoDetalle:number,
    existe:boolean,
    procesado:boolean,
    error:string,
    estado:string,
}
export interface _IListadoDataFiltroUodate{
    tablaOperacion:string,
    codGrupoCia:string,
    columnasSeteo: _IListadoDataColSeteoUpdate[],
    columnasCondicion:_IListadoDataColFiltroUpdate[]
}
export interface _IListadoDataColSeteoUpdate{
    nombre:string,
    valor:string
}
export interface _IListadoDataColFiltroUpdate{
    nombre:string,
    tipo:string,
    valor:string[]
}
export interface _ILitsadoDataCreaConsulta{
    codGrupoCia:string,
    codCia:string,
    codLocal:string,
    codProceso:string,
    fechaProgramado:string,
    tabla:string,
    columnas:string[],
    filtros:_IListadoDataColFiltroUpdate[]
}
export interface _IListadoDataCreaUpdate{
    codProceso:string,
    codGrupoCia:string,
    codCia:string,
    codLocal:string,
    fechaProgramado:string,
    tablaOperacion:string,
    columnasSeteo:_IListadoDataColSeteoUpdate[],
    columnasCondicion:_IListadoDataColFiltroUpdate[]
}
export interface _IRespuestaDataServicio{
    codigo:string,
    mensaje:string,
    error:boolean
}

export interface _IDataExcelDescarga{
    [key:string]:string 
}

export interface _IDataGrillaColSelect{
    idColumna:number,
    columna:string
}

export interface _IDataGrillaFiltroSelect{
    idColumna:number,
    columna:string,
    valor:string
}
export interface _IDataBaseCreacion{
    tabla:string,
    esProgramada:boolean,
    fechaEjecucion:string
}
