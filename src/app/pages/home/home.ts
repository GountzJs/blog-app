import { ListArticles } from '@/modules/articles/components/list-articles/list-articles';
import { ListTags } from '@/modules/articles/components/list-tags/list-tags';
import { Icons } from '@/modules/common/components/icons/icons';
import { SubManager } from '@/modules/common/services/sub-manager/sub-manager';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ListTags, ListArticles, Icons],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [SubManager],
})
export class Home implements OnInit, OnDestroy {
  private readonly aRoute = inject(ActivatedRoute);
  private readonly subManager = inject(SubManager);
  private readonly router = inject(Router);
  tag = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.getParams();
  }

  ngOnDestroy(): void {
    this.subManager.destroy();
  }

  getParams(): void {
    const sub = this.aRoute.queryParams.subscribe((params) => {
      const tag = params['tag'] || undefined;
      this.tag.set(tag);
    });
    this.subManager.add(sub, 'get-params');
  }

  clearTag(): void {
    this.router.navigate(['/']);
  }
}
