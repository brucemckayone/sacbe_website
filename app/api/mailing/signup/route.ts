import { NextRequest, NextResponse } from "next/server";
import { firestore } from "firebase-admin";
import adminInit from "@/utils/firebase/admin_init";
import Stripe from "stripe";
import LoginButton from "@/components/buttons/loginButton";
const mailchimp = require('@mailchimp/mailchimp_marketing');
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, 
});

adminInit();
const db = firestore();

export async function POST(request: NextRequest) {
    try {
        const { email, name, phoneNumber, address, tags } = await request.json();
        const listId = process.env.MAILCHIMP_AUDIENCE_ID;
        console.log(email, name, phoneNumber, address, tags);
        
        const prefs = await db.collection("segmentation").doc(email).get();
        const got = prefs.data() as { [key: string]: string[] | string }
        let data = [] as any;
        let emailMeAbout: string[] = [];
        if (prefs.exists)
            for (let key in got)
                if (key === 'email_me_about')
                    emailMeAbout = got[key] as string[];
                else 
                    if (got[key] instanceof String)
                        data.push(got[key]);
                    else if (got[key] instanceof Array)
                        data.push(...got[key] as string[]);
            
        
        if (tags instanceof Array)
            emailMeAbout.push(...tags);
    
        const subscribingUser = {
            firstName: name?.split(" ")[0] ?? null,
            lastName: name?.split(" ")[1] ?? null,
            email: email,
            tags: data,
            segments: emailMeAbout,
            phoneNumber: phoneNumber?? null,
            address: address as Stripe.Address,
        };
        let message;
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            tags: subscribingUser.tags,
            merge_fields: {
                FNAME: subscribingUser.firstName ?? '',
                LNAME: subscribingUser.lastName ?? '',
                PHONE: subscribingUser.phoneNumber ?? '',
            },
        }).catch(async (error: any) => {
            
                // await mailchimp.lists.updateListMemberTags(listId, subscribingUser.email, {
                //     tags: subscribingUser.tags,
                // });
                message = 'Success, Your information has been updated'
                return NextResponse.json({ success: true, message: message });
            // } else
            //     return NextResponse.json({ success: false, message: error });
        });
        if (!message) message = response?.body?.title ?? 'Success';
 
        
        return NextResponse.json({ success: true, message: message });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ success: false, message: error  });
    }
}