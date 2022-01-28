import { TestBed } from '@angular/core/testing';

import { ErrorMessagingService } from './error-messaging.service';

describe('ErrorMessagingService', () => {
  let service: ErrorMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected response', () => {
    const expectedValue = 'massage';
    service.setMessage(expectedValue);
    expect(service.getMessage()).toEqual(expectedValue);
  });

  it('should clear property', () => {
    const expectedValue = 'message';
    service.setMessage(expectedValue);
    expect(service.getMessage()).toEqual(expectedValue);
    service.clearMessage();
    expect(service.getMessage()).toEqual('');
  });
});
