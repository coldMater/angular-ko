<!--
# Event binding
-->
# 이벤트 바인딩(Event binding)

<!--
Event binding allows you to listen for and respond to user actions such as keystrokes, mouse movements, clicks, and touches.

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>
-->
이벤트 바인딩 문법을 활용하면 키입력이나 마우스 이동, 클릭, 터치 이벤트에 반응할 수 있습니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제는 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Binding to events
-->
## 이벤트 바인딩하기

<!--
To bind to an event you use the Angular event binding syntax.
This syntax consists of a target event name within parentheses to the left of an equal sign, and a quoted template statement to the right.
In the following example, the target event name is `click` and the template statement is `onSave()`.

<code-example language="html" header="Event binding syntax">
&lt;button (click)="onSave()"&gt;Save&lt;/button&gt;
</code-example>

The event binding listens for the button's click events and calls the component's `onSave()` method whenever a click occurs.

<div class="lightbox">
  <img src='generated/images/guide/template-syntax/syntax-diagram.svg' alt="Syntax diagram">
</div>
-->
이벤트 바인딩 문법을 활용하면 키입력이나 마우스 이동, 클릭, 터치 이벤트에 반응할 수 있습니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제는 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>

Angular 이벤트 바인딩 문법은 소괄호(`(`, `)`) 안에 **대상이 되는 이벤트**의 이름을 지정하고 등호(`=`)를 붙인 후 템플릿 실행문을 작성하면 됩니다.
그래서 버튼에서 발생하는 클릭 이벤트를 감지하다가 이벤트가 발생했을 때 컴포넌트에 정의된 `onSave()` 메소드를 실행하려면 이렇게 작성하면 됩니다:

<div class="lightbox">
  <img src='generated/images/guide/template-syntax/syntax-diagram.svg' alt="Syntax diagram">
</div>


<!--
## Binding to passive events
-->
## 패시브 이벤트 바인딩하기

<!--
Angular also supports passive event listeners. For example, you can use the following steps to make a scroll event passive.

1. Create a file `zone-flags.ts` under `src` directory.
2. Add the following line into this file.

```
(window as any)['__zone_symbol__PASSIVE_EVENTS'] = ['scroll'];
```

3. In the `src/polyfills.ts` file, before importing zone.js, import the newly created `zone-flags`.

```
import './zone-flags';
import 'zone.js';  // Included with Angular CLI.
```

After those steps, if you add event listeners for the `scroll` event, the listeners will be `passive`.
-->
Angular는 패시브 이벤트 리스너도 지원합니다.
스크롤 이벤트를 감지하는 경우를 생각해 봅시다.

1. `src` 디렉토리 아래에 `zone-flags.ts` 파일을 생성합니다.
2. 이 파일에 이런 내용을 추가합니다.

```
(window as any)['__zone_symbol__PASSIVE_EVENTS'] = ['scroll'];
```

3. 그리고 `src/polyfills.ts` 파일에서 zone.js를 불러오기 전에 이렇게 만든 `zone-flags` 파일을 불러옵니다.

```
import './zone-flags';
import 'zone.js';  // Included with Angular CLI.
```

이렇게 작업하고 `scroll` 이벤트를 감지하는 이벤트 리스너를 추가하면, 이 이벤트 리스너는 `passive` 이벤트 리스너가 됩니다.


{@a custom-events-with-eventemitter}

<!--
## Custom events with `EventEmitter`
-->
## `EventEmitter`로 커스텀 이벤트 생성하기

<!--
[Directives](guide/built-in-directives) typically raise custom events with an Angular [EventEmitter](api/core/EventEmitter) as follows.

1. The directive creates an `EventEmitter` and exposes it as a property.
1. The directive then calls `EventEmitter.emit(data)` to emit an event, passing in message data, which can be anything.
1. Parent directives listen for the event by binding to this property and accessing the data through the `$event` object.

Consider an `ItemDetailComponent` that presents item information and responds to user actions.
Although the `ItemDetailComponent` has a delete button, it doesn't contain the functionality to delete the hero.
It can only raise an event reporting the user's delete request.


<code-example path="event-binding/src/app/item-detail/item-detail.component.html" header="src/app/item-detail/item-detail.component.html (template)" region="line-through"></code-example>

The component defines a `deleteRequest` property that returns an `EventEmitter`.
When the user clicks **Delete**, the component invokes the `delete()` method, telling the `EventEmitter` to emit an `Item` object.

<code-example path="event-binding/src/app/item-detail/item-detail.component.ts" header="src/app/item-detail/item-detail.component.ts (deleteRequest)" region="deleteRequest"></code-example>

The hosting parent component binds to the `deleteRequest` event of the `ItemDetailComponent` as follows.

<code-example path="event-binding/src/app/app.component.html" header="src/app/app.component.html (event-binding-to-component)" region="event-binding-to-component"></code-example>

When the `deleteRequest` event fires, Angular calls the parent component's `deleteItem()` method with the item.
-->
[디렉티브](guide/built-in-directives)에서 Angular [EventEmitter](api/core/EventEmitter) 클래스를 활용하면 커스텀 이벤트를 발생시킬 수 있습니다.

1. 디렉티브에 `EventEmitter` 타입으로 프로퍼티를 선언하고 외부로 공개합니다.
1. 디렉티브에서 `EventEmitter.emit(data)` 를 실행하면 이벤트를 발생시키면서 데이터를 함께 전달할 수 있습니다.
1. 부모 디렉티브에서 이 이벤트가 발생하는 것을 감지하고 있다가 `$event` 객체로 자식 디렉티브에서 보낸 데이터를 활용하면 됩니다.

`ItemDetailComponent`는 히어로의 세부정보를 화면에 표시하고 사용자의 입력에 처리하는 컴포넌트입니다.
그리고 `ItemDetailComponent`에는 삭제 버튼이 하나 있는데, `ItemDetailComponent`에서는 히어로를 삭제하는 방법을 알지 못합니다.
이 컴포넌트는 사용자가 삭제 요청을 보냈다는 이벤트를 발생시키는 역할만 합니다.


<code-example path="event-binding/src/app/item-detail/item-detail.component.html" header="src/app/item-detail/item-detail.component.html (템플릿)" region="line-through"></code-example>

컴포넌트에 정의된 `deleteRequest` 프로퍼티는 `EventEmitter` 타입으로 선언되어 있습니다.
그리고 사용자가 *delete* 버튼을 클릭하면 `delete()` 메소드를 실행하며 `EventEmitter` 클래스를 통해 `Item` 객체를 컴포넌트 외부로 보냅니다.

<code-example path="event-binding/src/app/item-detail/item-detail.component.ts" header="src/app/item-detail/item-detail.component.ts (deleteRequest())" region="deleteRequest"></code-example>

부모 컴포넌트에서는 `deleteRequest` 이벤트를 `deleteItem()` 메서드와 바인딩하고 있습니다.

<code-example path="event-binding/src/app/app.component.html" header="src/app/app.component.html (event-binding-to-component)" region="event-binding-to-component"></code-example>

이제 `deleteRequest` 이벤트가 발생하면 부모 컴포넌트의 `deleteItem()` 메서드가 실행됩니다.


<!--
### Determining an event target
-->
### 이벤트 대상 확인하기

<!--
To determine an event target, Angular checks if the name of the target event matches an event property of a known directive.
In the following example, Angular checks to see if `myClick` is an event on the custom `ClickDirective`.

<code-example path="event-binding/src/app/app.component.html" region="custom-directive" header="src/app/app.component.html"></code-example>

If the target event name, `myClick` fails to match an element event or an output property of `ClickDirective`, Angular reports an "unknown directive" error.
-->
Angular는 이벤트 대상을 확인하기 위해 대상 이벤트 이름이 디렉티브의 이벤트 프로퍼티 이름과 같은지 검사합니다.
그래서 아래 예제처럼 구현하면 `myClick` 이벤트가 `ClickDirective`에서 발생한 커스텀 이벤트라는 것을 판단할 수 있습니다.

<code-example path="event-binding/src/app/app.component.html" region="custom-directive" header="src/app/app.component.html"></code-example>

엘리먼트 이벤트나 `ClickDirective` 프로퍼티에서 `myClick`를 찾지 못하면 "unknown directive" 에러가 발생합니다.


<!--
## What's next
-->
## 다음 단계

<!--
For more information on how event binding works, see [How event binding works](guide/event-binding-concepts).
-->
이벤트 바인딩이 동작하는 것에 대새 자세하게 알아보려면 [이벤트 바인딩이 동작하는 과정](guide/event-binding-concepts) 문서를 참고하세요.