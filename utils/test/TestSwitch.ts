interface ITestSwtich {
  test?: any;
  live?: any;
}

const isTest =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "preview" ||
  process.env.NODE_ENV == "development";

export default function testSwitch<T>({ test, live }: ITestSwtich) {
  if (isTest) {
    return test as T;
  } else {
    return live as T;
  }
}

export async function functionSwitch({ test, live }: ITestSwtich) {
  if (!test && !live) return;
  if (test && live) return isTest ? await test() : await live();
  if (test && !live) return await test();
  if (!test && live) return await live();
}
