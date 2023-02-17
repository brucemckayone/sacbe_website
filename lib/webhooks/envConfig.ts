const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const envConfig = {
  NEXTAUTH_SECRET: getEnvironmentVariable("NEXTAUTH_SECRET"),
  STRIPE_SECRET: getEnvironmentVariable("STRIPE_SECRET"),
  STRIPE_PUBLIC: getEnvironmentVariable("STRIPE_PUBLIC"),
  STRIPE_WEBHOOK_ENDPOINT: getEnvironmentVariable("STRIPE_WEBHOOK_ENDPOINT"),
  FIREBASE_PROJECT_ID: getEnvironmentVariable("FIREBASE_PROJECT_ID"),
  FIREBASE_PRIVATE_KEY_ID: getEnvironmentVariable("FIREBASE_PRIVATE_KEY_ID"),
  FIREBASE_PRIVATE_KEY: getEnvironmentVariable("FIREBASE_PRIVATE_KEY"),
  FIREBASE_CLIENT_EMAIL: getEnvironmentVariable("FIREBASE_CLIENT_EMAIL"),
  FIREBASE_CLIENT_ID: getEnvironmentVariable("FIREBASE_CLIENT_ID"),
  FIREBASE_AUTH_URI: getEnvironmentVariable("FIREBASE_AUTH_URI"),
  FIREBASE_TOKEN_URI: getEnvironmentVariable("FIREBASE_TOKEN_URI"),
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: getEnvironmentVariable(
    "FIREBASE_AUTH_PROVIDER_X509_CERT_URL"
  ),
  FIREBASE_CLIENT_X509_CERT_URL: getEnvironmentVariable(
    "FIREBASE_CLIENT_X509_CERT_URL"
  ),
  GOOGLE_APPLICATION_CREDENTIALS: getEnvironmentVariable(
    "GOOGLE_APPLICATION_CREDENTIALS"
  ),
  NEXTAUTH_URL: getEnvironmentVariable("NEXTAUTH_URL"),
  GOOGLE_OAUTH_CLIENT_ID: getEnvironmentVariable("GOOGLE_OAUTH_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnvironmentVariable("GOOGLE_CLIENT_SECRET"),
};
