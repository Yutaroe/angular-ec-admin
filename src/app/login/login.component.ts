import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AccountService } from '../service/account.service';
import { RoutingService } from '../service/routing.service';
import { TitleService } from '../service/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [Validators.required]);

  loginUser = this.fb.group({
    email: this.email,
    password: this.password,
  });

  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private routingService: RoutingService,
    private titleService: TitleService
  ) {}

  ngAfterViewChecked() {
    this.titleService.setTitle('ログイン');
  }

  ngOnInit(): void {}

  showPass() {
    this.hide = !this.hide;
  }

  onSubmit() {
    this.accountService.login(this.loginUser.value).subscribe((user) => {
      if (user != null) {
        localStorage['user'] = user.user.id;
        this.routingService.navigate('list');
      }
    });
  }
}
