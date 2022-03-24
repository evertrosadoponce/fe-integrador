import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable ,throwError} from "rxjs";
import {AutenticacionService} from '../../autenticacion/autenticacion.service'
@Injectable({
    providedIn:'root'
})
export class HttpInterceptorService implements HttpInterceptor{

    constructor(private autenticaService: AutenticacionService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token =this.autenticaService.getTokenSession()
        console.log('interceptor')
        console.log(token)
        if(token){
            const cloneReq=req.clone({
                headers:req.headers.set("Authorization","Bearer "+token)
            })
          
            return next.handle(cloneReq).pipe(catchError(this.handleError))
        }else{
            return next.handle(req).pipe(catchError(this.handleError))
        }

    }
    handleError(error: HttpErrorResponse) {
    
        let _title: string = '';
        let _text: string = '';
        switch (error.status) {
          case 0: {
            _title = 'Verifique Conexion',
            _text = 'Servidor!'
            break;
          }
          case 400: {
            _title = 'Datos Invalidos',
            _text = 'SYS!'
            break;
          }
          default:{
            _title = 'Ocurrio un Error',
            _text = 'SYS!'
            break;
            break;
          }
        }
        return throwError(error);
    }
}