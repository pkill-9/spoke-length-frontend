import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubDetailsComponent } from './hub-details.component';

describe('HubDetailsComponent', () => {
  let component: HubDetailsComponent;
  let fixture: ComponentFixture<HubDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HubDetailsComponent]
    });
    fixture = TestBed.createComponent(HubDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
