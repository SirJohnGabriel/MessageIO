import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationTable } from './conversation-table';

describe('ConversationTable', () => {
  let component: ConversationTable;
  let fixture: ComponentFixture<ConversationTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
