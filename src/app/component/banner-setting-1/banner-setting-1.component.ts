import {Component, OnInit} from '@angular/core';
import {
  AspectRatio,
  Banner,
  BannerSizeByPatternMap,
  bannerSizeByPatternMapList,
  ImgSrcObj,
  Pattern
} from "../../interface/types";
import {AspectRatioUtil, calcGcd} from '../../util/calcAspectRatio';
import { HourList, getMinList } from "../../constants/constants";
import {DateFormat} from "../../util/date-format";

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-banner-setting-1',
  templateUrl: './banner-setting-1.component.html',
  styleUrls: ['./banner-setting-1.component.scss']
})
export class BannerSetting1Component1 implements OnInit {

  public fg1: FormGroup;
  public isNotUse: boolean = false;
  // @ts-ignore
  public file: File = null;
  public uploadImgWidth: number = 0;
  public uploadImgHeight: number = 0;
  public aspectRatio: string = '';
  public imgErrorMessageList: string[] = [];
  public isImgUploaded: boolean = false;
  public hourList: number[] = HourList;
  public minValueList: number[] = getMinList();

  constructor(private formBuilder: FormBuilder) {
    this.fg1 = this.formBuilder.group({
      useThisPattern: [true, Validators.compose([Validators.required])],
      beginDate: [''],
      endDate: [''],
      beginHour: [null],
      beginMin: [null],
      endHour: [null],
      endMin: [null],
      imgSrcList: [''],
      imgTransitionDestinationList: [''],
      dropImage1: ['']
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('bannerPt1');
  }

  public checkUsePattern(): void {
    this.isNotUse = !this.fg1.get('useThisPattern')?.value;
    this.fg1.get('beginDate')?.setValue('');
    this.fg1.get('endDate')?.setValue('');
    this.fg1.get('imgSrcList')?.setValue('');
    this.fg1.get('imgTransitionDestinationList')?.setValue('');
    this.fg1.get('dropImage1')?.setValue('');
    this.uploadImgWidth = 0;
    this.uploadImgHeight = 0;
    this.isImgUploaded = false;
    this.aspectRatio = '';
    this.imgErrorMessageList = [];
  }

  /**
   * @description file selected event
   *
   * @param event
   */
  public onFileSelect(event: any): any {
    if (event.target.files.length === 0) {
      return;
    }
    //ファイルの情報をfileとimgSrcに保存
    this.file = event.target.files[0];
    // フォームへファイル名をセット
    this.fg1.get('imgSrcList')?.setValue(this.file.name);
    // 画像サイズを取得
    const img = document.createElement('img');
    img.src = URL.createObjectURL(event.target.files[0]);
    img.onload = () => {
      this.isImgUploaded = true;
      this.uploadImgWidth = img.width;
      this.uploadImgHeight = img.height;
      this.checkUploadImgContent();
    }
  }

  private checkUploadImgContent(): void {
    this.imgErrorMessageList.length = 0;
    const targetBannerPattern: BannerSizeByPatternMap | undefined
      = bannerSizeByPatternMapList.find(bannerSizeByPattern => bannerSizeByPattern.pt === Pattern.pt1);
    if (!targetBannerPattern) {
      this.imgErrorMessageList.push('検証に失敗しました。');
      return;
    }
    this.calcAspectRatio(targetBannerPattern);
    this.checkImgSize(targetBannerPattern);
  }

  private calcAspectRatio(targetBannerPattern: BannerSizeByPatternMap): void {
    const g = calcGcd.gcd(this.uploadImgWidth, this.uploadImgHeight);
    const x = this.uploadImgWidth / g;
    const y = this.uploadImgHeight / g;
    this.aspectRatio = `${x} : ${y}`;
    const aspectRatio: AspectRatio = {
      x, y,
      passX: false, passY: false
    };
    AspectRatioUtil.checkAspectRatio(aspectRatio, Pattern.pt1);
    if (!aspectRatio.passX || !aspectRatio.passY) {
      this.imgErrorMessageList.push(`アスペクト比が不適切です。
      ${targetBannerPattern?.aspectRatioX}：${targetBannerPattern?.aspectRatioY}で指定してください。`)
    }
  }

  private checkImgSize(targetBannerPattern: BannerSizeByPatternMap): void {
    if (this.uploadImgWidth < targetBannerPattern.minWidth) {
      this.imgErrorMessageList.push(`パターン1で使用する画像の幅は、最低${targetBannerPattern.minWidth}pxの画像を推奨します。`)
    }
    if (this.uploadImgHeight < targetBannerPattern.minHeight) {
      this.imgErrorMessageList.push(`パターン1で使用する画像の高さは、最低${targetBannerPattern.minHeight}pxの画像を推奨します。`)
    }
  }

  public saveThisBannerSetting() {
    const beginDate = DateFormat.dateFormat(this.fg1.get('beginDate')?.value);
    const beginHour = this.fg1.get('beginHour')?.value;
    const beginMin = this.fg1.get('beginMin')?.value;
    const endDate = DateFormat.dateFormat(this.fg1.get('endDate')?.value);
    const endHour = this.fg1.get('endHour')?.value;
    const endMin = this.fg1.get('endMin')?.value;
    const imgSrc = this.fg1.get('imgSrcList')?.value;
    const imgTransitionDestinationList = this.fg1.get('imgTransitionDestinationList')?.value;
    const imgSrcObj: ImgSrcObj = {
      src: imgSrc,
      url: imgTransitionDestinationList
    };
    const imgSrcList: ImgSrcObj[] = [];
    imgSrcList.push(imgSrcObj);
    const banner: Banner = {
      pattern: Pattern.pt1,
      beginDate: beginDate,
      beginTimeHour: beginHour || 0,
      beginTimeMin: beginMin || 0,
      endDate: endDate,
      endTimeHour: endHour || 23,
      endTimeMin: endMin || 59,
      bannerList: imgSrcList
    }
    localStorage.setItem('bannerPt1', JSON.stringify(banner));
  }
}
