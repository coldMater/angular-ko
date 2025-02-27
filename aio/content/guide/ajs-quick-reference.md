<!--
# AngularJS to Angular concepts: Quick reference
-->
# AngularJS와 Angular 컨셉 비교

<!--
*Angular* is the name for the Angular of today and tomorrow.

*AngularJS* is the name for all v1.x versions of Angular.

This guide helps you transition from AngularJS to Angular
by mapping AngularJS syntax to the corresponding Angular syntax.

**See the Angular syntax in this <live-example name="ajs-quick-reference"></live-example>**.
-->
Angular 프로젝트의 정식 명칭은 *Angular* 입니다.

*AngularJS* 는 Angular 1.x 버전을 의미하는 이름입니다.

이 문서는 AngularJS 앱을 Angular로 바꿀 때 각 프레임워크의 구성요소가 어떤 관계인지 설명합니다.

**Angular 문법을 테스트해보려면 <live-example name="ajs-quick-reference"></live-example>를 활용해 보세요.**


<!--
## Template basics
-->
## 템플릿

<!--
Templates are the user-facing part of an Angular application and are written in HTML.
The following table lists some of the key AngularJS template features with their corresponding Angular template syntax.
-->
템플릿은 Angular 애플리케이션에서 사용자가 눈으로 확인할 수 있는 부분이며 보통 HTML로 작성합니다.
아래 표를 보면서 AngularJS 템플릿에 활용하는 기능과 Angular 템플릿에 활용하는 기능의 관계에 대해 확인해 보세요.


<!--
### Bindings / interpolation &rarr; bindings / interpolation
-->
### 바인딩 / 문자열 바인딩 &rarr; 바인딩 / 문자열 바인딩

<!--
| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |:---     |
| <header>Bindings/interpolation</header> <code-example hideCopy format="html" language="html"> Your favorite hero is: {{vm.favoriteHero}} </code-example> In AngularJS, an expression in curly braces denotes one-way binding. This binds the value of the element to a property in the controller associated with this template. <br /> When using the `controller as` syntax, the binding is prefixed with the controller alias `vm` or `$ctrl` because you have to be specific about the source. | <header>Bindings/interpolation</header> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="interpolation"></code-example> In Angular, a template expression in curly braces still denotes one-way binding. This binds the value of the element to a property of the component. The context of the binding is implied and is always the associated component, so it needs no reference variable. <br /> For more information, see the [Interpolation][AioGuideInterpolation] guide. |
-->
| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |:---     |
| <header>바인딩/문자열 바인딩</header> <code-example hideCopy format="html" language="html"> Your favorite hero is: {{vm.favoriteHero}} </code-example> AngularJS에서 이중 중괄호는 단방향 바인딩을 의미했습니다. 컨트롤러에 있는 프로퍼티를 엘리먼트의 값으로 바인딩하는 것입니다. <br /> `controller as` 문법을 사용하면 컨트롤러를 `vm`이나 `$ctrl`로 명확하게 지정할 수 있습니다. | <header>바인딩/문자열 바인딩</header> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="interpolation"></code-example> Angular에서 템플릿 표현식에 이중 중괄호를 사용하면 역시 단방향 바인딩을 의미합니다. 컴포넌트에 있는 프로퍼티를 엘리먼트의 값으로 바인딩합니다. 이 때 바인딩의 컨텍스트는 따로 무언가를 지정하지 않아도 컴포넌트 범위입니다. <br /> 자세한 내용은 [문자열 바인딩][AioGuideInterpolation] 문서를 참고하세요. |


<!--
### Filters &rarr; pipes
-->
### 필터 &rarr; 파이프

<!--
| AngularJS                                                                                                                                                                                                                                                                                                                                                             | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                   |:---     |
| <header>Filters</header> <code-example hideCopy format="html" language="html"> &lt;td&gt; &NewLine; &nbsp; {{movie.title &verbar; uppercase}} &NewLine; &lt;/td&gt; </code-example> To filter output in AngularJS templates, use the pipe <code>&verbar;</code> character and one or more filters. <br /> This example filters the `title` property to uppercase. | <header>Pipes</header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="uppercase"></code-example> In Angular you use similar syntax with the pipe <code>&verbar;</code> character to filter output, but now you call them **pipes**. Many, but not all, of the built-in filters from AngularJS are built-in pipes in Angular. <br /> For more information, see [Filters/pipes][AioGuideAjsQuickReferenceFiltersPipes]. |
-->
| AngularJS                                                                                                                                                                                                                                                                                                                                                             | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                   |:---     |
| <header>필터</header> <code-example hideCopy format="html" language="html"> &lt;td&gt; &NewLine; &nbsp; {{movie.title &verbar; uppercase}} &NewLine; &lt;/td&gt; </code-example> AngularJS 템플릿에  파이프 <code>&verbar;</code> 문자를 사용하면 데이터의 표시방식을 변경할 수 있으며, 여러개를 연결할 수도 있습니다. <br /> 이 예제에서는 `title` 프로퍼티 값을 대문자로 변환합니다. | <header>파이프</header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="uppercase"></code-example> Angular도 비슷하게 파이프 <code>&verbar;</code> 문자를 사용하지만, 이것은 이제 **파이프** 라고 부릅니다. AngularJS에서 제공되던 기본 파이프는 Angular에서도 거의 제공하지만, 그대로 전부를 제공하지는 않습니다. <br /> 자세한 내용은 [필터/파이프][AioGuideAjsQuickReferenceFiltersPipes] 문서를 참고하세요. |


<!--
### Local variables &rarr; input variables
-->
### 지역 변수 &rarr; 입력 변수

<!--
| AngularJS                                                                                                                                                                                                                                                                                                                | Angular |
|:---                                                                                                                                                                                                                                                                                                                      |:---     |
| <header>Local variables</header> <code-example hideCopy format="html" language="html"> &lt;tr ng-repeat="movie in vm.movies"&gt; &NewLine;&nbsp; &lt;td&gt; &NewLine;&nbsp;&nbsp;&nbsp; {{movie.title}} &NewLine;&nbsp; &lt;/td&gt; &NewLine;&lt;/tr&gt; </code-example> Here, `movie` is a user-defined local variable. | <header>Input variables</header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="local"></code-example> Angular has true template input variables that are explicitly defined using the `let` keyword. <br /> For more information, see the [Structural directive shorthand][AioGuideStructuralDirectivesStructuralDirectiveShorthand] section of [Structural Directives][AioGuideStructuralDirectives]. |
-->
| AngularJS                                                                                                                                                                                                                                                                                                                | Angular |
|:---                                                                                                                                                                                                                                                                                                                      |:---     |
| <header>지역 변수\(Local variables\)</header> <code-example hideCopy format="html" language="html"> &lt;tr ng-repeat="movie in vm.movies"&gt; &NewLine;&nbsp; &lt;td&gt; &NewLine;&nbsp;&nbsp;&nbsp; {{movie.title}} &NewLine;&nbsp; &lt;/td&gt; &NewLine;&lt;/tr&gt; </code-example> 이 코드에서 `movie`는 사용자가 정의한 지역 변수입니다. | <header>입력 변수\(Input variables\)</header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="local"></code-example> Angular는 `let` 키워드를 사용해서 명시적으로 템플릿에 입력 변수를 선언합니다. <br /> 자세한 내용은 [구조 디렉티브][AioGuideStructuralDirectives] 문서의 [구조 디렉티브 단축 문법][AioGuideStructuralDirectivesStructuralDirectiveShorthand] 섹션을 참고하세요. |


<a id="template-directives"></a>

<!--
## Template directives
-->
## 템플릿 디렉티브

<!--
AngularJS provides more than seventy built-in directives for templates.
Many of them are not needed in Angular because of its more capable and expressive binding system.
The following are some of the key AngularJS built-in directives and their equivalents in Angular.
-->
AngularJS에서는 템플릿에 사용할 수 있는 디렉티브를 70개 이상 제공합니다.
하지만 이 중 대부분은 크게 유용하지 않기 때문에 Angular로 오면서 많이 제거되었습니다.
아래 표를 보면서 AngularJS와 Angular 양쪽에 존재하는 디렉티브에 대해 확인해 보세요.

### `ng-app` &rarr; bootstrapping

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                   | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                         |:---     |
| <header><code>ng-app</code></header> <code-example hideCopy format="html" language="html"> &lt;body ng-app="movieHunter"&gt; </code-example> The application startup process is called **bootstrapping**. <br /> Although you can bootstrap an AngularJS application in code, many applications bootstrap declaratively with the `ng-app` directive, giving it the name of the module \(`movieHunter`\) of the application. | <header>Bootstrapping</header> <code-example header="main.ts" format="typescript" hideCopy language="typescript" path="ajs-quick-reference/src/main.ts"></code-example> <code-example hideCopy path="ajs-quick-reference/src/app/app.module.1.ts" header="app.module.ts"></code-example> Angular does not have a bootstrap directive. To launch the application in code, explicitly bootstrap the root module \(`AppModule`\) of the application in `main.ts` and the root component \(`AppComponent`\) of the application in `app.module.ts`. |

### `ng-class` &rarr; `ngClass`

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |:---     |
| <header><code>ng-class</code></header> <code-example hideCopy format="html" language="html"> &lt;div ng-class="{active: isActive}"&gt; &NewLine; &lt;div ng-class="{active: isActive, shazam: isImportant}"&gt; </code-example> In AngularJS, the `ng-class` directive includes/excludes CSS classes based on an expression. The expression is often a key-value object, with key defined as a CSS class name, and value as a template expression that evaluates to a Boolean. <br /> In the first example, the `active` class is applied to the element if `isActive` is true. <br /> You can specify multiple classes, as shown in the second example. | <header><code>ngClass</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="ngClass"></code-example> In Angular, the `ngClass` directive works similarly. It includes/excludes CSS classes based on an expression. <br /> In the first example, the `active` class is applied to the element if `isActive` is true. <br /> You can specify multiple classes, as shown in the second example. <br /> Angular also has **class binding**, which is a good way to add or remove a single class, as shown in the third example. <br /> For more information see [Attribute, class, and style bindings][AioGuideAttributeBinding] page. |

### `ng-click` &rarr; Bind to the `click` event

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |:---     |
| <header><code>ng-click</code></header> <code-example hideCopy format="html" language="html"> &lt;button ng-click="vm.toggleImage()"&gt; &NewLine; &lt;button ng-click="vm.toggleImage(&dollar;event)"&gt; </code-example> In AngularJS, the `ng-click` directive allows you to specify custom behavior when an element is clicked. <br /> In the first example, when the user clicks the button, the `toggleImage()` method in the controller referenced by the `vm` `controller as` alias is executed. <br /> The second example demonstrates passing in the `$event` object, which provides details about the event to the controller. | <header>Bind to the <code>click</code> event</header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="event-binding"></code-example> AngularJS event-based directives do not exist in Angular. Rather, define one-way binding from the template view to the component using **event binding**. <br /> For event binding, define the name of the target event within parenthesis and specify a template statement, in quotes, to the right of the equals. Angular then sets up an event handler for the target event. When the event is raised, the handler executes the template statement. <br /> In the first example, when a user clicks the button, the `toggleImage()` method in the associated component is executed. <br /> The second example demonstrates passing in the `$event` object, which provides details about the event to the component. <br /> For a list of DOM events, see [Event reference][MdnDocsWebEvents]. <br /> For more information, see the [Event binding][AioGuideEventBinding] page. |

### `ng-controller` &rarr; component decorator

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                        | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                              |:---     |
| <header><code>ng-controller</code></header> <code-example hideCopy format="html" language="html"> &lt;div ng-controller="MovieListCtrl as vm"&gt; </code-example> In AngularJS, the `ng-controller` directive attaches a controller to the view. Using the `ng-controller`, or defining the controller as part of the routing, ties the view to the controller code associated with that view. | <header>Component decorator</header> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.ts" region="component"></code-example> In Angular, the template no longer specifies its associated controller. Rather, the component specifies its associated template as part of the component class decorator. <br /> For more information, see [Architecture Overview][AioGuideArchitectureComponents]. |

### `ng-hide` &rarr; Bind to the `hidden` property

| AngularJS                                                                                                                                                                                                                        | Angular |
|:---                                                                                                                                                                                                                              |:---     |
| <header><code>ng-hide</code></header> In AngularJS, the `ng-hide` directive shows or hides the associated HTML element based on an expression. For more information, see [ng-show][AioGuideAjsQuickReferenceTemplateDirectives]. | <header>Bind to the <code>hidden</code> property</header> In Angular, you use property binding. Angular does not have a built-in *hide* directive. For more information, see [ng-show][AioGuideAjsQuickReferenceTemplateDirectives]. |

### `ng-href` &rarr; Bind to the `href` property

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |:---     |
| <header><code>ng-href</code></header> <code-example hideCopy format="html" language="html"> &lt;a ng-href="{{ angularDocsUrl }}"&gt; &NewLine; &nbsp; Angular Docs &NewLine; &lt;/a&gt; </code-example> The `ng-href` directive allows AngularJS to preprocess the `href` property. `ng-href` can replace the binding expression with the appropriate URL before the browser fetches from that URL. <br /> In AngularJS, the `ng-href` is often used to activate a route as part of navigation. <br /> <code-example hideCopy format="html" language="html"> &lt;a ng-href="#{{ moviesHash }}"&gt; &NewLine;&nbsp; Movies &NewLine;&lt;/a&gt; </code-example> Routing is handled differently in Angular. | <header>Bind to the <code>href</code> property</header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="href"></code-example> Angular uses property binding. Angular does not have a built-in *href* directive. Place the `href` property of the element in square brackets and set it to a quoted template expression. For more information see the [Property binding][AioGuidePropertyBinding] page. In Angular, `href` is no longer used for routing. Routing uses `routerLink`, as shown in the following example. <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="router-link"></code-example> For more information on routing, see [Defining a basic route][AioGuideRouterDefiningABasicRoute] in the [Routing & Navigation][AioGuideRouter] page. |

### `ng-if` &rarr; `*ngIf`

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                             | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                                   |:---     |
| <header><code>ng-if</code></header> <code-example hideCopy format="html" language="html"> &lt;table ng-if="movies.length"&gt; </code-example> In AngularJS, the `ng-if` directive removes or recreates a section of the DOM, based on an expression. If the expression is false, the element is removed from the DOM. <br /> In this example, the `<table>` element is removed from the DOM unless the `movies` array has a length greater than zero. | <header><code>&ast;ngIf</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="ngIf"></code-example> The `*ngIf` directive in Angular works the same as the `ng-if` directive in AngularJS. It removes or recreates a section of the DOM based on an expression. <br /> In this example, the `<table>` element is removed from the DOM unless the `movies` array has a length. <br /> The \(`*`\) before `ngIf` is required in this example. For more information, see [Structural Directives][AioGuideStructuralDirectives]. |

### `ng-model` &rarr; `ngModel`

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |:---     |
| <header><code>ng-model</code></header> <code-example hideCopy format="html" language="html"> &lt;input ng-model="vm.favoriteHero" /&gt; </code-example> In AngularJS, the `ng-model` directive binds a form control to a property in the controller associated with the template. This provides **two-way binding** whereby changes result in the value in the view and the model being synchronized. | <header><code>ngModel</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="ngModel"></code-example> In Angular, **two-way binding** is indicatedr5t by `[()]`, descriptively referred to as a "banana in a box." This syntax is a shortcut for defining both:<ul><li>property binding, from the component to the view</li><li>event binding, from the view to the component</li></ul> thereby providing two-way binding. <br /> For more information on two-way binding with `ngModel`, see the [Displaying and updating properties with `ngModel`][AioGuideBuiltInDirectivesDisplayingAndUpdatingPropertiesWithNgmodel] section of [Built-in directives][AioGuideBuiltInDirectives]. |

### `ng-repeat` &rarr; `*ngFor`

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                         | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                               |:---     |
| <header><code>ng-repeat</code></header> <code-example hideCopy format="html" language="html"> &lt;tr ng-repeat="movie in vm.movies"&gt; </code-example> In AngularJS, the `ng-repeat` directive repeats the associated DOM element for each item in the specified collection. <br /> In this example, the table row \(`<tr>`\) element repeats for each movie object in the collection of movies. | <header><code>&ast;ngFor</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="ngFor"></code-example> The `*ngFor` directive in Angular is like the `ng-repeat` directive in AngularJS. It repeats the associated DOM element for each item in the specified collection. More accurately, it turns the defined element \(`<tr>` in this example\) and its contents into a template and uses that template to instantiate a view for each item in the list. <br /> Notice the other syntax differences: <ul><li>The \(`*`\) before `ngFor` is required</li><li>The `let` keyword identifies `movie` as an input variable</li><li>The list preposition is `of`, not `in`</li></ul>For more information, see [Structural Directives][AioGuideStructuralDirectives]. |

### `ng-show` &rarr; Bind to the `hidden` property

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                  | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                        |:---     |
| <header><code>ng-show</code></header> <code-example hideCopy format="html" language="html"> &lt;h3 ng-show="vm.favoriteHero"&gt; &NewLine; &nbsp; Your favorite hero is: {{vm.favoriteHero}} &NewLine; &lt;/h3&gt; </code-example> In AngularJS, the `ng-show` directive shows or hides the associated DOM element, based on an expression. <br /> In this example, the `<div>` element is shown if the `favoriteHero` variable is truthy. | <header>Bind to the <code>hidden</code> property</header> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="hidden"></code-example> Angular uses property binding. Angular has no built-in *show* directive. For hiding and showing elements, bind to the HTML `hidden` property. <br /> To conditionally display an element the `hidden` property of the element can be used. Place the `hidden` property in square brackets and set it to a quoted template expression that evaluates to the *opposite* of *show*. <br /> In this example, the `<div>` element is hidden if the `favoriteHero` variable is not truthy. <br /> For more information on property binding, see the [Property binding][AioGuidePropertyBinding] page. |

### `ng-src` &rarr; Bind to the `src` property

| AngularJS                                                                                                                                                                                                                                                                                                                                    | Angular |
|:---                                                                                                                                                                                                                                                                                                                                          |:---     |
| <header><code>ng-src</code></header> <code-example hideCopy format="html" language="html"> &lt;img ng-src="{{movie.imageurl}}"&gt; </code-example> The `ng-src` directive allows AngularJS to preprocess the `src` property. This replaces the binding expression with the appropriate URL before the browser fetches from that URL. | <header>Bind to the <code>src</code> property</header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="src"></code-example> Angular uses property binding. Angular has no built-in *src* directive. Place the `src` property in square brackets and set it to a quoted template expression. <br /> For more information on property binding, see the [Property binding][AioGuidePropertyBinding] page. |

### `ng-style` &rarr; `ngStyle`

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |:---     |
| <header><code>ng-style</code></header> <code-example hideCopy format="html" language="html"> &lt;div ng-style="{color: colorPreference}"&gt; </code-example> In AngularJS, the `ng-style` directive sets a CSS style on an HTML element based on an expression. That expression is often a key-value control object with: <ul><li> each key of the object defined as a CSS property</li><li>each value defined as an expression that evaluates to a value appropriate for the style</li></ul> In the example, the `color` style is set to the current value of the `colorPreference` variable. | <header><code>ngStyle</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="ngStyle"></code-example> In Angular, the `ngStyle` directive works similarly. It sets a CSS style on an HTML element based on an expression. <br /> In the first example, the `color` style is set to the current value of the `colorPreference` variable. <br /> Angular also has **style binding**, which is good way to set a single style. This is shown in the second example. <br /> For more information on style binding, see the [Style binding][AioGuideAttributeBindingBindingToTheStyleAttribute] section of the [Attribute binding][AioGuideAttributeBinding] page. <br /> For more information on the `ngStyle` directive, see the [NgStyle][AioGuideBuiltInDirectivesSettingInlineStylesWithNgstyle] section of the [Built-in directives][AioGuideBuiltInDirectives] page. |

### `ng-switch` &rarr; `ngSwitch`

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |:---     |
| <header><code>ng-switch</code></header> <code-example hideCopy format="html" language="html"> &lt;div ng-switch="vm.favoriteHero &amp;&amp; vm.checkMovieHero(vm.favoriteHero)"&gt; &NewLine; &nbsp; &lt;div ng-switch-when="true"&gt; &NewLine; &nbsp; &nbsp; Excellent choice. &NewLine; &nbsp; &lt;/div&gt; &NewLine; &nbsp; &lt;div ng-switch-when="false"&gt; &NewLine; &nbsp; &nbsp; No movie, sorry. &NewLine; &nbsp; &lt;/div&gt; &NewLine; &nbsp; &lt;div ng-switch-default&gt; &NewLine; &nbsp; &nbsp; Please enter your favorite hero. &NewLine; &nbsp; &lt;/div&gt; &NewLine; &lt;/div&gt; </code-example> In AngularJS, the `ng-switch` directive swaps the contents of an element by selecting one of the templates based on the current value of an expression. <br /> In this example, if `favoriteHero` is not set, the template displays "Please enter &hellip;" If `favoriteHero` is set, it checks the movie hero by calling a controller method. If that method returns `true`, the template displays "Excellent choice!" If that methods returns `false`, the template displays "No movie, sorry!" | <header><code>ngSwitch</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="ngSwitch"></code-example> In Angular, the `ngSwitch` directive works similarly. It displays an element whose `*ngSwitchCase` matches the current `ngSwitch` expression value. <br /> In this example, if `favoriteHero` is not set, the `ngSwitch` value is `null` and `*ngSwitchDefault` displays, "Please enter your favorite hero." If `favoriteHero` is set, the application checks the movie hero by calling a component method. If that method returns `true`, the application selects `*ngSwitchCase="true"` and displays: "Excellent choice." If that methods returns `false`, the application selects `*ngSwitchCase="false"` and displays: "No movie, sorry." <br /> The \(`*`\) before `ngSwitchCase` and `ngSwitchDefault` is required in this example. <br /> For more information, see [The NgSwitch directives][AioGuideBuiltInDirectivesSwitchingCasesWithNgswitch] section of the [Built-in directives][AioGuideBuiltInDirectives] page. |


<a id="filters--pipes"></a>

<!--
## Filters / pipes
-->
## 필터/파이프

<!--
Angular **pipes** provide formatting and transformation for data in the template, like AngularJS **filters**.
Many of the built-in filters in AngularJS have corresponding pipes in Angular.
For more information on pipes, see [Pipes][AioGuidePipes].
-->
Angular에서 말하는 **파이프**는 템플릿에 있는 데이터를 다른 형태로 변환하는 역할을 하며 AngularJS **필터**와 비슷합니다.
그리고 AngularJS에서 제공하던 기본 필터중 대부분은 Angular에서도 제공합니다.
파이프에 대해 자세하게 알아보려면 [파이프](guide/pipes) 문서를 참고하세요.

### `currency` &rarr; `currency`

| AngularJS                                                                                                                                                                                                                      | Angular |
|:---                                                                                                                                                                                                                            |:---     |
| <header><code>currency</code></header> <code-example hideCopy format="html" language="html"> &lt;td&gt; &NewLine; &nbsp; {{movie.price &verbar; currency}} &NewLine; &lt;/td&gt; </code-example> Formats a number as currency. | <header><code>currency</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="currency"></code-example> The Angular `currency` pipe is similar although some of the parameters have changed. |

### `date` &rarr; `date`

| AngularJS                                                                                                                                                                                                                                                | Angular |
|:---                                                                                                                                                                                                                                                      |:---     |
| <header><code>date</code></header> <code-example hideCopy format="html" language="html"> &lt;td&gt; &NewLine; &nbsp; {{movie.releaseDate &verbar; date}} &NewLine; &lt;/td&gt; </code-example> Formats a date to a string based on the requested format. | <header><code>date</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="date"></code-example> The Angular `date` pipe is similar. |

### `filter` &rarr; none

| AngularJS                                                                                                                                                                                                                                                                     | Angular |
|:---                                                                                                                                                                                                                                                                           |:---     |
| <header><code>filter</code></header> <code-example hideCopy format="html" language="html"> &lt;tr ng-repeat="movie in movieList &verbar; filter: {title:listFilter}"&gt; </code-example> Selects a subset of items from the defined collection, based on the filter criteria. | <header>none</header> For performance reasons, no comparable pipe exists in Angular. Do all your filtering in the component. If you need the same filtering code in several templates, consider building a custom pipe. |

### `json` &rarr; `json`

| AngularJS                                                                                                                                                                                                                                                           | Angular |
|:---                                                                                                                                                                                                                                                                 |:---     |
| <header><code>json</code></header> <code-example hideCopy format="html" language="html"> &lt;pre&gt; &NewLine; &nbsp; {{movie &verbar; json}} &NewLine; &lt;/pre&gt; </code-example> Converts a JavaScript object into a JSON string. This is useful for debugging. | <header><code>json</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="json"></code-example> The Angular [`json`][AioApiCommonJsonpipe] pipe does the same thing. |

### `limitTo` &rarr; `slice`

| AngularJS                                                                                                                                                                                                                                                                                                    | Angular |
|:---                                                                                                                                                                                                                                                                                                          |:---     |
| <header><code>limitTo</code></header> <code-example hideCopy format="html" language="html"> &lt;tr ng-repeat="movie in movieList &verbar; limitTo:2:0"&gt; </code-example> Selects up to the first parameter `2` number of items from the collection starting optionally at the beginning index `0`. | <header><code>slice</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="slice"></code-example> The `SlicePipe` does the same thing but the *order of the parameters is reversed*, in keeping with the JavaScript `Slice` method. The first parameter is the starting index and the second is the limit. As in AngularJS, coding this operation within the component instead could improve performance. |

### `lowercase` &rarr; `lowercase`

| AngularJS                                                                                                                                                                                                                            | Angular |
|:---                                                                                                                                                                                                                                  |:---     |
| <header><code>lowercase</code></header> <code-example hideCopy format="html" language="html"> &lt;td&gt; &NewLine; &nbsp; {{movie.title &verbar; lowercase}} &NewLine; &lt;/td&gt; </code-example> Converts the string to lowercase. | <header><code>lowercase</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="lowercase"></code-example> The Angular `lowercase` pipe does the same thing. |

### `number` &rarr; `number`

| AngularJS                                                                                                                                                                                                                   | Angular |
|:---                                                                                                                                                                                                                         |:---     |
| <header><code>number</code></header> <code-example hideCopy format="html" language="html"> &lt;td&gt; &NewLine; &nbsp; {{movie.starRating &verbar; number}} &NewLine; &lt;/td&gt; </code-example> Formats a number as text. | <header><code>number</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="number"></code-example> The Angular [`number`][AioApiCommonDecimalpipe] pipe is similar. It provides more capabilities when defining the decimal places, as shown in the preceding second example. <br /> Angular also has a `percent` pipe, which formats a number as a local percentage as shown in the third example. |

### `orderBy` &rarr; none

| AngularJS                                                                                                                                                                                                                                                                                                   | Angular |
|:---                                                                                                                                                                                                                                                                                                         |:---     |
| <header><code>orderBy</code></header> <code-example hideCopy format="html" language="html"> &lt;tr ng-repeat="movie in movieList &verbar; orderBy : 'title'"&gt; </code-example> Displays the collection in the order specified by the expression. In this example, the movie title orders the `movieList`. | <header>none</header> For performance reasons, no comparable pipe exists in Angular. Instead, use component code to order or sort results. If you need the same ordering or sorting code in several templates, consider building a custom pipe. |


<!--
## Modules / controllers / components
-->
## 모듈/컨트롤러/컴포넌트

<!--
In both AngularJS and Angular, modules help you organize your application into cohesive blocks of features.

In AngularJS, you write the code that provides the model and the methods for the view in a **controller**.
In Angular, you build a **component**.

Because much AngularJS code is in JavaScript, JavaScript code is shown in the AngularJS column.
The Angular code is shown using TypeScript.
-->
AngularJS와 Angular에는 각각 애플리케이션을 기능별로 구성하기 위한 모듈 시스템이 있습니다.

AngularJS에서는 화면의 특정 영역과 연결된 **컨트롤러(controller)**에 모델과 메소드를 정의합니다.
그리고 Angular에서는 **컴포넌트(component)**가 이 역할을 합니다.

AngularJS 애플리케이션 코드는 대부분 JavaScript 파일 안에 있을 것입니다.
반면에 Angular 코드는 TypeScript로 작성합니다.


### Immediately invoked function expression (IIFE) &rarr; none

| AngularJS                                                                                                                                                                                                                                                                                                                                      | Angular |
|:---                                                                                                                                                                                                                                                                                                                                            |:---     |
| <header>IIFE</header> <code-example hideCopy format="typescript" language="typescript"> ( &NewLine;&nbsp; function () { &NewLine;&nbsp;&nbsp;&nbsp; &hellip; &NewLine;&nbsp; }() &NewLine;); </code-example> In AngularJS, an IIFE around controller code keeps it out of the global namespace. | <header>none</header> This is a nonissue in Angular because ES 2015 modules handle the namespace for you. <br /> For more information on modules, see the [Modules][AioGuideArchitectureModules] section of the [Architecture Overview][AioGuideArchitecture]. |

### Angular modules &rarr; `NgModules`

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                           | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                 |:---     |
| <header>Angular modules</header> <code-example hideCopy format="typescript" language="typescript"> angular .module( &NewLine;&nbsp; "movieHunter", &NewLine;&nbsp; [ &NewLine;&nbsp;&nbsp;&nbsp; "ngRoute" &NewLine;&nbsp; ] &NewLine;); </code-example> In AngularJS, an Angular module keeps track of controllers, services, and other code. The second argument defines the list of other modules that this module depends upon. | <header><code>NgModules</code></header> <code-example hideCopy path="ajs-quick-reference/src/app/app.module.1.ts"></code-example> NgModules, defined with the `NgModule` decorator, serve the same purpose: <ul> <li>`imports`: specifies the list of other modules that this module depends upon</li> <li>`declaration`: keeps track of your components, pipes, and directives.</li> </ul> For more information on modules, see [NgModules][AioGuideNgmodules]. |

### Controller registration &rarr; component decorator

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |:---     |
| <header>Controller registration</header> <code-example hideCopy format="typescript" language="typescript"> angular .module( &NewLine;&nbsp; "movieHunter" &NewLine;) .controller( &NewLine;&nbsp; "MovieListCtrl", &NewLine;&nbsp; [ &NewLine;&nbsp;&nbsp;&nbsp; "movieService", &NewLine;&nbsp;&nbsp;&nbsp; MovieListCtrl &NewLine;&nbsp; ] &NewLine;); </code-example> AngularJS has code in each controller that looks up an appropriate Angular module and registers the controller with that module. <br /> The first argument is the controller name. The second argument defines the string names of all dependencies injected into this controller, and a reference to the controller function. | <header>Component decorator</header> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.ts" region="component"></code-example> Angular adds a decorator to the component class to provide any required metadata. The `@Component` decorator declares that the class is a component and provides metadata about that component such as its selector, or tag, and its template. <br /> This is how you associate a template with logic, which is defined in the component class. <br /> For more information, see the [Components][AioGuideArchitectureComponents] section of the [Architecture Overview][AioGuideArchitecture] page. |

### Controller function &rarr; component class

| AngularJS                                                                                                                                                                                                                                                      | Angular |
|:---                                                                                                                                                                                                                                                            |:---     |
| <header>Controller function</header> <code-example hideCopy format="typescript" language="typescript"> function MovieListCtrl(movieService) { &NewLine; } </code-example> In AngularJS, you write the code for the model and methods in a controller function. | <header>Component class</header> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.ts" region="class"></code-example> In Angular, you create a component class to contain the data model and control methods. Use the TypeScript <code>export</code> keyword to export the class so that the component can be imported into NgModules. <br /> For more information, see the [Components][AioGuideArchitectureComponents] section of the [Architecture Overview][AioGuideArchitecture] page. |

### Dependency injection &rarr; dependency injection

| AngularJS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Angular |
|:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |:---     |
| <header>Dependency injection</header> <code-example hideCopy format="typescript" language="typescript"> MovieListCtrl.&dollar;inject = [ &NewLine;&nbsp; 'MovieService' &NewLine;]; &NewLine;function MovieListCtrl(movieService) { &NewLine;} </code-example> In AngularJS, you pass in any dependencies as controller function arguments. This example injects a `MovieService`. <br /> To guard against minification problems, tell Angular explicitly that it should inject an instance of the `MovieService` in the first parameter. | <header>Dependency injection</header> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.ts" region="di"></code-example> In Angular, you pass in dependencies as arguments to the component class constructor. This example injects a `MovieService`. The TypeScript type of the first parameter tells Angular what to inject, even after minification. <br /> For more information, see the [Dependency injection][AioGuideArchitectureServicesAndDependencyInjection] section of the [Architecture Overview][AioGuideArchitecture]. |

<!--
## Style sheets
-->
## 스타일 시트

<!--
Style sheets give your application a nice look.
In AngularJS, you specify the style sheets for your entire application.
As the application grows over time, the styles for the many parts of the application merge, which can cause unexpected results.
In Angular, you can still define style sheets for your entire application.
Now you can also encapsulate a style sheet within a specific component.
-->
스타일 시트를 추가하면 애플리케이션의 모습을 멋지게 꾸밀 수 있습니다.
AngularJS에서는 스타일 추가하면 애플리케이션 전체에 이 스타일이 반영되었습니다.
하지만 애플리케이션은 시간이 지남에 따라 점점 커지고 복잡해지기 때문에 애플리케이션 각 부분의 스타일이 섞여서 예상치 못한 결과가 나타나는 경우가 많았습니다.
Angular에서도 애플리케이션 전 영역에 스타일 시트를 적용할 수 있습니다.
하지만 특정 컴포넌트에만 적용되도록 스타일을 캡슐화할 수도 있습니다.


### `Link` tag &rarr; `styles` configuration or `styleUrls`

| AngularJS                                                                                                                                                                                                                                                                                                                  | Angular |
|:---                                                                                                                                                                                                                                                                                                                        |:---     |
| <header><code>Link</code> tag</header> <code-example hideCopy format="html" language="html"> &lt;link href="styles.css" &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; rel="stylesheet" /&gt; </code-example> AngularJS, uses a `link` tag in the head section of the `index.html` file to define the styles for the application. | <header><code>styles</code> configuration</header> <code-example hideCopy path="ajs-quick-reference/.angular-cli.1.json" region="styles"></code-example> With the Angular CLI, you can configure your global styles in the `angular.json` file. You can rename the extension to `.scss` to use sass. <br /><br /> <header><code>styleUrls</code></header> In Angular, you can use the `styles` or `styleUrls` property of the `@Component` metadata to define a style sheet for a particular component. <br /> <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.ts" region="style-url"></code-example> This allows you to set appropriate styles for individual components that do not leak into other parts of the application. |

<!-- links -->

[AioApiCommonDecimalpipe]: api/common/DecimalPipe "DecimalPipe | @angular/common - API | Angular"
[AioApiCommonJsonpipe]: api/common/JsonPipe "JsonPipe | @angular/common - API | Angular"

[AioGuideAjsQuickReferenceFiltersPipes]: guide/ajs-quick-reference#filters--pipes "Filters/pipes - AngularJS to Angular concepts: Quick reference | Angular"
[AioGuideAjsQuickReferenceTemplateDirectives]: guide/ajs-quick-reference#template-directives "Template directives - AngularJS to Angular concepts: Quick reference | Angular"

[AioGuideArchitecture]: guide/architecture "Introduction to Angular concepts | Angular"
[AioGuideArchitectureComponents]: guide/architecture#components "Components - Introduction to Angular concepts | Angular"
[AioGuideArchitectureModules]: guide/architecture#modules "Modules - Introduction to Angular concepts | Angular"
[AioGuideArchitectureServicesAndDependencyInjection]: guide/architecture#services-and-dependency-injection "Services and dependency injection - Introduction to Angular concepts | Angular"

[AioGuideAttributeBinding]: guide/attribute-binding "Attribute, class, and style bindings | Angular"
[AioGuideAttributeBindingBindingToTheStyleAttribute]: guide/class-binding "Class and style binding | Angular"

[AioGuideBuiltInDirectives]: guide/built-in-directives "Built-in directives | Angular"
[AioGuideBuiltInDirectivesDisplayingAndUpdatingPropertiesWithNgmodel]: guide/built-in-directives#displaying-and-updating-properties-with-ngmodel "Displaying and updating properties with ngModel - Built-in directives | Angular"
[AioGuideBuiltInDirectivesSettingInlineStylesWithNgstyle]: guide/built-in-directives#setting-inline-styles-with-ngstyle "Setting inline styles with NgStyle - Built-in directives | Angular"
[AioGuideBuiltInDirectivesSwitchingCasesWithNgswitch]: guide/built-in-directives#switching-cases-with-ngswitch "Switching cases with NgSwitch - Built-in directives | Angular"

[AioGuideEventBinding]: guide/event-binding "Event binding | Angular"

[AioGuideInterpolation]: guide/interpolation "Text interpolation | Angular"

[AioGuideNgmodules]: guide/ngmodules "NgModules | Angular"

[AioGuidePipes]: guide/pipes "Transforming Data Using Pipes | Angular"

[AioGuidePropertyBinding]: guide/property-binding "Property binding | Angular"

[AioGuideRouter]: guide/router "Common Routing Tasks | Angular"
[AioGuideRouterDefiningABasicRoute]: guide/router#defining-a-basic-route "Defining a basic route - Common Routing Tasks | Angular"

[AioGuideStructuralDirectives]: guide/structural-directives "Writing structural directives | Angular"
[AioGuideStructuralDirectivesStructuralDirectiveShorthand]: guide/structural-directives#structural-directive-shorthand "Structural directive shorthand - Writing structural directives | Angular"

<!-- external links -->

[MdnDocsWebEvents]: https://developer.mozilla.org/docs/Web/Events "Event reference | MDN"

<!-- end links -->

@reviewed 2022-02-28
