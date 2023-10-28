import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.loginService.isLoggedIn()) {
            const authToken = this.loginService.getToken();
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + authToken)
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}

export const authInterceptorProviders = [ 
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
];