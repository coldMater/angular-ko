<!--
# User input
-->
# 사용자 입력

<!--
<div class="callout is-critical">

<header>Marked for archiving</header>

To ensure that you have the best experience possible, this topic is marked for archiving until it clearly conveys the most accurate information possible.

In the meantime, this topic might be helpful:
[Event binding](guide/event-binding).

If you think this content should not be archived, please file a [GitHub issue](https://github.com/angular/angular/issues/new?template=3-docs-bug.md).

</div>

User actions such as clicking a link, pushing a button, and entering text raise DOM events.
This page explains how to bind those events to component event handlers using the Angular event binding syntax.

Run the <live-example></live-example>.
-->
<div class="callout is-critical">

<header>보관처리 예정</header>

더 도움이 되는 문서가 있기 때문에 이 문서는 보관처리 예정입니다.

이 문서보다 [이벤트 바인딩](guide/event-binding) 문서를 보는 것이 도움이 될 수 있습니다.

이 문서가 계속 유지되어야 한다고 생각한다면 [GitHub issue](https://github.com/angular/angular/issues/new?template=3-docs-bug.md)에 남겨주세요.

</div>

DOM 이벤트는 사용자가 링크를 클릭하거나 버튼을 클릭할 때, 그리고 텍스트를 입력할 때 발생합니다.
이 문서는 이렇게 일어나는 이벤트를 컴포넌트와 이벤트 바인딩하고, 컴포넌트 이벤트 핸들러가 이벤트를 어떻게 처리하는지 알아봅니다.

<live-example></live-example>을 실행해 보세요.


<a id="binding-to-user-input-events"></a>

<!--
## Binding to user input events
-->
## 사용자 동작 이벤트 바인딩하기

<!--
You can use [Angular event bindings](guide/event-binding) to respond to any [DOM event](https://developer.mozilla.org/docs/Web/Events).
Many DOM events are triggered by user input.
Binding to these events provides a way to get input from the user.

To bind to a DOM event, surround the DOM event name in parentheses and assign a quoted [template statement](guide/template-statements) to it.

The following example shows an event binding that implements a click handler:

<!- vale Angular.Google_WordListWarnings = NO ->

<code-example header="src/app/click-me.component.ts" path="user-input/src/app/click-me.component.ts" region="click-me-button"></code-example>

<!- vale Angular.Google_WordListWarnings = YES ->

<a id="click"></a>

The `(click)` to the left of the equals sign identifies the button's click event as the **target of the binding**.
The text in quotes to the right of the equals sign is the **template statement**. The statement responds to the click event by calling the component's `onClickMe` method.

When writing a binding, be aware of a template statement's **execution context**.
The identifiers in a template statement belong to a specific context object, usually the Angular component controlling the template.
The preceding example shows a single line of HTML, but that HTML belongs to a larger component:

<code-example header="src/app/click-me.component.ts" path="user-input/src/app/click-me.component.ts" region="click-me-component"></code-example>

When the user clicks the button, Angular calls the `onClickMe` method from `ClickMeComponent`.
-->
[DOM에서 발생하는 이벤트](https://developer.mozilla.org/docs/Web/Events)는 [Angular 이벤트 바인딩](guide/event-binding) 문법을 사용해서 반응할 수 있습니다.
DOM에서 일어나는 이벤트는 대부분 사용자의 행동에 의해 발생합니다.
그래서 이 이벤트를 확인하면 사용자가 어떤 동작을 하고 있는지 알 수 있습니다.

DOM 이벤트를 바인딩 하려면 이벤트 이름을 괄호\(`(`, `)`\)로 감싸고 [템플릿 실행문](guide/template-statements)을 연결하면 됩니다.

아래 예제는 클릭 이벤트에 `onClickMe()` 핸들러를 바인딩하는 예제 코드입니다.

<code-example header="src/app/click-me.component.ts" path="user-input/src/app/click-me.component.ts" region="click-me-button"></code-example>

<a id="click"></a>

**바인딩 대상**은 등호\(`=`\) 왼쪽에 사용된 `(click)`이며, 버튼이 클릭되었을 때 발생하는 이벤트를 뜻합니다.
그리고 등호 오른쪽에 있는 문자열은 **템플릿 실행문**이며, 클릭 이벤트가 발생했을 때 `onClickMe` 메소드를 실행하도록 작성했습니다.

이벤트를 바인딩 할 때는 템플릿 실행문이 **실행되는 컨텍스트**가 유효한지 확인해야 합니다.
템플릿 실행문의 컨텍스트는 보통 그 템플릿을 조작하는 컴포넌트로 제한되어 있습니다.
이 예제를 컴포넌트 클래스 코드와 함께 확인해 봅시다:


<code-example header="src/app/click-me.component.ts" path="user-input/src/app/click-me.component.ts" region="click-me-component"></code-example>

사용자가 버튼을 클릭하면 Angular가 `ClickMeComponent`에 있는 `onClickMe` 메소드를 실행합니다.


<!--
## Get user input from the &dollar;event object
-->
## &dollar;event 객체에서 입력값 확인하기

<!--
DOM events carry a payload of information that may be useful to the component.
This section shows how to bind to the `keyup` event of an input box to get the user's input after each keystroke.

The following code listens to the `keyup` event and passes the entire event payload \(`$event`\) to the component event handler.

<code-example header="src/app/keyup.components.ts (template v.1)" path="user-input/src/app/keyup.components.ts" region="key-up-component-1-template"></code-example>

When a user presses and releases a key, the `keyup` event occurs. Angular then provides a corresponding DOM event object in the `$event` variable which this code passes as a parameter to the component's `onKey()` method.

<code-example header="src/app/keyup.components.ts (class v.1)" path="user-input/src/app/keyup.components.ts" region="key-up-component-1-class-no-type"></code-example>

The properties of an `$event` object vary depending on the type of DOM event.
For example, a mouse event includes different information than an input box editing event.

All [standard DOM event objects](https://developer.mozilla.org/docs/Web/API/Event) have a `target` property, a reference to the element that raised the event.
In this case, `target` refers to the [`<input>` element](https://developer.mozilla.org/docs/Web/API/HTMLInputElement) and `event.target.value` returns the current contents of that element.

After each call, the `onKey()` method appends the contents of the input box value to the list in the component's `values` property, followed by a separator character \(`|`\).
The [interpolation](guide/interpolation) displays the accumulating input box changes from the `values` property.

<!- vale Angular.Angular_Spelling = NO ->

Suppose the user enters the letters "abc" and then backspaces to remove them one by one.
Here's what the UI displays:

<!- vale Angular.Angular_Spelling = YES ->

<code-example>

a &verbar; ab &verbar; abc &verbar; ab &verbar; a &verbar; &verbar;

</code-example>

<div class="lightbox">

<img alt="key up 1" src="generated/images/guide/user-input/keyup1-anim.gif">

</div>

<div class="alert is-helpful">

You could also accumulate the individual keys themselves by substituting `event.key` for `event.target.value` in which case the same user input would produce:

<code-example>

a &verbar; b &verbar; c &verbar; backspace &verbar; backspace &verbar; backspace &verbar;

</code-example>

</div>
-->
DOM 이벤트에는 컴포넌트에서 활용할 수 있는 정보가 함께 전달됩니다.
이번에는 입력 필드에서 사용자가 키를 입력했을 때 발생하는 `keyup` 이벤트를 어떻게 활용할 수 있는지 알아봅시다.

`keyup` 이벤트가 발생할 때 생성되는 이벤트 객체\(`$event`\)를 컴포넌트의 이벤트 핸들러로 전달하려면 다음과 같이 작성합니다.

<code-example header="src/app/keyup.components.ts (template v.1)" path="user-input/src/app/keyup.components.ts" region="key-up-component-1-template"></code-example>

사용자가 키를 눌렀다가 떼면 `keyup` 이벤트가 발생되며, Angular는 이 이벤트를 `$event` 변수에 할당했다가 템플릿 실행문에 지정된 대로 `onKey()` 메소드의 인자로 전달합니다.

<code-example header="src/app/keyup.components.ts (class v.1)" path="user-input/src/app/keyup.components.ts" region="key-up-component-1-class-no-type"></code-example>

`$event` 객체의 프로퍼티는 발생하는 DOM 이벤트에 따라 달라집니다.
그래서 마우스 이벤트와 입력 필드에서 발생하는 이벤트의 구성은 다릅니다.

[표준 DOM 이벤트 객체](https://developer.mozilla.org/docs/Web/API/Event)에는 이벤트가 발생한 엘리먼트를 가리키는 `target` 프로퍼티가 있습니다.
이 예제에서는 `target` 프로퍼티가 [`<input>` 엘리먼트](https://developer.mozilla.org/docs/Web/API/HTMLInputElement)를 가리키며, 이 입력 필드의 현재값은 `event.target.value` 프로퍼티를 참조해서 확인할 수 있습니다.

`onKey()` 메소드가 실행될 때마다 변하는 값을 컴포넌트의 `values` 프로퍼티에 할당해서 화면에 표시해 봅시다.
위 코드는 이벤트가 발생할 때마다 현재값에 구분 기호\(|\)를 붙여서 계속 연결하며, 템플릿에는 [문자열 바인딩](guide/interpolation)으로 연결했습니다.

사용자가 "abc"를 차례대로 입력한 이후에 백스페이스로 모두 지웠다고 합시다.
그러면 화면에는 다음과 같이 표시됩니다:

<code-example>

a &verbar; ab &verbar; abc &verbar; ab &verbar; a &verbar; &verbar;

</code-example>

<div class="lightbox">

<img alt="key up 1" src="generated/images/guide/user-input/keyup1-anim.gif">

</div>

<div class="alert is-helpful">

`event.target.value` 대신 `event.key`를 사용하면 어떤 키가 입력되었는지 확인할 수도 있습니다:

<code-example>

a &verbar; b &verbar; c &verbar; backspace &verbar; backspace &verbar; backspace &verbar;

</code-example>

</div>

<a id="keyup1"></a>

### Type the `$event`

<!--
The preceding example casts the `$event` as an `any` type.
That simplifies the code at a cost.
There is no type information that could reveal properties of the event object and prevent silly mistakes.

The following example rewrites the method with types:

<code-example header="src/app/keyup.components.ts (class v.1 - typed )" path="user-input/src/app/keyup.components.ts" region="key-up-component-1-class"></code-example>

The `$event` is now a specific `KeyboardEvent`.
Not all elements have a `value` property so it casts `target` to an input element.
The `OnKey` method more clearly expresses what it expects from the template and how it interprets the event.
-->
위에서 살펴본 예제에서는 `$event` 객체를 `any` 타입으로 사용했습니다.
이렇게 사용하면 코드가 간단해지기는 하지만, 이벤트 객체의 타입을 특정할 수 없기 때문에 이벤트 객체의 정보를 활용할 수 없고 코딩 실수를 할 가능성도 있습니다.

그래서 다음 예제는 인자로 받는 이벤트 객체에 다음과 같이 타입을 지정했습니다:

<code-example header="src/app/keyup.components.ts (class v.1 - typed )" path="user-input/src/app/keyup.components.ts" region="key-up-component-1-class"></code-example>

이제 `$event` 객체는 `KeyboardEvent` 타입으로 지정했습니다.
그래서 모든 엘리먼트가 `value` 프로퍼티를 갖기는 하지만, 이 이벤트의 `target` 프로퍼티는 입력 필드라는 것이 명확해졌습니다.
결국 `onKey` 메소드는 템플릿에서 어떤 타입의 인자를 받아야 하는지 좀 더 활실해졌고, 이 인자를 어떻게 활용할 수 있는지에 대해서도 더 많은 정보를 제공할 수 있습니다.


<!--
### Passing `$event` is a dubious practice
-->
### `$event` 객체를 그대로 전달하는 것이 좋을까요?

<!--
Typing the event object reveals a significant objection to passing the entire DOM event into the method. Namely, the component has too much awareness of the template details.
It can't extract information without knowing more than it should about the HTML implementation.
That breaks the separation of concerns between the template, *what the user sees*, and the component, *how the application processes user data*.

The next section shows how to use template reference variables to address this problem.
-->
이벤트 객체에 타입을 지정하면 이벤트 핸들러 함수에 어떤 이벤트가 전달되는지 확실하게 확인할 수 있지만, 이벤트 핸들러가 템플릿을 신경써야 한다는 문제가 있습니다.
이벤트 객체에서 원하는 정보를 참조하려면 템플릿의 어떤 엘리먼트에서 이벤트가 발생했는지 알아야 하기 때문입니다.
이런 상황은 *사용자가 보는* 템플릿과 *데이터를 처리하는* 컴포넌트가 분리되어야 한다는 관점에서도 좋지 않습니다.

이번에는 템플릿 참조 변수를 활용해서 이 문제를 어떻게 해결할 수 있는지 알아봅시다.


<!--
## Get user input from a template reference variable
-->
## 템플릿 참조 변수로 사용자 입력 확인하기

<!--
There's another way to get the user data:
use Angular [**template reference variables**](guide/template-reference-variables).
These variables provide direct access to an element from within the template.
To declare a template reference variable, precede an identifier with a hash/pound character \(`#`\).

The following example uses a template reference variable to implement a keystroke loopback in a simple template.

<code-example header="src/app/loop-back.component.ts" path="user-input/src/app/loop-back.component.ts" region="loop-back-component"></code-example>

The template reference variable named `box`, declared on the `<input>` element, refers to the `<input>` element itself.
The code uses the `box` variable to get the input element's `value` and display it with interpolation between `<p>` tags.

The template is completely self-contained.
It doesn't bind to the component, and the component does nothing.

Type something in the input box, and watch the display update with each keystroke.

<div class="lightbox">

<img alt="loop back" src="generated/images/guide/user-input/keyup-loop-back-anim.gif">

</div>

<div class="callout is-helpful">

<header>This won't work at all unless you bind to an event.</header>

Angular updates the bindings and screen only if the app does something in response to asynchronous events, such as keystrokes.
This example code binds the `keyup` event to the number 0, the shortest template statement possible.
While the statement does nothing useful, it satisfies Angular's condition so that Angular updates the screen.

</div>

It's easier to get to the input box with the template reference variable than to go through the `$event` object.
Here's a rewrite of the previous `keyup` example that uses a template reference variable to get the user's input.

<code-example header="src/app/keyup.components.ts (v2)" path="user-input/src/app/keyup.components.ts" region="key-up-component-2"></code-example>

A nice aspect of this approach is that the component gets clean data values from the view.
It no longer requires knowledge of the `$event` and its structure.
-->
Angular에서 제공하는 [**템플릿 참조 변수**](guide/template-reference-variables)를 사용해서 사용자가 입력한 데이터를 확인해 봅시다.
이 방법을 사용하면 템플릿 안에서 엘리먼트에 직접 접근할 수 있습니다.
먼저, 템플릿 참조 변수를 선언하기 위해 엘리먼트에 해시 기호\(`#`\)를 붙여 변수를 선언합니다.

다음 예제는 템플릿 참조 변수를 활용하는 방법으로 템플릿에서 키 입력을 확인하는 예제입니다.

<code-example header="src/app/loop-back.component.ts" path="user-input/src/app/loop-back.component.ts" region="loop-back-component"></code-example>

이 예제에서 `<input>` 엘리먼트에 선언된 템플릿 참조 변수 `box`는 `<input>` 엘리먼트를 자체를 가리킵니다.
그리고 템플릿 안에서 `box` 변수의 `value` 프로퍼티를 참조하면 템플릿 안에서 입력 필드의 현재값을 참조할 수 있으며, 이 코드에서는 입력 필드의 현재값을 `<p>` 태그 안에 표시합니다.

이 예제에서 템플릿은 그 자체로 동작합니다. 템플릿에는 컴포넌트와 바인딩 된 프로퍼티는 아무것도 없으며, 컴포넌트가 하는 동작도 없습니다.

이제 입력 필드에 글자를 입력하면 키 입력이 있을 때마다 화면에 표시되는 값이 갱신됩니다.

<div class="lightbox">

<img alt="loop back" src="generated/images/guide/user-input/keyup-loop-back-anim.gif">

</div>

<div class="callout is-helpful">

<header>이 예제는 이벤트 바인딩을 해야 동작합니다.</header>

Angular는 키입력과 같은 비동기 이벤트가 발생할 때만 바인딩을 갱신하고 화면도 갱신합니다.
그래서 이 예제에서는 `keyup` 이벤트에 0을 바인딩하고 있는데, 이것은 템플릿 실행문을 바인딩하는 가장 간단한 방법입니다.
이 템플릿 실행문은 그 자체로 아무 의미가 없지만, Angular가 화면을 갱신할 수 있도록 이벤트를 바인딩하는 입장에서는 꼭 필요한 구문입니다.

</div>

템플릿 참조 변수는 `$event` 객체를 직접 활용하는 방법이 더 간단합니다.
위에서 살펴본 `keyup` 예제를 더 나은 방식으로 개선하면 다음과 같이 활용할 수 있습니다.

<code-example header="src/app/keyup.components.ts (v2)" path="user-input/src/app/keyup.components.ts" region="key-up-component-2"></code-example>

이 방식은 컴포넌트에서도 다른 것은 신경쓰지 않고 입력 필드의 데이터만 받을 수 있기 때문에 좋습니다.
컴포넌트는 더이상 템플릿의 구조나 `$event` 객체의 타입을 신경쓸 필요가 없습니다.


<a id="key-event"></a>

<!--
## Key event filtering (with `key.enter`)
-->
## 키 입력 필터링 (`key.enter`)

<!--
The `(keyup)` event handler hears *every keystroke*.
Sometimes only the *Enter* key matters, because it signals that the user has finished typing.
One way to reduce the noise would be to examine every `$event.keyCode` and take action only when the key is *Enter*.

There's an easier way:
bind to Angular's `keyup.enter` pseudo-event.
Then Angular calls the event handler only when the user presses *Enter*.

<code-example header="src/app/keyup.components.ts (v3)" path="user-input/src/app/keyup.components.ts" region="key-up-component-3"></code-example>

Here's how it works.

<div class="lightbox">

<img alt="key up 3" src="generated/images/guide/user-input/keyup3-anim.gif">

</div>
-->
`(keyup)` 이벤트 바인딩은 *모든 키 입력*에 반응합니다.
하지만 사용자가 입력을 끝내는 *엔터 키* 에만 반응하고 싶다면, 키 이벤트를 바인딩 할 때 `$event.keyCode`를 사용해서 *엔터 키* 만 반응하도록 필터링할 수 있습니다.

이 때 Angular는 좀 더 간단한 문법을 제공합니다. 템플릿에서 `keyup.enter`라고 바인딩하면 엔터키가 입력되었을 떄만 이벤트 핸들러를 실행할 수 있습니다.

<code-example header="src/app/keyup.components.ts (v3)" path="user-input/src/app/keyup.components.ts" region="key-up-component-3"></code-example>

이 예제는 다음과 같이 동작합니다.

<div class="lightbox">

<img alt="key up 3" src="generated/images/guide/user-input/keyup3-anim.gif">

</div>


<!--
## On blur
-->
## 포커스를 잃을 때

<!--
In the previous example, the current state of the input box is lost if the user mouses away and clicks elsewhere without first pressing *Enter*.
The component's `value` property is updated only when the user presses *Enter*.

To fix this issue, listen to both the *Enter* key and the `blur` event.

<code-example header="src/app/keyup.components.ts (v4)" path="user-input/src/app/keyup.components.ts" region="key-up-component-4"></code-example>
-->
이전 예제에서 사용자가 입력 박스 밖을 클릭하면 입력 박스가 포커스를 잃습니다.
그리고 컴포넌트의 `value` 프로퍼티 값이 새로운 값으로 갱신됩니다.

이 이슈를 해결하려면 *엔터 키* 이벤트와 `blur` 이벤트를 모두 감지하면 됩니다.

<code-example header="src/app/keyup.components.ts (v4)" path="user-input/src/app/keyup.components.ts" region="key-up-component-4"></code-example>


<!--
## Put it all together
-->
## 모든 기능 활용해보기

<!--
This page demonstrated several event binding techniques.

Now, put it all together in a micro-app that can display a list of heroes and add new heroes to the list.
The user can add a hero by typing the hero's name in the input box and clicking **Add**.

<div class="lightbox">

<img alt="Little Tour of Heroes" src="generated/images/guide/user-input/little-tour-anim.gif">

</div>

Below is the "Little Tour of Heroes" component.

<code-example header="src/app/little-tour.component.ts" path="user-input/src/app/little-tour.component.ts" region="little-tour"></code-example>
-->
이 문서에서는 이벤트 바인딩 테크닉에 대해 알아봤습다.

히어로의 목록을 표시하고, 이 목록에 히어로를 추가할 수 있는 앱을 간단하게 만들어 봅시다.
사용자는 히어로의 이름을 입력 필드에 입력하고 **Add** 버튼을 눌러서 이 히어로의 이름을 목록을 추가할 수 있습니다.

<div class="lightbox">

<img alt="Little Tour of Heroes" src="generated/images/guide/user-input/little-tour-anim.gif">

</div>

그리고 다음 코드는 "Little Tour of Heroes"에서 사용한 컴포넌트입니다.

<code-example header="src/app/little-tour.component.ts" path="user-input/src/app/little-tour.component.ts" region="little-tour"></code-example>


<!--
### Observations
-->
### 코드 분석

<!--
| Observations                                | Details |
|:---                                         |:---     |
| Use template variables to refer to elements | The `newHero` template variable refers to the `<input>` element. You can reference `newHero` from any sibling or child of the `<input>` element.                                                     |
| Pass values, not elements                   | Instead of passing the `newHero` into the component's `addHero` method, get the input box value and pass *that* to `addHero`.                                                                        |
| Keep template statements simple             | The `(blur)` event is bound to two JavaScript statements. The first statement calls `addHero`. The second statement, `newHero.value=''`, clears the input box after a new hero is added to the list. |
-->
| 분석                         | 설명                                                                                                                                                      |
|:---------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| 엘리먼트를 참조하려면 템플릿 변수를 사용하세요. | 템플릿 변수 `newHero`는 `<input>` 엘리먼트를 가리킵니다. 템플릿 변수를 활용하면 엘리먼트를 간단하게 참조할 수 있습니다.                                                                            |
| 엘리먼트가 아니라 값을 전달하세요.        | 컴포넌트의 `addHero` 메소드에는 `newHero` 변수를 그대로 전달하지 말고, `addHero` 메소드에서 필요한 입력 필드의 값만 전달하는 것이 좋습니다.                                                            |
| 템플릿 실행문은 간단하게 작성하세요.       | 이 코드에서 `(blur)` 이벤트는 JavaScript 실행문 2개를 실행합니다. 하나는 `addHero` 메소드를 실행하는 것이고, 다른 하나는 히어로가 배열에 추가된 이후에 입력 필드에 입력된 값을 지우기 위해 `newHero.value=''`를 실행하는 것입니다. |


<!--
## Source code
-->
## 소스 코드

<!--
Following is all the code discussed in this page.

<code-tabs>
    <code-pane header="click-me.component.ts" path="user-input/src/app/click-me.component.ts"></code-pane>
    <code-pane header="keyup.components.ts" path="user-input/src/app/keyup.components.ts"></code-pane>
    <code-pane header="loop-back.component.ts" path="user-input/src/app/loop-back.component.ts"></code-pane>
    <code-pane header="little-tour.component.ts" path="user-input/src/app/little-tour.component.ts"></code-pane>
</code-tabs>

Angular also supports passive event listeners.
For example, you can use the following steps to make the scroll event passive.

1.  Create a file `zone-flags.ts` under `src` directory.
1.  Add the following line into this file.

    <code-example format="typescript" language="typescript">

    (window as any)['__zone_symbol__PASSIVE_EVENTS'] = ['scroll'];

    </code-example>

1.  In the `src/polyfills.ts` file, before importing zone.js, import the newly created `zone-flags`.

    <code-example format="typescript" language="typescript">

    import './zone-flags';
    import 'zone.js';  // Included with Angular CLI.

    </code-example>

After those steps, if you add event listeners for the `scroll` event, the listeners are going to be `passive`.
-->
이 문서에서 다룬 코드를 모두 살펴봅시다.

<code-tabs>
    <code-pane header="click-me.component.ts" path="user-input/src/app/click-me.component.ts"></code-pane>
    <code-pane header="keyup.components.ts" path="user-input/src/app/keyup.components.ts"></code-pane>
    <code-pane header="loop-back.component.ts" path="user-input/src/app/loop-back.component.ts"></code-pane>
    <code-pane header="little-tour.component.ts" path="user-input/src/app/little-tour.component.ts"></code-pane>
</code-tabs>

Angular는 패시브 이벤트 리스너도 지원합니다.
스크롤 이벤트를 활용하려면 이렇게 작업하면 됩니다.

1.  `src` 디렉토리 아래 `zone-flags.ts` 파일을 생성합니다.
1.  이 파일에 아래 내용을 추가합니다.

    <code-example format="typescript" language="typescript">

    (window as any)['__zone_symbol__PASSIVE_EVENTS'] = ['scroll'];

    </code-example>

1.  `src/polyfills.ts` 파일에서 zone.js를 로드하기 전에 새로 만든 `zone-flags`를 먼저 로드합니다.

    <code-example format="typescript" language="typescript">

    import './zone-flags';
    import 'zone.js';  // Included with Angular CLI.

    </code-example>

이렇게 작업하고 `scroll` 이벤트 리스너를 추가하면 이 리스너는 `passive`로 동작합니다.


<!--
## Summary
-->
## 정리

<!--
You have mastered the basic primitives for responding to user input and gestures.

These techniques are useful for small-scale demonstrations, but they quickly become verbose and clumsy when handling large amounts of user input.
Two-way data binding is a more elegant and compact way to move values between data entry fields and model properties.
The [`Forms`](guide/forms-overview) page explains how to write two-way bindings with `NgModel`.
-->
이 문서에서는 사용자 입력에 반응하는 방법을 간단하게 알아봤습니다.

이 테크닉은 작은 앱에서는 물론이고, 복잡한 사용자 동작에 반응할 때도 계속 사용됩니다.
그리고 복잡한 폼이나 모델을 다룬다면 양방향 데이터 바인딩을 사용하는 것이 좀 더 간단하고 자연스럽게 사용자 반응에 동작할 수 있는 방법이 될 수 있습니다.
다음 [폼](guide/forms-overview) 가이드 문서에서는 `NgModel`을 활용하는 양방향 바인딩에 대해 알아봅니다.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
