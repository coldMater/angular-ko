<!--
# Setup for upgrading from AngularJS
-->
# AngularJS에서 업그레이드하기

<!--
Question: Can we remove this file and instead direct readers to https://github.com/angular/quickstart/blob/master/README.md
-->

<div class="alert is-critical">

<!--
**Audience:** Use this guide **only** in the context of  [Upgrading from AngularJS](guide/upgrade "Upgrading from AngularJS to Angular") or [Upgrading for Performance](guide/upgrade-performance "Upgrading for Performance").
Those Upgrade guides refer to this Setup guide for information about using the [deprecated QuickStart GitHub repository](https://github.com/angular/quickstart "Deprecated Angular QuickStart GitHub repository"), which was created prior to the current Angular [CLI](cli "CLI Overview").

**For all other scenarios,** see the current instructions in [Setting up the Local Environment and Workspace](guide/setup-local "Setting up for Local Development").
-->
**주의:** 이 가이드에서 설명하는 내용은 [AngularJS 앱을 Angular 앱으로 업그레이드하기](guide/upgrade "Upgrading from AngularJS to Angular") 문서와 [업그레이드 방식과 성능의 관계](guide/upgrade-performance "Upgrading for Performance") 문서의 상황에서만 유효합니다.
이 업그레이드 가이드 문서는 [이제 사용하지 않는 QuickStart GitHub 저장소](https://github.com/angular/quickstart "Deprecated Angular QuickStart GitHub repository")를 기준으로 설명하는데, 이 문서는 [Angular CLI](cli "CLI Overview")가 지금처럼 중요하게 사용되기 이전에 작성되었습니다.

**일반적인 경우라면** [로컬 개발환경, 워크스페이스 구성하기](guide/setup-local "Setting up for Local Development") 문서를 참고하는 것이 더 좋습니다.

</div>

<!--
The <live-example name=quickstart>QuickStart live-coding</live-example> example is an Angular _playground_.
There are also some differences from a local app, to simplify that live-coding experience.
In particular, the QuickStart live-coding example shows just the AppComponent file; it creates the equivalent of app.module.ts and main.ts internally for the playground only.
-->

<!--
This guide describes how to develop locally on your own machine.
Setting up a new project on your machine is quick and easy with the [QuickStart seed on github](https://github.com/angular/quickstart "Install the github QuickStart repo").

**Prerequisite:** Make sure you have [Node.js® and npm installed](guide/setup-local#prerequisites "Angular prerequisites").
-->
이 문서는 [GitHub 저장소에 있는 QuickStart 프로젝트](https://github.com/angular/quickstart "Install the github QuickStart repo")를 기준으로 로컬 머신에 새 프로젝트 환경을 구성하는 내용에 대해 다룹니다.

**사전준비:** [Node.js®와 npm](guide/setup-local#prerequisites "Angular prerequisites")가 꼭 설치되어 있어야 합니다.


{@a clone}
<!--
## Clone
-->
## 저장소 복제

<!--
Perform the _clone-to-launch_ steps with these terminal commands.
-->
터미널에서 다음 명령을 실행하면 _저장소를 복제하고 실행_ 할 수 있습니다.


<code-example language="sh">
  git clone https://github.com/angular/quickstart.git quickstart
  cd quickstart
  npm install
  npm start

</code-example>



<div class="alert is-important">


<!--
`npm start` fails in _Bash for Windows_ in versions earlier than the Creator's Update (April 2017).
-->
크리에이터 업데이트(2017년 4월) 이전 버전의 윈도우 환경에서 _Bash 셸_ 을 사용하면 `npm start` 명령을 실행할 때 에러가 발생합니다.

</div>



{@a download}

<!--
## Download
-->
## 다운로드
<!--
<a href="https://github.com/angular/quickstart/archive/master.zip" title="Download the QuickStart seed repository">Download the QuickStart seed</a>
and unzip it into your project folder. Then perform the remaining steps with these terminal commands.
-->
<a href="https://github.com/angular/quickstart/archive/master.zip" title="Download the QuickStart seed repository">QuickStart seed</a>를 다운받고 quickstart 폴더에 압축을 풉니다.
그리고 터미널에서 다음 명령을 실행합니다.

<code-example language="sh">
  cd quickstart
  npm install
  npm start

</code-example>



<div class="alert is-important">


<!--
`npm start` fails in _Bash for Windows_ in versions earlier than the Creator's Update (April 2017).
-->
크리에이터 업데이트(2017년 4월) 이전 버전의 윈도우 환경에서 _Bash 셸_ 을 사용하면 `npm start` 명령을 실행할 때 에러가 발생합니다.


</div>



{@a non-essential}


<!--
## Delete _non-essential_ files (optional)
-->
## _불필요한_ 파일 삭제하기 (생략 가능)

<!--
You can quickly delete the _non-essential_ files that concern testing and QuickStart repository maintenance
(***including all git-related artifacts*** such as the `.git` folder and `.gitignore`!).


<div class="alert is-important">



Do this only in the beginning to avoid accidentally deleting your own tests and git setup!


</div>



Open a terminal window in the project folder and enter the following commands for your environment:
-->
저장소를 복제했다면 테스트와 관련되거나 QuickStart 저장소에 관련된 _불필요한_ 파일들을 지우는 것이 좋습니다.
(`.git` 폴더나 `.gitignore`와 같이 ***git과 관련된 파일들도*** 지우는 것이 좋습니다!)

<div class="alert is-important">

이 과정은 테스트 스펙을 직접 작성하거나 git 저장소를 직접 설정할 때만 수행하세요.

</div>

프로젝트 폴더에서 터미널을 열고 다음 명령을 실행하세요:


### OS/X (bash)

<code-example language="sh">
  xargs rm -rf &lt; non-essential-files.osx.txt
  rm src/app/*.spec*.ts
  rm non-essential-files.osx.txt

</code-example>



### Windows

<code-example language="sh">
  for /f %i in (non-essential-files.txt) do del %i /F /S /Q
  rd .git /s /q
  rd e2e /s /q

</code-example>



{@a seed}


<!--
## What's in the QuickStart seed?
-->
## QuickStart seed에는 어떤 내용이 있을까요?


<!--
The **QuickStart seed** provides a basic QuickStart playground application and other files necessary for local development.
Consequently, there are many files in the project folder on your machine,
most of which you can [learn about later](guide/file-structure).
-->
**QuickStart seed**는 QuickStart 플레이그라운드와 거의 비슷한 애플리케이션이며, 로컬 개발환경에 맞게 몇 개 파일이 더 추가된 것입니다.
[가이드 문서의 내용](guide/file-structure)을 계속 따라가다 보면 이 프로젝트에 많은 파일들이 추가될 것입니다.

<div class="alert is-helpful">

<!--
**Reminder:** The "QuickStart seed" example was created prior to the Angular CLI, so there are some differences between what is described here and an Angular CLI application.
-->
**명심하세요:** "QuickStart seed" 프로젝트는 Angular CLI가 등장하기 전에 만들어진 프로젝트입니다.
다른 문서에서 설명하는 내용과는 조금 다른 면이 있을 수 있습니다.

</div>

{@a app-files}

<!--
Focus on the following three TypeScript (`.ts`) files in the **`/src`** folder.
-->
**`/src`** 폴더에 있는 TypeScript (`.ts`) 파일 3개에 집중해 봅시다.


<div class='filetree'>

  <div class='file'>
    src
  </div>

  <div class='children'>

    <div class='file'>
      app
    </div>

    <div class='children'>

      <div class='file'>
        app.component.ts
      </div>

      <div class='file'>
        app.module.ts
      </div>

    </div>

    <div class='file'>
      main.ts
    </div>

  </div>

</div>



<code-tabs>

  <code-pane header="src/app/app.component.ts" path="setup/src/app/app.component.ts">

  </code-pane>

  <code-pane header="src/app/app.module.ts" path="setup/src/app/app.module.ts">

  </code-pane>

  <code-pane header="src/main.ts" path="setup/src/main.ts">

  </code-pane>

</code-tabs>


<!--
All guides and cookbooks have _at least these core files_.
Each file has a distinct purpose and evolves independently as the application grows.

Files outside `src/` concern building, deploying, and testing your application.
They include configuration files and external dependencies.

Files inside `src/` "belong" to your application.
Add new Typescript, HTML and CSS files inside the `src/` directory, most of them inside `src/app`,
unless told to do otherwise.

The following are all in `src/`
-->
모든 가이드 문서에는 _이 3개의 파일이_ 반드시 존재합니다.
각 파일에는 독자적인 역할이 있으며, 애플리케이션이 확장되면서 점점 복잡해질 것입니다.

`src/` 폴더 밖에 있는 파일들은 애플리케이션 빌드하거나 배포, 테스트할 때 필요한 파일입니다.
이 파일들은 환경을 설정하거나 외부 의존성을 관리하는 용도로 사용합니다.

`src/` 폴더 안에 있는 파일들은 애플리케이션을 구성하는 파일입니다.
그래서 애플리케이션을 확장하기 위해 새롭게 TypeScript, HTML, CSS을 만들면 `src/` 폴더에 만들게 되며, 특별한 이유가 없다면 `src/app` 폴더에 생성하게 될 것입니다.

위에서 언급한 필수 파일 3개도 `src/` 폴더에 존재합니다.


<style>
  td, th {vertical-align: top}
</style>



<table width="100%">

  <col width="20%">

  </col>

  <col width="80%">

  </col>

  <tr>

    <th>
      <!--
      File
      -->
      파일
    </th>

    <th>
      <!--
      Purpose
      -->
      용도
    </th>

  </tr>

  <tr>

    <td>
      <code>app/app.component.ts</code>
    </td>

    <td>


      <!--
      Defines the same `AppComponent` as the one in the QuickStart playground.
      It is the **root** component of what will become a tree of nested components
      as the application evolves.
      -->
      QuickStart 플레이그라운드 애플리케이션의 `AppComponent`를 정의합니다.
      이 컴포넌트는 애플리케이션 **최상위** 컴포넌트이며 이 컴포넌트를 기준으로 컴포넌트 트리를 구성합니다.

    </td>

  </tr>

  <tr>

    <td>
      <code>app/app.module.ts</code>
    </td>

    <td>

      <!--
      Defines `AppModule`, the  [root module](guide/bootstrapping "AppModule: the root module") that tells Angular how to assemble the application.
      When initially created, it declares only the `AppComponent`.
      Over time, you add more components to declare.
      -->
      [최상위 모듈](guide/bootstrapping "AppModule: the root module") `AppModule`을 정의합니다. Angular는 이 모듈에 정의된 대로 애플리케이션을 구성합니다.
      처음 프로젝트를 생성하고 나면 프로젝트에는 `AppComponent`만 존재합니다.
      그리고 이후에 프로젝트가 커질수록 수많은 컴포넌트가 추가될 것입니다.

    </td>

  </tr>

  <tr>

    <td>
      <code>main.ts</code>
    </td>

    <td>

      <!--
      Compiles the application with the [JIT compiler](guide/glossary#jit) and
      [bootstraps](guide/bootstrapping)
      the application's main module (`AppModule`) to run in the browser.
      The JIT compiler is a reasonable choice during the development of most projects and
      it's the only viable choice for a sample running in a _live-coding_ environment such as Stackblitz.
      Alternative [compilation](guide/aot-compiler), [build](guide/build), and [deployment](guide/deployment) options are available.
      -->
      애플리케이션을 [JIT 컴파일러](guide/glossary#jit)로 빌드하고 브라우저에서 애플리케이션 메인 모듈 (`AppModule`)을 [부트스트랩](guide/bootstrapping)할 때 사용하는 파일입니다.
      프로젝트가 개발단계라면 JIT 컴파일러도 충분히 좋은 선택이며 Stackblitz와 같은 _라이브 코딩_ 환경에서는 JIT 컴파일러만 사용할 수 있습니다.
      [AOT 컴파일러로 대체하는 방법](guide/aot-compiler), [빌드](guide/build), [배포](guide/deployment)하는 방법에 대해서도 확인해 보세요.

    </td>

  </tr>

</table>


<!--
## Appendix: Test using `fakeAsync()/waitForAsync()`
-->
## 부록: `fakeAsync()/waitForAsync()` 활용하기

<!--
If you use the `fakeAsync()/waitForAsync()` helper function to run unit tests (for details, read the [Testing guide](guide/testing-components-scenarios#fake-async)), you need to import `zone.js/dist/zone-testing` in your test setup file.

<div class="alert is-important">
If you create project with `Angular/CLI`, it is already imported in `src/test.ts`.
</div>

And in the earlier versions of `Angular`, the following files were imported or added in your html file:
-->
유닛 테스트를 실행할 때 `fakeAsync()/waitForAsync()` 헬퍼 함수를 사용한다면, 테스트 환경 설정을 위해 `zone.js/dist/zone-testing` 패키지들을 로드해야 합니다.
자세한 내용은 [테스트](guide/testing-components-scenarios#fake-async) 문서를 참고하세요.

<div class="alert is-important">

Angular CLI로 프로젝트를 생성했다면 이 내용은 이미 `src/test.ts` 파일에 구성되어 있습니다.

</div>

이전에는 HTML 파일에서 이 파일들을 직접 로드하기도 했습니다:

```
import 'zone.js/plugins/long-stack-trace-zone';
import 'zone.js/plugins/proxy';
import 'zone.js/plugins/sync-test';
import 'zone.js/plugins/jasmine-patch';
import 'zone.js/plugins/async-test';
import 'zone.js/plugins/fake-async-test';
```

<!--
You can still load those files separately, but the order is important, you must import `proxy` before `sync-test`, `async-test`, `fake-async-test` and `jasmine-patch`. And you also need to import `sync-test` before `jasmine-patch`, so it is recommended to just import `zone-testing` instead of loading those separated files.
-->
이 파일들 중에서 필요한 파일만 로드할 수도 있지만, 로드하는 순서가 중요합니다.
`proxy` 패키지는 `sync-test`, `async-test`, `fake-async-test`, `jasmine-patch`가 로드되기 전에 먼저 로드되어야 합니다.
그리고 `sync-test` 패키지는 `jasmine-patch`가 로드되기 전에 먼저 로드되어야 합니다.
그래서 개별 파일을 로드하지 말고 `zone-testing` 패키지를 한 번에 로드하는 것을 권장합니다.
