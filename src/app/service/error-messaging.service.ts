import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessagingService {
  message: string = '';

  constructor() {}

  getMessage(): string {
    return this.message;
  }

  setMessage(message: string): void {
    this.message = message;
  }

  clearMessage(): void {
    this.message = '';
  }

  setUpErrorMessage(error: any) {
    switch (error.status) {
      case 400:
        this.setMessage('入力情報が正しくありません。');
        break;
      case 401:
        this.setMessage('権限がありません。');
        break;
      case 404:
        this.setMessage('ページがみつかりません。');
        break;
      default:
        this.setMessage('サーバとの通信に失敗しました。');
    }
  }
}
