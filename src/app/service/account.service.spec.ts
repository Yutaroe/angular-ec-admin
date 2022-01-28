import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiConst } from '../constants/api-const';
import { Item } from '../interface/item';
import { AccountService } from './account.service';
import { ErrorMessagingService } from './error-messaging.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;
  let errorMessageingServiceSpy: {
    setupErrorMessage: jasmine.Spy;
  };

  beforeEach(() => {
    errorMessageingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', [
      'setupErrorMessage',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ErrorMessagingService, useValue: errorMessageingServiceSpy },
      ],
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_LOGIN;
    it('should return expected response', () => {
      const loginUser = {
        email: 'test@gmail.com',
        password: 'password',
      };

      const expectedReturnUSer = {
        token: 'aaa',
        user: {
          id: 1,
          email: 'test@gmail.com',
        },
      };

      service.login(loginUser).subscribe((user) => {
        expect(user).toEqual(expectedReturnUSer);
        expect(errorMessageingServiceSpy.setupErrorMessage.calls.count()).toBe(
          0
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(expectedReturnUSer);
    });
  });

  describe('getItemList', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_LIST;

    it('should return expected items', () => {
      const expectedItemList: Item[] = itemList();
      service.getItemList().subscribe((itemList) => {
        expect(itemList).toEqual(expectedItemList);
      });

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedItemList);
    });

    it('should return expected item list', () => {
      const expectedItem = item();
      service.getItem(1).subscribe((item) => {
        expect(item).toBe(expectedItem);
      });
      const req = httpTestingController.expectOne(webApiUrl + '1/');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedItem);
    });

    it('should return expected addItem', () => {
      const expectedAddItem = addItemDetail();
      service.addItem(expectedAddItem).subscribe((item) => {
        expect(item).toBe(expectedAddItem);
      });
      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(expectedAddItem);
    });

    it('should retrun expected edit item', () => {
      const expectedItem = editItem();
      service.editItem(expectedItem).subscribe((item) => {
        expect(item).toBe(expectedItem);
      });
      const req = httpTestingController.expectOne(webApiUrl + '1/');
      expect(req.request.method).toEqual('PUT');
      req.flush(expectedItem);
    });
  });

  describe('topping', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_TOPPING;
    it('should return expected topping', () => {
      const expectedItem = toppingList();
      service.getTopping().subscribe((item) => {
        expect(item).toBe(expectedItem);
      });

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedItem);
    });

    it('should return expected addTopping', () => {
      const expectedItem = newTopping();
      service.addTopping(expectedItem).subscribe((item) => {
        expect(item).toBe(expectedItem);
      });

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(expectedItem);
    });

    it('should return expected deleteTopping', () => {
      const expectedItem = toppingList();
      service.deleteTopping(1).subscribe((item) => {
        expect(item).toBe(expectedItem);
      });

      const req = httpTestingController.expectOne(webApiUrl + '1/');
      expect(req.request.method).toEqual('DELETE');
      req.flush(expectedItem);
    });
  });
});

const itemList = () => {
  return [
    {
      id: 1,
      coffee_name: 'チョコレートクッキー',
      coffee_detail: 'チョコレートクッキーです',
      coffee_priceM: 100,
      coffee_priceL: 300,
      img: 'image',
    },
    {
      id: 2,
      coffee_name: 'コーヒー',
      coffee_detail: 'コーヒーです',
      coffee_priceM: 150,
      coffee_priceL: 400,
      img: 'image2',
    },
  ];
};

const item = () => {
  return {
    id: 1,
    coffee_name: 'チョコレートクッキー',
    coffee_detail: 'チョコレートクッキーです',
    coffee_priceM: 100,
    coffee_priceL: 300,
    img: 'image',
  };
};

const addItemDetail = () => {
  let formData = new FormData();
  formData.append('id', '3');
  formData.append('coffee_name', 'カフェラテ');
  formData.append('coffee_detail', 'カフェラテです');
  formData.append('img', 'image');
  formData.append('coffee_priceM', '400');
  formData.append('coffee_priceL', '699');

  return formData;
};

const editItem = () => {
  let formData = new FormData();
  formData.append('id', '1');
  formData.append('coffee_name', 'サンドウィッチ');
  formData.append('coffee_detail', 'サンドウィッチです');
  formData.append('img', 'image');
  formData.append('coffee_priceM', '400');
  formData.append('coffee_priceL', '699');

  return formData;
};

const toppingList = () => {
  return [
    {
      id: 1,
      topping_name: 'シナモン',
      topping_priceM: 200,
      topping_priceL: 300,
    },
  ];
};

const newTopping = () => {
  return {
    topping_name: 'シナモン',
  };
};
