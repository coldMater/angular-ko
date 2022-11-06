<!--
# Observables in Angular
-->
# Angular가 제공하는 옵저버블

<!--
Angular makes use of observables as an interface to handle a variety of common asynchronous operations.
For example:

<!-todo: Have Alex review this ->
<!- *   You can define [custom events](guide/event-binding#custom-events-with-eventemitter) that send observable output data from a child to a parent component ->
*   The HTTP module uses observables to handle AJAX requests and responses
*   The Router and Forms modules use observables to listen for and respond to user-input events
-->
Angular는 비동기 로직을 처리할 때 옵저버블을 다양하게 사용합니다.
몇 가지 예를 들면 다음과 같은 경우에 옵저버블을 사용합니다:

*   HTTP 모듈이 AJAX 요청을 보내거나 응답을 받아 처리할 때 옵저버블을 사용합니다.
*   라우터와 폼 모듈이 사용자 입력 이벤트를 감지할 때 옵저버블을 사용합니다.


<!--
## Transmitting data between components
-->
## 컴포넌트간 데이터 전달하기

<!--
Angular provides an `EventEmitter` class that is used when publishing values from a component through the [`@Output()` decorator](guide/inputs-outputs#output).
`EventEmitter` extends [RxJS `Subject`](https://rxjs.dev/api/index/class/Subject), adding an `emit()` method so it can send arbitrary values.
When you call `emit()`, it passes the emitted value to the `next()` method of any subscribed observer.

A good example of usage can be found in the [EventEmitter](api/core/EventEmitter) documentation.
Here is the example component that listens for open and close events:

<code-example format="typescript" language="typescript">

&lt;app-zippy (open)="onOpen(&dollar;event)" (close)="onClose(&dollar;event)"&gt;&lt;/app-zippy&gt;

</code-example>

Here is the component definition:

<code-example header="EventEmitter" path="observables-in-angular/src/main.ts" region="eventemitter"></code-example>
-->
컴포넌트 밖으로 데이터를 보내려면 [`@Output()` 데코레이터](guide/inputs-outputs#output)가 지정된 프로퍼티에 `EventEmitter` 인스턴스를 사용합니다.
`EventEmitter`는 [RxJS가 제공하는 `Subject`](https://rxjs.dev/api/index/class/Subject) 클래스를 확장한 클래스입니다.
`Subject`에 있는 기능 외에 `EventEmitter`가 제공하는 `emit()` 메소드를 사용하면 데이터를 옵저버블에 실어 보낼 수 있습니다.
그리고 이렇게 보낸 데이터는 이 옵저버블을 구독하는 옵저버의 `next()` 메소드가 받을 수 있습니다.

`EventEmitter` 클래스를 사용하는 방법은 [EventEmitter](api/core/EventEmitter) 문서에서 확인할 수 있습니다.
이 문서에서는 컴포넌트의 `open` 이벤트와 `close` 이벤트를 감지하는 예제를 살펴봅시다.

<code-example format="typescript" language="typescript">

&lt;app-zippy (open)="onOpen(&dollar;event)" (close)="onClose(&dollar;event)"&gt;&lt;/app-zippy&gt;

</code-example>

이 컴포넌트는 다음과 같이 정의되어 있습니다:

<code-example header="EventEmitter" path="observables-in-angular/src/main.ts" region="eventemitter"></code-example>


## HTTP

<!--
Angular's `HttpClient` returns observables from HTTP method calls.
For instance, `http.get('/api')` returns an observable.
This provides several advantages over promise-based HTTP APIs:

*   Observables do not mutate the server response \(as can occur through chained `.then()` calls on promises\).
    Instead, you can use a series of operators to transform values as needed.

*   HTTP requests are cancellable through the `unsubscribe()` method
*   Requests can be configured to get progress event updates
*   Failed requests can be retried easily
-->
Angular에서 제공하는 `HttpClient`는 HTTP 요청 결과를 옵저버블로 반환합니다.
그래서 `http.get(‘/api’)`를 실행한 결과도 옵저버블입니다.
옵저버블을 사용하는 방식은 Promise를 사용하는 방식과 비교했을 때 더 좋은 점이 몇가지 있습니다:

*   옵저버블은 서버에서 받은 응답을 다른 객체로 변환하지 않습니다. Promise를 사용하면 `.then()`으로 체이닝 할때마다 새로운 객체가 생성되던 것과는 다릅니다.
    대신, 옵저버블은 연산자를 사용해서 옵저버블의 모양을 조작합니다.

*   `unsubscribe()` 메소드를 실행하면 아직 완료되지 않은 HTTP 요청을 취소할 수 있습니다.
*   서버의 응답 진행률을 확인할 수 있습니다.
*   실패한 요청을 재시도하는 것도 간단합니다.


<!--
## Async pipe
-->
## Async 파이프

<!--
The [AsyncPipe](api/common/AsyncPipe) subscribes to an observable or promise and returns the latest value it has emitted.
When a new value is emitted, the pipe marks the component to be checked for changes.

The following example binds the `time` observable to the component's view.
The observable continuously updates the view with the current time.

<code-example header="Using async pipe" path="observables-in-angular/src/main.ts" region="pipe"></code-example>
-->
[AsyncPipe](api/common/AsyncPipe)는 옵저버블이나 Promise를 구독하고, 이 객체가 담고 있는 마지막 값을 반환합니다.
그리고 새로운 값이 전달되면 컴포넌트가 변화를 감지하도록 알립니다.

아래 예제는 컴포넌트의 뷰에서 옵저버블 타입인 `time` 프로퍼티를 바인딩하는 예제입니다.
이 옵저버블은 컴포넌트에서 새로운 스트림을 생성할 때마다 계속 갱신됩니다.

<code-example header="Async 파이프 사용하기" path="observables-in-angular/src/main.ts" region="pipe"></code-example>


## Router

<!--
[`Router.events`](api/router/Router#events) provides events as observables.
You can use the `filter()` operator from RxJS to look for events of interest, and subscribe to them in order to make decisions based on the sequence of events in the navigation process.
Here's an example:

<code-example header="Router events" path="observables-in-angular/src/main.ts" region="router"></code-example>

The [ActivatedRoute](api/router/ActivatedRoute) is an injected router service that makes use of observables to get information about a route path and parameters.
For example, `ActivatedRoute.url` contains an observable that reports the route path or paths.
Here's an example:

<code-example header="ActivatedRoute" path="observables-in-angular/src/main.ts" region="activated_route"></code-example>
-->
[`Router.events`](api/router/Router#events)는 라우팅 이벤트를 옵저버블로 전달합니다.
이 중 필요한 이벤트만 처리하려면 RxJS에서 제공하는 `filter()` 연산자를 사용할 수 있으며, 이 프로퍼티를 구독하면 네비게이션 진행상황에 맞게 이벤트를 처리할 수 있습니다.

<code-example header="라우터 이벤트" path="observables-in-angular/src/main.ts" region="router"></code-example>

[ActivatedRoute](api/router/ActivatedRoute)도 현재 라우팅 경로나 라우팅 인자를 옵저버블로 제공합니다.
그래서 이 서비스의 프로퍼티 중 `ActivatedRoute.url`를 구독해도 현재 라우팅 경로를 확인할 수 있습니다.
예제를 봅시다:

<code-example header="ActivatedRoute" path="observables-in-angular/src/main.ts" region="activated_route"></code-example>


<!--
## Reactive forms
-->
## 반응형 폼

<!--
Reactive forms have properties that use observables to monitor form control values.
The [`FormControl`](api/forms/FormControl) properties `valueChanges` and `statusChanges` contain observables that raise change events.
Subscribing to an observable form-control property is a way of triggering application logic within the component class.
For example:

<code-example header="Reactive forms" path="observables-in-angular/src/main.ts" region="forms"></code-example>
-->
반응형 폼에서 폼 컨트롤의 값을 추적할 때도 옵저버블을 사용할 수 있습니다.
예를 들면 [`FormControl`](api/forms/FormControl)의 프로퍼티 중 `valueChanges`와 `statusChanges`를 구독하면 폼 컨트롤의 값과 상태가 변하는 것을 확인할 수 있습니다.
폼 컨트롤의 옵저버블 프로퍼티를 구독하면 컴포넌트 클래스에서 애플리케이션 로직을 자유롭게 작성할 수 있습니다.
예제 코드를 봅시다:

<code-example header="반응형 폼" path="observables-in-angular/src/main.ts" region="forms"></code-example>


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
