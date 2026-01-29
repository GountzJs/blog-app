import { ClearTag } from '@/modules/articles/components/clear-tag/clear-tag';
import { ListTags } from '@/modules/articles/components/list-tags/list-tags';
import { TagStore } from '@/modules/articles/services/tag-store/tag-store';
import { SubManager } from '@/modules/common/services/sub-manager/sub-manager';
import { Location, NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, RouterLink, ListTags, ClearTag, NgClass],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
  providers: [SubManager],
})
export class DashboardLayout implements OnInit, OnDestroy {
  private readonly aRoute = inject(ActivatedRoute);
  private readonly tagStore = inject(TagStore);
  private readonly location = inject(Location);
  private readonly subManager = inject(SubManager);

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
    this.subManager.add(sub, 'get-queryparams-tags');
  }

  getTag(): string | undefined {
    return this.tagStore.get();
  }

  isActive(path: string): boolean {
    return this.location.path().split('?')[0] === path;
  }
}
