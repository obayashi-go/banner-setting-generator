import {Banner, ImgSrcObj, Pattern, patternsHashMap} from "../interface/types";

export class GetLocalStorageData {
  public static getLocalStorageDataByPt(pattern: Pattern): Banner {
    const bannerStr: string = localStorage.getItem(`bannerPt${pattern}`) as string;
    if (!bannerStr) {
      return this.createEmptyBannerObj(pattern);
    }
    const banner: Banner = JSON.parse(bannerStr);
    return banner;
  }

  private static createEmptyBannerObj(pattern: Pattern): Banner {
    return  {
      pattern: pattern,
      beginDate: '',
      beginTimeHour: 0,
      beginTimeMin: 0,
      endDate: '',
      endTimeHour: 0,
      endTimeMin: 0,
      bannerList: this.createEmptyBannerList(pattern)
    }
  }

  private static createEmptyBannerList(pattern: Pattern): ImgSrcObj[] {
    const emptyBannerList: ImgSrcObj[] = [];
    // @ts-ignore
    const bannerCount = patternsHashMap.find(p => p.ptId === pattern).bannerCount;
    for (let i = 0; i < bannerCount; i++) {
      emptyBannerList.push({src: '', url: ''});
    }
    return emptyBannerList;
  }
}
