import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RimListComponent } from './rim-list.component';

describe('RimListComponent', () => {
  let component: RimListComponent;
  let fixture: ComponentFixture<RimListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RimListComponent]
    });
    fixture = TestBed.createComponent(RimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
