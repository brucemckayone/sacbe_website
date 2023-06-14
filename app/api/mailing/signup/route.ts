import { NextRequest, NextResponse } from "next/server";
const mailchimp = require('@mailchimp/mailchimp_marketing');
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, 
});
export async function POST(request: NextRequest) {

    try {


        const { email, name, phoneNumber, address } = await request.json();
       
        
        const listId = process.env.MAILCHIMP_AUDIENCE_ID;

        mailchimp.lists.createList

        const subscribingUser = {
            firstName: name.split(" ")[0],
            lastName: name.split(" ")[1],
            email: email,
            phoneNumber: phoneNumber,
            address: address,
        };

        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName,
                PHONE: subscribingUser.phoneNumber,
                ADDRESS: subscribingUser.address,
            },
        });
    
        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false });
    }
}