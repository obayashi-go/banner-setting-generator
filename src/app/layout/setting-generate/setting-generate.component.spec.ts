import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingGenerateComponent } from './setting-generate.component';

describe('SettingGenerateComponent', () => {
  let component: SettingGenerateComponent;
  let fixture: ComponentFixture<SettingGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
