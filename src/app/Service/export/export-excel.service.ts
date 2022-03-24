import {  Injectable } from "@angular/core";
import * as FileSaver  from 'file-saver';
import { buffer } from "rxjs";
import * as XLSX from 'xlsx';

@Injectable({
    providedIn:'root'
})
export class ExrpotExcelService{

    constructor(){}

    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension = '.xlsx';

    public exportExcel(jsonData:any[],archivoExcel:string):void{
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
        const wb: XLSX.WorkBook ={ Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        this.guardarArchivoExcel(excelBuffer,archivoExcel);

    }

    private guardarArchivoExcel(buffer:any,fileName:string){
        const data:Blob = new Blob([buffer], {type: this.fileType});
        FileSaver.saveAs(data,fileName+this.fileExtension);
        
    }
}