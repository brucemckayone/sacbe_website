type orderStatusType =
  | "processing"
  | "complete"
  | "failed"
  | "refunded"
  | "cancelled";

type Review = {
  title: string;
  review: string;
};

type Flavours = {
  flavourName: string[];
  flavourTitle: string;
};

type userType = {
  user: any;
  accountId: string;
  affiliateStatus: affiliateStatusType;
  email: string;
  uuid: string;
  affiliateLink: string;
  chargesEnabled: boolean;
  wholesale?: boolean;
  name?: string;
  customerId?: string;
  coupon?: string;
};

type marketingType = {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
};

type affiliateStatusType = {
  refId: string;
  status: "pending" | "active";
};

type NewType = userType;

type authContextType = {
  user: userType;
  setUser: (user: NewType) => void;
  isLoading: Boolean;
  isError: Boolean;
};
type affiliateLinksType = {
  links:linksType;
  setLinks:Dispatch<SetStateAction<undefined>>;
};

type linksType={
  subscriptionLink: string,
  oneOffLink:string
};

export interface WooCreateOrderModel {
    payment_method:       string;
    payment_method_title: string;
    set_paid:             boolean;
    billing:              Ing;
    shipping:             Ing;
    line_items:           LineItem[];
    shipping_lines:       ShippingLine[];
}

export interface Ing {
    first_name: string;
    last_name:  string;
    address_1:  string;
    address_2:  string;
    city:       string;
    state:      string;
    postcode:   string;
    country:    string;
    email?:     string;
    phone?:     string;
}

export interface LineItem {
    product_id:    number;
    quantity:      number;
    variation_id?: number;
}

export interface ShippingLine {
    method_id:    string;
    method_title: string;
    total:        string;
}
