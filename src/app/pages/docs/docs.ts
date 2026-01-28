import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';

@Component({
  selector: 'app-docs',
  imports: [],
  templateUrl: './docs.html',
  styleUrl: './docs.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class Docs implements OnInit {
  @ViewChild('swaggerContainer', { static: true }) swaggerContainer!: ElementRef;

  ngOnInit(): void {
    SwaggerUIBundle({
      domNode: this.swaggerContainer.nativeElement,
      url: '/docs/backend.yml',
      deepLinking: true,
      presets: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (SwaggerUIBundle as any)['presets'].apis,
        SwaggerUIStandalonePreset,
      ],
      layout: 'StandaloneLayout',
    });
  }
}
