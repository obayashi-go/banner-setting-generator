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
import {GetLocalStorageData} from "../../util/getLocalStorageData";

@Component({
  selector: 'app-banner-setting-5',
  templateUrl: './banner-setting-5.component.html',
  styleUrls: ['./banner-setting-5.component.scss']
})
export class BannerSetting5Component5 implements OnInit {

  public fg5: FormGroup;
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
  // @ts-ignore
  public file3: File = null;
  public uploadImgWidth3: number = 0;
  public uploadImgHeight3: number = 0;
  public aspectRatio3: string = '';
  public imgErrorMessageList1: string[] = [];
  public imgErrorMessageList2: string[] = [];
  public imgErrorMessageList3: string[] = [];
  public isImgUploaded1: boolean = false;
  public isImgUploaded2: boolean = false;
  public isImgUploaded3: boolean = false;
  public hourList: number[] = HourList;
  public minValueList: number[] = getMinList();
  public hasSettingData: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    const banner: Banner = GetLocalStorageData.getLocalStorageDataByPt(Pattern.pt5);
    this.hasSettingData = !!banner.beginDate;
    this.fg5 = this.formBuilder.group({
      useThisPattern: [true, Validators.compose([Validators.required])],
      beginDate: [!banner.beginDate || banner.beginDate === '2030-12-31' ? '' : banner.beginDate],
      endDate: [!banner.endDate || banner.endDate === '2030-12-31' ? '' : banner.endDate],
      beginHour: [banner.beginTimeHour || null],
      beginMin: [banner.beginTimeMin || null],
      endHour: [banner.endTimeHour || null],
      endMin: [banner.endTimeMin || null],
      imgSrc1: [banner.bannerList[0].src || ''],
      imgTransitionDestination1: [banner.bannerList[0].url || ''],
      dropImage1: [''],
      imgSrc2: [banner.bannerList[1].src || ''],
      imgTransitionDestination2: [banner.bannerList[1].url || ''],
      dropImage2: [''],
      imgSrc3: [banner.bannerList[2].src || ''],
      imgTransitionDestination3: [banner.bannerList[2].url || ''],
      dropImage3: [''],
    });
  }

  ngOnInit(): void {}

  public checkUsePattern(): void {
    this.isNotUse = !this.fg5.get('useThisPattern')?.value;
    this.fg5.get('beginDate')?.setValue('');
    this.fg5.get('endDate')?.setValue('');
    this.fg5.get('imgSrc1')?.setValue('');
    this.fg5.get('imgTransitionDestination1')?.setValue('');
    this.fg5.get('dropImage1')?.setValue('');
    this.uploadImgWidth1 = 0;
    this.uploadImgHeight1 = 0;
    this.isImgUploaded1 = false;
    this.aspectRatio1 = '';
    this.imgErrorMessageList1 = [];
    this.fg5.get('imgSrc2')?.setValue('');
    this.fg5.get('imgTransitionDestination2')?.setValue('');
    this.fg5.get('dropImage2')?.setValue('');
    this.uploadImgWidth2 = 0;
    this.uploadImgHeight2 = 0;
    this.isImgUploaded2 = false;
    this.aspectRatio2 = '';
    this.imgErrorMessageList2 = [];
    this.fg5.get('imgSrc3')?.setValue('');
    this.fg5.get('imgTransitionDestination3')?.setValue('');
    this.fg5.get('dropImage3')?.setValue('');
    this.uploadImgWidth3 = 0;
    this.uploadImgHeight3 = 0;
    this.isImgUploaded3 = false;
    this.aspectRatio3 = '';
    this.imgErrorMessageList3 = [];
    this.fg5.get('imgSrc4')?.setValue('');
    this.fg5.get('imgTransitionDestination4')?.setValue('');
    this.fg5.get('dropImage4')?.setValue('');
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
      this.fg5.get('imgSrc1')?.setValue(this.file1.name);
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
      this.fg5.get('imgSrc2')?.setValue(this.file2.name);
      // 画像サイズを取得
      const img2 = document.createElement('img');
      img2.src = URL.createObjectURL(event.target.files[0]);
      img2.onload = () => {
        this.isImgUploaded2 = true;
        this.uploadImgWidth2 = img2.width;
        this.uploadImgHeight2 = img2.height;
        console.log(img2.width, this.uploadImgWidth2);
        this.checkUploadImgContent(imgNo);
      }
    } else if (imgNo === 3) {
      //ファイルの情報をfileとimgSrc2に保存
      this.file3 = event.target.files[0];
      // フォームへファイル名をセット
      this.fg5.get('imgSrc3')?.setValue(this.file3.name);
      // 画像サイズを取得
      const img3 = document.createElement('img');
      img3.src = URL.createObjectURL(event.target.files[0]);
      img3.onload = () => {
        this.isImgUploaded3 = true;
        this.uploadImgWidth3 = img3.width;
        this.uploadImgHeight3 = img3.height;
        this.checkUploadImgContent(imgNo);
      }
    }
  }

  private checkUploadImgContent(imgNo: number): void {
    switch (imgNo) {
      case 1:
        this.imgErrorMessageList1.length = 0;
        break;
      case 2:
        this.imgErrorMessageList2.length = 0;
        break;
      case 3:
        this.imgErrorMessageList3.length = 0;
        break;
      default:
        break;
    }
    const targetBannerPattern: BannerSizeByPatternMap | undefined
      = bannerSizeByPatternMapList.find(bannerSizeByPattern => bannerSizeByPattern.pt === Pattern.pt5);
    if (!targetBannerPattern) {
      switch (imgNo) {
        case 1:
          this.imgErrorMessageList1.push('検証に失敗しました。');
          return;
        case 2:
          this.imgErrorMessageList2.push('検証に失敗しました。');
          return;
        case 3:
          this.imgErrorMessageList3.push('検証に失敗しました。');
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
      AspectRatioUtil.checkAspectRatio(aspectRatio, Pattern.pt5);
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
      AspectRatioUtil.checkAspectRatio(aspectRatio, Pattern.pt5);
      if (!aspectRatio.passX || !aspectRatio.passY) {
        this.imgErrorMessageList2.push(`アスペクト比が不適切です。
      ${targetBannerPattern?.aspectRatioX}：${targetBannerPattern?.aspectRatioY}で指定してください。`)
      }
    } else if (imgNo === 3) {
      const g = calcGcd.gcd(this.uploadImgWidth3, this.uploadImgHeight3);
      const x = this.uploadImgWidth3 / g;
      const y = this.uploadImgHeight3 / g;
      this.aspectRatio3 = `${x} : ${y}`;
      const aspectRatio: AspectRatio = {
        x, y,
        passX: false, passY: false
      };
      AspectRatioUtil.checkAspectRatio(aspectRatio, Pattern.pt5);
      if (!aspectRatio.passX || !aspectRatio.passY) {
        this.imgErrorMessageList3.push(`アスペクト比が不適切です。
      ${targetBannerPattern?.aspectRatioX}：${targetBannerPattern?.aspectRatioY}で指定してください。`);
      }
    }
  }

  private checkImgSize(targetBannerPattern: BannerSizeByPatternMap, imgNo: number): void {
    if (imgNo === 1) {
      if (this.uploadImgWidth1 < targetBannerPattern.minWidth) {
        this.imgErrorMessageList1.push(`パターン5で使用する画像の幅は、最低${targetBannerPattern.minWidth}pxの画像を推奨します。`)
      }
      if (this.uploadImgHeight1 < targetBannerPattern.minHeight) {
        this.imgErrorMessageList1.push(`パターン5で使用する画像の高さは、最低${targetBannerPattern.minHeight}pxの画像を推奨します。`)
      }
    } else if (imgNo === 2) {
      if (this.uploadImgWidth2 < targetBannerPattern.minWidth) {
        this.imgErrorMessageList2.push(`パターン5で使用する画像の幅は、最低${targetBannerPattern.minWidth}pxの画像を推奨します。`)
      }
      if (this.uploadImgHeight2 < targetBannerPattern.minHeight) {
        this.imgErrorMessageList2.push(`パターン5で使用する画像の高さは、最低${targetBannerPattern.minHeight}pxの画像を推奨します。`)
      }
    } else if (imgNo === 3) {
      if (this.uploadImgWidth3 < targetBannerPattern.minWidth) {
        this.imgErrorMessageList3.push(`パターン5で使用する画像の幅は、最低${targetBannerPattern.minWidth}pxの画像を推奨します。`)
      }
      if (this.uploadImgHeight3 < targetBannerPattern.minHeight) {
        this.imgErrorMessageList3.push(`パターン5で使用する画像の高さは、最低${targetBannerPattern.minHeight}pxの画像を推奨します。`)
      }
    }
  }

  public saveThisBannerSetting() {
    const beginDate = DateFormat.dateFormat(this.fg5.get('beginDate')?.value);
    const beginHour = this.fg5.get('beginHour')?.value;
    const beginMin = this.fg5.get('beginMin')?.value;
    const endDate = DateFormat.dateFormat(this.fg5.get('endDate')?.value);
    const endHour = this.fg5.get('endHour')?.value;
    const endMin = this.fg5.get('endMin')?.value;
    const imgSrc1 = this.fg5.get('imgSrc1')?.value;
    const imgTransitionDestination1 = this.fg5.get('imgTransitionDestination1')?.value;
    const imgSrc2 = this.fg5.get('imgSrc2')?.value;
    const imgTransitionDestination2 = this.fg5.get('imgTransitionDestination2')?.value;
    const imgSrc3 = this.fg5.get('imgSrc3')?.value;
    const imgTransitionDestination3 = this.fg5.get('imgTransitionDestination3')?.value;
    const imgSrcObjList: ImgSrcObj[] = [
      {
        src: imgSrc1,
        url: imgTransitionDestination1
      },
      {
        src: imgSrc2,
        url: imgTransitionDestination2
      },
      {
        src: imgSrc3,
        url: imgTransitionDestination3
      }
    ];

    const banner: Banner = {
      pattern: Pattern.pt5,
      beginDate: beginDate,
      beginTimeHour: beginHour || 0,
      beginTimeMin: beginMin || 0,
      endDate: endDate,
      endTimeHour: endHour || 23,
      endTimeMin: endMin || 59,
      bannerList: imgSrcObjList
    }
    localStorage.setItem('bannerPt5', JSON.stringify(banner));
    this.hasSettingData = true;
  }
}
