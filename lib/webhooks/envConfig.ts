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
  STRIPE_SECRET: getEnvironmentVariable("STRIPE_SECRET"),
  STRIPE_PUBLIC: getEnvironmentVariable("STRIPE_PUBLIC"),
  STRIPE_WEBHOOK_ENDPOINT: getEnvironmentVariable("STRIPE_WEBHOOK_ENDPOINT"),
  NEXTAUTH_SECRET: getEnvironmentVariable("NEXTAUTH_SECRET"),
  FIREBASE_API_KEY: getEnvironmentVariable("FIREBASE_API_KEY"),
  FIREBASE_AUTH_DOMAIN: getEnvironmentVariable("FIREBASE_AUTH_DOMAIN"),
  FIREBASE_PROJECT_ID: getEnvironmentVariable("FIREBASE_PROJECT_ID"),
  FIREBASE_STORAGE_BUCKET: getEnvironmentVariable("FIREBASE_STORAGE_BUCKET"),
  FIREBASE_MESSAGING_SENDER_ID: getEnvironmentVariable(
    "FIREBASE_MESSAGING_SENDER_ID"
  ),
  FIREBASE_MEASUREMENT_ID: getEnvironmentVariable("FIREBASE_MEASUREMENT_ID"),
  FIREBASE_APP_ID: getEnvironmentVariable("FIREBASE_APP_ID"),
};
