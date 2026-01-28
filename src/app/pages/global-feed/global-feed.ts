import { ListArticles } from '@/modules/articles/components/list-articles/list-articles';
import { TagStore } from '@/modules/articles/services/tag-store/tag-store';
import { InfiniteScrollComponent } from '@/modules/common/components/infinite-scroll/infinite-scroll.component';
import { SubManager } from '@/modules/common/services/sub-manager/sub-manager';
import { Component, inject, ViewChild } from '@angular/core';

@Component({
  selector: 'app-global-feed',
  imports: [ListArticles, InfiniteScrollComponent],
  templateUrl: './global-feed.html',
  styleUrl: './global-feed.css',
  providers: [SubManager],
})
export class GlobalFeed {
  @ViewChild('listArticles') listArticles!: ListArticles;
  private readonly tagStore = inject(TagStore);

  getTag(): string | undefined {
    return this.tagStore.get();
  }
}
