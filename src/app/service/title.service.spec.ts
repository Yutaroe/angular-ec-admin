import { TestBed } from '@angular/core/testing';

import { TitleService } from './title.service';

describe('TitleService', () => {
  let service: TitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set title', () => {
    const title = 'title';
    service.setTitle(title);
    expect(service.title.getTitle()).toEqual(title);
  });
});
