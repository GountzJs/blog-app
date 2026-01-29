import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  imports: [NgClass],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.css',
})
export class Snackbar {
  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() message = '';
}
