# Using observables to pass values

Observables provide support for passing messages between parts of your application.
They are used frequently in Angular and are a technique for event handling, asynchronous programming, and handling multiple values.

The observer pattern is a software design pattern in which an object, called the *subject*, maintains a list of its dependents, called *observers*, and notifies them automatically of state changes.
This pattern is similar (but not identical) to the [publish/subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) design pattern.

Observables are declarative&mdash;that is, you define a function for publishing values, but it is not executed until a consumer subscribes to it.
The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.

An observable can deliver multiple values of any type&mdash;literals, messages, or events, depending on the context. The API for receiving values is the same whether the values are delivered synchronously or asynchronously. Because setup and teardown logic are both handled by the observable, your application code only needs to worry about subscribing to consume values, and when done, unsubscribing. Whether the stream was keystrokes, an HTTP response, or an interval timer, the interface for listening to values and stopping listening is the same.

Because of these advantages, observables are used extensively within Angular, and for application development as well.

<!--
## Basic usage and terms
-->
## 용어 정의, 사용 방법

<!--
As a publisher, you create an `Observable` instance that defines a *subscriber* function. This is the function that is executed when a consumer calls the `subscribe()` method. The subscriber function defines how to obtain or generate values or messages to be published.

To execute the observable you have created and begin receiving notifications, you call its `subscribe()` method, passing an *observer*. This is a JavaScript object that defines the handlers for the notifications you receive. The `subscribe()` call returns a `Subscription` object that has an `unsubscribe()` method, which you call to stop receiving notifications.

Here's an example that demonstrates the basic usage model by showing how an observable could be used to provide geolocation updates.

<code-example class="no-auto-link" path="observables/src/geolocation.ts" header="Observe geolocation updates"></code-example>
-->
발행자는 *구독자* 함수를 사용해서 `Observable` 인스턴스를 생성합니다.
구독자 함수는 구독자가 `subscribe()` 메소드를 사용할 때 실행되며, 이 함수에서 데이터나 메시지를 생성하고 발행합니다.

그리고 구독자 함수를 `subscribe()`로 구독할 때 *옵저버(observer)*를 함께 전달하며, 옵저버는 옵저버블에서 발행된 데이터를 어떻게 처리할지 JavaScript 객체 형태로 정의한 것입니다.
옵저버블의 `subscribe()` 함수를 실행하면 반환되는 `Subscription` 타입의 객체가 옵저버이며, 이 객체의 `unsubscribe()`를 실행하면 옵저버블 구독을 해지할 수 있습니다.

다음 코드는 옵저버블을 사용해서 사용자의 접속 위치를 확인하는 예제 코드입니다.

<code-example class="no-auto-link" path="observables/src/geolocation.ts" header="접속 위치 추적하기"></code-example>


<!--
## Defining observers
-->
## 옵저버 정의하기

<!--
A handler for receiving observable notifications implements the `Observer` interface. It is an object that defines callback methods to handle the three types of notifications that an observable can send:

| Notification type | Description |
|:---------|:-------------------------------------------|
| `next`  | Required. A handler for each delivered value. Called zero or more times after execution starts.|
| `error` | Optional. A handler for an error notification. An error halts execution of the observable instance.|
| `complete` | Optional. A handler for the execution-complete notification. Delayed values can continue to be delivered to the next handler after execution is complete.|

An observer object can define any combination of these handlers. If you don't supply a handler for a notification type, the observer ignores notifications of that type.
-->
옵저버블 스트림을 처리하려면 `Observer` 인터페이스로 옵저버를 정의해야 합니다. 이 옵저버는 옵저버블이 보내는 세 종류의 알림을 처리하는 콜백 함수로 구성됩니다.

| 알림 타입 | 설명 |
|:---------|:-------------------------------------------|
| `next`  | 필수. 데이터 스트림을 처리하는 핸들러입니다. 옵저버블 구독을 시작한 후 여러번 실행됩니다.|
| `error` | 필수는 아님. 에러 스트림을 처리하는 핸들러입니다. 에러 스트림이 전달되면 이후 옵저버블 로직이 실행되지 않습니다.|
| `complete` | 필수는 아님. 옵저버블 종료 스트림을 처리하는 핸들러입니다. 옵저버블에서 지연 로직을 사용한다면 옵저버블이 종료된 이후에도 새로운 데이터가 전달될 수 있습니다.|

옵저버 객체는 이 3가지 핸들러를 조합해서 정의합니다. 특정 타입의 알림을 사용하지 않는다면, 이 타입에 해당하는 핸들러를 생략해도 됩니다.


<!--
## Subscribing
-->
## 구독 (Subscribing)

<!--
An `Observable` instance begins publishing values only when someone subscribes to it. You subscribe by calling the `subscribe()` method of the instance, passing an observer object to receive the notifications.

<div class="alert is-helpful">

In order to show how subscribing works, we need to create a new observable. There is a constructor that you use to create new instances, but for illustration, we can use some methods from the RxJS library that create simple observables of frequently used types:

  * `of(...items)`&mdash;Returns an `Observable` instance that synchronously delivers the values provided as arguments.
  * `from(iterable)`&mdash;Converts its argument to an `Observable` instance. This method is commonly used to convert an array to an observable.

</div>

Here's an example of creating and subscribing to a simple observable, with an observer that logs the received message to the console:

<code-example
  path="observables/src/subscribing.ts"
  region="observer"
  header="Subscribe using observer"></code-example>

Alternatively, the `subscribe()` method can accept callback function definitions in line, for `next`, `error`, and `complete` handlers. For example, the following `subscribe()` call is the same as the one that specifies the predefined observer:

<code-example path="observables/src/subscribing.ts" region="sub_fn" header="Subscribe with positional arguments"></code-example>

In either case, a `next` handler is required. The `error` and `complete` handlers are optional.

Note that a `next()` function could receive, for instance, message strings, or event objects, numeric values, or structures, depending on context. As a general term, we refer to data published by an observable as a *stream*. Any type of value can be represented with an observable, and the values are published as a stream.
-->
`Observable` 인스턴스는 누군가 이 옵저버블을 구독해야 데이터를 발행하기 시작합니다.
옵저버블 인스턴스에서 제공하는 `subscribe()` 함수를 실행하면 구독을 시작할 수 있으며, 이 때 옵저버블을 처리하는 옵저버 객체를 함께 전달합니다.

<div class="alert is-helpful">

구독이 동작하는 것을 확인하려면 새로운 옵저버블을 생성해야 합니다. 이 때 활용할 수 있는 RxJS 함수는 여러가지지만, 이 문서에서는 간단하게 개념만 살펴볼 것이기 때문에 다음 함수들을 주로 사용할 것입니다:

  * `of(...배열)`&mdash;인자로 전달한 배열의 항목을 하나씩 전달하는 `Observable` 인스턴스를 생성합니다.
  * `from(이터러블)`&mdash;인자로 전달한 이터러블의 항목을 하나씩 전달하는 `Observable` 인스턴스를 생성합니다. 이 메소드는 배열을 옵저버블로 변환할 때 자주 사용합니다.

</div>

Here's an example of creating and subscribing to a simple observable, with an observer that logs the received message to the console:

<code-example
  path="observables/src/subscribing.ts"
  region="observer"
  header="옵저버 객체로 구독하기"></code-example>

이 예제처럼 `subscribe()` 메소드를 실행하면서 옵저버 객체를 전달하는 방식 대신, `subscribe()` 메소드를 실행하면서 인자로 `next`, `error`, `complete` 핸들러를 바로 지정할 수도 있습니다.
아래 코드를 실행한 결과는 이전과 같습니다.

<code-example path="observables/src/subscribing.ts" region="sub_fn" header="함수의 인자로 구독하기"></code-example>

두 경우 모두 `next` 핸들러는 필수항목입니다. `error`와 `complete` 핸들러는 생략할 수 있습니다.

이 때 `next()` 함수는 객체의 인스턴스나 문자열 형태의 메시지, 이벤트 객체, 숫자 등 어떠한 객체라도 자유롭게 받을 수 있습니다.
이렇게 옵저버블로 발행되는 데이터를 *스트림(stream)* 이라고 합니다.
옵저버블은 타입에 관계없이 자유롭게 데이터를 처리할 수 있으며, 이 데이터는 스트림이 되어 구독자에게 전달됩니다.



<!--
## Creating observables
-->
## 옵저버블 생성하기

<!--
Use the `Observable` constructor to create an observable stream of any type. The constructor takes as its argument the subscriber function to run when the observable’s `subscribe()` method executes. A subscriber function receives an `Observer` object, and can publish values to the observer's `next()` method.

For example, to create an observable equivalent to the `of(1, 2, 3)` above, you could do something like this:

<code-example path="observables/src/creating.ts" region="subscriber" header="Create observable with constructor"></code-example>

To take this example a little further, we can create an observable that publishes events. In this example, the subscriber function is defined inline.

<code-example path="observables/src/creating.ts" region="fromevent" header="Create with custom fromEvent function"></code-example>

Now you can use this function to create an observable that publishes keydown events:

<code-example path="observables/src/creating.ts" region="fromevent_use" header="Use custom fromEvent function"></code-example>
-->
옵저버블 스트림을 생성하려면 `Observable` 생성자를 사용하면 됩니다.
이 때 생성자는 구독자 함수(subscriber function)를 인자로 받으며, 인자로 받은 함수에 정의된 내용으로 옵저버블 스트림을 생성합니다.
구독자 함수는 `Observer` 객체를 인자로 받는데, 이 객체의 `next()` 메소드를 실행하면 옵저버블 스트림을 발행할 수 있습니다.

예를 들어 `Observable.of(1, 2, 3)`과 같은 동작을 하는 옵저버블을 직접 구현하려면 다음과 같이 작성합니다:

<code-example path="observables/src/creating.ts" region="subscriber" header="Create observable with constructor"></code-example>

이 코드는 이벤트 객체를 발생하는 옵저버블을 만들 때도 활용할 수 있습니다.
이 경우라면 다음과 같이 정의하면 됩니다.

<code-example path="observables/src/creating.ts" region="fromevent" header="fromEvent() 함수로 옵저버블 생성하기"></code-example>

이 함수를 사용해서 키다운 이벤트를 처리하려면 다음과 같이 작성합니다:

<code-example path="observables/src/creating.ts" region="fromevent_use" header="fromEvent() 함수 활용하기"></code-example>


<!--
## Multicasting
-->
## 멀티캐스팅 (Multicasting)

<!--
A typical observable creates a new, independent execution for each subscribed observer. When an observer subscribes, the observable wires up an event handler and delivers values to that observer. When a second observer subscribes, the observable then wires up a new event handler and delivers values to that second observer in a separate execution.

Sometimes, instead of starting an independent execution for each subscriber, you want each subscription to get the same values&mdash;even if values have already started emitting. This might be the case with something like an observable of clicks on the document object.

*Multicasting* is the practice of broadcasting to a list of multiple subscribers in a single execution. With a multicasting observable, you don't register multiple listeners on the document, but instead re-use the first listener and send values out to each subscriber.

When creating an observable you should determine how you want that observable to be used and whether or not you want to multicast its values.

Let’s look at an example that counts from 1 to 3, with a one-second delay after each number emitted.

<code-example path="observables/src/multicasting.ts" region="delay_sequence" header="Create a delayed sequence"></code-example>

Notice that if you subscribe twice, there will be two separate streams, each emitting values every second. It looks something like this:

<code-example path="observables/src/multicasting.ts" region="subscribe_twice" header="Two subscriptions"></code-example>

 Changing the observable to be multicasting could look something like this:

<code-example path="observables/src/multicasting.ts" region="multicast_sequence" header="Create a multicast subscriber"></code-example>

<div class="alert is-helpful">
   Multicasting observables take a bit more setup, but they can be useful for certain applications. Later we will look at tools that simplify the process of multicasting, allowing you to take any observable and make it multicasting.
</div>
-->
옵저버블은 일반적으로 옵저버블을 구독하는 옵저버끼리 영향을 주지 않는 단일 데이터를 생성합니다.
그리고 이 데이터는 옵저버블을 구독하는 이벤트 핸들러에 각각 전달되며, 개별 옵저버가 이 데이터를 받아서 처리합니다.
그래서 두 번째 옵저버가 구독을 시작하더라도 그 전에 구독한 옵저버와는 관련이 없습니다.

그런데 어떤 경우에는, 이미 발생되어 처리된 데이터를 다른 구독자가 다시 받고 싶은 경우가 있습니다.
이 경우는 도큐먼트 객체에서 일어나는 클릭 이벤트를 옵저버블로 처리하는 경우에도 적용할 수 있습니다.

*멀티캐스팅*은 여러 구독자가 같은 실행 싸이클에서 실행될 수 있도록 브로드캐스팅(broadcasting)하는 방법입니다.
멀티캐스팅 옵저버블을 사용하면 도큐먼트에 여러개의 리스너를 연결하지 않아도 모든 구독자들이 같은 데이터 객체를 처리할 수 있습니다.

옵저버블을 어떻게 사용할지, 멀티캐스팅을 사용할지 여부는 옵저버블을 생성할 때 지정합니다.

1부터 3까지 숫자를 세는 예제를 봅시다. 이 예제는 1초마다 각각의 숫자를 스트림으로 보냅니다.

<code-example path="observables/src/multicasting.ts" region="delay_sequence" header="시퀀스 정의하기"></code-example>

옵저버블을 두 번 구독하면 각각의 스트림은 독립적으로 생성되며, 매초마다 각각 새로운 데이터가 전달될 것입니다:

<code-example path="observables/src/multicasting.ts" region="subscribe_twice" header="두 번 구독하기"></code-example>

이 옵저버블을 멀티캐스팅 방식으로 바꿔봅시다:

<code-example path="observables/src/multicasting.ts" region="multicast_sequence" header="멀티캐스트 구독하기"></code-example>

<div class="alert is-helpful">
   멀티태스킹 옵저버블은 준비 과정이 조금 더 복잡합니다.
   이 과정은 이후에 다시 간단한 방법으로 살펴봅시다. 이후에 알아볼 방법을 사용하면 모든 옵저버블을 멀티태스킹으로 활용할 수도 있습니다.
</div>


<!--
## Error handling
-->
## 에러 처리

<!--
Because observables produce values asynchronously, try/catch will not effectively catch errors. Instead, you handle errors by specifying an `error` callback on the observer. Producing an error also causes the observable to clean up subscriptions and stop producing values. An observable can either produce values (calling the `next` callback), or it can complete, calling either the `complete` or `error` callback.

<code-example>
myObservable.subscribe({
  next(num) { console.log('Next num: ' + num)},
  error(err) { console.log('Received an error: ' + err)}
});
</code-example>

Error handling (and specifically recovering from an error) is covered in more detail in a later section.
-->
옵저버블은 데이터를 비동기로 발행하기 때문에 try/catch로 에러를 처리할 수 없습니다.
대신, 옵저버블에서 발행하는 에러 스트림은 옵저버의 `error` 콜백으로 처리합니다.
그리고 옵저버블에서 에러가 발생하면 구독을 중단하고 새로운 값이 다시 생성되지 않도록 해야합니다.
옵저버블에서 `next`로 데이터 스트림을 받았던 것과 비슷하게, 종료 스트림과 에러스트림은 각각 `complete` 콜백과 `error` 콜백으로 받을 수 있습니다.

<code-example>
myObservable.subscribe({
  next(num) { console.log('Next num: ' + num)},
  error(err) { console.log('Received an errror: ' + err)}
});
</code-example>

에러를 처리하는 방법과 에러 상태에서 벗어나는 방법은 다음 문서에서 자세히 알아봅니다.