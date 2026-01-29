import { BtnLogout } from '@/modules/user/components/btn-logout/btn-logout';
import { FormUser } from '@/modules/user/components/form-user/form-user';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [BtnLogout, FormUser],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {}
