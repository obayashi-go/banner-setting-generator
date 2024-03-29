import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// this component
import { CreateBannerSettingJsonRoutingModule } from './create-banner-setting-json-routing.module';
import { CreateBannerSettingJsonComponent } from './create-banner-setting-json.component';
// material modules
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";


@NgModule({
  imports: [
    CommonModule,
    CreateBannerSettingJsonRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  declarations: [
    CreateBannerSettingJsonComponent,
  ],
  providers: []
})
export class CreateBannerSettingJsonModule { }
