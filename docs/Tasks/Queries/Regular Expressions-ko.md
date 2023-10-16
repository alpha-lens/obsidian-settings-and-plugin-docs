---
publish: true
---

# 정규 표현식

## 소개

> [!released]
Tasks 1.12.0에서 도입되었습니다.

[정규 표현식](https://en.wikipedia.org/wiki/Regular_expression) ("regex") 검색은 간단한 `includes`와 `does not include` 검색에 대한 강력한 대안입니다.

### 주의사항

> [!warning]
> 정규 표현식 (또는 'regex') 검색은 강력하지만 고급 기능으로, 성공적으로 사용하려면 철저한 지식이 필요하며, 의도된 검색 결과를 놓치지 않아야 합니다.

`\d` 같은 특수 문자를 사용하여 올바른 것처럼 보이는 정규 표현식을 쉽게 작성할 수 있지만, 이는 검색 문자열의 의미를 완전히 변경합니다.

예를 들어, `\d`는 `\d`라는 **두 개**의 문자가 아니라 다음 중 어느 하나인 **하나**의 문자에 일치합니다: `0123456789`.

이 문서에서는 시설에 대해 간략하게 개요를 제공하고, 몇 가지 동기 부여하는 예시를 제공한 다음, 철저한 처리를 위해 다른 자원으로 링크합니다.

그렇다 해도 regex 검색은 많은 다른 도구에서 사용되는 가치 있는 도구로서, 이들에 대해 배우기 위해 투자하는 시간은 미래에 많은 다른 동구와 시나리오에서 잘 보상받을 수 있습니다.

## 기본 사항

regex 검색 필터의 구성 요소는:

1. 필드 이름입니다. 예를 들어 `description` 또는 `path`
2. `regex matches` 또는 `regex does not match`
3. `/pc_abigail|pc_edwina|at_work/`와 같이 앞뒤로 슬래시 안에 있는 검색 패턴
   - 그 패턴은 세 개의 별도 필터 조합을 만들 필요 없이  'pc_abigail', 'pc_edwina' 또는 'at_work'을 찾습니다.
4. 선택적으로 마지막에 추가할 수 있는 [flag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)가 있습니다.
   - Tasks 컨텍스트에서는 여러 줄 검색이나 전역 검색이 없으므로, 허용된 flag 중 많은 것들이 관련이 없다는 점에 유의하세요.

대소문자 구분 예시, 구성 요소를 보여줍니다:

```text
description regex matches /pc_abigail|pc_edwina|at_work/
^1          ^2            ^3
```

대소문자 구분하지 않는 예시, 구성 요소를 보여줍니다:

```text
description regex matches /pc_abigail|pc_edwina|at_work/i
^1          ^2            ^3                            ^4
```

## 메모

- Regex 검색은 `includes`와 `does not include`와 달리 **대소문자를 구분**합니다.
- Regex 검색을 **구분하지 않게** 만들려면 종료 `/` 뒤에 `i` 플래그를 추가하면 됩니다. 예: `/I aM cAsE INsensitive because of the LiTle i after the closing slash/i`
- Tasks는 각 작업이 한 줄이기 때문에 여러 줄 regex 검색을 지원하지 않습니다.

## 특수 문자 이스케이프하기

Tasks에서 문자 `[ \ ^ $ . | ? * + ( )` 중 어느 하나를 그대로 찾으려면 각각 앞에 `\` 문자를 붙여야 합니다.

이것을 'escaping'라고 합니다. [Escaping, special characters](https://javascript.info/regexp-escaping)를 참조하세요.

다음 섹션에서 이러한 문자의 의미에 대해 설명합니다.

> [!Tip]
> Tasks 4.3.0부터 `/` 문자를 `\/`로 이스케이프할 필요가 없어졌지만, 이스케이프하면 여전히 검색 작동합니다.
>
> 그래서 이 두 가지 검색은 이제 동일하며, 모두 어디든지 'Root/Sub-Folder/Sub-Sub-Folder'을 포함하는 폴더 내의 작업을 찾습니다:
>
> ```task
> folder regexmatches /Root/Sub-Folder/Sub-Sub-Folder/
> folder regex matches /Root\/Sub-Folder\/Sub-Sub-Folder/
> ```

## Explain: 정규 표현식 검사하기

> [!released]
> Tasks 4.3.0에서 도입되었습니다.

Tasks가 정규 표현식을 어떻게 해석했는지 보려면, 쿼리에 `explain` 라인을 추가할 수 있습니다.

예를 들어, 이 쿼리의 결과:

<!-- snippet: DocsSamplesForExplain.test.explain_regular_expression.approved.query.text -->
```text
explain
path regex matches /^Root/Sub-Folder/Sample File\.md/i
```
<!-- endSnippet -->

그 결과는 [[Explaining Queries|설명]]의 시작 부분에 다음과 같은 추가 텍스트가 있을 것입니다:

<!-- snippet: DocsSamplesForExplain.test.explain_regular_expression.approved.explanation.text -->
```text
Explanation of this Tasks code block query:

path regex matches /^Root/Sub-Folder/Sample File\.md/i =>
  using regex:     '^Root\/Sub-Folder\/Sample File\.md' with flag 'i'
```
<!-- endSnippet -->

설명에서 슬래시 (`/`) 대신 작은따옴표 (`'`)를 사용한 이유는 쿼리의 경계 슬래시가 검색 문자열에 포함되지 않음을 강조하기 위함입니다.

## 특수 문자

정규 표현식 검색을 사용하는 경우, 여러 가지 이유로 사용 가능한 특수 문자에 대해 알고 있어야 합니다:

1. 복잡한 쿼리를 간단한 방식으로 작성할 수 있습니다.
2. 검색 시 "이스케이프"하지 않으면 혼란스러운 결과나 잘못된 검색이 발생할 수 있습니다.

다음은 [많은 특수 문자](https://javascript.info/regexp-escaping)의 몇 가지 예시입니다:

- `.`는 어떤 문자와 일치합니다.
- `[...]`는 대괄호 안의 어떤 문자든 일치합니다.
  - 예를 들어, `[aeiou]`는 `a`, `e`, `i`, `o`, `u` 중 하나와 일치합니다.
  - [Sets and ranges \[...\]](https://javascript.info/regexp-character-sets-and-ranges) 참조
- 시작과 끝
  - `^`는 문자열의 시작과 일치합니다. (그러나 `[^대괄호 내부]`인 경우 "not"을 의미)
  - `$`는 문자열의 끝과 일치합니다.
  - [Anchors: string start ^ and end $](https://javascript.info/regexp-anchors) 참조
- `|`는 정규 표현식에서 'OR'를 의미합니다.
  - [Alternation (OR) \|](https://javascript.info/regexp-alternation) 참조
- `\`은 일부 문자에 대해 특별한 의미를 추가합니다. 예:
  - `\d`는 0부터 9까지 하나의 숫자와 일치합니다.
  - `\D`는 숫자가 아닌 문자와 일치합니다.
    - [Character classes](https://javascript.info/regexp-character-classes) 참조

모든 옵션에 대해 철저하고 명확한 소개를 보려면 JavaScript.info 사이트의 [Regular expressions](https://javascript.info/regular-expressions)를 참조하세요.

## 중요 링크

학습 자료:

- JavaScript.info 사이트의 [Regular expressions](https://javascript.info/regular-expressions)
- [Regex Tutorial](https://regexone.com/)
- [Regex Cheat Sheet](https://www.rexegg.com/regex-quickstart.html)

정규 표현식을 실험하고 테스트하기 위한 온라인 도구:

-[Regex Testing Tool: regex101](https://regex101.com/) : 'ECMAScript (JavaScript)' 패턴 선택

구현 세부 정보:

-[JavaScript's RegExp implementation]((https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions))
-[JavaScript RegExp Flags(팔그)]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide /Regular_Expressions#advanced_searching_with_flags): 그러나 모든 팔그가 이 문맥에서 관련있지 않습니다.

## 알려진 제약 사항

Tasks에서 정규 표현식 검색 구현에 다음 제약 사항들을 인지하세요:

-[Lookahead and Lookbehind ]( https:/ /www.regular-expressions .info /lookaround.html): Lookahead 및 Lookbehind 검색은 Apple 모바일 기기에서 작동하지 않거나 느린 검색으로 인해 심각한 성능 문제가 발생할 수 있다고 가정하여, 확인되지 않았다

## 정규 표현식 예시

아래는 몇 가지 예시 정규 표현식 검색입니다. 이를 통해 어떤 작업을 수행할 수 있는지에 대한 아이디어를 제공합니다.

[Tasks-Demo 샘플 보트](https://github.com/obsidian-tasks-group/obsidian-tasks/tree/main/resources/sample_vaults/Tasks-Demo)에 [Regular Expression Searches](https://github.com/obsidian-tasks-group/obsidian-tasks/blob/main/resources/sample_vaults/Tasks-Demo/Filters/Regular%20Expression%20Searches.md) 파일에 더 많은 예시가 있습니다.

### 필드의 시작 부분 검색하기

대소문자를 구분하여 description이 "Log"로 시작하는 작업 찾기:

```text
description regex matches /^Log/
```

---

대소문자를 구분하지 않고 description이 "Log"로 시작하는 작업 찾기:

```text
description regex matches /^Log/i
```

### 비어있는 필드 찾기

템플릿에서 생성된 것과 같이 description이 없는 작업을 찾고 싶습니다:

```text
description regex matches /^$/
```

description이 없는 작업을 제외하고 싶습니다:

```text
description regex does not match /^$/
```

작동 방식: 정규 표현식에서 `/^$/`은 시작과 끝 사이에 아무것도 없는 텍스트와 일치합니다.

### 기다리는 작업 찾기

다른 것을 기다리고 있는 작업을 찾고 싶습니다. 그러나 'waiting'은 여러 가지 다른 방법으로 철자가 될 수 있습니다:

```text
description regex matches /waiting|waits|wartet/i
```

### 시간 찾기

description에 시간을 포함한 작업 찾기 - 간단한 버전입니다. 이 버전은 `99:99`와 같은 잘못된 시간도 `\d`가 '모든 숫자'를 의미하기 때문에 일치합니다.

```text
description regex matches /\d\d:\d\d/
```

---

description에 시간을 포함한 작업 찾기. 각 위치에서 허용되는 숫자를 지정하여 이전 예제보다 더 정확합니다.

```text
description regex matches /[012][0-9]:[0-5][0-9]/
```

### 하위 태그 찾기

태그 `#tag/subtag3/subsubtag5`와 같은 형태의 태그를 검색하려면 `3`과 `5`가 모든 한 자리 숫자일 수 있다고 가정해 보겠습니다.

- `[0-9]` 또는 `\d` 중 하나를 사용하여 한 자리 숫자와 일치시킬 수 있습니다.
- 하위 태그를 검색하려면 `/` 문자 앞에 'escaping' 처리해야 나머지 검색 패턴이 잘림을 방지할 수 있습니다.

슬래시(`/`)의 escaping으로 인해 다음 명령어가 생성되며, 대문자화된 태그도 검색할 수 있도록 대소문자 구분하지 않게 만들었습니다:

```text
tags regex matches /#tag\/subtag[0-9]\/subsubtag[0-9]/i
```

### 짧은 태그 찾기

매우 짧은 태그인 `#t`가 포함된 작업을 검색하려면, `#task`나 `#t/subtag`와 같은 태그와 일치하지 않도록 해야 합니다.

```text
tag regex matches /#t$/i 
```
 
 `$`:  검색 패턴 이후의 태그 내부 문자열 추가될 것 없게 합니다.
 
  'i': 대소문자 구분하지 않게 만듭니다.