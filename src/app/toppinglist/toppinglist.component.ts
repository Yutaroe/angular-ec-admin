import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Topping } from '../interface/topping';
import { AccountService } from '../service/account.service';
import { TitleService } from '../service/title.service';

@Component({
  selector: 'app-toppinglist',
  templateUrl: './toppinglist.component.html',
  styleUrls: ['./toppinglist.component.css'],
})
export class ToppinglistComponent implements OnInit {
  toppings: Topping[] = [];
  searchedItem: Topping[] = [];
  name = new FormControl('', []);
  displayedColumns: string[] = ['id', 'topping_name', 'delete'];

  constructor(
    private accountService: AccountService,
    private titleService: TitleService
  ) {}

  ngAfterViewChecked() {
    this.titleService.setTitle('トッピングリスト');
  }

  ngOnInit(): void {
    this.accountService.getTopping().subscribe((toppings) => {
      this.toppings = toppings;
      this.searchedItem = toppings;
    });
  }

  onClick(id: number) {
    let confirm = window.confirm('削除してもよろしいでしょうか');
    if (confirm) {
      this.toppings = this.toppings.filter((toppings) => toppings.id !== id);
      this.searchedItem = this.searchedItem.filter(
        (toppings) => toppings.id !== id
      );
      this.accountService.deleteTopping(id).subscribe();
    }
  }

  serch() {
    if (this.name.value === '') {
      alert('トッピング名を入力してください');
      this.searchedItem = this.toppings;
    } else {
      let topping = this.toppings.filter((topping) => {
        return topping.topping_name.indexOf(this.name.value) >= 0;
      });
      if (topping.length === 0) {
        alert('該当するトッピングがありません');
        this.searchedItem = this.toppings;
      } else {
        this.searchedItem = topping;
      }
    }
  }
}
