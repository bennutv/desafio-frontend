import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadscrollComponent } from './loadscroll.component';

describe('LoadscrollComponent', () => {
  let component: LoadscrollComponent;
  let fixture: ComponentFixture<LoadscrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadscrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadscrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
