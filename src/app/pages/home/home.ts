import { ListArticles } from '@/modules/articles/components/list-articles/list-articles';
import { TagStore } from '@/modules/articles/services/tag-store/tag-store';
import { InfiniteScrollComponent } from '@/modules/common/components/infinite-scroll/infinite-scroll.component';
import { SubManager } from '@/modules/common/services/sub-manager/sub-manager';
import { Component, inject, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [ListArticles, InfiniteScrollComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [SubManager],
})
export class Home {
  @ViewChild('listArticles') listArticles!: ListArticles;
  private readonly tagStore = inject(TagStore);

  getTag(): string | undefined {
    return this.tagStore.get();
  }
}
