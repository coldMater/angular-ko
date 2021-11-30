// #docplaster
// #docregion imports
import { Component, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

// #enddocregion imports
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

// #docregion decorator, toggle-app-animations, define
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
// #enddocregion decorator
    slideInAnimation
// #docregion decorator
// #enddocregion toggle-app-animations, define
    // 애니메이션 트리거는 여기에 작성합니다.
// #docregion toggle-app-animations, define
  ]
})
// #enddocregion decorator, define
export class AppComponent {
  @HostBinding('@.disabled')
  public animationsDisabled = false;
// #enddocregion toggle-app-animations

// #docregion prepare-router-outlet
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

// #enddocregion prepare-router-outlet

  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }
// #docregion toggle-app-animations
}
// #enddocregion toggle-app-animations
