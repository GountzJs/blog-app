import { Session } from '@/core/services/session/session';
import { UserStore } from '@/modules/user/services/user-store/user-store';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-logout',
  imports: [],
  templateUrl: './btn-logout.html',
  styleUrl: './btn-logout.css',
})
export class BtnLogout {
  private readonly sessionService = inject(Session);
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);

  logout() {
    this.sessionService.clear();
    this.userStore.clear();
    this.router.navigate(['/auth/sign-in']);
  }
}
