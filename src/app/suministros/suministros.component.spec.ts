import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuministrosComponent } from './suministros.component';

describe('SuministrosComponent', () => {
  let component: SuministrosComponent;
  let fixture: ComponentFixture<SuministrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuministrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuministrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
