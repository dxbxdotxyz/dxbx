import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolsComponent } from './pools.component';

describe('PoolsComponent', () => {
  let component: PoolsComponent;
  let fixture: ComponentFixture<PoolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoolsComponent]
    });
    fixture = TestBed.createComponent(PoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
