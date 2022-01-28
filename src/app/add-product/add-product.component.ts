import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '../service/account.service';
import { TitleService } from '../service/title.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  coffee_name = new FormControl('', [Validators.required]);
  coffee_detail = new FormControl('', [Validators.required]);
  coffee_priceM = new FormControl(null, [Validators.required]);
  coffee_priceL = new FormControl(null, [Validators.required]);

  newItem = this.fb.group({
    coffee_name: this.coffee_name,
    coffee_detail: this.coffee_detail,
    coffee_priceM: this.coffee_priceM,
    coffee_priceL: this.coffee_priceL,
  });

  file: File | any;
  imgSrc: string | ArrayBuffer | null = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private titleService: TitleService,
    private router: Router
  ) {}

  ngAfterViewChecked() {
    this.titleService.setTitle('商品追加');
  }
  ngOnInit(): void {}

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
    if (this.file) {
      let addItem = new FormData();
      addItem.append('coffee_name', this.coffee_name.value);
      addItem.append('coffee_detail', this.coffee_detail.value);
      addItem.append('coffee_priceL', this.coffee_priceL.value);
      addItem.append('coffee_priceM', this.coffee_priceM.value);
      addItem.append('img', this.file, this.file.name);

      this.accountService.addItem(addItem).subscribe();
      this.router.navigate(['/list']);
    } else {
      alert('写真を選択してください');
    }
  }
}
