// To parse this data:
//
//   import { Convert, PaymentLinkListType } from "./file";
//
//   const paymentLinkListType = Convert.toPaymentLinkListType(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface PaymentLinkListType {
  links: LinkElement[];
}

export interface LinkElement {
  price: Price;
  product: Product;
  link: LinkLink;
}

export interface LinkLink {
  consent_collection: null;
  custom_fields: any[];
  metadata: Metadata;
  submit_type: string;
  customer_creation: string;
  billing_address_collection: string;
  shipping_options: ShippingOption[];
  on_behalf_of: null;
  payment_method_collection: string;
  payment_intent_data: PaymentIntentData;
  application_fee_percent: number | null;
  invoice_creation: InvoiceCreation;
  phone_number_collection: AutomaticTax;
  subscription_data: SubscriptionData | null;
  shipping_address_collection: ShippingAddressCollection;
  custom_text: CustomText;
  url: string;
  payment_method_types: null;
  currency: string;
  application_fee_amount: null;
  automatic_tax: AutomaticTax;
  id: string;
  object: string;
  livemode: boolean;
  allow_promotion_codes: boolean;
  transfer_data: TransferData;
  after_completion: AfterCompletion;
  tax_id_collection: AutomaticTax;
  active: boolean;
}

export interface AfterCompletion {
  type: string;
  hosted_confirmation: HostedConfirmation;
}

export interface HostedConfirmation {
  custom_message: null;
}

export interface AutomaticTax {
  enabled: boolean;
}

export interface CustomText {
  submit: null;
  shipping_address: null;
}

export interface InvoiceCreation {
  invoice_data: InvoiceData;
  enabled: boolean;
}

export interface InvoiceData {
  rendering_options: null;
  custom_fields: null;
  footer: null;
  description: null;
  metadata: Metadata;
  account_tax_ids: null;
}

export interface Metadata {}

export interface PaymentIntentData {
  setup_future_usage: null;
  capture_method: string;
}

export interface ShippingAddressCollection {
  allowed_countries: string[];
}

export interface ShippingOption {
  shipping_amount: number;
  shipping_rate: string;
}

export interface SubscriptionData {
  description: null;
  trial_period_days: null;
}

export interface TransferData {
  amount: number | null;
  destination: string;
}

export interface Price {
  livemode: boolean;
  custom_unit_amount: null;
  recurring: Recurring | null;
  product: string;
  transform_quantity: null;
  unit_amount: number;
  nickname: null;
  tax_behavior: string;
  metadata: Metadata;
  active: boolean;
  object: string;
  tiers_mode: null;
  created: number;
  id: string;
  currency: string;
  billing_scheme: string;
  lookup_key: null;
  unit_amount_decimal: string;
  type: string;
}

export interface Recurring {
  interval: string;
  trial_period_days: null;
  aggregate_usage: null;
  usage_type: string;
  interval_count: number;
}

export interface Product {
  object: string;
  updated: number;
  id: string;
  active: boolean;
  statement_descriptor: null;
  shippable: null;
  attributes: any[];
  url: null;
  livemode: boolean;
  images: string[];
  package_dimensions: null;
  name: string;
  unit_label: null;
  tax_code: string;
  default_price: string;
  created: number;
  metadata: Metadata;
  description: string;
  type: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toPaymentLinkListType(json: string): PaymentLinkListType {
    return cast(JSON.parse(json), r("PaymentLinkListType"));
  }

  public static paymentLinkListTypeToJson(value: PaymentLinkListType): string {
    return JSON.stringify(uncast(value, r("PaymentLinkListType")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val
    )}`
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = ""
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  PaymentLinkListType: o(
    [{ json: "links", js: "links", typ: a(r("LinkElement")) }],
    false
  ),
  LinkElement: o(
    [
      { json: "price", js: "price", typ: r("Price") },
      { json: "product", js: "product", typ: r("Product") },
      { json: "link", js: "link", typ: r("LinkLink") },
    ],
    false
  ),
  LinkLink: o(
    [
      { json: "consent_collection", js: "consent_collection", typ: null },
      { json: "custom_fields", js: "custom_fields", typ: a("any") },
      { json: "metadata", js: "metadata", typ: r("Metadata") },
      { json: "submit_type", js: "submit_type", typ: "" },
      { json: "customer_creation", js: "customer_creation", typ: "" },
      {
        json: "billing_address_collection",
        js: "billing_address_collection",
        typ: "",
      },
      {
        json: "shipping_options",
        js: "shipping_options",
        typ: a(r("ShippingOption")),
      },
      { json: "on_behalf_of", js: "on_behalf_of", typ: null },
      {
        json: "payment_method_collection",
        js: "payment_method_collection",
        typ: "",
      },
      {
        json: "payment_intent_data",
        js: "payment_intent_data",
        typ: r("PaymentIntentData"),
      },
      {
        json: "application_fee_percent",
        js: "application_fee_percent",
        typ: u(0, null),
      },
      {
        json: "invoice_creation",
        js: "invoice_creation",
        typ: r("InvoiceCreation"),
      },
      {
        json: "phone_number_collection",
        js: "phone_number_collection",
        typ: r("AutomaticTax"),
      },
      {
        json: "subscription_data",
        js: "subscription_data",
        typ: u(r("SubscriptionData"), null),
      },
      {
        json: "shipping_address_collection",
        js: "shipping_address_collection",
        typ: r("ShippingAddressCollection"),
      },
      { json: "custom_text", js: "custom_text", typ: r("CustomText") },
      { json: "url", js: "url", typ: "" },
      { json: "payment_method_types", js: "payment_method_types", typ: null },
      { json: "currency", js: "currency", typ: "" },
      {
        json: "application_fee_amount",
        js: "application_fee_amount",
        typ: null,
      },
      { json: "automatic_tax", js: "automatic_tax", typ: r("AutomaticTax") },
      { json: "id", js: "id", typ: "" },
      { json: "object", js: "object", typ: "" },
      { json: "livemode", js: "livemode", typ: true },
      { json: "allow_promotion_codes", js: "allow_promotion_codes", typ: true },
      { json: "transfer_data", js: "transfer_data", typ: r("TransferData") },
      {
        json: "after_completion",
        js: "after_completion",
        typ: r("AfterCompletion"),
      },
      {
        json: "tax_id_collection",
        js: "tax_id_collection",
        typ: r("AutomaticTax"),
      },
      { json: "active", js: "active", typ: true },
    ],
    false
  ),
  AfterCompletion: o(
    [
      { json: "type", js: "type", typ: "" },
      {
        json: "hosted_confirmation",
        js: "hosted_confirmation",
        typ: r("HostedConfirmation"),
      },
    ],
    false
  ),
  HostedConfirmation: o(
    [{ json: "custom_message", js: "custom_message", typ: null }],
    false
  ),
  AutomaticTax: o([{ json: "enabled", js: "enabled", typ: true }], false),
  CustomText: o(
    [
      { json: "submit", js: "submit", typ: null },
      { json: "shipping_address", js: "shipping_address", typ: null },
    ],
    false
  ),
  InvoiceCreation: o(
    [
      { json: "invoice_data", js: "invoice_data", typ: r("InvoiceData") },
      { json: "enabled", js: "enabled", typ: true },
    ],
    false
  ),
  InvoiceData: o(
    [
      { json: "rendering_options", js: "rendering_options", typ: null },
      { json: "custom_fields", js: "custom_fields", typ: null },
      { json: "footer", js: "footer", typ: null },
      { json: "description", js: "description", typ: null },
      { json: "metadata", js: "metadata", typ: r("Metadata") },
      { json: "account_tax_ids", js: "account_tax_ids", typ: null },
    ],
    false
  ),
  Metadata: o([], false),
  PaymentIntentData: o(
    [
      { json: "setup_future_usage", js: "setup_future_usage", typ: null },
      { json: "capture_method", js: "capture_method", typ: "" },
    ],
    false
  ),
  ShippingAddressCollection: o(
    [{ json: "allowed_countries", js: "allowed_countries", typ: a("") }],
    false
  ),
  ShippingOption: o(
    [
      { json: "shipping_amount", js: "shipping_amount", typ: 0 },
      { json: "shipping_rate", js: "shipping_rate", typ: "" },
    ],
    false
  ),
  SubscriptionData: o(
    [
      { json: "description", js: "description", typ: null },
      { json: "trial_period_days", js: "trial_period_days", typ: null },
    ],
    false
  ),
  TransferData: o(
    [
      { json: "amount", js: "amount", typ: u(0, null) },
      { json: "destination", js: "destination", typ: "" },
    ],
    false
  ),
  Price: o(
    [
      { json: "livemode", js: "livemode", typ: true },
      { json: "custom_unit_amount", js: "custom_unit_amount", typ: null },
      { json: "recurring", js: "recurring", typ: u(r("Recurring"), null) },
      { json: "product", js: "product", typ: "" },
      { json: "transform_quantity", js: "transform_quantity", typ: null },
      { json: "unit_amount", js: "unit_amount", typ: 0 },
      { json: "nickname", js: "nickname", typ: null },
      { json: "tax_behavior", js: "tax_behavior", typ: "" },
      { json: "metadata", js: "metadata", typ: r("Metadata") },
      { json: "active", js: "active", typ: true },
      { json: "object", js: "object", typ: "" },
      { json: "tiers_mode", js: "tiers_mode", typ: null },
      { json: "created", js: "created", typ: 0 },
      { json: "id", js: "id", typ: "" },
      { json: "currency", js: "currency", typ: "" },
      { json: "billing_scheme", js: "billing_scheme", typ: "" },
      { json: "lookup_key", js: "lookup_key", typ: null },
      { json: "unit_amount_decimal", js: "unit_amount_decimal", typ: "" },
      { json: "type", js: "type", typ: "" },
    ],
    false
  ),
  Recurring: o(
    [
      { json: "interval", js: "interval", typ: "" },
      { json: "trial_period_days", js: "trial_period_days", typ: null },
      { json: "aggregate_usage", js: "aggregate_usage", typ: null },
      { json: "usage_type", js: "usage_type", typ: "" },
      { json: "interval_count", js: "interval_count", typ: 0 },
    ],
    false
  ),
  Product: o(
    [
      { json: "object", js: "object", typ: "" },
      { json: "updated", js: "updated", typ: 0 },
      { json: "id", js: "id", typ: "" },
      { json: "active", js: "active", typ: true },
      { json: "statement_descriptor", js: "statement_descriptor", typ: null },
      { json: "shippable", js: "shippable", typ: null },
      { json: "attributes", js: "attributes", typ: a("any") },
      { json: "url", js: "url", typ: null },
      { json: "livemode", js: "livemode", typ: true },
      { json: "images", js: "images", typ: a("") },
      { json: "package_dimensions", js: "package_dimensions", typ: null },
      { json: "name", js: "name", typ: "" },
      { json: "unit_label", js: "unit_label", typ: null },
      { json: "tax_code", js: "tax_code", typ: "" },
      { json: "default_price", js: "default_price", typ: "" },
      { json: "created", js: "created", typ: 0 },
      { json: "metadata", js: "metadata", typ: r("Metadata") },
      { json: "description", js: "description", typ: "" },
      { json: "type", js: "type", typ: "" },
    ],
    false
  ),
};
