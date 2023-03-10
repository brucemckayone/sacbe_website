type Review = {
  title: string;
  review: string;
};

type Flavours = {
  flavourName: string[];
  flavourTitle: string;
};

type userType = {
  accountId: string;
  affiliateStatus: affiliateStatusType;
  email: string;
  uuid: string;
  affiliateLink: string;
  chargesEnabled: boolean;
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
