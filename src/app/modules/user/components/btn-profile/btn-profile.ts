import { Session } from '@/core/services/session';
import { SubManager } from '@/modules/common/services/sub-manager/sub-manager';
import { UserStore } from '@/modules/user/services/user-store/user-store';
import { User } from '@/modules/user/services/user/user';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-btn-profile',
  imports: [RouterLink],
  templateUrl: './btn-profile.html',
  styleUrl: './btn-profile.css',
  providers: [SubManager, User],
})
export class BtnProfile implements OnInit, OnDestroy {
  private readonly userStore = inject(UserStore);
  private readonly userService = inject(User);
  private readonly subManager = inject(SubManager);
  private readonly session = inject(Session);

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.subManager.destroy();
  }

  private getUser(): void {
    const sub = this.userService.get().subscribe({
      next: ({ user }) => {
        this.session.set(user.token);
        this.userStore.set({
          email: user.email,
          username: user.username,
          bio: user.bio,
          image: user.image,
        });
      },
    });
    this.subManager.add(sub, 'get-user');
  }

  get user() {
    return this.userStore.get();
  }
}
