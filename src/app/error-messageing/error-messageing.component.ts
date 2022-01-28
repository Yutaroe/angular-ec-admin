import { Component, OnInit } from '@angular/core';

import { ErrorMessagingService } from '../service/error-messaging.service';

@Component({
  selector: 'app-error-messageing',
  templateUrl: './error-messageing.component.html',
  styleUrls: ['./error-messageing.component.css'],
})
export class ErrorMessageingComponent implements OnInit {
  constructor(public errorService: ErrorMessagingService) {}

  ngOnInit(): void {
    this.errorService.clearMessage();
  }
}
