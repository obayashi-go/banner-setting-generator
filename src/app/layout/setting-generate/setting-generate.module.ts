import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// this component
import { SettingGenerateRoutingModule } from './setting-generate-routing.module';
import { SettingGenerateComponent } from './setting-generate.component';
// material modules
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatTabsModule } from "@angular/material/tabs";
// optional components
import { SectionTitleComponent } from '../../component/section-title/section-title.component'
import { BannerSetting1Component1 } from '../../component/banner-setting-1/banner-setting-1.component';
import { BannerSetting2Component2 } from '../../component/banner-setting-2/banner-setting-2.component';
import { BannerSetting3Component3 } from "../../component/banner-setting-3/banner-setting-3.component";
import { BannerSetting4Component4 } from "../../component/banner-setting-4/banner-setting-4.component";
import { BannerSetting5Component5 } from "../../component/banner-setting-5/banner-setting-5.component";

@NgModule({
  imports: [
    CommonModule,
    SettingGenerateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatTabsModule,
  ],
  declarations: [
    SettingGenerateComponent,
    SectionTitleComponent,
    BannerSetting1Component1,
    BannerSetting2Component2,
    BannerSetting3Component3,
    BannerSetting4Component4,
    BannerSetting5Component5,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'}
  ]
})
export class SettingGenerateModule { }
