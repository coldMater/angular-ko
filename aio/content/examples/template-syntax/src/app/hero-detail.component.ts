/* eslint-disable @angular-eslint/no-inputs-metadata-property, @angular-eslint/no-outputs-metadata-property */
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'app-hero-detail',
  inputs: ['hero'],
  outputs: ['deleteRequest'],
  styles: ['button {margin-left: 8px} div {margin: 8px 0} img {height:24px}'],
  template: `
  <div>
    <img src="{{heroImageUrl}}" alt="{{hero.name}}">
    <span [style.text-decoration]="lineThrough">
      {{prefix}} {{hero.name}}
    </span>
    <button type="button" (click)="delete()">Delete</button>
  </div>`
})
export class HeroDetailComponent {
  hero = new Hero(-1, '', 'Zzzzzzzz'); // 기본 상태에서 히어로는 자고 있습니다.
  // heroImageUrl = 'https://wpclipart.com/cartoon/people/hero/hero_silhoutte_T.png';
  // Public Domain terms of use: https://wpclipart.com/terms.html
  heroImageUrl = 'assets/images/hero.png';
  lineThrough = '';
  @Input() prefix = '';

  // 이 컴포넌트는 삭제 요청을 보내기만 하고, 실제 삭제 동작을 수행하지는 않습니다.
  deleteRequest = new EventEmitter<Hero>();

  delete() {
    this.deleteRequest.emit(this.hero);
    this.lineThrough = this.lineThrough ? '' : 'line-through';
  }
}

@Component({
  selector: 'app-big-hero-detail',
  template: `
  <div class="detail">
    <img src="{{heroImageUrl}}" alt="{{hero.name}}">
    <div><b>{{hero.name}}</b></div>
    <div>Name: {{hero.name}}</div>
    <div>Emotion: {{hero.emotion}}</div>
    <div>Birthdate: {{hero.birthdate | date:'longDate'}}</div>
    <div>Web: <a href="{{hero.url}}" target="_blank">{{hero.url}}</a></div>
    <div>Rate/hr: {{hero.rate | currency:'EUR'}}</div>
    <br clear="all">
    <button type="button" (click)="delete()">Delete</button>
  </div>
  `,
  styles: [`
    .detail { border: 1px solid black; padding: 4px; max-width: 450px; }
    img     { float: left; margin-right: 8px; height: 100px; }
  `]
})
export class BigHeroDetailComponent extends HeroDetailComponent {

  @Input() override hero!: Hero;
  @Output() override deleteRequest = new EventEmitter<Hero>();

  override delete() {
    this.deleteRequest.emit(this.hero);
  }
}
