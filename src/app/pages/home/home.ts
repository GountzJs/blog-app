import { ListTags } from '@/modules/articles/components/list-tags/list-tags';
import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [ListTags, NgStyle],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
