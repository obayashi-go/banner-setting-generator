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
  selector: 'app-banner-setting-2',
  templateUrl: './banner-setting-2.component.html',
  styleUrls: ['./banner-setting-2.component.scss']
})
export class BannerSetting2Component2 implements OnInit {

  public fg2: FormGroup;
  public isNotUse: boolean = false;
  // @ts-ignore
  public file1: File = null;
  public uploadImgWidth1: number = 0;
  public uploadImgHeight1: number = 0;
  public aspectRatio1: string = '';
  // @ts-ignore
  public file2: File = null;
  public uploadImgWidth2: number = 0;
  public uploadImgHeight2: number = 0;
  public aspectRatio2: string = '';
  public imgErrorMessageList1: string[] = [];
  public imgErrorMessageList2: string[] = [];
  public isImgUploaded1: boolean = false;
  public isImgUploaded2: boolean = false;
  public hourList: number[] = HourList;
  public minValueList: number[] = getMinList();

  constructor(private formBuilder: FormBuilder) {
    this.fg2 = this.formBuilder.group({
      useThisPattern: [true, Validators.compose([Validators.required])],
      beginDate: [''],
      endDate: [''],
      beginHour: [null],
      beginMin: [null],
      endHour: [null],
      endMin: [null],
      imgSrc1: [''],
      imgTransitionDestination1: [''],
      dropImage1: [''],
      imgSrc2: [''],
      imgTransitionDestination2: [''],
      dropImage2: ['']
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('bannerPt2');
  }

  public checkUsePattern(): void {
    this.isNotUse = !this.fg2.get('useThisPattern')?.value;
    this.fg2.get('beginDate')?.setValue('');
    this.fg2.get('endDate')?.setValue('');
    this.fg2.get('imgSrc1')?.setValue('');
    this.fg2.get('imgTransitionDestination1')?.setValue('');
    this.fg2.get('dropImage1')?.setValue('');
    this.uploadImgWidth1 = 0;
    this.uploadImgHeight1 = 0;
    this.isImgUploaded1 = false;
    this.aspectRatio1 = '';
    this.imgErrorMessageList1 = [];
    this.fg2.get('imgSrc2')?.setValue('');
    this.fg2.get('imgTransitionDestination2')?.setValue('');
    this.fg2.get('dropImage2')?.setValue('');
    this.uploadImgWidth2 = 0;
    this.uploadImgHeight2 = 0;
    this.isImgUploaded2 = false;
    this.aspectRatio2 = '';
    this.imgErrorMessageList2 = [];
  }

  /**
   * @description file selected event
   *
   * @param event
   */
  public onFileSelect(event: any, imgNo: number): any {
    if (event.target.files.length === 0) {
      return;
    }
    if (imgNo === 1) {
      //ファイルの情報をfileとimgSrc1に保存
      this.file1 = event.target.files[0];
      // フォームへファイル名をセット
      this.fg2.get('imgSrc1')?.setValue(this.file1.name);
      // 画像サイズを取得
      const img = document.createElement('img');
      img.src = URL.createObjectURL(event.target.files[0]);
      img.onload = () => {
        this.isImgUploaded1 = true;
        this.uploadImgWidth1 = img.width;
        this.uploadImgHeight1 = img.height;
        this.checkUploadImgContent(imgNo);
      }
    } else if (imgNo === 2) {
      //ファイルの情報をfileとimgSrc2に保存
      this.file2 = event.target.files[0];
      // フォームへファイル名をセット
      this.fg2.get('imgSrc2')?.setValue(this.file2.name);
      // 画像サイズを取得
      const img2 = document.createElement('img');
      img2.src = URL.createObjectURL(event.target.files[0]);
      img2.onload = () => {
        this.isImgUploaded2 = true;
        this.uploadImgWidth2 = img2.width;
        this.uploadImgHeight2 = img2.height;
        this.checkUploadImgContent(imgNo);
      }
    }
  }

  private checkUploadImgContent(imgNo: number): void {
    this.imgErrorMessageList1.length = 0;
    this.imgErrorMessageList2.length = 0;
    const targetBannerPattern: BannerSizeByPatternMap | undefined
      = bannerSizeByPatternMapList.find(bannerSizeByPattern => bannerSizeByPattern.pt === Pattern.pt1);
    if (!targetBannerPattern) {
      switch (imgNo) {
        case 1:
          this.imgErrorMessageList1.push('検証に失敗しました。');
          return;
        case 2:
          this.imgErrorMessageList2.push('検証に失敗しました。');
          return;
        default:
          return;
      }
    }
    this.calcAspectRatio(targetBannerPattern, imgNo);
    this.checkImgSize(targetBannerPattern, imgNo);
  }

  private calcAspectRatio(targetBannerPattern: BannerSizeByPatternMap, imgNo: number): void {
    if (imgNo === 1) {
      const g = calcGcd.gcd(this.uploadImgWidth1, this.uploadImgHeight1);
      const x = this.uploadImgWidth1 / g;
      const y = this.uploadImgHeight1 / g;
      this.aspectRatio1 = `${x} : ${y}`;
      const aspectRatio: AspectRatio = {
        x, y,
        passX: false, passY: false
      };
      AspectRatioUtil.checkAspectRatio(aspectRatio, Pattern.pt1);
      if (!aspectRatio.passX || !aspectRatio.passY) {
        this.imgErrorMessageList1.push(`アスペクト比が不適切です。
      ${targetBannerPattern?.aspectRatioX}：${targetBannerPattern?.aspectRatioY}で指定してください。`)
      }
    } else if (imgNo === 2) {
      const g = calcGcd.gcd(this.uploadImgWidth2, this.uploadImgHeight2);
      const x = this.uploadImgWidth2 / g;
      const y = this.uploadImgHeight2 / g;
      this.aspectRatio2 = `${x} : ${y}`;
      const aspectRatio: AspectRatio = {
        x, y,
        passX: false, passY: false
      };
      AspectRatioUtil.checkAspectRatio(aspectRatio, Pattern.pt1);
      if (!aspectRatio.passX || !aspectRatio.passY) {
        this.imgErrorMessageList2.push(`アスペクト比が不適切です。
      ${targetBannerPattern?.aspectRatioX}：${targetBannerPattern?.aspectRatioY}で指定してください。`)
      }
    }
  }

  private checkImgSize(targetBannerPattern: BannerSizeByPatternMap, imgNo: number): void {
    if (imgNo === 1) {
      if (this.uploadImgWidth1 < targetBannerPattern.minWidth) {
        this.imgErrorMessageList1.push(`パターン2で使用する画像の幅は、最低${targetBannerPattern.minWidth}pxの画像を推奨します。`)
      }
      if (this.uploadImgHeight1 < targetBannerPattern.minHeight) {
        this.imgErrorMessageList1.push(`パターン2で使用する画像の高さは、最低${targetBannerPattern.minHeight}pxの画像を推奨します。`)
      }
    } else if (imgNo === 2) {
      if (this.uploadImgWidth2 < targetBannerPattern.minWidth) {
        this.imgErrorMessageList2.push(`パターン2で使用する画像の幅は、最低${targetBannerPattern.minWidth}pxの画像を推奨します。`)
      }
      if (this.uploadImgHeight2 < targetBannerPattern.minHeight) {
        this.imgErrorMessageList2.push(`パターン2で使用する画像の高さは、最低${targetBannerPattern.minHeight}pxの画像を推奨します。`)
      }
    }
  }

  public saveThisBannerSetting() {
    const beginDate = DateFormat.dateFormat(this.fg2.get('beginDate')?.value);
    const beginHour = this.fg2.get('beginHour')?.value;
    const beginMin = this.fg2.get('beginMin')?.value;
    const endDate = DateFormat.dateFormat(this.fg2.get('endDate')?.value);
    const endHour = this.fg2.get('endHour')?.value;
    const endMin = this.fg2.get('endMin')?.value;
    const imgSrc1 = this.fg2.get('imgSrc1')?.value;
    const imgTransitionDestination1 = this.fg2.get('imgTransitionDestination1')?.value;
    const imgSrc2 = this.fg2.get('imgSrc2')?.value;
    const imgTransitionDestination2 = this.fg2.get('imgTransitionDestination2')?.value;
    const imgSrcObjList: ImgSrcObj[] = [
      {
        src: imgSrc1,
        transitionDestination: imgTransitionDestination1
      },
      {
        src: imgSrc2,
        transitionDestination: imgTransitionDestination2
      }
    ];

    const banner: Banner = {
      pattern: Pattern.pt2,
      beginDate: beginDate,
      beginHour: beginHour,
      beginMin: beginMin,
      endDate: endDate,
      endHour: endHour,
      endMin: endMin,
      imgSrcList: imgSrcObjList
    }
    localStorage.setItem('bannerPt2', JSON.stringify(banner));
  }
}
