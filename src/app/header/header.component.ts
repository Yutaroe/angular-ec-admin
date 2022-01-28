import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    let confirm = window.confirm('ログアウトしますか');
    if (confirm) {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }
}
