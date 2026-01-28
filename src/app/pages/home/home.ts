import { ListArticles } from '@/modules/articles/components/list-articles/list-articles';
import { ListTags } from '@/modules/articles/components/list-tags/list-tags';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [ListTags, ListArticles],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
