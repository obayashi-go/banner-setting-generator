import { bannerSizeByPatternMapList, AspectRatio, Pattern } from '../interface/types';

export class calcGcd {
  public static gcd(x: number, y: number): number {
    if(x % y){
      return this.gcd(y, x % y)
    } else {
      return y;
    }
  };
}

export class AspectRatioUtil {
  public static checkAspectRatio(aspectRatio: AspectRatio, pattern: Pattern): AspectRatio {
    const targetBannerSize = bannerSizeByPatternMapList.find(bannerSizeByPattern => bannerSizeByPattern.pt === pattern);
    const targetAspectRatioX = targetBannerSize?.aspectRatioX;
    const targetAspectRatioY = targetBannerSize?.aspectRatioY;
    aspectRatio.passX = targetAspectRatioX === aspectRatio.x;
    aspectRatio.passY = targetAspectRatioY === aspectRatio.y;
    return aspectRatio;
  }
}
