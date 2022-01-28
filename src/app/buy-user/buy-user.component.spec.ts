import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountService } from '../service/account.service';
import { BuyUserComponent } from './buy-user.component';

describe('BuyUserComponent', () => {
  let component: BuyUserComponent;
  let fixture: ComponentFixture<BuyUserComponent>;
  let accountServiceSpy: {
    getItemList: jasmine.Spy;
    getTopping: jasmine.Spy;
    getCart: jasmine.Spy;
    getOrdered: jasmine.Spy;
  };
  let getItemListSpy: jasmine.Spy;
  let getToppingSpy: jasmine.Spy;
  let getCartSpy: jasmine.Spy;

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', [
      'getItemList',
      'getTopping',
      'getCart',
      'getOrdered',
    ]);
    getItemListSpy = accountServiceSpy.getItemList.and.returnValue(
      of(itemList())
    );
    getToppingSpy = accountServiceSpy.getTopping.and.returnValue(
      of(toppingList())
    );
    getCartSpy = accountServiceSpy.getCart.and.returnValue(of(cartList()));

    await TestBed.configureTestingModule({
      declarations: [BuyUserComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AccountService, useValue: accountServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getItem', () => {
    component.ngOnInit();
    expect(accountServiceSpy.getItemList.calls.count()).toBeGreaterThan(1);
    expect(accountServiceSpy.getTopping.calls.count()).toBeGreaterThan(1);
    expect(accountServiceSpy.getCart.calls.count()).toBeGreaterThan(1);
  });

  it('should get OrderedList', () => {
    let orderedItem = orderList();

    accountServiceSpy.getOrdered.and.returnValue(of(orderedItem));
    component.getCart();
    expect(accountServiceSpy.getOrdered.calls.count()).toEqual(2);
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

const toppingList = () => {
  return [
    {
      id: 1,
      topping_name: 'シナモン',
      topping_priceM: 200,
      topping_priceL: 300,
    },
    {
      id: 2,
      topping_name: 'ハチミツ',
      topping_priceM: 200,
      topping_priceL: 300,
    },
  ];
};

const cartList = () => {
  return [
    {
      id: 1,
      userCart: 1,
      order_name: 'test',
      addressnumber: 'testnumber',
      address: 'testaddress',
      email: 'test@gmail.com',
      order_date: 'date',
      order_time: 11,
      tel: '00000000000',
      status: 1,
    },
  ];
};

const orderList = () => {
  return [
    {
      id: 1,
      item_number: 2,
      coffee_id: 1,
      item_size: 'L',
      toppings: [3, 4],
      carts: 1,
    },
  ];
};
