import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(){}

  public httpHandleError(error: HttpErrorResponse) {
    console.error(error)
    return throwError(error.error.message);
  };
}
