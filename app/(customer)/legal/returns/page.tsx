import React from "react";

import { MarkDown } from "../../posts/[title]/MarkDown";

const markdown = `**Return Policy**

We want you to be completely satisfied with your purchase from our website. In the event that you need to return an item, please carefully review our return policy below.

1. **Eligibility for Returns:**
   - To be eligible for a return, the item must be unused, in its original packaging, and in the same condition as when you received it.
   - Perishable items such as cacao should be returned within 14 days from the date of delivery.

2. **Return Process:**
   - Before initiating a return, please contact our customer support team via email or phone to notify us of your intention to return the item.
   - Once your return request is approved, you will receive detailed instructions on how to proceed with the return.
   - Please ensure that the item is securely packaged to prevent damage during transit.

3. **Return Shipping:**
   - The customer is responsible for covering the shipping costs associated with the return, including any customs or import fees if applicable.
   - We recommend using a trackable shipping service or purchasing shipping insurance to ensure that the returned item reaches us safely.
   - If the return is a result of our error or a defective product, we will reimburse you for the return shipping costs.

4. **Refund or Exchange:**
   - Once the returned item is received and inspected, we will notify you of the approval or rejection of your refund or exchange request.
   - If approved, we will process the refund to your original payment method within a reasonable timeframe.
   - In case of an exchange, we will arrange for the replacement item to be shipped to you at no additional cost, subject to availability.

5. **Non-Returnable Items:**
   - Some items are non-returnable for hygiene and safety reasons, such as opened or used food products. These items will be clearly marked as non-returnable on our website.

6. **Damaged or Defective Items:**
   - If you receive a damaged or defective item, please contact our customer support team immediately.
   - We may request photographic evidence or other relevant information to assess the issue.
   - Depending on the circumstances, we will offer a replacement, refund, or alternative resolution to rectify the situation.

Please note that this return policy is subject to change without prior notice. It is your responsibility to review the policy before making a purchase. If you have any further questions or require clarification, please don't hesitate to reach out to our customer support team.
`;

const metadata = {
  title: "Return Policy",
  description: "Return Policy",
  keywords: ["Return Policy"],
  twitter: {
    card: "summary_large_image",
    site: "@SacbeCacao",
    title: "Return Policy",
    description: "Return Policy",
  },
  openGraph: {
    type: "website",
    url: "https://sacbe-ceremonial-cacao.com/legal/returns",

    title: "Return Policy",
    description: "Return Policy",
    siteName: "Sacbe Cacao",
  },
};

function ReturnPolicy() {
  return (
    <div className="w-11/12 md:w-6/12 m-auto">
      <MarkDown content={markdown} />
    </div>
  );
}

export default ReturnPolicy;
