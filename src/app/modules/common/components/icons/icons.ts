import { NgStyle } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconName } from './icon-name.type';
import { Icon } from './services/icon';

@Component({
  selector: 'app-icons',
  imports: [NgStyle],
  template: `<span [innerHTML]="svg" [ngStyle]="{ width: size, height: size }"></span>`,
  styleUrl: './icons.css',
  providers: [Icon],
})
export class Icons {
  @Input() name?: IconName;
  @Input() color = '#fff';
  @Input() size = '24px';

  private readonly icon = inject(Icon);
  private readonly domSanitizer = inject(DomSanitizer);

  private getIcon(): string {
    if (!this.name) return '';
    return this.icon.getIcon(this.name, this.color);
  }

  get svg(): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(this.getIcon());
  }
}
