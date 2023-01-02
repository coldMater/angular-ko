<!--
# Accessibility in Angular
-->
# 접근성(Accessibility)

<!--
The web is used by a wide variety of people, including those who have visual or motor impairments.
A variety of assistive technologies are available that make it much easier for these groups to interact with web-based software applications.
Also, designing an application to be more accessible generally improves the user experience for all users.

For an in-depth introduction to issues and techniques for designing accessible applications, see the [Accessibility](https://developers.google.com/web/fundamentals/accessibility/#what_is_accessibility) section of the Google's [Web Fundamentals](https://developers.google.com/web/fundamentals).

This page discusses best practices for designing Angular applications that work well for all users, including those who rely on assistive technologies.

<div class="alert is-helpful">

For the sample application that this page describes, see the <live-example></live-example>.

</div>
-->
웹은 다양한 사람들이 사용하며 이중에는 시각이나 신체가 불편한 사람이 있을 수 있습니다.
웹 생태계가 발전하면서 이들을 도울 수 있는 기술도 발전하고 있어서 웹에서 겪을 수 있는 불편함은 나날이 개선되고 있습니다.
그리고 애플리케이션 디자인도 발전하면서 일부 사람이 아니라 모든 사람들의 UX도 나아지고 있습니다.

이 문서에서는 애플리케이션의 접근성 이슈에 대해 살펴보고 개선할 수 있는 테크닉도 함께 알아봅시다. Google이 제공하는 [Web Fundamentals](https://developers.google.com/web/fundamentals/) 문서에서 [Accessibility](https://developers.google.com/web/fundamentals/accessibility/#what_is_accessibility)을 참고하는 것도 좋습니다.

<div class="alert is-helpful">

이 문서에서 설명하는 예제 앱은 <live-example></live-example>에서 직접 실행하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Accessibility attributes
-->
## 접근성 어트리뷰트

<!--
Building accessible web experience often involves setting [Accessible Rich Internet Applications \(ARIA\) attributes](https://developers.google.com/web/fundamentals/accessibility/semantics-aria) to provide semantic meaning where it might otherwise be missing.
Use [attribute binding](guide/attribute-binding) template syntax to control the values of accessibility-related attributes.

When binding to ARIA attributes in Angular, you must use the `attr.` prefix. The ARIA specification depends specifically on HTML attributes rather than properties of DOM elements.

<code-example format="html" language="html">

&lt;!-- Use attr. when binding to an ARIA attribute --&gt;
&lt;button [attr.aria-label]="myActionLabel"&gt;&hellip;&lt;/button&gt;

</code-example>

<div class="alert is-helpful">

**NOTE** <br />
This syntax is only necessary for attribute *bindings*.
Static ARIA attributes require no extra syntax.

<code-example format="html" language="html">

&lt;!-- Static ARIA attributes require no extra syntax --&gt;
&lt;button aria-label="Save document"&gt;&hellip;&lt;/button&gt;

</code-example>

</div>

NOTE:
-->
웹 접근성을 높이려면 보통 [Accessible Rich Internet Applications \(ARIA\) 어트리뷰트](https://developers.google.com/web/fundamentals/accessibility/semantics-aria)를 지정해서 엘리먼트가 사용된 맥락의 의미를 추가하는 작업을 합니다.
그리고 이 어트리뷰트들은 이전에 살펴봤던 [어트리뷰트 바인딩](guide/attribute-binding) 템플릿 문법을 그대로 활용합니다.

ARIA 어트리뷰트를 바인딩하려면 `attr.` 접두사를 꼭 붙여야 합니다.
ARIA 스펙은 DOM 엘리먼트에 있는 프로퍼티가 아니라 HTML 어트리뷰트 스펙으로 정의되어 있습니다.

```html
&lt;!-- ARIA 어트리뷰트를 바인딩하려면 attr. 을 붙여야 합니다. --&gt;
<button [attr.aria-label]="myActionLabel">...</button>
```

어트리뷰트 바인딩은 바인딩이 꼭 필요한 ARIA 어트리뷰트에만 사용합니다.
정적으로 지정되는 ARIA 어트리뷰트라면 바인딩 없이 문자열을 그대로 사용하면 됩니다.


```html
&lt;!-- 정적 ARIA 어트리뷰트는 바인딩하지 않아도 됩니다. --&gt;
<button aria-label="Save document">...</button>
```

참고:

<div class="alert is-helpful">

<!--
By convention, HTML attributes use lowercase names \(`tabindex`\), while properties use camelCase names \(`tabIndex`\).

See the [Binding syntax](guide/binding-syntax#html-attribute-vs-dom-property) guide for more background on the difference between attributes and properties.
-->
일반적으로 HTML 어트리뷰트 이름은 소문자로 사용하며\(`tabindex`\), 프로퍼티 이름은 캐멀-케이스로 사용합니다\(`tabIndex`\).

어트리뷰트와 프로퍼티가 어떻게 다른지 알아보려면 [바인딩 문법](guide/binding-syntax#html-attribute-vs-dom-property) 가이드 문서를 참고하세요.

</div>


<!--
## Angular UI components
-->
## Angular UI 컴포넌트

<!--
The [Angular Material](https://material.angular.io) library, which is maintained by the Angular team, is a suite of reusable UI components that aims to be fully accessible.
The [Component Development Kit (CDK)](https://material.angular.io/cdk/categories) includes the `a11y` package that provides tools to support various areas of accessibility.
For example:

*   `LiveAnnouncer` is used to announce messages for screen-reader users using an `aria-live` region.
    See the W3C documentation for more information on [aria-live regions](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties#aria-live).

*   The `cdkTrapFocus` directive traps Tab-key focus within an element.
    Use it to create accessible experience for components such as modal dialogs, where focus must be constrained.

For full details of these and other tools, see the [Angular CDK accessibility overview](https://material.angular.io/cdk/a11y/overview).
-->
Angular 팀이 유지보수하는 [Angular Material](https://material.angular.io) 라이브러리는 재사용할 수 있는 UI 컴포넌트이기도 하지만 접근성도 완벽하게 지원되는 컴포넌트를 제공합니다.
그리고 [Component Development Kit (CDK)](https://material.angular.io/cdk/categories)에 포함된 `a11y` 패키지를 활용하면 직접 접근성 관련 기능을 구현할 수도 있습니다.
예를 들면:

* `LiveAnnouncer`가 제공하는 `aria-live` 기능을 활용하면 스크린 리더 사용자를 위해 안내 메시지를 음성으로 제공할 수 있습니다. W3C가 제안한느 [aria-live regions](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties#aria-live) 문서를 참고하세요.

* `cdkTrapFocus` 디렉티브를 사용하면 탭키를 사용할 때 특정 영역에 있는 엘리먼트에만 포커스를 줄 수 있습니다. 모달 팝업이나 포커스가 반드시 위치해야 하는 컴포넌트가 있을 때 활용하면 됩니다.

이밖에 Angular CDK가 제공하는 접근성 관련 기능은 [Angular CDK accessibility overview](https://material.angular.io/cdk/a11y/overview) 문서를 참고하세요.


<!--
### Augmenting native elements
-->
### 기본 엘리먼트 확장하기

<!--
Native HTML elements capture several standard interaction patterns that are important to accessibility.
When authoring Angular components, you should re-use these native elements directly when possible, rather than re-implementing well-supported behaviors.

For example, instead of creating a custom element for a new variety of button, create a component that uses an attribute selector with a native `<button>` element.
This most commonly applies to `<button>` and `<a>`, but can be used with many other types of element.

You can see examples of this pattern in Angular Material:
[`MatButton`](https://github.com/angular/components/blob/50d3f29b6dc717b512dbd0234ce76f4ab7e9762a/src/material/button/button.ts#L67-L69), [`MatTabNav`](https://github.com/angular/components/blob/50d3f29b6dc717b512dbd0234ce76f4ab7e9762a/src/material/tabs/tab-nav-bar/tab-nav-bar.ts#L139), and [`MatTable`](https://github.com/angular/components/blob/50d3f29b6dc717b512dbd0234ce76f4ab7e9762a/src/material/table/table.ts#L22).
-->
기본 HTML 엘리먼트는 접근성과 관련된 기능을 이미 많이 제공하고 있습니다.
그래서 Angular 컴포넌트를 만들 때도 완전히 처음부터 시작하는 것보다는 기본 HTML 엘리먼트가 제공하는 기능을 활용하는 것이 편합니다.

그래서 버튼을 변형해서 커스텀 엘리먼트를 만든다고 하면 `<button>` 엘리먼트에 어트리뷰트 셀렉터를 사용해도 됩니다.
이런 방식은 `<button>`과 `<a>` 엘리먼트 외에도 다양하게 활용할 수 있습니다.

이 패턴은 Angular Material에서도 https://github.com/angular/components/blob/50d3f29b6dc717b512dbd0234ce76f4ab7e9762a/src/material/button/button.ts#L67-L69), [`MatTabNav`](https://github.com/angular/components/blob/50d3f29b6dc717b512dbd0234ce76f4ab7e9762a/src/material/tabs/tab-nav-bar/tab-nav-bar.ts#L139), [`MatTable`](https://github.com/angular/components/blob/50d3f29b6dc717b512dbd0234ce76f4ab7e9762a/src/material/table/table.ts#L22)에 사용되고 있습니다.


<!--
### Using containers for native elements
-->
### 컨테이너가 필요할 때

<!--
Sometimes using the appropriate native element requires a container element.
For example, the native `<input>` element cannot have children, so any custom text entry components need to wrap an `<input>` with extra elements.
By just including `<input>` in your custom component's template, it's impossible for your component's users  to set arbitrary properties and attributes to the `<input>` element.
Instead, create a container component that uses content projection to include the native control in the component's API.

You can see [`MatFormField`](https://material.angular.io/components/form-field/overview) as an example of this pattern.
-->
기본 엘리먼트에 컨테이너 엘리먼트가 필요한 경우가 있습니다.
`<input>` 엘리먼트와 관련된 텍스트를 표시하고 싶은데 `<input>` 엘리먼트는 자식 엘리먼트를 가질 수 없으니 `<input>`을 다른 엘리먼트로 감싸야 하는 경우가 그렇습니다.
이 때 커스텀 컴포넌트 템플릿에 `<input>`을 그대로 추가해도 되지만 이렇게 구현하면 외부에서 `<input>` 엘리먼트에 프로퍼티나 어트리뷰트를 직접 설정하기 어렵습니다.
그래서 이 경우에는 컨테이너 컴포넌트를 선언하고 외부에서 내용물 자체를 받아와서 프로젝션\(projection\)하는 방식이 더 좋습니다.

이 패턴은 Angular Material에서 [`MatFormField`](https://material.angular.io/components/form-field/overview)에 사용되고 있습니다.


<!--
## Case study: Building a custom progress bar
-->
## 케이스 스터디: 커스텀 진행률 표시 UI 만들기

<!--
The following example shows how to make a progress bar accessible by using host binding to control accessibility-related attributes.

*   The component defines an accessibility-enabled element with both the standard HTML attribute `role`, and ARIA attributes.
    The ARIA attribute `aria-valuenow` is bound to the user's input.

    <code-example header="src/app/progress-bar.component.ts" path="accessibility/src/app/progress-bar.component.ts" region="progressbar-component"></code-example>

*   In the template, the `aria-label` attribute ensures that the control is accessible to screen readers.

    <code-example header="src/app/app.component.html" path="accessibility/src/app/app.component.html" region="template"></code-example>
-->
진행률을 표시하는 UI를 간단하게 만들어보면서 접근성 관련 어트리뷰트를 제어하는 호스트 바인딩에 대해 알아봅시다.

* 이 컴포넌트는 접근성 기능을 사용할 수 있는 엘리먼트로 만들기 위해 표준 HTML 어트리뷰트인 `role`과 ARIA 어트리뷰트를 모두 구현합니다. ARIA 어트리뷰트 `aria-valuenow`는 사용자의 입력을 바인딩하기 위한 것입니다.

  <code-example header="src/app/progress-bar.component.ts" path="accessibility/src/app/progress-bar.component.ts" region="progressbar-component"></code-example>

* 템플릿에 `aria-label` 어트리뷰트를 사용해서 스크린 리더 사용자 지원 기능을 추가합니다.

  <code-example header="src/app/app.component.html" path="accessibility/src/app/app.component.html" region="template"></code-example>


<!--
## Routing
-->
## 라우팅

<!--
### Focus management after navigation
-->
### 네비게이션 후에 포커스 관리

<!--
Tracking and controlling [focus](https://developers.google.com/web/fundamentals/accessibility/focus) in a UI is an important consideration in designing for accessibility.
When using Angular routing, you should decide where page focus goes upon navigation.

To avoid relying solely on visual cues, you need to make sure your routing code updates focus after page navigation.
Use the `NavigationEnd` event from the `Router` service to know when to update focus.

The following example shows how to find and focus the main content header in the DOM after navigation.

<code-example format="typescript" language="typescript">

router.events.pipe(filter(e =&gt; e instanceof NavigationEnd)).subscribe(() =&gt; {
  const mainHeader = document.querySelector('&num;main-content-header')
  if (mainHeader) {
    mainHeader.focus();
  }
});

</code-example>

In a real application, the element that receives focus depends on your specific application structure and layout.
The focused element should put users in a position to immediately move into the main content that has just been routed into view.
You should avoid situations where focus returns to the `body` element after a route change.
-->
화면에서 [포커스](https://developers.google.com/web/fundamentals/accessibility/focus/)를 관리하는 것은 접근성을 향상시키는 관점에서도 중요합니다.
특히 Angular 앱에서 화면을 전환한 후에는 시각 표현으로 끝내지 않고 미리 정해진 곳에 확실하게 포커스를 옮기는 것이 접근성을 확보하는 데에 도움이 됩니다.
이 동작은 `Router` 서비스가 보내는 `NavigationEnd` 이벤트를 받았을 때 구현하면 됩니다.

만약 화면을 전환한 후에 DOM에 있는 메인 헤더에 포커스를 옮겨야 한다면 다음과 같이 구현합니다.

<code-example format="typescript" language="typescript">

router.events.pipe(filter(e =&gt; e instanceof NavigationEnd)).subscribe(() =&gt; {
const mainHeader = document.querySelector('&num;main-content-header')
if (mainHeader) {
mainHeader.focus();
}
});

</code-example>


<a id="active-links-identification"></a>

<!--
### Active links identification
-->
### 활성화된 링크 표시

<!--
CSS classes applied to active `RouterLink` elements, such as `RouterLinkActive`, provide a visual cue to identify the active link.
Unfortunately, a visual cue doesn't help blind or visually impaired users.
Applying the `aria-current` attribute to the element can help identify the active link.
For more information, see [Mozilla Developer Network \(MDN\) aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)).

The `RouterLinkActive` directive provides the `ariaCurrentWhenActive` input which sets the `aria-current` to a specified value when the link becomes active.

The following example shows how to apply the `active-page` class to active links as well as setting their `aria-current` attribute to `"page"` when they are active:

```html
    <nav>
      <a routerLink="home"
         routerLinkActive="active-page"
         ariaCurrentWhenActive="page">
        Home
      </a>
      <a routerLink="about"
         routerLinkActive="active-page"
         ariaCurrentWhenActive="page">
        About
      </a>
      <a routerLink="shop"
         routerLinkActive="active-page"
         ariaCurrentWhenActive="page">
        Shop
      </a>
    </nav>
```
-->
`RouterLinkActive`를 사용해서 활성화된 `RouterLink` 엘리먼트에 CSS 클래스를 추가하면 현재 어떤 링크가 활성화되었는지 시각적으로 표시할 수 있습니다.
하지만 때로는 시각이 불편한 사용자에게는 다른 정보를 줘야할 때가 있습니다.
이 때 엘리먼트에 `aria-current` 어트리뷰트를 활용하면 됩니다.
자세한 내용은 [Mozilla Developer Network \(MDN\) aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) 문서를 참고하세요.

`RouterLinkActive` 디렉티브는 `aria-current` 어트리뷰트를 감지하면 `ariaCurrentWhenActive`도 적용할 수 있습니다.

아래 코드는 현재 활성화된 링크에 `aria-current` 어트리뷰트를 사용해서 `active-page` 클래스를 설정하는 예제 코드입니다.

```html
    <nav>
      <a routerLink="home"
         routerLinkActive="active-page"
         ariaCurrentWhenActive="page">
        Home
      </a>
      <a routerLink="about"
         routerLinkActive="active-page"
         ariaCurrentWhenActive="page">
        About
      </a>
      <a routerLink="shop"
         routerLinkActive="active-page"
         ariaCurrentWhenActive="page">
        Shop
      </a>
    </nav>
```

<!-- vale Angular.Angular_Spelling = NO -->

<!--
## More information
-->
## 참고 자료

*   [Accessibility - Google Web Fundamentals](https://developers.google.com/web/fundamentals/accessibility)
*   [ARIA specification and authoring practices](https://www.w3.org/TR/wai-aria)
*   [Material Design - Accessibility](https://material.io/design/usability/accessibility.html)
*   [Smashing Magazine](https://www.smashingmagazine.com/search/?q=accessibility)
*   [Inclusive Components](https://inclusive-components.design)
*   [Accessibility Resources and Code Examples](https://dequeuniversity.com/resources)
*   [W3C - Web Accessibility Initiative](https://www.w3.org/WAI/people-use-web)
*   [Rob Dodson A11ycasts](https://www.youtube.com/watch?v=HtTyRajRuyY)
<!--
*   [Angular ESLint](https://github.com/angular-eslint/angular-eslint#functionality) provides linting rules that can help you make sure your code meets accessibility standards.
-->
*   [Angular ESLint](https://github.com/angular-eslint/angular-eslint#functionality)를 활용하면 코딩 스타일을 통일시켜 가독성을 높일 수 있습니다.

<!-- vale Angular.Angular_Spelling = YES -->

<!--
Books
-->
도서

<!-- vale Angular.Google_Quotes = NO -->

*   "A Web for Everyone: Designing Accessible User Experiences," Sarah Horton and Whitney Quesenbery
*   "Inclusive Design Patterns," Heydon Pickering

<!-- vale Angular.Google_Quotes = YES -->

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
