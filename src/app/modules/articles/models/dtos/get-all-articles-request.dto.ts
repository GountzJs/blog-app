export interface GetAllArticlesRequestDTO {
  tag?: string;
  author?: string;
  favorited?: boolean;
  limit?: number;
  offset?: number;
}
