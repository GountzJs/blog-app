import { Session } from '@/core/services/session/session';
import { SubManager } from '@/core/services/sub-manager/sub-manager';
import { UserStore } from '@/modules/user/services/user-store/user-store';
import { User } from '@/modules/user/services/user/user';
import { Location, NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-btn-profile',
  imports: [RouterLink, NgClass],
  templateUrl: './btn-profile.html',
  styleUrl: './btn-profile.css',
  providers: [SubManager, User],
})
export class BtnProfile implements OnInit, OnDestroy {
  private readonly userStore = inject(UserStore);
  private readonly userService = inject(User);
  private readonly subManager = inject(SubManager);
  private readonly session = inject(Session);
  private readonly location = inject(Location);

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

  isActive(): boolean {
    return this.location.path().includes(`/profile/@${this.user?.username}`);
  }
}
