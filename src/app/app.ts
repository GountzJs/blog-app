import { ListSnackbars } from '@/modules/common/components/list-snackbars/list-snackbars';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListSnackbars],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
