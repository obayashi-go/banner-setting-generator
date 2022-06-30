import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBannerSettingJsonComponent } from './create-banner-setting-json.component';

const routes: Routes = [
  {
    path : '',
    component: CreateBannerSettingJsonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBannerSettingJsonRoutingModule { }
