import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'setting-generate'
      },
      {
        path: 'setting-generate',
        loadChildren: () => import('./setting-generate/setting-generate.module').then(m => m.SettingGenerateModule)
      },
      {
        path: 'create-json',
        loadChildren: () => import('./create-banner-setting-json/create-banner-setting-json.module').then(m => m.CreateBannerSettingJsonModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
