import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.css',
})
export class BaseLayout {
  private location = inject(Location);

  isActive(url: string) {
    return this.location.path() === url;
  }
}
