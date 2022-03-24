import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Subscription } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import {AutenticacionService} from '../autenticacion.service'
import {NzNotificationService} from 'ng-zorro-antd/notification'
@Component({
     selector:'app-login',
     templateUrl: './login-component.html',
     styleUrls:['./login-component.scss']
})
export class LoginComponent implements OnInit{
     passwordVisible:boolean=false;
     loadingBtn:boolean=false;
     frmAutentiacion!: FormGroup;

    constructor(
        private fb: FormBuilder,
        protected router: Router,      
        private autenticaService:AutenticacionService,
        private modalService: NzModalService,
        private messageServ: NzMessageService,
        private notificacionService:NzNotificationService
      ) { 
          this.createForm();
      }


    ngOnInit() {
      
     }
     loginAcceso(){
          if(this.frmAutentiacion.valid){
              
               let autenticaJson={
                    nombreUsuario:this.frmAutentiacion.controls['nombreUsuario'].value,
                    claveUsuario:this.frmAutentiacion.controls['claveUsuario'].value
               }
               console.log(autenticaJson);

               this.autenticaService.loginServiciosRest(autenticaJson).subscribe((resp:any)=>{
                    console.log(resp);
                    if(resp && resp.token){
                         this.notificacionService.success("Acceso al Sistema","Credenciales correctas.");
                         this.autenticaService.asginarSession(resp);
                         this.router.navigate(['/pages/'])
                    }else{
                         this.notificacionService.warning("Acceso al Sistema","Credenciales incorrectas.");
                    }
               })
          }
     }
     getBack(){

     }
     createForm(){
          this.frmAutentiacion=this.fb.group({
               nombreUsuario:new FormControl('admin',[Validators.required]),
               claveUsuario:new FormControl('admin',[Validators.required])
          })
     }
    
}