import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountService } from '../service/account.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let accountServiceSpy: {
    login: jasmine.Spy;
  };
  let router: Router;

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['login']);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AccountService, useValue: accountServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    let loginUser = {
      token: 'user',
      user: { id: 1, email: 'test@gmail.com' },
    };

    accountServiceSpy.login.and.returnValue(of(loginUser));
    spyOn(router, 'navigate');

    component.onSubmit();
    expect(accountServiceSpy.login.calls.count()).toEqual(1);
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });
});
