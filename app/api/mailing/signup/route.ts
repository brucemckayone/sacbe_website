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
        const { email, name, phoneNumber, address } = await request.json();
        const listId = process.env.MAILCHIMP_AUDIENCE_ID;

        const prefs = await db.collection("segmentation").doc(email).get();


        const got = prefs.data() as { [key: string]: string[] | string }
 
        console.log(got);
        
        let data = [] as any;


    //join list of tags into one array from data
        
        
        let emailMeAbout: string[] = [];
        for (let key in got) {

            if (key === 'email_me_about') {
                emailMeAbout = got[key] as string[];
            }
            else {
                if (got[key] instanceof String)
                    data.push(got[key]);
                else if (got[key] instanceof Array)
                    data.push(...got[key] as string[]);
            }
        }
        
        console.log(data);
        
        const subscribingUser = {
            firstName: name.split(" ")[0]??'',
            lastName: name.split(" ")[1]??'',
            email: email,
            tags: data,
            segments: emailMeAbout,
            phoneNumber: phoneNumber?? 0,
            address: address as Stripe.Address,
        };

        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            tags: subscribingUser.tags,

            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName,
                PHONE: subscribingUser.phoneNumber,
            },
        });
    

        // console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
        return NextResponse.json({ success: true, message: response.body.title });


    } catch (error) {
        error as any;
        return NextResponse.json({ success: false, message: error  });
    }
}