import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AccountService } from '../service/account.service';
import { ToppinglistComponent } from './toppinglist.component';

describe('ToppinglistComponent', () => {
  let component: ToppinglistComponent;
  let fixture: ComponentFixture<ToppinglistComponent>;
  let accountServiceSpy: {
    getTopping: jasmine.Spy;
  };
  let getToppingSpy: jasmine.Spy;

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getTopping']);
    getToppingSpy = accountServiceSpy.getTopping.and.returnValue(
      of(toppingList())
    );

    await TestBed.configureTestingModule({
      declarations: [ToppinglistComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AccountService, useValue: accountServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToppinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.ngOnInit();
    expect(accountServiceSpy.getTopping.calls.count()).toBeGreaterThan(1);
  });

  it('should return searched Toppings', () => {
    let expectedSearchedItem = searchedTopping();
    const searchButton = fixture.debugElement.query(
      By.css('.button')
    ).nativeElement;

    component.name.setValue('シナモン');
    searchButton.dispatchEvent(new Event('click'));
    expect(component.searchedItem).toEqual(expectedSearchedItem);
  });
});

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

const searchedTopping = () => {
  return [
    {
      id: 1,
      topping_name: 'シナモン',
      topping_priceM: 200,
      topping_priceL: 300,
    },
  ];
};
