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
  affiliateRequest: affiliateRequestType;
  email: string;
  id: string;
};

type marketingType = {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
};

type affiliateRequestType = {
  refId: string;
  status: "pending" | "active";
};
type authContextType = {
  user: userType;
  setUser: (user: userType) => void;
};
