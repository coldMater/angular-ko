<!--
# Communicating with backend services using HTTP
-->
# 백엔드와 HTTP 통신하기

<!--
Most front-end applications need to communicate with a server over the HTTP protocol, to download or upload data and access other back-end services.
Angular provides a client HTTP API for Angular applications, the `HttpClient` service class in `@angular/common/http`.

The HTTP client service offers the following major features.

*   The ability to request [typed response objects](#typed-response)
*   Streamlined [error handling](#error-handling)
*   [Testability](#testing-requests) features
*   Request and response [interception](#intercepting-requests-and-responses)
-->
프론트엔드 애플리케이션은 일반적으로 데이터를 받아오거나 업로드하기 위해 서버와 HTTP 프로토콜로 통신합니다.
Angular는 이런 경우를 위해 클라이언트측 HTTP API를 제공합니다.
`@angular/common/http` 패키지로 제공되는 `HttpClient` 서비스를 활용하면 됩니다.

HTTP 클라이언트 서비스는 이런 기능을 제공합니다.

*   요청을 보내고 응답을 받을 때 [응답 객체에 타입을 지정](#typed-response)할 수 있습니다.
*   [에러를 스트림으로 처리](#error-handling)할 수 있습니다.
*   [테스트](#testing-requests)를 적용하기 쉽습니다.
*   요청과 응답을 [가로채서](#intercepting-requests-and-responses) 다른 작업을 할 수 있습니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
Before working with the `HttpClientModule`, you should have a basic understanding of the following:

*   TypeScript programming
*   Usage of the HTTP protocol
*   Angular application-design fundamentals, as described in [Angular Concepts](guide/architecture)
*   Observable techniques and operators.
    See the [Observables](guide/observables) guide.
-->
`HttpClientModule`에 대해 알아보기 전에 이런 내용을 먼저 이해하고 있는 것이 좋습니다:

*   TypeScript 사용방법
*   HTTP 프로토콜 사용방법
*   [Angular 개요](guide/architecture) 문서에서 설명하는 Angular 앱 설계 개념
*   옵저버블과 옵저버블 연산자 사용방법.
    [옵저버블](guide/observables) 문서를 참고하세요.


<!--
## Setup for server communication
-->
## 서버와 통신할 준비하기

<!--
Before you can use `HttpClient`, you need to import the Angular `HttpClientModule`.
Most apps do so in the root `AppModule`.

<code-example header="app/app.module.ts (excerpt)" path="http/src/app/app.module.ts" region="sketch"></code-example>

You can then inject the `HttpClient` service as a dependency of an application class, as shown in the following `ConfigService` example.

<code-example header="app/config/config.service.ts (excerpt)" path="http/src/app/config/config.service.ts" region="proto"></code-example>

The `HttpClient` service makes use of [observables](guide/glossary#observable "Observable definition") for all transactions.
You must import the RxJS observable and operator symbols that appear in the example snippets.
These `ConfigService` imports are typical.

<code-example header="app/config/config.service.ts (RxJS imports)" path="http/src/app/config/config.service.ts" region="rxjs-imports"></code-example>

<div class="alert is-helpful">

You can run the <live-example></live-example> that accompanies this guide.

The sample app does not require a data server.
It relies on the [Angular *in-memory-web-api*](https://github.com/angular/angular/tree/main/packages/misc/angular-in-memory-web-api), which replaces the *HttpClient* module's `HttpBackend`.
The replacement service simulates the behavior of a REST-like backend.

Look at the `AppModule` *imports* to see how it is configured.

</div>
-->
`HttpClient`를 사용하려면 먼저 Angular `HttpClientModule`을 로드해야 합니다.
이 모듈은 보통 `AppModule`에 등록합니다.

<code-example header="app/app.module.ts (일부)" path="http/src/app/app.module.ts" region="sketch"></code-example>

모듈을 등록하고 나면 애플리케이션 클래스에 `HttpClient` 서비스를 의존성으로 주입할 수 있습니다.
`ConfigService`에 주입한다면 이렇게 구현하면 됩니다.

<code-example header="app/config/config.service.ts (일부)" path="http/src/app/config/config.service.ts" region="proto"></code-example>

`HttpClient` 서비스는 모든 동작에 [옵저버블](guide/glossary#observable "Observable definition")을 활용합니다.
그래서 이 문서에서 다루는 예제에도 RxJS 옵저버블과 옵저버블 연산자들을 자주 보게 될 것입니다.
`ConfigService` 파일에서는 이렇게 로드했습니다.

<code-example header="app/config/config.service.ts (RxJS 로드하기)" path="http/src/app/config/config.service.ts" region="rxjs-imports"></code-example>

<div class="alert is-helpful">

이 문서에서 다루는 예제 앱은 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

이 예제 앱이 동작할 때는 데이터 서버가 없어도 됩니다.
예제에서는 _HttpClient_ 모듈의 `HttpBackend`를 대체하는 [Angular 인-메모리 web API](https://github.com/angular/angular/tree/main/packages/misc/angular-in-memory-web-api)를 활용합니다.
그래서 REST API로 동작하는 백엔드와 비슷한 동작을 흉내낼 수 있습니다.

설정방법은 `AppModule` *imports* 배열을 참고하세요.

</div>


<!--
## Requesting data from a server
-->
## 서버에서 데이터 받아오기

<!--
Use the [`HttpClient.get()`](api/common/http/HttpClient#get) method to fetch data from a server.
The asynchronous method sends an HTTP request, and returns an Observable that emits the requested data when the response is received.
The return type varies based on the `observe` and `responseType` values that you pass to the call.

The `get()` method takes two arguments; the endpoint URL from which to fetch, and an *options* object that is used to configure the request.

<code-example format="typescript" language="typescript">

options: {
  headers?: HttpHeaders &verbar; {[header: string]: string &verbar; string[]},
  observe?: 'body' &verbar; 'events' &verbar; 'response',
  params?: HttpParams&verbar;{[param: string]: string &verbar; number &verbar; boolean &verbar; ReadonlyArray&lt;string &verbar; number &verbar; boolean&gt;},
  reportProgress?: boolean,
  responseType?: 'arraybuffer'&verbar;'blob'&verbar;'json'&verbar;'text',
  withCredentials?: boolean,
}

</code-example>

Important options include the *observe* and *responseType* properties.

*   The *observe* option specifies how much of the response to return
*   The *responseType* option specifies the format in which to return data

<div class="alert is-helpful">

Use the `options` object to configure various other aspects of an outgoing request.
In [Adding headers](#adding-headers), for example, the service set the default headers using the `headers` option property.

Use the `params` property to configure a request with [HTTP URL parameters](#url-params), and the `reportProgress` option to [listen for progress events](#report-progress) when transferring large amounts of data.

</div>

Applications often request JSON data from a server.
In the `ConfigService` example, the app needs a configuration file on the server, `config.json`, that specifies resource URLs.

<code-example header="assets/config.json" path="http/src/assets/config.json"></code-example>

To fetch this kind of data, the `get()` call needs the following options: `{observe: 'body', responseType: 'json'}`.
These are the default values for those options, so the following examples do not pass the options object.
Later sections show some of the additional option possibilities.
-->
[`HttpClient.get()`](api/common/http/HttpClient#get) 메서드를 사용하면 서버에서 데이터를 받아올 수 있습니다.
이 함수는 HTTP 요청을 보내고 Observable로 HTTP 응답을 전달하는 비동기 메서드입니다.
반환하는 타입은 메서드를 실행할 때 `observe`, `responseType` 필드에 명시적으로 지정할 수 있습니다.

`get()` 메서드는 URL과 *옵션* 객체를 인자로 받습니다.

<code-example format="typescript" language="typescript">

options: {
  headers?: HttpHeaders &verbar; {[header: string]: string &verbar; string[]},
  observe?: 'body' &verbar; 'events' &verbar; 'response',
  params?: HttpParams&verbar;{[param: string]: string &verbar; number &verbar; boolean &verbar; ReadonlyArray&lt;string &verbar; number &verbar; boolean&gt;},
  reportProgress?: boolean,
  responseType?: 'arraybuffer'&verbar;'blob'&verbar;'json'&verbar;'text',
  withCredentials?: boolean,
}

</code-example>

옵션 중에는 `observe`와 `responseType` 프로퍼티가 중요합니다.

*   `observe`: HTTP 응답을 어떤 범위까지 반환할지 반환합니다.
*   `responseType`: 응답으로 받는 데이터의 타입을 지정합니다.

<div class="alert is-helpful">

`options` 객체는 상황에 따라 다양하게 활용할 수 있습니다.
HTTP 요청을 보낼 때 기본 헤더가 필요하다면 [헤더를 추가](#adding-headers)하기 위해 `headers` 옵션 프로퍼티를 사용할 수 있으며, [HTTP URL로 인자를 전달](#url-params)하기 위해 `params` 프로퍼티를 사용할 수 있고, 용량이 큰 데이터를 보내거나 받을 때  [진행률을 감지](#report-progress)하는 용도로 `reportProgress` 옵션을 사용할 수도 있습니다.

</div>

애플리케이션은 보통 JSON 데이터를 응답으로 받습니다.
그래서 `ConfigService` 예제에서도 서버에서 설정파일 `config.json`을 요청하는 식으로 구현했습니다.

<code-example header="assets/config.json" path="http/src/assets/config.json"></code-example>

JSON 데이터를 받아오려면 `get()` 메서드를 실행할 때 `{observe: 'body', responseType: 'json'}` 옵션을 사용하면 됩니다.
그런데 이 옵션은 `get()` 메서드의 기본 옵션이기 때문에  따로 옵션을 지정하지 않으면 이 설정이 사용됩니다.
다음 예제에서는 다른 형태로 옵션을 활용해 봅시다.

<a id="config-service"></a>

<!--
The example conforms to the best practices for creating scalable solutions by defining a re-usable [injectable service](guide/glossary#service "service definition") to perform the data-handling functionality.
In addition to fetching data, the service can post-process the data, add error handling, and add retry logic.

The `ConfigService` fetches this file using the `HttpClient.get()` method.

<code-example header="app/config/config.service.ts (getConfig v.1)" path="http/src/app/config/config.service.ts" region="getConfig_1"></code-example>

The `ConfigComponent` injects the `ConfigService` and calls the `getConfig` service method.

Because the service method returns an `Observable` of configuration data, the component *subscribes* to the method's return value.
The subscription callback performs minimal post-processing.
It copies the data fields into the component's `config` object, which is data-bound in the component template for display.

<code-example header="app/config/config.component.ts (showConfig v.1)" path="http/src/app/config/config.component.ts" region="v1"></code-example>
-->
아래 예제는 [의존성으로 주입하는 서비스](guide/glossary#service "service definition")를 재사용할 수 있는 형태로 구현한 것입니다.
HTTP 프로토콜로 데이터를 요청하는 서비스는 데이터를 리모트 서버로 보내거나, 에러를 처리하고, 실패했을 때 재시도하는 로직도 추가할 수 있습니다.

`ConfigService`에서 `HttpClient.get()` 메서드로 파일을 불러오는 코드는 이렇습니다.

<code-example header="app/config/config.service.ts (getConfig v.1)" path="http/src/app/config/config.service.ts" region="getConfig_1"></code-example>

`ConfigComponent`는 `ConfigService`를 의존성으로 주입받으며 이 서비스에 정의된 `getConfig()` 메서드를 실행합니다.

그런데 이 메서드는 `Observable` 형태로 데이터를 반환하기 때문에 컴포넌트가 데이터를 받으려면 메서드가 반환하는 옵저버블을 *구독*해야 합니다.
컴포넌트에 정의한 구독 함수는 필요한 로직만 간단하게 실행합니다.
이 함수는 서비스에서 가져온 데이터를 파싱해서 컴포넌트 `config` 객체에 할당합니다.

<code-example header="app/config/config.component.ts (showConfig() v.1)" path="http/src/app/config/config.component.ts" region="v1"></code-example>


<a id="always-subscribe"></a>

<!--
### Starting the request
-->
### 요청 보내기

<!--
For all `HttpClient` methods, the method doesn't begin its HTTP request until you call `subscribe()` on the observable the method returns.

This is true for *all* `HttpClient` *methods*.

<div class="alert is-helpful">

You should always unsubscribe from an observable when a component is destroyed.

</div>

All observables returned from `HttpClient` methods are *cold* by design.
Execution of the HTTP request is *deferred*, letting you extend the observable with additional operations such as  `tap` and `catchError` before anything actually happens.

Calling `subscribe()` triggers execution of the observable and causes `HttpClient` to compose and send the HTTP request to the server.

Think of these observables as *blueprints* for actual HTTP requests.

<div class="alert is-helpful">

In fact, each `subscribe()` initiates a separate, independent execution of the observable.
Subscribing twice results in two HTTP requests.

<code-example format="javascript" language="javascript">

const req = http.get&lt;Heroes&gt;('/api/heroes');
// 0 requests made - .subscribe() not called.
req.subscribe();
// 1 request made.
req.subscribe();
// 2 requests made.

</code-example>

</div>
-->
`HttpClient`가 제공하는 모든 메서드는 메서드가 반환하는 옵저버블을 `subscribe()` 하기 전까지는 실제 HTTP 요청을 보내지 않습니다.

*모든* `HttpClient` *메서드*가 이렇습니다.

<div class="alert is-helpful">

컴포넌트가 종료되면 반드시 옵저버블을 구독 해지해야 합니다.

</div>

`HttpClient` 메서드가 반환하는 옵저버블은 모두 *콜드* 옵저버블입니다.
그래서 `HttpClient` 메서드를 실행해도 HTTP 요청은 *즉시 실행되지 않으며*, 무언가 일어나기 전에 `tap`이나 `catchError` 연산자를 붙여 추가 작업을 할 수 있습니다.

옵저버블은 `subscribe()`를 실행해야 실제로 서버로 요청을 보냅니다.

HTTP 요청은 모두 이런 식으로 동작합니다.

<div class="alert is-helpful">

`subscribe()` 요청은 모두 별개로 동작합니다.
그래서 `subscribe()`를 두 번 실행하면 HTTP 요청도 두 번 발생합니다.

<code-example format="javascript" language="javascript">

const req = http.get&lt;Heroes&gt;('/api/heroes');
// 요청 횟수: 0 - .subscribe()가 실행되지 않았습니다.
req.subscribe();
// 요청 횟수: 1
req.subscribe();
// 요청 횟수: 2

</code-example>

</div>



<a id="typed-response"></a>

<!--
### Requesting a typed response
-->
### 응답 타입 지정하기

<!--
Structure your `HttpClient` request to declare the type of the response object, to make consuming the output easier and more obvious.
Specifying the response type acts as a type assertion at compile time.

<div class="alert is-important">

Specifying the response type is a declaration to TypeScript that it should treat your response as being of the given type.
This is a build-time check and doesn't guarantee that the server actually responds with an object of this type.
It is up to the server to ensure that the type specified by the server API is returned.

</div>

To specify the response object type, first define an interface with the required properties.
Use an interface rather than a class, because the response is a plain object that cannot be automatically converted to an instance of a class.

<code-example path="http/src/app/config/config.service.ts" region="config-interface"></code-example>

Next, specify that interface as the `HttpClient.get()` call's type parameter in the service.

<code-example header="app/config/config.service.ts (getConfig v.2)" path="http/src/app/config/config.service.ts" region="getConfig_2"></code-example>

<div class="alert is-helpful">

When you pass an interface as a type parameter to the `HttpClient.get()` method, use the [RxJS `map` operator](guide/rx-library#operators) to transform the response data as needed by the UI.
You can then pass the transformed data to the [async pipe](api/common/AsyncPipe).

</div>

The callback in the updated component method receives a typed data object, which is easier and safer to consume:

<code-example header="app/config/config.component.ts (showConfig v.2)" path="http/src/app/config/config.component.ts" region="v2"></code-example>

To access properties that are defined in an interface, you must explicitly convert the plain object you get from the JSON to the required response type.
For example, the following `subscribe` callback receives `data` as an Object, and then type-casts it in order to access the properties.

<code-example format="typescript" language="typescript">

.subscribe(data =&gt; this.config = {
  heroesUrl: (data as any).heroesUrl,
  textfile:  (data as any).textfile,
});

</code-example>
-->
`HttpClient`를 사용할 때 응답으로 받을 데이터의 타입을 지정하면 서버에서 받는 데이터를 좀 더 명확하게 처리할 수 있습니다.
응답 타입을 지정하는 코드는 컴파일 시점에 타입을 검사하는 용도로도 활용됩니다.

<div class="alert is-important">

응답으로 받는 데이터의 타입을 지정하는 것은 TypeScript를 사용하는 관점에서 데이터 타입을 지정한 것 뿐이며, 서버가 보내는 데이터가 정말 이 타입인 것을 보장하는 것은 아닙니다.
Angular 앱에서는 서버가 보낸 데이터의 타입을 예상하기만 할 뿐이고, 이 예상대로 동작하려면 서버 API가 보내는 데이터도 이 타입에 맞아야 합니다.

</div>

응답으로 받는 객체의 타입을 지정하려면 먼저 인터페이스를 정의해야 합니다.
이 때 클래스보다는 인터페이스를 사용하는 것을 권장합니다.
서버에서 받아온 데이터는 단순한 객체 형식이며 클래스로 자동 변환되지 않습니다.

<code-example path="http/src/app/config/config.service.ts" region="config-interface"></code-example>

그리고 `HttpClient.get()` 메서드를 실행할 때 제네릭으로 타입을 지정합니다.

<code-example header="app/config/config.service.ts (getConfig() v.2)" path="http/src/app/config/config.service.ts" region="getConfig_2"></code-example>

<div class="alert is-helpful">

`HttpClient.get()` 메서드에 인터페이스를 타입으로 지정하면 [RxJS `map` 연산자](guide/rx-library#operators)를 활용해서 화면에 사용하기 편한 형태로 데이터를 가공할 수 있습니다.
그리고 템플릿에 [`Async` 파이프](api/common/AsyncPipe)를 사용하면 컴포넌트 클래스 코드를 거치지 않고 템플릿에 바로 활용할 수도 있습니다.

</div>

컴포넌트 메서드는 이제 데이터의 타입을 명확하게 지정할 수 있기 때문에 이후에 사용하기도 편합니다:

<code-example header="app/config/config.component.ts (showConfig() v.2)" path="http/src/app/config/config.component.ts" region="v2"></code-example>

응답으로 받은 JSON 객체의 프로퍼티에 접근하려면 이 객체에 정확한 타입을 지정해야 합니다.
컴포넌트의 구독 콜백 함수에 이 내용을 빠뜨리면 응답으로 받은 데이터를 명시적으로 `any` 타입으로 캐스팅해야 사용할 수 있습니다.

<code-example format="typescript" language="typescript">

.subscribe(data =&gt; this.config = {
  heroesUrl: (data as any).heroesUrl,
  textfile:  (data as any).textfile,
});

</code-example>


<a id="string-union-types"></a>

<!--
<div class="callout is-important">

<header><code>observe</code> and <code>response</code> types</header>

The types of the `observe` and `response` options are *string unions*, rather than plain strings.

<code-example format="typescript" language="typescript">

options: {
  &hellip;
  observe?: 'body' &verbar; 'events' &verbar; 'response',
  &hellip;
  responseType?: 'arraybuffer'&verbar;'blob'&verbar;'json'&verbar;'text',
  &hellip;
}

</code-example>

This can cause confusion.
For example:

<code-example format="typescript" language="typescript">

// this works
client.get('/foo', {responseType: 'text'})

// but this does NOT work
const options = {
  responseType: 'text',
};
client.get('/foo', options)

</code-example>

In the second case, TypeScript infers the type of `options` to be `{responseType: string}`.
The type is too wide to pass to `HttpClient.get` which is expecting the type of `responseType` to be one of the *specific* strings.
`HttpClient` is typed explicitly this way so that the compiler can report the correct return type based on the options you provided.

Use `as const` to let TypeScript know that you really do mean to use a constant string type:

<code-example format="typescript" language="typescript">

const options = {
  responseType: 'text' as const,
};
client.get('/foo', options);

</code-example>

</div>
-->
<div class="callout is-important">

<header><code>observe</code>, <code>response</code>의 타입</header>

`observe` 옵션과 `response` 옵션의 타입은 일반 문자열이 아니라 *문자열 유니언(string unions)* 입니다.

<code-example format="typescript" language="typescript">

options: {
  &hellip;
  observe?: 'body' &verbar; 'events' &verbar; 'response',
  &hellip;
  responseType?: 'arraybuffer'&verbar;'blob'&verbar;'json'&verbar;'text',
  &hellip;
}

</code-example>

사용방법이 조금 헷갈릴 수 있습니다.
예제를 봅시다:

<code-example format="typescript" language="typescript">

// 이 코드는 동작합니다.
client.get('/foo', {responseType: 'text'})

// 이 코드는 동작하지 않습니다.
const options = {
  responseType: 'text',
};
client.get('/foo', options)

</code-example>

두 번째 예제 코드처럼 작성하면 TypeScript는 `options`의 타입을 `{responseType: string}`이라고 추론합니다.
하지만 이 타입은 `HttpClient.get()` 메서드에 사용하기에는 충분하지 않습니다.
`responseType`의 값은 `HttpClient`가 사전에 정의한 문자열 중 하나여야 하지만 `string` 타입은 그보다 범위가 넓기 때문입니다.
`HttpClient`를 사용할 때는 정확한 타입을 지정해야 합니다.

이 경우에는 `as const`를 사용해서 해당 문자열이 사전에 정의된 문자열이라고 지정해도 됩니다:

<code-example format="typescript" language="typescript">

const options = {
  responseType: 'text' as const,
};
client.get('/foo', options);

</code-example>

</div>


<!--
### Reading the full response
-->
### 응답 전체를 읽기

<!--
In the previous example, the call to `HttpClient.get()` did not specify any options.
By default, it returned the JSON data contained in the response body.

You might need more information about the transaction than is contained in the response body.
Sometimes servers return special headers or status codes to indicate certain conditions that are important to the application workflow.

Tell `HttpClient` that you want the full response with the `observe` option of the `get()` method:

<code-example path="http/src/app/config/config.service.ts" region="getConfigResponse"></code-example>

Now `HttpClient.get()` returns an `Observable` of type `HttpResponse` rather than just the JSON data contained in the body.

The component's `showConfigResponse()` method displays the response headers as well as the configuration:

<code-example header="app/config/config.component.ts (showConfigResponse)" path="http/src/app/config/config.component.ts" region="showConfigResponse"></code-example>

As you can see, the response object has a `body` property of the correct type.
-->
이전 예제에서는 `HttpClient.get()`을 사용할 때 따로 옵션을 지정하지 않았습니다.
이렇게 사용하면 `get()` 메서드는 응답의 바디를 JSON 타입으로 반환합니다.

그런데 상황에 따라 전체 응답을 확인해야 하는 경우가 있습니다.
응답으로 받은 헤더나 상태 코드를 활용해야 하는 경우가 그렇습니다.

이 경우에는 `get()` 메서드를 실행할 때 `observe` 옵션을 사용하면 응답의 바디가 아니라 응답 전체를 받아올 수 있습니다:

<code-example path="http/src/app/config/config.service.ts" region="getConfigResponse"></code-example>

이렇게 구현하면 `HttpClient.get()` 메서드가 반환하는 `Observable`은 응답의 바디를 JSON 형식으로 전달하는게 아니라 응답 전체를 `HttpResponse` 타입으로 전달합니다.

아래 코드는 이 응답을 처리하는 `showConfigResponse()` 메서드입니다:

<code-example header="app/config/config.component.ts (showConfigResponse())" path="http/src/app/config/config.component.ts" region="showConfigResponse"></code-example>

코드에서 볼 수 있듯이, 응답으로 전달된 객체의 `body` 프로퍼티는 `Http.get()` 메서드에 제네릭으로 지정한 타입입니다.


<!--
### Making a JSONP request
-->
### JSONP 요청 보내기

<!--
Apps can use the `HttpClient` to make [JSONP](https://en.wikipedia.org/wiki/JSONP) requests across domains when a server doesn't support [CORS protocol](https://developer.mozilla.org/docs/Web/HTTP/CORS).

Angular JSONP requests return an `Observable`.
Follow the pattern for subscribing to observables and use the RxJS `map` operator to transform the response before using the [async pipe](api/common/AsyncPipe) to manage the results.

In Angular, use JSONP by including `HttpClientJsonpModule` in the `NgModule` imports.
In the following example, the `searchHeroes()` method uses a JSONP request to query for heroes whose names contain the search term.

<code-example format="typescript" language="typescript">

/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable {
  term = term.trim();

  const heroesURL = `&dollar;{this.heroesURL}?&dollar;{term}`;
  return this.http.jsonp(heroesUrl, 'callback').pipe(
      catchError(this.handleError('searchHeroes', [])) // then handle the error
    );
}

</code-example>

This request passes the `heroesURL` as the first parameter and the callback function name as the second parameter.
The response is wrapped in the callback function, which takes the observables returned by the JSONP method and pipes them through to the error handler.
-->
서버가 [CORS 프로토콜](https://developer.mozilla.org/docs/Web/HTTP/CORS)을 지원하지 않는다면 `HttpClient`로 다른 도메인에 [JSONP](https://en.wikipedia.org/wiki/JSONP) 요청을 보낼 수 있습니다.

이 때도 Angular는 `Observable`을 반환합니다.
따라서 `HttpClient` 메서드가 반환하는 옵저버블은 RxJS `map` 연산자를 활용해서 [`async` 파이프](api/common/AsyncPipe)에 사용하기 적합한 형태로 가공할 수 있습니다.

Angular 애플리케이션에서 JSONP 요청을 보내려면 `NgModule`에 `HttpClientJsonpModule`을 로드해야 합니다.
아래 예제에서 `searchHeroes()` 메서드는 이름에 특정 단어가 들어간 히어로 목록을 가져오기 위해 JSONP 요청을 보내는 메서드입니다.

<code-example format="typescript" language="typescript">

/* 이름에 특정 단어가 들어간 히어로 목록을 가져옵니다. */
searchHeroes(term: string): Observable {
  term = term.trim();

  const heroesURL = `&dollar;{this.heroesURL}?&dollar;{term}`;
  return this.http.jsonp(heroesUrl, 'callback').pipe(
      catchError(this.handleError('searchHeroes', [])) // 에러 처리
    );
}

</code-example>

이 메서드의 첫 번째 인자는 `heroesURL`이며 두 번째 인자는 콜백 함수의 이름을 지정했습니다.
그러면 JSONP 요청으로 보낸 응답은 콜백 함수로 랩핑되어 옵저버블로 전달되기 때문에, `pipe`로 체이닝해서 옵저버블 형태로 에러를 처리할 수 있습니다.


<!--
### Requesting non-JSON data
-->
### JSON 형식이 아닌 응답 처리하기

<!--
Not all APIs return JSON data.
In this next example, a `DownloaderService` method reads a text file from the server and logs the file contents, before returning those contents to the caller as an `Observable<string>`.

<code-example header="app/downloader/downloader.service.ts (getTextFile)" linenums="false" path="http/src/app/downloader/downloader.service.ts" region="getTextFile"></code-example>

`HttpClient.get()` returns a string rather than the default JSON because of the `responseType` option.

The RxJS `tap` operator lets the code inspect both success and error values passing through the observable without disturbing them.

A `download()` method in the `DownloaderComponent` initiates the request by subscribing to the service method.

<code-example header="app/downloader/downloader.component.ts (download)" linenums="false" path="http/src/app/downloader/downloader.component.ts" region="download"></code-example>
-->
모든 HTTP 요청이 JSON 데이터를 반환하는 것은 아닙니다.
아래 예제에서 `DownloaderService`의 `getTextFile()` 메소드는 서버에 있는 텍스트 파일의 내용을 받아온 후에 로그에 출력하고 `Observable<string>` 타입으로 반환하는 함수입니다.

<code-example header="app/downloader/downloader.service.ts (getTextFile())" linenums="false" path="http/src/app/downloader/downloader.service.ts" region="getTextFile"></code-example>

이 때 `HttpClient.get()` 메소드에는 `responseType` 옵션이 사용되었기 때문에 기본 형식인 JSON 형식이 아니라 문자열 타입을 반환합니다.

그리고 나서 RxJS `tap` 연산자를 사용해서 성공했을 때와 에러가 발생했을 때를 처리하고 있습니다.

이 메소드는 `DownloaderComponent`에 있는 `download()` 메소드가 시작합니다.

<code-example header="app/downloader/downloader.component.ts (download())" linenums="false" path="http/src/app/downloader/downloader.component.ts" region="download"></code-example>


<a id="error-handling"></a>

<!--
## Handling request errors
-->
## HTTP 에러 처리하기

<!--
If the request fails on the server, `HttpClient` returns an *error* object instead of a successful response.

The same service that performs your server transactions should also perform error inspection, interpretation, and resolution.

When an error occurs, you can obtain details of what failed in order to inform your user.
In some cases, you might also automatically [retry the request](#retry).
-->
서버로 보낸 요청이 실패하면 `HttpClient`는 성공 응답 대신 *에러* 객체를 반환합니다.

그리고 이 에러 객체를 분석하면 왜 에러가 발생했는지 자세한 정보를 확인할 수 있습니다.

상황에 따라 [요청을 다시 보낼](#retry)수도 있습니다.


<a id="error-details"></a>

<!--
### Getting error details
-->
### 에러 원인 확인하기

<!--
An app should give the user useful feedback when data access fails.
A raw error object is not particularly useful as feedback.
In addition to detecting that an error has occurred, you need to get error details and use those details to compose a user-friendly response.

Two types of errors can occur.

*   The server backend might reject the request, returning an HTTP response with a status code such as 404 or 500.
    These are error *responses*.

*   Something could go wrong on the client-side such as a network error that prevents the request from completing successfully or an exception thrown in an RxJS operator.
    These errors have `status` set to `0` and the `error` property contains a `ProgressEvent` object, whose `type` might provide further information.

`HttpClient` captures both kinds of errors in its `HttpErrorResponse`.
Inspect that response to identify the error's cause.

The following example defines an error handler in the previously defined [ConfigService](#config-service "ConfigService defined").

<code-example header="app/config/config.service.ts (handleError)" path="http/src/app/config/config.service.ts" region="handleError"></code-example>

The handler returns an RxJS `ErrorObservable` with a user-friendly error message.
The following code updates the `getConfig()` method, using a [pipe](guide/pipes "Pipes guide") to send all observables returned by the `HttpClient.get()` call to the error handler.

<code-example header="app/config/config.service.ts (getConfig v.3 with error handler)" path="http/src/app/config/config.service.ts" region="getConfig_3"></code-example>
-->
서버로 보낸 요청이 실패하면 이 요청이 왜 실패했는지 사용자에게 알려주는 것이 좋습니다.
이 때 에러 객체 자체를 표시하는 것은 유용하지 않습니다.
에러에 대한 세부정보를 확인한 후에 사용자가 이해하기 쉬운 형태로 안내하는 것이 좋습니다.

에러는 보통 두 가지 이유로 발생합니다.

*   백엔드 서버가 요청을 거부하면 HTTP 응답의 상태 코드가 404나 500이 됩니다.
    이 응답은 에러 *응답* 입니다.

*   네트워크 에러 등 클라이언트쪽에서 뭔가가 잘못되어 요청을 완료하지 못했거나 RxJS 연산자에서 에러가 발생한 경우입니다.
    이 애러 객체의 `status` 프로퍼티 값은 `0`이며, `error` 프로퍼티로 `ProgressEvent` 객체가 전달되기 때문에 이 객체의 `type` 필드를 확인하면 더 많은 정보를 확인할 수 있습니다.

`HttpClient`는 두 가지 에러를 모두 `HttpErrorResponse`로 처리하기 때문에, 서버로 보낸 요청이 왜 실패했는지 확인하려면 에러가 왜 발생했는지 파악해야 합니다.

아래 코드는 이전 섹션에서 작성했던 [ConfigService](#config-service "ConfigService defined")를 활용해서 에러를 처리하는 예제 코드입니다.

<code-example header="app/config/config.service.ts (handleError())" path="http/src/app/config/config.service.ts" region="handleError"></code-example>

이 핸들러 함수는 사용자가 이해할 수 있는 메시지를 담아 RxJS `ErrorObservable`을 보냅니다.
아래 코드는 `HttpClient.get()` 함수 실행 결과를 [파이프](guide/pipes "Pipes guide")로 연결해서 에러 처리 함수로 보내는 `getConfig()` 메서드 코드입니다.

<code-example header="app/config/config.service.ts (에러 핸들러가 추가된 getConfig() v.3)" path="http/src/app/config/config.service.ts" region="getConfig_3"></code-example>


<a id="retry"></a>

<!--
### Retrying a failed request
-->
### 요청 재시도하기

<!--
Sometimes the error is transient and goes away automatically if you try again.
For example, network interruptions are common in mobile scenarios, and trying again can produce a successful result.

The [RxJS library](guide/rx-library) offers several *retry* operators.
For example, the `retry()` operator automatically re-subscribes to a failed `Observable` a specified number of times.
*Re-subscribing* to the result of an `HttpClient` method call has the effect of reissuing the HTTP request.

The following example shows how to pipe a failed request to the `retry()` operator before passing it to the error handler.

<code-example header="app/config/config.service.ts (getConfig with retry)" path="http/src/app/config/config.service.ts" region="getConfig"></code-example>
-->
어떤 경우에는 에러가 발생한 것을 그대로 처리하지 않고 자동으로 재시도하는 것이 나은 경우가 있습니다.
모바일 장비는 네트워크 오류가 자주 발생하기 때문에 이런 재시도 방식도 효율적입니다.

HTTP 요청을 보냈을 때 발생한 에러가 일시적인 원인 때문이라면 자동으로 재시도를 하는것도 좋습니다.
모바일 디바이스인 경우에는 네트워크가 끊어지는 상황이 많기 때문에 이런 경우도 자연스럽게 처리하면 사용자가 더 편하게 앱을 사용할 수 있습니다.

[RxJS 라이브러리](guide/rx-library)가 제공하는 연산자 중에서 요청을 재시도할 때 활용할 수 있는 것들이 몇가지 있습니다.
이 중 `retry()` 연산자는 실패한 `Observable`를 정해진 횟수까지 자동으로 재구독하는 연산자입니다.
`HttpClient` 메서드가 반환한 에러 옵저버블을 다시 구독하면 HTTP 요청도 다시 발생합니다.

아래 코드는 HTTPClient 메서드 실행결과를 에러 처리 함수에 전달하기 전에 `retry()` 연산자를 활용하는 `getConfig()` 메서드 코드입니다.

<code-example header="app/config/config.service.ts (재시도 기능이 추가된 getConfig())" path="http/src/app/config/config.service.ts" region="getConfig"></code-example>


<!--
## Sending data to a server
-->
## 서버에 데이터 보내기

<!--
In addition to fetching data from a server, `HttpClient` supports other HTTP methods such as PUT, POST, and DELETE, which you can use to modify the remote data.

The sample app for this guide includes an abridged version of the "Tour of Heroes" example that fetches heroes and enables users to add, delete, and update them.
The following sections show examples of the data-update methods from the sample's `HeroesService`.
-->
`HttpClient`로 서버에 데이터를 요청할 때 사용하는 HTTP 메소드가 PUT, POST, DELETE라면 서버로 추가 데이터를 보낼 수 있습니다.

이번 섹션에서는 "히어로들의 여행" 튜토리얼에서 히어로의 목록을 가져오고 추가, 삭제, 수정했던 예제를 간단하게 다시 구현해 봅시다.
예제에서 다루는 코드는 `HeroesService`만 해당됩니다.


<!--
### Making a POST request
-->
### POST 요청 보내기

<!--
Apps often send data to a server with a POST request when submitting a form.
In the following example, the `HeroesService` makes an HTTP POST request when adding a hero to the database.

<code-example header="app/heroes/heroes.service.ts (addHero)" path="http/src/app/heroes/heroes.service.ts" region="addHero"></code-example>

The `HttpClient.post()` method is similar to `get()` in that it has a type parameter, which you can use to specify that you expect the server to return data of a given type.
The method takes a resource URL and two additional parameters:

| Parameter | Details |
|:---       |:---     |
| body      | The data to POST in the body of the request.                                                          |
| options   | An object containing method options which, in this case, [specify required headers](#adding-headers). |

The example catches errors as [described above](#error-details).

The `HeroesComponent` initiates the actual POST operation by subscribing to the `Observable` returned by this service method.

<code-example header="app/heroes/heroes.component.ts (addHero)" path="http/src/app/heroes/heroes.component.ts" region="add-hero-subscribe"></code-example>

When the server responds successfully with the newly added hero, the component adds that hero to the displayed `heroes` list.
-->
데이터는 POST 방식으로 보낼 수도 있습니다.
일반적으로 POST 메소드는 폼을 제출할 때도 사용하며, 우리가 살펴보고 있는 `HeroesService`에서는 히어로를 DB에 추가할 때 사용합니다.

<code-example header="app/heroes/heroes.service.ts (addHero())" path="http/src/app/heroes/heroes.service.ts" region="addHero"></code-example>

`HttpClient.post()` 메소드는 `get()`메소드와 비슷합니다.
서버로부터 받아올 데이터의 타입을 제네릭으로 지정하고, 첫 번째 인자로 서버 API의 URL을 받는 것도 같습니다.

| 인자      | 설명                                                             |
|:--------|:---------------------------------------------------------------|
| body    | POST 메소드일 때 요청으로 보낼 body 데이터를 지정합니다.                           |
| options | HTTP 요청에 대한 옵션을 지정합니다. [헤더 추가하기](#adding-headers)에서 지정한 옵션입니다. |

이 코드가 실행되면서 에러가 발생하면 [위에서 설명했던 것처럼](#error-details) 처리됩니다.

이제 `HeroesComponent`가 옵저버블을 구독하면 POST 요청이 발생하며, 서버의 응답으로 받은 내용은 `Observable` 타입으로 전달됩니다.

<code-example header="app/heroes/heroes.component.ts (addHero())" path="http/src/app/heroes/heroes.component.ts" region="add-hero-subscribe"></code-example>

그러면 새로운 히어로가 정상적으로 추가되었다는 것을 컴포넌트가 알 수 있고, `heroes` 배열에 이 히어로를 추가해서 새로운 목록으로 화면에 표시할 수 있습니다.


<!--
### Making a DELETE request
-->
### DELETE 요청 보내기

<!--
This application deletes a hero with the `HttpClient.delete` method by passing the hero's ID in the request URL.

<code-example header="app/heroes/heroes.service.ts (deleteHero)" path="http/src/app/heroes/heroes.service.ts" region="deleteHero"></code-example>

The `HeroesComponent` initiates the actual DELETE operation by subscribing to the `Observable` returned by this service method.

<code-example header="app/heroes/heroes.component.ts (deleteHero)" path="http/src/app/heroes/heroes.component.ts" region="delete-hero-subscribe"></code-example>

The component isn't expecting a result from the delete operation, so it subscribes without a callback.
Even though you are not using the result, you still have to subscribe.
Calling the `subscribe()` method *executes* the observable, which is what initiates the DELETE request.

<div class="alert is-important">

You must call `subscribe()` or nothing happens.
Just calling `HeroesService.deleteHero()` does not initiate the DELETE request.

</div>

<code-example path="http/src/app/heroes/heroes.component.ts" region="delete-hero-no-subscribe"></code-example>
-->
이 서비스는 히어로를 삭제할 때 `HttpClient.delete` 메소드를 활용하며, 삭제하려는 히어로의 ID는 url에 포함시켜 보냅니다.

<code-example header="app/heroes/heroes.service.ts (deleteHero())" path="http/src/app/heroes/heroes.service.ts" region="deleteHero"></code-example>

이 메소드도 `HeroesComponent`가 구독할 때 실행되기 시작하며, 메소드가 실행되면서 DELETE 요청도 시작됩니다.
그리고 메소드 실행결과는 `Observable` 타입으로 반환됩니다.

<code-example header="app/heroes/heroes.component.ts (deleteHero())" path="http/src/app/heroes/heroes.component.ts" region="delete-hero-subscribe"></code-example>

컴포넌트는 삭제 동작의 결과값을 활용하지 않기 때문에 콜백함수 없이 구독을 시작했습니다.
옵저버블 구독은 이렇게 옵저버를 지정하지 않으면서 시작할 수도 있습니다.
`subscribe()` 메소드가 실행되면 옵저버블이 실행되고, DELETE 요청도 시작됩니다.

<div class="alert is-important">

옵저버블은 `subscribe()` 함수를 실행해야 시작됩니다.
`HeroesService.deleteHero()`를 호출하는 것만으로는 DELETE 요청이 시작되지 않습니다.

</div>

<code-example path="http/src/app/heroes/heroes.component.ts" region="delete-hero-no-subscribe"></code-example>



<!--
### Making a PUT request
-->
### PUT 요청 보내기

<!--
An app can send PUT requests using the HTTP client service.
The following `HeroesService` example, like the POST example, replaces a resource with updated data.

<code-example header="app/heroes/heroes.service.ts (updateHero)" path="http/src/app/heroes/heroes.service.ts" region="updateHero"></code-example>

As for any of the HTTP methods that return an observable, the caller, `HeroesComponent.update()` [must `subscribe()`](#always-subscribe "Why you must always subscribe.") to the observable returned from the `HttpClient.put()` in order to initiate the request.
-->
HTTP 클라이언트 서비스를 활용하면 PUT 요청을 보낼 수 있습니다.
아래 코드는 `HeroService` 예제 중에서 POST 예제와 비슷하지만 히어로 데이터를 갱신하기 위한 용도로 사용하는 예제 코드입니다.

<code-example header="app/heroes/heroes.service.ts (updateHero())" path="http/src/app/heroes/heroes.service.ts" region="updateHero"></code-example>

HTTPClient가 제공하는 메서드가 모두 그렇듯, `put()` 메서드도 옵저버블을 반환하기 때문에 `HeroesComponent.update()` 메서드는 [반드시 `subscribe()`로 구독](#always-subscribe "Why you must always subscribe.")을 시작해야 실제 요청을 보냅니다.

<!--
### Adding and updating headers
-->
### 헤더 추가/수정하기

<!--
Many servers require extra headers for save operations.
For example, a server might require an authorization token, or "Content-Type" header to explicitly declare the MIME type of the request body.
-->
서버가 저장 동작을 수행할 때 필요한 추가 정보를 헤더로 받는 경우가 있습니다.
인증 토큰을 요구한다던가 요청으로 보낸 내용의 MIME 타입을 결정하기 위해 "Content-Type"을 지정해야 하는 경우가 그렇습니다.


<a id="adding-headers"></a>

<!--
##### Adding headers
-->
##### 헤더 추가하기

<!--
The `HeroesService` defines such headers in an `httpOptions` object that are passed to every `HttpClient` save method.

<code-example header="app/heroes/heroes.service.ts (httpOptions)" path="http/src/app/heroes/heroes.service.ts" region="http-options"></code-example>
-->
`HeroService`는 `HttpClient` 메서드를 실행할 때 헤더를 추가로 지정하기 위해 다음과 같은 `httpOptions` 객체를 사용합니다.

<code-example header="app/heroes/heroes.service.ts (httpOptions)" path="http/src/app/heroes/heroes.service.ts" region="http-options"></code-example>


<!--
##### Updating headers
-->
##### 헤더 수정하기

<!--
You can't directly modify the existing headers within the previous options
object because instances of the `HttpHeaders` class are immutable.
Use the `set()` method instead, to return a clone of the current instance with the new changes applied.

The following example shows how, when an old token expires, you can update the authorization header before making the next request.

<code-example linenums="false" path="http/src/app/heroes/heroes.service.ts" region="update-headers"></code-example>
-->
`HttpHeaders` 클래스의 인스턴스는 이뮤터블 객체이기 때문에 이미 존재하는 헤더를 직접 수정할 수 없습니다.
그래서 헤더의 내용을 변경하려면 `set()` 메서드를 실행하고 새로 생성되는 인스턴스를 활용해야 합니다.

아래 예제 코드는 이미 만료된 인증 토큰을 새로운 토큰으로 갱신하는 예제 코드입니다.

<code-example linenums="false" path="http/src/app/heroes/heroes.service.ts" region="update-headers"></code-example>


<a id="url-params"></a>

<!--
## Configuring HTTP URL parameters
-->
## HTTP URL 변수 활용하기

<!--
Use the `HttpParams` class with the `params` request option to add URL query strings in your `HttpRequest`.

The following example, the `searchHeroes()` method queries for heroes whose names contain the search term.

Start by importing `HttpParams` class.

<code-example hideCopy language="typescript">

import {HttpParams} from "&commat;angular/common/http";

</code-example>

<code-example linenums="false" path="http/src/app/heroes/heroes.service.ts" region="searchHeroes"></code-example>

If there is a search term, the code constructs an options object with an HTML URL-encoded search parameter.
If the term is "cat", for example, the GET request URL would be `api/heroes?name=cat`.

The `HttpParams` object is immutable.
If you need to update the options, save the returned value of the `.set()` method.

You can also create HTTP parameters directly from a query string by using the `fromString` variable:

<code-example hideCopy language="typescript">

const params = new HttpParams({fromString: 'name=foo'});

</code-example>
-->
`HttpRequest` 옵션 중 `params`에 `HttpParams` 클래스를 활용하면 URL 쿼리 스트링을 인자로 전달할 수 있습니다.

아래 예제는 히어로 이름에 특정 단어가 들어간 히어로 목록을 조회하는 `searchHeroes()` 메서드입니다.

먼저, `HttpParams` 클래스를 로드합니다.

<code-example hideCopy language="typescript">

import {HttpParams} from "&commat;angular/common/http";

</code-example>

<code-example linenums="false" path="http/src/app/heroes/heroes.service.ts" region="searchHeroes"></code-example>

이 코드는 검색어가 전달되면 HTML URL 인코딩된 형태로 옵션 객체를 생성합니다.
그래서 "cat"이라는 검색어가 전달되면 GET 요청을 보내는 URL은 `api/heroes?name=cat`이 됩니다.

`HttpParams` 객체는 이뮤터블 객체입니다.
그래서 옵션 항목의 값을 변경하려면 `.set()` 메서드를 실행했을 때 생성되는 객체를 활용하면 됩니다.

`fromString` 필드를 사용하면 쿼리 스트링을 `HttpParams` 객체로 직접 변환할 수도 있습니다:

<code-example hideCopy language="typescript">

const params = new HttpParams({fromString: 'name=foo'});

</code-example>


<a id="intercepting-requests-and-responses"></a>

<!--
## Intercepting requests and responses
-->
## HTTP 요청/응답 가로채기

<!--
With interception, you declare *interceptors* that inspect and transform HTTP requests from your application to a server.
The same interceptors can also inspect and transform a server's responses on their way back to the application.
Multiple interceptors form a *forward-and-backward* chain of request/response handlers.

Interceptors can perform a variety of  *implicit* tasks, from authentication to logging, in a routine, standard way, for every HTTP request/response.

Without interception, developers would have to implement these tasks *explicitly* for each `HttpClient` method call.
-->
인터셉터를 활용하면 서버로 보내는 HTTP 요청을 가로채거나 변환할 수 있습니다.
HTTP 요청에 적용된 인터셉터는 HTTP 응답에도 다시 활용할 수 있으며, 인터셉터 여러개가 순서대로 실행되도록 체이닝할 수도 있습니다.

인터셉터는 다양한 기능을 수행할 수 있습니다. 일반적으로는 HTTP 요청/응답에 대해 사용자 인증 정보를 확인하고 로그를 출력하기 위해 사용합니다.

만약 인터셉터를 사용하지 않는다면, 모든 `HttpClient` 메소드가 실행될 때마다 필요한 작업을 *직접* 처리해야 합니다.

<!--
### Write an interceptor
-->
### 인터셉터 구현하기

<!--
To implement an interceptor, declare a class that implements the `intercept()` method of the `HttpInterceptor` interface.

Here is a do-nothing `noop` interceptor that passes the request through without touching it:

<code-example header="app/http-interceptors/noop-interceptor.ts" path="http/src/app/http-interceptors/noop-interceptor.ts"></code-example>

The `intercept` method transforms a request into an `Observable` that eventually returns the HTTP response.
In this sense, each interceptor is fully capable of handling the request entirely by itself.

Most interceptors inspect the request on the way in and forward the potentially altered request to the `handle()` method of the `next` object which implements the [`HttpHandler`](api/common/http/HttpHandler) interface.

<code-example format="javascript" language="javascript">

export abstract class HttpHandler {
  abstract handle(req: HttpRequest&lt;any&gt;): Observable&lt;HttpEvent&lt;any&gt;&gt;;
}

</code-example>

Like `intercept()`, the `handle()` method transforms an HTTP request into an `Observable` of [`HttpEvents`](#interceptor-events) which ultimately include the server's response.
The `intercept()` method could inspect that observable and alter it before returning it to the caller.

This `no-op` interceptor calls `next.handle()` with the original request and returns the observable without doing a thing.
-->
인터셉터를 구현하려면, `HttpInterceptor` 인터페이스를 사용하는 클래스를 정의하고 이 클래스 안에 `intercept()` 메소드를 정의하면 됩니다.

다음 코드는 기존 HTTP 요청을 변형하지 않고 그대로 통과시키는 인터셉터 기본 코드입니다:

<code-example header="app/http-interceptors/noop-interceptor.ts" path="http/src/app/http-interceptors/noop-interceptor.ts"></code-example>

`intercept` 메소드는 `Observable` 타입으로 HTTP 요청을 받아서 HTTP 응답을 반환합니다.
이것만 봐도 개별 인터셉터는 HTTP 요청에 대해 모든 것을 조작할 수 있습니다.

일반적으로 인터셉터는 요청을 보내거나 응답을 받는 방향을 그대로 유지하기 위해, [`HttpHandler`](api/common/http/HttpHandler) 인터페이스로 받은 `next` 인자의 `handle()` 메소드를 호출합니다.

<code-example format="javascript" language="javascript">

export abstract class HttpHandler {
  abstract handle(req: HttpRequest&lt;any&gt;): Observable&lt;HttpEvent&lt;any&gt;&gt;;
}

</code-example>

`intercept()`와 비슷하게, `handle()` 메소드도 HTTP 요청으로 받은 옵저버블을 [`HttpEvents`](#interceptor-events) 타입의 옵저버블로 변환하며, 이 타입이 서버의 최종 응답을 표현하는 타입입니다. `intercept()` 메소드는 이렇게 받은 서버의 응답을 확인할 수 있으며, HTTP 요청을 시작한 컨텍스트로 돌아가기 전까지 옵저버블의 내용을 조작할 수 있습니다.

원래 HTTP 요청이나 응답을 조작하지 않고 그대로 통과시키려면 단순하게 `next.handle()`을 실행하면 됩니다.


<!--
### The `next` object
-->
### `next` 객체

<!--
The `next` object represents the next interceptor in the chain of interceptors.
The final `next` in the chain is the `HttpClient` backend handler that sends the request to the server and receives the server's response.

Most interceptors call `next.handle()` so that the request flows through to the next interceptor and, eventually, the backend handler.
An interceptor *could* skip calling `next.handle()`, short-circuit the chain, and [return its own `Observable`](#caching) with an artificial server response.

This is a common middleware pattern found in frameworks such as Express.js.
-->
`next` 객체는 체이닝되는 인터셉터 중 다음으로 실행될 인터셉터를 의미합니다.
그리고 인터셉터 체인 중 마지막 인터셉터가 받는 `next` 객체는 `HttpClient` 백엔드 핸들러이며, 이 핸들러가 실제로 HTTP 요청을 보내고 서버의 응답을 첫 번째로 받는 핸들러입니다.

인터셉터는 대부분 HTTP 요청이 진행되는 흐름을 그대로 유지하기 위해 `next.handle()`를 실행하며, 최종적으로는 백엔드 핸들러가 실행됩니다.
하지만 서버의 응답을 시뮬레이션하는 경우라면 `next.handle()`을 실행하지 않고 [바로 `Observable`](#caching)을 반환하면서 인터셉터 체인을 멈출 수도 있습니다.

이 방식은 Express.js와 같은 프레임워크에서 미들웨어 패턴으로 자주 사용하는 방식입니다.


<!--
### Provide the interceptor
-->
### 인터셉터 적용하기

<!--
The `NoopInterceptor` is a service managed by Angular's [dependency injection (DI)](guide/dependency-injection) system.
Like other services, you must provide the interceptor class before the app can use it.

Because interceptors are optional dependencies of the `HttpClient` service, you must provide them in the same injector or a parent of the injector that provides `HttpClient`.
Interceptors provided *after* DI creates the `HttpClient` are ignored.

This app provides `HttpClient` in the app's root injector, as a side effect of importing the `HttpClientModule` in `AppModule`.
You should provide interceptors in `AppModule` as well.

After importing the `HTTP_INTERCEPTORS` injection token from `@angular/common/http`, write the `NoopInterceptor` provider like this:

<code-example path="http/src/app/http-interceptors/index.ts" region="noop-provider"></code-example>

Notice the `multi: true` option.
This required setting tells Angular that `HTTP_INTERCEPTORS` is a token for a *multiprovider* that injects an array of values, rather than a single value.

You *could* add this provider directly to the providers array of the `AppModule`.
However, it's rather verbose and there's a good chance that you'll create more interceptors and provide them in the same way.
You must also pay [close attention to the order](#interceptor-order) in which you provide these interceptors.

Consider creating a "barrel" file that gathers all the interceptor providers into an `httpInterceptorProviders` array, starting with this first one, the `NoopInterceptor`.

<code-example header="app/http-interceptors/index.ts" path="http/src/app/http-interceptors/index.ts" region="interceptor-providers"></code-example>

Then import and add it to the `AppModule` `providers array` like this:

<code-example header="app/app.module.ts (interceptor providers)" path="http/src/app/app.module.ts" region="interceptor-providers"></code-example>

As you create new interceptors, add them to the `httpInterceptorProviders` array and you won't have to revisit the `AppModule`.

<div class="alert is-helpful">

There are many more interceptors in the complete sample code.

</div>
-->
`NoopInterceptor`는 Angular의 [의존성 주입(Dependency Injection, DI)](guide/dependency-injection) 시스템으로 관리되는 서비스입니다.
그래서 다른 서비스와 마찬가지로, 이 인터셉터는 사용하기 전에 프로바이더에 등록해야 합니다.

그리고 인터셉터는 보통 `HttpClient` 서비스를 의존성으로 활용하기 때문에, 같은 인젝터나 부모 인젝터 계층에서 `HttpClient`도 의존성 객체로 등록해야 합니다.

예제 앱에서는 `HttpClient`가 앱 최상위 인젝터에 등록했기 때문에 `AppModule`에서 `HttpClientModule`을 등록했습니다.
그래서 다른 인터셉터도 `AppModule`에 등록해 봅시다.

인터셉터를 등록하려면 `@angular/common/http`에서 `HTTP_INTERCEPTORS` 의존성 주입 토큰을 불러와서 다음과 같이 작성합니다:

<code-example path="http/src/app/http-interceptors/index.ts" region="noop-provider"></code-example>

이 때 `multi: true` 옵션을 지정했습니다.
이 옵션을 지정하면 `HTTP_INTERCEPTORS` 토큰으로 적용되는 인터셉터가 하나만 있는 것이 아니라, *여러 개* 있다는 것을 의미합니다.

이 프로바이더 설정은 `AppModule`의 프로바이더 배열에 바로 추가할 수 있습니다.
하지만 인터셉터가 여러개 있다면, 이 프로바이더 설정을 한 번에 묶어서 사용하는 방법도 좋습니다.
이렇게 인터셉터 여러 개를 동시에 적용한다면, [인터셉터가 실행되는 순서](#인터셉터-실행-순서)에 주의해야 합니다.

인터셉터 프로바이더를 모두 파일 하나로 모으고, `httpInterceptorProviders` 배열로 관리해 봅시다.
먼저, 위에서 만든 `NoopInterceptor`를 다음과 같이 추가합니다.

<code-example header="app/http-interceptors/index.ts" path="http/src/app/http-interceptors/index.ts" region="interceptor-providers"></code-example>

그리고 `AppModule`에 작성했던 프로바이더 배열 을 다음과 같이 수정합니다:

<code-example header="app/app.module.ts (인터셉터 프로바이더)" path="http/src/app/app.module.ts" region="interceptor-providers"></code-example>

이제 새로운 인터셉터를 추가했을 때 `httpInterceptorProviders`에 등록하기만 하면, `AppModule`은 따로 수정하지 않아도 됩니다.

<div class="alert is-helpful">

이 문서의 최종 예제 코드에는 더 많은 인터셉터가 사용되었습니다.

</div>


<!--
### Interceptor order
-->
### 인터셉터 실행 순서

<!--
Angular applies interceptors in the order that you provide them.
For example, consider a situation in which you want to handle the authentication of your HTTP requests and log them before sending them to a server.
To accomplish this task, you could provide an `AuthInterceptor` service and then a `LoggingInterceptor` service.
Outgoing requests would flow from the `AuthInterceptor` to the `LoggingInterceptor`.
Responses from these requests would flow in the other direction, from `LoggingInterceptor` back to `AuthInterceptor`.
The following is a visual representation of the process:

<div class="lightbox">

<img alt="Interceptor in order of HttpClient, AuthInterceptor, AuthInterceptor, HttpBackend, Server, and back in opposite order to show the two-way flow" src="generated/images/guide/http/interceptor-order.svg">

</div>

<div class="alert is-helpful">

The last interceptor in the process is always the `HttpBackend` that handles communication with the server.

</div>

You cannot change the order or remove interceptors later.
If you need to enable and disable an interceptor dynamically, you'll have to build that capability into the interceptor itself.
-->
인터셉터는 등록된 순서대로 실행됩니다.
서버로 요청을 보내기 전에 인증 필드를 추가하고 로그로 남겨야 한다고 합시다.
이 경우에는 `AuthInterceptor` 서비스를 등록한 후에 `LoggingInterceptor` 서비스를 등록하면 됩니다.
그러면 외부로 향하는 요청이 `AuthInterceptor`를 거친 후에 `LoggingInterceptor`로 전달됩니다.
그리고 돌아오는 응답은 반대로 `LoggingInterceptor`를 거쳐 `AuthInterceptor`로 전달됩니다.
이 과정을 그림으로 표현해보면 이렇습니다:

<div class="lightbox">

<img alt="Interceptor in order of HttpClient, AuthInterceptor, AuthInterceptor, HttpBackend, Server, and back in opposite order to show the two-way flow" src="generated/images/guide/http/interceptor-order.svg">

</div>

<div class="alert is-helpful">

마지막에 실행되는 인터셉터는 반드시 서버와 통신하는 `HttpBackend`를 처리하는 로직이어야 합니다.

</div>

인터셉터를 등록한 이후에 실행 순서를 변경하거나 특정 인터셉터를 건너뛸 수는 없습니다.
인터셉터를 적용할지 건너뛰어야 할지 지정하려면 인터셉터 안에 동적으로 로직을 작성해야 합니다.


<a id="interceptor-events"></a>

<!--
### Handling interceptor events
-->
### 인터셉터 이벤트 처리하기

<!--
Most `HttpClient` methods return observables of `HttpResponse<any>`.
The `HttpResponse` class itself is actually an event, whose type is `HttpEventType.Response`.
A single HTTP request can, however, generate multiple events of other types, including upload and download progress events.
The methods `HttpInterceptor.intercept()` and `HttpHandler.handle()` return observables of `HttpEvent<any>`.

Many interceptors are only concerned with the outgoing request and return the event stream from `next.handle()` without modifying it.
Some interceptors, however, need to examine and modify the response from `next.handle()`; these operations can see all of these events in the stream.
-->
`HttpClient` 메서드는 대부분 `HttpResponse<any>`를 옵저버블로 반환합니다.
이 때 `HttpResponse` 클래스는 `HttpEventType.Response`이 지정되어 있기 때문에 그 자체로도 이벤트 하나를 표현합니다.
그런데 HTTP 요청 하나가 처리되는 동안 다른 타입값으로 여러번 이벤트가 발생할 수 있습니다.
업로드하거나 다운로드할 때 전달되는 진행률 이벤트가 그렇습니다.
`HttpInterceptor.intercept()`와 `HttpHandler.handle()` 메서드는 모두 `HttpEvent<any>`를 옵저버블로 반환합니다.

일반적으로 인터셉터는 외부로 보내는 요청에만 적용하고 `next.handle()`로 받아오는 방식으로 사용합니다.
그런데 `next.handle()`이 반환하는 옵저버블을 활용하면 스트림으로 전달되는 응답 이벤트의 형태를 변환할 수 있습니다.


<a id="immutability"></a>

<!--
Although interceptors are capable of modifying requests and responses, the `HttpRequest` and `HttpResponse` instance properties are `readonly`, rendering them largely immutable.
They are immutable for a good reason:
An app might retry a request several times before it succeeds, which means that the interceptor chain can re-process the same request multiple times.
If an interceptor could modify the original request object, the re-tried operation would start from the modified request rather than the original.
Immutability ensures that interceptors see the same request for each try.

<div class="alert is-helpful">

Your interceptor should return every event without modification unless it has a compelling reason to do otherwise.

</div>

TypeScript prevents you from setting `HttpRequest` read-only properties.

<code-example format="javascript" language="javascript">

// Typescript disallows the following assignment because req.url is readonly
req.url = req.url.replace('http://', 'https://');

</code-example>

If you must alter a request, clone it first and modify the clone before passing it to `next.handle()`.
You can clone and modify the request in a single step, as shown in the following example.

<code-example header="app/http-interceptors/ensure-https-interceptor.ts (excerpt)" path="http/src/app/http-interceptors/ensure-https-interceptor.ts" region="excerpt"></code-example>

The `clone()` method's hash argument lets you mutate specific properties of the request while copying the others.
-->
인터셉터가 요청이나 응답을 조작할 수는 있지만 `HttpRequest` 인스턴스와 `HttpResponse` 인스턴스의 프로퍼티는 `readonly`이기 때문에 이뮤터블입니다.
이 프로퍼티들이 이뮤터블인 이유가 있습니다.
앱에서 보낸 요청이 실패하면 재시도하는 경우가 있는데, 이 때마다 인터셉터가 체이닝되면 인터셉터가 같은 요청을 여러번 처리할 수 있습니다.
그래서 인터셉터는 기존에 보냈던 요청은 그대로 두고 새로운 객체를 받아서 변환 작업을 하는 것이 안전합니다.
결국 인터셉터가 요청으로 보내는 객체를 한 번만 처리하는 것을 보장하기 위해 이뮤터블이 사용됩니다.

<div class="alert is-helpful">

특별한 이유가 없다면 인터셉터가 변환하지 않는 이벤트 객체도 그대로 반환해야 합니다.

</div>

다음과 같이 `HttpRequest` 읽기 전용 프로퍼티를 변경하는 코드는 TypeScript가 막기 때문에 사용할 수 없습니다.

<code-example format="javascript" language="javascript">

// req.url은 readonly 로 지정되었기 때문에 TypeScript 에러가 발생합니다.
req.url = req.url.replace('http://', 'https://');

</code-example>

그래서 요청을 조작하려면 먼저 이 요청을 복제한 후에 복제된 객체를 `next.handle()` 함수로 전달해야 합니다.
요청으로 보내는 객체의 값은 한 번에 하나만 변경할 수 있습니다.

<code-example header="app/http-interceptors/ensure-https-interceptor.ts (일부)" path="http/src/app/http-interceptors/ensure-https-interceptor.ts" region="excerpt"></code-example>

`clone()` 메서드는 해시 인자를 활용하기 때문에 특정 프로퍼티 값을 변경하더라도 나머지 프로퍼티 값은 그대로 사용할 수 있습니다.


<!--
#### Modifying a request body
-->
#### 요청 바디 변환하기

<!--
The `readonly` assignment guard can't prevent deep updates and, in particular, it can't prevent you from modifying a property of a request body object.

<code-example format="javascript" language="javascript">

req.body.name = req.body.name.trim(); // bad idea!

</code-example>

If you must modify the request body, follow these steps.

1.  Copy the body and make your change in the copy.
1.  Clone the request object, using its `clone()` method.
1.  Replace the clone's body with the modified copy.

<code-example header="app/http-interceptors/trim-name-interceptor.ts (excerpt)" path="http/src/app/http-interceptors/trim-name-interceptor.ts" region="excerpt"></code-example>
-->
`readonly` 가드는 특정 필드의 값이 변경되는 것을 방지하기 때문에, 다음과 같이 요청으로 보내는 필드의 값을 직접 변경할 수 없습니다.

<code-example format="javascript" language="javascript">

req.body.name = req.body.name.trim(); // 이렇게 사용할 수 없습니다!

</code-example>

그래서 요청으로 보내는 바디를 조작해야 한다면 이렇게 해야 합니다.

1.  요청 객체의 바디를 복사해서 원하는 대로 수정합니다.
1.  `clone()` 메서드를 실행해서 요청 객체를 복제합니다.
1.  복제한 요청 객체의 바디를 수정한 바디로 교체합니다.

<code-example header="app/http-interceptors/trim-name-interceptor.ts (일부)" path="http/src/app/http-interceptors/trim-name-interceptor.ts" region="excerpt"></code-example>


<!--
#### Clearing the request body in a clone
-->
#### 요청으로 보내는 바디 비우기

<!--
Sometimes you need to clear the request body rather than replace it.
To do this, set the cloned request body to `null`.

<div class="alert is-helpful">

**TIP**: <br />
If you set the cloned request body to `undefined`, Angular assumes you intend to leave the body as is.

</div>

<code-example format="javascript" language="javascript">

newReq = req.clone({ &hellip; }); // body not mentioned =&gt; preserve original body
newReq = req.clone({ body: undefined }); // preserve original body
newReq = req.clone({ body: null }); // clear the body

</code-example>
-->
어떤 경우에는 요청으로 보내는 바디를 교체하는 것이 아니라 비워야 할 때가 있습니다.
이 경우에는 요청으로 보내는 바디를 `null` 값으로 지정하면서 복제하면 됩니다.

<div class="alert is-helpful">

**팁**: <br />
요청 바디를 `undefined` 값으로 지정하면 Angular는 이 바디를 비우지 않는 것으로 간주합니다.

</div>

<code-example format="javascript" language="javascript">

newReq = req.clone({ &hellip; }); // 기존 바디를 유지합니다.
newReq = req.clone({ body: undefined }); // 기존 바디를 유지합니다.
newReq = req.clone({ body: null }); // 바디의 내용을 비웁니다.

</code-example>

<!--
## Http interceptor use-cases
-->
## Http 인터셉터 활용 예제

<!--
Following are a number of common uses for interceptors.
-->
인터셉터를 활용하는 방법을 좀 더 알아봅시다.


<!--
### Setting default headers
-->
### 기본 헤더 설정하기

<!--
Apps often use an interceptor to set default headers on outgoing requests.

The sample app has an `AuthService` that produces an authorization token.
Here is its `AuthInterceptor` that injects that service to get the token and adds an authorization header with that token to every outgoing request:

<code-example header="app/http-interceptors/auth-interceptor.ts" path="http/src/app/http-interceptors/auth-interceptor.ts"></code-example>

The practice of cloning a request to set new headers is so common that there's a `setHeaders` shortcut for it:

<code-example path="http/src/app/http-interceptors/auth-interceptor.ts" region="set-header-shortcut"></code-example>

An interceptor that alters headers can be used for a number of different operations, including:

*   Authentication/authorization
*   Caching behavior; for example, `If-Modified-Since`
*   XSRF protection
-->
인터셉터는 애플리케이션에서 보내는 HTTP 요청에 기본 헤더를 설정하는 용도로도 자주 사용합니다.

이번에 다루는 앱에는 인증 토큰을 생성하는 `AuthService`가 있습니다.
그리고 `AuthInterceptor`는 이 서비스를 주입받아 토큰을 받아오고, 애플리케이션에서 보내는 모든 HTTP 요청에 인증 헤더를 추가합니다:

<code-example header="app/http-interceptors/auth-interceptor.ts" path="http/src/app/http-interceptors/auth-interceptor.ts"></code-example>

이 때 헤더를 설정하기 위해 HTTP 요청을 복제하는 것은 자주 사용되는 로직이기 때문에, `setHeaders` 옵션을 사용할 수도 있습니다.

<code-example path="http/src/app/http-interceptors/auth-interceptor.ts" region="set-header-shortcut"></code-example>

인터셉터가 헤더를 수정하는 동작은 다음과 같은 경우에도 다양하게 적용할 수 있습니다:

*   인증 발급/확인
*   `If-Modified-Since` 등을 활용한 캐싱
*   XSRF 보안


<!--
### Logging request and response pairs
-->
### 요청/응답을 로그로 출력하기

<!--
Because interceptors can process the request and response *together*, they can perform tasks such as timing and logging an entire HTTP operation.

Consider the following `LoggingInterceptor`, which captures the time of the request,
the time of the response, and logs the outcome with the elapsed time
with the injected `MessageService`.

<code-example header="app/http-interceptors/logging-interceptor.ts)" path="http/src/app/http-interceptors/logging-interceptor.ts" region="excerpt"></code-example>

The RxJS `tap` operator captures whether the request succeeded or failed.
The RxJS `finalize` operator is called when the response observable either returns an error or completes and reports the outcome to the `MessageService`.

Neither `tap` nor `finalize` touch the values of the observable stream returned to the caller.
-->
인터셉터는 HTTP 요청과 응답에 *모두* 관여하기 때문에, HTTP 응답 시간이나 HTTP 동작에 대한 내용을 모두 확인할 수 있습니다.

HTTP 요청이 발생한 시간과 응답이 도착한 시간을 확인하고, 최종 HTTP 통신에 걸린 시간을 `MessageService`로 출력하는 인터셉터를 구현해 봅시다. 이 인터셉터는 `LoggingInterceptor`라는 이름으로 구현합니다.

<code-example header="app/http-interceptors/logging-interceptor.ts)" path="http/src/app/http-interceptors/logging-interceptor.ts" region="excerpt"></code-example>

RxJS가 제공하는 `tap` 연산자와 `finalize`는 HTTP 요청이 성공하거나 실패하는 것에 관계없이 모든 응답에 대해 실행됩니다.
이 코드에서는 `finalize`가 실행될 때 `MessageService`로 로그를 보냅니다.

`tap` 연산자와 `finalize` 연산자 모두 옵저버블의 값을 확인하기만 하고, 옵저버블의 내용은 변경하지 않습니다.


<a id="custom-json-parser"></a>

<!--
### Custom JSON parsing
-->
### 커스텀 JSON 파싱

<!--
Interceptors can be used to replace the built-in JSON parsing with a custom implementation.

The `CustomJsonInterceptor` in the following example demonstrates how to achieve this.
If the intercepted request expects a `'json'` response, the `responseType` is changed to `'text'` to disable the built-in JSON parsing.
Then the response is parsed via the injected `JsonParser`.

<code-example header="app/http-interceptors/custom-json-interceptor.ts" path="http/src/app/http-interceptors/custom-json-interceptor.ts" region="custom-json-interceptor"></code-example>

You can then implement your own custom `JsonParser`.
Here is a custom JsonParser that has a special date reviver.

<code-example header="app/http-interceptors/custom-json-interceptor.ts" path="http/src/app/http-interceptors/custom-json-interceptor.ts" region="custom-json-parser"></code-example>

You provide the `CustomParser` along with the `CustomJsonInterceptor`.

<code-example header="app/http-interceptors/index.ts" path="http/src/app/http-interceptors/index.ts" region="custom-json-interceptor"></code-example>
-->
인터셉터를 활용하면 기존 JSON 파싱 로직을 커스텀 로직으로 대체할 수 있습니다.

아래 예제에서 `CustomJsonInterceptor`가 이 역할을 합니다.
인터셉터가 `'json'` 응답을 받으면 `responseType`을 `'text'`로 변경하면서 기본 JSON 파싱 로직을 생략합니다.
그리고 나서 의존성으로 주입받은 `JsonParser`로 보내서 원하는 대로 파싱하면 됩니다.

<code-example header="app/http-interceptors/custom-json-interceptor.ts" path="http/src/app/http-interceptors/custom-json-interceptor.ts" region="custom-json-interceptor"></code-example>

커스텀 JSON 파싱 로직은 `JsonParser`에 구현합니다.
이런 식으로 활용할 수 있습니다.

<code-example header="app/http-interceptors/custom-json-interceptor.ts" path="http/src/app/http-interceptors/custom-json-interceptor.ts" region="custom-json-parser"></code-example>

`CustomParser`는 `CustomJsonInterceptor`와 함께 사용하면 됩니다.

<code-example header="app/http-interceptors/index.ts" path="http/src/app/http-interceptors/index.ts" region="custom-json-interceptor"></code-example>


<a id="caching"></a>

<!--
### Caching requests
-->
### 인터셉터를 캐시로 활용하기

<!--
Interceptors can handle requests by themselves, without forwarding to `next.handle()`.

For example, you might decide to cache certain requests and responses to improve performance.
You can delegate caching to an interceptor without disturbing your existing data services.

The `CachingInterceptor` in the following example demonstrates this approach.

<code-example header="app/http-interceptors/caching-interceptor.ts)" path="http/src/app/http-interceptors/caching-interceptor.ts" region="v1"></code-example>

*   The `isCacheable()` function determines if the request is cacheable.
    In this sample, only GET requests to the package search API are cacheable.

*   If the request is not cacheable, the interceptor forwards the request to the next handler in the chain
*   If a cacheable request is found in the cache, the interceptor returns an `of()` *observable* with the cached response, by-passing the `next` handler and all other interceptors downstream
*   If a cacheable request is not in cache, the code calls `sendRequest()`.
    This function forwards the request to `next.handle()` which ultimately calls the server and returns the server's response.
-->
인터셉터는 `next.handle()`을 실행하지 않는 방식으로도 활용할 수 있습니다.

성능 향상을 위해 특정 요청과 응답은 캐싱한다고 합시다.
이런 경우에 인터셉터를 활용하면 기존에 사용하던 데이터 서비스 코드를 수정하지 않아도 캐싱 기능을 구현할 수 있습니다.

캐싱으로 사용하는 인터셉터는 이런식으로 정의합니다.

<code-example header="app/http-interceptors/caching-interceptor.ts)" path="http/src/app/http-interceptors/caching-interceptor.ts" region="v1"></code-example>

*   `isCacheable()` 함수는 해당 요청이 캐싱 대상인지 결정합니다.
    예제 코드에서는 npm 패키지를 검색하는 GET 요청이 대상입니다.

*   캐싱 대상이 아닌 요청은 다음 체인에 있는 핸들러로 넘깁니다.
*   캐싱 대상이고 캐시에 이미 저장된 요청은 `of()` 옵저버블로 캐싱된 데이터를 반환합니다.
    이 때 `next` 핸들러와 이후 인터셉터는 모두 생략합니다.

*   캐싱 대상이고 캐시에 저장되어 있지 않은 요청은 `sendRequest()`로 실행합니다.
    `sendRequest()` 함수는 `next.handle()`을 실행한 최종 응답을 캐시에 저장합니다.

<a id="send-request"></a>

<!--
<code-example path="http/src/app/http-interceptors/caching-interceptor.ts" region="send-request"></code-example>

<div class="alert is-helpful">

Notice how `sendRequest()` intercepts the response on its way back to the application.
This method pipes the response through the `tap()` operator, whose callback adds the response to the cache.

The original response continues untouched back up through the chain of interceptors to the application caller.

Data services, such as `PackageSearchService`, are unaware that some of their `HttpClient` requests actually return cached responses.
-->
<code-example path="http/src/app/http-interceptors/caching-interceptor.ts" region="send-request"></code-example>

<div class="alert is-helpful">

`sendRequest()` 함수는 응답이 애플리케이션으로 돌아가기 전 시점을 가로챕니다.
그리고 `tap()` 연산자를 파이프로 연결해서 캐시에 응답을 저장합니다.

리모트 서버로 보낸 원래 응답은 변경되지 않은 상태로 애플리케이션에 전달됩니다.

이후에 `PackageSearchService`가 같은 조건으로 HTTP 요청을 보내면 실제 HTTP 요청이 발생하지 않고 캐시에 저장된 응답이 반환됩니다.


</div>


<a id="cache-refresh"></a>

<!--
### Using interceptors to request multiple values
-->
### 인터셉터로 데이터 여러번 요청하기

<!--
The `HttpClient.get()` method normally returns an observable that emits a single value, either the data or an error.
An interceptor can change this to an observable that emits [multiple values](guide/observables).

The following revised version of the `CachingInterceptor` optionally returns an observable that immediately emits the cached response, sends the request on to the package search API, and emits again later with the updated search results.

<code-example path="http/src/app/http-interceptors/caching-interceptor.ts" region="intercept-refresh"></code-example>

<div class="alert is-helpful">

The *cache-then-refresh* option is triggered by the presence of a custom `x-refresh` header.

A checkbox on the `PackageSearchComponent` toggles a `withRefresh` flag, which is one of the arguments to `PackageSearchService.search()`.
That `search()` method creates the custom `x-refresh` header and adds it to the request before calling `HttpClient.get()`.

</div>

The revised `CachingInterceptor` sets up a server request whether there's a cached value or not, using the same `sendRequest()` method described [above](#send-request).
The `results$` observable makes the request when subscribed.

*   If there's no cached value, the interceptor returns `results$`.
*   If there is a cached value, the code *pipes* the cached response onto `results$`. This produces a recomposed observable that emits two responses, so subscribers will see a sequence of these two responses:  
  *   The cached response that's emitted immediately
  *   The response from the server, that's emitted later
-->
`HttpClient.get()` 메서드는 일반적으로 데이터나 에러를 하나만 반환합니다.
이 때 인터셉터를 활용하면 이 옵저버블로 [데이터를 여러번](guide/observables) 보낼 수도 있습니다.

아래 예제는 `CachingInterceptor`를 활용할 때 캐싱된 응답을 바로 반환하고, 그 이후에 패키지 검색 API로 요청을 보낸 뒤 새로운 응답을 다시 한 번 반환하는 예제 코드입니다.

<code-example path="http/src/app/http-interceptors/caching-interceptor.ts" region="intercept-refresh"></code-example>

<div class="alert is-helpful">

*캐싱된 데이터를 먼저 반환하고 나중에 갱신하는* 동작은 `x-refresh` 헤더에 의해 결정됩니다.

`PackageSearchComponent`에 있는 체크 박스는 `withRefresh` 플래그를 반환하며, 이 플래그는 `PackageSearchService.search()` 메서드에 인자로 사용됩니다.
`search()` 메서드는 이 플래그 값에 따라 `x-refresh` 헤더를 추가하며, 이 헤더는 `HttpClient.get()` 메서드를 실행할 때 반영됩니다.

</div>

이렇게 수정하면 데이터가 인터셉터에 캐싱되었는지 여부와 관계없이 [`sendRequest()`](#send-request) 메서드를 실행해서 HTTP 요청을 보냅니다.
`results$` 옵저버블을 구독해야 옵저버블이 시작된다는 것을 잊지 마세요.

*   캐싱된 값이 없으면 인터셉터는 `results$`를 반환합니다.
*   캐싱된 값이 있으면 캐싱된 응답을 `results$`에 파이프로 연결합니다. 이 때 옵저버블은 2개의 응답을 순차적으로 처리합니다:
  *   캐싱된 응답을 즉시 반환됩니다.
  *   서버에서 새로 응답을 받으면 이 응답은 나중에 반환됩니다.


<a id="report-progress"></a>

<!--
## Tracking and showing request progress
-->
## 진행상황 확인하기

<!--
Sometimes applications transfer large amounts of data and those transfers can take a long time.
File uploads are a typical example.
You can give the users a better experience by providing feedback on the progress of such transfers.

To make a request with progress events enabled, create an instance of `HttpRequest` with the `reportProgress` option set true to enable tracking of progress events.

<code-example header="app/uploader/uploader.service.ts (upload request)" path="http/src/app/uploader/uploader.service.ts" region="upload-request"></code-example>

<div class="alert is-important">

**TIP**: <br />
Every progress event triggers change detection, so only turn them on if you need to report progress in the UI.

When using [`HttpClient.request()`](api/common/http/HttpClient#request) with an HTTP method, configure the method with [`observe: 'events'`](api/common/http/HttpClient#request) to see all events, including the progress of transfers.

</div>

Next, pass this request object to the `HttpClient.request()` method, which returns an `Observable` of `HttpEvents` \(the same events processed by [interceptors](#interceptor-events)\).

<code-example header="app/uploader/uploader.service.ts (upload body)" path="http/src/app/uploader/uploader.service.ts" region="upload-body"></code-example>

The `getEventMessage` method interprets each type of `HttpEvent` in the event stream.

<code-example header="app/uploader/uploader.service.ts (getEventMessage)" path="http/src/app/uploader/uploader.service.ts" region="getEventMessage"></code-example>

<div class="alert is-helpful">

The sample app for this guide doesn't have a server that accepts uploaded files.
The `UploadInterceptor` in `app/http-interceptors/upload-interceptor.ts` intercepts and short-circuits upload requests by returning an observable of simulated events.

</div>
-->
애플리케이션이 리모트 서버에 보내는 데이터가 많다면 통신 시간도 오래 걸립니다.
파일을 업로드하는 경우가 그렇습니다.
이 경우에는 업로드가 진행되는 상황을 사용자에게 표시하면 더 나은 UX를 제공할 수 있습니다.

요청을 보낼 때 진행률 이벤트를 활성화하려면 `HttpRequest` 인스턴스를 생성할 때 `reportProgress` 옵션의 값을 `true`로 지정하면 됩니다.

<code-example header="app/uploader/uploader.service.ts (업로드 요청)" path="http/src/app/uploader/uploader.service.ts" region="upload-request"></code-example>

<div class="alert is-important">

**팁**: <br />
진행률 이벤트가 발생할 때마다 변화 감지 로직이 실행됩니다. 이 옵션은 진행상황을 UI에 반영할 때만 켜는 것이 좋습니다.

[`HttpClient.request()`](api/common/http/HttpClient#request) 메서드를 실행할 때 [`observe: 'events'`](api/common/http/HttpClient#request) 옵션을 사용하면 진행률 이벤트를 포함한 모든 이벤트를 확인할 수 있습니다.

</div>

이제 `HttpClient.request()` 메서드에 요청 객체를 전달하면 이 메서드는 `Observable`로 `HttpEvents` 객체를 반환합니다.
이 이벤트 객체는 [인터셉터](#interceptor-events)가 처리하던 이벤트와 같습니다.

<code-example header="app/uploader/uploader.service.ts (업로드 코드)" path="http/src/app/uploader/uploader.service.ts" region="upload-body"></code-example>

`getEventMessage` 메서드는 이벤트 스트림으로 전달되는 `HttpEvent` 객체를 처리합니다.

<code-example header="app/uploader/uploader.service.ts (getEventMessage())" path="http/src/app/uploader/uploader.service.ts" region="getEventMessage"></code-example>

<div class="alert is-helpful">

예제로 다루는 앱에는 파일 업로드용 서버가 존재하지 않습니다.
대신 `app/http-interceptors/upload-interceptor.ts` 파일에 정의한 `UploadInterceptor`가 서버의 응답을 대신하는 방식으로 구현했습니다.

</div>


<!--
## Optimizing server interaction with debouncing
-->
## 서버로 보내는 요청 최적화하기

<!--
If you need to make an HTTP request in response to user input, it's not efficient to send a request for every keystroke.
It's better to wait until the user stops typing and then send a request.
This technique is known as debouncing.

Consider the following template, which lets a user enter a search term to find a package by name.
When the user enters a name in a search-box, the `PackageSearchComponent` sends a search request for a package with that name to the package search API.

<code-example header="app/package-search/package-search.component.html (search)" path="http/src/app/package-search/package-search.component.html" region="search"></code-example>

Here, the `keyup` event binding sends every keystroke to the component's `search()` method.

<div class="alert is-helpful">

The type of `$event.target` is only `EventTarget` in the template.
In the `getValue()` method, the target is cast to an `HTMLInputElement` to let type-safe have access to its `value` property.

<code-example path="http/src/app/package-search/package-search.component.ts" region="getValue"></code-example>

</div>

The following snippet implements debouncing for this input using RxJS operators.

<code-example header="app/package-search/package-search.component.ts (excerpt)" path="http/src/app/package-search/package-search.component.ts" region="debounce"></code-example>

The `searchText$` is the sequence of search-box values coming from the user.
It's defined as an RxJS `Subject`, which means it is a multicasting `Observable` that can also emit values for itself by calling `next(value)`, as happens in the `search()` method.

Rather than forward every `searchText` value directly to the injected `PackageSearchService`, the code in `ngOnInit()` pipes search values through three operators, so that a search value reaches the service only if it's a new value and the user stopped typing.

| RxJS operators           | Details |
|:---                      |:---     |
| `debounceTime(500)`⁠      | Wait for the user to stop typing, which is 1/2 second in this case. |
| `distinctUntilChanged()` | Wait until the search text changes.                           |
| `switchMap()`⁠            | Send the search request to the service.                       |

The code sets `packages$` to this re-composed `Observable` of search results.
The template subscribes to `packages$` with the [AsyncPipe](api/common/AsyncPipe) and displays search results as they arrive.

<div class="alert is-helpful">

See [Using interceptors to request multiple values](#cache-refresh) for more about the `withRefresh` option.

</div>
-->
사용자가 입력한 내용으로 HTTP 요청을 보내야 한다고 합시다.
그런데 이 때 키입력이 있을 때마다 HTTP 요청을 보내는 것은 비효율적입니다.
이 방식보다는 사용자가 키입력을 멈출때까지 잠시 기다린 후에 요청을 보내는 것이 좋습니다.
이런 테크닉을 디바운싱(debouncing)이라고 합니다.

아래 템플릿 코드는 사용자가 입력한 검색어로 npm 패키지를 검색하는 코드입니다.
사용자가 입력 필드에 npm 패키지 이름을 입력하면 `PackageSearchComponent`가 이 값으로 검색 요청을 보냅니다.

<code-example header="app/package-search/package-search.component.html (검색)" path="http/src/app/package-search/package-search.component.html" region="search"></code-example>

이 코드를 보면 `keyup` 이벤트가 컴포넌트 `search()` 메서드와 바인딩되었기 때문에 키입력 이벤트가 발생할 때마다 `search()` 메서드가 실행됩니다.

<div class="alert is-helpful">

템플릿에서 확인할 수 있는 `$event.target`의 타입은 `EventTarget` 입니다.
그래서 `getValue()` 메소드를 사용하려면 이 객체를 `HTMLInputElement`로 캐스팅해야 합니다.

<code-example path="http/src/app/package-search/package-search.component.ts" region="getValue"></code-example>

</div>

그리고 아래 코드는 RxJS 연산자로 입력값을 디바운싱하는 코드입니다.

<code-example header="app/package-search/package-search.component.ts (일부)" path="http/src/app/package-search/package-search.component.ts" region="debounce"></code-example>

`searchText$`는 사용자가 입력 필드에 입력한 값이 순서대로 전달되는 옵저버블입니다.
이 옵저버블은 RxJS `Subject` 타입이기 때문에 `next(값)`을 실행해서 데이터를 여러번 전달할 수 있습니다.

그렇다면 `searchText` 값이 변경될 때마다 `PackageSearchService`로 요청을 보내기보다 `ngOnInit()`에 구현한 것처럼 파이프를 사용해서 이 동작을 적절히 조절하는 것이 좋습니다.
이 코드에서는 사용자가 입력을 멈춘 시점에 값이 정말 변경되었을 때만 요청을 보내기 위해 연산자가 3개 사용되었습니다.

| RxJS 연산자                 | 설명                    |
|:-------------------------|:----------------------|
| `debounceTime(500)`⁠     | 사용자가 입력을 멈출때까지 기다립니다. |
| `distinctUntilChanged()` | 값이 실제로 변경된 것을 감지합니다.  |
| `switchMap()`⁠           | 서비스로 검색 요청을 보냅니다.     |

연산자를 통과한 검색 결과는 `packages$` 옵저버블에 저장됩니다.
그래서 템플릿에 [AsyncPipe](api/common/AsyncPipe)를 사용하면 검색 결과를 화면에서 확인할 수 있습니다.

<div class="alert is-helpful">

`withRefresh` 옵션에 대해 자세하게 알아보려면 [인터셉터로 데이터 여러번 요청하기](#cache-refresh) 섹션을 참고하세요.

</div>


<!--
### Using the `switchMap()` operator
-->
### `switchMap()` 연산자 활용하기

<!--
The `switchMap()` operator takes a function argument that returns an `Observable`.
In the example, `PackageSearchService.search` returns an `Observable`, as other data service methods do.
If a previous search request is still in-flight, such as when the network connection is poor, the operator cancels that request and sends a new one.

<div class="alert is-helpful">

**NOTE**: <br />
`switchMap()` returns service responses in their original request order, even if the server returns them out of order.

</div>

<div class="alert is-helpful">

If you think you'll reuse this debouncing logic, consider moving it to a utility function or into the `PackageSearchService` itself.

</div>
-->
`switchMap()` 연산자는 `Observable`을 반환하는 연산자입니다.
위에서 살펴본 예제에서도 `PackageSearchService.search()` 함수는 `Observable`을 반환합니다.
만약 이전에 보낸 요청이 아직 완료되지 않았다면 `switchMap()` 연산자는 이전 요청을 취소하고 새로운 요청을 보냅니다.

그리고 `switchMap()` 연산자는 서버가 응답하는 순서와 관계없이 요청을 보냈던 순서대로 응답을 반환합니다.

<div class="alert is-helpful">

**참고**: <br />
`switchMap()`는 요청을 보낸 순서대로 응답을 반환합니다.
서버가 응답한 순서와는 관계가 없습니다.

</div>

<div class="alert is-helpful">

디바운싱 로직을 재사용하려면 이 로직을 유틸리티 함수로 옮기거나 `PackageSearchService` 안쪽으로 옮기는 것이 좋습니다.

</div>


<a id="security-xsrf-protection"></a>

<!--
## Security: XSRF protection
-->
## 보안 : XSRF 방어

<!--
[Cross-Site Request Forgery (XSRF or CSRF)](https://en.wikipedia.org/wiki/Cross-site_request_forgery) is an attack technique by which the attacker can trick an authenticated user into unknowingly executing actions on your website.
`HttpClient` supports a [common mechanism](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-header_token) used to prevent XSRF attacks.
When performing HTTP requests, an interceptor reads a token from a cookie, by default `XSRF-TOKEN`, and sets it as an HTTP header, `X-XSRF-TOKEN`.
Because only code that runs on your domain could read the cookie, the backend can be certain that the HTTP request came from your client application and not an attacker.

By default, an interceptor sends this header on all mutating requests \(such as POST\)
to relative URLs, but not on GET/HEAD requests or on requests with an absolute URL.

To take advantage of this, your server needs to set a token in a JavaScript readable session cookie called `XSRF-TOKEN` on either the page load or the first GET request.
On subsequent requests the server can verify that the cookie matches the `X-XSRF-TOKEN` HTTP header, and therefore be sure that only code running on your domain could have sent the request.
The token must be unique for each user and must be verifiable by the server; this prevents the client from making up its own tokens.
Set the token to a digest of your site's authentication cookie with a salt for added security.

To prevent collisions in environments where multiple Angular apps share the same domain or subdomain, give each application a unique cookie name.

<div class="alert is-important">

*`HttpClient` supports only the client half of the XSRF protection scheme.*
Your backend service must be configured to set the cookie for your page, and to verify that the header is present on all eligible requests.
Failing to do so renders Angular's default protection ineffective.

</div>
-->
[사이트간 요청 위조 (Cross-Site Request Forgery (XSRF))](https://en.wikipedia.org/wiki/Cross-site_request_forgery)는 인증받지 않은 사용자가 웹사이트를 공격하는 방법 중 하나입니다.
Angular에서 제공하는 `HttpClient`는 [XSRF 공격을 방어하는 기능](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-header_token)을 탑재하고 있습니다.
그래서 HTTP 요청이 발생했을 때 쿠키에서 토큰을 읽는 인터셉터가 자동으로 동작하며, `XSRF-TOKEN`으로 설정된 HTTP 헤더를 `X-XSRF-TOKEN`으로 변경합니다.
결국 현재 도메인에 유효한 쿠키만 읽을 수 있으며, 백엔드가 HTTP 요청을 좀 더 안전하게 처리할 수 있습니다.

기본적으로 이 인터셉터는 상대주소로 요청되는 모든 요청에 적용되며, 절대 주소로 요청되는 GET/HEAD 요청에는 적용되지 않습니다.

그래서 모든 요청에 사이트간 위조된 요청을 방어하려면, 페이지가 로드되거나 처음 발생하는 GET 요청에 대해서 쿠키에 `XSRF-TOKEN`이 있는지 확인해야 합니다.
그리고 이후에 발생한 요청의 헤더에 `X-XSRF-TOKEN`이 있으면 요청이 유효한 것으로 판단하며, 유효한 도메인에서 제대로 보내진 요청이라는 것으로 최종 판단할 수 있습니다.
이 때 사용하는 토큰은 사용자마다 달라야 하며, 서버에서 반드시 인증되어야 합니다.
그래야 클라이언트에서 토큰을 위조하는 것도 방어할 수 있습니다.
서버에서 토큰을 생성할 때 인증키를 활용하면 좀 더 확실합니다.

Angular 앱 여러개가 같은 도메인이나 서브도메인을 사용해서 이 부분에 충돌이 발생한다면 애플리케이션마다 유일한 쿠키 이름을 사용해야 합니다.

<div class="alert is-important">

*`HttpClient`에서 제공하는 XSRF 방어 동작은 클라이언트에만 적용되는 내용입니다.*
백엔드에서도 페이지에 쿠키를 설정해야 하며, 클라이언트에서 발생하는 모든 요청이 유효한지 확인해야 합니다.
백엔드에서 이 내용을 확인하지 않으면 Angular의 보안 로직이 제대로 동작하지 않습니다.

</div>


<!--
### Configuring custom cookie/header names
-->
### 커스텀 쿠키/헤더 이름 지정하기

<!--
If your backend service uses different names for the XSRF token cookie or header, use `HttpClientXsrfModule.withOptions()` to override the defaults.

<code-example path="http/src/app/app.module.ts" region="xsrf"></code-example>
-->
백엔드에서 XSRF 토큰 쿠키나 헤더를 다른 이름으로 사용하고 있다면 `HttpClientXsrfModule.withOptions()` 를 사용해서 이름을 변경할 수 있습니다.

<code-example path="http/src/app/app.module.ts" region="xsrf"></code-example>


<a id="testing-requests"></a>
<a id="testing-http-requests"></a>

<!--
## Testing HTTP requests
-->
## HTTP 요청 테스트하기

<!--
As for any external dependency, you must mock the HTTP backend so your tests can simulate interaction with a remote server.
The `@angular/common/http/testing` library makes it straightforward to set up such mocking.

Angular's HTTP testing library is designed for a pattern of testing in which the app executes code and makes requests first.
The test then expects that certain requests have or have not been made, performs assertions against those requests, and finally provides responses by "flushing" each expected request.

At the end, tests can verify that the app made no unexpected requests.

<div class="alert is-helpful">

You can run <live-example stackblitz="specs">these sample tests</live-example> in a live coding environment.

The tests described in this guide are in `src/testing/http-client.spec.ts`.
There are also tests of an application data service that call `HttpClient` in `src/app/heroes/heroes.service.spec.ts`.

</div>
-->
리모트 서버와 통신하는 로직을 테스트하려면 HTTP 백엔드를 목킹해야 합니다.
그리고 Angular는 이런 작업을 위해 `@angular/common/http/testing` 라이브러리를 제공합니다.

Angular가 제공하는 HTTP 테스트 라이브러리를 사용할 때는 먼저 리모트 서버로 요청을 보내야 합니다.
그러면 이 요청을 가져와서 어떤 내용이 담겨있는지 검사하고, 정해진 형식으로 응답을 보냅니다(flushing).

그리고 마지막으로 의도하지 않은 요청이 발생했는지 검사합니다.

<div class="alert is-helpful">

이 섹션에서 다루는 내용은 <live-example stackblitz="specs">샘플 테스트</live-example>를 직접 실행해서 결과를 확인할 수 있습니다.

이 테스트들은 `src/testing/http-client.spec.ts` 파일에 작성되어 있으며, `HttpClient`를 사용하는 서비스를 테스트하는 코드는 `src/app/heroes/heroes.service.spec.ts` 파일에 작성되어 있습니다.

</div>

<!--
### Setup for testing
-->
### 테스트 환경설정

<!--
To begin testing calls to `HttpClient`, import the `HttpClientTestingModule` and the mocking controller, `HttpTestingController`, along with the other symbols your tests require.

<code-example header="app/testing/http-client.spec.ts (imports)" path="http/src/testing/http-client.spec.ts" region="imports"></code-example>

Then add the `HttpClientTestingModule` to the `TestBed` and continue with the setup of the *service-under-test*.

<code-example header="app/testing/http-client.spec.ts(setup)" path="http/src/testing/http-client.spec.ts" region="setup"></code-example>

Now requests made in the course of your tests hit the testing backend instead of the normal backend.

This setup also calls `TestBed.inject()` to inject the `HttpClient` service and the mocking controller so they can be referenced during the tests.
-->
`HttpClient`를 테스트하려면 먼저 테스트용 모듈인 `HttpClientTestingModule`과 목업 환경을 구성하는 `HttpTestingController`를 로드해야 합니다.

<code-example header="app/testing/http-client.spec.ts (심볼 로드하기)" path="http/src/testing/http-client.spec.ts" region="imports"></code-example>

그리고 나면 `TestBed`에 `HttpClientTestingModule`를 추가하면서 테스트 환경을 구성합니다.

<code-example header="app/testing/http-client.spec.ts(환경 설정)" path="http/src/testing/http-client.spec.ts" region="setup"></code-example>

이제 테스트 케이스에서 HTTP 요청이 발생하면 실제 백엔드가 아니라 테스팅 백엔드로 전달됩니다.

이 코드에서는 `HttpClient` 서비스와 목업 컨트롤러를 테스트 케이스마다 동적으로 주입하기 위해 `TestBed.inject()`을 사용했습니다.


<!--
### Expecting and answering requests
-->
### 요청 확인하기, 요청에 응답하기

<!--
Now you can write a test that expects a GET Request to occur and provides a mock response.

<code-example header="app/testing/http-client.spec.ts (HttpClient.get)" path="http/src/testing/http-client.spec.ts" region="get-test"></code-example>

The last step, verifying that no requests remain outstanding, is common enough for you to move it into an `afterEach()` step:

<code-example path="http/src/testing/http-client.spec.ts" region="afterEach"></code-example>
-->
이제 GET 요청이 발생하는지 확인하고 목업 응답을 보내는 테스트 케이스를 작성해 봅시다.

<code-example header="app/testing/http-client.spec.ts (HttpClient.get())" path="http/src/testing/http-client.spec.ts" region="get-test"></code-example>

모든 응답이 처리되었는지 마지막으로 검사하는 로직은 `afterEach()`로 옮겨도 됩니다:

<code-example path="http/src/testing/http-client.spec.ts" region="afterEach"></code-example>


<!--
#### Custom request expectations
-->
#### HTTP 요청 객체 검사하기

<!--
If matching by URL isn't sufficient, it's possible to implement your own matching function.
For example, you could look for an outgoing request that has an authorization header:

<code-example path="http/src/testing/http-client.spec.ts" region="predicate"></code-example>

As with the previous `expectOne()`, the test fails if 0 or 2+ requests satisfy this predicate.
-->
지정된 URL로 HTTP 요청이 왔는지 검사하는 것만으로는 충분하지 않다면, 검사 로직을 직접 작성할 수도 있습니다.
예를 들어 HTTP 요청 헤더에 인증 토큰이 있는지 검사하는 로직은 다음과 같이 구현할 수 있습니다:

<code-example path="http/src/testing/http-client.spec.ts" region="predicate"></code-example>

그러면 이전에 살펴본 `expectOne()`과 마찬가지로, HTTP 요청이 발생하지 않거나 2번 이상 발생한 경우에도 마찬가지로 에러를 발생시킵니다.

<!--
#### Handling more than one request
-->
#### 여러번 요청되는 HTTP 테스트하기

<!--
If you need to respond to duplicate requests in your test, use the `match()` API instead of `expectOne()`.
It takes the same arguments but returns an array of matching requests.
Once returned, these requests are removed from future matching and you are responsible for flushing and verifying them.

<code-example path="http/src/testing/http-client.spec.ts" region="multi-request"></code-example>
-->
테스트 케이스가 실행되는 중에 HTTP 요청이 같은 주소로 여러번 발생한다면, `expectOne()` 대신 `match()` API를 사용할 수도 있습니다.
이 함수는 `expectOne()`를 사용하는 방법과 같지만, 주소와 매칭되는 HTTP 요청을 배열로 반환합니다.
그러면 이 배열을 한 번에 테스트할 수도 있고, 배열의 항목을 각각 테스트할 수도 있습니다.

<code-example path="http/src/testing/http-client.spec.ts" region="multi-request"></code-example>


<!--
### Testing for errors
-->
### 에러 테스트하기

<!--
You should test the app's defenses against HTTP requests that fail.

Call `request.flush()` with an error message, as seen in the following example.

<code-example path="http/src/testing/http-client.spec.ts" region="404"></code-example>

Alternatively, call `request.error()` with a `ProgressEvent`.

<code-example path="http/src/testing/http-client.spec.ts" region="network-error"></code-example>
-->
HTTP 요청이 실패한 경우에 애플리케이션의 방어 로직이 제대로 동작하는지도 테스트해야 합니다.

이 때 `request.flush()`에 에러 객체를 보내면 HTTP 통신에 실패한 상황을 테스트할 수 있습니다.

<code-example path="http/src/testing/http-client.spec.ts" region="404"></code-example>

그리고 이 방식은 `ProgressEvent` 객체를 `request.error()` 함수에 전달하는 방식으로도 구현할 수 있습니다.

<code-example path="http/src/testing/http-client.spec.ts" region="network-error"></code-example>


<!--
## Passing metadata to interceptors
-->
## 인터셉터에 메타데이터 전달하기

<!--
Many interceptors require or benefit from configuration.
Consider an interceptor that retries failed requests.
By default, the interceptor might retry a request three times, but you might want to override this retry count for particularly error-prone or sensitive requests.

`HttpClient` requests contain a *context* that can carry metadata about the request.
This context is available for interceptors to read or modify, though it is not transmitted to the backend server when the request is sent.
This lets applications or other interceptors tag requests with configuration parameters, such as how many times to retry a request.
-->
인터셉터는 일반적으로 설정을 약간 해줘야 활용하기 좋습니다.
요청을 실패했을 때 재시도하는 인터셉터가 있다고 합시다.
이런 인터셉터는 기본적으로 세 번 정도는 재시도하는 것이 좋지만, 에러가 발생하기 쉬운 요청이라면 재시도 횟수를 따로 지정하는 것이 좋을 수 있습니다.

이런 메타데이터는 요청을 보낼 때 *컨텍스트*로 함께 전달할 수 있습니다.
그러면 인터셉터가 요청을 처리하면서 컨텍스트를 읽어서 활용할 수 있지만, 백엔드에는 보내지 않는 방식으로도 활용할 수 있습니다.
결국 요청을 보내는 쪽에서 재시도 횟수를 결정할 수 있습니다.

<!--
### Creating a context token
-->
### 컨텍스트 토큰 생성하기

<!--
Angular stores and retrieves a value in the context using an `HttpContextToken`.
You can create a context token using the `new` operator, as in the following example:

<code-example header="creating a context token" path="http/src/app/http-interceptors/retry-interceptor.ts" region="context-token"></code-example>

The lambda function `() => 3` passed during the creation of the `HttpContextToken` serves two purposes:

1.  It lets TypeScript infer the type of this token:
    `HttpContextToken<number>`
    The request context is type-safe &mdash;reading a token from a request's context returns a value of the appropriate type.

1.  It sets the default value for the token.
    This is the value that the request context returns if no other value was set for this token.
    Using a default value avoids the need to check if a particular value is set.
-->
Angular는 이런 메타데이터를 `HttpContextToken` 이라는 컨텍스트에 저장하고 전달할 수 있습니다.
컨텍스트 토큰은 `new` 연산자를 사용해서 이렇게 정의합니다:

<code-example header="컨텍스트 토큰 생성하기" path="http/src/app/http-interceptors/retry-interceptor.ts" region="context-token"></code-example>

이 코드에서 람다 함수 `() => 3`는 `HttpContextToken`을 생성할 때 이런 용도로 사용됩니다:

1.  TypeScript는 `HttpContextToken<number>`라는 타입으로 추론합니다.
    그래서 이 컨텍스트는 타입 관점에서 안전하며, 컨텍스트에서 값을 읽을 때도 올바른 타입으로 사용할 수 있습니다.

1.  토큰의 기본값을 지정할 수 있습니다.
    요청 컨텍스트에 따로 재시도 횟수가 지정되지 않았다면 토큰의 기본값을 사용합니다.

<!--
### Setting context values when making a request
-->
### 요청 보낼 때 컨텍스트 지정하기

<!--
When making a request, you can provide an `HttpContext` instance, in which you have already set the context values.

<code-example header="setting context values" path="http/src/app/http-interceptors/retry-interceptor.ts" region="set-context"></code-example>
-->
이제 요청을 보낼 때 `HttpContext` 인스턴스를 지정하면 됩니다.

<code-example header="컨텍스트 지정하기" path="http/src/app/http-interceptors/retry-interceptor.ts" region="set-context"></code-example>


<!--
### Reading context values in an interceptor
-->
### 인터셉터에서 컨텍스트 읽기

<!--
Within an interceptor, you can read the value of a token in a given request's context with `HttpContext.get()`.
If you have not explicitly set a value for the token, Angular returns the default value specified in the token.

<code-example header="reading context values in an interceptor" path="http/src/app/http-interceptors/retry-interceptor.ts" region="reading-context"></code-example>
-->
인터셉터 안에서 요청의 컨텍스트 토큰값을 확인하려면 `HttpContext.get()` 메서드를 사용하면 됩니다.
토큰에 지정된 값이 없다면 기본값을 활용합니다.

<code-example header="인터셉터 안에서 컨텍스트 읽기" path="http/src/app/http-interceptors/retry-interceptor.ts" region="reading-context"></code-example>


<!--
### Contexts are mutable
-->
### 컨텍스트는 변경될 수 있습니다.

<!--
Unlike most other aspects of `HttpRequest` instances, the request context is mutable and persists across other immutable transformations of the request.
This lets interceptors coordinate operations through the context.
For instance, the `RetryInterceptor` example could use a second context token to track how many errors occur during the execution of a given request:

<code-example header="coordinating operations through the context" path="http/src/app/http-interceptors/retry-interceptor.ts" region="mutable-context"></code-example>
-->
`HttpRequest` 인스턴스의 다른 프로퍼티와 다르게, 요청 컨텍스트는 값이 변경될 수 있습니다\(mutable\).
그래서 이 방법을 활용하면 인터셉터마다 적절한 동작을 구현하는 용도로도 활용할 수 있습니다.
`RetryInterceptor` 예제에서는 두 번째 컨텍스트 토큰을 활용해서, 요청을 보내고 받을 때까지 에러가 몇 번 발생했는지도 확인할 수 있습니다:

<code-example header="컨텍스트에서 조정하기" path="http/src/app/http-interceptors/retry-interceptor.ts" region="mutable-context"></code-example>

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
