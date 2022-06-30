import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBannerSettingJsonComponent } from './create-banner-setting-json.component';

describe('CreateBannerSettingJsonComponent', () => {
  let component: CreateBannerSettingJsonComponent;
  let fixture: ComponentFixture<CreateBannerSettingJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBannerSettingJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBannerSettingJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
