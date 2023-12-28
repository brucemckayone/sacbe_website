export interface IRequestPostBody {
  body: {
    message?: string;
    wesbite?: string;
    social?: string;
    userId: string;
    email: string;
  };
  id?: string;
}

export interface IRequestPatchBody {
  body: {
    status: string;
  };
  id: string;
}

export interface IRequestGetBody {
  email?: string;
  userId?: string;
}
