import HttpErrorHandler from "../errors/errorHandler";

export default class HTTPClient {
  private baseUrl: string;
  private errorHandler = new HttpErrorHandler();
  private baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: "Bearer YOUR_TOKEN_HERE",
    "Cache-Control": "no-cache",
  };

  constructor(baseUrl: string, headers?: Record<string, string>) {
    if (!this.errorHandler.isValidUrl(baseUrl))
      throw new Error("provided base url is not of the correct structure");

    this.baseUrl = baseUrl;
    if (headers) {
      for (const key in headers) {
        this.baseHeaders[key] = headers[key];
      }
    }
  }

  async get<T>(endpoint: string, cache?: boolean) {
    if (
      !this.errorHandler.validateInputs({ endpoint: endpoint, method: "GET" })
    )
      return;
    console.log(this.baseUrl + endpoint);

    console.log(cache);

    const responseValidation = await this.errorHandler.handleFetch(
      fetch(this.baseUrl + endpoint, {
        headers: this.baseHeaders,
        method: "GET",
        cache: cache ? "no-store" : "default",
        next: {
          revalidate: 0,
        },
      })
    );

    if (!responseValidation?.valid) {
      console.error(responseValidation?.error);
      return;
    }
    return responseValidation.data!;
  }
  async delete<T>(endpoint: string) {
    if (
      !this.errorHandler.validateInputs({
        endpoint: endpoint,
        method: "DELETE",
      })
    )
      return;

    const responseValidation = await this.errorHandler.handleFetch(
      fetch(this.baseUrl + endpoint, {
        headers: this.baseHeaders,
        method: "DELETE",
      })
    );

    if (!responseValidation?.valid) {
      console.error(responseValidation?.error);
      return;
    }

    return responseValidation.data!;
  }
  async post<T>(endpoint: string, body: Record<string, any>) {
    if (
      !this.errorHandler.validateInputs({
        endpoint: endpoint,
        body: body,
        method: "POST",
      })
    ) {
      return;
    }

    const responseValidation = await this.errorHandler.handleFetch(
      fetch(this.baseUrl + endpoint, {
        body: JSON.stringify(body),
        headers: this.baseHeaders,
        method: "POST",
      })
    );

    if (!responseValidation?.valid) {
      console.log(responseValidation?.error);
      return;
    }

    return responseValidation.data!;
  }
  async put<T>(endpoint: string, body: Record<string, any>) {
    if (
      !this.errorHandler.validateInputs({
        endpoint: endpoint,
        body: body,
        method: "PUT",
      })
    )
      return;

    const responseValidation = await this.errorHandler.handleFetch(
      fetch(this.baseUrl + endpoint, {
        headers: this.baseHeaders,
        method: "PUT",
        body: JSON.stringify(body),
      })
    );

    if (!responseValidation?.valid) {
      console.error(responseValidation?.error);
      return;
    }

    return responseValidation.data!;
  }
  async patch<T>(endpoint: string, body: Record<string, any>) {
    if (
      !this.errorHandler.validateInputs({
        endpoint: endpoint,
        method: "PATCH",
        body: body,
      })
    )
      return;

    const responseValidation = await this.errorHandler.handleFetch(
      fetch(this.baseUrl + endpoint, {
        headers: this.baseHeaders,
        method: "PATCH",
        body: JSON.stringify(body),
      })
    );

    if (!responseValidation?.valid) {
      console.log(responseValidation?.error);
      return;
    }

    return responseValidation.data!;
  }
}
