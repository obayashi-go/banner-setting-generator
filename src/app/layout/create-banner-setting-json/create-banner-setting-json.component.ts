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
  public bannerSettingByStorages: Banner[] = [];
  public dispSettingStr = '';

  constructor() { }

  ngOnInit(): void {
  }

  public generateSettingFile(): void {
    this.isInitial = false;
    this.submitted = true;
    this.dispSettingStr = '';
    this.getLocalStorageItems();
    console.log("[[[[]]]]>>>", this.bannerSettingByStorages)
  }

  private getLocalStorageItems(): void {
    for (let i = 0; i < 5; i++) {
      const storageItem = localStorage.getItem(`bannerPt${i + 1}`);
      console.log(`bannerPt${i + 1}: storageItem`);
      if (storageItem) {
        console.log(storageItem)
        this.bannerSettingByStorages.push(JSON.parse(storageItem));
      }
    }
    const prefix = `settings: [\n\t{\n\t\tenv: 'production' , banner: [`;
    const suffix = `\n\t\t]\t\n}\n],`;
    this.bannerSettingByStorages.forEach((bannerSetting, idx) => {
      // this.convertKeyStrToProperty(bannerSetting);
      this.dispSettingStr += `
        \t${this.convertKeyStrToProperty(JSON.stringify(bannerSetting))}
      `
    });
    this.dispSettingStr = `${prefix}\t\t${this.dispSettingStr}${suffix}`
  }

  private convertKeyStrToProperty(bannerSettingStr: string): string {
    return  bannerSettingStr
      .replace('"pattern"', '\t\tpattern')
      .replace('"beginDate"', '\t\t\tbeginDate')
      .replace('"beginTimeHour"', '\t\t\tbeginTimeHour')
      .replace('"beginTimeMin"', '\t\t\tbeginTimeMin')
      .replace('"endDate"', '\t\t\tendDate')
      .replace('"endTimeHour"', '\t\t\tendTimeHour')
      .replace('"endTimeMin"', '\t\t\tendTimeMin')
      .replace('"bannerList"', '\t\t\tbannerList')
      .replace(/"src"/g, '\n\t\t\t\tsrc')
      .replace(/"url"/g, '\t\t\t\turl')
      .replace(/,/g, ',\n')
      .replace(/}/g, '\n}\n')
      .replace(/{\t\tpattern/g, '{\n\t\t\tpattern')
      .replace('[', '[\n')
      .replace(/      /g, '')
      .replace(/\n]\n}\n/g, ']},')
      .replace(/}]},/g, '}\n]\n},')
      .replace(/}\n,/g, '},')
      .replace(/{src/g, '{\nsrc');
  }
}
