export interface APIResponse<T> {
  ok: boolean;
  status: "success" | "error";
  message: string;
  documentId?: string;
  data: T | any;
  error?: any;
}
