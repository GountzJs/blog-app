import { ClearTag } from '@/modules/articles/components/clear-tag/clear-tag';
import { ListTags } from '@/modules/articles/components/list-tags/list-tags';
import { TagStore } from '@/modules/articles/services/tag-store/tag-store';
import { SubManager } from '@/modules/common/services/sub-manager/sub-manager';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, ListTags, ClearTag],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
  providers: [SubManager],
})
export class DashboardLayout implements OnInit, OnDestroy {
  private readonly aRoute = inject(ActivatedRoute);
  private readonly subManager = inject(SubManager);
  private readonly tagStore = inject(TagStore);

  ngOnInit(): void {
    this.getParams();
  }

  ngOnDestroy(): void {
    this.subManager.destroy();
  }

  getParams(): void {
    const sub = this.aRoute.queryParams.subscribe((params) => {
      const tag = params['tag'] || undefined;
      this.tagStore.set(tag);
    });
    this.subManager.add(sub, 'get-params');
  }

  getTag(): string | undefined {
    return this.tagStore.get();
  }
}
