import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiConst } from '../constants/api-const';
import { Cart } from '../interface/cart';
import { Item } from '../interface/item';
import { Login } from '../interface/login';
import { Ordered } from '../interface/ordered';
import { NewTopping, Topping } from '../interface/topping';
import { ErrorMessagingService } from './error-messaging.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private errorService: ErrorMessagingService
  ) {}

  login(user: Login) {
    return this.http
      .post<any>(
        ApiConst.PATH_API_ROOT + ApiConst.PATH_LOGIN,
        user,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          this.errorService.setUpErrorMessage(error);
          return of(null);
        })
      );
  }

  getItemList() {
    return this.http.get(ApiConst.PATH_API_ROOT + ApiConst.PATH_LIST).pipe(
      catchError((error) => {
        this.errorService.setUpErrorMessage(error);
        return of(null);
      }),
      map((items) => items as Item[])
    );
  }

  getItem(id: number) {
    return this.http
      .get(ApiConst.PATH_API_ROOT + ApiConst.PATH_LIST + `${id}/`)
      .pipe(
        catchError((error) => {
          this.errorService.setUpErrorMessage(error);
          return of(null);
        }),
        map((item) => item as Item)
      );
  }

  addItem(newItem: FormData) {
    return this.http
      .post(ApiConst.PATH_API_ROOT + ApiConst.PATH_LIST, newItem)
      .pipe(
        catchError((error) => {
          this.errorService.setUpErrorMessage(error);
          return of(null);
        })
      );
  }

  editItem(editItem: FormData) {
    const id = Number(editItem.get('id'));
    return this.http
      .put(ApiConst.PATH_API_ROOT + ApiConst.PATH_LIST + `${id}/`, editItem)
      .pipe(
        catchError((error) => {
          this.errorService.setUpErrorMessage(error);
          return of(null);
        })
      );
  }

  getTopping(): Observable<Topping[]> {
    return this.http.get(ApiConst.PATH_API_ROOT + ApiConst.PATH_TOPPING).pipe(
      catchError((error) => {
        this.errorService.setUpErrorMessage(error);
        return of(null);
      }),
      map((items) => items as Topping[])
    );
  }

  addTopping(newTopping: NewTopping) {
    return this.http
      .post(
        ApiConst.PATH_API_ROOT + ApiConst.PATH_TOPPING,
        newTopping,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          this.errorService.setUpErrorMessage(error);
          return of(null);
        })
      );
  }

  deleteTopping(id: number) {
    return this.http
      .delete(
        ApiConst.PATH_API_ROOT + ApiConst.PATH_TOPPING + `${id}/`,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          this.errorService.setUpErrorMessage(error);
          return of(null);
        })
      );
  }

  getCart(): Observable<Cart[]> {
    return this.http.get(ApiConst.PATH_API_ROOT + ApiConst.PATH_CART).pipe(
      catchError((error) => {
        this.errorService.setUpErrorMessage(error);
        return of(null);
      }),
      map((carts) => carts as Cart[])
    );
  }

  getOrdered(): Observable<Ordered[]> {
    return this.http
      .get(ApiConst.PATH_API_ROOT + ApiConst.PATH_ORDEREDITEM)
      .pipe(
        catchError((error) => {
          this.errorService.setUpErrorMessage(error);
          return of(null);
        }),
        map((ordered) => ordered as Ordered[])
      );
  }
}
