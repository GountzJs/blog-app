import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appElipsisText]',
})
export class ElipsisText implements OnInit {
  @Input() max = 10;
  @Input() elipsisText = '';

  private readonly el = inject(ElementRef);

  ngOnInit() {
    const text = this.elipsisText;

    if (text && text.length > this.max) {
      this.el.nativeElement.textContent = text.substring(0, this.max) + '...';
    } else if (text) {
      this.el.nativeElement.textContent = text;
    }
  }
}
