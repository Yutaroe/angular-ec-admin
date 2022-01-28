import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(public router: Router) {}

  public navigate(path: string) {
    this.router.navigate(['/' + path]);
  }
}
