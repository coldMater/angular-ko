/* eslint-disable space-before-function-paren */
// #docplaster
// #docregion
import { Component, forwardRef, Optional, SkipSelf } from '@angular/core';

// A component base class (see AlexComponent)
export abstract class Base { name = 'Count Basie'; }

// Marker class, used as an interface
// #docregion parent
export abstract class Parent { abstract name: string; }
// #enddocregion parent

const DifferentParent = Parent;

// 현재 컴포넌트를 프로바이더 형태로 반환하는 헬퍼 메소드
// 두번째 인자가 생략되면 `parentType`은 `Parent`로 지정됩니다.
export function provideParent
  (component: any, parentType?: any) {
    return { provide: parentType || Parent, useExisting: forwardRef(() => component) };
  }

// Simpler syntax version that always provides the component in the name of `Parent`.
export function provideTheParent
  (component: any) {
    return { provide: Parent, useExisting: forwardRef(() => component) };
  }

///////// C - Child //////////
const templateC = `
  <div class="c">
    <h3>{{name}}</h3>
    <p>My parent is {{parent?.name}}</p>
  </div>`;

@Component({
  selector: 'carol',
  template: templateC
})
// #docregion carol-class
export class CarolComponent {
  name = 'Carol';
  // #docregion carol-ctor
  constructor( @Optional() public parent?: Parent ) { }
  // #enddocregion carol-ctor
}
// #enddocregion carol-class

@Component({
  selector: 'chris',
  template: templateC
})
export class ChrisComponent {
  name = 'Chris';
  constructor( @Optional() public parent?: Parent ) { }
}

//////  Craig ///////////
/**
 * Show we cannot inject a parent by its base class.
 */
// #docregion craig
@Component({
  selector: 'craig',
  template: `
  <div class="c">
    <h3>Craig</h3>
    {{alex ? 'Found' : 'Did not find'}} Alex via the base class.
  </div>`
})
export class CraigComponent {
  constructor( @Optional() public alex?: Base ) { }
}
// #enddocregion craig

//////// B - Parent /////////
// #docregion barry
const templateB = `
  <div class="b">
    <div>
      <h3>{{name}}</h3>
      <p>My parent is {{parent?.name}}</p>
    </div>
    <carol></carol>
    <chris></chris>
  </div>`;

@Component({
  selector:   'barry',
  template:   templateB,
  providers:  [{ provide: Parent, useExisting: forwardRef(() => BarryComponent) }]
})
export class BarryComponent implements Parent {
  name = 'Barry';
// #docregion barry-ctor
  constructor( @SkipSelf() @Optional() public parent?: Parent ) { }
// #enddocregion barry-ctor
}
// #enddocregion barry

@Component({
  selector:   'bob',
  template:   templateB,
  providers:  [ provideParent(BobComponent) ]
})
export class BobComponent implements Parent {
  name = 'Bob';
  constructor( @SkipSelf() @Optional() public parent?: Parent ) { }
}

@Component({
  selector:   'beth',
  template:   templateB,
  providers:  [ provideParent(BethComponent, DifferentParent) ]
})
export class BethComponent implements Parent {
  name = 'Beth';
  constructor( @SkipSelf() @Optional() public parent?: Parent ) { }
}

///////// A - Grandparent //////

// #docregion alex-1
@Component({
  selector: 'alex',
  template: `
    <div class="a">
      <h3>{{name}}</h3>
      <cathy></cathy>
      <craig></craig>
      <carol></carol>
    </div>`,
// #enddocregion alex-1
// #docregion alex-providers
  providers: [{ provide: Parent, useExisting: forwardRef(() => AlexComponent) }],
// #enddocregion alex-providers
// #docregion alex-1
})
// #enddocregion alex-1
// TODO: Add `... implements Parent` to class signature
// #docregion alex-1
// #docregion alex-class-signature
export class AlexComponent extends Base
// #enddocregion alex-class-signature
{
  override name = 'Alex';
}
// #enddocregion alex-1

/////

@Component({
  selector: 'alice',
  template: `
    <div class="a">
      <h3>{{name}}</h3>
      <barry></barry>
      <beth></beth>
      <bob></bob>
      <carol></carol>
    </div> `,
  providers:  [ provideParent(AliceComponent) ]
})
// #docregion alice-class-signature
export class AliceComponent implements Parent
// #enddocregion alice-class-signature
{
  name = 'Alice';
}

//////  Cathy ///////////
/**
 * Show we can inject a parent by component type
 */
// #docregion cathy
@Component({
  selector: 'cathy',
  template: `
  <div class="c">
    <h3>Cathy</h3>
    {{alex ? 'Found' : 'Did not find'}} Alex via the component class.<br>
  </div>`
})
export class CathyComponent {
  constructor( @Optional() public alex?: AlexComponent ) { }
}
// #enddocregion cathy

///////// ParentFinder //////
@Component({
  selector: 'app-parent-finder',
  template: `
    <h2>Parent Finder</h2>
    <alex></alex>
    <alice></alice>`
})
export class ParentFinderComponent { }
