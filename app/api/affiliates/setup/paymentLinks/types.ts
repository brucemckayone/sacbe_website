import {
  LinkElement,
  PaymentLinkListType,
} from "@/types/affiliatePaymentLinkType";

export interface IPaymentLinkGetParams {
  uuid: string;
}

export interface IPaymentLinkPostBody {
  accountId: string;
  priceIds: string[];
  uuid: string;
}

export type PaymentLinkGetResponseType = {
  ok: boolean;
  status: string;
  message: string;
  documentId: string;
  data: {
    links: LinkElement[];
  };
};
