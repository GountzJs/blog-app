import { Injectable } from '@angular/core';
import data from '../data';
import { IconName } from '../icon-name.type';

@Injectable()
export class Icon {
  getIcon(name: IconName, color: string) {
    return data[name](color);
  }
}
