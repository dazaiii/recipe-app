import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RecipeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const modifiedReq = req.clone({
    //   headers: req.headers
    //     .set('X-API-KEY', 'HoA')
    // });
    // return next.handle(modifiedReq);
    return next.handle(req);
  }
}
