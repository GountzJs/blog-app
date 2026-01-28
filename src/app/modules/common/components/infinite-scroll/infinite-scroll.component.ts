import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.css',
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() isLoading = false;
  @Input() noMoreItems = false;
  @Output() nextItems = new EventEmitter<void>();

  @ViewChild('anchor', { static: true }) anchor!: ElementRef<HTMLElement>;

  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    this.setupObserver();
  }

  ngOnDestroy() {
    this.disconnectObserver();
  }

  private setupObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isLoading && !this.noMoreItems) {
          this.nextItems.emit();
        }
      });
    }, options);

    if (this.anchor) {
      this.observer.observe(this.anchor.nativeElement);
    }
  }

  private disconnectObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
