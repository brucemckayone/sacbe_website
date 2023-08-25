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

type authContextType = {
  user: userType;
  setUser: (user: userType) => void;
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