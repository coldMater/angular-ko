<!--
# Angular Roadmap
-->
# Angular 로드맵

<!--
<p class="roadmap-last-updated">Last updated: 2022-05-23</p>

Angular receives a large number of feature requests, both from inside Google and from the broader open-source community.
At the same time, our list of projects contains plenty of maintenance tasks, code refactorings, and potential performance improvements.
We bring together representatives from developer relations, product management, and engineering to prioritize this list.
As new projects come into the queue, we regularly position them based on relative priority to other projects.
As work gets done, projects move up in the queue.

The following projects are not associated with a particular Angular version.
We will release them on completion, and they will be part of a specific version based on our release schedule, following semantic versioning.
For example, features are released in the next minor after they are complete, or the next major if they include breaking changes.
-->
<p class="roadmap-last-updated">최근 업데이트: 2022-05-23</p>

Angular는 Google 내부에서와 오픈 소스 커뮤니티로부터 수많은 기능 추가 요청을 받고 있습니다.
동시에 저희는 프로젝트를 유지하기 위한 작업과 코드 리팩토링, 성능 개선작업 등도 함께 수행하고 있습니다.
또, 개발자들과 소통하는 행사를 준비하기도 하고 솔루션을 관리하는 일들의 우선 순위를 정하기도 합니다.
새로 작업해야 하는 프로젝트 요청이 오면 다른 프로젝트와 비교해서 우선순위를 조정하는 경우도 있습니다.

아래 언급되는 프로젝트들이 특정 Angular 버전과 관련된 것은 아닙니다.
개발이 완료된 프로젝트는 릴리즈 일정에 맞춰 다음 마이너 버전이나 다음 메이저 버전에 들어갑니다.
기능 추가는 다음 마이너 버전에 들어가며, 큰 변동사항은 다음 메이저 버전에 들어갑니다.

<!--
## In progress
-->
## 진행중

<!--
### Implement APIs for optional NgModules
-->
### 옵션 NgModule API 구현

<!--
In the process of making Angular simpler, we are working on introducing APIs that allow developers to initialize applications, instantiate components, and use the router without NgModules. Angular v14 introduces developer preview of the APIs for standalone components, directives, and pipes. In the next few quarters we'll collect feedback from developers and finalize the project making the APIs stable. As the next step we will work on improving use cases such as `TestBed`, Angular elements, etc.
-->

To simplify the Angular mental model and learning journey, we’ll be working on making NgModules optional.
This work lets developers develop standalone components and implement an alternative API for declaring the component’s compilation scope.
We kicked this project off with high-level design discussions that we captured in an [RFC](https://github.com/angular/angular/discussions/43784).



In the process of making Angular simpler, we are working on introducing APIs that allow developers to initialize applications,
instantiate components, and use the router without NgModules.
Angular v14 introduces developer preview of the APIs for standalone components, directives, and pipes.
In the next few quarters we'll collect feedback from developers and finalize the project making the APIs stable.
As the next step we will work on improving use cases such as `TestBed`, Angular elements, etc.

Angular를 더 간단하게 적용할 수 있도록 애플리케이션을 초기화하거나, 컴포넌트 인스턴스를 생성하고, NgModule 없이도 라우터를 사용할 수 있는 API를 준비하고 있습니다.
Angular 14 버전에 도입된 단독 컴포넌트/디렉티브/파이프가 이런 API 중 일부입니다.
조만간 이 API들에 대한 피드백을 받아서 API를 확정여부를 검토하겠습니다.
그 다음에는 `TestBed`나 Angular 엘리먼트에도 적용하는 것을 계획하고 있습니다.

<!--
### Improve image performance
-->
### 이미지 처리 성능 개선

<!--
The [Aurora](https://web.dev/introducing-aurora/) and the Angular teams are working on the implementation of an image directive that aims to improve [Core Web Vitals](https://web.dev/vitals). Currently, the project is in a prototyping phase and the teams are validating the image directive with partners.
-->
Angular 팀은 [웹 기본 지표](https://web.dev/vitals)를 개선하기 위해 [Aurora](https://web.dev/introducing-aurora/)와 협력하면서 이미지 디렉티브를 도입하려고 합니다.
아직은 프로토타입 단계이며, 서드파티 유효성을 검증하고 있습니다.

<!--
### Investigate micro frontend architecture for scalable development processes
-->
### 확장가능한 개발 프로세스를 위해 마이크로 프론트엔드 아키텍처 조사

<!--
We conducted a series of 40 interviews to understand the requirements for micro-frontend architecture of the community. We followed up with a broader community survey. As the next step, we'll share analysis of the results publicly.
-->
Angular 팀은 약 40명 정도를 인터뷰하면서 마이크로-프론트엔드 아키텍처 도입을 검토했습니다.
이후에는 커뮤니티 설문조사도 계획하고 있습니다.
조만간 조사 결과를 공유하겠습니다.

<!--
### Investigate modern bundles
-->
### 최신 번들링 기술 검토

<!--
To improve development experience by speeding up build times research modern bundles.
As part of the project experiment with [esbuild](https://esbuild.github.io) and other open source solutions, compare them with the state of the art tooling in Angular CLI, and report the findings. In Angular v14 we're releasing an [experimental support](https://github.com/angular/angular-cli/pull/22995) for esbuild. Next, the team will focus on validating the new prototype and implementing watch and Sass support.
-->
빌드 속도를 개선해서 개발 경험을 향상시키기 위해 최신 번들링 기술을 조사하고 있습니다.
[esbuild](https://esbuild.github.io) 등을 검토하고 있으며, Angular CLI와의 호환성도 검토하고 있습니다.
최근에는 Angular 14 버전을 내면서 esbuild를 [시험 지원](https://github.com/angular/angular-cli/pull/22995)하기도 했습니다.
지금은 그 다음 단계로 새로운 프로토타입을 개발하고 있으며 Sass 지원도 진행하고 있습니다.


<!--
### Modern CSS
-->
### 최신 CSS 기술

<!--
The Web ecosystem evolves constantly and we want to reflect the latest modern standards in Angular. In this project we aim to provide guidelines on using modern CSS features in Angular to ensure developers follow best practices for layout, styling, etc.
-->
웹 생태계는 끊임없이 진화하고 있기 때문에 Angular에도 최신 표준을 계속 도입하고 싶습니다.
이 프로젝트는 최신 CSS 기능을 Angular에 도입해서 레이아웃, 스타일을 최적의 방식으로 구현하는 것이 목표입니다.

<!--
### Support adding directives to host elements
-->
### 호스트 엘리먼트에 디렉티브 추가하기

<!--
A [long-standing feature request](https://github.com/angular/angular/issues/8785) is to add the ability to add directives to host elements.
The feature lets developers augment their own components with additional behaviors without using inheritance.
The project requires substantial effort in terms of the definition of APIs, semantics, and implementation.
-->
호스트 엘리먼트에 디렉티브를 추가하는 기능은 [오래도록 해결되지 않은 요청사항](https://github.com/angular/angular/issues/8785) 이었습니다.
이 기능이 도입되면 커스텀 컴포넌트를 상속하지 않아도 원하는 기능을 쉽게 추가할 수 있을 것입니다.
API 정의, 문법 검토, 로직 구현에 큰 노력이 필요한 프로젝트입니다.


<!--
### Better stack traces
-->
### 스택 트레이스 개선

<!--
The Angular and the Chrome DevTools are working together to enable more readable stack traces for error messages.
-->
Angular 팀은 Chrome DevTools 개발팀과 협력하면서 에러 메시지로 표시되는 스택 트레이스를 개선하고 있습니다.

<!--
### New CDK primitives
-->
### 새로운 CDK 기본 타입

<!--
We are working on new CDK primitives to facilitate creating custom components based on the WAI-ARIA design patterns for [Listbox](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox) and [Combobox](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox). Angular v14 introduced stable [menu and dialog primitives](https://material.angular.io/cdk/categories) as part of this project.
-->
Angular 팀은 [리스트 박스](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox)와 [콤보박스](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox)가 WAI_ARIA 디자인 패턴을 잘 준수할 수 있도록 개선하는 작업을 진행하고 있습니다.
이 프로젝트의 중간 결과물로 Angular 14 버전에는 [메뉴와 다이얼로그 기본 타입](https://material.angular.io/cdk/categories)이 추가되었습니다.

<!--
### Enhanced Angular Material components by integrating MDC Web
-->
### MDC Web으로 Angular Material 컴포넌트 통합 개선

<!--
[MDC Web](https://material.io/develop/web) is a library created by the Google Material Design team that provides reusable primitives for building Material Design components.
The Angular team is incorporating these primitives into Angular Material.
Using MDC Web aligns Angular Material more closely with the Material Design specification, expand accessibility, improve component quality, and improve the velocity of our team.
-->
[MDC Web](https://material.io/develop/web)은 매터리얼 디자인 컴포넌트를 만들 때 재사용 가능한 기본 요소를 제공하기 위해 Google 매터리얼 디자인 팀이 만든 라이브러리입니다.
Angular 팀도 이 기본 요소를 도입하여 Angular Material을 만들었습니다.
Angular 팀은 지금보다 더 디자인 의도에 맞게 스펙을 준수하고, 접근성을 개선하며, 컴포넌트의 사용성을 높이는 방향으로 Angular Material을 개선하고 있습니다.


<!--
### Angular component accessibility
-->
### Angular 컴포넌트 접근성

<!--
We are evaluating components in Angular Material against accessibility standards such as WCAG and working to fix any issues that arise from this process.
-->
Angular Material로 제공되는 컴포넌트가 WCAG와 같은 표준을 만족할 수 있도록 접근성을 개선하는 작업을 진행하고 있습니다.

<!--
### Documentation refactoring
-->
### 문서 리팩토링

<!--
Ensure all existing documentation fits into a consistent set of content types. Update excessive use of tutorial-style documentation into independent topics. We want to ensure the content outside the main tutorials is self-sufficient without being tightly coupled to a series of guides. In Q2 2022, we refactored the [template content](https://github.com/angular/angular/pull/45897). The next steps are to introduce better structure for components and dependency injection.
-->
Angular 가이드 문서가 일관되게 작성되었는지 전체 문서를 점검하고 있습니다.
그리고 튜토리얼 방식의 문서 중 복잡한 내용은 개별 주제로 분리하는 작업도 진행하고 있습니다.
Angular 팀이 원하는 것은 메인 주제를 벗어나는 내용은 독립적으로 분리하는 것입니다.
그래서 [템플릿](https://github.com/angular/angular/pull/45897) 문서의 내용을 리팩토링하는 작업을 2022년 2분기에 완료했습니다.
다음 단계는 컴포넌트와 의존성 주입에 대한 문서를 손보는 것입니다.


<!--
## Future
-->
## 진행 예정

<!--
### Explore hydration and server-side rendering usability improvements
-->
### 하이드레이션(hydration), 서버사이드 렌더링 사용성 개선

<!--
As part of this effort we'll explore the problem space of hydration with server-side rendering, different approaches, and opportunities for Angular. As outcome of this project we'll have validation of the effort as well as a plan for action.
-->
Angular 팀은 서버 사이드 렌더링과 관련된 하이드레이션(hydration) 문제를 개선하고 있습니다.
이 프로젝트는 조금씩 진전을 보이고 있습니다.

<!--
### Revamp performance dashboards to detect regressions
-->
### 성능 대시보드 개선

<!--
We have a set of benchmarks that we run against every code change to ensure Angular aligns with our performance standards.
To ensure the runtime of the framework does not regress after a code change, we need to refine some of the existing infrastructure the dashboards step on.
-->
저희는 Angular 코드가 변경될 때마다 성능 표준을 측정하는 벤치마크 대시보드를 운영하고 있습니다.
지금은 재귀와 관련된 동작에 아쉬운 부분이 있기 때문에 이 대시보드를 개선하는 작업도 진행하고 있습니다.

<!--
### Leverage full framework capabilities with Zone.js opt-out
-->
### Zone.js 제거

<!--
We are going to design and implement a plan to make Zone.js optional from Angular applications.
This way, we simplify the framework, improve debugging, and reduce application bundle size.
Additionally, this lets us take advantage of built-in async/await syntax, which currently Zone.js does not support.
-->
Angular 팀은 현재 Angular 애플리케이션에 Zone.js가 필수인 것을 걷어내는 작업을 계획하고 있습니다.
이 작업이 끝나면 프레임워크가 더 간단해지고, 디버깅이 쉬워지며, 애플리케이션을 빌드한 후의 용량도 줄어들 것입니다.
그리고 현재 Zone.js가 지원하지 않는 async/await 문법도 활용할 수 있게 될 것입니다.


<!--
### Improved build performance with ngc as a tsc plugin distribution
-->
### ngc를 tsc 플러그인 형태로 전환해서 빌드 성능 개선

<!--
Distributing the Angular compiler as a plugin of the TypeScript compiler will substantially improve build performance for developers and reduce maintenance costs.
-->
Angular 컴파일러를 TypeScript 컴파일러의 플러그인 형태로 전환하고 있습니다.
빌드 성능은 향상되고 유지보수 비용도 줄어들 것입니다.


<!--
### Ergonomic component level code-splitting APIs
-->
### 더 나은 컴포넌트 레벨 코드 분할

<!--
A common problem with web applications is their slow initial load time.
A way to improve it is to apply more granular code-splitting on a component level.
To encourage this practice, we will be working on more ergonomic code-splitting APIs.
-->
웹 애플리케이션은 초기 로드 시간이 오래걸린다는 것이 일반적인 문제점입니다.
이것을 개선하기 위해 컴포넌트 계층에서 코드를 나누는 작업을 하고 있습니다.

<!--
### Ensure smooth adoption for future RxJS changes (version 8 and beyond)
-->
### RxJS 도입 지원(8 버전부터)

<!--
We want to ensure Angular developers are taking advantage of the latest capabilities of RxJS and have a smooth transition to the next major releases of the framework.
For this purpose, we will explore and document the scope of the changes in v7 and beyond RxJS, and plan an update strategy.
-->
Angular 팀은 RxJS의 메이저 버전이 새로 나오면 이 버전을 도입해서 최신 기능을 활용할 수 있도록 돕고 싶습니다.
그래서 Angular 7 버전부터 RxJS를 방대하게 문서로 다루고 있으며 RxJS 업그레이드 정책도 확실하게 준비했습니다.

<!--
### Introduce dependency injection debugging APIs
-->
### 의존성 주입 디버깅 API 추가

<!--
To improve the debugging utilities of Angular and Angular DevTools, we'll work on APIs that provide access the dependency injection runtime. As part of the project we'll expose debugging methods that allow us to explore the injector hierarchy and the dependencies across their associated providers.
-->
To improve the debugging utilities of Angular and Angular DevTools, we'll work on APIs that provide access the dependency injection runtime.
As part of the project we'll expose debugging methods that allow us to explore the injector hierarchy and the dependencies across
their associated providers.

Angular, Angular DevTools를 활용하는 디버깅 작업을 개선하기 위해, 실행시점에 의존성 주입 시스템에 접근할 수 있는 API를 추가하고 있습니다.
이 작업이 끝나면 인젝터 계층이나 프로바이더를 디버깅할 수 있는 메서드가 도입될 것입니다.


<!--
### Support two-dimensional drag-and-drop
-->
### 2차원 드래그-앤-드롭 지원

<!--
As part of this project we'd like to implement mixed orientation support for the Angular CDK drag and drop. This is one of the most highly [requested features](https://github.com/angular/components/issues/13372) in the repository.
-->
이 프로젝트는 Angular CDK 드래그&드롭을 개선하기 위한 것입니다.
Angular 요구사항 중 [가장 많은 요청이 있던 기능](https://github.com/angular/components/issues/13372)입니다.


<!--
<details class="completed-details" open="true">
  <summary>
    <h2>Completed</h2>
    <span class="actions">
      <span class="action-expand">Show all</span>
      <span class="action-collapse">Hide all</span>
      <i class="material-icons expand">expand_more</i>
    </span>
  </summary>
  <div class="details-content">
-->
<details class="completed-details" open="true">
  <summary>
    <h2>작업 완료</h2>
    <span class="actions">
      <span class="action-expand">펼치기</span>
      <span class="action-collapse">숨기기</span>
      <i class="material-icons expand">더 보기</i>
    </span>
  </summary>
  <div class="details-content">


<!--
### Allow binding to protected fields in templates
-->
### 템플릿에서 `protected` 필드 바인딩

<!--
*Completed Q2 2022*

To improve the encapsulation of Angular components we enabled binding to protected members of the component instance. This way you'll no longer have to expose a field or a method as public to use it inside your templates.
-->
*2022년 2분기에 완료2*

Angular 컴포넌트의 캡슐화를 개선하기 위해 컴포넌트 인스턴스의 `protected` 멤버를 바인딩할 수 있도록 수정했습니다.
이제 템플릿에 바인딩하기 위해 컴포넌트의 멤버를 `public`으로 변경하지 않아도 됩니다.


<!--
### Publish guides on advanced concepts
-->
### 개선된 개념으로 가이드 문서 갱신

<!--
*Completed Q2 2022*

Develop and publish an in-depth guide on change detection.
Develop content for performance profiling of Angular applications.
Cover how change detection interacts with Zone.js and explain when it gets triggered, how to profile its duration, as well as common practices for performance optimization.
-->
*2022년 2분기에 완료*

변화 감지를 자세하게 분석하는 가이드 문서를 준비해서 배포했습니다.
Angular 애플리케이션의 성능을 측정하는 방법도 포함되어 있으며, Angular의 변화 감지 싸이클이 Zone.js와 어떻게 상호작용하는지, 변화 감지가 언제 실행되는지, 변화 감지가 실행되는 것을 어떻게 분석할 수 있는지, 성능을 최적화하려면 어떻게 해야 하는지 설명하는 문서를 준비했습니다.

<!--
### Rollout strict typings for `@angular/forms`
-->
### `@angular/forms`에 마이그레이션 툴 지원

<!--
*Completed Q2 2022*

In Q4 2021 we designed a solution for introducing strict typings for forms and in Q1 2022 we concluded the corresponding [request for comments](https://github.com/angular/angular/discussions/44513).
Currently, we are implementing a rollout strategy with an automated migration step that will enable the improvements for existing projects.
We are first testing the solution with more than 2,500 projects at Google to ensure a smooth migration path for the external community.
-->
*2022년 2분기에 완료*

Angular 팀은 2021년 4분기부터 폼에 엄격한 타입을 도입하는 것을 검토했고 2022년 1분기에 [이 검토안](https://github.com/angular/angular/discussions/44513)을 확정했습니다.
현재는 기존 프로젝트를 자동으로 마이그레이션할 수 있는 툴도 제공하고 있습니다.
이 프로젝트를 성공적으로 완성하기 위해 Google 내외부의 2,500개 이상의 프로젝트를 테스트했습니다.


<!--
### Remove legacy [View Engine](guide/glossary#ve)
-->
### 레거시 [View Engine](guide/glossary#ve) 제거

<!--
*Completed Q1 2022*

After the transition of all our internal tooling to Ivy is completed, we will remove the legacy View Engine for reduced Angular conceptual overhead, smaller package size, lower maintenance cost, and lower codebase complexity.
-->
*2022년 1분기에 완료*

내부 툴이 모두 Ivy로 전환되었기 때문에 기존에 사용하던 View Engine을 완전히 제거하고 있습니다.
이 작업이 끝나면 Angular의 구조도 간단해지고, 패키지 크기도 줄어들며, 유지보수 비용은 줄어들고, 코드의 복잡성도 줄어들 것입니다.

<!--
### Simplified Angular mental model with optional NgModules
-->
### Angular 개념 모델 단순화 - NgModule 생략하기

<!--
*Completed Q1 2022*

To simplify the Angular mental model and learning journey, we will be working on making NgModules optional.
This work lets developers develop standalone components and implement an alternative API for declaring the compilation scope of the component.
We kicked this project off with high-level design discussions that we captured in an [RFC](https://github.com/angular/angular/discussions/43784).
-->
*2022년 1분기에 완료*

Angular의 개념 모델을 단순화하고 입문자에게 더 쉬운 설명을 하기 위해 NgModule을 생략할 수 있도록 작업했습니다.
이제 NgModule 없이도 동작하는 컴포넌트를 구현할 수 있습니다.
논의가 이루어졌던 [문서](https://github.com/angular/angular/discussions/43784)도 확인해 보세요.


<!--
### Design strict typing for `@angular/forms`
-->
### `@angular/forms`에 업격한 타입 정의 추가

<!--
*Completed Q1 2022*

We will work on finding a way to implement stricter type checking for reactive forms with minimal backward incompatible implications.
This way, we let developers catch more issues during development time, enable better text editor and IDE support, and improve the type checking for reactive forms.
-->
*2022년 1분기에 완료*

Angular 팀은 하위 버전 호환성을 유지한 채로 반응형 폼에 강력한 타입 체크를 추가하는 방법을 찾기 위해 고심했습니다.
이제는 개발 중에도 이슈를 빠르게 확인할 수 있으며, 텍스트 에디터/IDE의 지원을 받아 강력한 타입 검사 기능을 활용할 수 있습니다.

<!--
### Improve integration of Angular DevTools with framework
-->
### Angular Devtools 통합 개선

<--
*Completed Q1 2022*

To improve the integration of Angular DevTools with the framework, we are working on moving the codebase to the [angular/angular](https://github.com/angular/angular) monorepository.
This includes transitioning Angular DevTools to Bazel and integrating it into the existing processes and CI pipeline.
-->
*2022년 1분기에 완료*

Angular DevTools를 프레임워크와 통합하여 [angular/angular](https://github.com/angular/angular) 코드저장소 하나로 합치는 작업을 마무리했습니다.
이제 Angular DevTools는 현재 Angular에서 사용하는 CI 파이프라인에 통합되었습니다.

<!--
### Launch advanced compiler diagnostics
-->
### 컴파일러 분석 기능 강화

<!--
*Completed Q1 2022*

Extend the diagnostics of the Angular compiler outside type checking.
Introduce other correctness and conformance checks to further guarantee correctness and best practices.
-->
*2022년 1분기에 완료*

Angular 컴파일러가 수행하는 타입 검사 외의 분석 기능을 강화했습니다.
더 나은 정확성과 모범 사례를 도입하기 위해 추가 검사를 도입했습니다.


<!--
### Update our e2e testing strategy
-->
### e2e 테스트 정책 변경

<!--
*Completed Q3 2021*

To ensure we provide a future-proof e2e testing strategy, we want to evaluate the state of Protractor, community innovations, e2e best practices, and explore novel opportunities.
As first steps of the effort, we shared an [RFC](https://github.com/angular/protractor/issues/5502) and worked with partners to ensure smooth integration between the Angular CLI and state of the art tooling for e2e testing.
As the next step, we need to finalize the recommendations and compile a list of resources for the transition.
-->
*2021년 3분기에 완료*

앞으로도 계속 사용할 e2e 테스트 정책을 마련하기 위해 Protractor의 현재는 어떤지, 커뮤니티의 의견은 어떤지, e2e 모범 사례는 어떤 것이 있는지 방대하게 조사했습니다.
그 첫 걸음으로 저희는 [RFC](https://github.com/angular/protractor/issues/5502)를 공유하며 이 내용으로 Angular CLI와 e2e 테스트 툴간의 협력을 추진하고 있습니다.
다음 단계는 e2e 테스트에 사용할 툴을 확정하는 것입니다.

<!--
### Angular libraries use Ivy
-->
### Angular 라이브러리가 Ivy를 사용하도록 전환

<!--
*Completed Q3 2021*

Earlier in 2020, we shared an [RFC](https://github.com/angular/angular/issues/38366) for Ivy library distribution.
After invaluable feedback from the community, we developed a design of the project.
We are now investing in the development of Ivy library distribution, including an update of the library package format to use Ivy compilation, unblock the deprecation of the View Engine library format, and [ngcc](guide/glossary#ngcc).
-->
*2021년 3분기에 완료*

2020년 초에 저희는 Ivy 라이브러리를 배포한다는 [RFC](https://github.com/angular/angular/issues/38366)를 공유했습니다.
그 이후로 커뮤니티에서 받은 피드백을 참고해서 프로젝트를 좀 더 진행했습니다.
이제 Angular 팀이 배포하는 라이브러리들은 Ivy로 개발되며 Ivy와 호환성을 맞추어 컴파일됩니다.
View Engine 라이브러리 형식과 [ngcc](guide/glossary#ngcc)은 더이상 사용하지 않습니다.


<!--
### Improve test times and debugging with automatic test environment tear down
-->
### 테스트 성능 개선, 테스트 환경 자동 초기화

<!--
*Completed Q3 2021*

To improve test time and create better isolation across tests, we want to change [`TestBed`](api/core/testing/TestBed) to automatically clean up and tear down the test environment after each test run.
-->
*2021년 3분기에 완료*

테스트에 걸리는 시간을 줄이고 테스트 스펙마다 격리된 실행 컨텍스트를 유지하기 위해 [`TestBed`](api/core/testing/TestBed)가 개별 테스트 실행 후에 실행 컨텍스트를 자동 정리하도록 개선했습니다.


<!--
### Deprecate and remove IE11 support
-->
### IE11 지원 중단

<!--
*Completed Q3 2021*

Internet Explorer 11 \(IE11\) has been preventing Angular from taking advantage of some of the modern features of the Web platform.
As part of this project we are going to deprecate and remove IE11 support to open the path for modern features that evergreen browsers provide.
We ran an [RFC](https://github.com/angular/angular/issues/41840) to collect feedback from the community and decide on next steps to move forward.
-->
*2021년 3분기에 완료*

Internet Explorer 11 \(IE11\)는 Angular가 최신 웹 플랫폼이 활용할 수 있는 기능을 제공하는 데에 방해가 되고 있었습니다.
커뮤니티 피드백은 [RFC](https://github.com/angular/angular/issues/41840)를 통해 진행되었으며 결국 저희는 IE11 지원을 완전히 끝내고 최신 브라우저 환경을 제대로 활용하기로 결정했습니다.


<!--
### Leverage ES2017+ as the default output language
-->
### 기본 언어 스펙을 ES2017+ 로 변경

<!--
*Completed Q3 2021*

Supporting modern browsers lets us take advantage of the more compact, expressive, and performant new syntax of JavaScript.
As part of this project we will investigate what the blockers are to moving forward with this effort, and take the steps to enable it.
-->
*2021년 3분기에 완료*

최신 브라우저에서는 더 간단한 코드로도 더 간결하고 성능 좋은 JavaScript 문법을 활용할 수 있습니다.
이제 Angular에서도 최신 문법을 활용할 수 있습니다.

<!--
### Accelerated debugging and performance profiling with Angular DevTools
-->
### Angular Devtools로 디버깅하기, 성능 분석하기

<!--
*Completed Q2 2021*

We are working on development tooling for Angular that provides utilities for debugging and performance profiling.
This project aims to help developers understand the component structure and the change detection in an Angular application.
-->
*2021년 2분기에 완료*

Angular 애플리케이션을 디버깅하거나 성능을 분석할 때 활용할 툴을 준비했습니다.
이 툴을 활용하면 컴포넌트 구조를 쉽게 이해할 수 있고 Angular 애플리케이션의 변화 감지도 분석하기 쉬워집니다.




<!--
### Streamline releases with consolidated Angular versioning & branching
-->
### Angular 버전 정책, 브랜치 정책 통합 & 간소화

<!--
*Completed Q2 2021*

We want to consolidate release management tooling between the multiple GitHub repositories for Angular \([angular/angular](https://github.com/angular/angular), [angular/angular-cli](https://github.com/angular/angular-cli), and [angular/components](https://github.com/angular/components)\).
This effort lets us reuse infrastructure, unify and simplify processes, and improve the reliability of our release process.
-->
*2021년 2분기에 완료*

저희는 GitHub 코드저장소 여러 곳([angular/angular](https://github.com/angular/angular), [angular/angular-cli](https://github.com/angular/angular-cli), [angular/components](https://github.com/angular/components))에
Angular 구성요소를 배포하고 있습니다.
이 작업이 마무리되면서 기존에 있던 인프라 구조를 재사용할 수 있게 되었고, 배포 프로세스를 통합하면서 간소화하고, 안정성을 개선했습니다.


<!--
### Higher developer consistency with commit message standardization
-->
### 커밋 메시지 표준 개선

<!--
*Completed Q2 2021*

We want to unify commit message requirements and conformance across Angular repositories \([angular/angular](https://github.com/angular/angular), [angular/components](https://github.com/angular/components), and [angular/angular-cli](https://github.com/angular/angular-cli)\) to bring consistency to our development process and reuse infrastructure tooling.
-->
*2021년 2분기에 완료*

여러 Angular 코드 저장소([angular/angular](https://github.com/angular/angular), [angular/components](https://github.com/angular/components), [angular/angular-cli](https://github.com/angular/angular-cli))들 간에 일관된 커밋 메시지를 작성할 수 있도록 개선하면서 개발 프로세스를 통합하고 기존에 있던 인프라 구조를 재사용하기 좋게 만들었습니다.


<!--
### Transition the Angular language service to Ivy
-->
### Angular 언어 지원 서비스를 Ivy로 전환

<!--
*Completed Q2 2021*

The goal of this project is to improve the experience and remove legacy dependency by transitioning the language service to Ivy.
Today the language service still uses the View Engine compiler and type checking, even for Ivy applications.
We want to use the Ivy template parser and improved type checking for the Angular Language service to match application behavior.
This migration is also a step towards unblocking the removal of View Engine, which will simplify Angular, reduce the npm package size, and improve the maintainability of the framework.
-->
*2021년 2분기에 완료*

이 프로젝트의 목표는 언어 지원 서비스를 Ivy로 완전히 전환해서 개발 경험을 개선하고 레거시 의존성을 제거하는 것이었습니다.
이전까지는 Ivy 애플리케이션에서도 View Engine 컴파일러를 사용하는 언어 지원 서비스로 타입을 검사했습니다.
이제는 Ivy 템플릿 파서를 활용하며 애플리케이션에서 사용하는 것과 같은 컴파일러를 활용하는 Angular 언어 지원 서비스로 타입을 검사합니다.
이 작업이 완료되면서 View Engine을 제거하는 것에 걸림돌이 없어졌고, Angular를 좀 더 간단하게 유지하면서 npm 패키지 크기를 줄였고 프레임워크의 유지보수성도 향상시켰습니다.

<!--
### Increased security with native Trusted Types in Angular
-->
### 네이티브 Trusted Types로 보안 강화하기

<!--
*Completed Q2 2021*

In collaboration with the Google security team, we are adding support for the new [Trusted Types](https://web.dev/trusted-types) API.
This web platform API helps developers build more secure web applications.
-->
*2021년 2분기에 완료*

Google 보안 팀과 함께 작업한 결과, 새로운 [Trusted Types](https://web.dev/trusted-types) API를 지원하게 되었습니다.
이제 Angular API를 활용해서 더 안전한 웹 애플리케이션을 만들 수 있습니다.


<!--
### Optimized build speed and bundle sizes with Angular CLI webpack 5
-->
### Angular CLI webpack 5를 활용해서 빌드 속도, 빌드 결과물 크기 개선하기

<!--
*Completed Q2 2021*

As part of the v11 release, we introduced an opt-in preview of webpack 5 in the Angular CLI.
To ensure stability, we will continue iterating on the implementation to enable build speed and bundle size improvements.
-->
*2021년 2분기에 완료*

11버전 릴리즈와 함께 Angular CLI가 활용하는 webpack 버전을 5 preview로 변경했습니다.
안정성과 빌드 속도가 향상되었으며 빌드 결과물의 용량도 줄어들었습니다.

<!--
### Faster apps by inlining critical styles in Universal applications
-->
### Universal 애플리케이션에 초기 인라인 스타일을 내장하면서 속도 향상

<!--
*Completed Q1 2021*

Loading external stylesheets is a blocking operation, which means that the browser cannot start rendering your application until it loads all the referenced CSS.
Having render-blocking resources in the header of a page can significantly impact its load performance, for example, its [first contentful paint](https://web.dev/first-contentful-paint).
To make apps faster, we have been collaborating with the Google Chrome team on inlining critical CSS and loading the rest of the styles asynchronously.
-->
*2021년 1분기에 완료*

외부 스타일시트를 불러오는 것은 메인 스레드를 막는 작업이기 때문에, 브라우저는 외부 CSS를 로드하기 전까지 애플리케이션 렌더링을 시작할 수 없습니다.
이렇게 렌더링을 막는 리소스 요청은 초기 로드 성능에 큰 문제가 되었으며, 특히 [첫 번째 의미있는 페인팅](https://web.dev/first-contentful-paint/)인 경우에 특히 그랬습니다.
이제 애플리케이션을 빠르게 실행하기 위해 GooGle Chrome 팀과 협력하면서 중요한 CSS를 내장하고 나머지 스타일은 비동기 로드하는 방식으로 개선했습니다.


<!--
### Improve debugging with better Angular error messages
-->
### Angular 에러 메시지 개선

<!--
*Completed Q1 2021*

Error messages often bring limited actionable information to help developers resolve them.
We have been working on making error messages more discoverable by adding associated codes, developing guides, and other materials to ensure a smoother debugging experience.
-->
*2021년 1분기에 완료*

에러 메시지는 개발자가 문제를 해결하는 데에 도움이 되는 정보를 제공해야 합니다.
그래서 저희는 어떤 코드가 문제인지, 어떤 문서를 확인하면 좋은지 제공하는 방식으로 에러 메시지를 개선했습니다.


<!--
### Improved developer onboarding with refreshed introductory documentation
-->
### 입문자용 가이드 문서 개선

<!--
*Completed Q1 2021*

We will redefine the user learning journeys and refresh the introductory documentation.
We will clearly state the benefits of Angular, how to explore its capabilities and provide guidance so developers can become proficient with the framework in as little time as possible.
-->
*2021년 1분기에 완료*

입문자용 가이드 문서를 새로 정리했습니다.
이전보다 Angular의 장점을 이해하기 쉽게 풀어냈고, 적은 시간을 들여도 Angular가 제공하는 기능을 쉽게 알아볼 수 있도록 개선했습니다.


<!--
### Expand component harnesses best practices
-->
### 컴포넌트 하네스 모범사례 추가

<!--
*Completed Q1 2021*

Angular CDK introduced the concept of [component test harnesses](https://material.angular.io/cdk/test-harnesses) to Angular in version 9.
Test harnesses let component authors create supported APIs for testing component interactions.
We are continuing to improve this harness infrastructure and clarifying the best practices around using harnesses.
We are also working to drive more harness adoption inside of Google.
-->
*2021년 1분기에 완료*

Angular CDK는 9버전부터 [컴포넌트 테스트 하네스](https://material.angular.io/cdk/test-harnesses)라는 개념을 도입했습니다.
테스트 하네스를 활용하면 컴포넌트를 만드는 개발자가 테스트 기능과 상호작용하는 데에 도움이 됩니다.
저희는 이 하네스 구조를 나은 방향으로 개선하면서 모범 사례를 더 찾을 수 있도록 노력하고 있습니다.
이렇게 만든 테스트 하네스는 Google 내부에서 활용할 계획도 갖고 있습니다.


<!--
### Author a guide for content projection
-->
### 컨텐츠 프로젝션 가이드 문서 추가

<!--
*Completed Q2 2021*

Content projection is a core Angular concept that does not have the presence it deserves in the documentation.
As part of this project we want to identify the core use cases and concepts for content projection and document them.
-->
*2021년 2분기에 완료*

컨텐츠 프로젝션은 Angular의 핵심 기능이었지만 아직 문서가 제공되지 않았습니다.
이번 프로젝트를 진행하면서 기본 활용방법을 설명하고 개념을 자세하게 설명하는 문서를 추가했습니다.


<!--
### Migrate to ESLint
-->
### ESLint 마이그레이션

<!--
*Completed Q4 2020*

With the deprecation of TSLint we will be moving to ESLint.
As part of the process, we will work on ensuring backward compatibility with our current recommended TSLint configuration, implement a migration strategy for existing Angular applications and introduce new tooling to the Angular CLI toolchain.
-->
*2020년 4분기에 완료*

TSLint 지원이 중단됨에 따라 Angular도 ESLint로 Lint 툴을 변경했습니다.
이 과정에서 하위 호환성을 맞추기 위해 현재 권장하는 TSLint 설정을 정리했으며, 마이그레이션 정책을 제공하면서 새로운 툴을 Angular CLI 툴체인 안으로 자연스럽게 도입했습니다.


<!--
### Operation Bye Bye Backlog (also known as Operation Byelog)
-->
### 백로그 정리 작업 (aka. Byelog 프로젝트))

<!--
*Completed Q4 2020*

We are actively investing up to 50% of our engineering capacity on triaging issues and PRs until we have a clear understanding of broader community needs.
After that, we will commit up to 20% of our engineering capacity to keep up with new submissions promptly.
-->
*2020년 4분기에 완료*

저희는 광범위한 커뮤니티 요구사항을 명확하게 이해하기 위해 이슈와 PR을 분류하는 데에 엔지니어링 역량의 50% 정도를 적극적으로 투자하고 있습니다.
이제는 새로운 작업을 더 빠르게 처리하기 위해 엔지니어링 역량을 20% 더 투자하려는 계획을 갖고 있습니다.


  </div>
</details>

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
