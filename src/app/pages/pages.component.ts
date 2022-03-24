import { Component, OnInit } from "@angular/core";
import { FADE_CLASS_NAME_MAP } from "ng-zorro-antd/modal";
import { PageService } from "./pages.service";
import {AutenticacionService} from '../autenticacion/autenticacion.service'
import { Router } from "@angular/router";
@Component({
    selector:'app-main',
    templateUrl:'./pages.component.html',
    styleUrls:['./pages.component.scss']
})
export class PagesComponent implements OnInit{
    isCollapsed:boolean=false;
    constructor(private pageServices:PageService,
                private autenticaService:AutenticacionService,
                private router:Router){

    }
    ngOnInit(): void {
        
    }
    logout(){
        this.autenticaService.removerSession();
        this.router.navigate(["/"]);
    }
}