import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-tags',
  imports: [],
  templateUrl: './article-tags.html',
  styleUrl: './article-tags.css',
})
export class ArticleTags {
  @Input() tagList: string[] = [];
}
