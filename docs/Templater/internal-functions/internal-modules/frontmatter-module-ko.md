---
created: 2023-10-14 T18:02
updated: 2023-10-14 T19:04
---
# Frontmatter 모듈

{{ tp.frontmatter.description }}

<!-- 목차 -->

## 문서

### `tp.frontmatter.<frontmatter_variable_name>` 

파일의 프론트매터 변수 값을 가져옵니다.

프론트매터 변수 이름에 공백이 포함된 경우, 다음과 같이 대괄호 표기법을 사용하여 참조할 수 있습니다:

````
undefined
````

## 예시

다음과 같은 파일이 있다고 가정해봅시다:

````
---
alias: myfile
note type: seedling
---

file content
````

그러면 다음과 같은 템플릿을 사용할 수 있습니다:

````
파일의 메타데이터 alias: undefined
노트의 타입: undefined
````