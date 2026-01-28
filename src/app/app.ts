import { User } from '@/modules/common/services/user/user';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [User],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
