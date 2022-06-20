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
// optional components
import { SectionTitleComponent } from '../../component/section-title/section-title.component'
import { BannerSetting1Component1 } from '../../component/banner-setting-1/banner-setting-1.component';
import { BannerSetting2Component2 } from '../../component/banner-setting-2/banner-setting-2.component';

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
  ],
  declarations: [
    SettingGenerateComponent,
    SectionTitleComponent,
    BannerSetting1Component1,
    BannerSetting2Component2,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'}
  ]
})
export class SettingGenerateModule { }
