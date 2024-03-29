import Stripe from "stripe";
import { firestore, messaging } from "firebase-admin";
import stripe from "@/lib/stripe/init/stripe";
import adminInit from "@/lib/firebase/admin_init";
import InvoiceSender from "@/lib/email/senders/invoiceSender";
import { orderStatusType } from "@/types/typings";

adminInit();

export class InvoiceHandler {
  email = new InvoiceSender();
  private readonly db = firestore();
  async invoicePaid(invoice: Stripe.Invoice) {
    let data = await this.parseInvoiceForFirebase(invoice);
    data = await this.saveData(data, invoice);
    messaging().send({
      topic: "all",
      notification: {
        title: `New Order £${data.amount_paid / 100} ${data.products[0].name}`,
        body: data.customer.name + " has ordered" ?? " NO name has ordered ",
        imageUrl: data.products[0].image ?? "",
      },
    });
    this.email.success({
      email: invoice.customer_email!,
      name: invoice.customer_name ?? "",
      orderNumber: data.invoiceNumber,
      orderNumberUrl: invoice.hosted_invoice_url!,
      productName: data.products[0].name ?? "",
      recipeUrl: invoice.hosted_invoice_url ?? "",
    });
    
    return data;
  }
  async invoiceFailed(invoice: Stripe.Invoice) {
    const data = await this.parseInvoiceForFirebase(invoice);
    data.orderStatus = "failed";
    messaging().send({
      topic: "all",
      notification: {
        title:
          "Payment Failed £" +
          data.amount_paid / 100 +
          ` ${data.products[0].name}`,
        body: data.customer.name! + " payment has failed",
        imageUrl: data.products[0].image,
      },
    });

    this.saveData(data, invoice);
    this.email.failure({
      email: invoice.customer_email!,
      name: invoice.customer_name ?? "",
      orderNumber: data.invoiceNumber,
      orderNumberUrl: invoice.hosted_invoice_url!,
    });
    return data;
  }

  private async parseInvoiceForFirebase(invoice: Stripe.Invoice) {
    const productIds = invoice.lines.data.map(
      (line) => line.price!.product as string
    );
    const products = await stripe.products.list({
      ids: productIds,
      limit: 100,
    });
    if (products.has_more) {
      const moreProducts = await stripe.products.list({
        ids: productIds,
        limit: 100,
        starting_after: "100",
      });
      products.data.push(...moreProducts.data);
    }

    let productList = [];
    for (let i = 0; i < products.data.length; i++) {
      const product = {
        id: products.data[i].id ?? "no id",
        name: products.data[i].name ?? "no nake",
        image: products.data[i].images[0] ?? "no image",
        quantity: invoice.lines.data[i].quantity ?? "non quantity",
        cost: invoice.lines.data[i].amount ?? 0,
        subscriptionId: invoice.lines.data[i].subscription ?? "no sub id",
      };
      productList.push(product);
    }
    return {
      customer: {
        id: invoice.customer,
        name: invoice.customer_name,
        phone: invoice.customer_phone,
        email: invoice.customer_email,
        address: invoice.customer_address,
        customer_standard_shipping_address: invoice.customer_shipping,
      },
      products: productList,
      orderStatus: "processing" as orderStatusType,
      invoiceNumber: invoice.id,
      dateCreated: new Date(),
      lastUpdated: new Date(),
      amount_paid: invoice.amount_paid,
      amount_due: invoice.amount_due,
      shipping_cost: invoice.shipping_cost,
      charge: invoice.charge,
    };
  }

  private async saveData(data: any, invoice: Stripe.Invoice) {
    
    this.db.collection("orders").doc(invoice.id).set(data);
    
    return data;
  }
}

// INVOICE PAID

// {
//   "id": "in_1Mkpep2eZvKYlo2C1INrhpT7",
//   "object": "invoice",
//   "account_country": "US",
//   "account_name": "Stripe.com",
//   "account_tax_ids": null,
//   "amount_due": 2999,
//   "amount_paid": 0,
//   "amount_remaining": 2999,
//   "amount_shipping": 0,
//   "application": null,
//   "application_fee_amount": null,
//   "attempt_count": 0,
//   "attempted": false,
//   "auto_advance": true,
//   "automatic_tax": {
//     "enabled": false,
//     "status": null
//   },
//   "billing_reason": "manual",
//   "charge": null,
//   "collection_method": "charge_automatically",
//   "created": 1678630435,
//   "currency": "usd",
//   "custom_fields": null,
//   "customer": "cus_4QFOF3xrvBT2nU",
//   "customer_address": {
//     "city": "City9debc82d-10b2-42e2-87ec-3316c9e7acc5",
//     "country": "Country2bde78f1-d28b-4c80-8e99-836828661c29",
//     "line1": "Line136e8abc0-92e2-4b91-aa83-b07ee5305ef0",
//     "line2": "Line2139281af-fd20-4e7e-8a99-2a09c32dbe1e",
//     "postal_code": "PostalCode190108c3-177d-4b5c-9c5a-89ef946e36b5",
//     "state": "State8618eae4-ad11-4577-b227-ae6667c2e41e"
//   },
//   "customer_email": "namee97851f5-1cf1-48f6-b694-497e641661e8@test.com",
//   "customer_name": "namee97851f5-1cf1-48f6-b694-497e641661e8",
//   "customer_phone": null,
//   "customer_shipping": null,
//   "customer_tax_exempt": "none",
//   "customer_tax_ids": [
//     {
//       "type": "eu_vat",
//       "value": "DE123456789"
//     }
//   ],
//   "default_payment_method": null,
//   "default_source": null,
//   "default_tax_rates": [],
//   "description": null,
//   "discount": null,
//   "discounts": [],
//   "due_date": null,
//   "ending_balance": null,
//   "footer": null,
//   "from_invoice": null,
//   "hosted_invoice_url": null,
//   "invoice_pdf": null,
//   "last_finalization_error": null,
//   "latest_revision": null,
//   "lines": {
//     "object": "list",
//     "data": [
//       {
//         "id": "il_1Mkpep2eZvKYlo2CHLjjDK7F",
//         "object": "line_item",
//         "amount": 2999,
//         "amount_excluding_tax": 2999,
//         "currency": "usd",
//         "description": "My First Invoice Item (created for API docs)",
//         "discount_amounts": [],
//         "discountable": true,
//         "discounts": [],
//         "invoice_item": "ii_1Mkpep2eZvKYlo2C5mUGIhDG",
//         "livemode": false,
//         "metadata": {},
//         "period": {
//           "end": 1678630435,
//           "start": 1678630435
//         },
//         "price": {
//           "id": "price_1MkokQ2eZvKYlo2C49wlMU3N",
//           "object": "price",
//           "active": true,
//           "billing_scheme": "per_unit",
//           "created": 1678626938,
//           "currency": "usd",
//           "custom_unit_amount": null,
//           "livemode": false,
//           "lookup_key": null,
//           "metadata": {},
//           "nickname": null,
//           "product": "prod_NVqR5SdbZlFgDa",
//           "recurring": null,
//           "tax_behavior": "unspecified",
//           "tiers_mode": null,
//           "transform_quantity": null,
//           "type": "one_time",
//           "unit_amount": 2999,
//           "unit_amount_decimal": "2999"
//         },
//         "proration": false,
//         "proration_details": {
//           "credited_items": null
//         },
//         "quantity": 1,
//         "subscription": null,
//         "tax_amounts": [],
//         "tax_rates": [],
//         "type": "invoiceitem",
//         "unit_amount_excluding_tax": "2999"
//       }
//     ],
//     "has_more": false,
//     "url": "/v1/invoices/in_1Mkpep2eZvKYlo2C1INrhpT7/lines"
//   },
//   "livemode": false,
//   "metadata": {},
//   "next_payment_attempt": 1678634035,
//   "number": null,
//   "on_behalf_of": null,
//   "paid": false,
//   "paid_out_of_band": false,
//   "payment_intent": null,
//   "payment_settings": {
//     "default_mandate": null,
//     "payment_method_options": null,
//     "payment_method_types": null
//   },
//   "period_end": 1678965159,
//   "period_start": 1678360359,
//   "post_payment_credit_notes_amount": 0,
//   "pre_payment_credit_notes_amount": 0,
//   "quote": null,
//   "receipt_number": null,
//   "redaction": null,
//   "rendering_options": null,
//   "shipping_cost": null,
//   "shipping_details": null,
//   "starting_balance": 0,
//   "statement_descriptor": null,
//   "status": "draft",
//   "status_transitions": {
//     "finalized_at": null,
//     "marked_uncollectible_at": null,
//     "paid_at": null,
//     "voided_at": null
//   },
//   "subscription": null,
//   "subtotal": 2999,
//   "subtotal_excluding_tax": 2999,
//   "tax": null,
//   "test_clock": null,
//   "total": 2999,
//   "total_discount_amounts": [],
//   "total_excluding_tax": 2999,
//   "total_tax_amounts": [],
//   "transfer_data": null,
//   "webhooks_delivered_at": null
// }
