import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidocontraPage } from './olvidocontra.page';

describe('OlvidocontraPage', () => {
  let component: OlvidocontraPage;
  let fixture: ComponentFixture<OlvidocontraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlvidocontraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidocontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
