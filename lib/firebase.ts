"use client";
import { initFirestore } from "@next-auth/firebase-adapter";
import { initializeApp } from "firebase/app";

import { cert } from "firebase-admin/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBftZZHS0GpQ8ooSmrc63MsWweUPX3sZuI",
  authDomain: "sacbe-cacao.firebaseapp.com",
  projectId: "sacbe-cacao",
  storageBucket: "sacbe-cacao.appspot.com",
  messagingSenderId: "461975289008",
  appId: "1:461975289008:web:6be52c248a557c114c4f75",
  measurementId: "G-BWQ4PZ49KR",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const authFireStore = initFirestore({
  credential: cert({
    projectId: "sacbe-cacao",
    clientEmail: "firebase-adminsdk-xts9p@sacbe-cacao.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCYXn6boExiiYVa\nksb2nN0zlTvJ6JnUdT+TCQDnGc/4Qesa5WRSGwbJNNcTKZrERMWV6QmDw2FnI48o\nNuzpjMbOpJJy41pA57iRB6ZrabtXrrMGWDx83UU0+fbZX6g8zkW5ZhUTbuuU++2E\nrtQeZxFTqbILNZZJH+MrYgRWvJnMCBt3V29IFGYnqVj71BpThg+0UQAvmdKNdsFP\nzqVC+IPaEHosVSkrzmZ12Nhe1EHC2kVQKTUEvpS8uBJpH9UD2fqQ7yxJmccXe6FN\naOnK9owb9RT35ZuDjAE1MM8rSWRoDtRSn4i142Ltb3pyYJNWc/VnnZODbkh3wPg9\nxGq9jcS5AgMBAAECggEAE1XWcjBG0TBLXGGI3w2r4lpbMnWSY8wXK7T2SN1VL1dK\nGukmMGceltTeQB/E9IgXnLzsSKy4BQsVpRBHQyHqrplivjKMpvTgzoKugy3xKKDS\nNglnb57yo9TeltoVMtYoMe062nL2cTsA+pfm8g65O6kqn1KHBjOGM+Cl1U3spF/m\n4DZaQ8gKSPuyp/cuDX1xh8OB2O2N4w2Epd87TNX+oFRb2lrWI2olnzNlvZR9zJuG\nC/trYGb60pxbWJgbPrIXZ6CXUeuoNwAh+t2ICIUrrFIxG5fB69HY7Qi6ioJz2Cqf\ne3NuQLaZbEURtJ8IDLYOJYByxvoVzbEHLwrnK8UgKwKBgQDF3EWQ48z2pj+mgP5I\nGp1XzPUBgzi+Ve7dUHyTTTTWtWjhd/BP/vs3FPWlJg2aToI+vXaUGrQjswivo7jm\nShNZjMkiq7cOaYQtWPDxBWk0A6/1B7dDbs908TyoGOaG5uMdbYLiii7muZPD8A6e\ni88uMn+lVIXCpij3dSvancR9dwKBgQDFJDZ4LOR79Mj2uAkG2sb7AKVQhnF19mId\nXQKGEX1yrYcxUO5ObpzyHHk4BkVLtIPHHYq1W+yDrHSrjpx7qwFnigU5srnSt2fy\ncGHH6zU1cyC2LWFRpSiCQ895LQszvLhKxTGHTqHH4nR8UyuBBxi9L6Zw1yr8+8FR\nC8KPBqybTwKBgQC9zjn57V3Q+tiyjKniV427DYW3hr8nb94t9qka0YSvt+U97cXd\np7gsNfIUFHYWIdw1/aDEIP3QBU5+12tnl4YKcND+boWz0KsYqWqxe8RZPnRMdbNr\nf+CJyWWrx/9VSCZ1M3nMgkzNzxaebypHE82S/qSO4I9Uk/tWr9N667/zrwKBgG/9\nyGuwpQO95UQy+/3G3u7MSR1boqzukII5yis7WFaDOZ/MZ/RqZgIsJriq50bAf3Pn\n1lp8o/mRSJ4E3+RpGt0kzR8f5uxLgGN7cDDP72QzyMt1MCnfdwm5V+1wp0J23QKs\nzxwckU8p2B6gaMBdtbITlavYr/UTV5ig45+4nOmFAoGBAIs/VWxZrEIU+QINofqE\nA96UC5YjNzRpSfYA7yoNFjpA/dxR/ZQ+vPo7WE/73URMVTeNHAXtI/e/HlWP7cnp\nIYX/PfdYaZHeyaYwNYU5Orzbtp42ctdKQW8aoL084pynCqYTfEmjUsdSelJfPk/c\nreC0Acq4fE+gupnJLXTd6ja4\n-----END PRIVATE KEY-----\n",
  }),
});
export const storage = getStorage(app);
export { firebaseConfig };
