import { ListArticlesFeed } from '@/modules/articles/components/list-articles-feed/list-articles-feed';
import { InfiniteScroll } from '@/modules/common/components/infinite-scroll/infinite-scroll.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-your-feed',
  imports: [ListArticlesFeed, InfiniteScroll],
  templateUrl: './your-feed.html',
  styleUrl: './your-feed.css',
})
export class YourFeed {}
