---
date: "2023-02-21"
emoji: ✨
title: "ESLint와 Prettier 사용법"
category: "study"
summary: "시작이 반, 팀의 생산성을 높이는 가장 쉬운 방법"
tags: ["web", "manual"]
---

여러 팀원이 한 프로젝트를 함께 개발하다 보면 팀원마다 각기 다른 코딩 스타일을 가지고 있어 코드의 통일성이 무너지기 쉽습니다. 사전에 컨벤션을 맞추어도 자동화가 되어 있지 않은 한, 이를 개발자가 일일이 지키기는 어렵고 성가신 일입니다.

여러 사람이 각자 다른 스타일로 쓴 코드를 해석하는 것에 상당한 시간과 노력을 들인다면 당연히 팀의 생산성은 떨어질 수밖에 없습니다. 따라서 린터와 포맷터를 사용하는 것은 팀으로 일하기 위한 개발자의 올바른 마음가짐입니다.

자바스크립트에서는 린터로는 **ESLint**를, 포맷터로는 **Prettier**를 일반적으로 사용합니다. ESLint는 코드 자체의 문법 교정뿐만 아니라 코드 스타일링 기능도 포함하고 있습니다. 하지만 워낙 Prettier라는 강력한 포맷터가 있기에 린팅은 ESLint가 포맷팅은 Prettier가 담당하도록 하는 것이 좋습니다.

# ESLint

ESLint는 자바스크립트 코드의 오류나 버그를 미리 잡아주는 도구입니다. 개발자가 작성한 코드를 미리 정의해둔 규칙에 따라 검사해 코드 작성 시, 발생할 수 있는 문제점이나 실수를 미리 예방할 수 있습니다. 여기에서 규칙은 커스터마이징이 가능해 원하는 입맛대로 커스텀해서 적용할 수 있습니다.

# Prettier

Prettier는 코드의 가독성을 높이기 위한 도구입니다. 작성된 코드를 분석하고 스타일 가이드를 준수하도록 맞춰줍니다. Prettier의 도움을 받으면 팀원 모두가 같은 코드 스타일을 공유하고 사용할 수 있습니다.

그럼 ESLint부터 설정해보겠습니다! 개발 환경은 리액트와 타입스크립트 기준입니다.

# ESLint 설정하기

1. 우선, ESLint를 devDependencies에 설치합니다.

```bash
npm install eslint --save-dev
```

2. 추가 플러그인도 설치해줍니다.

- @typescript-eslint/parser : 타입스크립트에 대한 AST 생성
- eslint-config-prettier : eslint와 prettier 충돌 방지
- eslint-config-airbnb-typescript : 저는 React를 사용할 것이라 eslint-config-airbnb를 선택했지만 eslint-config-airbnb-base를 사용하면 더욱 라이트하게 사용하실 수 있습니다. (React 규칙 미포함)
- eslint-plugin-react-hooks : React hook 규칙
- eslint-plugin-import, eslint-import-resolver-typescript : import/export 규칙

```bash
npm install @typescript-eslint/parser --save-dev
npm install eslint-config-prettier --save-dev
npm install eslint-config-airbnb-typescript --save-dev
npm install eslint-plugin-react-hooks --save-dev
npm install eslint-plugin-import --save-dev
npm install eslint-import-resolver-typescript --save-dev
```

3. `.eslintrc.js` 파일을 만들고 적용할 린트 규칙을 작성해줍니다.

```javascript
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react", "import"],
  "extends": [
      "prettier",
      "airbnb-typescript",
      "react-app",
      "plugin:import/recommended"
  ],
  "rules": {
      "@typescript-eslint/indent": "off",
      "no-var": "error",
      "no-multiple-empty-lines": "error",
      "eqeqeq": "error",
      "no-unused-vars": "error",
      "@typescript-eslint/comma-dangle": "off",
      "import/no-extraneous-dependencies": [ "error", { "devDependencies": false } ],
      "@typescript-eslint/consistent-type-imports": [ "error", { "prefer": "type-imports" } ],
      "react/function-component-definition": [
          2,
          {
            "namedComponents": "function-declaration"
          }
      ],
      "sort-imports": [
          "error",
          {
              "ignoreCase": true,
              "ignoreDeclarationSort": true,
              "ignoreMemberSort": false,
              "allowSeparatedGroups": true
          }
      ],
      "import/order": [
          "error",
          {
              "groups": [ ["builtin", "external"], "internal", "parent", "sibling", "index" ],
              "alphabetize": { "order": "asc", "caseInsensitive": true }
          }
        ],
        "import/default": "off",
        "import/no-named-as-default-member": "off"
  },
  "parserOptions": { "project": "./tsconfig.json" },
}
```

# Prettier 설정하기

1. ESLint와 마찬가지로 Prettier를 devDependencies에 설치합니다.

```bash
npm install prettier --save-dev
```

2. `.prettierrc` 파일을 만들고 규칙을 작성해줍니다.

```javascript
{
"tabWidth": 2,
"printWidth": 80,
"singleQuote": true,
"trailingComma": "es5",
"arrowParens": "avoid",
"semi": true,
"bracketSpacing": true,
"endOfLine": "lf",
}
```

Prettier의 옵션들은 [Docs](https://prettier.io/docs/en/options.html)에서 확인할 수 있습니다.

# ESLint 적용이 안된다면?

- VSCode 설정에서 "actions on save"를 검색해 Eslint › Code Actions On Save의 "settings.json에서 편집" 클릭 후, `"editor.codeActionsOnSave": { "source.fixAll.eslint": true }` 코드를 추가합니다.

![VSC 설정 체크](https://user-images.githubusercontent.com/105091138/231831931-957a9493-f73c-46e1-adec-6976e6e1f91a.png)

# Prettier 적용이 안된다면?

- VSCode Prettier 확장 프로그램이 설치되어 있는지 확인합니다.

![VSC 확장](https://user-images.githubusercontent.com/105091138/231827792-289de864-c775-4c01-8162-da0f8e033bf3.png)

- VSCode 설정에서 "format on save"를 검색해 Editor: Format On Save에 체크가 되어있는지 확인합니다.

![VSC 설정 체크](https://user-images.githubusercontent.com/105091138/231828984-a64f4304-eeb4-43a2-9ef7-b8079e74eca3.png)

#### Reference

- [ESLint Docs](https://eslint.org/docs/latest/use/)
- [Prettier Docs](https://prettier.io/docs/en/index.html)
