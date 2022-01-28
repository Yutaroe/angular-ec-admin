import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RoutingService } from './routing.service';

describe('RoutingService', () => {
  let service: RoutingService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(RoutingService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be navigated to sign in paage', () => {
    spyOn(router, 'navigate');
    service.navigate('login');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
