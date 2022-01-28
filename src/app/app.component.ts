import { Component } from '@angular/core';

import { RoutingService } from './service/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ec-angular-admin';

  constructor(private routingService: RoutingService) {}

  public isSignInPage(): boolean {
    if ('/' === this.routingService.router.url) {
      return true;
    }
    if ('/login' === this.routingService.router.url) {
      return true;
    }
    return false;
  }
}
