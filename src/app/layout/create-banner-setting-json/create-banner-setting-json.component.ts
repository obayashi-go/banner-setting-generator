import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  Banner
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

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public generateSettingFile(): void {
    this.isInitial = false;
    this.submitted = true;
    this.dispSettingStr = '';
    this.getLocalStorageItems();
  }

  public copySettingJson(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.openSnackBar('バナー設定をクリップボードにコピーしました。', 'OK')
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  private getLocalStorageItems(): void {
    for (let i = 0; i < 5; i++) {
      const storageItem = localStorage.getItem(`bannerPt${i + 1}`);
      if (storageItem) {
        this.bannerSettingByStorages.push(JSON.parse(storageItem));
      }
    }
    const prefix = `settings: [\n\t{\n\t\tenv: 'production' , banner: [`;
    const suffix = `\n\t\t]\n\t}\n],`;
    this.bannerSettingByStorages.forEach((bannerSetting, idx) => {
      this.dispSettingStr += `
        \t\t${this.convertKeyStrToProperty(JSON.stringify(bannerSetting))}`
    });
    this.dispSettingStr = `${prefix}${this.dispSettingStr}${suffix}`
  }

  private convertKeyStrToProperty(bannerSettingStr: string): string {
    return  bannerSettingStr
      .replace('"pattern"', '\n\t\t\t\tpattern')
      .replace('"beginDate"', '\n\t\t\t\tbeginDate')
      .replace('"beginTimeHour"', '\n\t\t\t\tbeginTimeHour')
      .replace('"beginTimeMin"', '\n\t\t\t\tbeginTimeMin')
      .replace('"endDate"', '\n\t\t\t\tendDate')
      .replace('"endTimeHour"', '\n\t\t\t\tendTimeHour')
      .replace('"endTimeMin"', '\n\t\t\t\tendTimeMin')
      .replace('"bannerList"', '\n\t\t\t\tbannerList')
      .replace(/"src"/g, '\n\t\t\t\t\t\tsrc')
      .replace(/"url"/g, '\n\t\t\t\t\t\turl')
      .replace('bannerList:[{', 'bannerList: [\n\t\t\t\t\t{')
      .replace(/"}/g, '"\n\t\t\t\t\t}')
      .replace(/},{/g, '},\n\t\t\t\t\t{')
      .replace(/}]}/g, '}\n\t\t\t\t]\n\t\t\t},');
  }
}
