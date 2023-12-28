interface WithAccountId {
  accountId: string;
  uuid?: string;
  email?: string;
}

interface WithUuidAndEmail {
  accountId?: string;
  uuid: string;
  email: string;
}

export type ISetupGetParams = WithAccountId | WithUuidAndEmail;
