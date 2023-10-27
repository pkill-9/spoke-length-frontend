import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubListComponent } from './hub-list.component';

describe('HubListComponent', () => {
  let component: HubListComponent;
  let fixture: ComponentFixture<HubListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HubListComponent]
    });
    fixture = TestBed.createComponent(HubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
