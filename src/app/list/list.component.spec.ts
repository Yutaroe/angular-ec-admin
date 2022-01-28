import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountService } from '../service/account.service';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let accountServiceSpy: {
    getItemList: jasmine.Spy;
  };
  let getItemListSpy: jasmine.Spy;
  let router: Router;

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getItemList']);
    getItemListSpy = accountServiceSpy.getItemList.and.returnValue(
      of(itemList())
    );
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AccountService, useValue: accountServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should init', () => {
    component.ngOnInit();
    expect(accountServiceSpy.getItemList.calls.count()).toBeGreaterThan(1);
  });

  it('should return searched items', () => {
    let expectedSearchedItem = searchedItem();
    const searchButton = fixture.debugElement.query(
      By.css('.button')
    ).nativeElement;

    component.name.setValue('チョコレート');
    searchButton.dispatchEvent(new Event('click'));
    expect(component.searchedItem).toEqual(expectedSearchedItem);
  });

  it('should alert with ご希望の商品名を入力してください', () => {
    spyOn(window, 'alert');
    component.serch();
    expect(window.alert).toHaveBeenCalledWith(
      'ご希望の商品名を入力してください'
    );
  });
});

const itemList = () => {
  return [
    {
      id: 1,
      coffee_name: 'チョコレートクッキー',
      coffee_detail: 'チョコレートクッキーです',
      coffee_priceM: 100,
      coffee_priceL: 300,
      img: 'image',
    },
    {
      id: 2,
      coffee_name: 'コーヒー',
      coffee_detail: 'コーヒーです',
      coffee_priceM: 150,
      coffee_priceL: 400,
      img: 'image2',
    },
  ];
};

const searchedItem = () => {
  return [
    {
      id: 1,
      coffee_name: 'チョコレートクッキー',
      coffee_detail: 'チョコレートクッキーです',
      coffee_priceM: 100,
      coffee_priceL: 300,
      img: 'image',
    },
  ];
};
