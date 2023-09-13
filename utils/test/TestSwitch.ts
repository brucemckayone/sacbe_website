interface ITestSwtich { 
    test: any,
    live:any,
}
export default function testSwitch({ test, live }: ITestSwtich) {
    console.log(process.env.NEXT_PUBLIC_VERCEL_ENV);
    
    if (process.env.NEXT_PUBLIC_VERCEL_ENV == "preview" || process.env.NODE_ENV == "development") {
        return test;
    } else {
        return live;
    }
 };