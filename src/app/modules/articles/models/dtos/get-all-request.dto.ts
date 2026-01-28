export interface GetAllRequestDTO {
  tag?: string;
  author?: string;
  favorited?: boolean;
  limit?: number;
  offset?: number;
}
