import { tap } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../interface/item';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  item: Item | any;
  file: File | any;
  imgSrc: string | ArrayBuffer | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getCoffee();
  }

  getCoffee(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.accountService.getItem(id).subscribe((item) => (this.item = item));
  }

  imageChange(event: any) {
    if (event.target.files.length === 0) {
      this.file = null;
      this.imgSrc = '';
      return;
    }
    let reader = new FileReader();
    this.file = event.target.files[0];
    reader.onload = () => {
      this.imgSrc = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

  onClick() {
    if (
      this.item.coffee_name &&
      this.item.coffee_detail &&
      this.item.coffee_priceM &&
      this.item.coffee_priceL &&
      this.file
    ) {
      let editData = new FormData();
      editData.append('id', this.item.id);
      editData.append('coffee_name', this.item.coffee_name);
      editData.append('coffee_detail', this.item.coffee_detail);
      editData.append('coffee_priceM', this.item.coffee_priceM);
      editData.append('coffee_priceL', this.item.coffee_priceL);
      editData.append('img', this.file, this.file.name);

      this.accountService
        .editItem(editData)
        .pipe(tap(() => this.router.navigate(['/list'])))
        .subscribe();
    } else {
      alert('入力されていない項目があります');
    }
  }
}
