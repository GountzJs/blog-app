import { Icons } from '@/modules/common/components/icons/icons';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clear-tag',
  imports: [Icons],
  templateUrl: './clear-tag.html',
  styleUrl: './clear-tag.css',
})
export class ClearTag {
  @Input() tag?: string;
  private readonly router = inject(Router);

  clearTag(): void {
    this.router.navigate(['/']);
  }
}
