import homeUrl from "@/lib/constants/urls";
import HTTPClient from "../../client/client";

const client = new HTTPClient(homeUrl);

export enum HTTPMethods {
  GET,
  DELETE,
  POST,
  PATCH,
  PUT,
}

export interface IDynamicEndpointMethod<T extends Record<string, any>> {
  data?: T;
  dynamicEndpoint: string;
}

export interface IEndpointMethod<T extends Record<string, any>> {
  data: T;
}

// User-defined type guards

export default class ApiBuilderHelper {
  createAPIMethod<
    T extends
      | Record<string, any>
      | IDynamicEndpointMethod<any>
      | IEndpointMethod<any>,
    R = any
  >(path: string, method: HTTPMethods, dynamicPath?: string, cache?: boolean) {
    path = "/api" + path;

    switch (method) {
      case HTTPMethods.GET:
        return async (input: T) => {
          if (this.isDynamicEndpointMethod(input)) {
            return client.get(
              `${path}${input.dynamicEndpoint}${
                input.data && this.generateUserQueryParams(input.data)
              }`,
              cache
            ) as Promise<R>;
          } else if (this.isEndpointMethod(input)) {
            return client.get(
              `${path}${this.generateUserQueryParams(input.data)}`,
              cache
            ) as Promise<R>;
          }
        };
      case HTTPMethods.DELETE:
        return async (input: T) => {
          if (this.isDynamicEndpointMethod(input)) {
            return client.delete(
              `${path}${input.dynamicEndpoint}${this.generateUserQueryParams(
                input.data ?? {}
              )}`
            ) as Promise<R>;
          } else if (this.isEndpointMethod(input)) {
            return client.delete(
              `${path}${this.generateUserQueryParams(input.data)}`
            ) as Promise<R>;
          }
        };
      case HTTPMethods.POST:
        return async (input: T) => {
          const endpoint = this.isDynamicEndpointMethod(input)
            ? path + dynamicPath
            : path;
          return client.post(
            endpoint,
            input.data as Record<string, any>
          ) as Promise<R>;
        };
      case HTTPMethods.PATCH:
        return async (input: T) => {
          const endpoint = this.isDynamicEndpointMethod(input)
            ? path + dynamicPath
            : path;
          return client.patch(
            endpoint,
            input.data as Record<string, any>
          ) as Promise<R>;
        };
      case HTTPMethods.PUT:
        return async (input: T) => {
          const endpoint = this.isDynamicEndpointMethod(input)
            ? path + dynamicPath
            : path;
          return client.put(
            endpoint,
            input.data as Record<string, any>
          ) as Promise<R>;
        };
    }
  }
  private generateUserQueryParams = <T extends Record<string, any>>(
    input: T
  ): string => {
    const queryParts = Object.entries(input).map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue =
        typeof value === "object" && value !== null
          ? encodeURIComponent(JSON.stringify(value))
          : encodeURIComponent(String(value));
      return `${encodedKey}=${encodedValue}`;
    });

    // Join the parts with '&' and prepend with '?' to form the complete query string
    return `?${queryParts.join("&")}`;
  };

  private isDynamicEndpointMethod<T extends Record<string, any>>(
    obj: any
  ): obj is IDynamicEndpointMethod<T> {
    return (
      obj &&
      typeof obj.dynamicEndpoint === "string" &&
      typeof obj.data === "object"
    );
  }

  private isEndpointMethod<T extends Record<string, any>>(
    obj: any
  ): obj is IEndpointMethod<T> {
    return obj && typeof obj.data === "object";
  }
}
