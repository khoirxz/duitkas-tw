export interface ResponseProps {
  error: boolean;
  message: string;
}

export interface PaginationProps {
  total: number;
  page: number;
  limit: number;
}
