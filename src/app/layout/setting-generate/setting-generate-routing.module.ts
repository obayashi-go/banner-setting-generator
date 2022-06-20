import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingGenerateComponent } from './setting-generate.component';

const routes: Routes = [
  {
    path : '',
    component: SettingGenerateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingGenerateRoutingModule { }
