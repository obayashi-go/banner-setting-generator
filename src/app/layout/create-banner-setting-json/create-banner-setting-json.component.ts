import { Component, OnInit } from '@angular/core';

import {
  Banner,
  ImgSrcObj,
  Pattern
} from "../../interface/types";

@Component({
  selector: 'app-create-banner-setting-json',
  templateUrl: './create-banner-setting-json.component.html',
  styleUrls: ['./create-banner-setting-json.component.scss']
})
export class CreateBannerSettingJsonComponent implements OnInit {

  public isInitial = true;
  public submitted = false;
  public bannerSettingByStorages: Banner[] = []

  constructor() { }

  ngOnInit(): void {
  }

  public generateSettingFile(): void {
    this.isInitial = false;
    this.submitted = true;
    this.getLocalStorageItems();
    console.log("[[[[]]]]>>>", this.bannerSettingByStorages)
  }

  private getLocalStorageItems(): void {
    for (let i = 0; i < 5; i++) {
      const storageItem = localStorage.getItem(`bannerPt${i + 1}`);
      console.log(storageItem);
      if (storageItem) {
        // this.bannerSettingByStorages.push(JSON.parse(storageItem));
        this.bannerSettingByStorages.push(JSON.parse(storageItem));
      }
    }
  }

}
