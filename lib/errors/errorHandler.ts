import homeUrl from "../constants/urls";

type ValidationResult = {
  valid: boolean;
  errors: string[];
};

type FetchResponseResult<T> = {
  data?: T;
  error?: string;
  valid: boolean;
};

export default class HttpErrorHandler {
  async handleFetch<T>(
    responsePromise: Promise<Response>
  ): Promise<FetchResponseResult<T> | undefined> {
    try {
      const response = await Promise.resolve(responsePromise);
      if (!this.validateResponse(response)) return;

      try {
        return { data: (await response.json()) as T, valid: true };
      } catch (parsingError: any) {
        return {
          error: `Error parsing JSON: ${parsingError.message}`,
          valid: false,
        };
      }
    } catch (networkError: any) {
      return { error: `Network error: ${networkError.message}`, valid: false };
    }
  }

  validateResponse(response: Response) {
    console.log(response.ok + " in validate response");

    if (!response.ok) {
      let errorMessage = `HTTP error: ${response.status}`;
      switch (response.status) {
        // Client Errors (4xx)
        case 400:
          errorMessage = "400 Bad Request";
          break;
        case 401:
          errorMessage = "401 Unauthorized - Authentication is required";
          break;
        case 403:
          errorMessage = "403 Forbidden - Access denied";
          break;
        case 404:
          errorMessage = "404 Not Found - The resource could not be found";
          break;
        // Server Errors (5xx)
        case 500:
          errorMessage = "500 Internal Server Error";
          break;
        case 503:
          errorMessage = "503 Service Unavailable";
          break;
        default:
          errorMessage += ` ${response.statusText}`;
          break;
      }

      console.error(
        "Error:",
        errorMessage,
        "request url: ",
        response.url,
        "body: ",
        response.body,
        "type: ",
        response.type
      );
      return false;
    } else {
      return true;
    }
  }

  validateInputs({
    endpoint,
    body,
    method,
  }: {
    endpoint: string;
    body?: any;
    method: "GET" | "PUT" | "DELETE" | "POST" | "PATCH" | "OPTIONS";
  }) {
    const isValidPath = this.isValidEndpoint(endpoint);

    switch (method) {
      case "GET":
        if (isValidPath) {
          return true;
        } else {
          throw new Error(
            `Provided endpoint/inputs for get request was invalid ${endpoint}`
          );
        }
      case "DELETE":
        if (isValidPath) {
          return true;
        } else {
          throw new Error(
            "Provided endpoint/inputs for DELETE request was invalid"
          );
        }
      case "POST":
        if (isValidPath) {
          return true;
        } else {
          throw new Error(
            `Provided endpoint/inputs for POST request was invalid body:${
              this.isValidJsonBody(body).errors
            } endpoint: ${isValidPath} `
          );
        }

      case "PUT":
        if (isValidPath && this.isValidJsonBody(body).valid) {
          return true;
        } else {
          throw new Error(
            `Provided endpoint/inputs for PUT request was invalid body:${
              this.isValidJsonBody(body).errors
            } endpoint: ${isValidPath} `
          );
        }
      case "PATCH":
        if (isValidPath && this.isValidJsonBody(body).valid) {
          return true;
        } else {
          throw new Error(
            `Provided endpoint/inputs for PATCH request was invalid body:${
              this.isValidJsonBody(body).errors
            } endpoint: ${isValidPath} `
          );
        }
      default:
        throw new Error("http method not specified");
    }
  }

  isValidUrl(url: string): boolean {
    // Regular expression pattern to match a valid URL with a common TLD
    try {
      // Create a full URL by combining the base URL with the provided path
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  private isValidEndpoint(endpoint: string) {
    try {
      // Create a full URL by combining the base URL with the provided path
      new URL(endpoint, homeUrl);
      return true;
    } catch (error) {
      return false;
    }
  }

  private isValidJsonBody(body: any): ValidationResult {
    const errors: string[] = [];

    const checkValue = (value: any, path: string) => {
      if (value === undefined) {
        errors.push(`Invalid value 'undefined' at path '${path}'`);
        return;
      }

      if (typeof value === "function") {
        errors.push(`Invalid function at path '${path}'`);
        return;
      }

      if (value !== null && typeof value === "object") {
        if (seen.has(value)) {
          errors.push(`Circular reference detected at path '${path}'`);
          return;
        }
        seen.add(value);
        for (const [key, val] of Object.entries(value)) {
          checkValue(val, `${path}/${key}`);
        }
      }
    };

    const seen = new WeakSet();
    checkValue(body, "");

    if (errors.length === 0) {
      try {
        JSON.stringify(body);
        return { valid: true, errors: [] };
      } catch (error) {
        return { valid: false, errors: ["Error during stringification"] };
      }
    } else {
      return { valid: false, errors: errors };
    }
  }

  private isGetRequestPathValid(url: string): boolean {
    const getPathPattern =
      /^\/[\w\-._~!$&'()*+,;=:@\/%]+\??([\w\-._~!$&'()*+,;=:@\/%]*=[\w\-._~!$&'()*+,;=:@\/%]*(&[\w\-._~!$&'()*+,;=:@\/%]*=[\w\-._~!$&'()*+,;=:@\/%]*)*)?$/i;
    return getPathPattern.test(url);
  }
}
