interface params {
  environmentVariable: string;
  testKey?: string;
}
const getEnvironmentVariable = ({
  environmentVariable,
  testKey,
}: params): string => {
  if (process.env.NODE_ENV == "production") {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
      throw new Error(
        `Couldn't find environment variable: ${environmentVariable}`
      );
    } else {
      return unvalidatedEnvironmentVariable;
    }
  } else if (process.env.NODE_ENV == "development") {
    if (testKey) {
      return testKey!;
    } else {
      const unvalidatedEnvironmentVariable = process.env[environmentVariable];
      if (!unvalidatedEnvironmentVariable) {
        throw new Error(
          `Couldn't find environment variable: ${environmentVariable}`
        );
      } else {
        return unvalidatedEnvironmentVariable;
      }
    }
  } else {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
      throw new Error(
        `Couldn't find environment variable: ${environmentVariable}`
      );
    } else {
      return unvalidatedEnvironmentVariable;
    }
  }
};

export const envConfig = {
  NEXTAUTH_SECRET: getEnvironmentVariable({
    environmentVariable: "NEXTAUTH_SECRET",
  }),
  NEXTAUTH_URL: getEnvironmentVariable({
    environmentVariable: "NEXTAUTH_URL",
    testKey: "http://localhost:3000",
  }),
  
  STRIPE_SECRET: getEnvironmentVariable({
    environmentVariable: "STRIPE_SECRET",
    testKey:"sk_test_51MXidpG859ZdyFmpVjbfa4cmXB4LxCbAOmGF2miuQhwYnPdvYKqKg7eojkplvixcd5tvQZTGShPwffzyzbILhoMZ00y45NdkRS"
  }),
  STRIPE_PUBLIC: getEnvironmentVariable({
    environmentVariable: "STRIPE_PUBLIC",
    testKey:"pk_test_51MXidpG859ZdyFmpulIyjBVw96vod2EQJOyhZHLxEvHe7y1GTuXryqMF1X9SbhKT1xla0o6w7XvNBh6IYFQULVch005S97qsEO"
  }),
  STRIPE_CHECKOUT_WEBHOOK: getEnvironmentVariable({
    environmentVariable: "STRIPE_CHECKOUT_WEBHOOK",
    testKey:
      "whsec_242937646811ecb8ce3e863161dceb662b1f88539e08efe29da1eb17a21bb704",
  }),

  STRIPE_INVOICE_WEBHOOK: getEnvironmentVariable({
    environmentVariable: "STRIPE_INVOICE_WEBHOOK",
    testKey:
      "whsec_242937646811ecb8ce3e863161dceb662b1f88539e08efe29da1eb17a21bb704",
  }),
  STRIPE_CUSTOMER_WEBHOOK: getEnvironmentVariable({
    environmentVariable: "STRIPE_CUSTOMER_WEBHOOK",
    testKey:
      "whsec_242937646811ecb8ce3e863161dceb662b1f88539e08efe29da1eb17a21bb704",
  }),
  STRIPE_PAYMENTLINK_WEBHOOK: getEnvironmentVariable({
    environmentVariable: "STRIPE_PAYMENTLINK_WEBHOOK",
    testKey:
      "whsec_242937646811ecb8ce3e863161dceb662b1f88539e08efe29da1eb17a21bb704",
  }),
  STRIPE_ACCOUNT_WEBHOOK: getEnvironmentVariable({
    environmentVariable: "STRIPE_ACCOUNT_WEBHOOK",
    testKey:
      "whsec_242937646811ecb8ce3e863161dceb662b1f88539e08efe29da1eb17a21bb704",
  }),

  FIREBASE_PROJECT_ID: getEnvironmentVariable({
    environmentVariable: "FIREBASE_PROJECT_ID",
  }),
  FIREBASE_PRIVATE_KEY_ID: getEnvironmentVariable({
    environmentVariable: "FIREBASE_PRIVATE_KEY_ID",
  }),
  FIREBASE_PRIVATE_KEY: getEnvironmentVariable({
    environmentVariable: "FIREBASE_PRIVATE_KEY",
  }),
  FIREBASE_CLIENT_EMAIL: getEnvironmentVariable({
    environmentVariable: "FIREBASE_CLIENT_EMAIL",
  }),
  FIREBASE_CLIENT_ID: getEnvironmentVariable({
    environmentVariable: "FIREBASE_CLIENT_ID",
  }),
  FIREBASE_AUTH_URI: getEnvironmentVariable({
    environmentVariable: "FIREBASE_AUTH_URI",
  }),
  FIREBASE_TOKEN_URI: getEnvironmentVariable({
    environmentVariable: "FIREBASE_TOKEN_URI",
  }),
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: getEnvironmentVariable({
    environmentVariable: "FIREBASE_AUTH_PROVIDER_X509_CERT_URL",
  }),
  FIREBASE_CLIENT_X509_CERT_URL: getEnvironmentVariable({
    environmentVariable: "FIREBASE_CLIENT_X509_CERT_URL",
  }),
  GOOGLE_APPLICATION_CREDENTIALS: getEnvironmentVariable({
    environmentVariable: "GOOGLE_APPLICATION_CREDENTIALS",
  }),

  GOOGLE_OAUTH_CLIENT_ID: getEnvironmentVariable({
    environmentVariable: "GOOGLE_OAUTH_CLIENT_ID",
  }),
  GOOGLE_CLIENT_SECRET: getEnvironmentVariable({
    environmentVariable: "GOOGLE_CLIENT_SECRET",
  }),
  APPLE_TEAM_ID: getEnvironmentVariable({
    environmentVariable: "APPLE_TEAM_ID",
  }),
  APPLE_CLIENT_ID: getEnvironmentVariable({
    environmentVariable: "APPLE_CLIENT_ID",
  }),
  APPLE_CLIENT_SECRET: getEnvironmentVariable({
    environmentVariable: "APPLE_CLIENT_SECRET",
  }),
  // SENDINBLUE_API_KEY: getEnvironmentVariable({
  //   environmentVariable: "SENDINBLUE_API_KEY",
  // }),
  AWS_SECRET_ACCESS_KEY: getEnvironmentVariable({
    environmentVariable: "AWS_SECRET_ACCESS_KEY",
  }),
  AWS_ACCESS_KEY_ID: getEnvironmentVariable({
    environmentVariable: "AWS_ACCESS_KEY_ID",
  }),
  AWS_REGION: getEnvironmentVariable({
    environmentVariable: "AWS_REGION",
  }),
  ALGOLIA_ID: getEnvironmentVariable({
    environmentVariable: "ALGOLIA_ID",
  }),
  ALGOLIA_SEARCH_SECRET: getEnvironmentVariable({
    environmentVariable: "ALGOLIA_SEARCH_SECRET",
  }),
  
};
