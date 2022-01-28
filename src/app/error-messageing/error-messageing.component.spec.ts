import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ErrorMessagingService } from '../service/error-messaging.service';
import { ErrorMessageingComponent } from './error-messageing.component';

describe('ErrorMessageingComponent', () => {
  let component: ErrorMessageingComponent;
  let fixture: ComponentFixture<ErrorMessageingComponent>;
  let errorMessageingServiceSpy: {
    clearMessage: jasmine.Spy;
    getMessage: jasmine.Spy;
  };

  beforeEach(async () => {
    errorMessageingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', [
      'clearMessage',
      'getMessage',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ErrorMessageingComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ErrorMessagingService, useValue: errorMessageingServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.ngOnInit();
    expect(
      errorMessageingServiceSpy.clearMessage.calls.count()
    ).toBeGreaterThan(1);
  });

  // it('should error display message', () => {
  //   const errorMessage = '入力情報が正しくありません。';
  //   errorMessageingServiceSpy.getMessage.and.returnValue(errorMessage);

  //   fixture.detectChanges();

  //   const htmlElement: HTMLParagraphElement = fixture.debugElement.query(
  //     By.css('p')
  //   ).nativeElement;
  //   expect(htmlElement.innerText).toEqual(errorMessage);
  // });
});
