export interface AppResponse<T = any> {
  status: number;
  message: string;
  data: T | null;
}
