<!--
# App shell
-->
# 애플리케이션 기본 틀

<!--
Application shell is a way to render a portion of your application using a route at build time.
It can improve the user experience by quickly launching a static rendered page \(a skeleton common to all pages\) while the browser downloads the full client version and switches to it automatically after the code loads.

This gives users a meaningful first paint of your application that appears quickly because the browser can render the HTML and CSS without the need to initialize any JavaScript.

Learn more in [The App Shell Model](https://developers.google.com/web/fundamentals/architecture/app-shell).
-->
Angular 애플리케이션을 빌드할 때 애플리케이션 자체의 렌더링을 담당하는 부분을 애플리케이션의 기본 틀\(App Shell\)이라고 합니다.
이 기본 틀은 페이지에서 필요한 내용을 브라우저가 다운로드받기 전에 페이지의 기본 구조를 정적으로 먼저 렌더링하는 용도로 사용하는데, 이렇게 구현하면 사용자가 느끼는 사용성이 좀 더 향상됩니다.

그래서 애플리케이션의 기본 틀은 JavaScript 실행 없이 HTML과 CSS로만 구현하는 것이 좋으며, 이렇게 구현해야 "사용자가 의미있다고 판단하는 첫 화면(meaningful first paint of application)"을 빠르게 띄울 수 있습니다.

자세한 내용은 [앱 기본 틀 모델](https://developers.google.com/web/fundamentals/architecture/app-shell) 문서를 참고하세요.

<!--
## Step 1: Prepare the application
-->
## 1단계: 애플리케이션 생성하기

<!--
Do this with the following Angular CLI command:

<code-example format="shell" language="shell">

ng new my-app --routing

</code-example>

For an existing application, you have to manually add the `RouterModule` and defining a `<router-outlet>` within your application.
-->
Angular CLI로 다음 명령을 실행하면 애플리케이션을 생성할 수 있습니다:

<code-example format="shell" language="shell">

ng new my-app --routing

</code-example>

이미 생성된 애플리케이션이라면 `RouterModule`을 추가하고 템플릿에 `<router-outlet>`을 추가하면 됩니다.


<!--
## Step 2: Create the application shell
-->
## 2단계: 애플리케이션 기본 틀 생성하기

<!--
Use the Angular CLI to automatically create the application shell.
-->
다음 명령을 실행하면 애플리케이션의 기본 틀이 생성됩니다.

<code-example format="shell" language="shell">

ng generate app-shell

</code-example>

<!--
For more information about this command, see [App shell command](cli/generate#app-shell-command).

After running this command you can see that the `angular.json` configuration file has been updated to add two new targets, with a few other changes.
-->
이 명령에 대해 자세하게 알아보려면 [앱 셸 명령](cli/generate#app-shell-command) 문서를 참고하세요.

이 명령을 실행하고 나면 `angular.json` 설정 파일에 다음 두 빌드 대상이 추가됩니다.

<code-example language="json">

"server": {
  "builder": "&commat;angular-devkit/build-angular:server",
  "defaultConfiguration": "production",
  "options": {
    "outputPath": "dist/my-app/server",
    "main": "src/main.server.ts",
    "tsConfig": "tsconfig.server.json"
  },
  "configurations": {
    "development": {
      "outputHashing": "none",
    },
    "production": {
      "outputHashing": "media",
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ],
      "sourceMap": false,
      "optimization": true
    }
  }
},
"app-shell": {
  "builder": "&commat;angular-devkit/build-angular:app-shell",
  "defaultConfiguration": "production",
  "options": {
    "route": "shell"
  },
  "configurations": {
    "development": {
      "browserTarget": "my-app:build:development",
      "serverTarget": "my-app:server:development",
    },
    "production": {
      "browserTarget": "my-app:build:production",
      "serverTarget": "my-app:server:production"
    }
  }
}

</code-example>

<!--
## Step 3: Verify the application is built with the shell content
-->
## 3단계: 빌드 확인하기

<!--
Use the Angular CLI to build the `app-shell` target.
-->
이제 다음 명령을 실행해서 `app-shell`이 제대로 빌드되는지 확인해 봅시다.

<code-example format="shell" language="shell">

ng run my-app:app-shell:development

</code-example>

<!--
Or to use the production configuration.
-->
아니면 운영 환경으로 빌드할 수도 있습니다.


<code-example format="shell" language="shell">

ng run my-app:app-shell:production

</code-example>

<!--
To verify the build output, open <code class="no-auto-link">dist/my-app/browser/index.html</code>.
Look for default text `app-shell works!` to show that the application shell route was rendered as part of the output.
-->
빌드 결과물은 <code class="no-auto-link">dist/my-app/browser/index.html</code> 파일로 확인하면 됩니다.
애플리케이션이 제대로 실행된다면 화면에 `app-shell works!`라는 문구가 표시될 것입니다.

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
