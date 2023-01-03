<!--
# Component interaction
-->
# 컴포넌트 상호작용

<a id="top"></a>

<!--
This cookbook contains recipes for common component communication scenarios in which two or more components share information.
-->
이 가이드 문서는 둘 이상의 컴포넌트가 서로 데이터를 주고받는 방법을 다룹니다.


<a id="toc"></a>

<!--
# Contents

*   [Pass data from parent to child with input binding](guide/component-interaction#parent-to-child)
*   [Intercept input property changes with a setter](guide/component-interaction#parent-to-child-setter)
*   [Intercept input property changes with `ngOnChanges()`](guide/component-interaction#parent-to-child-on-changes)
*   [Parent calls an `@ViewChild()`](guide/component-interaction#parent-to-view-child)
*   [Parent and children communicate via a service](guide/component-interaction#bidirectional-service)
-->

<!--
**See the <live-example name="component-interaction"></live-example>**.
-->
**이 문서에서 다루는 예제는 <live-example name="component-interaction"></live-example>에서 확인할 수 있습니다.**


<a id="parent-to-child"></a>

<!--
## Pass data from parent to child with input binding
-->
## 부모 컴포넌트에서 자식 컴포넌트로 데이터 전달하기 : 입력 바인딩

<!--
`HeroChildComponent` has two ***input properties***, typically adorned with [@Input() decorator](guide/inputs-outputs#input).

<code-example header="component-interaction/src/app/hero-child.component.ts" path="component-interaction/src/app/hero-child.component.ts"></code-example>

The second `@Input` aliases the child component property name `masterName` as `'master'`.

The `HeroParentComponent` nests the child `HeroChildComponent` inside an `*ngFor` repeater, binding its `master` string property to the child's `master` alias, and each iteration's `hero` instance to the child's `hero` property.

<code-example header="component-interaction/src/app/hero-parent.component.ts" path="component-interaction/src/app/hero-parent.component.ts"></code-example>

The running application displays three heroes:

<div class="lightbox">

<img alt="Parent-to-child" src="generated/images/guide/component-interaction/parent-to-child.png">

</div>
-->
`HeroChildComponent`에는 ***입력 프로퍼티***가 두 개 있습니다.
입력 프로퍼티는 [@Input() 데코레이터](guide/inputs-outputs#input)를 붙여 선언합니다.

<code-example header="component-interaction/src/app/hero-child.component.ts" path="component-interaction/src/app/hero-child.component.ts"></code-example>

이 코드에 선언된 입력 프로퍼티 중 두 번째 `@Input`에는 `masterName` 프로퍼티를 외부에서 바인딩 할 때 `'master'`라는 이름으로 사용하기 위한 선언이 추가되어 있습니다.

`HeroParentComponent`는 `*ngFor`를 사용해서 배열에 있는 항목마다 `HeroChildComponent`를 만드는데, 각 컴포넌트를 만들때마다 `master` 문자열 프로퍼티를 자식 컴포넌트의 `master`로 연결하고, 반복되는 `hero` 인스턴스를 자식 컴포넌트의 `hero` 프로퍼티로 바인딩 합니다.

<code-example header="component-interaction/src/app/hero-parent.component.ts" path="component-interaction/src/app/hero-parent.component.ts"></code-example>

이 애플리케이션을 실행하면 다음과 같이 세 명의 히어로가 표시됩니다:

<div class="lightbox">

<img alt="Parent-to-child" src="generated/images/guide/component-interaction/parent-to-child.png">

</div>


<!--
### Test it for Pass data from parent to child with input binding
-->
### 입력 바인딩으로 전달한 데이터 테스트하기

<!--
E2E test that all children were instantiated and displayed as expected:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="parent-to-child"></code-example>

[Back to top](guide/component-interaction#top)
-->
반복문을 순회하며 각각의 히어로마다 결과를 제대로 표시하는지 확인하려면 E2E 테스트 환경을 다음과 같이 설정하면 됩니다:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="parent-to-child"></code-example>

[맨 위로](guide/component-interaction#top)


<a id="parent-to-child-setter"></a>

<!--
## Intercept input property changes with a setter
-->
## 입력 프로퍼티를 세터(setter)로 가로채기

<!--
Use an input property setter to intercept and act upon a value from the parent.

The setter of the `name` input property in the child `NameChildComponent` trims the whitespace from a name and replaces an empty value with default text.

<code-example header="component-interaction/src/app/name-child.component.ts" path="component-interaction/src/app/name-child.component.ts"></code-example>

Here's the `NameParentComponent` demonstrating name variations including a name with all spaces:

<code-example header="component-interaction/src/app/name-parent.component.ts" path="component-interaction/src/app/name-parent.component.ts"></code-example>

<div class="lightbox">

<img alt="Parent-to-child-setter" src="generated/images/guide/component-interaction/setter.png">

</div>
-->
부모 컴포넌트에서 값이 전달될 때 추가 로직을 실행하기 위해 입력 프로퍼티에 세터를 사용해 봅시다.

자식 컴포넌트 `NameChildComponent`의 입력 프로퍼티 `name`에 세터를 연결해서 전달되는 문자열의 여백 문자를 다른 문자로 변경해 봅시다.

<code-example header="component-interaction/src/app/name-child.component.ts" path="component-interaction/src/app/name-child.component.ts"></code-example>

그리고 부모 컴포넌트인 `NameParentComponent`는 자식 컴포넌트에 다음과 같이 몇 가지 경우를 적용해 봅니다:

<code-example header="component-interaction/src/app/name-parent.component.ts" path="component-interaction/src/app/name-parent.component.ts"></code-example>

<div class="lightbox">

<img alt="Parent-to-child-setter" src="generated/images/guide/component-interaction/setter.png">

</div>


<!--
### Test it for Intercept input property changes with a setter
-->
### 세터를 사용한 입력 프로퍼티 테스트

<!--
E2E tests of input property setter with empty and non-empty names:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="parent-to-child-setter"></code-example>

[Back to top](guide/component-interaction#top)
-->
입력 프로퍼티 세터를 테스트하는 E2E 환경은 다음과 같이 설정합니다:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="parent-to-child-setter"></code-example>

[맨 위로](guide/component-interaction#top)


<a id="parent-to-child-on-changes"></a>

<!--
## Intercept input property changes with `ngOnChanges()`
-->
## `ngOnChanges()`로 입력 프로퍼티 가로채기

<!--
Detect and act upon changes to input property values with the `ngOnChanges()` method of the `OnChanges` lifecycle hook interface.

<div class="alert is-helpful">

You might prefer this approach to the property setter when watching multiple, interacting input properties.

Learn about `ngOnChanges()` in the [Lifecycle Hooks](guide/lifecycle-hooks) chapter.

</div>

This `VersionChildComponent` detects changes to the `major` and `minor` input properties and composes a log message reporting these changes:

<code-example header="component-interaction/src/app/version-child.component.ts" path="component-interaction/src/app/version-child.component.ts"></code-example>

The `VersionParentComponent` supplies the `minor` and `major` values and binds buttons to methods that change them.

<code-example header="component-interaction/src/app/version-parent.component.ts" path="component-interaction/src/app/version-parent.component.ts"></code-example>

Here's the output of a button-pushing sequence:

<div class="lightbox">

<img alt="Parent-to-child-onchanges" src="generated/images/guide/component-interaction/parent-to-child-on-changes.gif">

</div>
-->
입력 프로퍼티는 `OnChanges` 라이프싸이클 후킹 인터페이스를 사용하는 `ngOnChanges()` 메소드로도 가로챌 수 있습니다.

<div class="alert is-helpful">

입력 프로퍼티 여러개를 가로채야 한다면 세터를 사용하는 것보다 이 방식이 더 편할 수 있습니다.

`ngOnChanges()` 함수에 대한 자세한 설명은 [라이프싸이클 후킹](guide/lifecycle-hooks) 문서를 참고하세요.

</div>

`VersionChildComponent`는 `major`와 `minor` 두 입력 프로퍼티 값이 변경되는 것을 감지하고 이 내용을 로그로 출력합니다:

<code-example header="component-interaction/src/app/version-child.component.ts" path="component-interaction/src/app/version-child.component.ts"></code-example>

그리고 부모 컴포넌트 `VersionParentComponent`는 자식 컴포넌트에 바인딩되는 `minor`, `major` 두 값을 버튼으로 조정합니다.

<code-example header="component-interaction/src/app/version-parent.component.ts" path="component-interaction/src/app/version-parent.component.ts"></code-example>

버튼을 눌렀을 때 화면은 이렇습니다:

<div class="lightbox">

<img alt="Parent-to-child-onchanges" src="generated/images/guide/component-interaction/parent-to-child-on-changes.gif">

</div>


<!--
### Test it for Intercept input property changes with `ngOnChanges()`
-->
### `ngOnChanges()`로 가로챈 입력 프로퍼티 테스트

<!--
Test that ***both*** input properties are set initially and that button clicks trigger the expected `ngOnChanges` calls and values:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="parent-to-child-onchanges"></code-example>

[Back to top](guide/component-interaction#top)
-->
***두*** 입력 프로퍼티는 초기값이 설정된 이후에 버튼을 누를 때마다 값이 변경되면서 `ngOnChanges()`를 실행하는데, 이 동작을 테스트하는 E2E 환경을 다음과 같이 정의합니다:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="parent-to-child-onchanges"></code-example>

[맨 위로](guide/component-interaction#top)


<a id="child-to-parent"></a>

<!--
## Parent listens for child event
-->
## 자식 컴포넌트에서 보내는 이벤트 받기

<!--
The child component exposes an `EventEmitter` property with which it `emits` events when something happens.
The parent binds to that event property and reacts to those events.

The child's `EventEmitter` property is an ***output property***, typically adorned with an [@Output() decorator](guide/inputs-outputs#output) as seen in this `VoterComponent`:

<code-example header="component-interaction/src/app/voter.component.ts" path="component-interaction/src/app/voter.component.ts"></code-example>

Clicking a button triggers emission of a `true` or `false`, the boolean *payload*.

The parent `VoteTakerComponent` binds an event handler called `onVoted()` that responds to the child event payload `$event` and updates a counter.

<code-example header="component-interaction/src/app/votetaker.component.ts" path="component-interaction/src/app/votetaker.component.ts"></code-example>

The framework passes the event argument &mdash;represented by `$event`&mdash; to the handler method, and the method processes it:

<div class="lightbox">

<img alt="Child-to-parent" src="generated/images/guide/component-interaction/child-to-parent.gif">

</div>
-->
자식 컴포넌트에서 어떤 이벤트가 발생하면 이 이벤트는 `EventEmitter` 타입으로 지정한 프로퍼티를 통해 부모 컴포넌트에게 보낼 수 있습니다.
부모 컴포넌트는 이 이벤트를 바인딩해서 원하는 로직을 실행하면 됩니다.

자식 컴포넌트에서 외부로 이벤트를 보내려면 `EventEmitter` 타입으로 선언한 프로퍼티에 [@Output() 데코레이터](guide/inputs-outputs#output)를 사용해서 ***출력 프로퍼티***로 지정하면 됩니다. `VoterComponent`에서는 다음과 같이 선언했습니다:

<code-example header="component-interaction/src/app/voter.component.ts" path="component-interaction/src/app/voter.component.ts"></code-example>

이 예제에서 버튼을 클릭하면 자식 컴포넌트로 불리언 타입의 데이터를 전달합니다.

그리고 `VoteTakerComponent`의 `onVoted()` 함수가 이벤트 객체를 인자로 받아서 `agree`와 `disagree` 카운터를 갱신합니다.

<code-example header="component-interaction/src/app/votetaker.component.ts" path="component-interaction/src/app/votetaker.component.ts"></code-example>

이 때 전달되는 이벤트 객체는 템플릿에서 `$event`라는 이름으로 접근할 수 있으며, 템플릿에서 이벤트 핸들러 함수에 인자로 전달하기 때문에 컴포넌트 클래스 코드에서 이 이벤트 객체를 활용할 수 있습니다:

<div class="lightbox">

<img alt="Child-to-parent" src="generated/images/guide/component-interaction/child-to-parent.gif">

</div>

<!--
### Test it for Parent listens for child event
-->
### 자식 컴포넌트에서 전달된 이벤트 확인하기

<!--
Test that clicking the *Agree* and *Disagree* buttons update the appropriate counters:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="child-to-parent"></code-example>

[Back to top](guide/component-interaction#top)
-->
*Agree* 버튼이나 *Disagree* 버튼을 클릭하면 해당 카운터 값이 증가합니다:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="child-to-parent"></code-example>

[맨 위로](guide/component-interaction#top)


<!--
## Parent interacts with child using *local variable*
-->
## *템플릿 지역 변수*로 자식 컴포넌트에 접근하기

<!--
A parent component cannot use data binding to read child properties or invoke child methods.
Do both by creating a template reference variable for the child element and then reference that variable *within the parent template* as seen in the following example.

<a id="countdown-timer-example"></a>

The following is a child `CountdownTimerComponent` that repeatedly counts down to zero and launches a rocket.
The `start` and `stop` methods control the clock and a countdown status message displays in its own template.

<code-example header="component-interaction/src/app/countdown-timer.component.ts" path="component-interaction/src/app/countdown-timer.component.ts"></code-example>

The `CountdownLocalVarParentComponent` that hosts the timer component is as follows:

<code-example header="component-interaction/src/app/countdown-parent.component.ts" path="component-interaction/src/app/countdown-parent.component.ts" region="lv"></code-example>

The parent component cannot data bind to the child's `start` and `stop` methods nor to its `seconds` property.

Place a local variable, `#timer`, on the tag `<app-countdown-timer>` representing the child component.
That gives you a reference to the child component and the ability to access *any of its properties or methods* from within the parent template.

This example wires parent buttons to the child's `start` and `stop` and uses interpolation to display the child's `seconds` property.

Here, the parent and child are working together.

<div class="lightbox">

<img alt="countdown timer" src="generated/images/guide/component-interaction/countdown-timer-anim.gif">

</div>
-->
부모 컴포넌트는 자식 컴포넌트의 프로퍼티나 메소드에 직접 접근할 수 없습니다.
하지만 *부모 템플릿*에 템플릿 참조 변수를 선언하면 자식 컴포넌트의 프로퍼티나 메소드에 접근할 수 있습니다.

<a id="countdown-timer-example"></a>

다음 예제에서 `CountdownTimerComponent`는 타이머를 동작시켜서 카운트가 0이 되면 로켓을 발사한다고 합시다.
그리고 이 컴포넌트에 있는 `start` 메소드와 `stop` 메소드는 각각 타이머를 시작하거나 정지합니다.

<code-example header="component-interaction/src/app/countdown-timer.component.ts" path="component-interaction/src/app/countdown-timer.component.ts"></code-example>

부모 컴포넌트인 `CountdownLocalVarParentComponent`는 자식 컴포넌트를 다음과 같이 활용합니다:

<code-example header="component-interaction/src/app/countdown-parent.component.ts" path="component-interaction/src/app/countdown-parent.component.ts" region="lv"></code-example>

원래 부모 컴포넌트는 자식 컴포넌트의 `seconds` 프로퍼티나 `start`, `stop` 메소드에 직접 접근할 수 없습니다.

하지만 `<app-countdown-timer>`를 템플릿 지역 변수 `#timer`로 선언하면 이 변수를 사용해서 자식 컴포넌트에 접근할 수 있습니다.
이 템플릿 지역 변수는 자식 컴포넌트 자체를 가리키며, 템플릿 지역 변수를 선언한 후에는 부모 컴포넌트의 템플릿에서 *자식 컴포넌트의 프로퍼티나 메소드*에 자유롭게 접근할 수 있습니다.

이 예제에서는 부모 컴포넌트에 있는 버튼을 각각 자식 컴포넌트의 `start` 함수와 `stop` 함수와 연결하며, `seconds` 프로퍼티를 직접 가져와서 부모 컴포넌트에서 활용합니다.

부모 컴포넌트와 자식 컴포넌트가 어떻게 연동되는지 확인해 보세요.

<div class="lightbox">

<img alt="countdown timer" src="generated/images/guide/component-interaction/countdown-timer-anim.gif">

</div>


<a id="countdown-tests"></a>

<!--
### Test it for Parent interacts with child using *local variable*
-->
### *템플릿 지역 변수* 로 자식 컴포넌트 접근하기

<!--
Test that the seconds displayed in the parent template match the seconds displayed in the child's status message.
Test also that clicking the *Stop* button pauses the countdown timer:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="countdown-timer-tests"></code-example>

[Back to top](guide/component-interaction#top)
-->
부모 컴포넌트의 템플릿에 표시되는 타이머는 자식 컴포넌트에 있는 프로퍼티를 참조하기 때문에 자식 컴포넌트에서 표시하는 메시지와 같은 값을 표시합니다.
그리고 다음 테스트 코드는 *Stop* 버튼을 클릭했을 때 카운트다운 타이머가 멈추는지도 확인합니다:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="countdown-timer-tests"></code-example>

[맨 위로](guide/component-interaction#top)


<a id="parent-to-view-child"></a>

<!--
## Parent calls an `@ViewChild()`
-->
## `@ViewChild()`로 자식 컴포넌트 접근하기

<!--
The *local variable* approach is straightforward.
But it is limited because the parent-child wiring must be done entirely within the parent template.
The parent component *itself* has no access to the child.

You can't use the *local variable* technique if the parent component's *class* relies on the child component's *class*.
The parent-child relationship of the components is not established within each component's respective *class* with the *local variable* technique.
Because the *class* instances are not connected to one another, the parent *class* cannot access the child *class* properties and methods.

When the parent component *class* requires that kind of access, ***inject*** the child component into the parent as a *ViewChild*.

The following example illustrates this technique with the same [Countdown Timer](guide/component-interaction#countdown-timer-example) example.
Neither its appearance nor its behavior changes.
The child [CountdownTimerComponent](guide/component-interaction#countdown-timer-example) is the same as well.

<div class="alert is-helpful">

The switch from the *local variable* to the *ViewChild* technique is solely for the purpose of demonstration.

</div>

Here is the parent, `CountdownViewChildParentComponent`:

<code-example header="component-interaction/src/app/countdown-parent.component.ts" path="component-interaction/src/app/countdown-parent.component.ts" region="vc"></code-example>

It takes a bit more work to get the child view into the parent component *class*.

First, you have to import references to the `ViewChild` decorator and the `AfterViewInit` lifecycle hook.

Next, inject the child `CountdownTimerComponent` into the private `timerComponent` property using the `@ViewChild` property decoration.

The `#timer` local variable is gone from the component metadata.
Instead, bind the buttons to the parent component's own `start` and `stop` methods and present the ticking seconds in an interpolation around the parent component's `seconds` method.

These methods access the injected timer component directly.

The `ngAfterViewInit()` lifecycle hook is an important wrinkle.
The timer component isn't available until *after* Angular displays the parent view.
So it displays `0` seconds initially.

Then Angular calls the `ngAfterViewInit` lifecycle hook at which time it is *too late* to update the parent view's display of the countdown seconds.
Angular's unidirectional data flow rule prevents updating the parent view's in the same cycle.
The application must *wait one turn* before it can display the seconds.

Use `setTimeout()` to wait one tick and then revise the `seconds()` method so that it takes future values from the timer component.
-->
*템플릿 지역 변수*로 자식 컴포넌트에 접근하는 것은 문법도 간단하고 이해하기 쉽습니다.
하지만 이 방식은 부모 컴포넌트의 템플릿에서만 자식 컴포넌트에 접근할 수 있기 때문에 자유롭게 활용하기에는 제한이 있습니다.
부모 컴포넌트의 *클래스*에서는 자식 컴포넌트에 접근할 수 없기 때문입니다.

*템플릿 지역 변수*를 사용하는 방식은 부모 컴포넌트의 *클래스*에서는 사용할 수 없습니다.
컴포넌트의 부모-자식 관계는 컴포넌트가 완전히 생성된 이후에 구성되기 때문입니다.
그래서 부모 컴포넌트의 클래스에서는 자식 컴포넌트의 프로퍼티를 읽거나 메소드를 실행할 수 없습니다.

부모 컴포넌트의 *클래스*에서 자식 컴포넌트에 접근하려면 자식 컴포넌트에 *ViewChild*를 사용해서 부모 컴포넌트로 ***주입(inject)*** 해야 합니다.

이 내용은 예제를 보면서 알아봅시다.
이 예제는 위에서 살펴본 [카운트다운 타이머](guide/component-interaction#countdown-timer-example)와 거의 비슷하지만, 구현 방식은 조금 다릅니다.
먼저, 자식 컴포넌트 [CountdownTimerComponent](guide/component-interaction#countdown-timer-example) 코드는 동일합니다.

<div class="alert is-helpful">

*템플릿 지역 변수*를 사용하는 방식과 *ViewChild*를 사용하는 방식은 거의 비슷합니다.
사용하려는 목적에 따라 구현 방식을 선택하면 됩니다.

</div>

그리고 부모 컴포넌트인 `CountdownViewChildParentComponent`는 다음과 같이 구현합니다:

<code-example header="component-interaction/src/app/countdown-parent.component.ts" path="component-interaction/src/app/countdown-parent.component.ts" region="vc"></code-example>

이 코드를 보면 부모 컴포넌트 *클래스*에서 자식 컴포넌트에 이전보다 좀 더 많이 개입하는 것을 확인할 수 있습니다.

먼저, `ViewChild` 데코레이터와 `AfterViewInit` 라이프싸이클 후킹 인터페이스를 로드합니다.

그리고 `CountdownTimerComponent`를 `timerComponent` 프로퍼티로 선언하면서 `@ViewChild` 데코레이터를 사용했습니다.

이전에 사용했던 부모 컴포넌트의 템플릿은 템플릿 지역 변수 `#timer`를 활용해서 자식 컴포넌트의 메소드를 직접 실행했습니다.
하지만 이번 예제는 자식 컴포넌트를 직접 호출하지 않고 부모 컴포넌트에 있는 `start`, `stop` 메소드를 사옹하며, 현재 남아있는 초를 확인할 때도 부모 컴포넌트의 `seconds` 메소드를 활용합니다.

각각의 메소드에서 자식 컴포넌트에 접근하는 식으로 구현하는 것입니다.

이 때 `ngAfterViewInit()` 라이프싸이클 후킹 함수가 중요합니다.
자식 컴포넌트인 타이머 컴포넌트는 Angular가 부모 컴포넌트의 뷰를 화면에 표시한 *이후에야* 사용할 수 있습니다.
그래서 뷰가 완전히 준비되기 전까지는 `0`을 표시합니다.

부모 컴포넌트의 뷰가 준비되면 자식 컴포넌트에서 시간을 가져오기 위해 `ngAfterViewInit` 라이프싸이클 후킹 함수를 실행하는데,
Angular는 단방향 데이터 흐름을 권장하기 때문에 부모 컴포넌트의 뷰를 같은 JavaScript 실행 싸이클 안에서 갱신하는 것을 금지합니다.

그래서 `ngAfterViewInit()`에서 자식 컴포넌트의 시간을 가져와서 부모 컴포넌트 프로퍼티에 할당하는 것은 `setTimeout()` 으로 *한 싸이클* 늦췄습니다.


<!--
### Test it for Parent calls an `@ViewChild()`
-->
### `@VilewChild()` 테스트하기

<!--
Use [the same countdown timer tests](guide/component-interaction#countdown-tests) as before.

[Back to top](guide/component-interaction#top)
-->
이전에 살펴봤던 [카운트다운 타이머 테스트](guide/component-interaction#countdown-tests)와 같습니다.

[맨 위로](guide/component-interaction#top)


<a id="bidirectional-service"></a>

<!--
## Parent and children communicate using a service
-->
## 서비스를 사용해서 상호작용하기

<!--
A parent component and its children share a service whose interface enables bidirectional communication *within the family*.

The scope of the service instance is the parent component and its children.
Components outside this component subtree have no access to the service or their communications.

This `MissionService` connects the `MissionControlComponent` to multiple `AstronautComponent` children.

<code-example header="component-interaction/src/app/mission.service.ts" path="component-interaction/src/app/mission.service.ts"></code-example>

The `MissionControlComponent` both provides the instance of the service that it shares with its children \(through the `providers` metadata array\) and injects that instance into itself through its constructor:

<code-example header="component-interaction/src/app/missioncontrol.component.ts" path="component-interaction/src/app/missioncontrol.component.ts"></code-example>

The `AstronautComponent` also injects the service in its constructor.
Each `AstronautComponent` is a child of the `MissionControlComponent` and therefore receives its parent's service instance:

<code-example header="component-interaction/src/app/astronaut.component.ts" path="component-interaction/src/app/astronaut.component.ts"></code-example>

<div class="alert is-helpful">

Notice that this example captures the `subscription` and `unsubscribe()` when the `AstronautComponent` is destroyed.
This is a memory-leak guard step.
There is no actual risk in this application because the lifetime of a `AstronautComponent` is the same as the lifetime of the application itself.
That *would not* always be true in a more complex application.

You don't add this guard to the `MissionControlComponent` because, as the parent,
it controls the lifetime of the `MissionService`.

</div>

The *History* log demonstrates that messages travel in both directions between the parent `MissionControlComponent` and the `AstronautComponent` children, facilitated by the service:

<div class="lightbox">

<img alt="bidirectional-service" src="generated/images/guide/component-interaction/bidirectional-service.gif">

</div>
-->
부모 컴포넌트와 자식 컴포넌트가 같은 서비스를 주입받는다면 이 서비스를 활용해서 양방향으로 데이터를 주고받을 수 있습니다.

컴포넌트에 주입되는 서비스는 그 컴포넌트에서 자유롭게 사용할 수 있습니다.
이 때 주입되는 서비스의 인스턴스가 동일해야 하기 때문에 서비스 프로바이더를 별도로 지정하면 컴포넌트 통신에 활용할 수 없습니다.

`MissionControlComponent`가 여러 개의 `AstronautComponent`와 통신하기 위해 `MissionService`를 만들어 봅시다.

<code-example header="component-interaction/src/app/mission.service.ts" path="component-interaction/src/app/mission.service.ts"></code-example>

`MissionControlComponent`는 생성자를 통해 `MissionService`의 인스턴스를 주입받으며, `providers` 메타데이터를 사용해서 서비스 인스턴스를 자식 컴포넌트에서도 사용할 수 있도록 공유합니다:

<code-example header="component-interaction/src/app/missioncontrol.component.ts" path="component-interaction/src/app/missioncontrol.component.ts"></code-example>

그리고 자식 컴포넌트 `AstronautComponent`도 생성자를 통해 서비스 인스턴스를 주입 받습니다:
`AstronautComponent`는 각각 `MissionControlComponent`의 자식 컴포넌트이며, 부모 컴포넌트에 주입된 서비스 인스턴스를 주입받습니다:

<code-example header="component-interaction/src/app/astronaut.component.ts" path="component-interaction/src/app/astronaut.component.ts"></code-example>

<div class="alert is-helpful">

이 예제는 옵저버블을 활용하기 때문에 `AstronautComponent`가 종료될 때 옵저버블을 해제하기 위해 `unsubscribe()`를 실행합니다.
이 함수는 메모리 누수를 막기 위해 필요하며, `AstronautComponent`가 종료되는 시점이 앱이 종료되는 시점과 같다면 이 로직을 작성하지 않아도 문제는 없습니다.
하지만 애플리케이션이 복잡해진다면 *그렇지 않을* 가능성이 더 크기 때문에 빠뜨리지 않고 작성하는 것이 좋습니다.

그리고 이 로직은 부모 컴포넌트 `MissionControlComponent`에는 필요 없습니다. 부모 컴포넌트와 `MissionService`가 종료되는 시점은 같습니다.

</div>

부모 컴포넌트 `MissionControlComponent`와 자식 컴포넌트 `AstronautComponent`가 서비스를 통해 데이터를 주고받는 과정은 *History* 영역에 다음과 같이 표시됩니다:

<div class="lightbox">

<img alt="bidirectional-service" src="generated/images/guide/component-interaction/bidirectional-service.gif">

</div>


<!--
### Test it for Parent and children communicate using a service
-->
### 서비스를 통하는 방식 테스트하기

<!--
Tests click buttons of both the parent `MissionControlComponent` and the `AstronautComponent` children and verify that the history meets expectations:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="bidirectional-service"></code-example>

[Back to top](guide/component-interaction#top)
-->
부모 컴포넌트 `MissionControlComponent`와 자식 컴포넌트 `AstronautComponent`의 버튼을 클릭했을 때 로그를 제대로 출력하는지 확인하기 위해 테스트 코드를 다음과 같이 작성합니다:

<code-example header="component-interaction/e2e/src/app.e2e-spec.ts" path="component-interaction/e2e/src/app.e2e-spec.ts" region="bidirectional-service"></code-example>

[맨 위로](guide/component-interaction#top)

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
