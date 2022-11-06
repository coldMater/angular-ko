<!--
# Navigate the component tree with DI
-->
# 컴포넌트 트리 참조하기

<!--
<div class="callout is-critical">

<header>Marked for archiving</header>

To ensure that you have the best experience possible, this topic is marked for archiving until we determine that it clearly conveys the most accurate information possible.

In the meantime, this topic might be helpful: [Hierarchical injectors](guide/hierarchical-dependency-injection).

If you think this content should not be archived, please file a [GitHub issue](https://github.com/angular/angular/issues/new?template=3-docs-bug.md).

</div>

Application components often need to share information.
You can often use loosely coupled techniques for sharing information, such as data binding and service sharing, but sometimes it makes sense for one component to have a direct reference to another component.
You need a direct reference, for instance, to access values or call methods on that component.

Obtaining a component reference is a bit tricky in Angular.
Angular components themselves do not have a tree that you can inspect or navigate programmatically.
The parent-child relationship is indirect, established through the components' [view objects](guide/glossary#view).

Each component has a *host view*, and can have additional *embedded views*.
An embedded view in component A is the host view of component B, which can in turn have embedded view.
This means that there is a [view hierarchy](guide/glossary#view-hierarchy) for each component, of which that component's host view is the root.

There is an API for navigating *down* the view hierarchy.
Check out `Query`, `QueryList`, `ViewChildren`, and `ContentChildren` in the [API Reference](api).

There is no public API for acquiring a parent reference.
However, because every component instance is added to an injector's container, you can use Angular dependency injection to reach a parent component.

This section describes some techniques for doing that.
-->
<div class="callout is-critical">

<header>아카이브 예정</header>

이 주제는 개선된 가이드 문서가 준비되기 전까지만 제공됩니다.

어쩌면 [인젝터 계층](guide/hierarchical-dependency-injection) 문서가 도움이 될 수도 있습니다.

이 문서를 더 보관하는 것이 좋겠다고 생각되면 [GitHub 이슈](https://github.com/angular/angular/issues/new?template=3-docs-bug.md)를 남겨주세요.

</div>

애플리케이션에 있는 컴포넌트들은 서로 데이터를 공유하기도 합니다.
이 때 컴포넌트에 데이터를 바인딩하거나 서비스를 공유하면 컴포넌트간 결합도를 높이지 않으면서도 데이터를 공유할 수 있지만, 때로는 필요한 컴포넌트를 직접 값을 참조하거나 이 컴포넌트에 있는 함수를 실행하는 것이 편할 때도 있습니다.

Angular에서도 약간의 트릭을 활용하면 컴포넌트를 직접 참조할 수 있습니다.
다만, Angular 컴포넌트에는 트리 정보가 없습니다. 부모-자식 연결 관계는 간접적이며, 컴포넌트의 [뷰 객체](guide/glossary#view)를 통해서만 연결됩니다.

컴포넌트에는 *호스트 뷰(host view)*가 존재하며, 추가로 *내장 뷰(embedded view)*가 존재할 수도 있습니다.
컴포넌트 A의 내장 뷰는 컴포넌트 B의 호스트 뷰가 될 수 있으며, 컴포넌트 B의 내장 뷰는 또 다른 호스트 뷰가 될 수 있습니다.
다르게 표현하면, 컴포넌트에는 [뷰 계층(view hierarchy)](guide/glossary#view-hierarchy)이 존재하며 컴포넌트 호스트 뷰는 또 다른 컴포넌트의 부모가 될 수 있습니다.

뷰 계층을 *따라 내려가면서* 자식 컴포넌트를 참조할 수 있는 API는 몇 개가 있습니다.
[API 문서](api/)에서 `Query`, `QueryList`, `ViewChildren`, `ContentChildren`을 찾아 보세요.

부모 컴포넌트를 참조할 수 있는 API는 따로 없습니다.
하지만 모든 컴포넌트 인스턴스는 인젝터 컨테이너에 등록되기 때문에, Angular 의존성 주입 메커니즘을 활용하면 부모 컴포넌트를 찾을 수 있습니다.

이 문서는 이 테크닉에 대해 소개합니다.


<a id="find-parent"></a>
<a id="known-parent"></a>

<!--
### Find a parent component of known type
-->
### 타입으로 부모 컴포넌트 찾기

<!--
You use standard class injection to acquire a parent component whose type you know.

In the following example, the parent `AlexComponent` has several children including a `CathyComponent`:
-->
부모 컴포넌트의 타입을 알고 있다면 클래스를 주입하는 일반적인 방법으로 부모 컴포넌트를 참조할 수 있습니다.

아래 예제 코드에서 부모 컴포넌트인 `AlexComponent`에는 `CathyComponent`와 같은 자식 컴포넌트가 몇 개 존재합니다:


<a id="alex"></a>

<!--
<code-example header="parent-finder.component.ts (AlexComponent v.1)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-1"></code-example>

*Cathy* reports whether or not she has access to *Alex* after injecting an `AlexComponent` into her constructor:

<code-example header="parent-finder.component.ts (CathyComponent)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="cathy"></code-example>

Notice that even though the [@Optional](guide/dependency-injection-in-action#optional) qualifier is there for safety, the <live-example name="dependency-injection-in-action"></live-example> confirms that the `alex` parameter is set.
-->
<code-example header="parent-finder.component.ts (AlexComponent v.1)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-1"></code-example>

그러면 생성자를 통해 `AlexComponent`를 주입할 수 있으며, *Cathy*가 *Alex*를 찾았는지 여부는 템플릿에 다음과 같이 표시할 수 있습니다:

<code-example header="parent-finder.component.ts (CathyComponent)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="cathy"></code-example>

이 코드에는 [@Optional](guide/dependency-injection-in-action#optional) 데코레이터가 사용되었지만, 이와 관계없이 <live-example name="dependency-injection-in-action"></live-example>를 확인해보면 `alex` 인자에 부모 컴포넌트가 제대로 할당되는 것을 확인할 수 있습니다.


<a id="base-parent"></a>

<!--
### Unable to find a parent by its base class
-->
### 부모 클래스가 상속받은 클래스로는 참조할 수 없습니다.

<!--
What if you *don't* know the concrete parent component class?

A re-usable component might be a child of multiple components.
Imagine a component for rendering breaking news about a financial instrument.
For business reasons, this news component makes frequent calls directly into its parent instrument as changing market data streams by.

The app probably defines more than a dozen financial instrument components.
If you're lucky, they all implement the same base class whose API your `NewsComponent` understands.

<div class="alert is-helpful">

Looking for components that implement an interface would be better.
That's not possible because TypeScript interfaces disappear from the transpiled JavaScript, which doesn't support interfaces.
There's no artifact to look for.

</div>

This isn't necessarily good design.
This example is examining *whether a component can inject its parent via the parent's base class*.

The sample's `CraigComponent` explores this question.
[Looking back](#alex), you see that the `Alex` component *extends* \(*inherits*\) from a class named `Base`.

<code-example header="parent-finder.component.ts (Alex class signature)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-class-signature"></code-example>

The `CraigComponent` tries to inject `Base` into its `alex` constructor parameter and reports if it succeeded.

<code-example header="parent-finder.component.ts (CraigComponent)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="craig"></code-example>

Unfortunately, this doesn't work.
The <live-example name="dependency-injection-in-action"></live-example> confirms that the `alex` parameter is null.
*You cannot inject a parent by its base class.*
-->
부모 컴포넌트의 정확한 클래스를 *몰라도* 가능할까요?

재사용하기 위해 만든 컴포넌트라면 여러 컴포넌트의 자식 컴포넌트로 존재할 수도 있습니다.
금융 앱에서 뉴스를 제공하는 컴포넌트가 있다고 합시다.
이 뉴스 컴포넌트는 부모 컴포넌트를 직접 참조하고 메소드를 실행해서 데이터를 받아오는 구조로 구현되었습니다.

이 앱에는 금융 업무와 관련된 컴포넌트가 아주 많이 정의되어 있을 수도 있습니다.
그리고 이 컴포넌트들이 모두 `NewsComponent`가 알고 있는 API를 가진 어떤 기본 클래스를 상속받아 구현된다고 합시다.

<div class="alert is-helpful">

인터페이스를 사용해도 컴포넌트를 찾을 수 있지 않을까 생각해 볼 수 있습니다.
하지만 인터페이스는 TypeScript에만 존재하며 애플리케이션 코드가 JavaScript로 변환되고 나면 인터페이스의 개념은 사라집니다.
찾아야 할 타입이 없어지는 셈입니다.

</div>

하지만 이런 구조는 좋은 디자인이 아닙니다.
*부모 클래스가 상속받는 클래스를* 생성자에 주입하는 예제를 살펴봅시다.

이번 섹션은 `CraigComponent`를 사용해서 확인합니다.
[이전에 본 것과 마찬가지로](#alex) `AlexComponent`는 `Base` 클래스를 상속받아 구현한 클래스입니다.

<code-example header="parent-finder.component.ts (Alex class signature)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-class-signature"></code-example>

그리고 `CraigComponent`는 `Base` 타입으로 `alex`에 부모 컴포넌트를 주입하려고 하며, 부모 컴포넌트를 찾았는지 여부는 템플릿에 표시합니다.

<code-example header="parent-finder.component.ts (CraigComponent)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="craig"></code-example>

하지만 이 코드는 동작하지 않습니다.
<live-example name="dependency-injection-in-action"></live-example>에서도 확인할 수 있듯이 `alex`에 할당되는 값은 `null`입니다.
*부모 객체가 상속하는 클래스 타입* 으로는 부모 컴포넌트를 주입할 수 없습니다.


<a id="class-interface-parent"></a>

<!--
### Find a parent by its class interface
-->
### 클래스 인터페이스로 부모 컴포넌트 찾기

<!--
You can find a parent component with a [class interface](guide/dependency-injection-in-action#class-interface).

The parent must cooperate by providing an *alias* to itself in the name of a class interface token.

Recall that Angular always adds a component instance to its own injector; that's why you could inject *Alex* into *Cathy* [earlier](#known-parent).

Write an [*alias provider*](guide/dependency-injection-in-action#useexisting) &mdash;a `provide` object literal with a `useExisting` definition&mdash; that creates an *alternative* way to inject the same component instance and add that provider to the `providers` array of the `@Component()` metadata for the `AlexComponent`.
-->
[클래스 인터페이스](guide/dependency-injection-in-action#class-interface)를 사용해도 부모 컴포넌트를 찾을 수 있습니다.

이 때 부모 컴포넌트는 반드시 이 클래스 인터페이스 토큰을 사용해서 *별칭 프로바이더*로 등록되어 있어야 합니다.

Angular는 컴포넌트 인스턴스를 이 컴포넌트의 인젝터에 관리한다는 것을 떠올려 보세요.
그래서 [이전](#known-parent)에 살펴봤던 것처럼 *Alex*를 *Cathy*에 의존성으로 주입할 수 있었던 것입니다.

컴포넌트 인스턴스가 공유되는 것을 피하기 위해 `AlexComponent`의 `@Component()` 메타데이터 `providers` 배열에 `useExisting`을 사용해서 [*별칭 프로바이더*](guide/dependency-injection-in-action#useexisting)를 다음과 같이 등록합니다.


<a id="alex-providers"></a>

<!--
<code-example header="parent-finder.component.ts (AlexComponent providers)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-providers"></code-example>

[Parent](#parent-token) is the provider's class interface token.
The [*forwardRef*](guide/dependency-injection-in-action#forwardref) breaks the circular reference you just created by having the `AlexComponent` refer to itself.

*Carol*, the third of *Alex*'s child components, injects the parent into its `parent` parameter, the same way you've done it before.

<code-example header="parent-finder.component.ts (CarolComponent class)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="carol-class"></code-example>

Here's *Alex* and family in action.

<div class="lightbox">

<img alt="Alex in action" src="generated/images/guide/dependency-injection-in-action/alex.png">

</div>
-->
<code-example header="parent-finder.component.ts (AlexComponent providers)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-providers"></code-example>

이 코드에서 [Parent](#parent-token) 토큰은 프로바이더의 클래스 인터페이스 토큰입니다.
그리고 `AlexComponent`가 자신을 직접 참조해서 순환 참조가 발생하는 것을 피하기 위해 [*forwardRef*](guide/dependency-injection-in-action#forwardref)를 사용했습니다.

그러면 *Alex*의 자식 컴포넌트인 *Carol*은 이전에 살펴봤던 것과 마찬가지 방법으로 `parent` 인자에 부모 컴포넌트를 주입받을 수 있습니다.

<code-example header="parent-finder.component.ts (CarolComponent 클래스)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="carol-class"></code-example>

이제 *Alex* 컴포넌트를 실행하면 다음 그림처럼 동작하는 것을 확인할 수 있습니다.

<div class="lightbox">

<img alt="Alex in action" src="generated/images/guide/dependency-injection-in-action/alex.png">

</div>


<a id="parent-tree"></a>

<!--
### Find a parent in a tree with `@SkipSelf()`
-->
### `@SkipSelf()` 로 부모 컴포넌트 찾기

<!--
Imagine one branch of a component hierarchy: *Alice* -&gt; *Barry* -&gt; *Carol*.
Both *Alice* and *Barry* implement the `Parent` class interface.

*Barry* is the problem.
He needs to reach his parent, *Alice*, and also be a parent to *Carol*.
That means he must both *inject* the `Parent` class interface to get *Alice* and *provide* a `Parent` to satisfy *Carol*.

Here's *Barry*.

<code-example header="parent-finder.component.ts (BarryComponent)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="barry"></code-example>

*Barry*'s `providers` array looks just like [*Alex*'s](#alex-providers).
If you're going to keep writing [*alias providers*](guide/dependency-injection-in-action#useexisting) like this you should create a helper function.

For now, focus on *Barry*'s constructor.

<code-tabs>
    <code-pane header="Barry's constructor" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="barry-ctor"></code-pane>
    <code-pane header="Carol's constructor" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="carol-ctor"></code-pane>
</code-tabs>

It's identical to *Carol*'s constructor except for the additional `@SkipSelf` decorator.

`@SkipSelf` is essential for two reasons:

1.  It tells the injector to start its search for a `Parent` dependency in a component *above* itself, which *is* what parent means.
1.  Angular throws a cyclic dependency error if you omit the `@SkipSelf` decorator.

    <code-example format="output" hideCopy language="shell">

    NG0200: Circular dependency in DI detected for BethComponent. Dependency path: BethComponent -&gt; Parent -&gt; BethComponent

    </code-example>

Here's *Alice*, *Barry*, and family in action.

<div class="lightbox">

<img alt="Alice in action" src="generated/images/guide/dependency-injection-in-action/alice.png">

</div>
-->
컴포넌트 계층이 *Alice* -&gt; *Barry* -&gt; *Carol*와 같이 구성되어 있다고 합시다.
이 때 *Alice*와 *Barry*는 둘 다 `Parent` 클래스 인터페이스로 구현되었습니다.

이 때 *Barry*가 문제입니다.
*Barry*는 부모 컴포넌트인 *Alice*를 찾으려고 하지만, *Barry* 역시 *Carol*의 부모 컴포넌트입니다.
그래서 *Barry*가 부모 컴포넌트인 *Alice*를 찾고, *Carol*도 부모 컴포넌트인 *Barry*를 찾을 수 있으려면 프로바이더를 조정해야 합니다.

*Barry*는 이렇게 구현되어 있습니다.

<code-example header="parent-finder.component.ts (BarryComponent)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="barry"></code-example>

*Barry*의 `providers` 설정은 [*Alex*에 설정한 것](#alex-providers)과 같습니다.
하지만 [*별칭 프로바이더*](guide/dependency-injection-in-action#useexisting)를 사용한다면 *Alex*와 *Barry*를 구별하기 위해 헬퍼 함수를 사용할 수 밖에 없습니다.

*Barry*의 생성자를 자세히 봅시다.

<code-tabs>
    <code-pane header="Barry's constructor" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="barry-ctor"></code-pane>
    <code-pane header="Carol's constructor" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="carol-ctor"></code-pane>
</code-tabs>

`@SkipSelf` 데코레이터가 사용된 것만 빼면 *Barry*의 생성자와 *Carol*의 생성자는 동일합니다.

이 코드에서 `@SkipSelf`는 두가지 역할을 합니다:

1.  의존성 객체로 요청받은 `Parent`를 이 컴포넌트 *위부터* 찾도록 지정합니다. 이 경우는 *Barry*에 지정했기 때문에 *Alex*에서부터 찾습니다.
1.  순환 참조를 방지할 수 있습니다. `@SkipSelf` 데코레이터가 없으면 다음과 같은 에러가 발생합니다.

    <code-example format="output" hideCopy language="shell">

    NG0200: Circular dependency in DI detected for BethComponent. Dependency path: BethComponent -&gt; Parent -&gt; BethComponent

    </code-example>

이제 *Alice*, *Barry*, *Barry*의 가족 컴포넌트들은 다음과 같이 동작합니다.

<div class="lightbox">

<img alt="Alice in action" src="generated/images/guide/dependency-injection-in-action/alice.png">

</div>


<a id="parent-token"></a>

<!--
###  Parent class interface
-->
### 부모 클래스 인터페이스

<!--
You [learned earlier](guide/dependency-injection-in-action#class-interface) that a class interface is an abstract class used as an interface rather than as a base class.

The example defines a `Parent` class interface.

<code-example header="parent-finder.component.ts (Parent class-interface)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="parent"></code-example>

The `Parent` class interface defines a `name` property with a type declaration but *no implementation*.
The `name` property is the only member of a parent component that a child component can call.
Such a narrow interface helps decouple the child component class from its parent components.

A component that could serve as a parent *should* implement the class interface as the `AliceComponent` does.

<code-example header="parent-finder.component.ts (AliceComponent class signature)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alice-class-signature"></code-example>

Doing so adds clarity to the code.
But it's not technically necessary.
Although `AlexComponent` has a `name` property, as required by its `Base` class,
its class signature doesn't mention `Parent`.

<code-example header="parent-finder.component.ts (AlexComponent class signature)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-class-signature"></code-example>

<div class="alert is-helpful">

`AlexComponent` *should* implement `Parent` as a matter of proper style.
It doesn't in this example *only* to demonstrate that the code will compile and run without the interface.

</div>
-->
[이전 문서에서](guide/dependency-injection-in-action#class-interface) 클래스 인터페이스는 추상 클래스이며, 상속받기 위해 사용하는 것이 아니라 의존성을 주입할 때 사용하는 것이라고 언급했었습니다.

그리고 `Parent` 클래스 인터페이스는 다음과 같이 구현되어 있습니다.

<code-example header="parent-finder.component.ts (Parent class-interface)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="parent"></code-example>

`Parent` 클래스 인터페이스에는 타입이 지정된 `name` 프로퍼티가 존재하지만 *이 클래스에 구현된 내용은 아무것도 없습니다*.
`name` 프로퍼티는 자식 컴포넌트가 참조할 수 있는 부모 컴포넌트의 멤버일 뿐입니다.
이렇게 클래스 인터페이스로 API를 제한하면 부모 컴포넌트와 자식 컴포넌트의 결합도를 낮출 수 있습니다.

그러면 부모 컴포넌트는 반드시 이 클래스 인터페이스를 사용해서 구현해야 합니다. `AliceComponent`가 이렇게 구현되었습니다.

<code-example header="parent-finder.component.ts (AliceComponent 클래스 구현부)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alice-class-signature"></code-example>

이렇게 구현하면 코드도 간단해지지만 문법적으로 꼭 이래야만 하는 것은 아닙니다.
`Base` 클래스에 선언한 대로 `AlexComponent`에도 `name` 프로퍼티가 존재하지만, 이 클래스 선언은 `Parent`을 활용한 것이 아닙니다.

<code-example header="parent-finder.component.ts (AlexComponent class signature)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-class-signature"></code-example>

<div class="alert is-helpful">

`AlexComponent`는 `Parent` 클래스를 활용하는 방식으로 구현하는 것이 더 좋습니다.
이 코드에서는 설명을 하기 위해 이렇게 구현했지만, 인터페이스는 컴파일 된 이후 코드에 존재하지 않습니다.

</div>

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
