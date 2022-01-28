import { tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '../service/account.service';
import { TitleService } from '../service/title.service';

@Component({
  selector: 'app-add-topping',
  templateUrl: './add-topping.component.html',
  styleUrls: ['./add-topping.component.css'],
})
export class AddToppingComponent implements OnInit {
  topping_name = new FormControl('', [Validators.required]);

  newTopping = this.fb.group({
    topping_name: this.topping_name,
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private titleService: TitleService,
    private router: Router
  ) {}

  ngAfterViewChecked() {
    this.titleService.setTitle('トッピング追加');
  }
  ngOnInit(): void {}

  onClick() {
    let newTopping = {
      topping_name: this.topping_name.value,
      topping_priceM: 200,
      topping_priceL: 300,
    };
    this.accountService.addTopping(newTopping).pipe(
      tap(() => this.router.navigate(['/toppinglist']))
    ).subscribe();
  }
}
