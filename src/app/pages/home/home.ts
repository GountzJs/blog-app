import { ListArticles } from '@/modules/articles/components/list-articles/list-articles';
import { ListTags } from '@/modules/articles/components/list-tags/list-tags';
import { SubManager } from '@/modules/common/services/sub-manager/sub-manager';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ListTags, ListArticles],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [SubManager],
})
export class Home implements OnInit {
  private readonly router = inject(ActivatedRoute);
  private readonly subManager = inject(SubManager);
  tag = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    const sub = this.router.params.subscribe((params) => {
      const tag = params['tag'] || undefined;
      this.tag.set(tag);
    });
    this.subManager.add(sub, 'get-params');
  }
}
