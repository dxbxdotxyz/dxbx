import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WormholeComponent } from './wormhole.component';

describe('WormholeComponent', () => {
  let component: WormholeComponent;
  let fixture: ComponentFixture<WormholeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WormholeComponent]
    });
    fixture = TestBed.createComponent(WormholeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
