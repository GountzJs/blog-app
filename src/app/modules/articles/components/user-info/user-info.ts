import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-info',
  imports: [DatePipe, RouterLink],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {
  @Input() avatar?: string;
  @Input() username?: string;
  @Input() createdAt?: string;
}
