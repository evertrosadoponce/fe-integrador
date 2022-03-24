import { Component, OnInit } from "@angular/core";
import { ProcesosService } from "../procesos.service";

@Component({
    selector:'app-main-procesos',
    templateUrl:'main-procesos.component.html',
    styleUrls:['main-procesos.component.scss']
})
export class MainProcesosComponent implements OnInit{

    constructor(private procesosServices: ProcesosService){
        
    }
    ngOnInit(): void {
        
    }
}