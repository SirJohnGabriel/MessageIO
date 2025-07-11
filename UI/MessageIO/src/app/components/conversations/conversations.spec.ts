import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conversations } from './conversations';

describe('Conversations', () => {
  let component: Conversations;
  let fixture: ComponentFixture<Conversations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conversations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conversations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
