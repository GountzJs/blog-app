import { Icons } from '@/modules/common/components/icons/icons';
import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  imports: [RouterLink, RouterOutlet, Icons],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.css',
})
export class BaseLayout {
  private readonly location = inject(Location);

  isActive(url: string) {
    return this.location.path().split('?')[0] === url;
  }
}
