import { Icons } from '@/modules/common/components/icons/icons';
import { Component, inject, OnInit } from '@angular/core';
import { Tags } from '../../services/tags';

@Component({
  selector: 'app-list-tags',
  imports: [Icons],
  templateUrl: './list-tags.html',
  styleUrl: './list-tags.css',
  providers: [Tags],
})
export class ListTags implements OnInit {
  private readonly tagsService = inject(Tags);
  tags: string[] = [];
  errorMsg = '';

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagsService.getAll().subscribe({
      next: ({ tags }) => {
        this.tags = tags;
      },
      error: () => {
        this.errorMsg = 'Error al cargar las etiquetas';
      },
    });
  }
}
