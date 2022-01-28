import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

import { Item } from '../interface/item';
import { AccountService } from '../service/account.service';
import { TitleService } from '../service/title.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  item: Item[] = [];
  searchedItem: Item[] = [];
  name = new FormControl('', []);
  displayedColumns: string[] = [
    'id',
    'coffee_name',
    'image',
    'detail',
    'coffee_priceM',
    'coffee_priceL',
  ];

  // @ViewChild(MatPaginator)
  // public paginator: MatPaginator | any;

  constructor(
    private titleService: TitleService,
    private accountService: AccountService
  ) {}

  ngAfterViewChecked() {
    this.titleService.setTitle('商品一覧');
  }

  ngOnInit(): void {
    this.getItemlist();
  }

  getItemlist() {
    this.accountService.getItemList().subscribe((item) => {
      this.item = item;
      this.searchedItem = item;
    });
  }

  serch() {
    if (this.name.value === '') {
      alert('ご希望の商品名を入力してください');
      this.searchedItem = this.item;
    } else {
      let coffee = this.item.filter((coffee) => {
        return coffee.coffee_name.indexOf(this.name.value) >= 0;
      });
      if (coffee.length === 0) {
        alert('該当する商品がありません');
        this.searchedItem = this.item;
      } else {
        this.searchedItem = coffee;
      }
    }
  }
}
