import { environment } from '@env/environment';
import { http, HttpResponse } from 'msw';
import { Article } from './article.interface';

export const handlers = [
  // Get Articles Feed
  http.get(`${environment.apiUrl}/articles/feed`, async ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') ?? '10');
    const offset = Number(url.searchParams.get('offset') ?? '0');

    const response = await fetch('/data/articles.json');
    const data = await response.json();
    let articles: Article[] = data.articles;

    const articlesCount = articles.length;
    articles = articles.slice(offset, offset + limit);

    return HttpResponse.json({ articles, articlesCount }, { status: 200 });
  }),

  // Get Articles Globally
  http.get(`${environment.apiUrl}/articles`, async ({ request }) => {
    const url = new URL(request.url);
    const tag = url.searchParams.get('tag');
    const author = url.searchParams.get('author');
    const favorited = url.searchParams.get('favorited');
    const limit = Number(url.searchParams.get('limit') ?? '10');
    const offset = Number(url.searchParams.get('offset') ?? '0');

    const response = await fetch('/data/articles.json');
    const data = await response.json();
    let articles: Article[] = data.articles;

    if (tag) {
      articles = articles.filter((article: Article) => article.tagList.includes(tag));
    }

    if (author) {
      articles = articles.filter((article: Article) => article.author.username === author);
    }

    if (favorited) {
      articles = articles.filter((article: Article) => article.favorited);
    }

    const articlesCount = articles.length;
    articles = articles.slice(offset, offset + limit);

    return HttpResponse.json({ articles, articlesCount }, { status: 200 });
  }),

  // Create Article
  http.post(`${environment.apiUrl}/articles`, () => {
    return HttpResponse.json({}, { status: 201 });
  }),

  // Get Article
  http.get(`${environment.apiUrl}/articles/:slug`, async ({ params }) => {
    const { slug } = params;
    const response = await fetch('/data/articles.json');
    const data = await response.json();
    const article = data.articles.find((a: Article) => a.slug === slug);

    if (article) {
      return HttpResponse.json({ article }, { status: 200 });
    }
    return HttpResponse.json({ errors: { body: ['Article not found'] } }, { status: 404 });
  }),

  // Update Article
  http.put(`${environment.apiUrl}/articles/:slug`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Delete Article
  http.delete(`${environment.apiUrl}/articles/:slug`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
