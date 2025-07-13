import { TestBed } from '@angular/core/testing';

import { conversationsService } from './conversationsService';

describe('conversationsService', () => {
  let service: conversationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(conversationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
