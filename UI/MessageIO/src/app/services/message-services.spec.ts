import { TestBed } from '@angular/core/testing';

import { MessageServices } from './message-services';

describe('MessageServices', () => {
  let service: MessageServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
