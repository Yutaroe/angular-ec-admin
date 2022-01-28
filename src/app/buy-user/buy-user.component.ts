import { mergeMap, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { Cart } from '../interface/cart';
import { Item } from '../interface/item';
import { Ordered } from '../interface/ordered';
import { Topping } from '../interface/topping';
import { AccountService } from '../service/account.service';
import { TitleService } from '../service/title.service';

@Component({
  selector: 'app-buy-user',
  templateUrl: './buy-user.component.html',
  styleUrls: ['./buy-user.component.css'],
})
export class BuyUserComponent implements OnInit {
  items: Item[] = [];
  toppings: Topping[] = [];
  carts: Cart[] = [];
  orderList: Ordered[] = [];
  searchedItem: Ordered[] = [];
  displayedColumns: string[] = [
    'carts',
    'coffee_name',
    'size',
    'number',
    'toppings',
    'name',
    'address',
    'tel',
    'status',
  ];

  id = new FormControl(null, []);
  name = new FormControl(null, []);
  date = new FormControl(null, []);

  searchStatus = this.fb.group({
    id: this.id,
    name: this.name,
    date: this.date,
  });

  constructor(
    private accountService: AccountService,
    private titleService: TitleService,
    private fb: FormBuilder
  ) {}

  ngAfterViewChecked() {
    this.titleService.setTitle('購入者情報');
  }
  ngOnInit(): void {
    this.getItem();
    this.getToppings();
    this.getCart();
  }

  getItem() {
    this.accountService.getItemList().subscribe((item) => {
      this.items = item;
    });
  }

  getToppings() {
    this.accountService.getTopping().subscribe((topping) => {
      this.toppings = topping;
    });
  }

  getCart() {
    this.accountService
      .getCart()
      .pipe(
        tap((cart) => {
          this.carts = cart.filter((cart) => cart.status !== 0);
        }),
        mergeMap(() => this.getOrdered())
      )
      .subscribe();
  }

  getOrdered() {
    return this.accountService.getOrdered().pipe(
      tap((orderList) =>
        orderList.forEach((order) => {
          this.carts.forEach((cart) => {
            if (order.carts === cart.id) {
              order.day = cart.order_date;
              order.name = cart.order_name;
              order.addressNumber = cart.addressnumber;
              order.address = cart.address;
              order.time = cart.order_time;
              order.status = cart.status;
              this.orderList.push(order);
              this.searchedItem.push(order);
            }
          });
        })
      )
    );
  }

  search() {
    if (this.id.value) {
      let searched = this.searchedItem.filter((item) => {
        return item.carts === Number(this.id.value);
      });
      this.searchedItem = searched;
    } else if (this.name.value) {
      let searched = this.searchedItem.filter((item) => {
        return item.name && item.name.indexOf(this.name.value) >= 0;
      });
      this.searchedItem = searched;
    } else if (this.date.value) {
      let searched = this.searchedItem.filter((item) => {
        return item.day && item.day.indexOf(this.date.value) >= 0;
      });
      this.searchedItem = searched;
    }
  }

  clear() {
    this.searchedItem = this.orderList;
  }
}
