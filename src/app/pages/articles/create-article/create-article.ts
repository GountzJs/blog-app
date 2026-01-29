import { FormCreate } from '@/modules/articles/components/form-create/form-create';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-article',
  imports: [FormCreate],
  templateUrl: './create-article.html',
  styleUrl: './create-article.css',
})
export class CreateArticle {}
