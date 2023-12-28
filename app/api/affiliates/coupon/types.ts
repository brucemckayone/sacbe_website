export interface ICouponPostBody {
  accountId: string;
  uuid: string;
  couponName: string;
}

export interface ICouponGetParams {
  couponName?: string;
  uuid?: string;
  accountId?: string;
  email?: string;
}
