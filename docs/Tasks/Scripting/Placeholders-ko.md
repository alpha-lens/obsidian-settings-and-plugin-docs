---
publish: true
---

# 플레이스홀더

<span class="related-pages">#feature/scripting</span>

> [!released]
> 플레이스홀더는 Tasks 4.7.0에서 소개되었습니다.

## 개요

- Tasks는 필터가 쿼리 파일의 위치에 액세스할 수 있도록 플레이스홀더 기능을 제공합니다.
- `{{`와 `}}` 사이의 쌍으로 알려진 속성은 쿼리 파일 경로에서 가져온 값을 확장합니다.
- 예를 들어:
  - `{{query.file.path}}`는 그 파일 내의 모든 Tasks 쿼리에 대해 확장될 수 있습니다.
  - `some/sample/actions on my hobby.md`와 같은 값이 될 것입니다.
- 플레이스홀더에서 사용할 수 있는 값 목록은 [[Query Properties-ko|Query Properties]]에 나열되어 있습니다.

## 플레이스홀더 값 확인

[[Explaining Queries-ko|explain]] 명령은 쿼리 내의 모든 플레이스홀더가 어떻게 해석되는지 보여줍니다. 이는 일반적으로 플레이스홀더가 어떻게 확장되는지 이해하는 데 사용될 수 있습니다.

예를 들어, 다음과 같은 [[Query Properties-ko|쿼리 속성]]이 [[Placeholders-ko|플레이스홀더]]에서 포함된 쿼리 블록을 파일 `some/sample/file path.md`에 배치한 경우:

<!-- snippet: DocsSamplesForExplain.test.explain_placeholders.approved.query.text -->
```text
explain
path includes {{query.file.path}}
root includes {{query.file.root}}
folder includes {{query.file.folder}}
filename includes {{query.file.filename}}
```
<!-- endSnippet -->

결과는 다음과 같이 시작되며, `{{...}}` 내의 각 값이 어떻게 확장되었는지 보여줍니다.

<!-- snippet: DocsSamplesForExplain.test.explain_placeholders.approved.explanation.text -->
```text
This is the explanation of this Tasks code block query:

path includes some/sample/file path.md

root includes some/

folder includes some/sample/

filename includes file path.md
```
<!-- endSnippet -->

## 에러 확인: 유효하지 않은 변수

플레이스홀더에 알려지지 않은 속성이 있는 경우 명확한 메시지가 작성됩니다.

예를 들어, 다음과 같이 쿼리 속성의 이름이 대소문자를 구분한다는 것을 보여줍니다:

<!-- snippet: DocsSamplesForExplain.test.explain_placeholders_error.approved.query.text -->
```text
# query.file.fileName는 대문자 N 때문에 유효하지 않습니다.
# query.file.filename이 올바른 속성 이름입니다.
filename includes {{query.file.fileName}}
```
<!-- endSnippet -->

... 이 출력을 생성합니다:

```text
Tasks 쿼리: 하나 이상의 플레이스홀더를 확장하는 데 오류가 있습니다.

오류 메시지는 다음과 같습니다:
    Unknown property: query.file.fileName

문제는 다음과 같습니다:
    filename includes {{query.file.fileName}}
```

%% ---------------------------------------------------------------------------
이 텍스트가 변경되면 하드코딩된 위의 출력을 업데이트해야 합니다:

<!-- snippet: DocsSamplesForExplain.test.explain_placeholders_error.approved.explanation.text -->
```text
This is the explanation of this Tasks code block query:

Query has an error:
There was an error expanding one or more placeholders.

The error message was:
    Unknown property: query.file.fileName

The problem is in:
    filename includes {{query.file.fileName}}
```
<!-- endSnippet -->
--------------------------------------------------------------------------- %%

## 주의할 점

- 기호는 대소문자를 구분합니다:
  - `query.file.fileName`는 인식되지 않습니다.
- 플레이스홀더가 사용되는 사용자 정의 필터와 그룹에서는 따옴표로 둘러싸여야 합니다.
  - 예를 들어: `'{{query.file.folder}}'`

## 알려진 제한 사항

- 주석 내의 인식되지 않은 플레이스홀더에 대해 불평합니다. 그러나 주석은 무시됩니다.
- 설명:
  - `explain` 명령은 확장된 텍스트만을 표시합니다.
  - 원래 변수 이름을 표시하고 그 다음에 확장된 텍스트를 표시하는 것도 좋을 것입니다.
- 정규 표현식에서 사용은 허용됩니다.
  - 그러나 [[정규 표현식#특수 문자|특수 의미를 가진 문자]]로 인해 그것을 사용하는 것은 권장되지 않습니다.
- 플레이스홀더 이름을 포함하는 파일의 이름을 변경할 때 쿼리 블록이 자동으로 업데이트되지 않습니다.
  - 해결책은 쿼리가 포함된 파일을 닫고 다시 열면 됩니다.

## 미지원 기능

- 오늘의 날짜 또는 시간으로 검색
- 파일 이름에서 날짜 문자열 가져오기

## 기술적 세부 정보

- 사용된 템플릿 라이브러리는 [mustache.js](https://www.npmjs.com/package/mustache)입니다.
- 알 수 없는 변수 사용을 감지하기 위한 오류 검사는 [mustache-validator](https://www.npmjs.com/package/mustache-validator)를 통해 구현되었습니다.