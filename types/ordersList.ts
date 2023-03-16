// To parse this data:
//
//   import { Convert } from "./file";
//
//   const ordersList = Convert.toOrdersList(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface OrdersList {
  _fieldsProto: FieldsProto;
  _ref: Ref;
  _serializer: Serializer;
  _readTime: Time;
  _createTime: Time;
  _updateTime: Time;
}

export interface Time {
  _seconds: number;
  _nanoseconds: number;
}

export interface FieldsProto {
  givenShippingDetails: GivenShippingDetails;
  customer: Customer;
  products: Products;
}

export interface Customer {
  mapValue: CustomerMapValue;
  valueType: string;
}

export interface CustomerMapValue {
  fields: PurpleFields;
}

export interface PurpleFields {
  address: PurpleAddress;
  phone: GivenShippingDetails;
  name: Email;
  id: Email;
  email: Email;
  customer_standard_shipping_address: CustomerStandardShippingAddress;
}

export interface PurpleAddress {
  mapValue: PurpleMapValue;
  valueType: string;
}

export interface PurpleMapValue {
  fields: FluffyFields;
}

export interface FluffyFields {
  country: Email;
  city: Email;
  state: GivenShippingDetails;
  postal_code: Email;
  line2: GivenShippingDetails;
  line1: Email;
}

export interface Email {
  stringValue: string;
  valueType: ValueType;
}

export enum ValueType {
  StringValue = "stringValue",
}

export interface GivenShippingDetails {
  nullValue: string;
  valueType: string;
}

export interface CustomerStandardShippingAddress {
  mapValue: CustomerStandardShippingAddressMapValue;
  valueType: string;
}

export interface CustomerStandardShippingAddressMapValue {
  fields: TentacledFields;
}

export interface TentacledFields {
  address: FluffyAddress;
  phone: GivenShippingDetails;
  name: Email;
}

export interface FluffyAddress {
  mapValue: FluffyMapValue;
  valueType: string;
}

export interface FluffyMapValue {
  fields: StickyFields;
}

export interface StickyFields {
  country: Email;
  city: Email;
  state: Email;
  postal_code: Email;
  line2: GivenShippingDetails;
  line1: Email;
}

export interface Products {
  arrayValue: ArrayValue;
  valueType: string;
}

export interface ArrayValue {
  values: Value[];
}

export interface Value {
  mapValue: ValueMapValue;
  valueType: string;
}

export interface ValueMapValue {
  fields: IndigoFields;
}

export interface IndigoFields {
  image: Email;
  metaData: MetaData;
  name: Email;
  id: Email;
}

export interface MetaData {
  mapValue: MetaDataMapValue;
  valueType: string;
}

export interface MetaDataMapValue {
  fields: Converter;
}

export interface Converter {}

export interface Ref {
  _firestore: Firestore;
  _path: Path;
  _converter: Converter;
}

export interface Firestore {
  projectId: string;
}

export interface Path {
  segments: string[];
  projectId: string;
  databaseId: string;
}

export interface Serializer {
  allowUndefined: boolean;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toOrdersList(json: string): OrdersList[] {
    return cast(JSON.parse(json), a(r("OrdersList")));
  }

  public static ordersListToJson(value: OrdersList[]): string {
    return JSON.stringify(uncast(value, a(r("OrdersList"))), null, 2);
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
  OrdersList: o(
    [
      { json: "_fieldsProto", js: "_fieldsProto", typ: r("FieldsProto") },
      { json: "_ref", js: "_ref", typ: r("Ref") },
      { json: "_serializer", js: "_serializer", typ: r("Serializer") },
      { json: "_readTime", js: "_readTime", typ: r("Time") },
      { json: "_createTime", js: "_createTime", typ: r("Time") },
      { json: "_updateTime", js: "_updateTime", typ: r("Time") },
    ],
    false
  ),
  Time: o(
    [
      { json: "_seconds", js: "_seconds", typ: 0 },
      { json: "_nanoseconds", js: "_nanoseconds", typ: 0 },
    ],
    false
  ),
  FieldsProto: o(
    [
      {
        json: "givenShippingDetails",
        js: "givenShippingDetails",
        typ: r("GivenShippingDetails"),
      },
      { json: "customer", js: "customer", typ: r("Customer") },
      { json: "products", js: "products", typ: r("Products") },
    ],
    false
  ),
  Customer: o(
    [
      { json: "mapValue", js: "mapValue", typ: r("CustomerMapValue") },
      { json: "valueType", js: "valueType", typ: "" },
    ],
    false
  ),
  CustomerMapValue: o(
    [{ json: "fields", js: "fields", typ: r("PurpleFields") }],
    false
  ),
  PurpleFields: o(
    [
      { json: "address", js: "address", typ: r("PurpleAddress") },
      { json: "phone", js: "phone", typ: r("GivenShippingDetails") },
      { json: "name", js: "name", typ: r("Email") },
      { json: "id", js: "id", typ: r("Email") },
      { json: "email", js: "email", typ: r("Email") },
      {
        json: "customer_standard_shipping_address",
        js: "customer_standard_shipping_address",
        typ: r("CustomerStandardShippingAddress"),
      },
    ],
    false
  ),
  PurpleAddress: o(
    [
      { json: "mapValue", js: "mapValue", typ: r("PurpleMapValue") },
      { json: "valueType", js: "valueType", typ: "" },
    ],
    false
  ),
  PurpleMapValue: o(
    [{ json: "fields", js: "fields", typ: r("FluffyFields") }],
    false
  ),
  FluffyFields: o(
    [
      { json: "country", js: "country", typ: r("Email") },
      { json: "city", js: "city", typ: r("Email") },
      { json: "state", js: "state", typ: r("GivenShippingDetails") },
      { json: "postal_code", js: "postal_code", typ: r("Email") },
      { json: "line2", js: "line2", typ: r("GivenShippingDetails") },
      { json: "line1", js: "line1", typ: r("Email") },
    ],
    false
  ),
  Email: o(
    [
      { json: "stringValue", js: "stringValue", typ: "" },
      { json: "valueType", js: "valueType", typ: r("ValueType") },
    ],
    false
  ),
  GivenShippingDetails: o(
    [
      { json: "nullValue", js: "nullValue", typ: "" },
      { json: "valueType", js: "valueType", typ: "" },
    ],
    false
  ),
  CustomerStandardShippingAddress: o(
    [
      {
        json: "mapValue",
        js: "mapValue",
        typ: r("CustomerStandardShippingAddressMapValue"),
      },
      { json: "valueType", js: "valueType", typ: "" },
    ],
    false
  ),
  CustomerStandardShippingAddressMapValue: o(
    [{ json: "fields", js: "fields", typ: r("TentacledFields") }],
    false
  ),
  TentacledFields: o(
    [
      { json: "address", js: "address", typ: r("FluffyAddress") },
      { json: "phone", js: "phone", typ: r("GivenShippingDetails") },
      { json: "name", js: "name", typ: r("Email") },
    ],
    false
  ),
  FluffyAddress: o(
    [
      { json: "mapValue", js: "mapValue", typ: r("FluffyMapValue") },
      { json: "valueType", js: "valueType", typ: "" },
    ],
    false
  ),
  FluffyMapValue: o(
    [{ json: "fields", js: "fields", typ: r("StickyFields") }],
    false
  ),
  StickyFields: o(
    [
      { json: "country", js: "country", typ: r("Email") },
      { json: "city", js: "city", typ: r("Email") },
      { json: "state", js: "state", typ: r("Email") },
      { json: "postal_code", js: "postal_code", typ: r("Email") },
      { json: "line2", js: "line2", typ: r("GivenShippingDetails") },
      { json: "line1", js: "line1", typ: r("Email") },
    ],
    false
  ),
  Products: o(
    [
      { json: "arrayValue", js: "arrayValue", typ: r("ArrayValue") },
      { json: "valueType", js: "valueType", typ: "" },
    ],
    false
  ),
  ArrayValue: o([{ json: "values", js: "values", typ: a(r("Value")) }], false),
  Value: o(
    [
      { json: "mapValue", js: "mapValue", typ: r("ValueMapValue") },
      { json: "valueType", js: "valueType", typ: "" },
    ],
    false
  ),
  ValueMapValue: o(
    [{ json: "fields", js: "fields", typ: r("IndigoFields") }],
    false
  ),
  IndigoFields: o(
    [
      { json: "image", js: "image", typ: r("Email") },
      { json: "metaData", js: "metaData", typ: r("MetaData") },
      { json: "name", js: "name", typ: r("Email") },
      { json: "id", js: "id", typ: r("Email") },
    ],
    false
  ),
  MetaData: o(
    [
      { json: "mapValue", js: "mapValue", typ: r("MetaDataMapValue") },
      { json: "valueType", js: "valueType", typ: "" },
    ],
    false
  ),
  MetaDataMapValue: o(
    [{ json: "fields", js: "fields", typ: r("Converter") }],
    false
  ),
  Converter: o([], false),
  Ref: o(
    [
      { json: "_firestore", js: "_firestore", typ: r("Firestore") },
      { json: "_path", js: "_path", typ: r("Path") },
      { json: "_converter", js: "_converter", typ: r("Converter") },
    ],
    false
  ),
  Firestore: o([{ json: "projectId", js: "projectId", typ: "" }], false),
  Path: o(
    [
      { json: "segments", js: "segments", typ: a("") },
      { json: "projectId", js: "projectId", typ: "" },
      { json: "databaseId", js: "databaseId", typ: "" },
    ],
    false
  ),
  Serializer: o(
    [{ json: "allowUndefined", js: "allowUndefined", typ: true }],
    false
  ),
  ValueType: ["stringValue"],
};
