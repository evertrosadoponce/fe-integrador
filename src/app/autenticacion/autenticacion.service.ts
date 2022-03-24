import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AutenticacionService{
    _urlServices:string='';

    constructor(public http: HttpClient ) {      
        this._urlServices = environment.urlServices;
     }

     loginServiciosRest(oFormData:any){
        const url = `${this._urlServices}api/v1/login/getToken`
        return this.http.post(url,oFormData);
     }

     asginarSession(usuario:any){

        sessionStorage.setItem('usuario',usuario.nombreUsuario)
        sessionStorage.setItem('token',usuario.token)


     }

     removerSession(){
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('token');
     }

     getUsuarioSession(){
         return sessionStorage.getItem("usuario");
     }
     getTokenSession(){
         return  sessionStorage.getItem("token");
     }
}