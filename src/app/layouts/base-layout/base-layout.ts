import { Session } from '@/core/services/session/session';
import { Icons } from '@/modules/common/components/icons/icons';
import { BtnProfile } from '@/modules/user/components/btn-profile/btn-profile';
import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  imports: [RouterLink, RouterOutlet, Icons, BtnProfile],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.css',
})
export class BaseLayout {
  private readonly location = inject(Location);
  private readonly session = inject(Session);

  isActive(url: string) {
    return this.location.path().split('?')[0] === url;
  }

  get isAuth(): boolean {
    return this.session.isAuth();
  }
}
