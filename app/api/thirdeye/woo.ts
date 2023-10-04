import stripe from "@/lib/stripe/stripe";
import { envConfig } from "@/lib/webhooks/envConfig";
import { LineItem, WooCreateOrderModel } from "@/types/typings";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import Stripe from "stripe";

export async function createWoocommerceOrder(order: WooCreateOrderModel) {
    return await fetchPostJSON(`https://www.thirdeyetribe.co.uk/wp-json/wc/v3/orders?consumer_key=${envConfig.THIRDEYE_KEY}&consumer_secret=${envConfig.THIRDEYE_SECRET}`, order);
}

export async function convertStripeInvoiceToWoocommerceOrder(invoice: Stripe.Invoice) {
    const productIds = invoice.lines.data.map((line) => line.price!.product as string);
    const products = await stripe.products.list({ids: productIds, limit: 100});
    
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
        image: products.data[i].images[0] ?? "https://www.sacbe-ceremonial-cacao.com/logo.svg",
        quantity: invoice.lines.data[i].quantity ?? "non quantity",
        cost: invoice.lines.data[i].amount ?? 0,
        subscriptionId: invoice.lines.data[i].subscription ?? "no sub id",
        };
        productList.push(product);
    }

    const order: WooCreateOrderModel = {
        billing: {
            address_1: invoice.customer_address?.line1 ?? '',
            address_2: invoice.customer_address?.line2 ?? '',
            city: invoice.customer_address?.city ?? '',
            country: invoice.customer_address?.country ?? '',
            first_name: invoice.customer_name?? " ",
            last_name: '',
            postcode: invoice.customer_address?.postal_code ?? "",
            state: invoice.customer_address?.state ?? '',
            email: invoice.customer_email??'',
        },
        shipping: {
            address_1: invoice.customer_address?.line1 ?? '',
            address_2: invoice.customer_address?.line2 ?? '',
            city: invoice.customer_address?.city ?? '',
            country: invoice.customer_address?.country ?? '',
            first_name: invoice.customer_name?? " ",
            last_name: '',
            postcode: invoice.customer_address?.postal_code ?? "",
            state: invoice.customer_address?.state ?? '',
            email: invoice.customer_email??'',
        },
        line_items: productList.map((p) => { 
                return {
                    product_id: 5188,
                    quantity: p.quantity,
                } as LineItem;
            }),
        payment_method: 'Sacbe Stripe Integration - Card',
        payment_method_title: "Sacbe Stripe Integration",
        set_paid: true,
        shipping_lines: [
            {
                method_id: invoice.shipping_cost?.shipping_rate as string ?? 'see order for shipping',
                method_title: (await stripe.shippingRates.retrieve(invoice.shipping_cost?.shipping_rate as string)).display_name ?? 'Nameless shipping rate ',
                total: (invoice.amount_shipping / 100).toFixed(2),
            }
        ]
    }
    
    
    return order;
}