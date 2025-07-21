import { TestBed } from '@angular/core/testing';

import { SignalRService } from './signalr';

describe('Signalr', () => {
  let service: SignalRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
